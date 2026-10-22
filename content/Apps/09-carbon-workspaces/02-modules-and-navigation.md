# 02 — Modules and navigation

*Sources: [Modules](https://www.palantir.com/docs/foundry/carbon/modules-overview/) · [Configure module discovery](https://www.palantir.com/docs/foundry/carbon/modules-discovery/) · [Navigation between modules](https://www.palantir.com/docs/foundry/carbon/modules-navigation/) · [Navigation between workspaces](https://www.palantir.com/docs/foundry/carbon/workspaces-navigation/) · [Restrict navigation out of a workspace](https://www.palantir.com/docs/foundry/carbon/restrict-workspace-nav/) · [Curating apps in Applications Portal](https://www.palantir.com/docs/foundry/app-building/curating-apps/) · checked October 21, 2026 · Ready for Review*

**[Concept]** Carbon's **navigation framework** passes an object or object set from one module to the next, each opening in a new Carbon tab. A user follows the work (this order, then its customer, then their open cases) without thinking about which app they're in. The original tab keeps its state, so one result list can branch into many object tabs.

**[Docs]** There's no limit on the number of steps, and the same module can appear several times with different inputs. Outside Carbon, the same framework opens the next app in a new **browser** tab instead.

## Module types and their inputs

**[Docs]** **Built-in** modules have fixed inputs and outputs and don't need to be made discoverable. **Dynamic** modules (Workshop, Slate, Quiver) define theirs through variables and must be made discoverable explicitly.

| Module | Input | Output | Opened from UI elements by |
|---|---|---|---|
| **Object View** (built-in) | One object of any type | The displayed object | Workshop *Open Object view* event; links in Slate |
| **Object Explorer** (built-in) | One object set | The current object set | Workshop *Open Object explorer* event; links in Slate |
| **Search** (built-in) | A keyword, from the home search bar or a shortcut | Opens the chosen item (types, explorations, lists and comparisons open as explorations) | — |
| **Workshop** | A **module interface** variable of object-set type | Any variable, through an *Open Application* event (to Workshop, Object View, Object Explorer, Notepad, Vertex) | Workshop events; links in Slate |
| **Slate** | One variable Carbon reads as an object or object set | Whatever link the user clicks: Carbon **intercepts** links to Foundry apps and opens the matching module | Only from another Slate module |
| **Quiver dashboard** | Objects or a set of the dashboard's **object type** (a constraint) | Object View from a card's pop-over | Links in Slate |

**[Docs]** Workshop details:

- Make a variable part of the module interface by giving it an **external ID**.
- In a URL from inside Carbon, prefix parameters with `param.variable.`; as a Carbon parameter, use `variable.` plus the external ID.
- Navigation doesn't support module interface variables that are **empty** object sets, NaN numbers, time series sets, geo types, **structs** or scenarios.

**[Docs]** Slate details:

- Slate variables are untyped, so Carbon types them from their **default values**; two reserved variable names are always typed as an object or an object set.
- To keep a Slate module's widget state when users switch tabs, add two events to the Slate document: save the view when Carbon asks, and send the view ID back.
- Links from an iframe nested in Slate must target the frame named `carbon-navigation-target` to open a Carbon tab.

## *Open in*: discoverable modules

**[Docs]** Object Explorer's **Open in** button lists modules a workspace makes **discoverable** (General tab), filtered to those whose constraints match the current results:

| Module | Appears for |
|---|---|
| Workshop | Explorations matching its input variable's object-type **constraint**; with no constraint, every type |
| Quiver dashboard | Explorations of the dashboard's object type |
| Slate app with a variable | Every object type |
| Vertex | Every object type |

**[Docs]** **Inside** a workspace, *Open in* shows only that workspace's discoverable modules. **Outside** Carbon, it shows the **union** across all promoted workspaces in every organization the user belongs to or is a guest of. The docs' example: Zayna sees two claim apps in the Claims workspace, one in the Actuary workspace, one in a guest organization's Flight workspace, and all four outside Carbon.

**[Docs]** To give *Open in* actions to people who never use Carbon, create a workspace just for that: put it and its modules in one project the users can view, add the modules as discoverable, and **promote** the workspace. Only promoted workspaces feed the outside-Carbon union.

## Between workspaces and out of Carbon

**[Docs]** The **Navigation Menu** lists promoted workspaces the user can view, plus external links to other Foundry apps. Only **Carbon administrators** promote, reorder or demote workspaces, per organization; the list is the same for everyone in that organization. A workspace can override the organization's external links.

**[Docs]** To keep users inside, set **Navigation out of Carbon** to *Disabled* (General tab):

- external links are hidden, but kept in the configuration;
- *Help and support* disappears;
- notifications still show, but only links that stay in Carbon work;
- the user menu still allows logout, not the account page.

Links that use the navigation framework keep working. Some module actions still lead out: open the backing dataset, explore lineage, start a Contour, Quiver or Code Workbooks analysis. Those can't be turned off per workspace; remove them with **Application access** in Control Panel for the user groups concerned.

## Applications Portal

**[Docs]** **Applications Portal** lists Foundry's platform apps and **promoted** custom apps: Workshop modules, Slate apps, Carbon workspaces and external links that an admin marks as trusted and production-ready.

- Promoting needs the **Organization administrator** or **User experience administrator** role, plus editor or owner on the app.
- A promotion has a name, icon, optional description, owner, thumbnail, **collections** (required; created in Data Catalog) and optional **tags**. Promoted apps get the purple trusted check mark.
- Users see promoted apps with at least **Discoverer** on the app and its space, limited to their organization's spaces and shared spaces. They can **pin** favourites to the sidebar.
- A promotion can be re-pointed at another resource to release a new app in a controlled way.
- Platform apps are shown or hidden per group through Control Panel's *Application access*.

**[Explanation]** Applications Portal and Carbon solve different problems: the Portal helps people **find** trusted apps across Foundry; a Carbon workspace **replaces** Foundry's navigation for one group.

## Kestrel: keeping agents in the workspace

**[Example]** For the Delivery Desk workspace ([01](01-carbon-workspaces.md#kestrel-a-delivery-desk-workspace)):

- Add the queue module as **discoverable**, with its `atRiskOrders` variable in the module interface and constrained to `Order`. An agent who builds a list of orders in Object Explorer can then **Open in → Delivery Desk queue**.
- **Disable navigation out of Carbon**, and in Control Panel remove the data-integration and analysis apps from the CS agents group, so lineage and dataset links don't lead out. Agents still see all their notifications, but a notification about, say, a shared dataset shows without a working link.
- Promote the queue in **Applications Portal** too, for team leads who don't use the workspace.

---
[Module index](README.md) · Previous: [01 — Carbon workspaces](01-carbon-workspaces.md) · Next: [03 — Configuration and permissions](03-configuration-and-permissions.md)
