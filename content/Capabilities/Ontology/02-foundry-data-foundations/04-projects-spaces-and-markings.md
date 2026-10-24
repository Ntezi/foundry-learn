# 04 — Projects, spaces and markings

*Sources: [Organizations and spaces](https://www.palantir.com/docs/foundry/security/orgs-and-spaces/) · [Projects and roles](https://www.palantir.com/docs/foundry/security/projects-and-roles/) · [Markings](https://www.palantir.com/docs/foundry/security/markings/) · [Access control propagation](https://www.palantir.com/docs/foundry/security/access-control-propagation/) · [Restricted views](https://www.palantir.com/docs/foundry/security/restricted-views/) · [Ontology permissions](https://www.palantir.com/docs/foundry/object-permissioning/ontology-permissions/) · [Ontologies overview](https://www.palantir.com/docs/foundry/ontologies/ontologies-overview/) · [Projects and resources](https://www.palantir.com/docs/foundry/getting-started/projects-and-resources/) · [Securing a data foundation](https://www.palantir.com/docs/foundry/security/securing-a-data-foundation/) · checked October 2, 2026 · Ready for Review*

## Key facts
- **[Docs]** Foundry's containers, from outside in:

  | Container | What it is |
  |---|---|
  | **Organization** | A strict silo of users and resources |
  | **Space** | A container of projects with **one ontology** |
  | **Project** | The main boundary for **role grants** |
  | **Folder** | Structure inside a project |
  | **Resource** | Anything with a **RID** (resource identifier) |

- **[Docs]** There are two families of control:

  | Family | Controls | Propagation |
  |---|---|---|
  | **Discretionary** | Roles (Owner > Editor > Viewer > Discoverer), restricted views, object and property security policies | Filter what you can read; **don't travel** with data after the read |
  | **Mandatory** | Markings, classifications (CBAC), organizations | **Do travel** with data through derivation |

- **[Docs]** Markings are **conjunctive**: you must hold every marking on a resource. They are all-or-nothing, and they inherit along the **file hierarchy** and along **data dependencies**. Even an Owner can't remove one without the marking's *Expand Access* permission.
- **[Docs]** For the Ontology, under **project-based permissions**:
  - object types are files saved in a project, and your **project role** decides whether you can view or edit the type;
  - to see the **objects**, you also need **data access**: either view access on the backing datasource, or object and property security policies.
- **[Recommendation]** Use mandatory controls for anything that must stay protected downstream, and discretionary controls for read-time filtering. Payment data at Kestrel gets both.

## Why containers and controls matter
**[Concept]** An Ontology joins data from many teams into one model. Without clear containers and controls, you face two bad options:

- lock everything down, so nobody can use the shared model; or
- open everything up, so a finance-only fact leaks into a warehouse dashboard.

Foundry's containers and controls let one Ontology serve many audiences safely. You only need to understand where each control applies and where it stops.

## Two kinds of access control
**[Concept]**
- **Discretionary access control (DAC):** owners grant access to others, as with file permissions.
- **Mandatory access control (MAC):** a central authority sets eligibility, and owners can't override it, as with security clearances.
- **Read-time filtering vs propagation:** a filter decides what you may *read*. Propagation decides whether the restriction **follows** the data into everything derived from it.

## How Foundry organizes access

### The containers
**[Docs]**

| Container | Definition and rules |
|---|---|
| **Organization** | "Strict access requirements" that silo users and resources. Every user belongs to **one** organization and may be a guest in others. Organizations protect spaces, ontologies, projects, users, groups, tag categories and collections, but individual resources can't be tied to an organization. They are inherited through the file hierarchy and direct dependencies |
| **Space** | "A high-level container of projects, with one common ontology", restricted to one or more organizations. Most organizations need **one**. The space is the first element of a resource path: `space/project/folder/file`. Formerly called *namespaces* |
| **Project** | "The primary way to organize work" and the main boundary for discretionary role grants. Work and its outputs live in the same project. To build on another project's data, add a **reference** (usually Viewer on the source and Editor on the destination). You need Editor or Owner on a space to create a project in it |
| **Resource** | Any file-like item (dataset, repository, app, object type…) with a unique **RID**. Every user also has a personal project, where new resources land by default |

**[Docs]** Ontologies and spaces:
- An ontology maps **1:1** with a space and is created with it, carrying the same name and organization markings.
- A **private** space gives a private ontology, for one organization. A **shared** space gives a shared ontology, for several organizations.
- Several teams sharing one private ontology is normal: "Working with other teams is not a reason to create a second ontology". Use project roles instead.
- A shared ontology doesn't by itself make data visible across organizations. Referenced datasets keep their origin organization's requirements until a developer removes them.

### Roles
**[Docs]**
- **The defaults:** Owner > Editor > Viewer > Discoverer. A role can grant the same role or a lower one.
- **Customization:** role sets can be customized, and then a higher role need not include every operation of a lower one.
- **Inheritance:** role grants **inherit to child resources**. Grant roles to **groups** at the **project** level.
- **Folder and file grants:** these are **disabled by default**. Space administrators can change the default, and project Owners can toggle it per project. Disabling them also removes existing resource-level grants and link sharing.
- **Mandatory controls win:** they "will always prevent an ineligible user from accessing a resource, regardless of the user's role".
- **Scope:** roles govern the resource itself, not data after it has been read.

### Markings
**[Docs]**
- **Definition:** markings apply to files, folders and projects, and are managed centrally, for example by data protection officers.
- **Access:** a user must be a member of **all** markings on a resource (Boolean AND). Access is binary.
- **Inheritance:**

  | Path | Effect |
  |---|---|
  | **File hierarchy** | A marked project or folder marks everything inside it |
  | **Data dependency** | Anything derived from marked data inherits the marking (a *data marking*). A user might see that a derived dataset exists and read its metadata, but not its data |

- **Applying and removing:** applying a marking is a **sensitive action**, because downstream users can be locked out immediately. Removal is sensitive too. It can be done where the marking was applied (cascading downstream), or inside a transform (along that dependency chain only).
- **Purpose:** markings restrict access; they shouldn't be used to *provision* it. Eligibility for a marking doesn't grant access; project roles still do.
- **Common patterns:**
  - one marking per sensitive data category;
  - one per data owner;
  - separate markings per pipeline stage (for example *Raw Data*);
  - markings to hide that a resource exists at all.

### Restricted views
**[Docs]**
- **What they do:** a restricted view filters the **rows** of a backing dataset with a granular policy that compares user attributes with column values. Groups, users and organizations are referenced by **UUID**.
- **Ontology:** it can **back an object type**, so each user sees only the objects whose rows they may see.
- **Limits:** it can't be an input to transforms. Avoid `NOT` conditions on group, marking or organization membership, because scoped tokens can make them grant too much.
- **Read-time only:** the policy "does not extend to functions, actions, AIP Logic, OSDK responses, writeback operations, or exports".

### Propagation: where discretionary controls stop
**[Docs]** From *Access control propagation*:
- After a read, rows "carry no metadata, classification, or tag" that would re-apply the source policy.
- So these don't carry a restricted view's or object policy's protection downstream:
  - function return values;
  - action edits;
  - AIP Logic tool calls;
  - OSDK responses;
  - Pipeline Builder Ontology outputs;
  - writeback;
  - exports.
- **Guidance:**
  - Protection must extend to derived data, exports or model outputs → use a **mandatory** control.
  - Read-time filtering only → use a **discretionary** control.
  - Both → put a restricted view over a **marked** backing dataset.
- **FAQ points:**
  - Projects are containers for role grants, *not* hard boundaries; mandatory controls cross them.
  - Don't remove a marking just because a granular policy exists.

### What this means for the Ontology
**[Docs]** From *Ontology permissions*:
- **The model:** permissions to view, edit and manage Ontology resources are managed in **Compass**. Resources are saved in a project, and the project decides access. This replaces the earlier **Ontology roles** and **datasource-derived** models.
  - It is on by default for new ontologies.
  - Existing ontologies must enable it and migrate.
  - It isn't yet available for **Default Ontologies**.
- **The schema:** to see an object type, you need view permission on the object type. You **don't** need it on the datasource.
- **The objects:** to see objects, you need view on the type **plus** data access, through one of:
  - object and property security policies on the type; or
  - datasource policies, meaning view access on the backing datasource.
- **Indexing:** a datasource-backed type's datasource must be **imported into the project** for objects to index.
- **Action-only types:** object types without a datasource must be in a project and need an **object security policy**.
- **Editing links and actions:** editing a **link type** needs edit permission on the link type and on both linked object types. Editing an **action type** needs edit permission on the action type and on everything it edits.
- **Example:** `Building` saved in project A. An Editor on A can edit the type. Viewing the *Empire State Building* object needs Viewer on the type plus datasource or policy access. With only view rights on the type, you see the schema and metadata, not the data.

**[Docs]** Recommended project structure (see [02 — Pipelines](02-pipelines-that-feed-the-ontology.md)) and *Securing a data foundation* use a **Datasource → Transform → Ontology → Workflow** chain of projects. Each project has groups per role, and Discoverer is often the default role so people can find projects and request access.

## Rooms and clearances

| Familiar idea | Foundry | Difference |
|---|---|---|
| Cloud account / tenant | Organization | Also controls who can even *discover* other organizations' users and groups |
| Database or catalog | Space (plus its ontology) | One ontology per space |
| Schema-level grants | Project roles | Inherited by everything inside; grant to groups |
| Column and row security in a warehouse | Restricted views; object and property security policies | Read-time only, they don't travel with derived data |
| Data classification labels that propagate | Markings, CBAC | Enforced through lineage automatically |

**[Analogy]** Roles are **keys to rooms** (projects). Markings are **security clearances** stamped on the documents themselves: a copy carries the stamp wherever it goes.

## For agents
- **[Docs]** Agents' security scopes inherit from a human user or from a project (Architecture center). Tool calls are governed by the same security as data access.
- **[Docs]** AIP Logic tool calls and OSDK responses **don't** carry row or column policies forward (*Access control propagation*).
- **[Explanation]** If an agent may summarize or forward what it reads, protect sensitive data with **markings**, not only with row-level policies. See [16 — The Ontology as AI context](../16-ai-and-agents/01-ontology-as-ai-context.md).

## Kestrel's layout
**[Example]** Kestrel has one organization and **one space**, `kestrel`, so **one ontology**. The layout:

| Project | Holds | Groups and roles | Markings |
|---|---|---|---|
| `Storefront [Datasource]` | Raw and clean storefront data | Datasource developers: Editor | *Customer PII* on `/raw` |
| `Kestrel Pay [Datasource]` | Ledger syncs | Kestrel Pay engineers only | **`Kestrel Pay – Financial`** on the whole project |
| `Commerce [Transform]` | `customer_master`, joins | Pipeline developers: Editor | Inherited *Customer PII* |
| `Commerce [Ontology]` | Datasets **and object types** for Order, Customer, Product, Shipment | Pipeline and app developers: Editor; all staff: Viewer | Inherited where relevant |
| `Payments [Ontology]` | `Payment`, `Refund`, `Chargeback` object types and their datasets | Lena's and Tomás's groups: Viewer; Kestrel Pay engineers: Editor | None on the project itself. The backing **datasets** carry **`Kestrel Pay – Financial`**, inherited from the ledger data |
| `Delivery Desk [Workflow]` | Workshop apps, agent configs | Customer service: Viewer | — |

Effects:
- **Ama** can see that the `Payment` object type exists if she has a role on its project, because the project itself isn't marked. She can't see any payments: their backing datasets carry the marking, which she lacks. If the project itself were marked, she wouldn't even see that the type exists, because markings hide existence.
- **Open question** [RQ-17](../SOURCES.md#open-research-questions): whether an object type's own file inherits the markings of its backing datasource. These notes don't rely on it.
- **Kofi** sees `Shipment` objects for **his region only**, through a restricted view on the shipments dataset (or later an object security policy). **Update:** [12-03](../12-security-and-governance/03-object-and-property-security.md#two-families-of-mechanism) makes the object security policy Kestrel's default.
- If Daniel's function reads payments and writes a summary to an `Order` property, the **marking doesn't follow through an action edit**. That's why Kestrel avoids copying payment data onto `Order` at all.

## Advice
- **[Recommendation]** Decide the project for each object type **before** creating it. It decides who can edit the type, and the datasource must be imported into that project.
- **[Recommendation]** Use markings for categories that must never leak (payments, PII). Use restricted views or policies for "which rows a person sees".
- **[Recommendation]** Keep one ontology per space for one organization. Create a shared space only for cross-organization work.
- **[Explanation]** Changing a marking on an upstream dataset can instantly change who sees objects downstream. Treat it as a production change.

## Mistakes
- Assuming a project boundary stops data leaking. Only mandatory controls follow derived data.
- Relying on a restricted view while an action or function copies the filtered data somewhere less restricted.
- Granting roles to individuals on folders instead of to groups on projects.
- Expecting a shared ontology to expose partner data automatically.

## Caveats
- **[Docs] Inconsistency:** [Core concepts](https://www.palantir.com/docs/foundry/ontology/core-concepts/) still calls **roles** "the central permissioning model in the Ontology". [Ontology permissions](https://www.palantir.com/docs/foundry/object-permissioning/ontology-permissions/) says project-based permissions **replace** Ontology roles for new ontologies. Older or Default Ontologies may still use legacy models.
- **Open question** [RQ-03](../SOURCES.md#open-research-questions): which permission model applies in our enrollment? Our [Ontology deep dive lesson 15](../../../Tracks/Application%20Developer/02-deep-dive-creating-your-first-ontology/15-create-link-type.md) records an **Ontology Owner** role, which suggests roles are in use there.
- The full Ontology security model (object and property security policies, MDOs) is in [12 — Security and governance](../12-security-and-governance/README.md).

## Seen in our courses
- [Ontology deep dive 15 — Create a link type](../../../Tracks/Application%20Developer/02-deep-dive-creating-your-first-ontology/15-create-link-type.md) **[Observed]**: an object type created in the *default* ontology couldn't link to a type in the *Hence - INTERNAL* ontology. It was recreated in the right one. Ontologies are separate containers.
- [Intro course 18 — Security and governance](../../../Tracks/Courses/Introduction%20to%20Foundry%20&%20AIP%20for%20Enterprise%20Organizations/18-security-and-governance.md)
- Project and folder setup lessons in every course, for example [Pipeline deep dive 04](../../../Tracks/Deep%20Dive/Building%20Your%20First%20Pipeline/04-create-learning-project.md).

<!-- security-go-deeper -->
**Go deeper in the Security area:** [01 — Organizations, projects, users and groups](../../Security/01-organizations-projects-users-and-groups/README.md) · [02 — Markings and mandatory controls](../../Security/02-markings-and-mandatory-controls/README.md) · [03 — Discretionary controls, propagation and diagnosis](../../Security/03-discretionary-controls-propagation-and-diagnosis/README.md)

---
[Module index](README.md) · Previous: [03 — Virtual tables and streams](03-virtual-tables-and-streams.md) · Next: [05 — Lineage and builds](05-lineage-and-builds.md)
