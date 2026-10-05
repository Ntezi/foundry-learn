# 01 — Applied to our courses: a design review of the Ontologies we've built

*Sources: our course notes and [Design 01–04](../11-design/README.md) · written September 25, 2026; moved from `Ontology Design/05` on October 2, 2026 ([MIGRATION](../MIGRATION.md)) · Ready for Review*

**Everything on this page is [Explanation]**: our application of pages [01](../11-design/01-best-practices.md)–[04](../11-design/04-validation.md) to the models described in our course notes. Training courses simplify models on purpose. A "would change" point is not a criticism of the course. It's practice in seeing what a production design would need.

Each review uses the same headings: **model** (from our notes), **what matches the guidance**, **what would become an anti-pattern at production scale**, and **how an FDE would evolve it**.

---

## 1. Speedrun: Your First End-to-End Workflow — `Order`
**Model** ([lesson 22](../../Speedrun/Your%20First%20End-to-End%20Workflow/22-create-your-object.md)): one `Order` type backed by `all_orders`, a union of Office Goods and Bureau orders after joining a consolidated customer reference. Primary key Order Id, title Item Name. Properties include customer name, assignee and days until due. An assign action is added later.

| Matches the guidance | Would become a problem | How to evolve it |
|---|---|---|
| **No System Silos:** two source systems merged into *one* Order type, not "Office Goods Order" + "Bureau Order" | `customer_name` is an **attribute**, not a link. Customers can't be searched or reasoned about on their own ("missed relationships", [01 §1](../11-design/01-best-practices.md)) | Add a `Customer` type backed by the consolidated customer reference, and link Order → Customer |
| Stable business key as primary key | `days_until_due` stored as a value depends on *today*. Our notes warn mapping it doesn't make it recalculate daily | Store `dueDate`. Compute days remaining at read time, or on a scheduled pipeline if it must be stored ([02 §1](../11-design/02-structural-guidance.md)) |
| Assignment through an **action**, a human decision (right tool) | Once ordering, fulfilment and invoicing arrive, a single Order will get pressure to absorb them all (God Object risk) | Keep Order focused. Add linked `Shipment` and `Invoice` types rather than more Order properties |

**Drill question to test it:** *"Which customer has the most overdue orders, and who is assigned to them?"* Today that needs grouping by a text name. After the change, it's one traversal.

## 2. Deep Dive: Creating Your First Ontology — `Flight Alert` → `Flight`
**Model** ([lessons 14–16](../../Application%20Developer/02-deep-dive-creating-your-first-ontology/14-create-object-type.md)): a `Flight Alert` event type linked many-to-one to `Flight`, and an action "Assign root cause" that exposes only Root Cause.

| Matches | Would become a problem | Evolve |
|---|---|---|
| **Identity separated from observation:** alerts are events *about* a flight, not flight properties | If alerts start carrying who investigated, when, and with what confidence, a plain property won't hold that history | A linked `Root Cause Assessment` record, or a struct with the assessor, time and confidence, in the Time Machine-safe style ([03](../11-design/03-anti-patterns.md)) |
| Link replaces duplicating flight facts on every alert (normalization) | Free-text root cause makes "top causes this month" unreliable (Misnomer at the value level) | Use a governed list of root-cause categories plus an optional notes field. Our notes list this as a design suggestion, not a course requirement |
| "Assign root cause" is a **complete business operation**, not sprawl | The per-learner `[username]` prefix on each type is a training convention. In production, per-person copies would be **Department Silos at personal scale** | Use one shared type in production. Per-learner copies exist only for training isolation |

## 3. Speedrun: Mining Your First Business Process — `Claim` + `Log`
**Model** ([lessons 10–12](../../Speedrun/Mining%20Your%20First%20Business%20Process/10-process-mining-introduction.md)): Machinery generates a `Log` type linked to the existing `Claim` type. Each log entry records one state entered, with a timestamp. The generated artifacts are renamed.

| Matches | Would become a problem | Evolve |
|---|---|---|
| **Not a Time Machine:** one Claim per claim, with history as linked Log events, exactly the fix in [03](../11-design/03-anti-patterns.md) | Generated names (for example a default "Process Log Datasource") left unrenamed would be **Misnomers** | The course's rename step is the right habit. Also add **descriptions** saying what one Log object means |
| Current state (on Claim) kept separate from history (Logs) | Duration-style metrics recomputed by hand on Claim objects would repeat logic | Derive durations from the linked Logs, or pre-compute them in the pipeline if the volume is high ([02 §1](../11-design/02-structural-guidance.md)) |

**Drill question:** *"Which claim state has the longest average time before moving on, and which claims are in it now?"* It needs both the history and the current state, which is a good test of this model.

## 4. Speedrun: Your First AIP Workflow — `Chunk` ↔ `Entity`
**Model** ([lesson 29](../../Speedrun/Your%20First%20AIP%20Workflow/29-configure-object-relation.md)): PDF **chunks** (with summaries and embeddings) and extracted **entities**, linked many-to-many through a **join table**. Entity resolution removes only exact duplicate names.

| Matches | Would become a problem | Evolve |
|---|---|---|
| Many-to-many modeled with a join table, not an array property | Aliases stay separate (exact-name dedup only). Two Entity objects for one real thing is a **DRY** breach that splits the graph | Stronger entity resolution in the pipeline (aliases, normalization), with a documented canonical-name rule |
| Chunks and entities are separate concepts | The link has **no metadata**. You can't record extraction confidence or the sentence where the entity is mentioned | Promote the link to an **object-backed `Mention`** (chunk, entity, confidence, span) as soon as those attributes matter ([02 §4](../11-design/02-structural-guidance.md)) |
| | LLM-extracted values have no evidence stored with them | Keep the LLM output and its metadata together in a **struct** ([02 §2](../11-design/02-structural-guidance.md)) |

## 5. Speedrun: Your First Agentic AIP Workflow — `Patient`, `Clinical Trial`, AI decision
**Model** ([lesson 08](../../Speedrun/Your%20First%20Agentic%20AIP%20Workflow/08-foundational-ontology-introduction.md) onward): Patient and Clinical Trial types from Marketplace. An AIP Logic function produces an eligibility decision written through an action, and **Automate** runs it when a new patient appears.

| Matches | Would become a problem | Evolve |
|---|---|---|
| **Golden Hammer avoided:** an **automation** reacts to the new object; no polling pipeline, no button | Separate flat eligibility properties per output don't guarantee the decision and its explanation come from the same run | One **struct** holding the decision (main field), reasoning, model version and timestamp ([02 §2](../11-design/02-structural-guidance.md)) |
| The change is written through an **action** (governed and auditable) | Rerunning overwrites the previous decision, so its history is lost | A linked `Eligibility Assessment` event per run: the current state on Patient, the history as events, which is the Time Machine fix |
| Evals before automation, matching validation-as-practice ([04 §7](../11-design/04-validation.md)) | Several trials would repeat logic per trial type | An interface such as `Screenable` if other screening workflows appear (rule of three) |

## 6. Speedrun: Your First Ontology Function — `Clinic` metrics
**Model** ([use case](../../Speedrun/Your%20First%20Ontology%20Function/03-the-use-case.md)): functions calculate financial measures and per-period history for clinics, a function-backed column and chart, and an edit function behind an action that sets a clinic goal.

| Matches | Would become a problem | Evolve |
|---|---|---|
| **Functions used for live, multi-object calculations**, the right tool per [03](../11-design/03-anti-patterns.md) | If a metric depends only on pipeline-updated facts and is read by many users, a function-backed column recomputes it every view (Golden Hammer risk, and a performance risk above ~10k objects) | Pre-compute stable metrics in the pipeline; keep functions for what depends on live edits |
| Goal-setting is an **action** (human decision) | | |

## 7. Deep Dive: Building Your First Pipeline — per-customer revenue
**Model** ([lessons 11–18](../../Deep%20Dive/Building%20Your%20First%20Pipeline/18-create-an-operationally-valuable-dataset.md)): cleaned customers (address flattened into one string), products at the variation level, transactions, and a per-customer revenue output.

| Matches | Would become a problem | Evolve |
|---|---|---|
| Revenue **pre-computed in the pipeline**, since its inputs are pipeline-updated (right per [02 §1](../11-design/02-structural-guidance.md)) | Address as one string, once it's an Ontology property: can't filter by state | An **address struct** with main fields ([02 §2](../11-design/02-structural-guidance.md)) |
| The bad-join fix (variation, not product) is really a **domain-driven** discovery: the real entity sold is a variation | Calling it "lifetime value" is a **Misnomer**: it's historical revenue | Name it `totalRevenueToDate`, with a description |
| | Product vs variation: if both become types, keep them separate and link them (Product has many Variations) | Don't collapse them into one "Product" with a `variationId` column |

---

## Patterns across our courses
- **Done well repeatedly:** merging sources (no System Silos), events as linked objects (no Time Machine), actions for human decisions, automations for event reactions.
- **The recurring gap:** **relationships with metadata and AI outputs with evidence**. Several courses store a plain link or flat AI properties where production would want object-backed links or structs.
- **The recurring training shortcut:** attributes where production would use links (customer name on Order), because training datasets are pre-joined. Recognize it, and don't copy it into a real project.

## Review checklist
- [ ] For each course model, I can name one thing it does right and one production change, with the principle behind it.
- [ ] I can explain why "days until due" should be derived, not stored.
- [ ] I can say when the Chunk–Entity link should become an object-backed Mention.

---
[Case studies index](README.md) · Previous: [Design 04 — Validation](../11-design/04-validation.md) · Next: [02 — Kestrel Commerce reference model](02-kestrel-reference-model.md)
