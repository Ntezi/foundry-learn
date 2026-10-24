# Docs index

*Sources: the **Ontology building** sidebar of the Foundry docs (every page under it, 397 pages) · checked October 3, 2026; regenerated October 4, 2026 · Ready for Review*

Every page in the official Ontology sidebar, and the note that covers it. Use it in either direction: "where is this page explained?" or "what haven't we covered?".

**Key:** ✅ cited by a note (the note links the page) · ➕ not covered yet; planned note named · — deliberately out of scope (an app's own manual, or a legacy page) · ✗ not covered and no home yet.

**Scope.** This index covers the *Ontology building* sidebar only. Ontology-relevant pages elsewhere (Workshop, OSDK, Automate, Global Branching, Marketplace, observability, AIP) are listed in [SOURCES](../SOURCES.md) and cited by the notes, but aren't indexed here.

## Summary

| Section | Pages | ✅ | ➕ | — | ✗ |
|---|---|---|---|---|---|
| Overview | 5 | 5 | 0 | 0 | 0 |
| Ontologies | 10 | 10 | 0 | 0 | 0 |
| Object and link types | 45 | 45 | 0 | 0 | 0 |
| Action types | 38 | 38 | 0 | 0 | 0 |
| Functions | 72 | 72 | 0 | 0 | 0 |
| Interfaces | 9 | 9 | 0 | 0 | 0 |
| Ontology design | 4 | 4 | 0 | 0 | 0 |
| Semantic search | 6 | 6 | 0 | 0 | 0 |
| Ontology search | 2 | 2 | 0 | 0 | 0 |
| Ontology scenarios | 5 | 5 | 0 | 0 | 0 |
| Object Explorer | 16 | 16 | 0 | 0 | 0 |
| Object Monitors [Sunset] | 11 | 1 | 0 | 10 | 0 |
| Object Views | 21 | 12 | 0 | 9 | 0 |
| Ontology Manager | 9 | 9 | 0 | 0 | 0 |
| Vertex | 27 | 4 | 0 | 23 | 0 |
| Machinery | 6 | 6 | 0 | 0 | 0 |
| Foundry Rules | 27 | 2 | 0 | 25 | 0 |
| Map | 37 | 1 | 0 | 36 | 0 |
| Vulcan | 4 | 1 | 0 | 3 | 0 |
| Dynamic Scheduling | 19 | 2 | 0 | 17 | 0 |
| Ontology architecture | 24 | 24 | 0 | 0 | 0 |
| **Total** | **397** | **274** | **0** | **123** | **0** |

**[Explanation] Why "app manual" is out of scope.** Map, Vertex, Foundry Rules, Dynamic Scheduling, Vulcan and Machinery each have their own manual inside this sidebar. These notes explain what each app *needs from the Ontology* ([10-05](../10-applications/05-specialized-apps.md)), not how to drive the app. Object Monitors is sunset; [10-06](../10-applications/06-automate-and-ontology-events.md) covers its replacement.

## By section

### Overview

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/ontology/overview/) | ✅ [00-01](../00-orientation/01-what-the-ontology-is.md) |
| [Why create an Ontology?](https://www.palantir.com/docs/foundry/ontology/why-ontology/) | ✅ [00-02](../00-orientation/02-why-an-ontology.md) · [01-05](../01-foundations/05-operational-vs-analytical-systems.md) |
| [Models in the Ontology](https://www.palantir.com/docs/foundry/ontology/models/) | ✅ [00-02](../00-orientation/02-why-an-ontology.md) · [15-03](../15-advanced-patterns/03-models-in-the-ontology.md) |
| [Core concepts](https://www.palantir.com/docs/foundry/ontology/core-concepts/) | ✅ [00-01](../00-orientation/01-what-the-ontology-is.md) · [01-01](../01-foundations/01-entities-attributes-relationships.md) · [01-04](../01-foundations/04-semantic-layers-and-domain-models.md) · [02-04](../02-foundry-data-foundations/04-projects-spaces-and-markings.md) · [04-01](../04-object-types/01-object-types.md) |
| [Ontology-aware applications](https://www.palantir.com/docs/foundry/ontology/applications/) | ✅ [00-03](../00-orientation/03-architecture-at-a-glance.md) · [10-01](../10-applications/01-choosing-an-ontology-aware-app.md) |

### Ontologies

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/ontologies/ontologies-overview/) | ✅ [00-01](../00-orientation/01-what-the-ontology-is.md) · [01-04](../01-foundations/04-semantic-layers-and-domain-models.md) · [02-04](../02-foundry-data-foundations/04-projects-spaces-and-markings.md) · [03-01](../03-ontology-fundamentals/01-ontologies-as-resources.md) · [12-05](../12-security-and-governance/05-shared-ontologies-and-cross-org.md) |
| [Branching: Overview](https://www.palantir.com/docs/foundry/ontologies/branching-ontology/) | ✅ [14-01](../14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md) · [14-02](../14-lifecycle-and-operations/02-branching-and-proposals.md) |
| [Branching: Review ontology proposals](https://www.palantir.com/docs/foundry/ontologies/review-ontology-proposals/) | ✅ [14-02](../14-lifecycle-and-operations/02-branching-and-proposals.md) |
| [Branching: Ontology branches [Legacy]](https://www.palantir.com/docs/foundry/ontologies/ontology-branches-legacy/) | ✅ [14-02](../14-lifecycle-and-operations/02-branching-and-proposals.md) |
| [Shared ontologies](https://www.palantir.com/docs/foundry/ontologies/shared-ontologies/) | ✅ [03-01](../03-ontology-fundamentals/01-ontologies-as-resources.md) · [12-05](../12-security-and-governance/05-shared-ontologies-and-cross-org.md) |
| [Migrating between ontologies](https://www.palantir.com/docs/foundry/ontologies/ontology-migration/) | ✅ [03-01](../03-ontology-fundamentals/01-ontologies-as-resources.md) · [12-05](../12-security-and-governance/05-shared-ontologies-and-cross-org.md) · [14-05](../14-lifecycle-and-operations/05-migration-and-export-import.md) |
| [Usage: Ontology volume](https://www.palantir.com/docs/foundry/ontologies/volume-usage/) | ✅ [13-05](../13-backend-architecture/05-limits-usage-and-compute.md) |
| [Usage: Ontology indexing compute](https://www.palantir.com/docs/foundry/ontologies/compute-usage/) | ✅ [13-05](../13-backend-architecture/05-limits-usage-and-compute.md) |
| [Usage: Ontology query compute](https://www.palantir.com/docs/foundry/ontologies/query-compute-usage/) | ✅ [13-05](../13-backend-architecture/05-limits-usage-and-compute.md) |
| [Usage: Object Set Service limitations](https://www.palantir.com/docs/foundry/ontologies/oss-limitations/) | ✅ [03-03](../03-ontology-fundamentals/03-objects-and-object-sets.md) · [05-05](../05-properties/05-derived-properties.md) · [13-01](../13-backend-architecture/01-backend-services.md) · [13-05](../13-backend-architecture/05-limits-usage-and-compute.md) |

### Object and link types

| Page | Where it's covered |
|---|---|
| [Types reference](https://www.palantir.com/docs/foundry/object-link-types/type-reference/) | ✅ [03-03](../03-ontology-fundamentals/03-objects-and-object-sets.md) · [05-01](../05-properties/01-properties-and-base-types.md) |
| [Object types: Overview](https://www.palantir.com/docs/foundry/object-link-types/object-types-overview/) | ✅ [00-01](../00-orientation/01-what-the-ontology-is.md) · [03-03](../03-ontology-fundamentals/03-objects-and-object-sets.md) · [04-01](../04-object-types/01-object-types.md) |
| [Object types: Create an object type](https://www.palantir.com/docs/foundry/object-link-types/create-object-type/) | ✅ [01-02](../01-foundations/02-keys-and-identity.md) · [02-01](../02-foundry-data-foundations/01-datasets-transactions-and-schemas.md) · [03-04](../03-ontology-fundamentals/04-type-metadata-and-statuses.md) · [04-02](../04-object-types/02-backing-datasources-and-mapping.md) · [04-03](../04-object-types/03-primary-keys-and-titles.md) · [04-04](../04-object-types/04-creating-and-editing-object-types.md) |
| [Object types: Edit object types](https://www.palantir.com/docs/foundry/object-link-types/edit-object-type/) | ✅ [04-02](../04-object-types/02-backing-datasources-and-mapping.md) · [04-04](../04-object-types/04-creating-and-editing-object-types.md) |
| [Object types: Enable Gotham integration](https://www.palantir.com/docs/foundry/object-link-types/enable-gotham-integration/) | ✅ [10-05](../10-applications/05-specialized-apps.md) |
| [Object types: Create Ontology objects from Gaia](https://www.palantir.com/docs/foundry/object-link-types/create-ontology-objects-from-gaia/) | ✅ [10-05](../10-applications/05-specialized-apps.md) |
| [Object types: Metadata reference](https://www.palantir.com/docs/foundry/object-link-types/object-type-metadata/) | ✅ [03-04](../03-ontology-fundamentals/04-type-metadata-and-statuses.md) · [16-05](../16-ai-and-agents/05-designing-the-ontology-for-agents.md) |
| [Properties: Overview](https://www.palantir.com/docs/foundry/object-link-types/properties-overview/) | ✅ [04-03](../04-object-types/03-primary-keys-and-titles.md) · [05-01](../05-properties/01-properties-and-base-types.md) |
| [Properties: Edit object type properties](https://www.palantir.com/docs/foundry/object-link-types/edit-properties/) | ✅ [04-03](../04-object-types/03-primary-keys-and-titles.md) · [05-01](../05-properties/01-properties-and-base-types.md) |
| [Properties: Add value formatting](https://www.palantir.com/docs/foundry/object-link-types/value-formatting/) | ✅ [05-07](../05-properties/07-formatting-and-reducers.md) |
| [Properties: Add conditional formatting](https://www.palantir.com/docs/foundry/object-link-types/conditional-formatting/) | ✅ [05-07](../05-properties/07-formatting-and-reducers.md) |
| [Properties: Metadata reference](https://www.palantir.com/docs/foundry/object-link-types/property-metadata/) | ✅ [03-04](../03-ontology-fundamentals/04-type-metadata-and-statuses.md) · [05-01](../05-properties/01-properties-and-base-types.md) · [05-08](../05-properties/08-time-series-media-geo-and-vectors.md) |
| [Properties: Edit-only properties](https://www.palantir.com/docs/foundry/object-link-types/edit-only-properties/) | ✅ [05-06](../05-properties/06-edit-only-required-and-mandatory-control.md) |
| [Properties: Required properties](https://www.palantir.com/docs/foundry/object-link-types/required-properties/) | ✅ [05-06](../05-properties/06-edit-only-required-and-mandatory-control.md) |
| [Properties: Mandatory control properties](https://www.palantir.com/docs/foundry/object-link-types/mandatory-control-properties/) | ✅ [05-06](../05-properties/06-edit-only-required-and-mandatory-control.md) |
| [Properties: Base types](https://www.palantir.com/docs/foundry/object-link-types/base-types/) | ✅ [05-01](../05-properties/01-properties-and-base-types.md) · [05-08](../05-properties/08-time-series-media-geo-and-vectors.md) |
| [Properties: Property reducers](https://www.palantir.com/docs/foundry/object-link-types/property-reducers/) | ✅ [05-07](../05-properties/07-formatting-and-reducers.md) |
| [Properties: Derived properties](https://www.palantir.com/docs/foundry/object-link-types/derived-properties/) | ✅ [05-05](../05-properties/05-derived-properties.md) |
| [Structs: Overview](https://www.palantir.com/docs/foundry/object-link-types/structs-overview/) | ✅ [05-03](../05-properties/03-structs.md) |
| [Structs: Create a struct type](https://www.palantir.com/docs/foundry/object-link-types/create-struct-type/) | ✅ [05-03](../05-properties/03-structs.md) |
| [Structs: Edit struct types](https://www.palantir.com/docs/foundry/object-link-types/edit-struct-type/) | ✅ [05-03](../05-properties/03-structs.md) |
| [Structs: Automapping struct types](https://www.palantir.com/docs/foundry/object-link-types/struct-automapping/) | ✅ [05-03](../05-properties/03-structs.md) |
| [Structs: Structs and shared properties](https://www.palantir.com/docs/foundry/object-link-types/struct-shared-properties/) | ✅ [05-03](../05-properties/03-structs.md) · [05-04](../05-properties/04-shared-properties.md) |
| [Structs: Designate struct main fields](https://www.palantir.com/docs/foundry/object-link-types/struct-main-fields/) | ✅ [05-03](../05-properties/03-structs.md) · [05-07](../05-properties/07-formatting-and-reducers.md) |
| [Shared properties: Overview](https://www.palantir.com/docs/foundry/object-link-types/shared-property-overview/) | ✅ [05-04](../05-properties/04-shared-properties.md) |
| [Shared properties: Create shared properties](https://www.palantir.com/docs/foundry/object-link-types/create-shared-property/) | ✅ [05-04](../05-properties/04-shared-properties.md) |
| [Shared properties: Edit shared properties](https://www.palantir.com/docs/foundry/object-link-types/edit-shared-property/) | ✅ [05-04](../05-properties/04-shared-properties.md) |
| [Shared properties: Use shared properties on object types](https://www.palantir.com/docs/foundry/object-link-types/use-shared-property/) | ✅ [05-04](../05-properties/04-shared-properties.md) |
| [Shared properties: Metadata reference](https://www.palantir.com/docs/foundry/object-link-types/shared-property-metadata/) | ✅ [05-04](../05-properties/04-shared-properties.md) |
| [Link types: Overview](https://www.palantir.com/docs/foundry/object-link-types/link-types-overview/) | ✅ [06-01](../06-links/01-link-types-and-cardinality.md) · [06-02](../06-links/02-many-to-many-and-object-backed-links.md) |
| [Link types: Create a link type](https://www.palantir.com/docs/foundry/object-link-types/create-link-type/) | ✅ [06-01](../06-links/01-link-types-and-cardinality.md) · [06-02](../06-links/02-many-to-many-and-object-backed-links.md) |
| [Link types: Edit link types](https://www.palantir.com/docs/foundry/object-link-types/edit-link-types/) | ✅ [06-01](../06-links/01-link-types-and-cardinality.md) |
| [Link types: Metadata reference](https://www.palantir.com/docs/foundry/object-link-types/link-type-metadata/) | ✅ [06-01](../06-links/01-link-types-and-cardinality.md) |
| [Allow users to edit objects and links](https://www.palantir.com/docs/foundry/object-link-types/allow-editing/) | ✅ [08-01](../08-actions/01-action-types.md) |
| [Value types: Overview](https://www.palantir.com/docs/foundry/object-link-types/value-types-overview/) | ✅ [05-02](../05-properties/02-value-types.md) |
| [Value types: Create a value type](https://www.palantir.com/docs/foundry/object-link-types/create-value-type/) | ✅ [05-02](../05-properties/02-value-types.md) |
| [Value types: Use value types](https://www.palantir.com/docs/foundry/object-link-types/use-value-type/) | ✅ [05-02](../05-properties/02-value-types.md) |
| [Value types: Value type versions](https://www.palantir.com/docs/foundry/object-link-types/value-types-versions/) | ✅ [05-02](../05-properties/02-value-types.md) |
| [Value types: Value type permissions](https://www.palantir.com/docs/foundry/object-link-types/value-types-permissions/) | ✅ [05-02](../05-properties/02-value-types.md) |
| [Value types: Value type constraints](https://www.palantir.com/docs/foundry/object-link-types/value-type-constraints/) | ✅ [05-02](../05-properties/02-value-types.md) |
| [Metadata: Type classes](https://www.palantir.com/docs/foundry/object-link-types/metadata-typeclasses/) | ✅ [03-04](../03-ontology-fundamentals/04-type-metadata-and-statuses.md) |
| [Metadata: Render hints](https://www.palantir.com/docs/foundry/object-link-types/metadata-render-hints/) | ✅ [03-04](../03-ontology-fundamentals/04-type-metadata-and-statuses.md) · [05-07](../05-properties/07-formatting-and-reducers.md) · [10-07](../10-applications/07-searching-the-ontology.md) |
| [Metadata: Statuses](https://www.palantir.com/docs/foundry/object-link-types/metadata-statuses/) | ✅ [03-04](../03-ontology-fundamentals/04-type-metadata-and-statuses.md) · [04-01](../04-object-types/01-object-types.md) · [04-04](../04-object-types/04-creating-and-editing-object-types.md) · [14-03](../14-lifecycle-and-operations/03-schema-evolution-and-breaking-changes.md) |
| [Object type groups](https://www.palantir.com/docs/foundry/object-link-types/type-groups/) | ✅ [03-04](../03-ontology-fundamentals/04-type-metadata-and-statuses.md) |
| [Add Ontology types to a Marketplace product](https://www.palantir.com/docs/foundry/object-link-types/marketplace-ontology-types/) | ✅ [14-04](../14-lifecycle-and-operations/04-marketplace-packaging.md) |

### Action types

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/action-types/overview/) | ✅ [08-01](../08-actions/01-action-types.md) |
| [Getting started](https://www.palantir.com/docs/foundry/action-types/getting-started/) | ✅ [08-01](../08-actions/01-action-types.md) |
| [Explore other action types](https://www.palantir.com/docs/foundry/action-types/explore-action-types/) | ✅ [08-01](../08-actions/01-action-types.md) |
| [Use actions in the platform](https://www.palantir.com/docs/foundry/action-types/use-actions/) | ✅ [08-08](../08-actions/08-using-actions-in-the-platform.md) |
| [Test run](https://www.palantir.com/docs/foundry/action-types/test-run/) | ✅ [08-03](../08-actions/03-submission-criteria.md) · [08-08](../08-actions/08-using-actions-in-the-platform.md) |
| [Rules](https://www.palantir.com/docs/foundry/action-types/rules/) | ✅ [08-02](../08-actions/02-rules-and-parameters.md) · [08-04](../08-actions/04-function-backed-actions.md) |
| [Parameters: Overview](https://www.palantir.com/docs/foundry/action-types/parameter-overview/) | ✅ [08-02](../08-actions/02-rules-and-parameters.md) |
| [Parameters: Set parameter default value](https://www.palantir.com/docs/foundry/action-types/parameters-default-value/) | ✅ [08-02](../08-actions/02-rules-and-parameters.md) |
| [Parameters: Filter results of a parameter dropdown](https://www.palantir.com/docs/foundry/action-types/parameters-filter/) | ✅ [08-02](../08-actions/02-rules-and-parameters.md) |
| [Parameters: Object dropdown security considerations](https://www.palantir.com/docs/foundry/action-types/dropdown-security/) | ✅ [08-02](../08-actions/02-rules-and-parameters.md) · [08-03](../08-actions/03-submission-criteria.md) |
| [Parameters: Override parameter configurations](https://www.palantir.com/docs/foundry/action-types/parameters-override/) | ✅ [08-02](../08-actions/02-rules-and-parameters.md) |
| [Parameters: Performance considerations](https://www.palantir.com/docs/foundry/action-types/parameter-performance-considerations/) | ✅ [08-02](../08-actions/02-rules-and-parameters.md) |
| [Submission criteria](https://www.palantir.com/docs/foundry/action-types/submission-criteria/) | ✅ [08-03](../08-actions/03-submission-criteria.md) · [08-06](../08-actions/06-action-permissions.md) |
| [Actions on interfaces](https://www.palantir.com/docs/foundry/action-types/actions-on-interfaces/) | ✅ [07-03](../07-interfaces/03-interface-links-and-action-constraints.md) |
| [Actions on structs](https://www.palantir.com/docs/foundry/action-types/actions-on-structs/) | ✅ [08-02](../08-actions/02-rules-and-parameters.md) |
| [Function-backed: Overview](https://www.palantir.com/docs/foundry/action-types/function-actions-overview/) | ✅ [08-04](../08-actions/04-function-backed-actions.md) |
| [Function-backed: Getting started](https://www.palantir.com/docs/foundry/action-types/function-actions-getting-started/) | ✅ [08-04](../08-actions/04-function-backed-actions.md) |
| [Function-backed: Batched execution](https://www.palantir.com/docs/foundry/action-types/function-actions-batched-execution/) | ✅ [08-04](../08-actions/04-function-backed-actions.md) |
| [Side effects: Overview](https://www.palantir.com/docs/foundry/action-types/side-effects-overview/) | ✅ [01-05](../01-foundations/05-operational-vs-analytical-systems.md) · [08-05](../08-actions/05-side-effects.md) |
| [Side effects: Notifications](https://www.palantir.com/docs/foundry/action-types/notifications/) | ✅ [08-05](../08-actions/05-side-effects.md) · [08-06](../08-actions/06-action-permissions.md) |
| [Side effects: Set up a notification](https://www.palantir.com/docs/foundry/action-types/set-up-notification/) | ✅ [08-05](../08-actions/05-side-effects.md) |
| [Side effects: Webhooks](https://www.palantir.com/docs/foundry/action-types/webhooks/) | ✅ [08-05](../08-actions/05-side-effects.md) |
| [Side effects: Set up a webhook](https://www.palantir.com/docs/foundry/action-types/set-up-webhook/) | ✅ [08-05](../08-actions/05-side-effects.md) |
| [Trigger schedule build](https://www.palantir.com/docs/foundry/action-types/trigger-schedule-build/) | ✅ [08-05](../08-actions/05-side-effects.md) · [08-06](../08-actions/06-action-permissions.md) |
| [Configure sections](https://www.palantir.com/docs/foundry/action-types/configure-sections/) | ✅ [08-08](../08-actions/08-using-actions-in-the-platform.md) |
| [Upload media](https://www.palantir.com/docs/foundry/action-types/upload-media/) | ✅ [08-08](../08-actions/08-using-actions-in-the-platform.md) |
| [Upload attachments](https://www.palantir.com/docs/foundry/action-types/upload-attachments/) | ✅ [08-08](../08-actions/08-using-actions-in-the-platform.md) |
| [Scale and property limits](https://www.palantir.com/docs/foundry/action-types/scale-property-limits/) | ✅ [08-04](../08-actions/04-function-backed-actions.md) · [08-05](../08-actions/05-side-effects.md) · [08-07](../08-actions/07-consistency-reverts-and-logs.md) · [13-05](../13-backend-architecture/05-limits-usage-and-compute.md) |
| [Inline edits](https://www.palantir.com/docs/foundry/action-types/inline-edits/) | ✅ [08-08](../08-actions/08-using-actions-in-the-platform.md) |
| [Permissions](https://www.palantir.com/docs/foundry/action-types/permissions/) | ✅ [08-06](../08-actions/06-action-permissions.md) · [12-04](../12-security-and-governance/04-security-across-actions-functions-and-apis.md) |
| [Read and write authorizations](https://www.palantir.com/docs/foundry/action-types/read-write-authorizations/) | ✅ [08-06](../08-actions/06-action-permissions.md) |
| [Consistency and isolation](https://www.palantir.com/docs/foundry/action-types/consistency-guarantees/) | ✅ [08-07](../08-actions/07-consistency-reverts-and-logs.md) · [08-08](../08-actions/08-using-actions-in-the-platform.md) · [09-02](../09-functions/02-query-functions-and-ontology-edits.md) |
| [Monitoring](https://www.palantir.com/docs/foundry/action-types/monitoring/) | ✅ [08-07](../08-actions/07-consistency-reverts-and-logs.md) |
| [Undo or revert Actions](https://www.palantir.com/docs/foundry/action-types/action-reverts/) | ✅ [08-07](../08-actions/07-consistency-reverts-and-logs.md) |
| [Branching action types](https://www.palantir.com/docs/foundry/action-types/branching-action-types/) | ✅ [14-02](../14-lifecycle-and-operations/02-branching-and-proposals.md) |
| [Action metrics](https://www.palantir.com/docs/foundry/action-types/action-metrics/) | ✅ [08-07](../08-actions/07-consistency-reverts-and-logs.md) · [14-06](../14-lifecycle-and-operations/06-monitoring-and-cleanup.md) |
| [Action log](https://www.palantir.com/docs/foundry/action-types/action-log/) | ✅ [08-07](../08-actions/07-consistency-reverts-and-logs.md) · [13-03](../13-backend-architecture/03-edits-and-materializations.md) · [14-03](../14-lifecycle-and-operations/03-schema-evolution-and-breaking-changes.md) · [15-01](../15-advanced-patterns/01-events-history-and-time.md) |
| [Add action types to a Marketplace product](https://www.palantir.com/docs/foundry/action-types/marketplace-action-types/) | ✅ [14-04](../14-lifecycle-and-operations/04-marketplace-packaging.md) |

### Functions

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/functions/overview/) | ✅ [09-01](../09-functions/01-functions-on-objects.md) |
| [Feature support by language](https://www.palantir.com/docs/foundry/functions/language-feature-support/) | ✅ [09-01](../09-functions/01-functions-on-objects.md) · [09-04](../09-functions/04-functions-on-models-and-llms.md) |
| [Getting started](https://www.palantir.com/docs/foundry/functions/getting-started/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Types reference](https://www.palantir.com/docs/foundry/functions/types-reference/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Branching functions](https://www.palantir.com/docs/foundry/functions/branching-functions/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Navigating VS Code](https://www.palantir.com/docs/foundry/functions/navigating-vscode/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Management: Function versioning](https://www.palantir.com/docs/foundry/functions/functions-versioning/) | ✅ [09-03](../09-functions/03-function-lifecycle.md) |
| [Management: Manage published functions](https://www.palantir.com/docs/foundry/functions/manage-functions/) | ✅ [09-03](../09-functions/03-function-lifecycle.md) |
| [Management: Functions in Marketplace](https://www.palantir.com/docs/foundry/functions/marketplace-functions/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Management: Function monitoring](https://www.palantir.com/docs/foundry/functions/monitoring/) | ✅ [09-03](../09-functions/03-function-lifecycle.md) |
| [Management: Instrumentation and telemetry](https://www.palantir.com/docs/foundry/functions/instrumentation-telemetry/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Management: Permissions](https://www.palantir.com/docs/foundry/functions/permissions/) | ✅ [09-03](../09-functions/03-function-lifecycle.md) · [12-04](../12-security-and-governance/04-security-across-actions-functions-and-apis.md) |
| [Consumption: Use functions in the platform](https://www.palantir.com/docs/foundry/functions/use-functions/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Consumption: Function metrics](https://www.palantir.com/docs/foundry/functions/function-metrics/) | ✅ [09-03](../09-functions/03-function-lifecycle.md) |
| [Consumption: Optimize performance](https://www.palantir.com/docs/foundry/functions/optimize-performance/) | ✅ [06-03](../06-links/03-traversal-and-search-arounds.md) · [09-03](../09-functions/03-function-lifecycle.md) |
| [Consumption: Version range dependencies](https://www.palantir.com/docs/foundry/functions/version-range-dependencies-for-functions/) | ✅ [09-03](../09-functions/03-function-lifecycle.md) |
| [Language-agnostic: Ontology edits](https://www.palantir.com/docs/foundry/functions/edits-overview/) | ✅ [09-02](../09-functions/02-query-functions-and-ontology-edits.md) |
| [Language-agnostic: Query functions through API gateway](https://www.palantir.com/docs/foundry/functions/query-functions/) | ✅ [09-02](../09-functions/02-query-functions-and-ontology-edits.md) · [14-03](../14-lifecycle-and-operations/03-schema-evolution-and-breaking-changes.md) |
| [Language-agnostic: Configure notifications](https://www.palantir.com/docs/foundry/functions/configure-notifications/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Language-agnostic: Make API calls from functions](https://www.palantir.com/docs/foundry/functions/api-calls/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Language-agnostic: Foundry platform SDK](https://www.palantir.com/docs/foundry/functions/platform-sdk/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Language-agnostic: Deploy functions](https://www.palantir.com/docs/foundry/functions/functions-deployed/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Language-agnostic: User-facing errors](https://www.palantir.com/docs/foundry/functions/user-facing-error/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Language-agnostic: Streaming functions](https://www.palantir.com/docs/foundry/functions/streaming-functions/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Language-agnostic: Functions settings](https://www.palantir.com/docs/foundry/functions/functions-settings/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [TSv2: Getting started](https://www.palantir.com/docs/foundry/functions/typescript-v2-getting-started/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [TSv2/Python: Local Ontology SDKs](https://www.palantir.com/docs/foundry/functions/local-sdks/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [TSv2: Migrate from TSv1](https://www.palantir.com/docs/foundry/functions/typescript-v2-migration/) | ✅ [06-03](../06-links/03-traversal-and-search-arounds.md) |
| [TSv2: Ontology edits](https://www.palantir.com/docs/foundry/functions/typescript-v2-ontology-edits/) | ✅ [09-02](../09-functions/02-query-functions-and-ontology-edits.md) |
| [TSv2: Staged writes](https://www.palantir.com/docs/foundry/functions/typescript-v2-staged-writes/) | ✅ [09-02](../09-functions/02-query-functions-and-ontology-edits.md) · [16-04](../16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md) |
| [Python: Getting started](https://www.palantir.com/docs/foundry/functions/python-getting-started/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Python: Functions on objects](https://www.palantir.com/docs/foundry/functions/python-functions-on-objects/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Python: Create a custom aggregation](https://www.palantir.com/docs/foundry/functions/python-functions-create-custom-aggregation/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Python: Ontology edits](https://www.palantir.com/docs/foundry/functions/python-ontology-edits/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Python: Staged writes](https://www.palantir.com/docs/foundry/functions/python-staged-writes/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Python: Use in Pipeline Builder](https://www.palantir.com/docs/foundry/functions/python-functions-builder/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Python: Use in Workshop](https://www.palantir.com/docs/foundry/functions/python-functions-workshop/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Python: Local development](https://www.palantir.com/docs/foundry/functions/python-functions-local-development/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [TSv1: Getting started](https://www.palantir.com/docs/foundry/functions/typescript-v1-getting-started/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [TSv1: Decorators](https://www.palantir.com/docs/foundry/functions/decorators/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [TSv1: Ontology edits](https://www.palantir.com/docs/foundry/functions/api-ontology-edits/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [TSv1: Generate unique IDs](https://www.palantir.com/docs/foundry/functions/edits-generate-id/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [TSv1: Error types](https://www.palantir.com/docs/foundry/functions/typescript-error-types/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [TSv1: Handle undefined values](https://www.palantir.com/docs/foundry/functions/undefined-values/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [TSv1: Debug functions](https://www.palantir.com/docs/foundry/functions/debug/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [TSv1: Import resources into Code Repositories](https://www.palantir.com/docs/foundry/functions/resource-imports-sidebar/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [TSv1: Add NPM dependencies](https://www.palantir.com/docs/foundry/functions/add-dependencies/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [TSv1: Use webhooks](https://www.palantir.com/docs/foundry/functions/webhooks/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Functions on objects: Overview](https://www.palantir.com/docs/foundry/functions/functions-on-objects/) | ✅ [09-01](../09-functions/01-functions-on-objects.md) |
| [Functions on objects: Getting started](https://www.palantir.com/docs/foundry/functions/foo-getting-started/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Functions on objects: Object identifiers](https://www.palantir.com/docs/foundry/functions/object-identifiers/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Functions on objects: Custom aggregation (TSv1)](https://www.palantir.com/docs/foundry/functions/create-custom-aggregation/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Functions on objects: Import object, interface and link types](https://www.palantir.com/docs/foundry/functions/ontology-imports/) | ✅ [09-01](../09-functions/01-functions-on-objects.md) |
| [Functions on objects: Objects and links (TSv1)](https://www.palantir.com/docs/foundry/functions/api-objects-links/) | ✅ [06-03](../06-links/03-traversal-and-search-arounds.md) |
| [Functions on objects: Object sets (TSv1)](https://www.palantir.com/docs/foundry/functions/api-object-sets/) | ✅ [06-03](../06-links/03-traversal-and-search-arounds.md) |
| [Functions on objects: Attachments](https://www.palantir.com/docs/foundry/functions/attachments/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Functions on objects: Media](https://www.palantir.com/docs/foundry/functions/media/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Models: Functions on models](https://www.palantir.com/docs/foundry/functions/functions-on-models/) | ✅ [09-04](../09-functions/04-functions-on-models-and-llms.md) · [15-03](../15-advanced-patterns/03-models-in-the-ontology.md) |
| [Models: Function interfaces](https://www.palantir.com/docs/foundry/functions/function-interfaces/) | ✅ [09-04](../09-functions/04-functions-on-models-and-llms.md) |
| [Models: Language models in TSv2 and Python](https://www.palantir.com/docs/foundry/functions/language-models-python-tsv2/) | ✅ [09-04](../09-functions/04-functions-on-models-and-llms.md) |
| [Models: Language models in TSv1](https://www.palantir.com/docs/foundry/functions/language-models/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Models: Legacy language models](https://www.palantir.com/docs/foundry/functions/language-models-legacy/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Aliases: Custom aliases](https://www.palantir.com/docs/foundry/functions/custom-aliases/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Aliases: Model aliases](https://www.palantir.com/docs/foundry/functions/model-aliases/) | ✅ [09-04](../09-functions/04-functions-on-models-and-llms.md) |
| [Aliases: Source aliases](https://www.palantir.com/docs/foundry/functions/source-aliases/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Unit testing (TSv1): Getting started](https://www.palantir.com/docs/foundry/functions/unit-test-getting-started/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Unit testing (TSv1): Create stub objects](https://www.palantir.com/docs/foundry/functions/unit-test-stub-objects/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Unit testing (TSv1): Verify Ontology edits](https://www.palantir.com/docs/foundry/functions/unit-test-ontology-edits/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Unit testing (TSv1): Stub object searches and aggregations](https://www.palantir.com/docs/foundry/functions/unit-test-object-searches/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Unit testing (TSv1): Mock dates, timestamps and UUIDs](https://www.palantir.com/docs/foundry/functions/unit-test-dates-timestamps/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Unit testing (TSv1): Mock users and groups](https://www.palantir.com/docs/foundry/functions/unit-test-users-groups/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |
| [Unit testing (TSv1): Debug](https://www.palantir.com/docs/foundry/functions/unit-test-debugging/) | ✅ [09-05](../09-functions/05-writing-functions-in-practice.md) |

### Interfaces

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/interfaces/interface-overview/) | ✅ [07-01](../07-interfaces/01-interfaces.md) |
| [Create an interface](https://www.palantir.com/docs/foundry/interfaces/create-interface/) | ✅ [07-02](../07-interfaces/02-implementing-and-extending-interfaces.md) |
| [Implement an interface](https://www.palantir.com/docs/foundry/interfaces/implement-interface/) | ✅ [07-01](../07-interfaces/01-interfaces.md) · [07-02](../07-interfaces/02-implementing-and-extending-interfaces.md) |
| [Edit an interface definition](https://www.palantir.com/docs/foundry/interfaces/edit-interface-definition/) | ✅ [07-02](../07-interfaces/02-implementing-and-extending-interfaces.md) |
| [Edit an interface implementation](https://www.palantir.com/docs/foundry/interfaces/edit-interface-implementation/) | ✅ [07-02](../07-interfaces/02-implementing-and-extending-interfaces.md) |
| [Interface link types](https://www.palantir.com/docs/foundry/interfaces/interface-link-types-overview/) | ✅ [07-03](../07-interfaces/03-interface-links-and-action-constraints.md) |
| [Interface action type constraints](https://www.palantir.com/docs/foundry/interfaces/interface-action-type-constraints/) | ✅ [07-03](../07-interfaces/03-interface-links-and-action-constraints.md) |
| [Extend an interface](https://www.palantir.com/docs/foundry/interfaces/extend-interface/) | ✅ [07-02](../07-interfaces/02-implementing-and-extending-interfaces.md) |
| [Metadata reference](https://www.palantir.com/docs/foundry/interfaces/interface-metadata/) | ✅ [07-01](../07-interfaces/01-interfaces.md) · [07-02](../07-interfaces/02-implementing-and-extending-interfaces.md) |

### Ontology design

| Page | Where it's covered |
|---|---|
| [Best practices](https://www.palantir.com/docs/foundry/ontology/ontology-best-practices/) | ✅ [04-01](../04-object-types/01-object-types.md) · [11-01](../11-design/01-best-practices.md) · [16-05](../16-ai-and-agents/05-designing-the-ontology-for-agents.md) |
| [Structural guidance](https://www.palantir.com/docs/foundry/ontology/ontology-structural-guidance/) | ✅ [01-03](../01-foundations/03-normalization-and-denormalization.md) · [05-03](../05-properties/03-structs.md) · [05-05](../05-properties/05-derived-properties.md) · [11-02](../11-design/02-structural-guidance.md) |
| [Anti-patterns](https://www.palantir.com/docs/foundry/ontology/ontology-anti-patterns/) | ✅ [11-03](../11-design/03-anti-patterns.md) · [15-01](../15-advanced-patterns/01-events-history-and-time.md) · [15-04](../15-advanced-patterns/04-entity-resolution-across-sources.md) |
| [Validation](https://www.palantir.com/docs/foundry/ontology/ontology-design-validation/) | ✅ [11-04](../11-design/04-validation.md) · [16-05](../16-ai-and-agents/05-designing-the-ontology-for-agents.md) |

### Semantic search

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/ontology/overview-semantic-search/) | ✅ [16-02](../16-ai-and-agents/02-semantic-search-and-embeddings.md) |
| [Document processing](https://www.palantir.com/docs/foundry/ontology/document-processing/) | ✅ [16-02](../16-ai-and-agents/02-semantic-search-and-embeddings.md) |
| [Process multimodal and embedding models](https://www.palantir.com/docs/foundry/ontology/aip-multimodal-and-embedding-models/) | ✅ [05-08](../05-properties/08-time-series-media-geo-and-vectors.md) · [16-02](../16-ai-and-agents/02-semantic-search-and-embeddings.md) |
| [Ontology augmented generation](https://www.palantir.com/docs/foundry/ontology/ontology-augmented-generation/) | ✅ [16-01](../16-ai-and-agents/01-ontology-as-ai-context.md) · [16-02](../16-ai-and-agents/02-semantic-search-and-embeddings.md) |
| [Workflow with Palantir-provided models](https://www.palantir.com/docs/foundry/ontology/using-palantir-provided-models-to-create-a-semantic-search-workflow/) | ✅ [16-02](../16-ai-and-agents/02-semantic-search-and-embeddings.md) |
| [Workflow with custom models](https://www.palantir.com/docs/foundry/ontology/using-custom-models-to-create-a-semantic-search-workflow/) | ✅ [16-02](../16-ai-and-agents/02-semantic-search-and-embeddings.md) |

### Ontology search

| Page | Where it's covered |
|---|---|
| [Search syntax](https://www.palantir.com/docs/foundry/ontology/search-syntax/) | ✅ [10-07](../10-applications/07-searching-the-ontology.md) |
| [Derived properties](https://www.palantir.com/docs/foundry/ontology/derived-properties/) | ✅ [05-05](../05-properties/05-derived-properties.md) |

### Ontology scenarios

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/ontology/overview-ontology-scenario/) | ✅ [15-02](../15-advanced-patterns/02-scenarios.md) · [16-04](../16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md) |
| [Temporary scenarios](https://www.palantir.com/docs/foundry/ontology/temporary-scenario/) | ✅ [15-02](../15-advanced-patterns/02-scenarios.md) |
| [Store scenario metadata as objects](https://www.palantir.com/docs/foundry/ontology/persisted-scenario/) | ✅ [15-02](../15-advanced-patterns/02-scenarios.md) |
| [Merge scenarios](https://www.palantir.com/docs/foundry/ontology/merge-scenario/) | ✅ [15-02](../15-advanced-patterns/02-scenarios.md) |
| [Use scenarios with OSDK](https://www.palantir.com/docs/foundry/ontology/osdk-scenario/) | ✅ [15-02](../15-advanced-patterns/02-scenarios.md) |

### Object Explorer

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/object-explorer/overview/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Getting started](https://www.palantir.com/docs/foundry/object-explorer/getting-started/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Search for objects](https://www.palantir.com/docs/foundry/object-explorer/search-objects/) | ✅ [10-07](../10-applications/07-searching-the-ontology.md) |
| [Search syntax](https://www.palantir.com/docs/foundry/object-explorer/search-syntax/) | ✅ [10-07](../10-applications/07-searching-the-ontology.md) |
| [Understanding text search](https://www.palantir.com/docs/foundry/object-explorer/understanding-text-search/) | ✅ [10-07](../10-applications/07-searching-the-ontology.md) |
| [Analyze using SQL](https://www.palantir.com/docs/foundry/object-explorer/analyze-sql/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Filter results](https://www.palantir.com/docs/foundry/object-explorer/filter-results/) | ✅ [10-07](../10-applications/07-searching-the-ontology.md) |
| [Explore with charts](https://www.palantir.com/docs/foundry/object-explorer/explore-charts/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [View results](https://www.palantir.com/docs/foundry/object-explorer/view-results/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Pivot to explore linked objects](https://www.palantir.com/docs/foundry/object-explorer/pivot-linked/) | ✅ [06-03](../06-links/03-traversal-and-search-arounds.md) |
| [Compare object sets](https://www.palantir.com/docs/foundry/object-explorer/compare-object-sets/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Save explorations](https://www.palantir.com/docs/foundry/object-explorer/save-explorations/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Save lists](https://www.palantir.com/docs/foundry/object-explorer/save-lists/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Apply Actions](https://www.palantir.com/docs/foundry/object-explorer/apply-actions/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Generate Object Explorer URLs](https://www.palantir.com/docs/foundry/object-explorer/generate-urls/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Configure Object Explorer](https://www.palantir.com/docs/foundry/object-explorer/configure/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |

### Object Monitors [Sunset]

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/object-monitors/overview/) | ✅ [10-06](../10-applications/06-automate-and-ontology-events.md) |
| [Create a new object monitor](https://www.palantir.com/docs/foundry/object-monitors/create_new_object_monitor/) | — app manual (out of scope) |
| [Monitors](https://www.palantir.com/docs/foundry/object-monitors/monitor/) | — app manual (out of scope) |
| [Inputs](https://www.palantir.com/docs/foundry/object-monitors/input/) | — app manual (out of scope) |
| [Conditions](https://www.palantir.com/docs/foundry/object-monitors/condition/) | — app manual (out of scope) |
| [Evaluation](https://www.palantir.com/docs/foundry/object-monitors/evaluation/) | — app manual (out of scope) |
| [Activity](https://www.palantir.com/docs/foundry/object-monitors/activity/) | — app manual (out of scope) |
| [Notifications](https://www.palantir.com/docs/foundry/object-monitors/notifications/) | — app manual (out of scope) |
| [Actions](https://www.palantir.com/docs/foundry/object-monitors/actions/) | — app manual (out of scope) |
| [Monitoring limits](https://www.palantir.com/docs/foundry/object-monitors/limits/) | — app manual (out of scope) |
| [Error reference](https://www.palantir.com/docs/foundry/object-monitors/errors/) | — app manual (out of scope) |

### Object Views

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/object-views/overview/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Standard Object Views](https://www.palantir.com/docs/foundry/object-views/standard-object-views/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Manage configured Object View versions](https://www.palantir.com/docs/foundry/object-views/manage-versions/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Configured Object View overview](https://www.palantir.com/docs/foundry/object-views/config-overview/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) · [14-03](../14-lifecycle-and-operations/03-schema-evolution-and-breaking-changes.md) |
| [Branching object views](https://www.palantir.com/docs/foundry/object-views/branching-object-views/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Full: Use in the platform](https://www.palantir.com/docs/foundry/object-views/use-full-views-in-platform/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Full: Configure](https://www.palantir.com/docs/foundry/object-views/config-object-views/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Panel: Use in the platform](https://www.palantir.com/docs/foundry/object-views/use-panel-views-in-platform/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Panel: Configure](https://www.palantir.com/docs/foundry/object-views/config-panel-views/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Legacy: Configure legacy Object Views](https://www.palantir.com/docs/foundry/object-views/config-legacy-object-views/) | — legacy (out of scope) |
| [Legacy: Configure tabs](https://www.palantir.com/docs/foundry/object-views/config-tabs/) | — legacy (out of scope) |
| [Legacy: Configure the applications sidebar](https://www.palantir.com/docs/foundry/object-views/config-app-sidebar/) | — legacy (out of scope) |
| [Legacy: Configure profiles](https://www.palantir.com/docs/foundry/object-views/config-profiles/) | — legacy (out of scope) |
| [Legacy: Properties and Links](https://www.palantir.com/docs/foundry/object-views/widgets-properties-links/) | — legacy (out of scope) |
| [Legacy: Visualization](https://www.palantir.com/docs/foundry/object-views/widgets-visualization/) | — legacy (out of scope) |
| [Legacy: Filtering](https://www.palantir.com/docs/foundry/object-views/widgets-filtering/) | — legacy (out of scope) |
| [Legacy: Layout](https://www.palantir.com/docs/foundry/object-views/widgets-layout/) | — legacy (out of scope) |
| [Legacy: Apps and Files](https://www.palantir.com/docs/foundry/object-views/widgets-apps-files/) | — legacy (out of scope) |
| [Generate Object View URLs](https://www.palantir.com/docs/foundry/object-views/generate-urls/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Comment on objects](https://www.palantir.com/docs/foundry/object-views/comment-on-objects/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |
| [Add Object Views to a Marketplace product](https://www.palantir.com/docs/foundry/object-views/marketplace-object-views/) | ✅ [10-02](../10-applications/02-object-views-and-object-explorer.md) |

### Ontology Manager

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/ontology-manager/overview/) | ✅ [03-02](../03-ontology-fundamentals/02-ontology-manager.md) |
| [Navigation](https://www.palantir.com/docs/foundry/ontology-manager/navigation/) | ✅ [03-02](../03-ontology-fundamentals/02-ontology-manager.md) |
| [Viewing usage](https://www.palantir.com/docs/foundry/ontology-manager/view-usage/) | ✅ [03-02](../03-ontology-fundamentals/02-ontology-manager.md) · [14-01](../14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md) · [14-03](../14-lifecycle-and-operations/03-schema-evolution-and-breaking-changes.md) · [14-06](../14-lifecycle-and-operations/06-monitoring-and-cleanup.md) |
| [Migrate to project-based permissions](https://www.palantir.com/docs/foundry/ontology-manager/migrate-to-project-based-permissions/) | ✅ [12-02](../12-security-and-governance/02-ontology-resource-permissions.md) |
| [Ontology roles migration [Legacy]](https://www.palantir.com/docs/foundry/ontology-manager/ontology-roles-migration/) | ✅ [12-02](../12-security-and-governance/02-ontology-resource-permissions.md) |
| [Save changes to the Ontology](https://www.palantir.com/docs/foundry/ontology-manager/save-changes/) | ✅ [03-02](../03-ontology-fundamentals/02-ontology-manager.md) · [14-01](../14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md) |
| [Review and restore changes](https://www.palantir.com/docs/foundry/ontology-manager/restore-changes/) | ✅ [03-02](../03-ontology-fundamentals/02-ontology-manager.md) · [14-01](../14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md) |
| [Export, edit and import an Ontology](https://www.palantir.com/docs/foundry/ontology-manager/export-import/) | ✅ [14-05](../14-lifecycle-and-operations/05-migration-and-export-import.md) |
| [Ontology cleanup](https://www.palantir.com/docs/foundry/ontology-manager/cleanup/) | ✅ [14-03](../14-lifecycle-and-operations/03-schema-evolution-and-breaking-changes.md) · [14-06](../14-lifecycle-and-operations/06-monitoring-and-cleanup.md) |

### Vertex

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/vertex/overview/) | ✅ [10-05](../10-applications/05-specialized-apps.md) |
| [Example use cases](https://www.palantir.com/docs/foundry/vertex/example-use-cases/) | — app manual (out of scope) |
| [Graphs: Explore existing graphs](https://www.palantir.com/docs/foundry/vertex/graphs-explore/) | — app manual (out of scope) |
| [Graphs: Explore object relationships](https://www.palantir.com/docs/foundry/vertex/explore-object-relationships/) | ✅ [10-05](../10-applications/05-specialized-apps.md) |
| [Graphs: Object and edge display options](https://www.palantir.com/docs/foundry/vertex/graphs-display-options/) | — app manual (out of scope) |
| [Graphs: Save, share and collaborate](https://www.palantir.com/docs/foundry/vertex/save-share/) | — app manual (out of scope) |
| [Graphs: Create a graph template](https://www.palantir.com/docs/foundry/vertex/graphs-template/) | — app manual (out of scope) |
| [Graphs: Generate a graph from other applications](https://www.palantir.com/docs/foundry/vertex/generate-graph-apps/) | — app manual (out of scope) |
| [Graphs: Generate graphs using Functions](https://www.palantir.com/docs/foundry/vertex/generate-graph-functions/) | — app manual (out of scope) |
| [Graphs: Derive properties using Functions](https://www.palantir.com/docs/foundry/vertex/derive-property-functions/) | — app manual (out of scope) |
| [Graphs: Embed a graph in Workshop](https://www.palantir.com/docs/foundry/vertex/embed-graph-workshop/) | — app manual (out of scope) |
| [Graphs: Read-only mode](https://www.palantir.com/docs/foundry/vertex/read-only-mode/) | — app manual (out of scope) |
| [Graphs: Media layers and image annotations](https://www.palantir.com/docs/foundry/vertex/media-layers/) | — app manual (out of scope) |
| [Events: Overview](https://www.palantir.com/docs/foundry/vertex/events-overview/) | ✅ [10-05](../10-applications/05-specialized-apps.md) · [15-01](../15-advanced-patterns/01-events-history-and-time.md) |
| [Events: Configure events](https://www.palantir.com/docs/foundry/vertex/configure-events/) | ✅ [10-05](../10-applications/05-specialized-apps.md) |
| [Events: Explore related events](https://www.palantir.com/docs/foundry/vertex/explore-related-events/) | — app manual (out of scope) |
| [Events: Explore related time series](https://www.palantir.com/docs/foundry/vertex/explore-time-series/) | — app manual (out of scope) |
| [Events: Use time selection](https://www.palantir.com/docs/foundry/vertex/use-time-selection/) | — app manual (out of scope) |
| [Events: Configure thresholds](https://www.palantir.com/docs/foundry/vertex/configure-thresholds/) | — app manual (out of scope) |
| [Events: Timeline](https://www.palantir.com/docs/foundry/vertex/timeline/) | — app manual (out of scope) |
| [Scenarios: Overview](https://www.palantir.com/docs/foundry/vertex/scenarios-overview/) | — app manual (out of scope) |
| [Scenarios: Getting started](https://www.palantir.com/docs/foundry/vertex/scenarios-getting-started/) | — app manual (out of scope) |
| [Scenarios: Scenario options](https://www.palantir.com/docs/foundry/vertex/scenarios-options/) | — app manual (out of scope) |
| [Scenarios: Chained models [Sunset]](https://www.palantir.com/docs/foundry/vertex/chained-models/) | — app manual (out of scope) |
| [Configuration: Control Panel settings](https://www.palantir.com/docs/foundry/vertex/vertex-settings-control-panel/) | — app manual (out of scope) |
| [Configuration: Link merging](https://www.palantir.com/docs/foundry/vertex/link-merging/) | — app manual (out of scope) |
| [Add graph templates to a Marketplace product](https://www.palantir.com/docs/foundry/vertex/marketplace-vertex/) | — app manual (out of scope) |

### Machinery

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/machinery/overview/) | ✅ [10-05](../10-applications/05-specialized-apps.md) |
| [Core concepts](https://www.palantir.com/docs/foundry/machinery/core-concepts/) | ✅ [10-05](../10-applications/05-specialized-apps.md) · [15-01](../15-advanced-patterns/01-events-history-and-time.md) |
| [Draw a graph](https://www.palantir.com/docs/foundry/machinery/draw-a-graph/) | ✅ [10-05](../10-applications/05-specialized-apps.md) |
| [Connect data to Machinery](https://www.palantir.com/docs/foundry/machinery/connect-data/) | ✅ [10-05](../10-applications/05-specialized-apps.md) |
| [Process mining](https://www.palantir.com/docs/foundry/machinery/process-mining/) | ✅ [10-05](../10-applications/05-specialized-apps.md) |
| [Analyze and monitor a process](https://www.palantir.com/docs/foundry/machinery/analyze-and-monitor/) | ✅ [10-05](../10-applications/05-specialized-apps.md) |

### Foundry Rules

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/foundry-rules/overview/) | ✅ [10-05](../10-applications/05-specialized-apps.md) |
| [Core concepts](https://www.palantir.com/docs/foundry/foundry-rules/core-concepts/) | — app manual (out of scope) |
| [Object model](https://www.palantir.com/docs/foundry/foundry-rules/object-model/) | ✅ [10-05](../10-applications/05-specialized-apps.md) |
| [Workshop application](https://www.palantir.com/docs/foundry/foundry-rules/workshop-application/) | — app manual (out of scope) |
| [Rule logic](https://www.palantir.com/docs/foundry/foundry-rules/rule-logic/) | — app manual (out of scope) |
| [Workflow configuration](https://www.palantir.com/docs/foundry/foundry-rules/foundry-rules-workflow-configuration/) | — app manual (out of scope) |
| [Deploy: Overview](https://www.palantir.com/docs/foundry/foundry-rules/deploy-foundry-rules/) | — app manual (out of scope) |
| [Deploy: Deploy workflow](https://www.palantir.com/docs/foundry/foundry-rules/deploy-workflow/) | — app manual (out of scope) |
| [Deploy: Configure workflow](https://www.palantir.com/docs/foundry/foundry-rules/configure-workflow/) | — app manual (out of scope) |
| [Deploy: Author and run a rule](https://www.palantir.com/docs/foundry/foundry-rules/author-and-run-a-rule/) | — app manual (out of scope) |
| [Settings: Overview](https://www.palantir.com/docs/foundry/foundry-rules/customization/) | — app manual (out of scope) |
| [Settings: Enable optional features](https://www.palantir.com/docs/foundry/foundry-rules/enable-optional-features/) | — app manual (out of scope) |
| [Settings: Add a custom property](https://www.palantir.com/docs/foundry/foundry-rules/add-a-custom-property/) | — app manual (out of scope) |
| [Settings: Permissions for editing rules](https://www.palantir.com/docs/foundry/foundry-rules/rule-permissions/) | — app manual (out of scope) |
| [Settings: Permitted and default output values](https://www.palantir.com/docs/foundry/foundry-rules/permitted-and-default-output-values/) | — app manual (out of scope) |
| [Settings: Customize pipeline](https://www.palantir.com/docs/foundry/foundry-rules/customize-foundry-rules-pipeline/) | — app manual (out of scope) |
| [Time series rules [Sunset]](https://www.palantir.com/docs/foundry/foundry-rules/timeseries-concepts/) | — app manual (out of scope) |
| [Deploy time series Foundry Rules](https://www.palantir.com/docs/foundry/foundry-rules/deploy-timeseries-foundry-rules/) | — app manual (out of scope) |
| [Legacy (Taurus): Overview](https://www.palantir.com/docs/foundry/foundry-rules/legacy-foundry-rules-setup-taurus/) | — legacy (out of scope) |
| [Legacy (Taurus): Migrate to Foundry Rules](https://www.palantir.com/docs/foundry/foundry-rules/migrate-to-foundry-rules/) | — legacy (out of scope) |
| [Legacy (Taurus): Configure Workshop application](https://www.palantir.com/docs/foundry/foundry-rules/configure-workshop-app/) | — legacy (out of scope) |
| [Legacy (Taurus): Configure transforms pipeline](https://www.palantir.com/docs/foundry/foundry-rules/configure-transforms-pipeline/) | — legacy (out of scope) |
| [Legacy (Taurus): Configure rule Actions](https://www.palantir.com/docs/foundry/foundry-rules/configure-rule-actions/) | — legacy (out of scope) |
| [Legacy (Taurus): Configure time series](https://www.palantir.com/docs/foundry/foundry-rules/configure-timeseries-foundry-rules/) | — legacy (out of scope) |
| [Legacy (Taurus): Upgrade to use rule Actions](https://www.palantir.com/docs/foundry/foundry-rules/upgrade-to-use-rule-actions/) | — legacy (out of scope) |
| [Troubleshooting reference](https://www.palantir.com/docs/foundry/foundry-rules/common-issues/) | — app manual (out of scope) |
| [Add to a Marketplace product](https://www.palantir.com/docs/foundry/foundry-rules/marketplace/) | — app manual (out of scope) |

### Map

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/map/overview/) | ✅ [10-05](../10-applications/05-specialized-apps.md) |
| [Getting started](https://www.palantir.com/docs/foundry/map/getting-started/) | — app manual (out of scope) |
| [Core concepts](https://www.palantir.com/docs/foundry/map/core-concepts/) | — app manual (out of scope) |
| [Interact: Map interface overview](https://www.palantir.com/docs/foundry/map/map-overview/) | — app manual (out of scope) |
| [Interact: Create and save maps](https://www.palantir.com/docs/foundry/map/create-save-maps/) | — app manual (out of scope) |
| [Interact: Add data to a map](https://www.palantir.com/docs/foundry/map/add-to-map/) | — app manual (out of scope) |
| [Interact: Layer management](https://www.palantir.com/docs/foundry/map/layer-management/) | — app manual (out of scope) |
| [Interact: Navigation](https://www.palantir.com/docs/foundry/map/navigation/) | — app manual (out of scope) |
| [Interact: Selection](https://www.palantir.com/docs/foundry/map/selection/) | — app manual (out of scope) |
| [Interact: Annotations](https://www.palantir.com/docs/foundry/map/annotations/) | — app manual (out of scope) |
| [Interact: Shapes](https://www.palantir.com/docs/foundry/map/shapes/) | — app manual (out of scope) |
| [Interact: Histogram and filtering](https://www.palantir.com/docs/foundry/map/histogram/) | — app manual (out of scope) |
| [Interact: Actions](https://www.palantir.com/docs/foundry/map/actions/) | — app manual (out of scope) |
| [Time: Overview](https://www.palantir.com/docs/foundry/map/time-overview/) | — app manual (out of scope) |
| [Time: Time selection](https://www.palantir.com/docs/foundry/map/time-selection/) | — app manual (out of scope) |
| [Time: Timeline](https://www.palantir.com/docs/foundry/map/timeline/) | — app manual (out of scope) |
| [Time: Events](https://www.palantir.com/docs/foundry/map/events/) | — app manual (out of scope) |
| [Time: Time series](https://www.palantir.com/docs/foundry/map/time-series/) | — app manual (out of scope) |
| [Time: Series panel [Planned deprecation]](https://www.palantir.com/docs/foundry/map/series-panel/) | — app manual (out of scope) |
| [Visualize: Overview](https://www.palantir.com/docs/foundry/map/visualize-objects/) | — app manual (out of scope) |
| [Visualize: Points](https://www.palantir.com/docs/foundry/map/visualize-points/) | — app manual (out of scope) |
| [Visualize: Lines and polygons](https://www.palantir.com/docs/foundry/map/visualize-polygons-lines/) | — app manual (out of scope) |
| [Visualize: Choropleths](https://www.palantir.com/docs/foundry/map/visualize-choropleths/) | — app manual (out of scope) |
| [Visualize: Clusters](https://www.palantir.com/docs/foundry/map/visualize-clusters/) | — app manual (out of scope) |
| [Visualize: Timeline events](https://www.palantir.com/docs/foundry/map/visualize-timeline/) | — app manual (out of scope) |
| [Visualize: Tracks (moving objects)](https://www.palantir.com/docs/foundry/map/visualize-tracks/) | — app manual (out of scope) |
| [Visualize: Loading methods](https://www.palantir.com/docs/foundry/map/objects-loading-methods/) | — app manual (out of scope) |
| [Integrate: Ontology objects](https://www.palantir.com/docs/foundry/map/integrate-objects/) | — app manual (out of scope) |
| [Integrate: Search Arounds](https://www.palantir.com/docs/foundry/map/integrate-searcharounds/) | — app manual (out of scope) |
| [Integrate: Functions](https://www.palantir.com/docs/foundry/map/integrate-functions/) | — app manual (out of scope) |
| [Integrate: Ontology Actions](https://www.palantir.com/docs/foundry/map/integrate-actions/) | — app manual (out of scope) |
| [Integrate: Map Layer Editor](https://www.palantir.com/docs/foundry/map/layer-editor/) | — app manual (out of scope) |
| [Templates: Map templates](https://www.palantir.com/docs/foundry/map/templates/) | — app manual (out of scope) |
| [Templates: Embed in Workshop](https://www.palantir.com/docs/foundry/map/widget/) | — app manual (out of scope) |
| [Configuration: Settings](https://www.palantir.com/docs/foundry/map/settings/) | — app manual (out of scope) |
| [Configuration: Control Panel](https://www.palantir.com/docs/foundry/map/control-panel/) | — app manual (out of scope) |
| [Add Map templates to a Marketplace product](https://www.palantir.com/docs/foundry/map/marketplace-map-templates/) | — app manual (out of scope) |

### Vulcan

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/vulcan/overview/) | ✅ [10-05](../10-applications/05-specialized-apps.md) |
| [Tools](https://www.palantir.com/docs/foundry/vulcan/tool-overview/) | — app manual (out of scope) |
| [Schema reference](https://www.palantir.com/docs/foundry/vulcan/schema-reference/) | — app manual (out of scope) |
| [Embed Vulcan in Workshop](https://www.palantir.com/docs/foundry/vulcan/widget/) | — app manual (out of scope) |

### Dynamic Scheduling

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-overview/) | ✅ [10-05](../10-applications/05-specialized-apps.md) |
| [Getting started](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-getting-started/) | — app manual (out of scope) |
| [Core concepts](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-concepts/) | — app manual (out of scope) |
| [Ontology primitives](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-ontology-primitives/) | ✅ [10-05](../10-applications/05-specialized-apps.md) |
| [Gantt Chart widget](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-gantt-chart-widget/) | — app manual (out of scope) |
| [Schedule layer styling](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-schedule-layer-style/) | — app manual (out of scope) |
| [Suggestion Functions](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-suggestion-functions/) | — app manual (out of scope) |
| [Search Functions](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-search-functions/) | — app manual (out of scope) |
| [Validation rules](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-validation-rules/) | — app manual (out of scope) |
| [Inline metrics](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-inline-metrics/) | — app manual (out of scope) |
| [Row-level: Overview](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-row-level-interactions-overview/) | — app manual (out of scope) |
| [Row-level: Triggering actions and events](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-row-level-triggering-actions-and-events/) | — app manual (out of scope) |
| [Layer-level: Overview](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-schedule-layer-level-interactions/) | — app manual (out of scope) |
| [Layer-level: Drag to create](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-drag-to-create/) | — app manual (out of scope) |
| [Layer-level: Drag and drop](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-drag-and-drop/) | — app manual (out of scope) |
| [Program Scheduling widget: Overview](https://www.palantir.com/docs/foundry/dynamic-scheduling/program-scheduling-overview/) | — app manual (out of scope) |
| [Program Scheduling widget: Configuration](https://www.palantir.com/docs/foundry/dynamic-scheduling/program-scheduling-configuration/) | — app manual (out of scope) |
| [Calendar widget: Overview](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-calendar-overview/) | — app manual (out of scope) |
| [Calendar widget: Configuration](https://www.palantir.com/docs/foundry/dynamic-scheduling/scheduling-calendar-widget/) | — app manual (out of scope) |

### Ontology architecture

| Page | Where it's covered |
|---|---|
| [Overview](https://www.palantir.com/docs/foundry/object-backend/overview/) | ✅ [00-03](../00-orientation/03-architecture-at-a-glance.md) · [03-03](../03-ontology-fundamentals/03-objects-and-object-sets.md) · [04-01](../04-object-types/01-object-types.md) · [13-01](../13-backend-architecture/01-backend-services.md) · [13-04](../13-backend-architecture/04-object-storage-v1-vs-v2.md) · [13-05](../13-backend-architecture/05-limits-usage-and-compute.md) |
| [Breaking changes between OSv1 and OSv2](https://www.palantir.com/docs/foundry/object-backend/object-storage-v2-breaking-changes/) | ✅ [13-04](../13-backend-architecture/04-object-storage-v1-vs-v2.md) |
| [Migrate from OSv1 to OSv2](https://www.palantir.com/docs/foundry/object-backend/osv1-osv2-migration/) | ✅ [13-04](../13-backend-architecture/04-object-storage-v1-vs-v2.md) |
| [Aggregation considerations](https://www.palantir.com/docs/foundry/object-backend/aggregation-considerations/) | ✅ [13-05](../13-backend-architecture/05-limits-usage-and-compute.md) |
| [Permissioning: Overview](https://www.palantir.com/docs/foundry/object-permissioning/overview/) | ✅ [12-01](../12-security-and-governance/01-two-layer-permission-model.md) |
| [Permissioning: Ontology permissions](https://www.palantir.com/docs/foundry/object-permissioning/ontology-permissions/) | ✅ [00-01](../00-orientation/01-what-the-ontology-is.md) · [02-04](../02-foundry-data-foundations/04-projects-spaces-and-markings.md) · [04-02](../04-object-types/02-backing-datasources-and-mapping.md) · [12-01](../12-security-and-governance/01-two-layer-permission-model.md) · [12-02](../12-security-and-governance/02-ontology-resource-permissions.md) · [12-05](../12-security-and-governance/05-shared-ontologies-and-cross-org.md) · [14-04](../14-lifecycle-and-operations/04-marketplace-packaging.md) |
| [Permissioning: Legacy ontology permissions](https://www.palantir.com/docs/foundry/object-permissioning/ontology-permissions-legacy/) | ✅ [12-02](../12-security-and-governance/02-ontology-resource-permissions.md) |
| [Permissioning: Managing object security](https://www.palantir.com/docs/foundry/object-permissioning/managing-object-security/) | ✅ [12-01](../12-security-and-governance/01-two-layer-permission-model.md) · [12-03](../12-security-and-governance/03-object-and-property-security.md) |
| [Permissioning: Restricted-view-backed object types](https://www.palantir.com/docs/foundry/object-permissioning/configuring-rv-access-controls/) | ✅ [12-03](../12-security-and-governance/03-object-and-property-security.md) |
| [Permissioning: Multi-datasource object types (MDOs)](https://www.palantir.com/docs/foundry/object-permissioning/multi-datasource-objects/) | ✅ [04-02](../04-object-types/02-backing-datasources-and-mapping.md) · [12-03](../12-security-and-governance/03-object-and-property-security.md) · [15-04](../15-advanced-patterns/04-entity-resolution-across-sources.md) |
| [Permissioning: Object security policies](https://www.palantir.com/docs/foundry/object-permissioning/object-security-policies/) | ✅ [12-03](../12-security-and-governance/03-object-and-property-security.md) · [13-03](../13-backend-architecture/03-edits-and-materializations.md) |
| [Indexing: Overview](https://www.palantir.com/docs/foundry/object-indexing/overview/) | ✅ [13-02](../13-backend-architecture/02-indexing-and-funnel.md) |
| [Indexing: Funnel batch pipelines](https://www.palantir.com/docs/foundry/object-indexing/funnel-batch-pipelines/) | ✅ [00-03](../00-orientation/03-architecture-at-a-glance.md) · [01-02](../01-foundations/02-keys-and-identity.md) · [01-05](../01-foundations/05-operational-vs-analytical-systems.md) · [02-01](../02-foundry-data-foundations/01-datasets-transactions-and-schemas.md) · [02-05](../02-foundry-data-foundations/05-lineage-and-builds.md) · [13-01](../13-backend-architecture/01-backend-services.md) · [13-02](../13-backend-architecture/02-indexing-and-funnel.md) |
| [Indexing: Funnel streaming pipelines](https://www.palantir.com/docs/foundry/object-indexing/funnel-streaming-pipelines/) | ✅ [02-03](../02-foundry-data-foundations/03-virtual-tables-and-streams.md) · [04-02](../04-object-types/02-backing-datasources-and-mapping.md) · [13-02](../13-backend-architecture/02-indexing-and-funnel.md) |
| [Indexing: Direct datasources](https://www.palantir.com/docs/foundry/object-indexing/direct-datasources/) | ✅ [02-03](../02-foundry-data-foundations/03-virtual-tables-and-streams.md) · [13-02](../13-backend-architecture/02-indexing-and-funnel.md) |
| [Indexing: Data restrictions](https://www.palantir.com/docs/foundry/object-indexing/data-restrictions/) | ✅ [01-01](../01-foundations/01-entities-attributes-relationships.md) · [01-02](../01-foundations/02-keys-and-identity.md) · [01-03](../01-foundations/03-normalization-and-denormalization.md) · [02-01](../02-foundry-data-foundations/01-datasets-transactions-and-schemas.md) · [04-03](../04-object-types/03-primary-keys-and-titles.md) · [13-02](../13-backend-architecture/02-indexing-and-funnel.md) |
| [Indexing: FAQ](https://www.palantir.com/docs/foundry/object-indexing/faq/) | ✅ [13-02](../13-backend-architecture/02-indexing-and-funnel.md) · [13-04](../13-backend-architecture/04-object-storage-v1-vs-v2.md) |
| [Edits: Overview](https://www.palantir.com/docs/foundry/object-edits/overview/) | ✅ [08-01](../08-actions/01-action-types.md) · [13-03](../13-backend-architecture/03-edits-and-materializations.md) |
| [Edits: How user edits are applied](https://www.palantir.com/docs/foundry/object-edits/how-edits-applied/) | ✅ [04-04](../04-object-types/04-creating-and-editing-object-types.md) · [05-06](../05-properties/06-edit-only-required-and-mandatory-control.md) · [08-01](../08-actions/01-action-types.md) · [13-01](../13-backend-architecture/01-backend-services.md) · [13-03](../13-backend-architecture/03-edits-and-materializations.md) · [15-04](../15-advanced-patterns/04-entity-resolution-across-sources.md) |
| [Edits: Enable user edit history](https://www.palantir.com/docs/foundry/object-edits/user-edit-history/) | ✅ [13-03](../13-backend-architecture/03-edits-and-materializations.md) · [15-01](../15-advanced-patterns/01-events-history-and-time.md) |
| [Edits: Permission checks for Actions](https://www.palantir.com/docs/foundry/object-edits/permission-checks/) | ✅ [12-04](../12-security-and-governance/04-security-across-actions-functions-and-apis.md) |
| [Edits: Manage schema changes](https://www.palantir.com/docs/foundry/object-edits/schema-migrations/) | ✅ [04-03](../04-object-types/03-primary-keys-and-titles.md) · [04-04](../04-object-types/04-creating-and-editing-object-types.md) · [13-03](../13-backend-architecture/03-edits-and-materializations.md) · [14-01](../14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md) · [14-03](../14-lifecycle-and-operations/03-schema-evolution-and-breaking-changes.md) |
| [Edits: Materializations](https://www.palantir.com/docs/foundry/object-edits/materializations/) | ✅ [08-01](../08-actions/01-action-types.md) · [13-03](../13-backend-architecture/03-edits-and-materializations.md) · [14-03](../14-lifecycle-and-operations/03-schema-evolution-and-breaking-changes.md) |
| [Object databases: Object Storage v1 (Phonograph)](https://www.palantir.com/docs/foundry/object-databases/object-storage-v1/) | ✅ [13-04](../13-backend-architecture/04-object-storage-v1-vs-v2.md) |

---
[Reference index](README.md) · Previous: [Decision guide](decision-guide.md) · Next: [Limits and thresholds](limits-and-thresholds.md) · [Ontology home](../README.md)
