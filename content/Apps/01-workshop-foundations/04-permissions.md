# 04 — Permissions

*Sources: [Permissions in Workshop](https://www.palantir.com/docs/foundry/workshop/concepts-permissions/) · [Getting started](https://www.palantir.com/docs/foundry/workshop/getting-started/) · [Embed Workshop modules](https://www.palantir.com/docs/foundry/workshop/embedding-workshop-modules-overview/) · [Use Actions in Workshop](https://www.palantir.com/docs/foundry/workshop/actions-use/) · checked October 18, 2026 · Ready for Review*

**[Concept]** Being allowed to **open** a module and being allowed to **use** what is inside it are separate checks. Most *the app is broken for her* reports are the second check failing while the first passes.

## The layers

| Layer | What it controls | Who sets it | Default |
|---|---|---|---|
| **The module** | Open (Viewer) or edit (Editor) the module | Roles on the module, usually inherited from its project or folder | **[Docs]** A new module "will inherit the permission of the Project or folder in which it is created"; Viewer to open, Editor to edit |
| **Embedded modules** | Each child module is its own resource | Roles on the child | **[Docs]** A viewer who can't see a child gets a "failed to load module" error in that spot |
| **Data** | Which objects and properties show | Object type permissions, restricted views, object and property security policies | **[Docs]** "Widgets can never display data the user is not authorized to read" |
| **Actions** | Who can submit each action type | Action type permissions and submission criteria | Set on the action type ([Ontology 08](../../Ontology/08-actions/README.md)) |
| **Functions** | Who can run function-backed variables and columns | Function permissions | See [Ontology 09](../../Ontology/09-functions/README.md) |
| **Building action types** | Creating or editing action types (not using them) | Membership of `actions-admins` | **[Docs]** Applying an existing action in Workshop doesn't need it |

**[Docs]** The module role also requires the user to meet the module's **Organization** and **Marking** requirements.

## What row and column controls don't cover

**[Docs]** Restricted views and object and property security policies "filter what a user can see in a Workshop module". They "do not extend to widget exports, Action writes, or downstream functions". To protect data after it leaves the screen, pair them with a **marking** or classification-based access control.

**[Example]** Kofi opens the Delivery Desk queue and sees only his region's shipments ([Ontology 10-03](../../Ontology/10-applications/03-workshop-and-slate.md)). If he exports the shipments table, the region filter doesn't travel with the file, and a function he triggers isn't limited by what his screen showed. The full Kestrel reasoning is in [Ontology 12-04](../../Ontology/12-security-and-governance/04-security-across-actions-functions-and-apis.md).

## Diagnosing *it doesn't work for her*

**[Docs]** The **Check access** panel in the sidebar shows, for one user, whether they meet the module's requirements and what else they need for its object types, link types, action types and functions.

**[Recommendation]** Read the symptom first, then check the matching layer:

| Symptom | Likely layer |
|---|---|
| Can't open the module at all | Module role, organization or marking |
| Module opens, one panel says *failed to load module* | Role on that **embedded** module |
| Table is empty or missing rows for her, full for others | Data: object security or restricted view |
| Column blank for her only | Property security policy |
| Action button fails, or the form refuses to submit | Action type permissions or submission criteria |
| A metric or function column errors | Function permission, or the function's own inputs |

---
[Module index](README.md) · Previous: [03 — Variables and interfaces](03-variables-and-interfaces.md) · Next: [05 — Design best practices](05-design-best-practices.md)
