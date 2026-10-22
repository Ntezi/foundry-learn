# 03 — The Delivery Desk workspace

*Sources: no new doc pages; every row links to the note that holds the docs' wording · written October 21, 2026 · Ready for Review. Everything here is **[Example]** unless a line says otherwise.*

[Ontology 10-01](../../Ontology/10-applications/01-choosing-an-ontology-aware-app.md) asked for *one home page for the Delivery Desk team* and named Carbon for it. This is that workspace: for Ama's CS agents, who should start their shift in one place and not wander into the rest of Foundry.

## What it contains

| Part | Setting | Note |
|---|---|---|
| Location | `Delivery Desk [Workflow]`, next to the modules it shows | [09-01](../09-carbon-workspaces/01-carbon-workspaces.md#creating-and-editing) |
| Anchored modules | The Delivery Desk queue; Object Explorer on open `Order`s | [09-03](../09-carbon-workspaces/03-configuration-and-permissions.md#menu-bar) |
| New-tab modules | Order and Customer object views; a saved exploration of late `Shipment`s | [09-01](../09-carbon-workspaces/01-carbon-workspaces.md#kestrel-a-delivery-desk-workspace) |
| Home | Search restricted to Order, Shipment, Customer; columns for those types, all menu items, and favourite objects | [09-03](../09-carbon-workspaces/03-configuration-and-permissions.md#home) |
| *Open in* | The queue is discoverable for `Order` sets, through its `atRiskOrders` module interface variable | [09-02](../09-carbon-workspaces/02-modules-and-navigation.md#kestrel-keeping-agents-in-the-workspace) |
| AIP Assist | Off; the Delivery Desk chatbot is already in the queue's drawer | [09-03](../09-carbon-workspaces/03-configuration-and-permissions.md#kestrel-who-lands-where) |

**[Explanation]** Untested, but it follows from how module interface variables take values from outside: making `atRiskOrders` part of the module interface has a side effect: a module opened from *Open in* receives the set the agent built, replacing the at-risk definition for that tab. That's what an agent asking *open these orders in the queue* wants, but it's a different queue from the default one, so the tab title should say so.

## Who lands there

| Setting | Value | Note |
|---|---|---|
| Visibility | **Promoted** by a user experience administrator | [09-03](../09-carbon-workspaces/03-configuration-and-permissions.md#who-can-do-what) |
| Default workspace | The CS agents group only; check that team leads aren't in two groups with different defaults, which would leave them with none | [09-03](../09-carbon-workspaces/03-configuration-and-permissions.md#where-users-land) |
| Home page URL | `/carbon` for the CS agents group in Control Panel | [09-03](../09-carbon-workspaces/03-configuration-and-permissions.md#where-users-land) |
| Leaving | Navigation out of Carbon disabled; data-integration and analysis apps removed from the CS agents group in Control Panel; notifications still show, without links that would leave | [09-02](../09-carbon-workspaces/02-modules-and-navigation.md#kestrel-keeping-agents-in-the-workspace) |
| Access to contents | Granted separately: the workspace file grants nothing on the queue, objects or chatbot | [09-03](../09-carbon-workspaces/03-configuration-and-permissions.md#who-can-do-what) |

**[Recommendation]** Promote the queue itself in **Applications Portal** as well, for team leads and Kofi, who don't use the workspace.

## Shipping and changing it

- **Saving publishes immediately**, so Daniel edits the YAML copy for review first, then applies it; version history is the rollback ([09-01](../09-carbon-workspaces/01-carbon-workspaces.md#creating-and-editing), [09-03](../09-carbon-workspaces/03-configuration-and-permissions.md#yaml)).
- In the **Marketplace** product beside the queue: Workshop and object-type modules package; walkthroughs don't yet, and default search can't use type groups ([09-01](../09-carbon-workspaces/01-carbon-workspaces.md#marketplace)).
- When the shipment timeline reached the Order panel, a one-page **workspace update** told agents what changed; agents who skipped it find it under *What's New* ([09-01](../09-carbon-workspaces/01-carbon-workspaces.md#telling-users-what-changed)).

---
[Module index](README.md) · Previous: [02 — Kofi's warehouse-floor module](02-warehouse-floor-mobile.md) · Next module: [12 — Practice](../12-practice/README.md)
