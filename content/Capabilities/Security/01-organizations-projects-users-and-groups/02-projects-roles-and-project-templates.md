# 02 — Projects, roles and project templates

*Sources: [Projects and roles](https://www.palantir.com/docs/foundry/security/projects-and-roles/) · [Manage roles](https://www.palantir.com/docs/foundry/platform-security-management/manage-roles/) · [Manage Project templates](https://www.palantir.com/docs/foundry/platform-security-management/manage-project-templates/) · checked October 23, 2026 · Ready for Review*

Written as a **project owner's handbook**: the questions an owner gets asked, in the order they come up. The Ontology area already uses projects everywhere ([02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md), [12-02](../../Ontology/12-security-and-governance/02-ontology-resource-permissions.md)); this note is the platform rule book behind that.

## 1. *What is a project for?*

**[Docs]** Projects are "the primary way to organize work in Foundry and the primary boundary for discretionary role grants". A project should be designed so that the people in it "have approximately uniform access to the content, but varied permissions on that content": everyone Viewer by default, one group Editor on everything, say. Work and its output **live in the same project**; to build on another project's work you use **references**.

**[Concept]** Two families of control meet at the project:

| Family | Examples | Where it lives | Does it follow data downstream? |
|---|---|---|---|
| Mandatory | Organizations, markings, classification-based access controls | On the data; inherited through derivation | **Yes** |
| Discretionary | Roles (Owner, Editor, Viewer, Discoverer) | Granted on a project, folder or file | **No**: roles "govern access to the resource itself" and do not extend to data after it has been read |

**[Docs]** The page's rule for choosing: "When the goal is to keep data protected through downstream derivation, use a mandatory control." Full model in [03-01](../03-discretionary-controls-propagation-and-diagnosis/01-access-control-propagation.md).

## 2. *Who can create a project?*

**[Docs]** Users with **Editor or Owner on the space**. Space permissions are set on the space settings page ([01](01-organizations-spaces-and-enrollments.md#spaces-the-container-with-the-settings)). If the space has project templates, the creator may need more: a template that creates groups or markings, or applies an existing marking, requires the creator to hold the permissions for those actions.

## 3. *Someone wants in. What happens?*

**[Docs]** Users can request access to projects they can't open. The request bundles everything needed, "including any required Markings". Three entry points: *Request access* (next to the project name in *Projects & files*, or when opening a resource they can't view, such as a direct link), *Request project access* (in the project view, for someone with only Discoverer), and *Request additional access* (in the *Actions* menu, for someone already inside). The requester gives a reason, the users or groups to be granted (if on behalf of others), and how.

**[Docs]** How the request is routed depends on the group:

| Groups on the project | What the requester sees | Who approves |
|---|---|---|
| Internal groups (managed in Foundry) | Picks a group to join; custom request forms can guide the choice ([03](03-users-groups-and-portfolios.md#situation-the-request-form-confuses-people)); groups can be hidden from the form | The group's administrators |
| External groups (from an identity provider) | A message and URL sending them to request the group outside Foundry | Whoever runs that system |
| No groups assigned | Asks for a role directly | Users with **Owner** on the project, through a project access request task |

**[Docs]** A request made on a file or folder is submitted **on the project**, with the file shown for context. Requests land in the **Approvals** inbox ([06-01](../06-approvals-and-checkpoints/01-approvals.md)); the requester sees theirs under *My requests*.

**[Recommendation]** Grant **group** roles at project level, as the page does. Three consequences follow: the request flow has somewhere to route to; a person's access can be read off their group memberships; and removing someone is one change, not one per project.

## 4. *Can I share this file from Your files?*

**[Docs]** The recommendation is to **move** resources into a permissioned project rather than share from *Your files*, for "clarity of access and legibility of who has access to what". References to files in *Your files* are refused outright, "because it may cause permission issues"; move the file into a project first.

## 5. *I need a dataset from another project.*

**[Docs]** Builds take inputs and produce outputs **in the same project**. To use an upstream dataset, add a **file reference**. Once referenced, colleagues in your project can see datasets **derived** from it without access to the upstream project, "as long as they satisfy any organizations and markings on the dataset". Seeing the **raw** upstream dataset, or building directly on it, still needs Viewer on the upstream project. Adding a reference usually needs **Viewer on the source project and Editor on the destination**. References can be added from Code Repositories, Code Workbook, Pipeline Builder, Fusion and Contour.

**[Docs]** The page's example: `flights` referenced from *Flight Control System [Datasource]* into *Flight Delays [Transform]*; a user added to the transform project can see and build on `delays`, but not on raw `flights`.

**[Explanation]** This is the mechanism behind the project chain in [04-01](../04-securing-data-and-applications/01-securing-a-data-foundation.md) and Ontology [02-02](../../Ontology/02-foundry-data-foundations/02-pipelines-that-feed-the-ontology.md): each project in the chain references the one before, and the people in each only see their own stage's outputs plus whatever mandatory controls let through.

**[Docs]** When one category of data needs central control regardless of project, put a **marking** on the raw dataset: anyone wanting `flights` **or anything derived from it** then goes through the central body that grants the marking ([02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md)).

## 6. *What exactly does a role let someone do?*

**[Docs]** Roles are sets of **operations**, the individual permissions applications check. The example: *Change default branch* (`stemma:mutate-default-branch`) is in the default Owner role and in none of the lesser ones; granting Owner on a project grants that operation on every Code Repository inside it.

**[Docs]** Defaults, most to least powerful: **Owner, Editor, Viewer, Discoverer**. Each role can grant the same or a lesser role: an Owner can grant any of the four, a Discoverer only Discoverer. Role grants **inherit** to child resources, like mandatory controls.

**[Docs]** Two things the page is careful to say: roles are "independent sets of operations rather than a strict hierarchy", so in a customized set a more powerful role "is not guaranteed to include every operation granted by another role"; and whatever the role, a mandatory control the user lacks blocks them.

**[Explanation]** The exam-shaped version: *Editor on the project* is not an answer to *can she see the payments?* if the payments dataset carries a marking she lacks. Role answers *what can you do with what you're allowed to see*; markings and organizations answer *what are you allowed to see*.

### Role grants on folders and files

**[Docs]** Roles should be granted at project level. A project **Owner** can turn off folder- and file-level role grants in the project's *Settings*. Doing so **removes** existing grants on individual resources inside (and on resources later moved in), and removes **link sharing**, because a share link is a direct grant on the file. Removed grants can't be re-added until the setting is re-enabled; users are warned. The setting is **off by default**; space administrators set the default for the space. The recommendation is to keep it off.

## 7. *We need a role that doesn't exist.*

**[Docs]** Role customization lives in *Foundry Settings > Roles* and needs the **Organization administrator** permission in Control Panel, specifically *Manage roles and role sets*. A custom role can **include** other roles (the example *Merger* includes Viewer) and then adds operations. The two sample roles:

| Role | Built from | For |
|---|---|---|
| **Merger** | Viewer + *Manage Artifacts repository*, *Merge to protected branch*, *Merge pull request*, *Update pull request* | People who may merge to protected branches without being Editors |
| **Supporter** | *Apply Assignment Rules*, *Archive issues*, *Edit issues*, *Close and reopen issues*, *View issues* only | Support teams who may see a project's issues but **no metadata** (schemas, dataset names) |

**[Docs]** The default roles themselves can be edited only inside a **custom role set**: copy the defaults into a new set, then change, say, Editor to include *Change default branch*.

### Role sets

**[Docs]** A role set is a group of roles used in one context. Guarantees: roles in a set depend on nothing outside it; every role is in exactly one set; a set belongs to one organization and is permissioned uniformly; the roles are designed to work together. Three contexts exist: **Project**, **Ontology** and **Marketplace Installation**, and every enrollment has the three default sets (*Project defaults*, *Ontology defaults*, *Marketplace Installation defaults*), always available to every organization.

**[Docs]** Creating one copies roles from an existing set. A copy of *Project defaults* (or of a set that depends on it) is **automatically updated** when Palantir adds roles to the defaults. Visibility of a set follows **organization discoverability**, so mutually discoverable organizations can use each other's custom roles in a shared project. A set is applied **at the space level** only: all projects, folders and files in the space use its roles. Replacing a space's set opens a **mapping** dialog (each current role → a replacement) and rewrites every grant in the space; moving a resource with a direct role grant across a role-set boundary shows the same dialog.

**[Explanation]** Why sets rather than loose roles: a role grant is only meaningful if the application checking it agrees on what the role contains. Binding a whole space to one set means every grant in it is interpreted the same way, and the mapping step on replacement means no grant is silently left pointing at a role that no longer exists.

## 8. *Every new project should start the same way.*

**[Docs]** **Project templates** standardize project creation per space: today they can set **roles, groups, markings and project constraints**; folder structure is promised later. Space owners manage them at *Control Panel > Project templates*. A template can declare **variables** (filled in at project creation) and use them to name the groups and markings it **creates automatically**, for example `project name` + role. It can set a **default role**, give existing users or groups a role on every project made from it, and give the **project creator** a role. The documented common pattern: viewer, editor and owner groups, the owner group managing the other two.

**[Docs]** Markings in a template: new or existing markings are applied at creation, and everyone who receives a role grant on the project is **automatically made a member of the new markings**. Project constraints can be set too; new markings are automatically allowed, and can't be listed as prohibited ([03-03](../03-discretionary-controls-propagation-and-diagnosis/03-project-constraints.md)).

**[Docs]** Every project uses a template. The default one creates an empty project with the creator as Owner. With several templates in a space, the creator picks.

**[Recommendation]** A template is the only place the docs offer to make the three-group pattern **mandatory** rather than a convention. Put the convention there once, and new projects can't skip it.

## For Kestrel

**[Example]** Kestrel's projects ([Ontology 02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout)) already follow the chain. What this note settles, all *adopted* in Phase 7 ([11-01](../11-kestrel-case/01-kestrels-access-model-built-out.md)):

- **A `kestrel-standard` project template** for the `kestrel` space: variables `project name`; creates `<project name>-viewers`, `-editors`, `-owners` with the owners group managing the other two; default role **Discoverer** (so projects are findable and requestable, not readable); creator gets Owner. `Kestrel Pay [Datasource]` uses a second template, `kestrel-pay`, that also applies the existing `Kestrel Pay – Financial` marking at project level and the *allowed markings* constraint from [03-03](../03-discretionary-controls-propagation-and-diagnosis/03-project-constraints.md#for-kestrel). `Payments [Ontology]` uses `kestrel-standard` plus the same constraint, **without** the project marking: [Ontology 02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout) keeps that project unmarked so the object types' existence stays visible, and its datasets carry the marking by inheritance.
- **Folder and file role grants off** on every project (the default), so no one can quietly share one dataset out of `Payments [Ontology]` by link.
- **A `Merger` custom role** for Priya's senior pipeline developers, in a Kestrel copy of *Project defaults* applied to the `kestrel` space, so merging to protected branches in Code Repositories doesn't require making people Editors on the whole project. *Considered, not adopted* for the shared Northwind space: its roles would have to be visible to Northwind, and the joint project has no protected branches.
- **Daniel is not an admin** ([17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md)): he is Editor on `Commerce [Ontology]` and `Delivery Desk [Workflow]` through the `-editors` groups, has **no role** on the payments projects (the portal reads `Shipment` only, [DevTools 09-01](../../DevTools/09-kestrel-case/01-customer-portal-built-out.md)), and holds no organization administrator permission. The full matrix is built in [11-01](../11-kestrel-case/01-kestrels-access-model-built-out.md).

---
[Module index](README.md) · Previous: [01 — Organizations, spaces and enrollments](01-organizations-spaces-and-enrollments.md) · Next: [03 — Users, groups and Portfolios](03-users-groups-and-portfolios.md)
