# 05 — Migration and export/import

*Sources: [Migrating between ontologies](https://www.palantir.com/docs/foundry/ontologies/ontology-migration/) · [Export, edit and import](https://www.palantir.com/docs/foundry/ontology-manager/export-import/) · [Create a product](https://www.palantir.com/docs/foundry/foundry-devops/create-products/) · [Ontology SDK overview](https://www.palantir.com/docs/foundry/ontology-sdk/overview/) · [Developer Console](https://www.palantir.com/docs/foundry/developer-console/overview/) · checked October 3, 2026 · Ready for Review*

There are four ways to get Ontology definitions from one place to another. They look interchangeable, and they aren't. This note is a **decision guide**: a comparison, then three Kestrel scenarios with the route each one took.

## The four routes

| | **Migrate resources** | **Export / import JSON** | **Marketplace product** ([04](04-marketplace-packaging.md)) | **SuperRepo** (Ontology as code) |
|---|---|---|---|---|
| What moves | The **resources themselves** move to another ontology | A **copy of the working state** as JSON | A **versioned package** that creates new resources at each install | Definitions in a code repository |
| Original afterwards | Gone from the source ontology | Unchanged | Unchanged | Unchanged |
| User edits | **Preserved by default** | Not included (definitions only) | **Not packageable** | Not included |
| Data permissions | Unchanged. Permissions change on the **resources**, "not… the underlying data and the input datasources" | — | Installers map their own inputs | — |
| Repeatable | One-off | Repeatable, by hand | Versions, upgrades, release channels | CI-driven |
| Main risk | Missing connected resources make it **fail** | The JSON schema "may change over time" | Size limits, unsupported types | Needs a pro-code team |

**[Docs] Details by route:**

- **Migrate** is in Ontology Manager: open the owning ontology, choose *Migrate resources*, pick a target ontology, and select object types, link types, action types and "workflows". A preview shows source and target side by side. Moving **connected resources together** is required. You **can't move a type into the default ontology** unless it was created there.
- **Export / import** is under *Advanced settings*. The **export includes your unsaved working state**. **Import recreates the entire working state** from the file, and the changes then have to be saved. A file with **conditional formatting rules** can only be imported into the ontology it came from; otherwise you get `OntologyMetadata:UnreferencedRuleSets`. "You should not depend on the exported JSON schema as it may change over time."
- **SuperRepo**, from the OSDK and Developer Console pages: Ontology definitions, functions and frontend live in one pro-code repository. The OSDK is generated locally, and the result ships as a **Marketplace product** "from your own CI system". **[Explanation]** The SuperRepo pages are now read in full in [DevTools 05-04](../../DevTools/05-development-environments/04-superrepo-and-foundry-cli.md). Two limits matter here: functions must be **TypeScript v2**, and types installed from a SuperRepo are **locked**, so they can't then be edited in Ontology Manager (unlocking lets you, but the next deployment overwrites the edits). SuperRepo is also **beta**.

## Scenario 1 — "This type is in the wrong ontology"

Our own course enrollment had this problem: `Flight Alert` was created in the **default** ontology, while `Flight` lived in *Hence - INTERNAL* ([03-01](../03-ontology-fundamentals/01-ontologies-as-resources.md#a-story-from-our-own-enrollment)). The link couldn't be made.

**Route: migrate resources**, if the type has edits or consumers worth keeping. **[Docs]** Edits are preserved, and connected resources must move together. **[Explanation]** For a fresh course type, recreating it in the right ontology was simpler, and that's what was done. Migration earns its place when a type has edits, action logs or apps you don't want to rebuild.

**[Docs]** The rule about migrating *into* the default ontology doesn't block this direction, from default to a private ontology. **[Explanation]** Moving types *out of* a default ontology is the common clean-up case.

## Scenario 2 — "Promote the Delivery Desk from dev to prod"

**Route: Marketplace product** ([04](04-marketplace-packaging.md)). Not export/import.

**[Explanation]** Export/import would technically copy the definitions, but nothing would track **versions**, nothing would map **inputs** (production `Order` instead of dev `Order`), and the next change would be another manual import. Use JSON export/import for **one-off bulk edits** and **backups of the working state**, not for releases.

## Scenario 3 — "Bulk-rename 140 property descriptions"

Lena's audit found that 140 money properties lack a currency in their description.

**Route: export → edit the JSON → import → review → save.** **[Docs]** This is the docs' first use case: "make Ontology edits in code, … bypass the Ontology Manager interface". **[Explanation]** Some precautions:

- **Export from a clean working state**, because the export includes unsaved changes.
- **Diff the JSON** before importing. Import recreates the *entire* working state, so a stale export would undo other people's saves made since you exported.
- **Import, then review in *Review edits***. The changes are staged, not saved, so the usual errors, warnings and conflict handling apply ([01](01-saving-reviewing-and-restoring.md)).
- **[Explanation]** On **protected** resources, the import should still have to be saved to a **branch** ([02](02-branching-and-proposals.md)), because the save step is the same. The export/import page doesn't say so.
- Don't script against the JSON format long-term. It's undocumented and "may change over time".

## And the shared ontology?

The [12-05](../12-security-and-governance/05-shared-ontologies-and-cross-org.md#decision-3--which-types-live-where) decision log chose **not** to migrate `Shipment` into the shared ontology. Migrating would have taken its links and edits along, and exposed every property to the partner. A new, narrow `SharedShipment` was built instead. **[Explanation]** Migration moves a type's **whole identity**. When only part of a type should cross a boundary, build a new type.

<!-- devtools-go-deeper -->
**Go deeper in the DevTools area:** [08 — Product delivery](../../DevTools/08-product-delivery/README.md)

---
[Module index](README.md) · Previous: [04 — Packaging with Marketplace](04-marketplace-packaging.md) · Next: [06 — Monitoring and cleanup](06-monitoring-and-cleanup.md)
