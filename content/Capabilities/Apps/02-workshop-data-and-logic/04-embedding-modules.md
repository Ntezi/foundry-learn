# 04 — Embedding modules

*Sources: [Embed Workshop modules](https://www.palantir.com/docs/foundry/workshop/embedding-workshop-modules-overview/) · [Embedded Module widget](https://www.palantir.com/docs/foundry/workshop/embedded-modules/) · [Loop layouts](https://www.palantir.com/docs/foundry/workshop/loop-layouts/) · [Variable-backed layouts](https://www.palantir.com/docs/foundry/workshop/variable-backed-layouts/) · [Module interface](https://www.palantir.com/docs/foundry/workshop/module-interface/) · checked October 18, 2026 · Ready for Review*

**[Concept]** Embedding is how Workshop does components. A **child** module is built once and placed inside **parent** modules, either once (the **Embedded Module** widget) or once per object or array entry (a **loop layout**). The child's **module interface** is its API: the variables a parent can map, and a URL can set.

## Why embed

**[Docs]** Five reasons:

| Reason | Example |
|---|---|
| Reuse across modules | A configured object view, a complex widget, or variable logic with no widgets at all |
| Reuse within a module | A card per object, a block repeated on every tab |
| Maintainability | Split a large module; each child has its own variable scope and can be edited by a different builder at the same time |
| Marketplace customization | The child is packaged as a dependency; at install, a module with the same interface signature can replace it |
| In-place replacement | A parent whose only widget is an embedded module: swap the child to ship a new implementation without moving users to a new resource |

**[Example]** Kestrel builds an **Order panel** child module (interface variable `order`, an object set) and embeds it in two places: the Delivery Desk queue's right-hand section, mapped to `selectedOrder`, and Kofi's re-route review page ([AIP 05-02](../../AIP/05-chatbot-studio/02-commands-as-tools.md)). That page lists `RerouteProposal`s, not orders, so it first needs a variable for the order behind the selected proposal (proposal → shipment → order) to map to `order`. A fix to the panel ships to both when the child is published.

## The module interface

**[Docs]** To put a variable on the interface: open its **Settings**, give it an **external ID**, and switch on **module interface**. A display name and description are optional and show when the module is embedded or opened by an event.

**[Docs]** The same interface serves three entry points:

1. **Embedding**: the parent maps its variables to the child's interface variables.
2. **The *Open Workshop module* event**: maps current values to the target module's interface and builds the URL for you.
3. **A hand-built URL**: the view-mode URL plus `?externalId=value`, joined with `&`. Values are read **once, on first load**; changing the URL later does nothing. Replace `/latest/` with `/dev/` to open the last **saved** version instead of the last **published** one.

**[Docs]** Carbon tabs can also set interface variables; their external IDs need the prefix `variable.`, and Carbon passes object set filter variables between Workshop tabs ([module 09](../09-carbon-workspaces/README.md)).

**[Explanation]** Two things are both called "interface". An **ontology interface** is a shared shape across object types ([01-03](../01-workshop-foundations/03-variables-and-interfaces.md#interfaces-one-widget-for-several-object-types)). The **module interface** is a module's inputs and outputs.

## How mapped variables behave

**[Docs]** When a parent maps a variable to a child's interface variable, Workshop uses the **parent's** definition and ignores the child's. So the child's default value, function backing or transformation for that variable is not used, and *Reset* returns it to the parent's default. The **published** version of the child is always the one embedded.

**[Docs] A conflict to check.** The two pages describe changes made inside the child differently:

- The *Embedded Module widget* page: "Any change to a variable value in either the child or parent module … will be reflected in all modules where the variable is mapped."
- The *Embed Workshop modules* overview: variables updated inside a child "do not automatically propagate back to the parent module"; you must configure a *Set variable* event in the child that targets the parent's variable through the interface.

Logged as [RQ-01](../SOURCES.md#open-research-questions). **[Recommendation]** Until it is settled, have the child write shared state with an explicit *Set variable value* event on the mapped interface variable. That works under either reading.

## Limits of embedding

**[Docs]**

- **No inherited module settings.** Routing, state saving and auto-refresh configured on the child are ignored. Configure them on the parent and pass values down. For a child that must auto-refresh inside a parent that doesn't, embed it with the **iframe** widget instead (add `embedded=true` to the URL to hide the Foundry sidebar).
- **No event passing.** A child can't call an event defined in the parent (such as opening the parent's overlay). Pass the variable that backs that layout state through the interface instead.
- **Permissions.** The child is its own resource; a viewer without access sees "failed to load module".
- **Self-reference** is blocked by default; enabling it risks infinite recursion.
- **Map hover cards** may miss derived properties defined in a child; copy them to the parent.
- **Lineage**: embedded modules aren't reported by Data Lineage.
- **Mobile**: in mobile mode, only mobile modules can be embedded.

**[Docs]** **Performance**: a child initialises only when shown, so embedding usually speeds up the first load. Several levels of embedding all visible at once load one after another (a "waterfall"). When editing, opening every embedded module's tab slows the rest of the session; open a child directly instead.

## Loop layouts

**[Docs]** A loop layout repeats a child module for each object in an object set or each entry in an array (string, Boolean, number, date, timestamp or struct). Each instance has its own variable scope and layout state.

| Setting | Options |
|---|---|
| Source | An object set (sortable by property; a primary key sort is added behind yours, so an unsortable key can break the layout) or an array (ordered by position) |
| Paging | **Limit** (one page, up to *Max items to display*) or **Paged** (pages of *Max items per page*); either way, only the first **10,000** objects |
| Display | **List**, or **Grid** with max columns and min card width |
| Performance | **Delay loading items until shown** |
| Child | Must have an interface variable of the right type: an object set for object loops, the array's element type for array loops. *Create new* builds one for you |

**[Docs]** The per-item interface variable is the **only** thing that differs between instances; don't change it inside the child. Other mapped variables are **shared** by all instances and the parent, which is how a card can set "the selected object" for the whole page. For a custom order, return a static object set from a function.

**[Example]** A *Held orders* board for Ama's team: three loop layouts side by side, one per hold reason, each looping over the matching `ON_HOLD` orders and showing the Order panel child as a card. A shared `selectedOrder` interface variable lets any card drive the detail pane.

## Variable-backed layouts

**[Docs]** Four layout components can be driven by variables, through five settings:

| Component | Variable | How it is configured |
|---|---|---|
| **Page** shown | String matching a **Page ID** | Module settings › Pages › *Variable-backed page selection* |
| **Section** visible | Boolean; hidden when **true** by default (invertible) | Section › *Conditional Visibility* › *Hide section if* |
| **Section** collapsed | Boolean; collapsed when **true** | Section › *Collapsible* › *Variable-backed collapse state* |
| **Overlay** open | Boolean; open when **true** | Overlay › *Variable-backed open state* |
| **Tab** selected | String matching a **Tab ID**, two-way | Tab container › *Variable-backed tab selection* |

**[Docs]** With routing on, leave the page variable's default **empty**: routing supplies the first value from the URL, and a default would override it. Which layout events update these variables (pages and sections don't; tabs and overlays do) is tabled in [01-02](../01-workshop-foundations/02-layouts-widgets-and-events.md#which-events-keep-a-backing-variable-in-sync).

**[Explanation]** Variable-backed layouts plus the module interface are how a parent controls a child's layout without event passing: map the child's `$tab` or `$drawerOpen` variable, and set it from the parent.

---
[Module index](README.md) · Previous: [03 — Variable types](03-variable-types.md) · Next module: [03 — Workshop widgets](../03-workshop-widgets/README.md)
