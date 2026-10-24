# 02 — Getting started with AIP

*Sources: [Get started with AIP](https://www.palantir.com/docs/foundry/aip/getting-started-with-aip/) · checked October 8, 2026 · Ready for Review*

The official page is short: it sends you to three courses on learn.palantir.com. All three are already in this Learn folder, so this note is a route through what you have, not a summary of the page.

**[Docs]** The page recommends, in this order:

| Course the docs name | What the docs say it covers | Our notes |
|---|---|---|
| *Introduction to Foundry & AIP for Enterprise Organizations* | A foundational understanding of the platform and Palantir's approach to data management | [Course notes](../../../Tracks/Courses/Introduction%20to%20Foundry%20&%20AIP%20for%20Enterprise%20Organizations/README.md) |
| *Scoping Use Cases for Foundry & AIP* | A 15-minute course on scoping and prioritising use cases | [Course notes](../../../Tracks/Courses/Scoping%20Use%20Cases%20for%20Foundry%20&%20AIP/README.md) |
| *Speedrun: Your First AIP Workflow* | Building an AI assistant in 60–90 minutes: PDF extraction, Ontology, an AIP Chatbot, an app | [Speedrun notes](../../../Tracks/Speedrun/Your%20First%20AIP%20Workflow/README.md) |

## What the docs leave out

**[Explanation]** The page assumes AIP is already switched on. Before anyone can build, three things have to be true, and each is covered later:

1. **AIP is enabled** on the enrollment, and your group has permission for AIP builder capabilities ([08](../08-security-governance-and-admin/README.md)).
2. **At least one model family is enabled** in Control Panel for your region ([01-01](../01-models-and-llms/01-supported-llms-and-model-catalog.md#2-why-a-model-is-missing)).
3. **Your data can reach that model**: the markings policy for LLM data access allows it ([08](../08-security-governance-and-admin/README.md)).

## A route through this area

**[Recommendation]** For the Application Developer Associate exam, whose domain 7 is AIP Logic and AI-powered applications:

| Step | Read | Why |
|---|---|---|
| 1 | [01 — Models and LLMs](../01-models-and-llms/README.md) | Every builder tool asks you to pick a model |
| 2 | [03 — AIP Logic](../03-aip-logic/README.md) | The exam's main AIP tool, and domain 3's choice between Logic and code |
| 3 | [04 — AIP Evals](../04-aip-evals/README.md) | The guide asks for evaluation and traces |
| 4 | [05 — Chatbot Studio](../05-chatbot-studio/README.md), with [Ontology 16](../../Ontology/16-ai-and-agents/README.md) | Retrieval context, tools and staged writes |
| 5 | [07 — AI FDE](../07-end-user-apps/README.md) | The guide asks you to review AI FDE-generated code |

Modules 02, 06 and the other end-user apps are for work rather than the exam.

---
[Module index](README.md) · Previous: [01 — What AIP is](01-what-aip-is.md) · Next: [03 — Kestrel's AI workload](03-running-example.md)
