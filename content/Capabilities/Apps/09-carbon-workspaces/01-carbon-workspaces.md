# 01 — Carbon workspaces

*Sources: [Carbon overview](https://www.palantir.com/docs/foundry/carbon/overview/) · [Getting started](https://www.palantir.com/docs/foundry/carbon/getting-started/) · [Example workspaces](https://www.palantir.com/docs/foundry/carbon/example-workspaces/) · [Workspaces](https://www.palantir.com/docs/foundry/carbon/workspaces-overview/) · [Create a workspace](https://www.palantir.com/docs/foundry/carbon/workspaces-create/) · [Edit a workspace](https://www.palantir.com/docs/foundry/carbon/workspaces-edit/) · [Workspace updates](https://www.palantir.com/docs/foundry/carbon/workspaces-updates/) · [Version history](https://www.palantir.com/docs/foundry/carbon/workspaces-history/) · [Carbon in Marketplace](https://www.palantir.com/docs/foundry/carbon/marketplace-carbon-workspace/) · checked October 21, 2026 · Ready for Review*

**[Concept]** Carbon doesn't build apps; it **packages** them. A Carbon workspace is a curated Foundry for one group of users: their own home page, a menu bar of the modules they use daily, and optionally no way out to the rest of the platform. [Ontology 10-01](../../Ontology/10-applications/01-choosing-an-ontology-aware-app.md) describes it as the layer that combines apps that already exist.

**[Docs]** The docs' example: an aircraft-maintenance workspace with a Workshop list of parts needing maintenance, actions to triage them, a module to investigate each part, and a Quiver analysis of trends. Carbon is aimed at less technical users who carry out critical operational workflows.

| Part | What it is | Note |
|---|---|---|
| **Home page** | Logo, subtitle, Ontology-aware **search bar**, and three columns (A, B, C) of featured items; or any module as the home page | [03](03-configuration-and-permissions.md#home) |
| **Menu bar** | Navigation Menu (workspaces and external links), **anchored** module tabs, a **+** for new-tab modules, notifications and user utilities | [03](03-configuration-and-permissions.md#menu-bar) |
| **Modules** | Parameterized apps that open in Carbon **tabs**: Workshop, Object View, Object Explorer, Quiver dashboards, Vertex, Slate, Notepad (read-only), Search | [02](02-modules-and-navigation.md) |
| **Discoverable modules** | Modules offered in Object Explorer's **Open in** menu | [02](02-modules-and-navigation.md#open-in-discoverable-modules) |

**[Docs]** A workspace is a **file** in a project, with its own permissions. **Promoted** workspaces (set per organization) appear in the Navigation Menu for every member and guest who can view them; others are reachable by link or from the project.

## Creating and editing

**[Docs]** Open Carbon workspaces from the Applications Portal and select **Edit** in the menu bar; users without a default workspace can go to `workspace/carbon/edit`. **Create workspace**, name it, choose a location. A new workspace starts with a default home page: icon, search bar, prominent object types (column B) and saved explorations (column C).

**[Docs]** The editing sidebar has four tabs: **General**, **Home**, **Menu**, **Access**. Two rules:

- **Saving publishes immediately**: there's no draft-then-publish step. *Discard* drops unsaved changes.
- **Version history** lists saved versions; you can preview one, edit it and republish it to return to a known working configuration. An asterisk marks unsaved edits.

**[Docs]** Workspaces can also be edited as **YAML** ([03](03-configuration-and-permissions.md#yaml)).

**[Recommendation]** Store the workspace in the **same folder as the modules it shows**, as the docs suggest, so one set of folder permissions covers both. The docs are explicit that access to a workspace isn't access to what's in it ([03](03-configuration-and-permissions.md#who-can-do-what)).

## Telling users what changed

**[Docs]** **Workspace updates** are walkthrough pages (title, description, media, documentation) shown to users the first time they land after an update. They're saved in their own dialog, separate from the workspace configuration. Users who skip them can reread all updates in the **What's New** sidebar. Old updates can be archived and restored, or deleted permanently.

## Marketplace

**[Docs]** Workspaces can be packaged, except for:

- walkthroughs (not yet);
- module types other than Workshop, object type, or *Link to Foundry Application*;
- groups as default search object types;
- the *Select objects* item type.

## Kestrel: a Delivery Desk workspace

**[Example]** Kestrel's workspace for Ama's team, the *one home page* from [Ontology 10-01](../../Ontology/10-applications/01-choosing-an-ontology-aware-app.md):

| Setting | Value |
|---|---|
| Location | `Delivery Desk [Workflow]`, next to the queue module |
| Anchored modules | The **Delivery Desk queue** (Workshop); Object Explorer on open `Order`s |
| New-tab modules | Order and Customer object views; a saved exploration of late `Shipment`s |
| Search | Restricted to `Order`, `Shipment`, `Customer` |
| Home columns | A: those three object types; B: all menu bar items; C: the agent's favourite objects |
| Default workspace | The CS agents group; promoted by a user experience administrator |

Adopted October 21, 2026 ([Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md#8-applications); built out in [11-03](../11-kestrel-case/03-delivery-desk-workspace.md)). Navigation and permissions for it are in [02](02-modules-and-navigation.md#kestrel-keeping-agents-in-the-workspace) and [03](03-configuration-and-permissions.md#kestrel-who-lands-where).

---
[Module index](README.md) · Next: [02 — Modules and navigation](02-modules-and-navigation.md)
