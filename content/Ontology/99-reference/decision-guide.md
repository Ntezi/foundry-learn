# Decision guide

*Sources: the linked notes and the official pages they cite · compiled October 3, 2026 · Ready for Review*

Five decisions that come up in every Ontology design review, each as a flowchart. The flowcharts are **[Recommendation]**: they compress the reasoning in the linked notes, which give the doc rules behind each branch. For one-line answers to narrower questions, see the [topic map's design questions](../MAP.md#by-design-question).

## 1. Property, struct, link or new object type?

```mermaid
flowchart TD
  A[A new piece of information] --> B{Is it its own real-world<br/>thing people search for,<br/>link to, or act on?}
  B -->|yes| C{Does it already exist<br/>as an object type?}
  C -->|yes| L[Link to it]
  C -->|no| T[New object type + link]
  B -->|no| D{Several fields that always<br/>change together?}
  D -->|yes| S[Struct property]
  D -->|no| E{Can it be computed from<br/>linked objects at read time?}
  E -->|yes| DP[Derived property]
  E -->|no| P[Plain property]
```

- One thing split across sources is still **one type** (an MDO, or resolved first): [04-02](../04-object-types/02-backing-datasources-and-mapping.md#step-3--several-datasources-for-one-type-mdos), [15-04](../15-advanced-patterns/04-entity-resolution-across-sources.md).
- A relationship with attributes or a lifecycle is an **object** in the middle: [06-02](../06-links/02-many-to-many-and-object-backed-links.md#what-kestrel-chose).
- Structs vs properties vs objects in detail: [05-03](../05-properties/03-structs.md#struct-separate-properties-or-linked-object). Derived properties' limits: [05-05](../05-properties/05-derived-properties.md).

## 2. Where is the value computed?

```mermaid
flowchart TD
  A[A computed value] --> B{Needed for filtering, sorting<br/>or aggregating across many objects?}
  B -->|yes| C{Fresh enough if computed<br/>on the pipeline's schedule?}
  C -->|yes| PL[Pipeline → backing dataset]
  C -->|no| ST[Stream, or a batch property<br/>plus a live function]
  B -->|no| D{Only from linked objects'<br/>properties?}
  D -->|yes| DP[Derived property]
  D -->|no| F[Function at read time<br/>e.g. a function-backed column]
```

Normalization first, derive at read time when cheap: [11-02 §1](../11-design/02-structural-guidance.md#1-normalization-and-derived-properties-store-each-fact-once). Models specifically: [15-03](../15-advanced-patterns/03-models-in-the-ontology.md#the-general-pattern).

## 3. Interface, shared property, or a new type?

```mermaid
flowchart TD
  A[Several types look alike] --> B{Do they share a real-world<br/>identity, the same key?}
  B -->|yes| M[One type: merge them]
  B -->|no| C{Will consumers treat them<br/>interchangeably, in one list,<br/>one action, one app?}
  C -->|yes| I[Interface<br/>extend it for sub-families]
  C -->|no| D{Just consistent names<br/>and metadata?}
  D -->|yes| SP[Shared property]
  D -->|no| N[Separate types, no abstraction]
```

[07-01](../07-interfaces/01-interfaces.md#three-ways-to-model-a-case-compared), [05-04](../05-properties/04-shared-properties.md#shared-property-or-interface), and the [Rule of Three](../11-design/01-best-practices.md#2-do-not-repeat-yourself-the-rule-of-three). Changing an interface later: [07-02](../07-interfaces/02-implementing-and-extending-interfaces.md).

## 4. Which mechanism changes the data?

```mermaid
flowchart TD
  A[Something must change] --> B{Does a person or agent<br/>decide it, case by case?}
  B -->|yes| C{Rules enough? one object,<br/>simple property changes}
  C -->|yes| AR[Action with rules]
  C -->|no| AF[Function-backed action]
  B -->|no| D{Triggered by an Ontology<br/>change or a schedule?}
  D -->|yes| AU[Automation → action effect]
  D -->|no| PL[Pipeline: it's source data,<br/>not a decision]
```

- Every route that edits objects ends in an **action**, so criteria, logs and side effects apply: [08-01](../08-actions/01-action-types.md), [08-04](../08-actions/04-function-backed-actions.md), [10-06](../10-applications/06-automate-and-ontology-events.md).
- Don't make one action per variant: [Action Sprawl](../11-design/03-anti-patterns.md#action-sprawl). Don't use the Ontology as a pipeline: [Golden Hammer](../11-design/03-anti-patterns.md#the-golden-hammer).

## 5. How much may an agent do alone?

```mermaid
flowchart TD
  A[An agent operation] --> B{Does it write anything?}
  B -->|no| R0[Rung 0–1: read or draft]
  B -->|yes| C{Reversible and cheap,<br/>with a track record in evals?}
  C -->|yes| R5[Rung 5: act, and monitor]
  C -->|no| D{Many related changes<br/>to compare as a plan?}
  D -->|yes| R4[Rung 4: scenario, human merges]
  D -->|no| E{Does a person need to see it<br/>before it happens, in the chat?}
  E -->|yes| R3[Rung 3: confirm-first action]
  E -->|no| R2[Rung 2: proposal object]
```

[16-04 The control ladder](../16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md#the-control-ladder), with Kestrel's placements.

## Also decided elsewhere

| Decision | Note |
|---|---|
| Save directly or branch? | [14-01 tiers](../14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md#1-three-tiers-of-change) |
| Migrate, JSON export, Marketplace or code? | [14-05 four routes](../14-lifecycle-and-operations/05-migration-and-export-import.md#the-four-routes) |
| Object security policy or restricted view? | [12-03](../12-security-and-governance/03-object-and-property-security.md#two-families-of-mechanism) |
| Batch, stream or direct datasource? | [13-02](../13-backend-architecture/02-indexing-and-funnel.md#which-path) |
| Workshop, Slate or OSDK? | [10-03](../10-applications/03-workshop-and-slate.md#choosing-between-them), [10-01](../10-applications/01-choosing-an-ontology-aware-app.md) |
| Events, edit history, time series or process log? | [15-01](../15-advanced-patterns/01-events-history-and-time.md#choosing-in-one-pass) |
| Which analyzer for a string property? | [10-07](../10-applications/07-searching-the-ontology.md#the-lab) |
| Serverless or deployed function? | [09-05](../09-functions/05-writing-functions-in-practice.md#5-where-it-runs) |

---
[Reference index](README.md) · Next: [Docs index](docs-index.md) · [Ontology home](../README.md)
