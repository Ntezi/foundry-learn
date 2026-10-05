# 03 — Ontology design: Anti-patterns

*Sources: [Ontology design: Anti-patterns](https://www.palantir.com/docs/foundry/ontology/ontology-anti-patterns/) · checked September 25, 2026; quotes re-verified October 4, 2026 · Ready for Review*

> Moved from `Ontology Design/` to this folder on October 2, 2026, with content unchanged apart from the header and small wording fixes in the October 4 quality review. See [MIGRATION](../MIGRATION.md).

Labels: **[Docs]** paraphrases the Palantir page · **[Explanation]** and **[Example]** are our own additions.

**[Docs]** These are traps that look reasonable at first but cause serious problems as the Ontology grows. Each entry covers what it is, why it happens, what it costs and how to fix it.

## The eight at a glance

| Anti-pattern | What it looks like | Fix | Principle it breaks ([01](01-best-practices.md)) |
|---|---|---|---|
| **System Silos** | One object type per **source system** for the same entity | Merge sources in pipelines into one type | Domain-driven design |
| **The Kitchen Sink** | Technical and ETL columns exposed as properties | Curate properties; keep metadata in the dataset | Domain-driven design |
| **Department Silos** | Each **department** has its own copy of a shared entity | One shared type; department data as properties and links | Do not repeat yourself |
| **The God Object** | One type stands for **many different entities** | Separate types plus interfaces for what's shared | Domain-driven design, composition |
| **The Golden Hammer** | One tool (actions, pipelines or functions) used for everything | Match the tool to the job | — (guideline "choose the right tool") |
| **Action Sprawl** | Many **single-property** actions | Actions shaped around business operations | Domain-driven design |
| **The Time Machine** | **Versions** stored as separate objects or types | One object per entity, plus linked history or time series | Domain-driven design, DRY |
| **The Misnomer** | Vague or misleading names | Specific names, qualified properties, links named by relationship | (naming, [02 §5](02-structural-guidance.md)) |

**[Explanation]** Two groups help: **what the types represent** (System Silos, Department Silos, God Object, Time Machine) and **how they're built and used** (Kitchen Sink, Golden Hammer, Action Sprawl, Misnomer). The first group usually needs a data-model migration to fix. The second can often be fixed in place.

---

## System Silos

**[Docs]** Separate object types for the same real-world entity, split by **which system the data came from**.

- **Causes:** teams own different systems and build independently; nobody is sure how to merge the sources; people want to keep every system-specific field without deciding what matters.
- **The docs' scenario:** employee data in an HR system, a badge-access system and a project tool becomes three Employee types.
- **Costs:** no unified view of the person; actions, links and apps built three times; conflicting values with no source of truth; every logic change repeated.
- **Fix:** one Employee type backed by a **merged dataset**:
  1. find the key that identifies the entity across systems;
  2. build a transform that joins all sources;
  3. set **precedence rules** for conflicting values (for example, HR is authoritative for job title);
  4. back one object type with the merged result.

**[Explanation]** Step 3 is the step people skip, and it's a business decision, not a technical one. Get the source owners to agree on which system wins for each field, and write it down. The E2E speedrun did a small version of this: Office Goods and Bureau orders were **unioned into one Order type** through a consolidated customer reference, instead of creating "Office Goods Order" and "Bureau Order".

**[Explanation] When there's no shared key.** Merging needs entity resolution: matching records that refer to the same person or thing. That's pipeline work (fuzzy or rule-based matching), not a reason to keep silos. The AIP Workflow speedrun's "resolve entities" step is a simple example.

---

## The Kitchen Sink

**[Docs]** Unneeded source-system columns exposed as properties, filling the model with technical noise.

- **Causes:** "just in case"; not knowing which fields matter; mapping the source directly; fear of losing data.
- **The docs' scenario:** a CRM-backed Customer that exposes extraction, batch, sequence, table-version, internal-record-ID and ETL timestamps next to the ID, name and email.
- **Costs:** confusion for users; **performance** (larger data, compute and indexes, slower search); important properties buried.
- **Fix:** curate.

| Include | Exclude |
|---|---|
| Business identifiers | Pipeline metadata |
| Human-readable attributes | Internal IDs with no business meaning |
| Dates that matter to the business process | Timestamps only data engineers use |
| Status fields used in filters or actions | Audit columns for pipeline debugging |

**[Docs]** Ask of each column: *would anyone ever need to see, search or filter by this?* Keep technical metadata **in the backing dataset** for debugging, but don't expose it as properties. Use **visibility settings** for borderline properties. Document why each property exists and who uses it.

**[Explanation]** "Not a property" doesn't mean "deleted". The data stays in the dataset with full lineage, so a data engineer can still debug. The only question is whether *Ontology consumers*, including AI agents, should see it. Every exposed property costs attention: an agent reading 80 properties to find the 6 that matter is more likely to pick a wrong one.

---

## Department Silos

**[Docs]** Each department builds its own version of a shared entity. The Ontology then mirrors the **org chart** instead of the business.

- **Causes:** no cross-functional coordination; each team thinks its view is unique; no governance or design authority; wanting control over "our" data.
- **The docs' scenario:** sales, support, finance and marketing each create their own customer type.
- **Costs:** no single truth; cross-functional questions ("show every interaction with this customer") become impossible; development repeated; data-quality fixes don't spread.
- **Fix:** one shared type. Department-specific **attributes become properties** (sales status, support tier, billing account), and department-specific **records become linked types** (opportunities, tickets, invoices). Different views go in **object views** or curated Workshop / OSDK apps, and team-only fields use **restricted views**. Set up a cross-functional working group to own the shared types.

**[Explanation] System Silos vs Department Silos.** They look alike, but the cause differs: System Silos follow *where the data comes from*; Department Silos follow *who is building*. The fix for System Silos is mainly a pipeline (merge). The fix for Department Silos is mainly governance (agree on one model). Often you need both.

---

## The God Object

**[Docs]** One type overloaded to represent **several distinct entities**: bloated, confusing and hard to maintain.

- **Causes:** abstraction driven by surface similarity ("they're all assets"); wanting fewer types; unclear entity definitions; scope creep.
- **Warning signs:** many properties often null; property meaning depends on a type or category value; people asking "what kind of thing is this one?"; rules full of conditionals on that type.
- **The docs' scenario:** an "Asset" covering equipment, software licences, real estate, financial instruments and even employees, with 150+ mostly-null properties whose meanings (value, location, status) change with the kind of asset.
- **Costs:** semantic confusion, sparse data, validation that can't be enforced, mixed search results, and complex conditional actions.
- **Fix:**
  1. list the distinct entities it contains;
  2. give each its own type;
  3. find what they **actually** share;
  4. model that as **interfaces** (the docs use a depreciable-asset interface);
  5. migrate the objects.

**[Explanation] A quick sparsity test.** For each property, measure the share of objects where it's null. If whole *blocks* of properties are null together, and which block depends on a "kind" value, you're looking at several entities in one type.

---

## The Golden Hammer

**[Docs]** Leaning on **one tool** for every problem. The name comes from the saying that when all you have is a hammer, everything looks like a nail.

- **Causes:** familiarity; wanting to give users "control" over when calculations run; not knowing the full platform; thinking only in one layer (Ontology-first, pipeline-first or code-first).
- **The docs' three flavours:**
  - **actions** for work that is really a pipeline job, such as a user-triggered "recalculate regional totals";
  - **pipelines** for work that should be an event-driven **automation**, such as assigning a new alert to the on-call engineer inside pipeline logic;
  - **functions** for work that should be **pre-computed**, such as a function-backed full-name column.
- **Costs:** hitting each tool's limits early, needless complexity, extra work for users, performance problems (runtime calculations are slower than pre-computed ones, and scheduled pipelines are too slow for events), and harder debugging.

**[Docs] The tool map:**

| Tool | Best for | Not for |
|---|---|---|
| **Action types** | Human decisions; user edits to one or a few objects; input that should apply immediately | Batch calculations, scheduled updates, event reactions with no human involved |
| **Batch pipelines** | Processing, aggregation, cleansing, enrichment; pre-computing values on a schedule or when data arrives | Reacting to single object changes; logic that needs human input |
| **Streaming pipelines** | Continuous low-latency processing that must stay current (live status, real-time dashboards) | Infrequent updates; human input; reacting to **Ontology** events (use automations) |
| **Automations** | Reacting to **Ontology changes** (object created, property updated, schedule fired) by triggering actions or notifications, with no user involved | Heavy processing; multi-dataset joins; judgement calls |
| **Functions** | Complex real-time calculations across objects; validation; values that depend on live Ontology state | Simple derivations a pipeline can do; batch processing |
| **Schedules** | Recurring pipeline builds; time- or event-based data refresh | Reacting to individual object changes in real time |

**[Docs] Five questions before you build:**
1. **Action?** Does this need human judgement or input? If not → pipeline or automation.
2. **Pipeline?** Is this a *data transformation* or an *operational workflow*? Cleansing, aggregation and enrichment → pipeline. Assigning, notifying and reacting → automation.
3. **Function?** Can it be pre-computed from source columns without live traversal? → compute it upstream.
4. **Polling pipeline?** Can an automation react to the event directly? For continuous source data, consider streaming.
5. **Batch?** Does the data need to be continuously current? → streaming.

**[Explanation]** Automations are the missing link many builders forget: they connect "something changed" to "something should happen" without a button or a polling job. The Agentic speedrun used exactly this: Automate ran the AIP Logic decision **when a new patient object appeared**. It wasn't a scheduled pipeline, and a person didn't click anything.

**[Example] Placing a new requirement.** "When a shipment's ETA slips by more than 24 hours, flag it and notify the account manager; the account manager decides whether to offer the customer a discount."
- Computing the ETA from carrier feeds → **pipeline** (streaming if carrier updates are continuous).
- Detecting the slip and notifying → **automation** reacting to the property change.
- Deciding on the discount → **action** (human judgement), perhaps with a **function** that proposes an amount.

---

## Action Sprawl

**[Docs]** Many narrow action types that each change **one property**, instead of cohesive business operations.

- **Causes:** thinking in database column updates; building actions one at a time; not knowing that actions can bundle changes; copying CRUD patterns from traditional apps.
- **Warning signs (the docs' numbers):** **more than 10 action types on one object type**; actions always done one after another; names like "Set X" / "Update X"; users complaining about too many steps.
- **Costs:** a cluttered, confusing action list; one business task split across several submissions; actions that don't match real processes; **a fragmented audit trail**.
- **Fix:** design actions around **business operations**. Bundle related changes, use **optional parameters**, name them after the operation (the docs' examples look like *Transfer employee*, *Approve purchase order*, *Escalate ticket*), and enforce constraints with **action rules and validation**. An onboarding-style action can also trigger downstream workflows.

**[Explanation] Why the audit trail matters.** With sprawl, a department transfer shows up as three unrelated edits (department, manager, location) at slightly different times. Nothing says they were one decision, or why. A single "Transfer employee" action records one intentional event with all its parameters and an effective date. That's what a compliance reviewer, or an agent reconstructing history, needs. It matches the Ontology deep-dive note that an action is a **semantic verb**, a command that expresses intent.

**[Explanation] Where the Ontology deep dive sits.** Its "Assign root cause" action changes one property, but that's fine: assigning a root cause *is* a complete business operation. Sprawl is about **many** actions that are fragments of one operation, not about any single-property action.

---

## The Time Machine

**[Docs]** Historical versions of an entity stored as **separate objects or object types**, instead of using time series, snapshots or proper versioning.

- **Causes:** wanting full history; not knowing how to model time in the Ontology; file-versioning habits (v1, v2, v3); not knowing about time series properties or linked history.
- **Warning signs:** several objects for the same entity at different times; properties like `version`, `revision` or `isCurrent` used to tell copies apart; object counts growing with the **number of changes**, not the number of entities; users unsure which one to link to.
- **The docs' scenario:** contract versions as separate objects, or worse, a separate object type per year, with links to vendors and departments duplicated on every copy.
- **Costs:** an explosion in object counts, unclear current state, unclear links, and error-prone reporting across periods.
- **Fix:**
  - **one object per entity** holding its **current** state;
  - a **linked history or amendment type** recording each change (date, old value, new value, reason);
  - **time series properties** for values that change often;
  - the **backing dataset or edit history** for a full audit trail.

**[Explanation] How it differs from "separate identity from observation".** An inspection or a claim-state log entry is a genuine *event*, so it deserves its own object type. That's not a Time Machine. The Time Machine is copying the **whole entity** per change. Mining your first business process gets this right: one **Claim** per claim, with linked **Log** objects for each state change.

---

## The Misnomer

**[Docs]** Vague, generic or misleading names that don't say what things mean.

- **Causes:** personal shorthand; source column names copied over; preferring brevity to clarity; no naming standards; assuming context makes the meaning obvious.
- **Warning signs:** users keep asking what a property means; one name could mean several things; single generic words (value, type, status, date, name) without qualification; links labelled "related to".
- **Costs:** misreading leading to wrong decisions; a steep learning curve; reliance on documentation that goes stale; different teams reading the same name differently.
- **Fix:** self-explanatory names; qualify generic words (what *kind* of value, type or date); name links by the actual relationship; **add descriptions to every element** explaining meaning and valid values; review names with end users; enforce conventions through governance reviews.

**[Example] Renaming exercise**, in the spirit of the docs' guidance:

| Before | Problem | After |
|---|---|---|
| `Record` | What kind? | `Shipment` |
| `amount` | Money? Units? | `invoiceTotalUsd` or `unitsShipped` |
| `type` | Of what? What values are allowed? | `shipmentMode` (Air / Sea / Road) |
| `date` | Which date? | `plannedDeliveryDate`, `actualDeliveryDate` |
| Shipment → Related Location | Which relationship? | `origin` and `destination` as two separate links |

---

## Building a successful Ontology

**[Docs]** These traps are common but avoidable. Focus on the fundamentals: model reality, curate properties, collaborate across teams, and pick the right tool. Design is **iterative**: start from clear entity definitions, involve stakeholders early, refine as you learn, and check for emerging anti-patterns before they become hard to change. Use **real business questions as acceptance tests** for any fix ([04](04-validation.md)).

## Spot it: diagnostic table (our addition)
| You notice… | Probably… |
|---|---|
| Two types with the same key values but different source prefixes | System Silos |
| Properties starting with `_`, `etl_`, `ingest_` | Kitchen Sink |
| Types named after teams ("Finance X", "Ops X") | Department Silos |
| Many nulls in blocks, plus a `kind` or `category` property | God Object |
| A button users must press to refresh a number | Golden Hammer (action instead of pipeline) |
| A pipeline running every minute to spot changes | Golden Hammer (polling instead of automation or streaming) |
| 12 "Update …" actions on one type | Action Sprawl |
| `isCurrent`, `version` or year-suffixed types | Time Machine |
| "What does `value` mean?" in team chat | Misnomer |

## Review checklist
- [ ] I can name all eight anti-patterns and their fixes without notes.
- [ ] I can tell System Silos from Department Silos by cause and by fix.
- [ ] I can place a requirement across action, pipeline, streaming, automation, function and schedule.
- [ ] I can explain why Action Sprawl damages the audit trail.
- [ ] I can tell a legitimate event object from a Time Machine copy.

---
[Design index](README.md) · Previous: [02 — Structural guidance](02-structural-guidance.md) · Next: [04 — Validation](04-validation.md)
