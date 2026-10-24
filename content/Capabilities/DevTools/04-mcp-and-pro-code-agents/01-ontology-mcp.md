# 01 — Ontology MCP

*Sources: [Ontology MCP overview](https://www.palantir.com/docs/foundry/ontology-mcp/overview/) · [Sample architecture](https://www.palantir.com/docs/foundry/ontology-mcp/sample-architecture/) · [Getting started](https://www.palantir.com/docs/foundry/ontology-mcp/getting-started/) · [Authentication and authorization](https://www.palantir.com/docs/foundry/ontology-mcp/authentication-and-authorization/) · [MCP tools and agent configuration](https://www.palantir.com/docs/foundry/ontology-mcp/mcp-tools-and-agent-configuration/) · [Debugging with MCP Inspector](https://www.palantir.com/docs/foundry/ontology-mcp/debugging-with-mcp-inspector/) · [Example MCP workflows](https://www.palantir.com/docs/foundry/ontology-mcp/example-mcp-workflows/) · [Developer Console: Ontology MCP](https://www.palantir.com/docs/foundry/developer-console/ontology-mcp/) · checked October 22, 2026 · Ready for Review*

**[Concept]** The **Model Context Protocol** (MCP) is an open standard for giving AI agents tools. **Ontology MCP** (OMCP) turns a Developer Console application into an **MCP server**: the application's object types, action types and query functions become tools that an agent outside Foundry can call. It uses the same application, OAuth client and restrictions as an OSDK app ([02-01](../02-developer-console-and-apis/01-applications-scopes-and-restrictions.md)).

## Ontology MCP or Palantir MCP?

**[Docs]** The two are easy to confuse, and the docs draw the line clearly:

| | Ontology MCP | Palantir MCP ([02](02-palantir-mcp.md)) |
|---|---|---|
| For | Ontology **consumers**: agents working with production data | Ontology **builders**: developers and their AI IDEs |
| Can | Read objects, run **predefined actions**, call query functions | Explore and change **structure**: object, link and action types, datasets, transforms, repositories (70+ tools) |
| Can't | Change the schema | Write **Ontology data** |
| Bounded by | The application's **restrictions** | The user's token and Control Panel settings |

**[Docs]** In one line from the overview: OMCP "enables controlled writes to ontology data, while Palantir MCP enables modifications to ontology structure".

## What becomes a tool

**[Docs]** From the sample architecture page:

- **Object types**: every object type in the application is reachable through a **SQL tool**, so agents read by issuing SQL against the exposed types.
- **Action types**: **each** action type becomes its own tool.
- **Query functions**: each can be its own tool. That includes **agents as tools**: save AIP Logic or an AIP chatbot as a function and expose it, so one agent can call another.

**[Docs]** OMCP doesn't support MCP **prompts** or **resources**, only tools.

**[Explanation]** The pages describe object reads two ways: a SQL tool on the architecture page, and **search tools** (`search-osdk-todo-task`) in the debugging page and the skills example. Expect to see whichever your enrollment's version provides; list the tools in MCP Inspector before writing agent instructions against them.

**[Docs]** What the agent reads about an action is the **Agent tool description** field in Ontology Manager. Use it to say when and how to use the action, for example how to find the ID a parameter needs.

## Turning it on

**[Docs]** Set the application's restrictions first; they decide what's exposed. Then in Developer Console open the app's **MCP** page and enable the MCP server. The page shows connection details per agent framework.

**[Docs]** **MCP Hub > Ontology MCP** lists every OMCP server on the enrollment, with a link back to each app in Developer Console.

## Authentication

**[Docs]** There is no separate MCP authentication. Clients use the application's **OAuth 2.0 client**, and its restrictions, permissions and scopes apply to MCP calls as to any other call.

| Grant | Use for |
|---|---|
| **Authorization code** | Interactive agents and editors acting **as a user**, who consents to the scopes |
| **Client credentials** | Service-to-service agents acting as a **service user**; needs a confidential client that can keep a secret |

**[Docs]** One app can enable both. Configure redirect URLs, scopes and secrets on **OAuth & restrictions**. Tokens are limited by the app's scopes, and the user or service user still needs permission on the underlying objects, actions and queries.

**[Docs]** **Microsoft Copilot Studio** supports only the authorization code grant **in a confidential client**: create the app as **Backend service** with **User's permissions**. The page says this "will create the required service user" Copilot Studio uses to issue tokens for your users.

**[Explanation]** That last sentence doesn't match the permission model in [02-01](../02-developer-console-and-apis/01-applications-scopes-and-restrictions.md#step-1-application-type-and-permission-type), where a service user comes with **application** permissions, not user permissions. What Copilot Studio needs is a **confidential** client (the backend-service type) running the authorization code grant. Logged as [RQ-06](../SOURCES.md#open-research-questions).

## The governance warning

**[Docs]** With OMCP on your device and an LLM hosted **outside** Palantir AIP, you are "making data in your Palantir environment available to an external MCP client". Check your organisation's policies, make sure exposed resources meet your security requirements, and use restrictions to keep sensitive resources out.

**[Explanation]** This is the same boundary as the OSDK's read-time-only rule ([01-01](../01-ontology-sdk/01-languages-and-generation.md#what-you-get)), with a model on the other side: once a tool result reaches the external agent, Foundry's markings no longer travel with it.

## Testing with MCP Inspector

**[Docs]** **MCP Inspector**, an open-source tool, connects to the server, lists tools, runs them and shows results:

1. Start it with the instructions on the app's **MCP** page.
2. Under **Authentication**, add the **client ID** (and secret, for a confidential client), then **Connect**. Tools can take a few seconds to appear.
3. **Tools** lists what's exposed. A missing tool usually means the resource isn't in the app's restrictions.
4. Run a tool and read the **Results**: data, or errors such as missing parameters or permission failures. **History** logs every request.

## Patterns the docs describe

**[Docs]** Four:

- **Desktop agents** (Claude.ai, Microsoft Copilot Studio, Gemini Enterprise; the architecture page also lists Claude Cowork): users and the agent work on the same governed data, so a task created from Teams is immediately visible in Foundry apps.
- **External agent frameworks** (Google ADK, Microsoft Agent Framework, OpenAI SDK, LangChain), possibly combining OMCP with other MCP servers, such as one for web search.
- **Headless agents** with no human supervision, using OMCP as memory and tracking; every action is recorded, which gives auditability.
- **The reverse direction**: a Foundry-hosted agent acting as an MCP **client** to an external MCP server.

**[Docs]** Tools combine with **Claude skills** to encode multi-step rules, such as *search for the task first, create it only if it's missing*. For Copilot Studio, **Adaptive Cards** render tool output in Teams and Copilot; a `capabilities.response_semantics` block points a tool at a card template.

## For Kestrel

**[Example]** Candidate: let Ama's CS agents ask a Copilot Studio agent in Teams about an order. This is a check against [Ontology 16-03](../../Ontology/16-ai-and-agents/03-ontology-tools-for-agents.md), whose Delivery Desk tool sheet the OMCP version would have to match.

| 16-03 tool | OMCP equivalent | Problem |
|---|---|---|
| T2 *Look up orders and shipments*, listed properties only | Object read tool over `Order`, `Shipment`, `ShipmentEvent` | The OMCP pages document exposure by **object type** and describe no per-property selection like 16-03 rule 2. Property security policies still apply, but not the *need-to-know* list |
| T4 *Draft delay message*, `draftDelayMessage` **pinned** | A query-function tool | 16-03 rule 3 pins it because customers see its text. The OMCP pages document no version pinning, so the tool would follow the latest version: **blocked** until pinning can be shown |
| T5 *Send delay update*, **confirm first** | An action tool | No confirm-first setting is documented for OMCP tools. The confirmation would depend on Copilot Studio's own behaviour |
| T6 *Propose re-route*, automatic | An action tool | Fine: the proposal is itself the review step |
| No *Re-route shipment* tool | Leave it out of the app's SDK | Fine: restrictions keep it out |

**[Explanation]** *Considered, not adopted* (recorded in [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md), October 22). The design would be authorization code (so each agent's own access applies), with only `Order`, `Shipment`, `ShipmentEvent` and *Propose re-route* in the app; `draftDelayMessage` joins only if it can be pinned. *Send delay update* stays out until a confirm step can be shown to work, because it messages customers. The Teams data would also leave Foundry's governance, which needs the organisation-policy check the docs ask for.

---
[Module index](README.md) · Next: [02 — Palantir MCP](02-palantir-mcp.md)
