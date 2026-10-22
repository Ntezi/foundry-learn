# 04 — Use Cases [Sunset]

*Sources: [Use Cases overview](https://www.palantir.com/docs/foundry/use-cases/use-case-overview/) · [Navigation](https://www.palantir.com/docs/foundry/use-cases/navigation/) · [Getting started](https://www.palantir.com/docs/foundry/use-cases/getting-started/) · [Migrate an existing Project](https://www.palantir.com/docs/foundry/use-cases/migrate-existing-project/) · [View resources](https://www.palantir.com/docs/foundry/use-cases/view-resources/) · [Add application resources](https://www.palantir.com/docs/foundry/use-cases/add-application-resources/) · [Edit metadata](https://www.palantir.com/docs/foundry/use-cases/edit-metadata/) · [Permission a use case](https://www.palantir.com/docs/foundry/use-cases/permission-use-case/) · checked October 21, 2026 · Ready for Review*

**[Docs]** Use Cases is in **sunset**: fully supported for now, deprecated at a future date. The docs recommend **Portfolios** for organizing projects instead. This note is short on purpose: enough to recognize and maintain an existing use case, and to know what replaces it.

**[Concept]** A use case is a **view over one backing project**. It puts the project's apps next to the Ontology resources they use, so a builder responsible for a workflow sees it in one place. It works best on a **workflow** project in the recommended project structure.

| Page | Shows |
|---|---|
| **Overview** | Description, status, owners, the last three apps edited, object and action types, backing data |
| **Applications** | Workshop modules, Slate documents and Quiver analyses in the project; per app, the object types it uses and other apps using them |
| **Object types** / **Action types** | Types used by the apps (added automatically) or added by hand. A **Local** tag means the type's datasources are in this project; a warning appears if a local type is also used elsewhere, recommending a shared Ontology project |
| **Backing data** | Input datasources per object type, and any writeback dataset |
| **Other resources** | Everything else in the project |

**[Docs]** Working with one:

- **Create** from the Use Cases home page with a new backing project, or from a project's *Actions → Create use case* to migrate an existing one.
- **Add apps** from the use case (Workshop, Slate or Quiver). Saving the app adds it and its Ontology references.
- **Metadata**: name, description, Markdown **documentation** (stored on the backing project's cover page), a **technical owner** (the creator by default) and a **business owner** (none by default), users or groups, and a status: **Active**, **Experimental** or **Deprecated**. Setting a use case to Active while its types are Experimental or Deprecated shows a warning.
- A breadcrumb in Ontology Manager and apps leads back to the use case; *Switch to Project view* goes to the project.

**[Docs]** Permissions cover **only the metadata**: *Use Case Owner* (manage permissions and edit metadata) and *Use Case Editor* (edit metadata). Metadata is visible to everyone in the organization, even people who can't see the resources. Resources keep their own and their project's permissions.

**[Docs]** The metadata page echoes the planning advice in Automate ([08-01](../08-automate/01-automate-concepts.md)): record the data the use case needs, the stakeholders affected, access boundaries, review points and retention expectations, so future builders keep to its purpose.

**[Explanation]** Kestrel doesn't use Use Cases. Its `Delivery Desk [Workflow]` project already plays the workflow-project role ([Ontology 02-04](../../Ontology/02-foundry-data-foundations/04-projects-spaces-and-markings.md)). The record-keeping the metadata page asks for belongs in the project's own documentation, which outlives the sunset. The docs' replacement for organizing projects is **Portfolios**; Whether Kestrel's three projects (`Commerce [Ontology]`, `Payments [Ontology]`, `Delivery Desk [Workflow]`) belong in one is listed as an open item in [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md#9-known-gaps-in-the-example).

---
[Module index](README.md) · Previous: [03 — Solution Designer and Workflow Builder](03-solution-designer-and-workflow-builder.md) · Next module: [11 — Kestrel case](../11-kestrel-case/README.md)
