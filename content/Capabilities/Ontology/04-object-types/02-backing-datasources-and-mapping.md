# 02 — Backing datasources and mapping

*Sources: [Create an object type](https://www.palantir.com/docs/foundry/object-link-types/create-object-type/) · [Edit object types](https://www.palantir.com/docs/foundry/object-link-types/edit-object-type/) · [Multi-datasource object types](https://www.palantir.com/docs/foundry/object-permissioning/multi-datasource-objects/) · [Ontology permissions](https://www.palantir.com/docs/foundry/object-permissioning/ontology-permissions/) · [Restricted views](https://www.palantir.com/docs/foundry/security/restricted-views/) · [Funnel streaming pipelines](https://www.palantir.com/docs/foundry/object-indexing/funnel-streaming-pipelines/) · [Virtual tables](https://www.palantir.com/docs/foundry/data-integration/virtual-tables/) · checked October 2, 2026 · Ready for Review*

Every object type answers one question early: **where do its objects come from?** This note is a decision guide for that question, followed by the mechanics of mapping columns to properties.

## Step 1 — Pick the kind of source

| If… | Back the type with… | Know this |
|---|---|---|
| The data already exists and is rebuilt by pipelines | A **dataset** | The default. One row per object, a stable key ([02 — Pipelines](../02-foundry-data-foundations/02-pipelines-that-feed-the-ontology.md)) |
| Different users must see different **rows** | A **restricted view** over the dataset | A row-level policy decides which objects each user sees ([Restricted views](https://www.palantir.com/docs/foundry/security/restricted-views/)) |
| The data must appear in seconds | A **stream** | No user edits, no multi-datasource types, at most 250 properties, records up to 1 MB ([02 — Streams](../02-foundry-data-foundations/03-virtual-tables-and-streams.md#streams-as-ontology-datasources)) |
| The data lives in Snowflake, Databricks, BigQuery… and shouldn't be copied | A **virtual table** | Set update detection so objects reindex when the source changes |
| Every object is created by people or agents through actions | **No datasource** | Save the type in a project and add an object security policy. Each new object still needs a unique primary key |
| Different users must see different **columns** of the same object | **Several datasets** (a multi-datasource object type) | Column-wise only. See step 3 |

**[Docs]** One datasource can back **only one** object type. Trying to reuse it gives `Phonograph2:DatasetAndBranchAlreadyRegistered`.

**[Docs]** Where a datasource-backed type is saved in a project, the datasource must be **imported into that project** for objects to index.

**[Docs]** The creation helper can instead create an empty dataset "for permissions" when you have no data yet. The objects' permissions then come from that dataset's location. This option isn't available on OSv1.

## Step 2 — Map columns to properties

**[Docs]** When you pick a datasource in the creation helper, every column is mapped to a property automatically. You can discard the ones you don't want. In the property editor you can also:

- **Add as a new property** from a column. The ID, display name and base type are inferred from the column name.
- **Map a property to a column**, or a column to an existing property with a matching ID.
- **Add all unmapped columns** at once.
- **Unlink** a property, and map it to another column.

**[Docs]** Some rules apply:

- A backing datasource may not contain `MapType` or `StructType` columns.
- Column names must exactly match the configured backing columns, or data goes missing.
- Property types needing advanced configuration, such as media, are added after the helper.

**[Recommendation]** Don't press *Add all unmapped columns* on a wide source dataset. That one click is how the [Kitchen Sink](../11-design/03-anti-patterns.md#the-kitchen-sink) happens. Map what a user or app needs, with a description for each property.

**Open question** [RQ-18](../SOURCES.md#open-research-questions): the struct documentation says a struct property is backed by a single **struct-type column**, which seems to contradict the `StructType` rule above. Possibly the restriction applies only to the creation helper. Covered in [05 — Structs](../05-properties/03-structs.md).

## Step 3 — Several datasources for one type (MDOs)

**[Docs]** A **multi-datasource object type** (MDO) is backed by several datasources and exists only in OSv2. Only datasets or restricted views can be used; streams are not supported.

- **Column-wise MDOs only.** Each datasource supplies different properties for the same objects, joined on the primary key.
  - The primary key must be in every datasource.
  - Every other property comes from exactly one datasource.
- **Row-wise MDOs** (a union of datasets with the same schema) don't exist. Use restricted views for row-level needs.
- **Limits and behaviour:**
  - up to **70** datasources that sync to object storage per type;
  - user edits and materializations are supported.
- **No access to one datasource:** a user without View on that datasource sees its properties as **null**, but still sees the type's schema.
- **Missing keys:** if a key is missing from one datasource, that datasource's properties are null for that object.

**[Docs]** The FAQ compares MDOs with two linked object types:

- MDOs are the "user-friendly way" to model one real-world thing whose data is split across sources.
- Separate linked types suit cases where users really think of two things. Traversing links is more expensive than filtering on one type's properties.

**[Example]** Kestrel considers adding the fraud team's **risk score** to `Customer` as a second, restricted datasource:

| Option | What Ama sees | What Tomás sees | Trade-off |
|---|---|---|---|
| **A. MDO:** `Customer` with a Kestrel Pay datasource for risk columns | Customer with risk properties showing as null | Everything | One type, simple filters ("high-risk customers in Ghana"). But every app must cope with nulls that mean "not allowed", not "unknown" |
| **B. Separate `Customer Risk Profile` type**, linked to `Customer`, in the payments project | Customer only; the risk type is invisible to her | Both, one link apart | Clear security boundary and its own lifecycle; an extra traversal |

Kestrel chooses **B**. Risk data has its own owners, changes on its own schedule, and must never be confused with missing data in customer-service apps. Option A would suit a case like *marketing preferences* (another team, same customer, harmless nulls).

## Changing the source later

**[Docs]**

- **Replacing a datasource** keeps property mappings only if the new datasource has the same schema. Otherwise you remap.
- **OSv2:** changing the datasource is a **breaking schema change**. Existing user edits need a migration, for example *Move edits* (see [04 — Creating and editing](04-creating-and-editing-object-types.md)).
- **Removing a backing datasource:** only possible when the type is saved in a project. Every property mapped to that datasource then becomes **edit-only**, populated by actions.

## Common errors

| Error | Meaning |
|---|---|
| `Phonograph2:DatasetAndBranchAlreadyRegistered` | That datasource already backs another object type |
| `Phonograph2:FoundryColumnNameNotFound` | A column was removed upstream and a property is now unmapped |
| `OntologyMetadata:IncompatibleFoundryFieldSchemaForPropertyType` | The property's base type doesn't match the column's type |
| `Phonograph2:SchemaMismatch` / `FieldTypeIncompatibleWithOntologyPropertyType` | The dataset schema changed but the Ontology wasn't updated, or the other way round |

---
[Module index](README.md) · Previous: [01 — Object types](01-object-types.md) · Next: [03 — Primary keys and titles](03-primary-keys-and-titles.md)
