# 02 — Ontology design: Structural guidance

*Sources: [Ontology design: Structural guidance](https://www.palantir.com/docs/foundry/ontology/ontology-structural-guidance/) · checked September 25, 2026; quotes re-verified October 4, 2026 · Ready for Review*

> Moved from `Ontology Design/` to this folder on October 2, 2026, with content unchanged apart from the header and small wording fixes in the October 4 quality review. See [MIGRATION](../MIGRATION.md).

Labels: **[Docs]** paraphrases the Palantir page · **[Explanation]** and **[Example]** are our own additions.

**[Docs]** Concrete guidance on how to structure **properties, relationships and access control**. Six topics: normalization and derived properties, structs, interfaces, links, naming, and security design.

---

## 1. Normalization and derived properties: store each fact once

**[Docs]** Copying values from linked objects onto a parent (**denormalizing**) is risky: when the source changes, every copy has to be updated. **Normalization** keeps data consistent. **Derived properties** give you denormalized-style convenience without the upkeep.

**[Docs]** The key distinction is whether a value can safely be **pre-computed** or has to stay in sync with **live Ontology changes**:

| Kind | When | Tool | The docs' illustration |
|---|---|---|---|
| **Pre-computed** | Uses properties of the *same* object; inputs rarely change, or change only through pipeline ingestion | **Pipeline transform** | A full name built from first and last name. Safe to pre-compute, with no runtime cost |
| **Dynamically derived** | Depends on **linked objects** or values changed by **actions, automations** or other Ontology operations | **Derived property** | A count of a manager's direct reports, which changes as people are reassigned through actions |

**[Docs] Why stored copies fail.** If a stored value depends on things changed by actions, *every* action that could affect it must also update it. Miss one and the value stays wrong until someone notices.

**[Docs] Warning signs:**
- the same value stored on several types;
- properties going stale because they copy values held elsewhere;
- one real-world fact needing writes to several objects;
- counts maintained by hand instead of computed from links.

**[Docs] Performance by scale.** Derived properties are evaluated at **runtime**:

| Scale | Guidance |
|---|---|
| Low to moderate (below ~10k objects per query) | Use derived properties freely |
| High (above ~10k objects per query) | They may add latency. Denormalizing can be the right trade-off, but make it a **conscious, documented** decision, not the default |

**[Docs] Practices:** store each fact **once, on the object it semantically belongs to**. Derive at query time from links. Watch performance as data grows. **Document every denormalization**: why, the source of truth, and how copies are kept in sync.

**[Example] The decision in three questions:**

```text
Does the value depend only on this object's own columns, updated by the pipeline?
  └─ yes → compute it in the pipeline (cheapest; no runtime cost)
  └─ no  → Does it depend on linked objects or on edits made through actions or automations?
             └─ yes → derived property (always correct)
                      └─ Is the query scale above ~10k objects and latency unacceptable?
                           └─ yes → consider documented denormalization, with an explicit sync strategy
```

**[Explanation] Connecting to our earlier study.** The original practice-exam file (question 7) marked "Derived Property" as the right answer for concatenating a full name. This page says the opposite: a same-object value with stable inputs should be **pre-computed in the pipeline**. The [Anti-patterns page](03-anti-patterns.md) calls a function-backed full-name column a Golden Hammer. Our earlier accuracy note on that question was right. Use this page as the authority.

**[Example] Denormalization that goes wrong.** An `Order` stores `customerRegion`, copied from `Customer`. A "Move customer to new region" action updates `Customer` but not the 4,000 past orders. Regional sales reports now disagree depending on which property they read. The fix is to derive it through the Order → Customer link, or, if scale really demands a copy, document which action or pipeline keeps it in sync.

---

## 2. Structs: group fields that belong together

**[Docs]** When a property naturally has several fields (an address with street, city, region and postcode), use a **struct**, not a set of flat properties. Structs keep the grouping and can carry richer metadata.

| Use a struct for | Example from the docs' categories |
|---|---|
| Multi-field values | Address; coordinates with altitude |
| Values with metadata | **AI-generated outputs with confidence, source references and reasoning** |
| Multi-valued properties with selection logic | Several phone numbers, with a **reducer** surfacing the primary one |

**[Docs] Benefits:**
- **Semantic grouping:** an address is one concept, not ten loosely related properties tied together by a naming convention.
- **Metadata capture:** source, confidence and timestamps sit next to the value.
- **Reducer support:** when a property holds several structs, a reducer surfaces the most relevant one, such as the most recently valid address.
- **Main fields:** designate one or more **main fields** so the struct behaves like a simple property, or exposes only those fields, in interfaces and queries.

**[Docs]** Structs are especially valuable in **AI-first workflows**: an LLM's output has a main result *plus* reasoning, sources and confidence. Keep them together.

**[Docs] Practices:** identify fields that are always used together, give the struct clear field names and types, designate a main field, use reducers for multi-valued structs, and capture metadata alongside the value, especially for AI outputs.

**[Explanation] Why this matters for AI outputs.** Suppose an agent classifies a support ticket. Stored as four flat properties (`aiCategory`, `aiConfidence`, `aiReason`, `aiModel`), nothing guarantees they describe the *same* run. A later run might update the category but not the reason. A struct `aiClassification {category (main), confidence, reasoning, model, generatedAt}` is written as one unit, so the evidence can't get separated from the answer. This connects to the Agentic speedrun, where the LLM's eligibility output and its explanation had to be exposed for evaluation.

**[Explanation] Contrast with the Pipeline deep dive.** That course [flattened a JSON address and concatenated it into one string](../../../Tracks/Deep%20Dive/Building%20Your%20First%20Pipeline/11-advanced-transforms-clean-customers.md). That's fine for a display column in a training dataset. But if that data became an Ontology property, this page would favour an **address struct** with a main field: you keep a readable value and can still filter by state.

---

## 3. Interfaces: reusable, future-proof abstractions

**[Docs]** Interfaces are the **main tool** for both DRY and open/closed extension. An interface defines a shared shape (**properties, links, actions**) that several object types implement, so workflows can target the interface instead of each type.

| Use for | What it means |
|---|---|
| Common properties across types | One "inspection" shape shared by vehicles, equipment and facilities |
| Shared workflows | One scheduling workflow working for any bookable resource |
| Taxonomic grouping | One family interface over several specific types, for drill-down aggregation |
| Multi-level abstraction | An interface can **extend** another, adding detail to a broader abstraction |

**[Docs] Platform support.** If a particular context doesn't yet support interface-backed workflows, **define the interface anyway** and temporarily duplicate the workflow per type. That's no worse than having no interface, and it gives a clear path to consolidate once support arrives. (Check the interface docs for current support.)

**[Docs] Practices:** find common shapes; design interfaces around **capabilities** or **taxonomy**; target interfaces in actions, functions and apps; extend interfaces to layer abstractions; **scaffold now, consolidate later**.

**[Explanation] Interface vs a "type" property.** A tempting shortcut is one `Asset` type with an `assetKind` column. That becomes a God Object ([03](03-anti-patterns.md)). The interface approach keeps each type focused on its own properties and rules, and still lets a dashboard say "show me everything Maintainable that is overdue". Use a kind or type *property* only when the variants are the same entity with the same properties and rules, for example a priority level.

---

## 4. Links and object-backed link types: relationships with meaning

**[Docs]** Every link type should answer a **clear domain question**: which facility did this patient visit? Which team does this employee belong to? Which equipment was used on this work order?

| Link type | Use when | Shape |
|---|---|---|
| **Direct link** | The relationship matters but has **no metadata of its own** | Employee → Department |
| **Object-backed link** | The relationship has **its own metadata** (dates, role, status, allocation) | Employee → *Staffing assignment* → Project, where the assignment holds role, start date and allocation |

**[Docs]** Not every workflow needs the linking object. Some care about the assignment details, others only about the direct connection. With object-backed links you can **expose either view**.

**[Docs] What goes wrong:**
- **Lost metadata:** a direct link can't record when, why or in what role.
- **Ambiguous multi-links:** putting `projectRole` on Employee breaks as soon as someone has two projects.
- **Meaningless links:** links that exist only because two datasets share a foreign key add noise and confuse navigation.

**[Docs] Practices:** check the link has real domain meaning; if the relationship has metadata, use an object-backed link; expose the right level of detail per workflow; **name the link from both directions**.

**[Example] Is this an object-backed link?** Ask: *can the relationship itself change, start, end, or have attributes, independently of the two objects?*
- Doctor → Patient "treats": has a start date, a role (attending or consulting) and an end date → **object-backed** (a Care Assignment).
- Invoice → Customer "billed to": no attributes of its own → **direct**.
- Chunk → Entity "mentions" in the AIP Workflow speedrun: a plain join table works today. If you later want the extraction confidence or the sentence where the entity appears, it becomes a Mention object.

**[Explanation]** This matches the Ontology deep-dive note ([lesson 15](../../../Tracks/Application%20Developer/02-deep-dive-creating-your-first-ontology/15-create-link-type.md)): if the relationship needs timestamps, confidence, role or history, promote it to an associative object.

---

## 5. Naming conventions: readable by humans, navigable by agents

**[Docs]** Consistent, descriptive naming is one of the **highest-impact investments** in Ontology quality, and one of the **hardest to fix** once the Ontology is in use.

| Element | Convention | Good (in the docs' spirit) | Bad |
|---|---|---|---|
| Object types | Singular, concrete nouns a domain expert recognizes | `Patient`, `WorkOrder` | `Data`, `Item`, `Record` |
| Properties | Concise and self-explanatory; no type codes or implementation details | `status`, `lastInspectionDate` | cryptic abbreviations, `fieldX` |
| Links | Read naturally **from each direction** | `department` (from the employee), `employees` (from the department) | `relatedItems`, `link1` |
| Dates | **One convention** throughout the Ontology | `createdDate`, `updatedDate`, `effectiveDate` | mixing `createdDate` with `dateOfCreation` |
| Ambiguous terms | Qualify the meaning | `monetaryValue`, `quantityOnHand`, `riskScore` | `value`, `quantity`, `score` |

**[Docs] Practices:** agree conventions **before building** (dates, statuses, identifiers, links); follow what the Ontology already uses; qualify ambiguous words; name links by the relationship; **review names with end users**, using analytical drills to see which words they search for.

**[Explanation] Why agents care as much as people.** An AI agent chooses tools and object types by reading their names and descriptions. A property called `value` forces it to guess, and a plausible wrong guess (money instead of quantity) produces a confident wrong answer. Clear names are, in effect, prompt engineering built into the model.

---

## 6. Security design: semantic and least-privilege

**[Docs]** Express security in **domain terms**, not infrastructure terms. People should be able to read a security configuration and understand what is protected and why.

| Layer | Controls | The docs' healthcare framing |
|---|---|---|
| **Row-level** | *Which objects* a user can see | Some patients visible only to senior staff |
| **Column-level** | *Which properties* on visible objects | Clinical notes visible only to the care team |
| **Cell-level** (both combined) | The intersection | Those patients' clinical notes, only for the senior care team |

**[Docs] What goes wrong:**
- **Duplicated types for security** (a "public" and a "restricted" version): schemas drift, properties get added to one and forgotten on the other, and DRY is broken.
- **Over-permissive defaults**: data is exposed before the lockdown is finished.
- **Filtering in application code instead of policy**: fragile and hard to audit.
- **Boundaries that don't follow the domain**: harder to reason about, and more likely to have gaps.

**[Docs] Practices:**
- **start restrictive**, and widen access deliberately;
- **combine row- and column-level** security for cell-level control;
- **align security with domain boundaries** (a regional manager sees their region; a care team sees its patients), using relationships and policies rather than ad-hoc filters;
- **don't duplicate object types** to get security;
- **review new links, types and properties** so they don't open a new path around restricted data.

**[Explanation] The "new path" risk.** Suppose `Patient.diagnosis` is column-restricted. A later builder adds a `Diagnosis Event` type, backed by a dataset that also contains patient names, with open permissions. Now the diagnosis can be reached through a different path. That's why the docs ask for a review of *new Ontology paths*, not only new properties. It ties to the Intro course's point that markings must **travel with the data**, and to the Pipeline deep dive's advice to segment Projects so permissions sit at stage boundaries.

**[Explanation] Why not filter in Workshop?** Hiding a column in one Workshop app doesn't protect it in Object Explorer, the OSDK, AIP agents or a colleague's new app. Policy at the Ontology layer protects the data wherever it's read.

---

## Key takeaways
- **Pre-compute same-object values in pipelines; derive linked or action-changed values** with derived properties. Denormalize only by documented decision.
- **Structs** for multi-part values and **AI outputs with their evidence**; **interfaces** for shared shape and behaviour.
- **Links must mean something**. If the relationship has attributes, give it its own object.
- **Names**: singular, specific, readable from both directions, one date convention.
- **Security**: one type, row + column policies, domain-aligned, restrictive by default.

## Review checklist
- [ ] For a given value, I can pick pipeline, derived property or documented denormalization, and say why.
- [ ] I can explain why an AI classification belongs in a struct.
- [ ] I can decide between a direct link and an object-backed link using the "does the relationship have its own attributes?" test.
- [ ] I can rename five bad property names into good ones.
- [ ] I can explain row, column and cell-level security, and why duplicating a type for security is wrong.

---
[Design index](README.md) · Previous: [01 — Best practices](01-best-practices.md) · Next: [03 — Anti-patterns](03-anti-patterns.md)
