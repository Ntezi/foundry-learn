# 04 — Creating and editing object types (lab)

*Sources: [Create an object type](https://www.palantir.com/docs/foundry/object-link-types/create-object-type/) · [Edit object types](https://www.palantir.com/docs/foundry/object-link-types/edit-object-type/) · [Manage schema changes](https://www.palantir.com/docs/foundry/object-edits/schema-migrations/) · [How user edits are applied](https://www.palantir.com/docs/foundry/object-edits/how-edits-applied/) · [Statuses](https://www.palantir.com/docs/foundry/object-link-types/metadata-statuses/) · [Add an Ontology output](https://www.palantir.com/docs/foundry/pipeline-builder/outputs-add-ontology-output/) · checked October 2, 2026 · Ready for Review*

A hands-on page in two parts:

- **Part A** creates Kestrel's `Shipment` object type, step by step.
- **Part B** changes it after people depend on it, which is where the real risk is.

Steps follow the docs as of the check date. The screens in your enrollment may differ slightly.

## Before you start

- A clean backing dataset: `Commerce [Ontology] /data/ontology/shipment`. One row per shipment, a `shipment_id` string key, and checks for uniqueness and nulls ([02 — Pipelines](../02-foundry-data-foundations/02-pipelines-that-feed-the-ontology.md)).
- Editor on the project where the object type will be saved ([02 — Projects, spaces and markings](../02-foundry-data-foundations/04-projects-spaces-and-markings.md#what-this-means-for-the-ontology)).
- The right ontology selected (see [03 — Ontologies as resources](../03-ontology-fundamentals/01-ontologies-as-resources.md)).

## Part A — Create `Shipment`

There are three routes:

- **Ontology Manager's guided helper:** the recommended route, used below.
- **Pipeline Builder object type output:** the type is owned by the pipeline; see [02 — Pipelines](../02-foundry-data-foundations/02-pipelines-that-feed-the-ontology.md#ontology-outputs-in-pipeline-builder).
- **SuperRepo:** "Ontology-as-code", where object types are defined in code. Types made in Ontology Manager can be imported into one.

**1. Start the helper.** In Ontology Manager, choose **New → Create object type**, or *Create your first object type* on the home page.

**2. Datasource.** Select the shipment dataset. The helper fills in metadata and maps every column. The docs say the dataset can't contain `MapType` or `StructType` columns. Struct properties are added afterwards; see [RQ-18](../SOURCES.md#open-research-questions).

**3. Metadata.**

| Field | Value |
|---|---|
| Icon | A truck |
| Name / plural | Shipment / Shipments |
| Description | *One parcel or pallet sent to a customer from one warehouse by one carrier; an order can have several* |
| Group | Fulfilment |

**4. Properties.** Remove what nobody needs, such as WMS audit columns and internal flags. Then set the keys:

- **Primary key:** `shipmentId`.
- **Title key:** `trackingNumber`.

Media and other advanced property types are added after the helper.

**5. Generate actions (optional).** The helper can create a standard set of edit actions and assign who can run them. Skip this: Kestrel designs business-operation actions instead, such as *Re-route shipment*, to avoid [Action Sprawl](../11-design/03-anti-patterns.md#action-sprawl). Not available on OSv1.

**6. Save location.** Choose `Commerce [Ontology]`. Selecting **Create** only **stages** the change.

**7. Security policies.** Needed only for types *without* a datasource. Here the objects inherit permissions from the backing dataset.

**8. Save.** Select **Save** at the top right, review the edits, then save again. Wait for indexing and hydration before expecting objects in Object Explorer.

**9. Tidy the API names.** They're inferred from display names and can be changed while the type is still **experimental**:

- type names are PascalCase, unique, 1–100 characters;
- property names are camelCase;
- reserved words aren't allowed.

**Checkpoint.**

- Object Explorer shows shipments.
- The Datasources tab shows a healthy live pipeline.
- The object count matches the distinct `shipment_id` values in the dataset.

**If saving is blocked:** every new type needs an ID, display and plural names, a backing datasource (unless created without one), an API name, a primary key and a title key. Each property also needs an ID, a display name, a backing column (unless edit-only) and an API name.

## Part B — Change it safely

Three months later, `Shipment` is **active**. Ama's app, Kofi's re-routing action and the Delivery Desk agent all use it, and objects have user edits. Priya needs to:

1. rename `etaDate` to `promisedDeliveryDate`;
2. change `weightKg` from Integer to Double;
3. drop `legacyStatusCode`.

**[Docs]** On OSv2, Ontology Manager detects **breaking schema changes** and won't save them until you pick a **migration** for existing edits.

| Change | Breaking? |
|---|---|
| Change a type's input datasources | **Breaking** |
| Change the primary key | **Breaking**, and can't be migrated |
| Change a property's data type | **Breaking** |
| Change the ID of, or delete, a property that has received edits | **Breaking** |
| Delete a struct field that has received edits, or change a struct field's type | **Breaking** |
| Change display name, title key, render hints, type classes or visibility, even on edited properties | Not breaking |
| Delete or change properties that **never** received edits | Not breaking |

**Available migrations:**

- Drop property edits / drop struct field edits / drop all edits
- Move edits / move struct field edits
- Cast to a new type (e.g. Integer → Double, String → Date)
- Revert a migration

Up to **500** migrations can be applied at once.

After saving, a new schema version is created and a **replacement pipeline** reindexes in the background. Consumers see the new version once it's fully hydrated.

Applied to Priya's three changes:

| Change | Breaking? | Migration |
|---|---|---|
| `etaDate` → new property `promisedDeliveryDate` | Yes, if `etaDate` has edits | **Move edits** from the old property to the new one |
| `weightKg` Integer → Double | Yes | **Cast property to new type** (Integer → Double is supported) |
| Drop `legacyStatusCode` | Only if it received edits | **Drop all property edits** for it, if any |

**[Docs]** Status rules shape the plan too:

- An **active** resource can't be deleted, and its API name can't change.
- The API name of an **active** property can't change either.

So the rename really means: add `promisedDeliveryDate`, migrate the edits, update the consumers, then deprecate `etaDate` with a replacement and a deadline. Delete it later.

**[Docs]** Other things to remember:

- **Changing a property's type also means updating every action that writes it**, because actions declare the expected type.
- **To wipe all user edits**, for example after testing, use *Delete edits* in the Datasources tab, which is the *drop all edits* migration. There is no way to undo a single edit except by making another edit.

**[Explanation]** Before saving, open the type's **Usage** tab (see [02 — Ontology Manager](../03-ontology-fundamentals/02-ontology-manager.md#usage-who-depends-on-this)) and tell the owners of each app what's changing.

## On OSv1 (legacy)

**[Docs]** The *Edit object types* page mostly describes OSv1 (Phonograph):

- Changing the datasource or the primary key, or deleting the type, unregisters and reregisters the datasource. Apps break until the reindex finishes.
- With writeback enabled, unregistering **deletes the edit history**.
- There are no schema migrations. Breaking changes on edited properties make the reindex fail until you undo them or manually reregister.

That's why older guidance treats schema changes as dangerous. On OSv2 the migration framework replaces most of this.

## Deleting a type

**[Docs]**

- Use the ⋯ menu → **Delete**. This stages deletion of the type **and its link types**, and takes effect on save.
- Active types can't be deleted. Move them to deprecated or experimental first.
- Anything referencing the type breaks.

---
[Module index](README.md) · Previous: [03 — Primary keys and titles](03-primary-keys-and-titles.md) · Next module: [05 — Properties](../05-properties/README.md)
