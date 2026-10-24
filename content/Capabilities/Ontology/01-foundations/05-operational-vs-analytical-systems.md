# 05 — Operational vs analytical systems

*Sources: [Why create an Ontology?](https://www.palantir.com/docs/foundry/ontology/why-ontology/) · [Funnel batch pipelines](https://www.palantir.com/docs/foundry/object-indexing/funnel-batch-pipelines/) · [Change data capture](https://www.palantir.com/docs/foundry/data-integration/change-data-capture/) · [Types of pipelines](https://www.palantir.com/docs/foundry/building-pipelines/pipeline-types/) · Kleppmann (2017), see *Additional references* · checked October 2, 2026 · Ready for Review*

- **[Concept]** **OLTP** (operational) systems run the business one transaction at a time: place an order, capture a payment. **OLAP** (analytical) systems answer questions across many records: revenue by category last quarter.
- **[Concept]** A **system of record** is authoritative for a fact. A **system of action** is where decisions are made and carried out. A **system of insight** is where data is analysed.
- **[Docs]** Palantir positions the Ontology as **operational**: closing the action loop "is what distinguishes an operational system from an analytical system". Actions can write back to enterprise systems.
- **[Docs]** Operationally, user edits made through actions apply to the object index **immediately**. Funnel merges them with source data by primary key, and the pipeline runs at least **every six hours** when there are edits, to persist them.
- **[Explanation]** The key design question for every property: **which system is the source of truth, and how does a decision made in Foundry reach it?**

## Three gaps in analytical platforms
**[Concept]** Most data platforms are built analytically. Data flows one way, into a warehouse, and decisions are made somewhere else. That causes three gaps:

1. **The latency gap:** insight arrives after the moment to act has passed.
2. **The "swivel-chair" gap:** people read in one tool and act in another, re-keying data by hand.
3. **The memory gap:** the decision and its reasons are never recorded next to the data that prompted it.

An operational Ontology is meant to close all three. It also adds responsibilities analytics never had: concurrency, validation, writeback and audit.

## Vocabulary

### OLTP vs OLAP
**[Concept]**

| | OLTP (operational) | OLAP (analytical) |
|---|---|---|
| Typical operation | Read or write a few records by key | Scan and aggregate millions of records |
| Users | Front-line staff, apps, agents | Analysts, BI tools |
| Data shape | Normalized, current state | Denormalized, historical |
| Latency needs | Milliseconds to seconds | Seconds to hours |
| Main risk | Inconsistent or conflicting writes | Slow or wrong aggregates |

### Systems of record, action and insight
**[Concept]**

| Kind | Role | Kestrel example |
|---|---|---|
| **System of record** | Authoritative for a fact | The storefront DB for order status; the Kestrel Pay ledger for refunds |
| **System of action** | Where a decision is made and executed | Today: three separate refund tools. Target: a refund-approval action in Foundry |
| **System of insight** | Where patterns are analysed | The Snowflake finance warehouse |

**[Explanation]** The Ontology can be all three for different facts. An `Order`'s status may stay owned by the storefront, while a *hold reason* is owned by the Ontology because staff record it there.

### Writeback and change data capture
**[Concept]**
- **Writeback:** sending a decision from the operational layer back to the system of record. It can be an API call, a database write, or a file the target system picks up.
- **Change data capture (CDC):** streaming every insert, update and delete from a database's log, so other systems can mirror it with low latency.

## How Foundry closes the loop
**[Docs]** The *Why* page:
- Data, logic and action are united so decisions can be executed. Human and agent actions can be **staged as scenarios**, governed by granular access controls, and **written back** to transactional systems, edge devices and custom applications.
- In the Onyx example, one decision fans out to several systems:
  - an **API update** to the warehouse system;
  - **native connectors** to three ERPs;
  - a **flat file** for production planning.

**[Docs]** How edits meet source data in OSv2 (*Funnel batch pipelines*):
- The **merge changes** job joins datasource changes with user edits from Actions **by primary key**.
- **User edits apply to indexes immediately.** If edits exist, the live pipeline also runs **every six hours** to store them persistently in Foundry.

**[Docs]** Freshness depends on the pipeline type:

| Pipeline type | Latency | Complexity | Compute cost |
|---|---|---|---|
| Batch | High | Low | Medium |
| Incremental | Low (minutes) | Medium | Low |
| Streaming | Very low (under a minute) | High | High |

Streams can back object types for indexing "on the order of seconds or minutes" (see [02 — Virtual tables and streams](../02-foundry-data-foundations/03-virtual-tables-and-streams.md)).

**[Docs]** CDC (*Change data capture* page):
- Foundry supports CDC syncs from some databases: Db2, SQL Server, Oracle and PostgreSQL.
- The Ontology supports CDC indexing for batch- and stream-backed objects.
- Workshop can auto-refresh frequently updating objects.

**Open question:** the docs list writeback mechanisms such as webhooks and notifications under action types ([Side effects overview](https://www.palantir.com/docs/foundry/action-types/side-effects-overview/)). That page hasn't been read yet, so nothing here relies on how they behave. They are covered in [08 — Actions](../08-actions/README.md).

## A read model with a governed write path
**[Analogy]** Think of the Ontology as an **operational read model with a governed write path**.
- **Reads** come from an index built from systems of record. This resembles a CQRS read model.
- **Writes** are actions. Some change only the Ontology, as edits. Others also notify or write back to the system of record.

**[Analogy] Where it breaks:**
- In classic CQRS, every change flows through the system of record and back. In Foundry, an edit can exist **only in the Ontology**, merged on top of pipeline data, unless you write it back.
- So the Ontology can hold facts that **no source system has**: decision data. That's powerful, and it's also a new source of truth you must manage.

**[Concept]** Questions to answer for every editable property:

1. **Owner:** is the source system or the Ontology authoritative?
2. **Conflicts:** if a pipeline update and a user edit disagree, which wins? (Detailed in [13 — Edits and materializations](../13-backend-architecture/03-edits-and-materializations.md).)
3. **Delivery:** does the source system need to know? Through which writeback, and what happens if it fails?

## Why operational AI is riskier
- **[Docs]** Agents' actions can be staged for human review and then, for trusted processes, allowed to close the loop automatically (*Why* page).
- **[Explanation]** Operational systems are where AI mistakes cost the most. A wrong answer in a report gets ignored; a wrong action in an operational system ships goods or refunds money. That's why actions, permissions, scenarios and evaluations matter more than prompts. See [16 — Human-in-the-loop and staged writes](../16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md).

## Kestrel: who owns a hold?
**[Example]** *Hold order* is a decision Ama makes when fraud is suspected:

| Question | Decision for Kestrel |
|---|---|
| Source of truth for `order.status` | The **storefront DB**. It drives fulfilment |
| Source of truth for `holdReason` and `heldBy` | The **Ontology**. Staff record them there, and no source system has them |
| How the storefront learns about a hold | The *Hold order* action calls the storefront's API, as writeback, so the warehouse stops picking |
| If the API call fails | **Goal:** the action fails, Ama sees an error, and no half-applied hold is left. **Unverified:** whether a failed writeback rolls back the edit depends on how the webhook is configured. Checked in [08 — Actions](../08-actions/README.md) |
| Freshness needed | Minutes. An incremental or CDC sync of order status, not nightly batch |
| Analytics | "Holds per week and the share confirmed as fraud" is an analytical question, answered from the action log and object history |

## Advice and pitfalls
- **[Recommendation]** For each object type, document which properties come from the pipeline, which are edited in Foundry, and which are written back. This is the most useful sentence in an object type's description.
- **[Recommendation]** Choose the pipeline type from the **decision's latency need**, not from preference. The docs recommend starting with batch and moving to incremental or streaming only when needed.
- **[Explanation]** Writeback couples you to another system's availability and rules. Make actions fail clearly rather than half-succeed.

**Pitfalls**
- Building an operational app on a nightly batch when the decision needs minute-level freshness.
- Editing a value in Foundry that the source system will overwrite on the next sync, without a writeback or a precedence rule.
- Treating action-only properties as if a source system backed them up.

## In our courses
- [Intro course 11 — Systems of action](../../../Tracks/Courses/Introduction%20to%20Foundry%20&%20AIP%20for%20Enterprise%20Organizations/11-systems-of-action.md): writeback closes the loop and avoids the swivel-chair.
- [Ontology deep dive 14](../../../Tracks/Application%20Developer/02-deep-dive-creating-your-first-ontology/14-create-object-type.md): our root-cause trade-off between a pipeline column and an edit-only property.
- [Agentic AIP speedrun 16 — Instruct the agent to edit the Ontology](../../../Tracks/Speedrun/Your%20First%20Agentic%20AIP%20Workflow/16-instruct-agent-edit-ontology.md)

## Additional references
- M. Kleppmann, *Designing Data-Intensive Applications*, O'Reilly, 2017, chapters 3 and 11. OLTP vs OLAP storage, and derived data and change streams. The clearest general background for the read-model and CDC ideas here.

---
[Module index](README.md) · Previous: [04 — Semantic layers and domain models](04-semantic-layers-and-domain-models.md) · Next: [02 — Foundry data foundations](../02-foundry-data-foundations/README.md)
