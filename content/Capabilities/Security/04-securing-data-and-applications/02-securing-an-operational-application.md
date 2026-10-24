# 02 — Securing an operational application

*Sources: [Securing an operational application](https://www.palantir.com/docs/foundry/security/securing-a-business-application/) (the sidebar lists it as *Securing a business application*) · checked October 23, 2026 · Ready for Review*

A **design review** of the docs' *Flight Alert Inbox*: five decisions the page makes, each with the rule behind it and the Kestrel equivalent. Together they are the answer to the exam's favourite distinction, *resource access vs data access*, as it plays out from dataset to object to app.

## Decision 1 — Object data is protected by the backing dataset

**[Docs]** Four object types (Flight, Flight Alert, Delay, Aircraft) are created from the transformed datasets; each column becomes a property, each row an object. So "the data inside an object type will be protected by the permissions of the backing datasets". A member of *Aviation [Ontology] - Viewer* sees Aircraft data because that group has Viewer on `/Sky Industries/Aviation [Ontology]/aircraft`.

**[Docs]** Adding one user to *Aviation [Ontology] - Viewer* gives them the data of **all four** types. Writeback datasets go in the **same ontology project** as the backing dataset "so that the permissions on the object are uniform"; edits are made through **Actions**, callable from APIs too.

**[Explanation]** This is why Kestrel's `Commerce [Ontology]` holds the datasets **and** the object types ([Ontology 02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout)): one group, one project, uniform data access. The subtlety is in [Ontology 12-01](../../Ontology/12-security-and-governance/01-two-layer-permission-model.md): the page says *data* permissions come from the dataset; it says nothing yet about who may change the *type*.

## Decision 2 — Editing the type is a project role, nothing more

**[Docs]** Who may edit an object, link or action type is "determined by who has access to the relevant project in the Compass filesystem". To edit the Flight Alert type, a user "simply needs the appropriate role on the project that contains it; no additional permissions or roles are required". And the reverse: a role on an object type "only gives them permissions on the object type definition and its metadata and does not grant any permission on the data itself".

| Want to… | Needs |
|---|---|
| See Aircraft objects | A role on the project holding the backing **dataset** (plus any markings on it) |
| Change the Aircraft type's properties | A role on the project holding the **type** |
| Both | Both, which in the recommended layout is the same project |

**[Explanation]** The two layers come apart when types and datasets live in different projects, which is exactly the case Ontology [12-02](../../Ontology/12-security-and-governance/02-ontology-resource-permissions.md) handles. The page's advice, by keeping them together, makes the question not arise.

## Decision 3 — Rows need a restricted view or an object security policy

**[Docs]** Passenger data arrives, and compliance wants users to see only passengers in their own country. A dataset-backed type's permissions "are tied to the dataset as a whole", so row-level access needs the type backed by a **restricted view** ([03-02](../03-discretionary-controls-propagation-and-diagnosis/02-restricted-views.md)) **or** an **object security policy** (Ontology Manager, *Security* tab). The example builds a restricted view in a new *Customer Information [Restricted]* project with the policy:

- the user's `location:country` attribute equals the `country` column, **OR**
- the user is in `passenger-data-global-access`.

The Passenger type then "will automatically inherit the Restricted View policy". The page repeats the no-NOT rule from [02-02](../02-markings-and-mandatory-controls/02-granular-policies.md#what-a-policy-can-compare).

**[Explanation]** Note the shape of the OR: an attribute rule for the common case and a **group** rule for the exception. That is the pattern Kestrel's regional policy should follow for operations leads who need every region ([Ontology 12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md)); a lead is a member of a global-access group, not a user with a special region value.

## Decision 4 — The app gets its own project

**[Docs]** To separate "who can edit the Flight Alert Inbox application from those who can edit the ontology data", the Workshop module lives in a new project, *Flight Alert Inbox*. With no markings on it, access needs a role and membership of the Sky Industries organization.

## Decision 5 — Three audiences, two group memberships each

**[Docs]**

| Audience | Ontology project group | App project group |
|---|---|---|
| Operational consumers | *Aviation [Ontology] - Viewer* (see the five types' data) | *Flight Alert Inbox - Viewer* |
| Application developers | *Aviation [Ontology] - Viewer* | *Flight Alert Inbox - Editor* |
| Pipeline developers | *Aviation [Ontology] - Editor* (edit the datasets) | *Flight Alert Inbox - Viewer* ("to view the workflow downstream of their changes") |

**[Explanation]** Read the table as least privilege by construction. Application developers can change the app but not the data it shows; pipeline developers can change the data but not the app; consumers change neither. Nobody is an Owner of anything in the table, because ownership is a maintenance role, not an audience.

## For Kestrel

**[Example]** Kestrel's version of the table, from [17-02 §8](../../Ontology/17-case-studies/02-kestrel-reference-model.md#8-applications) and the groups proposed in [01-02](../01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#for-kestrel), all *adopted* in Phase 7 ([11-01](../11-kestrel-case/01-kestrels-access-model-built-out.md)):

| Audience | `Commerce [Ontology]` | `Delivery Desk [Workflow]` | `Payments [Ontology]` |
|---|---|---|---|
| CS agents (Ama's team) | `-viewers` | `-viewers` | — |
| Kofi's warehouse staff | `-viewers` (regional policy filters rows) | `-viewers` | — |
| Daniel (application developer) | `-editors` | `-editors` | — |
| Priya (pipeline developer) | `-editors` | `-viewers` | — |
| Lena's finance team | `-viewers` | — | `-viewers` |
| Tomás (fraud) | `-viewers` | — | `-viewers` |
| Kestrel Pay engineers | — | — | `-editors` |

Two things the page settles for Kestrel: the Delivery Desk's **writeback datasets** stay in `Commerce [Ontology]` beside the backing datasets, not in the workflow project; and the Delivery Desk agent's configuration lives in `Delivery Desk [Workflow]` ([Ontology 02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout)), which the page's Decision 4 supports: the people who may change the agent are the app's editors, not the data's.

---
[Module index](README.md) · Previous: [01 — Securing a data foundation](01-securing-a-data-foundation.md) · Next: [03 — Protecting sensitive data and requesting justification](03-protecting-sensitive-data-and-requesting-justification.md)
