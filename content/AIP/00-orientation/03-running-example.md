# 03 — Kestrel's AI workload

*Sources: none (our own invented example) · written October 8, 2026 · Ready for Review. Everything here is **[Example]**: Kestrel, its systems and its people are invented.*

Kestrel Commerce is the fictional online retailer, with its payments arm Kestrel Pay, used throughout the [Ontology area](../../Ontology/00-orientation/04-running-example.md). Its data model is fixed in the [reference model](../../Ontology/17-case-studies/02-kestrel-reference-model.md). This page lists the AI work Kestrel already has on paper and what each module of this area adds to it.

## Already designed in the Ontology area

| Piece | What it is | Designed in |
|---|---|---|
| **Delivery Desk** | An AIP Chatbot for Ama's customer service team. It drafts delay updates and proposes re-routes for a person to approve | [16-03](../../Ontology/16-ai-and-agents/03-ontology-tools-for-agents.md) |
| Tools T1–T7 | Current order (context), order and shipment lookup, policy search, *Draft delay message*, *Send delay update* (confirm first), *Propose re-route*, *Ask Ama* | [16-03](../../Ontology/16-ai-and-agents/03-ontology-tools-for-agents.md) |
| `draftDelayMessage` | A function that calls an LLM through the model alias `draftModel`; returns text, writes nothing | [Ontology 09-04](../../Ontology/09-functions/04-functions-on-models-and-llms.md) |
| `PolicyDocument`, `PolicyChunk` | Kestrel's delivery and refund policies, chunked and embedded for search | [16-02](../../Ontology/16-ai-and-agents/02-semantic-search-and-embeddings.md) |
| `RerouteProposal` | What the agent writes instead of re-routing; a lead accepts it | [16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md) |
| The control ladder | Read → draft → propose → confirm → sandbox → act | [16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md) |
| Kestrel Pay's model rule | Compliance requires a self-hosted model for anything that touches payment data | [Ontology 09-04](../../Ontology/09-functions/04-functions-on-models-and-llms.md) |

These are not redesigned here. If a module in this area needs to change one, the change is made in the Ontology area's reference model at the same time.

## What this area adds

| Module | What Kestrel gets |
|---|---|
| [01 Models and LLMs](../01-models-and-llms/README.md) | Which model backs `draftDelayMessage`, and what happens when that model is retired |
| [02 Bring your own model](../02-bring-your-own-model/README.md) | How Kestrel Pay meets its self-hosting rule with a registered model |
| [03 AIP Logic](../03-aip-logic/README.md) | The delay-message drafting rebuilt as a Logic function, and the choice between the two |
| [04 AIP Evals](../04-aip-evals/README.md) | A test suite for the drafts before Delivery Desk goes live |
| [05 Chatbot Studio](../05-chatbot-studio/README.md) | Publishing, logging and sharing Delivery Desk |
| [06 Document Intelligence](../06-document-intelligence/README.md) | **New:** carrier invoices arrive as PDFs; Lena's team wants them as data |
| [07 End-user apps](../07-end-user-apps/README.md) | Which app Ama, Kofi, Lena and Daniel would each open |
| [08 Security](../08-security-governance-and-admin/README.md) | Keeping `Kestrel Pay – Financial` data away from models that may not see it |
| [09 Cost](../09-cost-and-observability/README.md) | What Delivery Desk costs per drafted message |
| [10 Kestrel case](../10-kestrel-case/README.md) | All of the above, built in order |

The carrier-invoice types, `CarrierInvoice` and `CarrierInvoiceLine`, are defined in [06-01](../06-document-intelligence/01-extraction-strategies.md#where-the-data-goes) and listed in the reference model.

## The people, as AI users

| Person | Role | AI need |
|---|---|---|
| Ama | Customer service lead | Delivery Desk drafts and proposals, reviewed by her team |
| Kofi | Warehouse operations lead, Accra; sees only his region | Approves re-route proposals for his region |
| Lena | Finance analyst, Kestrel Pay | Carrier invoices as data; no payment data to external models |
| Tomás | Fraud analyst | Ad-hoc analysis of payment patterns |
| Priya | Data engineer | Pipelines that feed the chunks and invoices |
| Daniel | Application developer (not an administrator) | Builds the functions, chatbot and evals; cannot register models himself |

---
[Module index](README.md) · Previous: [02 — Getting started with AIP](02-getting-started.md) · Next module: [01 — Models and LLMs](../01-models-and-llms/README.md)
