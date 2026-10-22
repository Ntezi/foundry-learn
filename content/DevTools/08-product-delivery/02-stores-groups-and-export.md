# 02 — Stores, product groups and export

*Sources: [Product groups: Overview](https://www.palantir.com/docs/foundry/foundry-devops/product-groups/) · [Manage store permissions](https://www.palantir.com/docs/foundry/foundry-devops/manage-store-permissions/) · [Manage store tags](https://www.palantir.com/docs/foundry/foundry-devops/manage-store-tags/) · [Export and import products](https://www.palantir.com/docs/foundry/foundry-devops/export-import-products/) · checked October 22, 2026 · Ready for Review*

**[Concept]** A **store** is where products are published and who can see, edit and install them is decided. **Product groups** check that several products can be installed together. **Export and import** move products between local stores, on one enrollment or across enrollments.

## Store permissions

**[Docs]** A **local** store sits in a project or folder and inherits its permissions; a **remote** store is created on another enrollment (only Palantir can create one today) and configured in Control Panel. The operations, with the role that usually grants each:

| To… | Operation | Usually granted by |
|---|---|---|
| View a local store | `marketplace:read-local-marketplace` | Viewer |
| Install from a store | `marketplace:install-from-local-marketplace` | Viewer |
| Use a resource as an input | `marketplace:use-resource-as-input` | Viewer |
| Install into a space, project or folder | `marketplace:install-in` | Editor |
| Create a local store | `marketplace:create-local-marketplace` | Editor |
| Create or edit products | `marketplace:create-block`, `marketplace:edit-block-set`, `marketplace:upload-attachment` | Editor |
| Edit store tags | `marketplace:edit-local-marketplace` | Editor |
| Approve a new version | `marketplace:finalize-block-set` | Owner and Editor |
| Export products | `marketplace:export-block-set` | Owner |
| Import products | `marketplace:import-blockset-with-provenance` | Owner |
| Package a dataset **with static data** | `foundry-data-proxy:get-files` (Download) | Viewer, Editor, Owner, unless the enrollment restricts downloads |

**[Docs]** Installers also need access to at least one of the store's organization markings. Remote stores can't be edited, tagged, exported or imported in DevOps.

**[Docs] Approval for new versions.** A store can **require approval** before a new product version is published. The approver must be **someone other than the draft's author** and hold `marketplace:finalize-block-set`; a custom role set narrows who that is.

## Organization markings

**[Docs]** Packaged resources carry organization markings (usually from their project), and so does the store. Moving content between them needs marking permissions:

- **Packaging:** if the store has organizations the resources don't, you need **Expand access** on the resources' organization. If the resources have organizations the store doesn't, you need **Remove** on those.
- **Installing:** the store should carry every organization of the target space. Otherwise you need **Expand access** at install time, or you can apply only the store's organization markings to the installation. Adding the organization to the store avoids this, but lets that organization's users install too.
- Other sensitive markings (PII, for example) need **Remove Marking** when they're removed during packaging or install.

**[Docs] The recommended structure** puts all friction at packaging time: keep resources to be packaged in a project belonging to **one** organization, with no other markings; give packagers the marking permissions on that organization; put the store's project in a **dedicated space** that every installing organization can access. Installers then need no extra marking permissions.

## Store tags

**[Docs]** **Categories** group **tags**; both are defined per store (in DevOps **Settings**) and filter the storefront. Names can be edited but must be unique; **deleting** a category or tag is permanent and removes it from every product. Applying tags to a product needs a **new product version**.

## Product groups

**[Docs]** A **product group** (beta) validates that a set of products can be installed together as one offering, before deployment, without changing how each is packaged or installed. Up to **100** members, from several stores.

- **Member type:** a **product** (version chosen by a policy) or an existing **installation** (its installed version).
- **Version policy** (products only): **Latest published** (default), **Pinned version**, or a **release channel**.
- **Role:** **Workflow member** (part of the offering) or **External dependency** (owned and installed separately, which Marketplace can use to fulfil inputs). Products default to workflow member, installations to external dependency; a group needs at least one workflow member.

**[Docs]** Validation findings:

| Finding | Fix |
|---|---|
| Dependency cycle | Remove one dependency, publish new versions |
| Duplicate outputs (two products package the same resource) | Choose one owner, remove it from the others |
| Incompatible upstream version | Repackage, or select a version the dependent product supports |
| Missing inputs | Package the missing resource in some product, publish |
| Missing recommendation | Repackage the product that needs the input |
| Stale product version (over **six months** old) | Publish and select a newer version |
| Unused external dependency | Remove it |

**[Docs]** **Snapshots** freeze a group's members, exact versions and validation results, so you can return to the last set that installed together or find which change broke it.

## Export and import

**[Docs]** **Download store content** exports selected products from a local store; **Upload to store** imports them into another local store, on the same or a different enrollment.

- The file **isn't encrypted** and may hold datasets, media sets, models and metadata. Use it only for short-lived transport.
- It is **code-signed**: any change in transit makes it unimportable. Palantir may change the format, breaking old files.
- The exporter must check the product may leave the platform; the importer that it may come in.

**[Explanation]** For dev → test → prod on one enrollment, installing from the store is the route ([03](03-marketplace-installs-and-releases.md#release-management)); export and import are for moving products to another enrollment's store.

## For Kestrel

**[Example]** 14-04 puts the `Kestrel Platform` store in a project restricted to the platform team. Two settings from this page fit it:

- **[Recommendation]** **Require approval for new versions**, so a Delivery Desk version can't be published by its own author, mirroring the two-approval, no-self-approval branch policy on `Commerce [Ontology]` ([Ontology 14-02](../../Ontology/14-lifecycle-and-operations/02-branching-and-proposals.md)). **Adopted** into [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md) on October 22.
- **[Explanation]** A **product group** only pays off with several products. Delivery Desk v1.0 is one product with core types as inputs, so a group would add little until Kestrel splits out, for example, a core Ontology product.

**[Explanation]** The Kestrel model doesn't record its organizations beyond the shared ontology with Northwind Freight ([Ontology 12-05](../../Ontology/12-security-and-governance/05-shared-ontologies-and-cross-org.md)). If Kestrel's own resources sit in one organization, the marking rules above add no friction; the expand-access rules would only come into play for something installed into a space Northwind's organization can reach.

---
[Module index](README.md) · Previous: [01 — DevOps products](01-devops-products.md) · Next: [03 — Marketplace installs, upgrades and releases](03-marketplace-installs-and-releases.md)
