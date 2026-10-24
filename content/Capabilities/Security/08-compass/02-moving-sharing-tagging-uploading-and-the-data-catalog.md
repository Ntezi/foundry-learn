# 02 — Moving, sharing, tagging, uploading and the Data Catalog

*Sources: [Move and share resources](https://www.palantir.com/docs/foundry/compass/move-and-share-resources/) · [Tags](https://www.palantir.com/docs/foundry/compass/tags/) · [Manually upload data](https://www.palantir.com/docs/foundry/compass/manually-upload-data/) · [Data Catalog](https://www.palantir.com/docs/foundry/compass/data-catalog/) · checked October 23, 2026 · Ready for Review*

Four short pages about **actions people take in Compass every day**, each with a security edge. Written as **four rules of thumb**, one per page, with the docs behind each.

## Rule 1 — Move into a project; share by group; share links rarely

**[Docs]** Moving: select, *Move*, optionally rename, choose the location. "You will need specific cross-Project permissions to move a file out of a Project and into another. Typically, only the resource Owner can move files out of Projects." Sharing: save a new resource into the relevant project so a group gets it, or use *+ New* in the project; the *Share* panel can **grant access to specific users or groups** or **activate link sharing** "so anyone with the link can access the resource".

**[Explanation]** The two earlier rules this page sits under: the docs recommend moving over sharing for legibility ([01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#4-can-i-share-this-file-from-your-files)), and a share link is a **direct role grant on the file**, which is why turning off folder-and-file role grants removes link sharing altogether ([01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#role-grants-on-folders-and-files)). A move also carries the resource's markings with it and may trip the destination's **project constraints** ([03-03](../03-discretionary-controls-propagation-and-diagnosis/03-project-constraints.md)); moving across role-set boundaries triggers the role-mapping dialog ([01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#role-sets)).

## Rule 2 — Tags describe; they never protect

**[Docs]** "Tags are a helpful construct, but they do not add or imply security." They live in **categories** whose visibility can be limited to organizations (a new category is restricted to your own organization by default; add others to widen it). Suggested dimensions: type of data, source system, refresh schedule; and use-case tags such as region, department, project. Managed under *Platform Settings > Tags*; deleting a category or tag can't be undone and removes it from every resource. Applying tags needs a role with the **"Apply tags to resources in Compass"** workflow, granted through the organization's permissions in Control Panel.

**[Recommendation]** Use tags for the things security can't express but governance needs: *source system*, *refresh*, *data owner*, *retention class*. Never name a tag after a marking (`PII`, `Confidential`): someone will read the tag as the control, and a tag can be applied by anyone with the workflow and removed without an *Expand access* permission.

## Rule 3 — Uploads are ingestion, with the same questions

**[Docs]** Manual upload is for data "approved for the purpose of your use case (no personal data, for example) or notional data". Dataset Preview accepts `.csv`, `.tsv`, `.xls`, `.xlsm` and `.xlsx` into a dataset. Check the file first (header rows, numeric and date columns). Navigate to *Your files* (or a shared folder), optionally a `data` folder, then drag and drop or *+ New > Upload files…*. Three upload modes: **as a media set** (recommended), **to a dataset without a schema** (arbitrary files), or **as a raw file** without changing the extension. Two write modes for media sets:

| Write mode | **[Docs]** |
|---|---|
| **Transactionless** | Writes reflected immediately per item; failures limited to the item; no snapshots, since deletion and overwrite are per item |
| **Transactional** | One open transaction per media set; at most **10,000** files per transaction; nothing committed on build failure; snapshot and incremental builds supported |

**[Explanation]** An upload is the one ingestion path that skips every pipeline control: no source system, no transform, no marking unless the folder has one. The *Compass import* checkpoint ([06-02](../06-approvals-and-checkpoints/02-checkpoints.md#the-catalogue)) exists for exactly this, and the *Protecting against malicious files* page in module 10 is the other half. An upload into *Your files* is also outside every project, which is why references to *Your files* are refused ([01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#4-can-i-share-this-file-from-your-files)).

## Rule 4 — The Data Catalog is curation, not permission

**[Docs]** The Data Catalog (the ✔️ icon on *Files*) is "an interactive view of curated data and other resources": **collections** of files grouped by topic, audience or purpose, each file any saved analysis, dataset, module or other resource. "Anyone can view collections and their descriptions, but you will only have access to curated files that are shared with you." By default **organization administrators** add and remove resources from collections and manage who else may. Catalogued resources carry a purple checkmark; filters and grouping by tag category work inside a collection.

**[Explanation]** Three layers of *this is worth finding* now exist, and none grants access: a **Portfolio** groups projects ([01-03](../01-organizations-projects-users-and-groups/03-users-groups-and-portfolios.md#portfolios-organizing-projects)), **Promoted** status boosts single resources ([01](01-compass-projects-and-navigation.md#resource-status-promoted)), and a **collection** curates resources across projects by topic. A collection's description is visible to everyone in the organization, so, like a cover page, it must not describe sensitive contents.

## For Kestrel

**[Example]** *Adopted* in Phase 7 ([11](../11-kestrel-case/README.md)):

- **Tag categories** (Kestrel organization only): `source` (`storefront`, `ledger`, `carrier`, `northwind`), `refresh` (`hourly`, `daily`, `static`), `owner` (`priya`, `kestrel-pay`, `ama`). No category mirrors a marking.
- **A `Delivery Desk` collection** in the Data Catalog: the queue module, the Order and Shipment Object Views, `customer_master`; curated by Ama, who is given the collection permission by the organization administrators. The payments projects are **not** catalogued, for the same reason they aren't promoted.
- **Link sharing is already off** everywhere through the folder-and-file role-grant setting ([01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#for-kestrel)); the *Share* panel's other half, granting a group, is what the cover pages tell people to ask for.
- **Manual uploads** happen only in a `Storefront [Datasource]/manual` folder owned by Priya's group, never in *Your files*, with the *Compass import* checkpoint asking for the source and approval reference; CS agents have no Editor role anywhere an upload could land.

---
[Module index](README.md) · Previous: [01 — Compass, projects and navigation](01-compass-projects-and-navigation.md) · Next module: [09 — Sensitive Data Scanner and Data Lifetime](../09-sensitive-data-scanner-and-data-lifetime/README.md)
