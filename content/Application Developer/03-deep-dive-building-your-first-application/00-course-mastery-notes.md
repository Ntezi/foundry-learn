# Deep Dive: Building Your First Application — Mastery Notes

> Source refresh (2026-08-28): Registered in the authenticated Palantir Learn course, inspected every one of its 20 required text lessons, and completed those course-site lessons. Optional feedback was not submitted. The numbered per-lesson notes in this folder are the authoritative execution-aware companion to this aggregate guide. No Foundry-building exercise was executed during the refresh.

## Course mental model

Workshop is an ontology-backed application builder. A Workshop module is not merely a dashboard: it is an operational interface through which people observe modeled reality, narrow attention, make decisions, and record those decisions back through governed actions.

```text
Datasets → Ontology objects and links → Object sets → Workshop views
                                                ↓
                                         User decisions
                                                ↓
                                        Ontology actions
                                                ↓
                                      Updated governed state
```

The most important design principle is **semantic continuity**: every visual, filter, table row, relationship traversal, and action should preserve the meaning defined in the Ontology. Workshop should not invent a second, contradictory business model in the presentation layer.

---

## Section 1 — Overview

### Lesson 1 — Introduction

#### Course Essentials

Workshop turns ontology objects into interactive operational applications. Object types supply the data, link types support navigation to related objects, and action types provide controlled write-back.

#### Why this exists

Raw data platforms make information available, but availability does not guarantee usability. Operational users need a task-oriented interface that answers:

- What needs attention?
- Why does it need attention?
- What related context matters?
- What decision am I allowed to make?
- How is that decision recorded and audited?

Workshop sits between a semantic model and a human decision. The application should reduce cognitive and operational friction without hiding important uncertainty.

#### Practical Ontology Engineering

A good Workshop module is a projection of the ontology for a particular user and decision. It should expose only the concepts necessary for that workflow while retaining links to deeper context.

Weak design: a screen containing every property because the data exists.

Improved design: a screen ordered by the user's decision sequence—identity, status, urgency, evidence, available action.

#### Deeper Mastery

This is a form of **task-oriented information architecture**. The ontology is the domain model; Workshop is a bounded interaction model over that domain. A single ontology can support many applications because each application selects a different operational perspective.

#### Deep Understanding Check

1. Why is a Workshop module better understood as a decision interface than as a dashboard?
2. Which semantics should live in the ontology rather than being redefined in a widget?

### Lesson 2 — Permissions & Help

#### Course Essentials

Permissions determine which resources, object types, properties, actions, and applications a user can see or use. Help resources explain the product, but permissions define the actual security boundary.

#### Purpose and under the hood

An application may be visible while some data or actions inside it are not. This is intentional: authorization is evaluated across several layers. Application visibility must never be treated as equivalent to data access or action authority.

#### Practical Engineering

Design and test with representative personas:

- viewer who can inspect but not change,
- operator who can execute a narrow action,
- supervisor who can see more context or approve decisions,
- application editor who can change module configuration.

Avoid broad access merely to make a demo work. Permission gaps often reveal that resource ownership and operational responsibility have not been designed clearly.

#### Deep Understanding Check

If a user can open an application but sees an empty table, name at least three explanations other than “there is no data.”

### Lesson 3 — The Use Case

#### Course Essentials

The course uses shipment operations. Users need to explore shipments, compare quantities, identify consolidation opportunities, inspect detailed schedules, and mark selected shipments for consolidation.

#### Why we learn this now

Application design should begin with the decision, not the widget catalog. The use case establishes the user, desired outcome, evidence required, and state change before implementation begins.

#### Practical Engineering

Write a decision statement:

> A logistics operator needs to identify compatible shipments, understand timing and quantity constraints, and record which shipments should be consolidated.

This implies requirements for filtering, aggregation, detailed rows, time visualization, and governed write-back.

#### Alternatives and trade-offs

- A dashboard is suitable if the goal is monitoring only.
- A workflow application is suitable when users must decide and change state.
- An automated rule or function may be preferable if the decision is deterministic and human judgment adds little value.

#### Deep Understanding Check

Which part of shipment consolidation should be automated, and which part should remain a human decision? What evidence would change your answer?

---

## Section 2 — Setting up your Project and Folder

### Lesson 4 — Introduction

Projects and folders establish ownership, discoverability, lifecycle, and permission boundaries for the resources that support an application. They are part of architecture, not cosmetic organization.

**Common mistake:** organizing only by tool—one folder for Workshop, another for ontology—rather than by product or operational capability. Capability-oriented organization makes lineage and stewardship easier to understand.

**Deep Understanding Check:** Who should own the shipment-consolidation capability after the course author leaves?

### Lesson 5 — Create a Foundry Learning Project

#### Course Essentials

A project groups related resources and collaborators. It provides a governed workspace in which an application and its dependencies can be developed.

#### Under the hood

The project is a collaboration and access container; it is not necessarily the runtime boundary of every resource it references. Workshop can depend on ontology resources governed elsewhere.

#### Practical Engineering

Use names that communicate purpose and environment. In production, consider separate development and production lifecycles, documented owners, and release practices rather than editing a live operational module directly.

#### Deep Understanding Check

Why is “Marius test” a weaker long-term project name than “Shipment Consolidation Operations — Training”?

### Lesson 6 — Create a Course-Specific Training Folder

Folders reduce discovery cost and accidental reuse. They should make it obvious which resources are inputs, application artifacts, experiments, and supporting documentation.

Weak structure:

```text
My Folder/
  thing1
  final2
  copy-final
```

Improved structure:

```text
Shipment Consolidation Training/
  Source and setup/
  Workshop application/
  Validation evidence/
```

**Trade-off:** too little organization creates ambiguity; too much nesting hides resources and increases permission complexity.

**Deep Understanding Check:** Which resources should be colocated for discoverability, and which should remain centrally governed and merely referenced?

### Lesson 7 — Install the Marketplace product

#### Course Essentials

A Marketplace product packages reusable resources needed for the exercise. Installation materializes or connects those assets in the target environment.

#### Purpose

Packaging reduces setup variance. Every learner starts from the same data model and application prerequisites, making later behavior reproducible.

#### Practical Engineering

Treat installation as dependency management:

- verify product version and source,
- understand what resources will be created,
- choose the correct destination and ontology,
- inspect permissions and ownership,
- avoid duplicate installations,
- record provenance.

#### Deeper Mastery

A Marketplace package is similar to a deployable module, but installation does not guarantee semantic compatibility. Names may match while identifiers, property meanings, or ontology namespaces differ.

#### Deep Understanding Check

What checks would distinguish “the package installed successfully” from “the installed resources are correct and usable for this application”?

---

## Section 3 — Basic Workshop

### Lesson 8 — Overview

The basic phase establishes the minimum vertical slice: create a module, bind ontology data, render it, then save and view the application.

The learning order matters. Before adding sophisticated logic, prove the end-to-end path from ontology object set to user-visible experience.

**Deep Understanding Check:** Why should an application team validate a thin vertical slice before perfecting layout or adding many widgets?

### Lesson 9 — Create a Workshop application

#### Course Essentials

A Workshop module is the application configuration containing layout, widgets, variables, object sets, event behavior, and action entry points.

#### Under the hood

Workshop behaves like a reactive system. Variables and object sets form application state; widgets render that state; user interactions update state or invoke actions; dependent components recompute.

#### Practical Engineering

Choose a single primary question for the initial page. Avoid creating one enormous page for every persona. Use clear ownership and naming because published modules become operational dependencies.

#### Deep Understanding Check

What should remain stable if the underlying dataset implementation changes but the ontology contract does not?

### Lesson 10 — Add and visualize shipment data

#### Course Essentials

The application receives shipments as an ontology-backed object set and visualizes them. The object set is the shared analytical population from which widgets derive their results.

#### Purpose

Binding widgets to a common object set ensures that filters and selections can coordinate the page. It also preserves object identity and relationships, unlike copying values into disconnected local tables.

#### Weak versus improved design

Weak: each chart independently queries a differently filtered shipment population.

Improved: a clearly defined base shipment set feeds filters, charts, and tables; specialized subsets are named explicitly.

#### Common mistakes

- confusing an object type with the current object set,
- showing counts without defining the population,
- selecting visually attractive fields that do not support the decision,
- ignoring null and unknown categories,
- assuming every widget is synchronized automatically.

#### Deep Understanding Check

If a chart shows 80 shipments and a table shows 76, what state, filtering, null-handling, or aggregation questions should you investigate?

### Lesson 11 — Save, publish, and view

#### Course Essentials

Saving preserves editor state; publishing exposes a version for consumers; viewing tests the consumer experience. These are distinct lifecycle stages.

#### Practical Engineering

Before publishing, verify:

- intended audience and permissions,
- empty/loading/error states,
- filter defaults,
- action availability,
- mobile or constrained viewport behavior where relevant,
- data freshness and object-set semantics.

Publishing is not proof of correctness. Validate as a representative end user, not only as the application owner.

#### Deep Understanding Check

Why can an application work correctly in edit mode but fail for a published viewer?

---

## Section 4 — Core Workshop

### Lesson 12 — Overview

The core phase transforms a data display into an analytical decision surface. Filters reduce the candidate set, charts reveal patterns, tables provide exact evidence, and a Gantt chart exposes temporal compatibility.

This is a progression from **overview → explanation → detail → decision**.

### Lesson 13 — Add filters

#### Course Essentials

Filters modify the active object set according to user-selected criteria.

#### Purpose and semantics

A filter is an operational hypothesis: “Only these objects are currently relevant.” The filter's label, property, operator, null behavior, and default all affect meaning.

#### Practical Engineering

Prefer decision-relevant filters such as status, location, product, and date window. Make active filters visible and resettable. Avoid defaults that silently exclude important exceptions.

**Edge cases:** null values, time zones, inclusive versus exclusive boundaries, case normalization, multi-select semantics, and filters whose values disappear after other filters apply.

#### Deep Understanding Check

Should “delivery date is today” use the viewer's timezone, facility timezone, or a canonical operational timezone? Why?

### Lesson 14 — Visualize product shipment quantities

#### Course Essentials

Aggregation groups shipment objects by product and summarizes quantity. This answers “where is the operational volume?” rather than “which individual shipments exist?”

#### Under the hood

The chart changes analytical grain. Rows may represent shipments, but marks represent product-level aggregates. Measures require defined units and aggregation rules.

#### Common traps

- summing quantities measured in incompatible units,
- interpreting object count as quantity,
- allowing duplicate shipment objects to inflate totals,
- hiding products with zero or unknown quantities,
- using a pie chart when precise comparison is required.

#### Deeper Mastery

A trustworthy chart has an explicit semantic contract: population, grouping dimension, measure, unit, aggregation, time scope, and null treatment.

#### Deep Understanding Check

When would shipment count be more useful than summed shipment quantity, and when would it be misleading?

### Lesson 15 — Provide product shipment details via a table

Tables provide exact, inspectable evidence behind aggregate patterns. They support sorting, comparison, object selection, and transition from a population to an individual case.

Good columns answer the decision: shipment identity, product, quantity and unit, origin/destination, timing, status, and consolidation state. Do not expose every property by default.

**Design trade-off:** more columns increase completeness but reduce scanability. Use progressive disclosure—essential columns first, object details for the rest.

**Deep Understanding Check:** Which five columns would you keep if an operator had only ten seconds to identify a consolidation candidate?

### Lesson 16 — Find shipments for consolidation using a Gantt chart

#### Course Essentials

A Gantt chart maps shipments onto time intervals so users can see temporal overlap and proximity.

#### Purpose

Tables are precise but make interval comparison mentally expensive. A time visualization externalizes that reasoning and makes scheduling compatibility visible.

#### Under the hood

Each bar requires a valid start, end, grouping identity, and time-zone interpretation. The visual is only as reliable as those temporal semantics.

#### Practical Engineering

Consolidation may require more than overlap: compatible origin, destination, product constraints, capacity, service level, and permissible delay. The Gantt chart supplies evidence; it does not by itself encode the full business rule.

#### Common mistakes

- mixing planned and actual timestamps,
- using local times without showing timezone,
- treating missing end times as zero-duration events,
- interpreting visual closeness as operational compatibility,
- overloading the chart with too many rows.

#### Deep Understanding Check

Two shipments overlap in time. List four additional conditions that might still make consolidation invalid.

---

## Section 5 — Actions and Decision Making

### Lesson 17 — Overview

The application now moves from read-only analysis to governed intervention. This is the critical boundary between business intelligence and operations.

An action should express a meaningful domain command, not merely expose arbitrary property editing.

### Lesson 18 — Mark a shipment for consolidation using an action

#### Course Essentials

An ontology action changes shipment state through a controlled form and rule set. Workshop supplies context and invokes the action; the action type owns the write semantics.

#### Purpose

Centralizing change logic provides validation, authorization, auditability, consistent behavior across applications, and a clear business vocabulary.

Weak: expose a generic “edit shipment” form with every writable property.

Improved: expose `Mark shipment for consolidation`, validate eligibility, capture necessary rationale, and change only permitted fields.

#### Under the hood

The action boundary typically includes:

1. selected object identity,
2. user-supplied parameters,
3. permission and validation checks,
4. a mutation rule,
5. success or failure feedback,
6. refreshed object state and audit history.

#### Practical Engineering

Design for double submission, stale state, concurrent edits, partial failure, reversibility, and meaningful error messages. A disabled button should explain why the command is unavailable.

#### Deep Understanding Check

What validation belongs in Workshop for usability, and what validation must remain in the action because it protects correctness?

### Lesson 19 — Mark multiple shipments for consolidation using functions

#### Course Essentials

Functions support more complex or bulk decision logic than a simple single-object action configuration. They can evaluate or modify a selected collection according to shared rules.

#### Purpose and trade-offs

Bulk workflows reduce repetitive work but magnify mistakes. A multi-object operation needs explicit selection semantics, eligibility reporting, atomicity decisions, and idempotent behavior.

Possible strategies:

- **All-or-nothing:** safest when the group must remain consistent, but one invalid object blocks all.
- **Best effort:** processes valid objects and reports failures, but users must understand partial success.
- **Preview then commit:** calculates impact first; slower, but safer for consequential operations.

#### Deeper Mastery

Functions should not be introduced merely because custom code is possible. Prefer declarative ontology actions when they express the rule clearly. Use a function when logic requires cross-object computation, complex validation, orchestration, or reuse that configuration alone cannot provide.

#### Deep Understanding Check

For 100 selected shipments, 7 are no longer eligible at submission time. Should the operation reject all, process 93, or ask the user again? State the business assumptions behind your choice.

---

## Section 6 — Conclusion

### Lesson 20 — Summary

The completed application forms an operational loop:

```text
Observe shipments
  → narrow the object set
  → detect product and time patterns
  → inspect exact candidates
  → invoke governed action
  → observe updated state
```

#### Course Essentials

You should understand how ontology object types, links, and actions power Workshop; how shared object sets coordinate widgets; and how filters, charts, tables, and timelines support different reasoning tasks.

#### Practical Engineering review

Evaluate the module across five dimensions:

1. **Semantic correctness** — Do widgets and actions preserve ontology meaning?
2. **Decision usefulness** — Does each component help a real user decide or act?
3. **Operational safety** — Are permissions, validation, failure states, and auditability sound?
4. **Performance** — Are object sets, aggregations, and interactions responsive at realistic scale?
5. **Maintainability** — Are naming, ownership, dependencies, testing, and release practices clear?

#### Final Deep Understanding Check

Explain the application without naming any Workshop widgets. Describe only the user, decision, evidence, governed command, and resulting state transition. If the workflow cannot be explained this way, the design may be UI-led rather than purpose-led.

### Lesson 21 — Optional Course Feedback

Feedback is not part of the application architecture, but reflective practice matters. Record which concepts were unclear, which steps felt mechanical, where permissions or data semantics caused friction, and what would make the workflow safer or more useful.

For mastery, keep a short design retrospective:

- What assumption did the application make about the user?
- Which widget added the least decision value?
- Which rule is duplicated outside the ontology?
- Which failure mode was not tested?
- What would need to change before production use?

---

## Capstone modeling exercise

Design a shipment-consolidation application before opening Workshop.

1. Define the user and decision.
2. Define the base shipment object set.
3. List the filters and justify every default.
4. Define one aggregation and its semantic contract.
5. Define the evidence required at row level.
6. Define temporal compatibility precisely.
7. Specify the action name, parameters, validations, permission, state transition, and audit fields.
8. Decide how bulk execution handles stale or invalid selections.
9. Define success, empty, loading, permission-denied, and partial-failure states.
10. State how you would verify the published experience as a real operator.

The goal is not to reproduce the course screen. It is to develop the judgment to build a different operational application from first principles.
