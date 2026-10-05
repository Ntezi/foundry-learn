# 03 — Ontology tools for agents

*Sources: [Chatbot Studio: tools](https://www.palantir.com/docs/foundry/chatbot-studio/tools/) · [Chatbot Studio: application state](https://www.palantir.com/docs/foundry/chatbot-studio/application-state/) · [Chatbot Studio overview](https://www.palantir.com/docs/foundry/chatbot-studio/overview/) · [AIP Logic](https://www.palantir.com/docs/foundry/logic/overview/) · [Ontology MCP](https://www.palantir.com/docs/foundry/ontology-mcp/overview/) · checked October 3, 2026 · Ready for Review*

How each tool type works, and when it asks for confirmation, is covered in detail in the [AIP reference on Chatbot Studio](../../AIP/applications/09-aip-chatbot-studio.md). This note treats the tools as what they are from the Ontology's side: **an API surface onto your Ontology, whose caller is a language model.** It's laid out as the **tool sheet** for the Delivery Desk agent, then the rules Kestrel drew from it.

## The surface, by channel

**[Docs]** There are four ways an AI system reaches the Ontology:

| Channel | Who builds it | What it exposes | Writes? |
|---|---|---|---|
| **AIP Chatbot** (Chatbot Studio, formerly *Agent Studio*) | App builders, no code | Retrieval context plus tools: action, object query, function, update application variable, command, request clarification | Through **action** tools |
| **AIP Logic** | App builders, no code | A function whose blocks can read objects, call tools and functions, and edit | Yes, as a function-backed action or an automation ([04](04-human-in-the-loop-and-staged-writes.md)) |
| **Ontology MCP (OMCP)** | Developers, in Developer Console | An application's object types, action types and query functions as **MCP tools** for **external** agents | Yes, limited by the application's **restrictions** |
| **Palantir MCP** | Developers | 70+ tools for **building** the Ontology (types, links, actions), OSDK apps, datasets, transforms | **No data writes**; it changes structure, not objects |

**[Docs]** The OMCP page draws the line plainly: OMCP "enables controlled writes to ontology data, while Palantir MCP enables modifications to ontology structure". **[Explanation]** For this course: Palantir MCP is a builder's tool ([AIP reference](../../AIP/applications/05-palantir-mcp.md)); OMCP and Chatbot tools are the agent's runtime surface, and the ones that need governing.

**[Docs]** OMCP comes with a warning: enabling it with LLMs hosted outside AIP makes your data available to an external MCP client, so check your organization's policies first, and use application restrictions and permissions to limit what's exposed ([10-04](../10-applications/04-osdk-and-apis.md#q2--who-is-the-user-and-what-token-do-they-get)).

## The Delivery Desk tool sheet

**[Example]** The agent drafts delay messages and proposes re-routes for Ama's team ([00-04](../00-orientation/04-running-example.md)).

| # | Tool | Type | Exposes | Confirmation | Why this shape |
|---|---|---|---|---|---|
| T1 | *Current order* | Ontology context (fixed set, from the app's selected order) | `Order` + selected properties | — | The thing on screen is always in context ([01](01-ontology-as-ai-context.md)) |
| T2 | *Look up orders and shipments* | Object query | `Order`, `Shipment`, `ShipmentEvent`; listed properties only | — | Open questions ("was it late last time?") |
| T3 | *Policy search* | Function-backed context | The hybrid search over `PolicyChunk` ([02](02-semantic-search-and-embeddings.md)). Written in **TSv1**, the one exception to [09-05](../09-functions/05-writing-functions-in-practice.md)'s TSv2 rule, because the retrieval function interface isn't supported in TSv2 | — | Returns policy text with citations |
| T4 | *Draft delay message* | Function | `draftDelayMessage` (pinned version) | — | Returns text only; writes nothing |
| T5 | *Send delay update* | Action | The existing action, with its criteria and notification rules ([08-05](../08-actions/05-side-effects.md)) | **Confirm first** | Sends to a customer: a person decides |
| T6 | *Propose re-route* | Action | *Propose re-route*, which writes a `RerouteProposal`, not a re-route | Automatic | The proposal is the review step; a lead accepts it with *Re-route shipment* |
| T7 | *Ask Ama* | Request clarification | — | — | Better than guessing which of two orders the customer means |

What is **not** on the sheet, on purpose:

- **No** *Re-route shipment* tool. The agent proposes; people re-route ([04](04-human-in-the-loop-and-staged-writes.md)).
- **No** object query access to `Payment` or `Customer.email`. Not needed, so not exposed.
- **No** command tools. The agent doesn't drive other apps.

## The rules Kestrel drew

**1. Actions are the only write path.** **[Docs]** The action tool "gives your chatbot the ability to execute an ontology edit", and can run automatically or after user confirmation. **[Explanation]** Because the write is an **action**, everything from module 08 applies to the agent unchanged: submission criteria, parameter validation, side effects, the action log, reverts. An agent with a raw "edit object" ability would bypass all of it. That's the main reason to design actions around business operations ([Action Sprawl](../11-design/03-anti-patterns.md#action-sprawl)): they become the agent's vocabulary.

**2. Expose the minimum, by property.** **[Docs]** The object query tool takes the object types it can access and, per type, the accessible properties, "to make queries more token-efficient". **[Explanation]** It's also the agent's need-to-know boundary. Security policies still apply underneath; property selection decides what the model *bothers* with.

**3. Pin what changes behaviour.** **[Docs]** A function tool uses the **latest** version unless you pin a published one. **[Recommendation]** Pin anything that writes text a customer will see, so a function release doesn't silently change the agent ([09-03](../09-functions/03-function-lifecycle.md)).

**4. Make inputs deterministic where you can.** **[Docs]** Action and function tools can take inputs from **application variables** instead of having the LLM generate them (strings and object sets only). Variables can also be updated deterministically from tool or context outputs; the docs recommend that over letting the model set them. **[Example]** T5's `order` parameter comes from the app's selected order, never from the model's reading of the conversation.

**5. Describe, because descriptions are prompt.** **[Docs]** An application variable's description "will be injected into the chatbot's prompt". **[Explanation]** The same is true in practice of tool names, action descriptions and parameter names: they're what the model reads to choose a tool. That turns Ontology metadata into part of the agent's instructions ([05](05-designing-the-ontology-for-agents.md)).

**6. Prefer native tool calling, know its limits.** **[Docs]** Native tool calling is faster, more token-efficient and can call tools **in parallel**, but works only with a subset of Palantir-provided models and only with action, object query, function and update-application-variable tools. Prompted tool calling supports everything but calls one tool at a time. **[Example]** T7 (request clarification) only works with prompted calling, so the Delivery Desk runs in prompted mode and accepts the slower multi-step answers.

## Who the agent "is"

**[Docs]** Chatbots are built on "the same rigorous security model" as the rest of the platform, granting the LLM "access only to what is necessary". **[Explanation]** In an interactive chatbot the tools act **as the user**: reads are filtered by the user's access ([01](01-ontology-as-ai-context.md#security-read-time-only)), and actions check criteria against the user ([AIP reference](../../AIP/applications/09-aip-chatbot-studio.md)). So T5 succeeds for Ama only if Ama could send the update herself. Headless runs are different: an automation runs **as its owner** ([10-06](../10-applications/06-automate-and-ontology-events.md#why-each-choice)), and an OMCP client is limited by its application's restrictions. Decide "who is acting" before deciding what the agent may do.

---
[Module index](README.md) · Previous: [02 — Semantic search and embeddings](02-semantic-search-and-embeddings.md) · Next: [04 — Human-in-the-loop and staged writes](04-human-in-the-loop-and-staged-writes.md)
