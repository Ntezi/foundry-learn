# 01 — Compass, projects and navigation

*Sources: [Compass](https://www.palantir.com/docs/foundry/compass/overview/) · [Create a Project](https://www.palantir.com/docs/foundry/compass/create-a-project/) · [Use Project navigation panel](https://www.palantir.com/docs/foundry/compass/use-project-navigation-panel/) · [Use Project details panel](https://www.palantir.com/docs/foundry/compass/use-project-details-panel/) · [Quicksearch](https://www.palantir.com/docs/foundry/compass/quicksearch/) · [Resource status](https://www.palantir.com/docs/foundry/compass/resource-status/) · checked October 23, 2026 · Ready for Review*

A **guided tour of the file system**, with the security consequences called out as they appear. Compass is where every control in modules 01–03 is actually clicked, so the tour follows the screens: the Files page, a new project, the project's two panels, search, and the one status a resource can carry.

## The Files page

**[Docs]** Compass "is the filesystem for the Palantir platform". Resources are the files; projects are "collaborative spaces that organize people, resources, and folders for a particular purpose". *Files* in the sidebar opens four tabs: **Portfolios**, **Projects**, **Your files** (visible only to you) and **Shared with you**; quick-filter cards for portfolios, projects and *Promoted* items; a *Request access* button on projects you can't open; and a left-hand filter panel by resource type, status, portfolio, project, organization and tag.

**[Docs]** A project dashboard has five areas: **Files** (pinned resources on top), **Autosaved**, **References** (file and external), **Trash**, and **Sensitive Data Scanner** ("a view for operational users to review personally identifiable information (PII) detections", [09-01](../09-sensitive-data-scanner-and-data-lifetime/01-sensitive-data-scanner-concepts-and-scans.md)).

## Creating a project

**[Docs]** *+ New project* on the Projects page: name, optional description, the **space** it lives in, and the **default role** for users in your organization, whose initial value comes from the space's *Project default roles* setting ([01-01](../01-organizations-projects-users-and-groups/01-organizations-spaces-and-enrollments.md#spaces-the-container-with-the-settings)). If the space has templates, one is applied ([01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#8-every-new-project-should-start-the-same-way)).

**[Docs]** Documentation for any folder: drop a `README.md` into it or *Add description* from the folder's *Actions*. Standard Markdown, with restrictions: **inline HTML is disabled**, and by default only images uploaded to Foundry render (`![Alt text](link to image in Foundry)`). A link written as `[text](rid)` becomes a resource link with icon and name. An existing `README.md` doesn't start rendering by itself; download, delete and re-upload it.

**[Explanation]** The HTML ban is a security setting disguised as a formatting limit: a folder description is shown to everyone who can discover the folder, so it can't be allowed to run script. The same applies to cover pages ([02-03](../02-markings-and-mandatory-controls/03-property-security-markings-and-cover-pages.md)).

## The navigation panel (left)

| Section | **[Docs]** what it is | Security note |
|---|---|---|
| **Cover page** | The project's Markdown documentation | Discoverable even on a marked project ([02-03](../02-markings-and-mandatory-controls/03-property-security-markings-and-cover-pages.md)) |
| **Files** | Everything in the project, pinned items first | |
| **Autosaved** | Files created from an existing file land here, not in *Your files*; visible to anyone with access to the folder; shown in *Files* once saved manually | An autosaved file **inherits the folder's permissions** and its creator is its Owner. Save it before sharing. Autosave access is configured with your Palantir representative |
| **References** | **File references** (anything from outside the project used in Code Repositories, Code Workbook, Pipeline Builder, Fusion or Contour; Editors add them; right-click *Remove References*) and **external references** (code packages added automatically for builds) | The project is "a security boundary for applying and managing access", so the flow of data in needs "special attention" ([01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#5-i-need-a-dataset-from-another-project)) |
| **Trash** | Per project. *Move to trash* applies immediately, but the Trash **listing is search-backed** and may lag; confirm in the *Activity log* or by opening the item (*In trash*). *Restore* returns the file to its place "and returns previous permissions"; *X* deletes permanently | A trashed resource is still a resource with its permissions until permanently deleted |
| **Project usage** | Owners get a link to Resource Management | |
| **Access graph** | Markings on the project, groups with roles, members of those groups; "very helpful if your setup involves a lot of nested groups" | The same tool as in [03-04](../03-discretionary-controls-propagation-and-diagnosis/04-diagnosing-access.md#who-even-has-this-marking--access-graph) |

## The details panel (right)

**[Docs]** Opened from the right-hand icons; defaults to **Overview**. For a project, Overview shows the description, the **project point of contact** ([01-03](../01-organizations-projects-users-and-groups/03-users-groups-and-portfolios.md#situation-who-do-i-contact-about-this-project)) and **Metadata** (RID first, then Location, Space, Iceberg storage, Tags, Portfolio, Status, Collections, Created, Last modified, Views, each shown only when it has a value), with optional **Documentation**, **Marketplace installation** and **Classification** (CBAC enrollments only) sections. If you can see the cover page but not the contents, Metadata shrinks to RID, Location and Space.

| Tab | **[Docs]** |
|---|---|
| **Documentation** | Markdown editor at project or folder level |
| **Activity** | A running log of changes, project level only, "stores only the last month of activity" |
| **Discoverability** | Make the project and description discoverable to other organizations; "under development" |
| **Access** | For an **Owner**: required markings, default access, roles for users and groups. For Viewer or Editor: a read-only overview of the groups with access |
| **Resource queues** | Which queues the project uses |

**[Explanation]** The one-month Activity log is not an audit trail. For anything older, or anything that must be provable, the audit logs in [10-02](../10-privacy-governance-and-enterprise-security/02-audit-logs.md) are the record; Activity is for the team's own orientation.

## Quicksearch

**[Docs]** *Search* in the sidebar or **Cmd+J / Ctrl+J**. **Jump-to mode** searches **titles only** (apps, resources, objects), personalized by recent and favourited items, and jumps straight to a page. **Full results view** (Enter, or a filter tab: *Apps*, *Objects*, *Datasets*, *Files*) searches descriptions, column names and file paths, filters by creator, tags, projects and folders, and shows metadata including "key security metadata". Ranking combines text matching with boosts.

**[Docs]** Permissions: "Quicksearch respects all existing permissions in the platform." Content you can only discover opens a *Request access* message; "Users will not see content to which they do not have access." Object search covers at most **250 object types**, prioritized Active and Prominent, then Normal, then Experimental; deprecated and hidden types aren't searched, and the user is pointed to Object Explorer for the rest.

**[Explanation]** Two consequences for security design. First, a marking hides a resource from search entirely, while a missing **role** on a discoverable project leaves the title visible with a request button: that difference is the whole point of choosing Discoverer as a default role ([04-01](../04-securing-data-and-applications/01-securing-a-data-foundation.md#step-3--people-get-roles-per-stage)). Second, column names are searchable, so a column called `card_number` in a dataset someone can discover is a hint even if the data is marked.

## Resource status: Promoted

**[Docs]** The only status today is **Promoted**: boosted in search for everyone, a checkmark icon, and a place in the *Promoted items* quick filter. Right-click, *Change status > Promoted* (or *Remove status*). You need **Editor or higher on the resource** and the **Resource Curator** role at the **space** level.

**[Explanation]** Promotion is discoverability, not access: a promoted resource still needs a role or a request. The space-level curator role is what stops any Editor from promoting their own work into everyone's search results.

## For Kestrel

**[Example]** *Adopted* in Phase 7 ([11](../11-kestrel-case/README.md)):

- **Resource Curator** on the `kestrel` space: Ama and Lena, as the two Portfolio curators from [01-03](../01-organizations-projects-users-and-groups/03-users-groups-and-portfolios.md#for-kestrel). Promoted: the Delivery Desk queue module and the configured Object Views for Order and Shipment; nothing from the payments projects, so nothing there is boosted into search for users who can't open it.
- **Autosave** in `Delivery Desk [Workflow]` stays on (CS agents duplicate saved queues); in the payments projects it is a question for Palantir, since an autosaved copy of a Contour analysis over the refund ledger inherits the folder's permissions but has a new Owner.
- **Trash discipline:** anything trashed from `Payments [Ontology]` is permanently deleted at month end by a Kestrel Pay engineer, so a marked dataset doesn't sit restorable indefinitely. Recorded as an operating rule, not a control.

---
[Module index](README.md) · Next: [02 — Moving, sharing, tagging, uploading and the Data Catalog](02-moving-sharing-tagging-uploading-and-the-data-catalog.md)
