# 01 — Ontology design: Best practices

*Sources: [Ontology design: Best practices](https://www.palantir.com/docs/foundry/ontology/ontology-best-practices/) · checked September 25, 2026; quotes re-verified October 4, 2026 · Ready for Review*

> Moved from `Ontology Design/` to this folder on October 2, 2026, with content unchanged apart from the header and small wording fixes in the October 4 quality review. See [MIGRATION](../MIGRATION.md).

Labels: **[Docs]** paraphrases the Palantir page · **[Explanation]** and **[Example]** are our own additions, including every worked example below except where marked.

## What this page is for

**[Docs]** A well-designed Ontology gives a unified, intuitive representation of the organization: data integrates cleanly, teams collaborate on one model, and analytics become possible. The page gives two things: a **checklist of design guidelines**, and **four core principles** in priority order that the guidelines come from.

**[Explanation]** Read this page as the "why" layer. [Structural guidance](02-structural-guidance.md) is the "how" (properties, links, security), [Anti-patterns](03-anti-patterns.md) are the failure modes to recognize, and [Validation](04-validation.md) is how you prove the design works for real users and agents.

---

## The design guidelines (checklist)

**[Docs]** Eight guidelines, each tied to a principle, anti-pattern or structural rule:

| # | Guideline | In one line | Grounded in |
|---|---|---|---|
| 1 | **Model reality, not systems** | Object types represent real-world entities, not how one source system or department stores them | Domain-driven design |
| 2 | **Curate intentionally** | Every property earns its place with clear business or technical value | Normalization and derived properties |
| 3 | **Collaborate across teams** | Involve several departments. Siloed teams are a leading cause of duplication | Do not repeat yourself |
| 4 | **Keep object types focused** | One object type = one distinct entity | Domain-driven design |
| 5 | **Choose the right tool** | Action types for human or agent decisions; pipelines for automated transformation | The Golden Hammer |
| 6 | **Use interfaces for abstraction** | Shared characteristics → an interface, not a wide, sparse object type | Composition over deep hierarchies |
| 7 | **Document your decisions** | Describe object types, properties and links in Ontology Manager | — |
| 8 | **Validate against real business questions** | Task-based exercises prove people and agents can navigate to consequential decisions | [Validation](04-validation.md) |

**[Explanation] How to use the checklist.** At a design review, go through it as questions: *What real thing is this? Who asked for this property? Which other team models this too? Is this one entity or two? Is this a decision (action) or a transformation (pipeline)? What does it share with other types? Where is it documented? Which real question does it answer?* Any question you can't answer is a design gap.

---

## The four core principles (in priority order)

**[Docs]** They come from field experience in government and commercial deployments. **When two principles conflict, the higher one wins.**

| Priority | Principle | Core idea |
|---|---|---|
| 1 | Domain-driven design | Model the real world, not the source data |
| 2 | Do not repeat yourself | If you've built the same thing three times, refactor |
| 3 | Open for extension, closed for modification | Protect core models; let builders extend them |
| 4 | Composition over deep hierarchies | Prefer several interfaces over one inheritance chain; keep things pluggable |

**[Explanation] Why the order matters.** Example conflict: consolidating two object types (DRY, priority 2) would force two different real-world things into one type, which breaks domain-driven design (priority 1). Domain-driven design wins: keep them separate, and share what is really common through an interface. Another: a "protected" core type (priority 3) is modeled wrongly (priority 1). Fixing the semantics outranks keeping it unchanged, though you'd plan that change carefully because others depend on it.

### 1. Domain-driven design: model the world, not the source data

**[Docs]**
- **Objects** should be meaningful real-world concepts (a patient, a work order, a vessel), not database tables, API responses or spreadsheet tabs.
- **Links** should be real relationships (a patient *visited* a facility), not leftover join keys.
- "Ontologize this dataset" doesn't mean mapping columns one-to-one to properties and stopping there. That produces the Kitchen Sink and mirrors the source system's quirks.
- A good Ontology **feels intuitive**. A person or an AI agent can navigate it because it matches how they already think about the domain.

**[Docs] Warning signs:**
- object types mirror source tables;
- properties are copied column-for-column without curation;
- names follow source conventions (cryptic abbreviations) instead of business language;
- the model was designed by looking at the data rather than understanding the domain;
- a row that describes several entities is modeled as one object type.

**[Docs] What it costs:**

| Problem | Impact |
|---|---|
| Unintuitive model | People and agents can't navigate naturally |
| Fragile coupling | A source schema change breaks Ontology consumers |
| Missed relationships | An entity buried in a column (a customer name on an order) can't be linked, searched or reasoned about on its own |
| Poor reuse | Types shaped by one system are hard for other teams to adopt |

**[Docs] Practices:**
- **Find the entities first, with domain stakeholders, before opening the schema.** One dataset often describes several entities.
- **Separate identity from observation.** If a row is a measurement or event *about* an entity, the entity and the observation are probably different object types.
- **Name things for humans.** API names should read naturally and explain themselves.
- **Model the domain, then map the data.** Don't copy the data's shape.
- **Hide non-semantic types.** If a technical type is needed for a workflow, mark it hidden so default views stay clean. Builders can still use it.

**[Example] One spreadsheet, four entities.** A maintenance log export has one row per inspection:

```text
inspection_id | inspected_at | inspector_name | inspector_badge | asset_tag | asset_model | site_code | result | notes
```

Read with the domain in mind, it describes:
- **Inspection** (the event: `inspection_id`, `inspected_at`, `result`, `notes`)
- **Inspector** (a person: badge, name)
- **Asset** (a thing: tag, model)
- **Site** (a place: code)

Links: *Inspection → performed by → Inspector*, *Inspection → of → Asset*, *Asset → located at → Site*.

Mapped one-to-one as `InspectionRow`, you couldn't ask "which assets at Site X have failed two inspections this year?" without text-matching names. And renaming an inspector would mean editing every row.

**[Explanation] "Separate identity from observation" in practice.** Ask: *if this row changed, would the real-world thing be different, or would we just know something new about it?* A new temperature reading doesn't create a new sensor. So Sensor (identity) and Reading (observation) are different types, or the readings become a time series property on the sensor.

### 2. Do not repeat yourself (the rule of three)

**[Docs]** Duplicated object types, redundant properties and copy-pasted workflows cost maintenance. They also make the Ontology harder to reason about for humans and AI agents alike. Aim for **one canonical representation per concept** and **one canonical workflow per operation**. The trigger: *one instance is coincidence, two is a pattern, three means refactor.*

**[Docs] Warning signs:**
- several types share the same properties and similar links;
- the same derived-property or action logic appears on several types;
- teams built near-identical types for slightly different purposes;
- workflows are copy-pasted with small variations.

**[Docs] Costs:** every change has to be repeated, so copies drift apart. People and agents can't tell which type is canonical. Duplicated logic gives conflicting answers. Effort is wasted rebuilding the same thing.

**[Docs] Practices:**
- **Audit for shared shapes.** Decide between *one type with a distinguishing property* and *several types implementing one interface*.
- **Pull repeated logic** into an interface or a shared function.
- **Unify team copies** into one canonical type, with security or filtering for team-specific needs.
- **Apply the rule of three.**

**[Explanation] Which fix to pick.** Use **one type plus a property** when the things are the same entity seen by different teams, such as a customer that sales, support and billing all touch. Use **an interface with separate types** when the things are different entities that share some behaviour, such as a sales lead and a billing account, which have different lifecycles and different keys. The test: *do they share a primary key in the real world?* If yes, it's one entity.

### 3. Open for extension, closed for modification

**[Docs]** Once a type, interface or workflow is proven in production, its **core structure should stay stable**. Others extend it by adding types that implement an interface, or workflows that consume existing objects, **without modifying the core**.

**[Docs] Warning signs:**
- breaking changes to established types that ripple through dependent apps;
- new use cases requiring edits to core types;
- teams editing shared interfaces or actions for their own needs;
- one team's security change affecting other consumers.

**[Docs] Costs:**

| Problem | Impact |
|---|---|
| Breaking changes | Apps, actions and workflows across the organization break |
| Scope creep | The core type drifts toward a God Object |
| Entangled ownership | Several teams edit one type; accountability blurs |
| Security leakage | Extending without clean boundaries widens access |

**[Docs] Practices:**
- decide what is **essential** to the entity and lock it down;
- **design for extension** from the start, leaving room for linked extension types and new interface implementations;
- when adding, ask whether it belongs **on the core** or **on an extension** (a linked type, an interface implementation, or a property namespace);
- give core models **clear security boundaries**.

**[Example] Adding warranty tracking to a core `Vehicle` type.** A fleet team wants warranty fields, but only 30% of vehicles have warranties. Adding five nullable properties to `Vehicle` touches every consumer and leaves 70% of rows empty. Instead, create a linked **`Vehicle Warranty`** type (provider, start, end, coverage), and optionally a **`Warrantied`** interface if other asset types will need warranties too. `Vehicle` itself doesn't change, and the fleet team owns the new type.

**[Explanation] The software analogy.** This is the open/closed principle from object-oriented design, applied to data models. Core types behave like a published API: other teams' code (Workshop apps, functions, OSDK clients, agents) depends on their shape. Changing a property's meaning or removing it is a breaking change. Adding a linked type isn't.

### 4. Composition over deep hierarchies

**[Docs]** The Ontology supports **multiple inheritance through interfaces**, so one entity can combine several focused abstractions instead of sitting in one inheritance chain.

**[Docs] Warning signs:**
- deep chains where child types exist only to combine parent capabilities;
- "combination" types that fuse two unrelated ideas (the docs' examples look like *SchedulableBuilding*);
- workflows tied to specific types when they could target a shared interface;
- adding a capability means restructuring the hierarchy.

**[Docs] Costs:** combinatorial explosion, since every new capability combination needs a new intermediate type. Brittle hierarchies, where parent changes cascade. Limited reuse. And artificial parent types that aren't real-world concepts, which breaks principle 1.

**[Docs] Practices:**
- design interfaces around a **capability or role** (Inspectable, Schedulable, Billable, Depreciable);
- use **taxonomic interfaces** for aggregation and drill-down: one "family" interface implemented by several specific types;
- **target interfaces in workflows**, so one action or app works for every implementing type;
- **compose**: implement several interfaces rather than inserting a type into a chain.

**[Example]** A hospital has `Operating Room`, `MRI Scanner` and `Ambulance`. All three can be *booked* and all three need *maintenance*, but only rooms have floor space and only ambulances move. Define `Bookable` (calendar, booking rules) and `Maintainable` (last service, next service due). Each type implements the ones that apply. One "Book resource" action works across all bookable types. No `BookableMaintainableMobileAsset` class is needed.

---

## Pragmatism and trade-offs

**[Docs]** The principles are **guides, not laws**. Deadlines, legacy systems, partial platform support and user skill levels mean the ideal design isn't always possible straight away.

| Guideline | Meaning |
|---|---|
| Steer, don't block | Under a tight deadline, build something reasonable now with a clear path to improve it |
| Name the trade-off | When you take a shortcut, say what it gives up and when that will matter (the docs' example: denormalization that is fine now but worth revisiting beyond ~10k objects) |
| Incremental over big-bang | An imperfect Ontology in use and producing value beats a perfect one still being designed |
| Defend the critical invariants | **Naming, semantic clarity and security design** are hard to fix later. Cut corners on implementation details, not on these |

**[Docs]** The Ontology is software that runs the organization. Treat it like a production codebase, but put business value ahead of perfection.

**[Explanation] Why those three invariants?** Names end up in every app, function, OSDK client, agent prompt and user's habits. Renaming later is a migration, not an edit. Semantics decide whether the numbers mean what people think they mean. Security mistakes can expose data before anyone notices. Almost everything else, such as a denormalized property, a temporary duplicate workflow or a missing interface, can be fixed in place later.

**[Explanation] An FDE's way of handling a shortcut.** When you accept one, write it down where the next builder will see it, in the object type or property description:
1. what was simplified;
2. why (deadline, a platform gap, data not available yet);
3. what would trigger a revisit (scale, a second consumer, a new data source);
4. who owns the follow-up.

This keeps a pragmatic shortcut from quietly becoming permanent design debt.

---

## Key takeaways
- Four principles, in priority order: **domain first**, then **no duplication**, then **stable core with extensions**, then **interfaces over hierarchies**.
- A dataset is not an entity. Find the real-world things first, then map data into them.
- Guard names, semantics and security. Be flexible on the rest, and document every shortcut.

## Review checklist
- [ ] I can state the four principles in order and resolve a conflict between two of them.
- [ ] Given a flat CSV, I can identify the entities and links hidden in it.
- [ ] I can choose between "one type + property" and "interface + separate types" and justify it.
- [ ] I can explain why adding a linked extension type is safer than adding properties to a core type.
- [ ] I can name the three invariants not to compromise, and say why.

---
[Design index](README.md) · Next: [02 — Structural guidance](02-structural-guidance.md)
