# 04 — Semantic layers and domain models

*Sources: [The Ontology system (Architecture center)](https://www.palantir.com/docs/foundry/architecture-center/ontology-system/) · [Core concepts](https://www.palantir.com/docs/foundry/ontology/core-concepts/) · [Ontologies overview](https://www.palantir.com/docs/foundry/ontologies/ontologies-overview/) · Fowler, Evans and the W3C OWL 2 Primer, see *Additional references* · checked October 2, 2026 · Ready for Review*

## Three traditions, one Ontology
- **[Concept]** Three traditions try to give data a shared meaning:

  | Tradition | What it adds | Who uses it |
  |---|---|---|
  | **Semantic (metrics) layer** | Business names, metrics and joins over warehouse tables | Analytics |
  | **Domain-driven design (DDD)** | A *ubiquitous language*, *bounded contexts* and *aggregates* | Software design |
  | **Knowledge graphs / OWL** | Classes, properties and individuals with formal logic | Integration and reasoning |

- **[Docs]** Palantir's Architecture center says the Ontology "is not a 'semantic layer'". A thin semantic layer can't integrate and operationalize data, logic, action and security. Palantir uses "ontology" in the sense of "a categorization of the world" backed by live data, not a W3C OWL file.
- **[Explanation]** The Ontology borrows from all three:
  - **business vocabulary**, as in a semantic layer;
  - **one shared domain model with governed operations**, as in DDD;
  - **typed entities and relationships**, as in knowledge graphs.

  It is operational rather than descriptive: it includes actions, writeback and security.
- **[Recommendation]** Use the DDD vocabulary when you design. Use Foundry's terms when you build.

## Why shared meaning is hard
**[Concept]** "Customer" means different things in different departments:

| Department | What "customer" means |
|---|---|
| Marketing | Anyone with an email address |
| Billing | An account with a payment method |
| Support | Whoever opened a ticket |

Each team's reports are right by its own definition and contradict the others. Semantic modelling makes the meaning explicit and shared, so "how many customers did we lose?" has one answer, or at least clearly labelled answers.

## The three traditions

### Semantic (metrics) layer
**[Concept]** A semantic layer sits over a warehouse and defines:
- business-friendly names for tables and columns;
- metrics ("net revenue = gross − refunds − chargebacks");
- the joins between entities.

BI tools then query through it. Its scope is mostly **read-only analytics**.

### Domain-driven design
**[Concept]** From Eric Evans' work:

| Idea | Meaning | Kestrel example |
|---|---|---|
| **Ubiquitous language** | Developers and domain experts use the same words, and the code uses them too | "Order", "Shipment", "Refund", never `ord_hdr` |
| **Bounded context** | A boundary within which a model and its words have one meaning | Payments, Fulfilment, Catalogue |
| **Aggregate** | A cluster of objects changed together, with one root that enforces its rules | `Order` with its `Order Lines`; changes go through the order |
| **Domain event** | Something that happened that the domain cares about | "Payment captured", "Shipment delayed" |

### Knowledge graphs and OWL
**[Concept]** The W3C's Web Ontology Language (OWL) describes **classes**, **properties** and **individuals**. It supports logical **inference**, such as deriving that something belongs to a class from its properties. It works under an **open-world assumption**: if a fact isn't stated, it isn't assumed false.

## What Palantir means by ontology
**[Docs]** What Palantir says about its own Ontology:
- An Ontology is "a categorization of the world" and, in Foundry, "the digital twin of an organization". It maps datasets and models to object types, properties, link types and action types (Core concepts).
- The Ontology "is not a 'semantic layer'". The fourfold integration of data, logic, action and security "cannot be accomplished with a thin semantic layer or a monolithic design". It is a multimodal system grouped into a Language, an Engine and a Toolchain (Architecture center).
- An ontology is a **resource** holding the type definitions. It is scoped to the organizations of its space, private or shared (Ontologies overview).

**[Explanation]** How the three traditions show up:

| Tradition | What Foundry takes from it | What Foundry adds or differs on |
|---|---|---|
| Semantic layer | Business names, descriptions, curated properties, metrics through functions and derived properties | **Writes**: actions and writeback. Per-object and per-property **security**. Use by operational apps and agents, not only BI |
| DDD | A ubiquitous language for objects, links and actions. The open/closed principle and composition ([Design 01](../11-design/01-best-practices.md#the-four-core-principles-in-priority-order)) | **One shared model per ontology** rather than separate models per bounded context. Context boundaries become projects, permissions and interfaces |
| Knowledge graph / OWL | Typed entities and named, traversable relationships; polymorphism through interfaces | Backed by indexed datasets and edits, not RDF triples. The docs we read describe **no OWL-style logical inference**: logic comes from functions, models and rules you write |

**[Explanation]** The Learn course note on [What is the Ontology?](../../Courses/Introduction%20to%20Foundry%20%26%20AIP%20for%20Enterprise%20Organizations/06-what-is-the-ontology.md) calls it "a semantic layer between raw source-system data and the business language". The Architecture center says it is "not a semantic layer". The two aren't really in conflict. The course describes one role the Ontology plays; the Architecture center insists that this role is only part of what it is. When writing for others, prefer "an operational layer that includes a semantic model".

## One shared language, many teams
**[Analogy]** One shared ontology works like **one shared language across an organization**. Different teams can see and use different parts of it, enforced by projects and permissions. But a word means the same thing everywhere.

**[Analogy] Where it breaks:** DDD often recommends **separate models** for separate bounded contexts, joined by translation. Foundry's guidance pushes the other way:
- [Design 03](../11-design/03-anti-patterns.md#department-silos) calls one type per department an anti-pattern, *Department Silos*.
- Instead it recommends **one canonical type**, with security or filtering for team-specific needs, and **interfaces** where the entities really differ.
- The [Ontologies overview](https://www.palantir.com/docs/foundry/ontologies/ontologies-overview/) says working with other teams "is not a reason to create a second ontology".

**[Explanation]** In practice, apply the bounded-context idea *inside* the shared Ontology, through ownership, projects and interfaces, rather than by duplicating entities.

## Why this matters for AI
- **[Concept]** LLMs work better with explicit, named concepts and relationships than with cryptic column names. Semantic modelling is context engineering.
- **[Docs]** The design guidance says a good Ontology lets a person *or an AI agent* navigate it, because it matches how they already think about the domain. It also treats naming and descriptions as navigation aids for agents ([Design 02 §5](../11-design/02-structural-guidance.md#5-naming-conventions-readable-by-humans-navigable-by-agents)).
- **[Explanation]** A knowledge graph is often described as "context for AI". The Ontology goes further, because tools (actions, functions) and permissions are part of the same model. See [16 — The Ontology as AI context](../16-ai-and-agents/01-ontology-as-ai-context.md).

## Kestrel: three meanings of customer
**[Example]** Kestrel has three bounded contexts, and each says "customer":

| Context | "Customer" means | Source |
|---|---|---|
| Storefront | A registered account that placed an order | Storefront DB |
| Kestrel Pay | A payer with card fingerprints and risk history | Payments ledger |
| Support | Someone with a ticket, possibly a guest without an account | Support desk |

Priya and the domain owners settle on this design:

- **One `Customer` object type**, for a person or business who has bought or tried to buy from Kestrel. It has a master ID (see [02 — Keys and identity](02-keys-and-identity.md)).
- **Payment-specific facts** (risk history, card fingerprints) don't go on `Customer`. They live on Kestrel Pay object types such as `Payment`, linked to `Customer`, in a **restricted project**. This applies the bounded context through security rather than through a second customer type.
- **Guest support requesters** with no purchases are a separate concept, `Contact`, which might later link to a `Customer`. This is the "one entity or two?" test from [Design 01 §2](../11-design/01-best-practices.md#2-do-not-repeat-yourself-the-rule-of-three): they don't share a real-world key.

The resulting ubiquitous language is written into each object type's description, so Ama, Lena and the Delivery Desk agent read the same definitions.

## Advice
- **[Recommendation]** Run a short glossary workshop with domain owners before modelling. Disagreements on definitions surface early and cheaply.
- **[Recommendation]** When two teams need different *views* of one entity, reach for security and properties first. Reach for separate object types only when they are really different entities.
- **[Explanation]** "One shared model" raises the cost of changes. That is why open/closed and interfaces matter so much later ([Design 01 §3](../11-design/01-best-practices.md#3-open-for-extension-closed-for-modification)).

## Mistakes
- Assuming a Palantir ontology supports OWL-style reasoning. Inference is something you build with functions and rules.
- Copying DDD's "separate model per context" literally, and recreating Department Silos.
- Treating the Ontology as a BI semantic layer only, with metrics but no actions.

## In our courses
- [Intro course 06 — What is the Ontology?](../../Courses/Introduction%20to%20Foundry%20%26%20AIP%20for%20Enterprise%20Organizations/06-what-is-the-ontology.md): our earlier DDD comparison.
- [Intro course 07 — Shared world for human and AI teams](../../Courses/Introduction%20to%20Foundry%20%26%20AIP%20for%20Enterprise%20Organizations/07-ontology-shared-world.md)

## Additional references
- M. Fowler, [Ubiquitous Language](https://martinfowler.com/bliki/UbiquitousLanguage.html) and [Bounded Context](https://martinfowler.com/bliki/BoundedContext.html): short summaries of Evans' DDD ideas used here.
- E. Evans, *Domain-Driven Design: Tackling Complexity in the Heart of Software*, Addison-Wesley, 2003. The source of ubiquitous language, bounded contexts and aggregates.
- W3C, [OWL 2 Web Ontology Language Primer](https://www.w3.org/TR/owl2-primer/): what "ontology" means in the semantic-web tradition, for contrast.

---
[Module index](README.md) · Previous: [03 — Normalization and denormalization](03-normalization-and-denormalization.md) · Next: [05 — Operational vs analytical systems](05-operational-vs-analytical-systems.md)
