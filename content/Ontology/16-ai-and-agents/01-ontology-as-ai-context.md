# 01 — The Ontology as AI context

*Sources: [Ontology-augmented generation](https://www.palantir.com/docs/foundry/ontology/ontology-augmented-generation/) · [Chatbot Studio: retrieval context](https://www.palantir.com/docs/foundry/chatbot-studio/retrieval-context/) · [Chatbot Studio: citations](https://www.palantir.com/docs/foundry/chatbot-studio/citations/) · [Chatbot Studio: application state](https://www.palantir.com/docs/foundry/chatbot-studio/application-state/) · [AIP Logic](https://www.palantir.com/docs/foundry/logic/overview/) · checked October 3, 2026 · Ready for Review*

Product mechanics for AIP Chatbot Studio, Logic and Threads are in the [AIP area](../../AIP/README.md). This module asks the Ontology-side question: **what does the model actually see, and why is an Ontology a better thing to show it than a pile of documents?**

## An LLM only knows what's in its prompt

**[Concept]** A language model answers from two places: what it learned in training, and what's in the prompt now. Nothing about Kestrel is in its training. So every useful answer about an order depends on **retrieval**: something finds the right facts and puts them in the prompt. **[Docs]** The OAG page says it plainly: finding the relevant context "is often the most challenging part" of a retrieval-augmented system.

**[Analogy]** For a data engineer: retrieval is the query, the prompt is the result set, and the LLM is a report writer that only sees that result set. A bad query gives a confident, well-written, wrong report.

## What the Ontology changes

Retrieval over **documents** returns passages. Retrieval over the **Ontology** returns **objects**: typed, named, current, linked and permissioned.

| A document chunk gives the model… | An object gives the model… |
|---|---|
| Text that mentions "order 10442" | `Order O-10442` with `status = ON_HOLD`, `promisedDeliveryDate`, `refundState` |
| Whatever the text said when written | The **current** value, from the last sync or edit |
| Relationships it has to infer | **Links**: this order's shipments, its customer, its payments |
| Everything in the chunk | **Only selected properties** ([below](#what-goes-into-the-prompt)) |
| A citation to a PDF page | A citation to the **object**, which opens its Object View |
| No sense of who's asking | Only objects the **asking user** can see |

**[Explanation]** That's what "ontology-augmented" adds to "retrieval-augmented": the unit of context is a business object, not a paragraph. Documents still matter for policy and procedure, the *why*; objects carry the *what is true now*. A good agent uses both: [02](02-semantic-search-and-embeddings.md) covers the document side.

## Five ways context reaches the model

**[Docs]** From Chatbot Studio and the OAG page:

| Route | What happens | Deterministic? | Best for |
|---|---|---|---|
| **Full context in the prompt** | Everything relevant is passed, with no search | Yes | Small corpora. The docs: if it fits the context window, "start without search" |
| **Ontology context: fixed set** | A static or variable object set (N objects) is printed into the prompt on **every message** | Yes | "The order on screen", "this customer's open tickets" |
| **Ontology context: semantic** | The K objects nearest the user's message, via a vector property | Yes, the retrieval runs every time | A large type searched by meaning |
| **Function-backed context** | Your function builds the context (for example hybrid search) and returns `retrievedPrompt` text | Yes | Retrieval the built-ins can't do |
| **Object query tool** | The **LLM decides** to filter, aggregate or traverse configured types | No: the model chooses | Open questions: "how many of her orders were late this year?" |

- **[Docs]** Retrieval context "is deterministically run with every new user message"; tools are called when the model chooses ([03](03-ontology-tools-for-agents.md)).
- **[Docs]** Function-backed context is written in **TypeScript v1** against the `AipAgentsContextRetrieval` function interface; function interfaces aren't supported in TSv2.
- **[Recommendation]** Prefer deterministic context for what the user is **looking at**, and tools for what they **ask about**. Ama's agent always gets the order on screen as Ontology context; it uses the object query tool only for follow-up questions.

## What goes into the prompt

**[Docs]** Ontology context prints a configurable **list of properties** for each retrieved object; by default all printable properties (not media references or vectors). The object query tool also takes a list of accessible properties, "to make queries more token-efficient".

**[Explanation]** Choosing properties is choosing what the model can reason about. For the Delivery Desk:

| Include | Leave out | Why |
|---|---|---|
| `status`, `promisedDeliveryDate`, `eta`, `isLate`, `delayRisk.band` | Raw `delayRisk.probability` | A band is what Ama says to customers; a raw 0.63 invites the model to over-interpret |
| `refundState` | Internal fraud flags | The agent drafts customer messages; a fraud review must never leak into one |
| Customer `fullName`, contact preference | `email`, `phone` | The draft needs a name, not contact details: sending goes through the *Send delay update* action, which looks them up itself |

**[Docs]** Application variables can be **hidden** from the model: an object set used as Ontology-context input "does not need to be visible to the LLM", because its contents are already in the prompt.

## Security: read-time only

**[Docs]** AIP Logic's page states the rule for all LLM use: row and column controls (restricted views, object and property security policies) "filter what the model can read on a user's behalf". The model "can never see data the user is not authorized to read". But "these controls do not extend to the model's output or any Ontology edits it composes". Pair them with **markings** to protect data downstream ([12-04](../12-security-and-governance/04-security-across-actions-functions-and-apis.md)).

**[Docs]** Administrators can also restrict which **mandatory markings** may reach a model at all: an enrollment allowlist in *Control Panel → AIP settings → Data access*. A request is rejected if the user's session token carries any mandatory marking outside the allowlist, even if the data in the request doesn't. Users can switch to a **scoped session** with fewer markings. Worked cases and registered-model overrides: [AIP 08-03](../../AIP/08-security-governance-and-admin/03-llm-data-access-with-markings.md).

**[Explanation]** So the Ontology gives an agent **no more** than the user could see, which is what makes Ontology-grounded agents safe to deploy broadly. It doesn't stop the agent from **repeating** what it saw to someone else, for example by drafting a message. That's an output problem, handled by markings, review and tool design ([04](04-human-in-the-loop-and-staged-writes.md)).

## Citations close the loop

**[Docs]** Chatbots with Ontology or document context output **citations**: object citations open the object in Object Explorer; document citations open the PDF (optionally at a page). Function-backed context and tools don't cite by default, but can be prompted to use the citation formats (an object RID, or an object type ID plus primary key). Selecting a citation can also update an application variable, for example to open an overlay in Workshop.

**[Recommendation]** Every factual claim the Delivery Desk makes about an order should carry an object citation. Ama can then check in one click, and a wrong answer is visibly wrong.

---
[Module index](README.md) · Next: [02 — Semantic search and embeddings](02-semantic-search-and-embeddings.md)
