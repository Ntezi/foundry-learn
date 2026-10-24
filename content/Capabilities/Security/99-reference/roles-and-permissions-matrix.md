# Roles and permissions matrix

*Sources: the notes each row links to, which hold the docs' wording · compiled October 23, 2026 · Ready for Review*

Every role, permission and licence this area's notes name, grouped by the thing it is granted on. Two reminders from [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#6-what-exactly-does-a-role-let-someone-do): roles are independent sets of operations, not a strict hierarchy, so in a customized set a more powerful role need not contain a lesser one; and whatever the role, a mandatory control the user lacks blocks them.

## Project roles (the default *Project defaults* set)

| Role | What the docs attach to it | Can grant | Note |
|---|---|---|---|
| **Owner** | Everything below, plus the operations only Owner holds in the defaults, such as *Change default branch* on every Code Repository in the project; turns folder-and-file role grants off; sets project constraints (with *Apply marking* on every marking listed); applies markings (*Update Markings on resource*) | Any of the four | [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#6-what-exactly-does-a-role-let-someone-do), [03-03](../03-discretionary-controls-propagation-and-diagnosis/03-project-constraints.md), [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#applying-a-marking-to-a-live-pipeline) |
| **Editor** | Change resources; needed to promote a resource (with the space-level Resource Curator role) | Editor, Viewer, Discoverer | [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md), [08-01](../08-compass/01-compass-projects-and-navigation.md#resource-status-promoted) |
| **Viewer** | Read resources and data, subject to markings | Viewer, Discoverer | [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md) |
| **Discoverer** | See that a resource exists and request access; the role templates give new projects by default so they are findable, not readable | Discoverer | [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#8-every-new-project-should-start-the-same-way) |

Role grants inherit to child resources. The docs' two sample custom roles: **Merger** (Viewer plus *Manage Artifacts repository*, *Merge to protected branch*, *Merge pull request*, *Update pull request*) and **Supporter** (the issues operations only, no metadata). Custom roles need the *Manage roles and role sets* organization administrator permission and live in a custom role set applied to a space ([01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#7-we-need-a-role-that-doesnt-exist)). Three role-set contexts exist: Project, Ontology and Marketplace Installation.

## Marking and organization permissions

| Permission | On | Allows | Grants access to the data? | Note |
|---|---|---|---|---|
| **Manage permissions** | A marking | Grant permissions to manage the marking, its members and metadata | No | [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#marking-permissions-are-four-separate-things) |
| **Apply marking** | A marking | Put it on projects and resources (also needs *Update Markings on resource*, which Owner has) | No | [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#marking-permissions-are-four-separate-things) |
| **Remove marking** | A marking | Take it off; the holder must also be able to apply it | No | [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#marking-permissions-are-four-separate-things) |
| **Members** | A marking | See resources protected by it, everywhere, subject to roles | **Yes**: this is membership | [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#marking-permissions-are-four-separate-things) |
| **Category Viewer** | A hidden marking category | See that the category and its markings exist | No | [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#categories-and-markings-are-permanent) |
| **Apply organization** | An organization | Add it as an access requirement on a resource, folder or project (narrows access) | — | [01-01](../01-organizations-projects-users-and-groups/01-organizations-spaces-and-enrollments.md#the-two-organization-permissions) |
| **Expand access** | An organization | Add other organizations to a resource or remove this one (widens access); needed on the **source** organization when moving a resource out | — | [01-01](../01-organizations-projects-users-and-groups/01-organizations-spaces-and-enrollments.md#the-two-organization-permissions) |

Categories can't be deleted; markings can't be deleted or moved between categories. The creator of a category is its administrator by default; the creator of a marking gets *Manage permissions* ([02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#part-2--running-markings)).

## Space, organization and enrollment roles

| Role | Where | What it does | Note |
|---|---|---|---|
| **Enrollment administrator** | Control Panel | Creates spaces and organizations, sets the terms of collaboration between organizations, enables code scanning for the enrollment | [01-01](../01-organizations-projects-users-and-groups/01-organizations-spaces-and-enrollments.md), [04-04](../04-securing-data-and-applications/04-cross-organization-collaboration.md), [10-05](../10-privacy-governance-and-enterprise-security/05-code-scanning.md) |
| **Organization administrator** (permission *Manage roles and role sets*) | Control Panel | Customizes roles and role sets | [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#7-we-need-a-role-that-doesnt-exist) |
| **Space administrator / owner** | Space permissions in Control Panel | Space settings, role set, project templates, project inherited roles; reviews every checkpoint record in the space | [01-01](../01-organizations-projects-users-and-groups/01-organizations-spaces-and-enrollments.md#spaces-the-container-with-the-settings), [06-02](../06-approvals-and-checkpoints/02-checkpoints.md) |
| **Resource Curator** | Space level | With Editor on the resource, sets the *Promoted* status | [08-01](../08-compass/01-compass-projects-and-navigation.md#resource-status-promoted) |
| **Portfolio curator** | A Portfolio | Edits name, description, documentation and the project list; promotes pinned resources into the catalog | [01-03](../01-organizations-projects-users-and-groups/03-users-groups-and-portfolios.md#portfolios-organizing-projects) |
| **Data Governance Officer** | Control Panel, per organization | Creates, updates, deletes and overrides Data Lifetime policies; with Viewer on a space, scans it with SDS like a space owner; reviews all the organization's checkpoint records | [09-02](../09-sensitive-data-scanner-and-data-lifetime/02-match-conditions-match-actions-best-practices-and-media-sets.md), [09-03](../09-sensitive-data-scanner-and-data-lifetime/03-data-lifetime-concepts-and-deletion-policies.md), [06-02](../06-approvals-and-checkpoints/02-checkpoints.md) |
| **Manage OAuth 2.0 clients** | The managing organization | Registers, enables and manages third-party applications in Control Panel | [05-01](../05-third-party-applications-and-tokens/01-third-party-applications-in-control-panel.md) |
| **Third-party application administrator** | Organization | Opens the *Third-party applications* page in Control Panel for that organization | [05-01](../05-third-party-applications-and-tokens/01-third-party-applications-in-control-panel.md#which-interface) |
| **Create datasets with audit logs for the organization** | Organization | Lets a user or service user set up audit log export datasets | [10-02](../10-privacy-governance-and-enterprise-security/02-audit-logs.md) |

## Operations the docs name individually

| Operation | Default holder | Note |
|---|---|---|
| `stemma:mutate-default-branch` (*Change default branch*) | Owner only | [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#6-what-exactly-does-a-role-let-someone-do) |
| `checkpoints:review-records` (*Review records by resource*) | No default role; grant through a custom role | [06-02](../06-approvals-and-checkpoints/02-checkpoints.md) |
| `foundry-data-proxy:get-files` | In the default roles; the operation an enrollment removes to enforce download controls | [03-05](../03-discretionary-controls-propagation-and-diagnosis/05-download-controls-and-the-two-deprecated-settings.md) |
| *Update Markings on resource* | Owner | [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#applying-a-marking-to-a-live-pipeline) |
| Granular-permission roles for restricted views (*Read restricted view* and the others) | Special platform permissions from the *Granular Permissions Administration* workflow; ask your Palantir representative | [03-02](../03-discretionary-controls-propagation-and-diagnosis/02-restricted-views.md) |
| Data Lifetime default roles: *Namespace Viewer* (view policies), *Dataset Editor* (set and remove policies on datasets) | Space roles | [09-03](../09-sensitive-data-scanner-and-data-lifetime/03-data-lifetime-concepts-and-deletion-policies.md) |

## Cipher licences

| Licence (former name) | Scope | Cell-level audit | Rate limit | Works in | Key access | Note |
|---|---|---|---|---|---|---|
| **Operational User** (*Frontend*) | Individual values | Yes | Yes; may be allowed to bypass checkpoints | Object layer, Functions | No | [07-01](../07-cipher/01-cipher-concepts-and-getting-started.md#choosing-a-licence) |
| **Data Manager** (*High Trust*) | Whole columns | No | No | Pipeline Builder, Contour | No | [07-01](../07-cipher/01-cipher-concepts-and-getting-started.md#choosing-a-licence) |
| **Admin** (*Transforms*) | Whole columns in code | No | No | Code Repositories | Effectively yes | [07-01](../07-cipher/01-cipher-concepts-and-getting-started.md#choosing-a-licence) |

Each licence type has encrypt/hash and decrypt permissions granted separately; use of a licence is granted by giving **View** on it.

## Who may review what

| Record | Who | Note |
|---|---|---|
| An Approvals request | Eligible reviewers: by default whoever could have performed the action themselves; the requester and any eligible reviewer may edit or close | [06-01](../06-approvals-and-checkpoints/01-approvals.md) |
| A checkpoint record | Its creator; holders of `checkpoints:review-records` on the resource; the space administrator; the organization's Data Governance Officer | [06-02](../06-approvals-and-checkpoints/02-checkpoints.md) |
| Data Lifetime policy overrides | Officer only | [09-04](../09-sensitive-data-scanner-and-data-lifetime/04-data-lifetime-in-operation.md) |
| Audit log export datasets | Members of the export dataset's markings, which default to the organization marking; add more so only qualified administrators see them | [10-02](../10-privacy-governance-and-enterprise-security/02-audit-logs.md) |

## Kestrel's assignment

The people-by-role table is in [11-01](../11-kestrel-case/01-kestrels-access-model-built-out.md#who-holds-what).

---
[Module index](README.md) · [Security home](../README.md)
