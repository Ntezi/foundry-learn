# Lesson 5 — Object Explorer: From Data Catalog to Semantic Exploration

## Learning outcome

Lesson 5 officially introduces **Object Explorer**, Foundry's simplest application for searching objects and performing basic exploration across sets of objects. The deeper goal is to learn to read an ontology from the user's side: not as a schema diagram, but as a navigable model of real operational things.

The live exercise was completed in Object Explorer. Filtering for `OFT` exposed the eight installed training object types:

| Object type | Approximate live count |
|---|---:|
| `[OFT] Flight` | 1M |
| `[OFT] Aircraft` | 291K |
| `[OFT] Flight Alert` | 184K |
| `[OFT] Route` | 9.5K |
| `[OFT] Runway` | 7.5K |
| `[OFT] Airport` | 4.3K |
| `[OFT] Airline` | 481 |
| `[OFT] [Log] Assign root cause` | 0 |

The **Fresh Ontology** type group contains these eight types.

---

## 1. Context: why explore before designing?

### Course Essentials

Previous lessons established that an ontology models recognizable real-world things using object types, properties, links, and actions. Lesson 4 supplied the domain vocabulary: Airline, Aircraft, Airport, Runway, Route, Flight, and Flight Alert.

Lesson 5 now asks us to inspect the model as a consumer. This order matters. A good ontology designer must understand how users discover and traverse the model before creating more types. Otherwise, it is easy to produce a technically valid schema that is confusing or useless in practice.

Think of this as inspecting a city before changing its road network. Object Explorer shows which destinations exist, what each place looks like, and which roads connect them.

### Practical Ontology Engineering

Before extending a real ontology, practitioners normally ask:

- Which concepts already exist?
- What do their names mean to domain users?
- Which properties identify and describe instances?
- Which links already encode relevant relationships?
- Is the data populated, current, and trustworthy?
- Which applications and workflows depend on the types?

This prevents duplicate concepts such as creating `Aerodrome` when `Airport` already expresses the intended meaning.

### Deeper Mastery

Ontology development is not only **schema-first**. It is iterative:

`domain language → model → populated instances → user exploration → feedback → refined model`

The populated instance layer reveals problems that a schema diagram hides: ambiguous titles, missing identifiers, sparse properties, incorrect links, skewed cardinalities, or object types that are too broad.

### Deep Understanding Check

1. Why might a perfectly normalized and internally consistent schema still be a poor operational ontology?
2. Before adding a `Regional Airport` type, what evidence would you seek in Object Explorer?

---

## 2. Object type versus object instance

### Intuition

An **object type** is a reusable definition; an **object instance** is one concrete thing described by that definition.

- Object type: `Airport`
- Object instance: `ESD: Orcas Island (Eastsound, WA)`

In knowledge-representation language, this closely resembles the distinction between a **class** and an **individual**. In database language, it resembles a table definition and a row—but the ontology adds explicit semantics, links, actions, display behavior, and governance.

### Purpose

The distinction solves two different problems:

- The type says what all airports can be expected to have and do.
- The instance says what is true about one airport.

Without the type, individual records lack a shared interpretation. Without instances, a type is only an empty promise.

### What Object Explorer showed

Selecting `[OFT] Airport` revealed approximately 4,300 instances. One previewed instance had properties including:

- title: `ESD: Orcas Island (Eastsound, WA)`
- country: `United States`
- city: `Eastsound, WA`
- latitude: `48.70833333`
- daylight-savings region: `US/Canada`

The preview also exposed semantic links to arriving routes, departing routes, and runways.

### Weak and improved designs

Weak design:

```text
Flight.destination = "ESD"
Flight.destination_city = "Eastsound, WA"
Flight.destination_latitude = 48.70833333
```

The airport is copied into every flight. Names drift, facts conflict, and asking “show every route serving this airport” requires brittle string matching.

Improved design:

```text
Flight --follows route--> Route
Route --has destination--> Airport(ESD)
Airport properties: city, country, latitude, ...
```

The airport has an identity of its own, and many flights or routes can refer to the same object.

### Common mistakes

- Treating an object type as merely a renamed dataset.
- Confusing a display title with a stable identifier.
- Creating a new type for every source-system record shape.
- Assuming every row automatically deserves to become an object.
- Using a type when a controlled value would be sufficient, or using a string when the entity needs identity, links, history, or actions.

### Deep Understanding Check

1. Is `Delayed` best modeled as an object type, a property value, or a Flight Alert subtype? What facts and workflows would determine your answer?
2. If an airport changes its public name, why should its identity normally remain stable?

---

## 3. Properties: attributes with meaning

### Course Essentials

A **property** is a named fact attached to an object, such as an airport's city or latitude. Properties make instances filterable, sortable, understandable, and usable in calculations or actions.

### Purpose and under the hood

Under the hood, a property definition usually carries more than a column name:

- a data type,
- a semantic meaning,
- nullability or expected completeness,
- display formatting,
- provenance from upstream data,
- editability and security rules,
- sometimes constraints or validation behavior.

The ontology therefore turns raw values into governed statements about an identified entity.

### Design reasoning

Good property design asks:

1. What exactly does the value mean?
2. In what unit, timezone, coordinate system, or vocabulary is it expressed?
3. Is it stable or time-varying?
4. Is it authoritative, derived, or user-entered?
5. Is absence meaningful, unknown, or erroneous?

Weak: `delay = 5`  
Improved: `departureDelayMinutes = 5`, calculated against scheduled gate departure time.

The second design prevents different teams from interpreting `5` as seconds, minutes, arrival delay, or a severity code.

### Alternatives and trade-offs

Use a property when the value primarily describes one object and does not need independent identity.

Promote a value to a linked object when it has its own properties, lifecycle, relationships, governance, or reuse. For example, `airlineName` can be a string for a disposable report; an operational system benefits from linking the Flight to an Airline object.

### Deeper Mastery

In formal ontology terms, scalar properties resemble **datatype properties**: they connect an individual to a literal value. Their quality depends on semantic precision, not merely correct storage type.

### Deep Understanding Check

1. Why is `status = "bad"` semantically weak even if every record is populated?
2. Should geographic coordinates be stored directly on Airport, linked through a Location object, or both? Give one scenario favoring each choice.

---

## 4. Link types: relationships as first-class semantics

### Intuition

A **link type** is a meaningful connection between object types. It is not just a technical join; it states how two real-world concepts relate.

The Airport preview showed relationships such as:

- arriving Route → destination Airport,
- departing Route → origin Airport,
- Airport → Runway.

### Purpose

Links solve the fragmentation problem. Raw data is often separated by system boundaries and foreign keys. A link lets a user navigate in domain language: “show the runways at this airport” or “show flights on routes arriving here.”

### Domain, range, and direction

Simply stated, a link has a valid starting type and ending type. Precisely, these are often called its **domain** and **range**.

For example:

```text
originAirport
domain: Route
range: Airport
```

Direction and naming matter. `Route → Airport` is ambiguous because a route normally has both an origin and destination. Two role-specific links—`originAirport` and `destinationAirport`—preserve meaning.

### Cardinality

Cardinality expresses how many related objects are valid or expected:

- one Flight uses one Aircraft at a given operational moment,
- one Aircraft participates in many Flights over time,
- one Airport has many Runways,
- one Route has one origin and one destination.

Real data complicates these rules. Aircraft assignments can change, codeshare flights can involve multiple airlines, and historical truth may require time-bounded relationships. Cardinality should reflect the intended business semantics, not an oversimplified source-system constraint.

### Weak and improved designs

Weak:

```text
Route.relatedAirportIds = ["JFK", "BOS"]
```

The roles are unclear and integrity depends on parsing identifiers.

Improved:

```text
Route --originAirport--> Airport(JFK)
Route --destinationAirport--> Airport(BOS)
```

The semantics are explicit, navigable, and enforceable.

### Common mistakes

- Creating generic links such as `relatedTo`.
- Reversing domain and range accidentally.
- Encoding relationships only as copied string identifiers.
- Assuming a link is correct because the join executes.
- Ignoring time: “assigned to” today may not mean “assigned to” historically.
- Modeling every possible relationship, producing a graph that is technically rich but cognitively unusable.

### Deeper Mastery

Links turn an ontology into a graph. Graph value comes from meaningful paths, not raw edge count. A useful quality test is whether a path answers a real question:

`Flight Alert → Flight → Route → destination Airport → Runway`

This path can support impact analysis during a runway closure. Each link contributes specific semantics.

### Deep Understanding Check

1. Why are two links named `originAirport` and `destinationAirport` better than one symmetric `connectedTo` link?
2. Model an aircraft reassignment so that analysts can answer both “current aircraft” and “aircraft originally scheduled.”

---

## 5. Object search, type catalog, and object sets

### Course Essentials

Object Explorer presents two complementary discovery modes:

- **Object search** finds concrete objects matching keywords or filters.
- The **object type catalog** helps users discover the available kinds of objects.

An **object set** is a dynamically defined or saved collection of object instances, such as “all active flight alerts with high severity.” It is closer to a semantic query result than to a new class.

### Why the distinction matters

The type `Flight Alert` defines what a flight alert is. The object set `Unresolved high-severity alerts at eastern hubs` selects some instances for a particular operational purpose.

Do not create a new object type every time users need a new subset.

Weak:

```text
Object types:
- Flight Alert
- Open Flight Alert
- High Priority Open Flight Alert
- East Coast High Priority Open Flight Alert
```

Improved:

```text
Object type: Flight Alert
Properties: status, severity, eventTime
Links: flight, airport
Object set: status = Open AND severity = High AND airport.region = East
```

### Practical Ontology Engineering

Object sets are useful for inboxes, dashboards, monitoring, assignments, and operational queues. Whether a set is materialized, cached, or evaluated dynamically affects freshness and performance, but it should preserve the same semantic definition.

### Open-world versus closed-world caution

A filter that returns no linked object does not always prove that no relationship exists. It may mean the relationship is unknown, not ingested, not indexed yet, or hidden by permissions. Operational platforms often behave differently from formal open-world reasoning systems, but the modeling lesson remains: **absence of evidence is not automatically evidence of absence**.

### Deep Understanding Check

1. Should “airports with more than five delayed arrivals today” be a new type or an object set? Why?
2. If an object set is unexpectedly empty, list four possible explanations other than “there are no matching real-world things.”

---

## 6. Counts, usage, indexing, and quality signals

### Course Essentials

The catalog displays object counts and usage information. Counts help confirm that a type is populated and give a rough sense of scale.

### What counts do—and do not—tell us

Seeing one million Flight objects confirms that instances are indexed and discoverable. It does **not** prove that:

- every real flight is represented,
- there are no duplicates,
- properties are complete,
- links are correct,
- data is current,
- security is configured properly.

Count is an observability signal, not a quality certificate.

### Installation and indexing

The Marketplace job successfully installed resources and built datasets, but object indexing is a separate stage. Conceptually:

```text
source data → transformed dataset → object mapping → object index → Object Explorer
```

This explains why a dataset build can succeed while Object Explorer temporarily shows zero objects or stale results.

### Real-world quality checks

For a production ontology, validate:

- identity uniqueness and stability,
- expected row-to-object counts,
- property completeness and valid ranges,
- link coverage and cardinality,
- freshness and indexing health,
- access controls from the affected user's perspective,
- consistency across upstream systems.

### Deep Understanding Check

1. A pipeline contains 10,000 airport rows but Object Explorer shows 9,700 Airport objects. Name at least three plausible explanations.
2. Why can a successful build still produce a semantically incorrect ontology?

---

## 7. The action-log object: operational semantics and provenance

### Live observation

The eighth training type is `[OFT] [Log] Assign root cause`, currently with zero instances. Foundry indicates that it was automatically created when logging was enabled for the `[OFT] Assign root cause` action.

### Purpose

This type represents events generated when users execute an action. It supports auditability: who assigned a root cause, to which alert, when, and with what parameters or result.

This illustrates a powerful distinction:

- an **entity object** represents a thing with continuing identity, such as an Aircraft;
- an **event or log object** represents something that happened, such as a root-cause assignment.

### Deeper Mastery

Event modeling enables provenance, temporal analysis, accountability, and process mining. Replacing history with only the latest property value loses information.

Weak:

```text
FlightAlert.rootCause = "Weather"
```

Improved:

```text
FlightAlert.currentRootCause = "Weather"
AssignRootCauseEvent:
  alert -> FlightAlert
  previousCause = null
  newCause = "Weather"
  actor = user123
  timestamp = ...
```

The current property is convenient for operations; the event preserves how the state changed. Many mature ontologies need both.

### Deep Understanding Check

1. Why is an action log more than a debugging artifact?
2. When would storing only the event history be inconvenient, and when would storing only the current state be dangerous?


**Go deeper in the Ontology area:** [03 — Ontology fundamentals](../../Ontology/03-ontology-fundamentals/README.md)

---

## 8. Design judgment checklist

When evaluating an unfamiliar ontology in Object Explorer, ask:

1. **Identity:** What makes each instance the same real-world thing over time?
2. **Meaning:** Are type, property, and link names understandable without source-system knowledge?
3. **Granularity:** Are types neither overly broad nor fragmented into query-specific subtypes?
4. **Relationships:** Do links express business roles rather than generic joins?
5. **Constraints:** Are expected cardinalities, ranges, and required values clear?
6. **Time:** Does the model distinguish current state from historical events?
7. **Provenance:** Can users trace where facts and changes came from?
8. **Usability:** Can operational users find and navigate the objects they think in?
9. **Quality:** Are completeness, uniqueness, freshness, and link coverage monitored?
10. **Governance:** Are permissions, ownership, and downstream dependencies understood?

## Final mastery exercise

Design a response workflow for a diverted flight. Identify:

- the object types and instances involved,
- scalar properties versus links,
- the object set that would power an operations inbox,
- the action a user would execute,
- the event/log object needed for auditability,
- at least one temporal modeling issue,
- and one security or data-quality risk.

If your design can answer “what is happening now?”, “how are the affected things connected?”, “what may the user do?”, and “what happened previously?”, you are thinking beyond tables and toward an operational ontology.

