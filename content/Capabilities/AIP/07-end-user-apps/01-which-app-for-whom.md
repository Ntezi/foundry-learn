# 01 — Which app for whom

*Sources: the other notes in this module, each with its own official pages · written October 8, 2026 · Ready for Review. The comparison is ours; each cell links back to the note with the docs' wording.*

Seven AIP apps are meant to be **used** rather than built. They overlap enough to confuse anyone choosing between them. This page compares them on the questions that actually decide the choice.

## The seven at a glance

| App | One line | Typical user | Builds or changes things? | Note |
|---|---|---|---|---|
| **AIP Assist** | Help with the platform itself, from documentation and your own help content | Everyone | No (suggests actions; can draft code when you attach it) | [02](02-aip-assist.md), [03](03-assist-custom-content-sources.md) |
| **AIP Threads** | Ask questions of PDFs, or chat with a published chatbot | Business users | No | [07](07-threads-evolve-and-realtime-audio.md#aip-threads-chat-with-documents) |
| **AIP Analyst** | An agent that answers data questions by querying the Ontology | Analysts | Can run actions, with approval unless set to auto-submit | [04](04-aip-analyst.md) |
| **Boardroom** | A team of agents that researches and writes documents, decks and plans | Leads and planners | Creates documents and artifacts as Ontology objects | [06](06-boardroom.md) |
| **AI FDE** | An agent that builds in Foundry: pipelines, Ontology, functions, apps | Builders | Yes, on branches, with tool approval | [05](05-ai-fde.md) |
| **AIP Evolve** | Fleets of AI FDE agents that optimise an existing AI workflow | Builders and owners of AI workflows | Proposes changes for review | [07](07-threads-evolve-and-realtime-audio.md#aip-evolve-let-agents-improve-an-ai-workflow) |
| **Realtime audio** | Voice in and out of your own OSDK app | Developers, for their users | Through the tools you give it | [07](07-threads-evolve-and-realtime-audio.md#realtime-audio-voice-as-an-interface) |

## The questions that decide

| Question | Assist | Threads | Analyst | Boardroom | AI FDE | Evolve |
|---|---|---|---|---|---|---|
| Sees your Ontology data? | No; with attached code, the **metadata** of the datasets and objects it references | Only documents you add (or the chatbot's sources) | Yes, as you | Yes, per agent context | Yes, as you, once added to context | Its target and test data |
| Acts as | — (doesn't act) | Not stated | You (saved analyses respect each viewer's permissions) | Not stated | **You**, never a service account | You, through AI FDE |
| Where it writes | Nowhere | Nowhere | Actions (approval by default) | Ontology objects for sessions and artifacts | Branches and pull requests | A branch proposal |
| Main cost driver | — | Document size (full text vs chunks) | Growing context and large tool results | Many agents in parallel | Many fast operations; infrastructure load | Many iterations over test cases |
| Marketplace product needed | No | No | No | **MindKit** | No | **AIP Evolve** |
| Registered (BYOM) models | **Not supported** | Not stated | Supported | Not stated | Supported | Through AI FDE |

The BYOM row is from [02-01](../02-bring-your-own-model/01-choosing-a-byom-path.md#where-a-registered-model-works); "not stated" means the pages read don't say.

## Kestrel's people and their apps

| Person | Opens | For |
|---|---|---|
| Ama (customer service lead) | Delivery Desk inside Workshop; Threads for policy PDFs | Drafted updates; quick policy checks |
| Kofi (warehouse lead, Accra) | Workshop with an Analyst widget and Assist-served SOPs | Regional questions; how to review proposals |
| Lena (finance, Kestrel Pay) | Threads; the "Invoice disputes" chatbot in Assist | Rate cards; dispute procedure |
| Tomás (fraud analyst) | AIP Analyst | Ad-hoc chargeback questions, then skills and functions for repeat ones |
| Priya (data engineer) | AI FDE in Data integration mode | Pipeline scaffolding, reviewed by pull request |
| Daniel (application developer) | AI FDE, Evolve, Chatbot Studio, Logic | Building, reviewing and optimising |
| Ops leads | Boardroom | Peak-season plans |

**[Explanation]** A rule of thumb that falls out of the table: **Assist** and **Threads** answer, **Analyst** and **Boardroom** investigate, **AI FDE** and **Evolve** change the platform. Give people the least powerful app that does their job, and turn on writing only where a person still confirms.

---
[Module index](README.md) · Next: [02 — AIP Assist](02-aip-assist.md)
