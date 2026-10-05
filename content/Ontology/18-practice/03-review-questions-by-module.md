# 03 — Self-check by module

*Sources: the notes each question links to · written October 2, 2026; extended October 3 (modules 10, 12–16, and questions moved out of 10-07 and 14-06) · not yet attempted*

Use these after reading a module, or before an exam session. It covers modules 00–10 and 12–16. Each heading links to the note that holds the answers. They were moved here from the end of each note, so the notes themselves stay focused on the topic.

## 00 — Orientation

**[01 — What the Ontology is](../00-orientation/01-what-the-ontology-is.md)**

- [ ] I can name the semantic and kinetic elements and give one Kestrel example of each.
- [ ] I can state the type / instance / collection terms for objects, properties, links and actions.
- [ ] I can explain three ways the "object type = dataset" analogy breaks.
- [ ] I know the difference between *the* Ontology and *an* ontology.

**[02 — Why an Ontology](../00-orientation/02-why-an-ontology.md)**

- [ ] I can name the four components of a decision and give a Kestrel example of each.
- [ ] I can explain "decision data" and "decision lineage" in one sentence each.
- [ ] I can say what distinguishes an operational system from an analytical one, in the docs' terms.
- [ ] I can separate this page's documented mechanisms from its positioning claims.

**[03 — Architecture at a glance](../00-orientation/03-architecture-at-a-glance.md)**

- [ ] I can name the Language, Engine and Toolchain and say what each contains.
- [ ] I can name the six backend services and what each does.
- [ ] I can describe the four Funnel batch steps and where user edits enter.
- [ ] I can explain static vs dynamic and temporary vs permanent object sets.

## 01 — Foundations

**[01 — Entities, attributes and relationships](../01-foundations/01-entities-attributes-relationships.md)**

- [ ] I can apply the four-question entity test to a column.
- [ ] I can explain when a many-to-many relationship should become its own entity.
- [ ] I can map entity, attribute, relationship and associative entity to Foundry terms.
- [ ] I know which link cardinalities Pipeline Builder supports.

**[02 — Keys and identity](../01-foundations/02-keys-and-identity.md)**

- [ ] I can state the four properties of a good key and which ones Foundry requires.
- [ ] I can list the property types OSv2 disallows as primary keys.
- [ ] I can explain what happens to user edits if the primary key changes.
- [ ] I can write a deterministic composite key and say why it needs a separator.
- [ ] I know what happens to duplicate keys within one transaction, and across transactions.

**[03 — Normalization and denormalization](../01-foundations/03-normalization-and-denormalization.md)**

- [ ] I can name the three update anomalies, with a Kestrel example of each.
- [ ] I can tell a snapshot fact from a copy with one question.
- [ ] I can apply the pipeline / derived property / documented-denormalization decision.
- [ ] I can explain why a Type 2 SCD becomes the Time Machine anti-pattern in the Ontology.

**[04 — Semantic layers and domain models](../01-foundations/04-semantic-layers-and-domain-models.md)**

- [ ] I can explain the differences between a semantic layer, a DDD domain model and an OWL knowledge graph.
- [ ] I can explain why Palantir says the Ontology is "not a semantic layer", and reconcile that with the course wording.
- [ ] I can say how a bounded context is handled inside one shared ontology.

**[05 — Operational vs analytical systems](../01-foundations/05-operational-vs-analytical-systems.md)**

- [ ] I can contrast OLTP and OLAP on four dimensions.
- [ ] I can define system of record, action and insight, with a Kestrel example of each.
- [ ] I can explain how a user edit and a pipeline update meet in OSv2, including the six-hour persistence run.
- [ ] I can list the three ownership questions for an editable property.

## 02 — Foundry data foundations

**[01 — Datasets, transactions and schemas](../02-foundry-data-foundations/01-datasets-transactions-and-schemas.md)**

- [ ] I can describe the four transaction types and work out the view from a short history.
- [ ] I can explain why an overwriting `UPDATE` breaks incremental pipelines.
- [ ] I can list four restrictions a backing dataset must meet for OSv2.
- [ ] I can explain "most recent transaction wins" and "one row per key per transaction".

**[02 — Pipelines that feed the Ontology](../02-foundry-data-foundations/02-pipelines-that-feed-the-ontology.md)**

- [ ] I can name the five pipeline stages and what each outputs.
- [ ] I can compare batch, incremental and streaming on latency, complexity and cost.
- [ ] I can list four limitations of Ontology outputs in Pipeline Builder.
- [ ] I can list the checks an Ontology-project dataset should pass.

**[03 — Virtual tables and streams](../02-foundry-data-foundations/03-virtual-tables-and-streams.md)**

- [ ] I can list four limits of stream-backed object types.
- [ ] I can explain why out-of-order events corrupt Ontology state, and how to prevent it.
- [ ] I can say when to choose a virtual table over syncing to a dataset.
- [ ] I can describe what direct datasources add and their main risk.

**[04 — Projects, spaces and markings](../02-foundry-data-foundations/04-projects-spaces-and-markings.md)**

- [ ] I can order organization, space, project, folder and resource, and say what each controls.
- [ ] I can explain why markings follow data and roles don't.
- [ ] I can list four operations after which row-level policies no longer protect data.
- [ ] I can state what is needed to see an object type vs its objects under project-based permissions.

**[05 — Lineage and builds](../02-foundry-data-foundations/05-lineage-and-builds.md)**

- [ ] I can define build, job, JobSpec and schedule, and say what makes an output fresh.
- [ ] I can explain build locking and what happens when one job fails.
- [ ] I can describe how a build on a feature branch resolves inputs and outputs.
- [ ] I can find an object type's Funnel jobs and set a freshness alert.

## 03 — Ontology fundamentals

**[01 — Ontologies as resources](../03-ontology-fundamentals/01-ontologies-as-resources.md)**

- [ ] What does an ontology contain, and how does it relate to a space?
- [ ] When is a shared ontology justified, and what does it *not* do on its own?
- [ ] Why couldn't our Flight Alert type link to Flight in the Ontology deep dive?

**[02 — Ontology Manager: a guided tour](../03-ontology-fundamentals/02-ontology-manager.md)**

- [ ] Walk through the save cycle: what happens between an edit and other users seeing it?
- [ ] Where would you look to find who uses an object type before changing it?
- [ ] How do you undo a saved change to an object type?

**[03 — Objects and object sets](../03-ontology-fundamentals/03-objects-and-object-sets.md)**

- [ ] Static vs dynamic, temporary vs permanent object sets: give a Kestrel example of each.
- [ ] Name the three OSS execution strategies and two default thresholds that move a query to Spark.
- [ ] Rewrite "all orders → shipments → filter late" so it scales.

**[04 — Type metadata and statuses (reference)](../03-ontology-fundamentals/04-type-metadata-and-statuses.md)**

- [ ] Which object type metadata can't change after creation?
- [ ] What can't you do to an active resource?
- [ ] Who can apply the promoted status?

## 04 — Object types

**[01 — Object types: three ways to look at one](../04-object-types/01-object-types.md)**

- [ ] Describe an object type as a definition, an index and a contract. Which anti-pattern comes from each lens winning?

**[02 — Backing datasources and mapping](../04-object-types/02-backing-datasources-and-mapping.md)**

- [ ] Pick a backing source for: per-row access, seconds-level freshness, data in Snowflake, action-only objects.
- [ ] What does a user without access to one datasource of an MDO see?
- [ ] When would you choose a separate linked type over an MDO?

**[03 — Primary keys and titles: the field checklist](../04-object-types/03-primary-keys-and-titles.md)**

- [ ] Which base types are discouraged as primary keys, and why is Long one of them?
- [ ] What happens to edits if the primary key changes?

**[04 — Creating and editing object types (lab)](../04-object-types/04-creating-and-editing-object-types.md)**

- [ ] List four breaking schema changes on OSv2 and the migration you'd use for each.
- [ ] How do you rename an active property's API name safely?

## 05 — Properties

**[01 — Properties and base types](../05-properties/01-properties-and-base-types.md)**

- [ ] Which base types can't be used in action types?
- [ ] Pick base types for money, a status, a delivery location and an identifier.

**[02 — Value types](../05-properties/02-value-types.md)**

- [ ] Where can a value type be used, and what happens when data violates it?
- [ ] How should a breaking constraint change be handled?

**[03 — Structs](../05-properties/03-structs.md)**

- [ ] Explain the array-of-structs query surprise with an example.
- [ ] Struct, separate properties or linked object: when is each right?

**[04 — Shared properties](../05-properties/04-shared-properties.md)**

- [ ] What does a shared property share, and what not? How is it different from an interface?

**[05 — Derived properties](../05-properties/05-derived-properties.md)**

- [ ] What are the two kinds of derived property, and how do they differ?
- [ ] Name five limitations of derived properties.

**[06 — Edit-only, required and mandatory-control properties](../05-properties/06-edit-only-required-and-mandatory-control.md)**

- [ ] When is a required property *not* enforced?
- [ ] How is a mandatory-control property wired up, and why must it be required?

**[07 — Formatting, render hints and reducers: the display layer](../05-properties/07-formatting-and-reducers.md)**

- [ ] What can't you do with a reduced value?
- [ ] Why do interface actions fail on reduced properties?

**[08 — Time series, media, geospatial and vector properties](../05-properties/08-time-series-media-geo-and-vectors.md)**

- [ ] Time series property or sensor object type: how do you choose?
- [ ] What format does a geopoint value use, and what are the limits of a vector property?

## 06 — Links

**[01 — Link types and cardinality](../06-links/01-link-types-and-cardinality.md)**

- [ ] Why don't you create a reverse link type for the other direction?
- [ ] Which cardinality is declared but not enforced, and which tool doesn't offer it?

**[02 — Many-to-many and object-backed links](../06-links/02-many-to-many-and-object-backed-links.md)**

- [ ] What does a join-table link lose that an OrderLine object keeps?
- [ ] List the prerequisites for an object-backed link, in order.

**[03 — Traversal and Search Arounds](../06-links/03-traversal-and-search-arounds.md)**

- [ ] What changes between TSv1 `.get()` and TSv2 `fetchOne()` when no linked object exists?
- [ ] How do you edit a foreign-key link from an action?
- [ ] *Answer sketch for the "Try it" exercise:* start from the small end, Gold-tier customers, then go Customer → orders → shipments (`isLate`) → carrier. That is three Search Arounds, exactly the TSv1 limit. It stays in-memory only while each intermediate set stays under about 100,000 objects.

## 07 — Interfaces

**[01 — Interfaces](../07-interfaces/01-interfaces.md)**

- [ ] Where does the `UNION ALL` mental model break?
- [ ] What limits the number of implementing types, and when?

**[02 — Implementing and extending interfaces](../07-interfaces/02-implementing-and-extending-interfaces.md)**

- [ ] Why can't a property mapping fix `disputeState`'s vocabulary?
- [ ] What can't Pipeline Builder map when implementing an interface?

**[03 — Interface links and action constraints](../07-interfaces/03-interface-links-and-action-constraints.md)**

- [ ] What's the difference between an action type constraint and an interface action rule?
- [ ] What happens on *Create interface link* vs *Delete interface link* when an implementer has two concrete links?

## 08 — Actions

**[01 — Action types](../08-actions/01-action-types.md)**

- [ ] Under "user edits win", what happens when a deleted object's source row reappears?
- [ ] Which object types can't be edited by actions at all?

**[02 — Rules and parameters](../08-actions/02-rules-and-parameters.md)**

- [ ] Why does a static dropdown filter value leak information?
- [ ] Which three rule combinations are invalid?

**[03 — Submission criteria](../08-actions/03-submission-criteria.md)**

- [ ] Why should access conditions never use NOT on group membership?
- [ ] Which side effects does a test run still execute?

**[04 — Function-backed actions](../08-actions/04-function-backed-actions.md)**

- [ ] What are the three risks of auto-upgrading the backing function?
- [ ] Why does a 200-row bulk edit fail without batched execution?

**[05 — Side effects](../08-actions/05-side-effects.md)**

- [ ] Writeback vs side-effect webhook: when does each run, and who sees the failure?
- [ ] By default, what happens if one notification recipient can't see the content?

**[06 — Action permissions](../08-actions/06-action-permissions.md)**

- [ ] How can a user create an object they can't view?
- [ ] Why doesn't a restricted view protect data an action writes?

**[07 — Consistency, reverts and logs](../08-actions/07-consistency-reverts-and-logs.md)**

- [ ] Explain write skew with Kestrel's double refund, and the fix.
- [ ] Who can revert an action, and when does a revert fail?

**[08 — Using actions in the platform](../08-actions/08-using-actions-in-the-platform.md)**

- [ ] Name three requirements for an Object Explorer inline-edit action.
- [ ] Why can an aggregate submission criterion be exceeded by inline edits?

## 09 — Functions

**[01 — Functions on objects](../09-functions/01-functions-on-objects.md)**

- [ ] Which language is the only one that supports interfaces?
- [ ] What must be imported before a function can traverse a link?

**[02 — Query functions and Ontology edits](../09-functions/02-query-functions-and-ontology-edits.md)**

- [ ] Why might a search after an edit return stale results, and what avoids it?
- [ ] How do API-named queries version differently from other functions?

**[03 — Function lifecycle](../09-functions/03-function-lifecycle.md)**

- [ ] Which changes does the compatibility check flag?
- [ ] How do you recover from a breaking change released as a patch?

**[04 — Functions on models and LLMs](../09-functions/04-functions-on-models-and-llms.md)**

- [ ] Why must new model functions be ontology-bound to use them from TSv2?
- [ ] Why does Kestrel's LLM draft into an action instead of sending messages itself?

**[05 — Writing functions in practice](../09-functions/05-writing-functions-in-practice.md)**

- [ ] Why can a function pass live preview and still time out when published?
- [ ] Name two things a deployed function can do that a serverless one can't, and one thing it can't.

## 10 — Applications

**[01 — Choosing an app](../10-applications/01-choosing-an-ontology-aware-app.md)**

- [ ] Name the three dimensions the docs use to compare apps.
- [ ] Why is Object Explorer a cheap usability test for a new object type?

**[02 — Object Views and Object Explorer](../10-applications/02-object-views-and-object-explorer.md)**

- [ ] When does a configured Object View stop picking up new properties automatically?
- [ ] Exploration or list: which one changes when the data changes?

**[03 — Workshop and Slate](../10-applications/03-workshop-and-slate.md)**

- [ ] What are the limits of a Workshop derived property?
- [ ] Which functions can't be selected in Slate's OSDK?

**[04 — OSDK and APIs](../10-applications/04-osdk-and-apis.md)**

- [ ] A token's scope is the intersection of which three things?
- [ ] Which Kestrel property would a Python OSDK drop, and why is that easy to miss?

**[05 — Specialized apps](../10-applications/05-specialized-apps.md)**

- [ ] What does Machinery require of a process object type?
- [ ] What do Vertex events and Dynamic Scheduling both need?

**[06 — Automate](../10-applications/06-automate-and-ontology-events.md)**

- [ ] Why can't "open cases older than 48 hours" be monitored live?
- [ ] Whose permissions do action effects use, and what breaks when that person leaves?
- [ ] Why can't the payment automation call *Hold order* directly?

**[07 — Searching the Ontology](../10-applications/07-searching-the-ontology.md)**

- [ ] Why does `ACC` not find `WH_ACC_01` on the standard analyzer?
- [ ] Why does `DHL*` fail where `dhl*` works?
- [ ] Why does `run` not find `Trail-Runner 2 Shoe` when `runner` does?
- [ ] A product code is `KST_4471_BLU`. Which analyzer would you pick, and how would someone find every `BLU` product?
- [ ] In Object Explorer, what's the difference between `new york` and `"new york"`?

## 12 — Security and governance

**[01 — Two-layer model](../12-security-and-governance/01-two-layer-permission-model.md)**

- [ ] What do you need to see an object type, and what more to see its objects?
- [ ] List the five questions for "an object doesn't show up".

**[02 — Resource permissions](../12-security-and-governance/02-ontology-resource-permissions.md)**

- [ ] Who can create Ontology resources by default under legacy Ontology roles?
- [ ] Why can migrating to project permissions make Marketplace-installed types less visible?

**[03 — Object and property security](../12-security-and-governance/03-object-and-property-security.md)**

- [ ] When are restricted views still the right choice over object security policies?
- [ ] What does a user who fails a property security policy see?

**[04 — Security across the stack](../12-security-and-governance/04-security-across-actions-functions-and-apis.md)**

- [ ] Which controls propagate, and which only filter reads?
- [ ] Why can a submission criterion pass for a user who can't see the property it checks?

**[05 — Shared ontologies](../12-security-and-governance/05-shared-ontologies-and-cross-org.md)**

- [ ] Why does a shared ontology not make referenced data visible on its own?
- [ ] Why did Kestrel create `SharedShipment` instead of moving `Shipment`?

## 13 — Backend architecture

**[01 — Backend services](../13-backend-architecture/01-backend-services.md)**

- [ ] What happens between saving a new property and it being live?
- [ ] Why might a shared object set link stop working the next day?

**[02 — Indexing and the Funnel](../13-backend-architecture/02-indexing-and-funnel.md)**

- [ ] Name the four jobs in a Funnel batch pipeline.
- [ ] Why can out-of-order stream events corrupt Ontology data even with CDC metadata?

**[03 — Edits and materializations](../13-backend-architecture/03-edits-and-materializations.md)**

- [ ] Which of the five stores can a user query directly?
- [ ] What privacy issue does edit history create when an object is deleted and recreated?

**[04 — OSv1 vs OSv2](../13-backend-architecture/04-object-storage-v1-vs-v2.md)**

- [ ] What happens to user edits during a migration's soak period?
- [ ] Which two migration decisions can't be undone later?

**[05 — Limits, usage and compute](../13-backend-architecture/05-limits-usage-and-compute.md)**

- [ ] What is the minimum compute for an action that edits five objects?
- [ ] Why might a Workshop "top 10" chart not show the real top 10?

## 14 — Lifecycle and operations

**[01 — Saving, reviewing and restoring](../14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md)**

- [ ] Which changes can Kestrel save directly, and which must go on a branch?
- [ ] You need to undo yesterday's change to an action type. Why can't you just restore it?

**[02 — Branching and proposals](../14-lifecycle-and-operations/02-branching-and-proposals.md)**

- [ ] Why does Global Branching not replace a dev → prod release process?
- [ ] What happens to a branch nobody touches for five weeks?

**[03 — Schema evolution](../14-lifecycle-and-operations/03-schema-evolution-and-breaking-changes.md)**

- [ ] Why add the new property first and remove the old one last?
- [ ] Why can't the Usage tab tell you whether anyone still reads one property?

**[04 — Packaging with Marketplace](../14-lifecycle-and-operations/04-marketplace-packaging.md)**

- [ ] Name three things that can't go into a product.
- [ ] Why must submission criteria in a packaged action refer to groups, not users?

**[05 — Migration and export/import](../14-lifecycle-and-operations/05-migration-and-export-import.md)**

- [ ] Which route keeps user edits when a type moves?
- [ ] Why not build a release pipeline on the JSON export format?

**[06 — Monitoring and cleanup](../14-lifecycle-and-operations/06-monitoring-and-cleanup.md)**

- [ ] A Workshop table loads 500 orders. How many reads does that count as?
- [ ] When should the cleanup tool deprecate a type instead of deleting it?
- [ ] Why does Kestrel check the payment-hold automation's run history separately?
- [ ] `Planning Task` has a trashed datasource but user edits. Why not delete it?
- [ ] You snoozed `Carrier Rate Card`. Does your colleague still see it in their queue?

## 15 — Advanced patterns

**[01 — Events, history and time](../15-advanced-patterns/01-events-history-and-time.md)**

- [ ] Why doesn't edit history answer "how did the ETA move over time"?
- [ ] When should a sensor reading become an event object?

**[02 — Scenarios](../15-advanced-patterns/02-scenarios.md)**

- [ ] Why should each scenario hold only one idea?
- [ ] How can an agent test re-routes freely without being able to re-route for real?

**[03 — Models in the Ontology](../15-advanced-patterns/03-models-in-the-ontology.md)**

- [ ] Why can't a live model function power a sorted queue of 4,000 shipments?
- [ ] Why does Kestrel use a Modeling Objective rather than a direct deployment for its delay model?

**[04 — Entity resolution across sources](../15-advanced-patterns/04-entity-resolution-across-sources.md)**

- [ ] Why can't an MDO resolve customers across systems?
- [ ] What happens to user edits when two master customers are merged, and how does the design handle it?

## 16 — AI and agents

**[01 — The Ontology as AI context](../16-ai-and-agents/01-ontology-as-ai-context.md)**

- [ ] What does object-level retrieval give a model that document chunks don't?
- [ ] Which security controls stop at the model's output?

**[02 — Semantic search and embeddings](../16-ai-and-agents/02-semantic-search-and-embeddings.md)**

- [ ] Why are chunks a separate object type?
- [ ] What problem does HyDE solve, and what does hybrid search add?

**[03 — Ontology tools for agents](../16-ai-and-agents/03-ontology-tools-for-agents.md)**

- [ ] Why are actions the only write path for an agent?
- [ ] What's the difference between Ontology MCP and Palantir MCP?

**[04 — Human-in-the-loop and staged writes](../16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md)**

- [ ] Why does Kestrel store re-route proposals as objects instead of using Automate's built-in proposals?
- [ ] Why can't a staged-write Logic function use Automate's Logic effect?

**[05 — Designing the Ontology for agents](../16-ai-and-agents/05-designing-the-ontology-for-agents.md)**

- [ ] Give three kinds of knowledge people supply from memory that an agent needs written into the Ontology.

---
[Practice index](README.md) · Previous: [02 — Validation drill kit](02-validation-drill-kit.md)
