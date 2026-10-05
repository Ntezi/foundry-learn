# 02 — Ontology resource permissions

*Sources: [Ontology permissions](https://www.palantir.com/docs/foundry/object-permissioning/ontology-permissions/) · [Legacy Ontology permissions](https://www.palantir.com/docs/foundry/object-permissioning/ontology-permissions-legacy/) · [Migrate to project-based permissions](https://www.palantir.com/docs/foundry/ontology-manager/migrate-to-project-based-permissions/) · [Ontology roles migration (legacy)](https://www.palantir.com/docs/foundry/ontology-manager/ontology-roles-migration/) · checked October 2, 2026 · Ready for Review*

This note covers the **schema** layer from [01](01-two-layer-permission-model.md): who can view, edit and manage object types, link types, action types, interfaces and shared properties. It has three parts: a comparison of the three models you may meet, a reference for project-based permissions, and a migration runbook.

## The three models side by side

**[Docs]**

| | **Project-based** (current) | **Ontology roles** (legacy) | **Datasource-derived** (legacy, older) |
|---|---|---|---|
| Where the resource lives | A **file in a project** in Compass | Ontology Manager only; not a project resource | Tied 1:1 to its backing datasource |
| Who can edit an object type | **Editor on the project** | **Ontology Editor** role on the type | **Editor on the datasource** *and* membership of *Ontology Administrators* |
| Granted where | Project or folder (bulk) | Per resource, or at Ontology level | Datasource |
| Roles | Project roles (Owner, Editor, Viewer, Discoverer) | Ontology Owner, Editor, Viewer, **Discoverer** (names and metadata only, no schema) | — |
| Types without a datasource | **Required**; also need an object security policy | Possible | **Impossible** (needs a backing dataset) |
| Creating security policies | **Owner of the type**, which means Owner on its project | — | **Owner on the Ontology**, then needed again for every property add or remove |
| Status | Default for **new** ontologies; not yet for **Default Ontologies** | Existing ontologies, until migrated | Existing ontologies, until migrated |

**[Docs]** In the Ontology-roles model:

- By default **every user is an Ontology Editor at the Ontology level**, so anyone can create resources.
- Only the **Owner** role granted at Ontology level is inherited by every resource.
- A creator becomes **Owner** of what they create, and everyone else becomes **Viewer**.
- The docs strongly recommend an "Ontology Governance Board" group as Ontology Owner.

**[Explanation]** That first default surprises people. Under legacy roles, "who can create object types?" starts as *everyone*. Tightening it is a deliberate setting in **Ontology configuration**.

**The earlier migration.** **[Docs]** The legacy *Ontology roles migration* page describes the step before this one: from datasource-derived permissions to Ontology roles. Roles were the default for new enrollments from **September 2023**, and are required for newer features such as shared properties and interfaces. Types could be migrated in any order, so an ontology can mix both models. Under roles, every migrated resource is **viewable by all users of the ontology**, and *Ontology Editor* edits metadata without granting anything on the data. An older ontology may therefore need two migrations: to roles, then to projects.

## Project-based permissions: the rules that matter

**[Docs]**

- **Viewing the definition:** Viewer on the type's project. Seeing the *objects* needs data access too ([01](01-two-layer-permission-model.md)).
- **Editing a link type:** edit permission on the **link type and both linked object types**.
- **Editing an action type:** edit permission on the **action type and every resource type it edits**.
- **Hiding a resource:** put a **marking** on it, or save it in a project where the user has no role.
- **Explaining access:** the **Security tab** shows the permissions needed to view and edit the type, see instances, or run actions.
- **Datasource-backed types:** the backing datasource must be **imported into the project**, or the objects won't index. You are prompted to import it when you create the type.
- **CBAC projects:** you must set a file **classification** at creation, no higher than the project maximum. Materializations fail without one.
- **Marketplace:** a product installs with the permission model **it was packaged with**. Once the source migrates, targets migrate on their next upgrade.

**[Docs]** How this connects to other notes:

- **Object Views** use the type's model: Editor on the project lets you edit them ([10-02](../10-applications/02-object-views-and-object-explorer.md#stop-5--daniel-configures-the-order-view)).
- **Interfaces:** the legacy page lists interfaces among the resources that "can be regular project resources". That suggests the "permissioned through Ontology roles" sentence in the interface overview predates the change. [RQ-20](../SOURCES.md#open-research-questions) is now partly answered.

## Migration runbook

Kestrel's ontology is new, so it starts on project permissions. An older ontology, like the one in our own course enrollment ([03-01](../03-ontology-fundamentals/01-ontologies-as-resources.md#a-story-from-our-own-enrollment)), may still be on Ontology roles. **[Explanation]** We haven't checked which model ours uses. This runbook is how you would migrate one that's still on roles.

**0. Know that it is one-way.** **[Docs]** "Once a resource has been migrated to project-based permissions, it cannot be reverted." This feature isn't available for **Default Ontologies**.

**1. Turn it on for new resources.** **[Docs]** In **Ontology configuration**, set **Require new ontology resources be saved in a project**. From then on, creators are asked for a save location.

**2. Fix names first.** **[Docs]** Resource names must follow Compass conventions:

- no `/`;
- unique names (duplicates get "(1)" appended);
- saved in a project in the **same space** as the ontology.

**3. Choose a layout.** **[Docs]** The docs offer three:

| Approach | Good for | Risk |
|---|---|---|
| **Next to the datasources or use case** | The same people control the type and its data | Core types scattered across use-case projects |
| **Dedicated Ontology projects** | Broad read access to the schema | Two places to grant for every use case |
| **Hybrid**: core types in one widely viewable project, use-case types in use-case projects | Keeps pickers and search tidy | Needs a rule for what counts as "core" |

**[Recommendation]** Kestrel uses the **hybrid** layout from [02-04](../02-foundry-data-foundations/04-projects-spaces-and-markings.md#kestrels-layout):

- `Commerce [Ontology]`: the core types (Customer, Order, Product, Shipment, Warehouse), plus the `Case` and `Location` interfaces. All staff are Viewers.
- `Payments [Ontology]`: Payment, Refund, Chargeback and Fraud Case. Only Kestrel Pay groups have roles, and the backing datasets carry `Kestrel Pay – Financial`.
- `Delivery Desk [Workflow]`: Delivery Desk's apps, plus its own actions and helper types.

**4. Check Marketplace consequences.** **[Docs]** Before migration, Marketplace installs put Ontology resources in a system **Ontology service project**, where *every user has a default Viewer grant* and there are no classifications. After migration, they install **into the chosen target project**, with that project's grants and markings. **[Explanation]** Some installed types will therefore become **less visible** after migration. The docs' fix is to split the product into two: Ontology resources go into a permissive project, and everything else into a restricted one.

**5. Migrate.** **[Docs]** Use the **migration assistant**: *Ontology configuration → Migrations → Proceed to migration*. Strong suggestions are preselected; weak ones are left for you to review. Create any imports it needs before finalizing. Alternatively, bulk-migrate from a resource list, or migrate one resource from its *Actions* menu.

**6. Verify.** **[Explanation]** For a sample of users in each persona, check the type's Security tab and the Check access panel. Remember that the migration **didn't change data access** ([01](01-two-layer-permission-model.md)).

---
[Module index](README.md) · Previous: [01 — The two-layer permission model](01-two-layer-permission-model.md) · Next: [03 — Object and property security](03-object-and-property-security.md)
