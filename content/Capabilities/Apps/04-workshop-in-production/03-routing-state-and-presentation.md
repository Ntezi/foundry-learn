# 03 — Routing, state and presentation

*Sources: [Routing](https://www.palantir.com/docs/foundry/workshop/routing/) · [State saving](https://www.palantir.com/docs/foundry/workshop/state-saving/) · [Translations](https://www.palantir.com/docs/foundry/workshop/translations/) · [Used colors](https://www.palantir.com/docs/foundry/workshop/used-colors/) · [Set up a read-only dashboard](https://www.palantir.com/docs/foundry/workshop/read-only-dashboard/) · [Kiosk mode](https://www.palantir.com/docs/foundry/workshop/kiosk-mode/) · [Redact mode](https://www.palantir.com/docs/foundry/workshop/redact-mode/) · checked October 18, 2026 · Ready for Review*

Ways to share and present a module: put its state in the **URL**, let users **save** states, **translate** it, keep its **colours** consistent, and run it as a **read-only** or **kiosk** display or **redacted** for a screenshot.

## Three ways to carry state, compared

| | Module interface URL | **Routing** | **State saving** |
|---|---|---|---|
| What it stores | Interface variables in query parameters | Current **page ID** and chosen interface variables, written to the URL as users work | Chosen variables (and optionally the page) in a saved **state resource** |
| Who creates it | Builder, or the *Open Workshop module* event | Automatic once enabled | The **user**, explicitly |
| Shared as | A link | A link | A link, or saved to a folder |
| Notes | Read once on load ([02-04](../02-workshop-data-and-logic/04-embedding-modules.md#the-module-interface)) | Can't hold object set **filter** variables; object sets only as one object's RID | Supports arrays, Booleans, dates, numbers, strings, timestamps, object sets and object set filters |

## Routing

**[Docs]** Turn on *Enable routing* in the **Pages** settings. The current **page ID** goes into the URL (pages without an ID don't; users land on the default page). Interface variables can be added to the URL: when not at their default and used in the current view, **always** (when not default), or **never**. A query parameter matching an external ID always sets the initial value.

**[Docs]** If the module also uses variable-backed page selection, give that variable **no default**: a default wins over the URL, so a shared link to another page flashes it and then redirects to the default page. Routing isn't inherited by embedded modules; pass routed variables in through the child's interface.

**[Docs]** To route an unsupported type, route a supported one and derive from it: for example, a routed string variable sets the default of an object set filter variable.

**[Example]** An agent shares *look at this order* with a supervisor. With routing on and `selectedOrder` in the module interface set to *always*, the link carries the order's RID, and the supervisor's queue opens with that order selected. **[Explanation]** Untested: the Object Table makes its first row the active object on load by default ([03-01](../03-workshop-widgets/01-core-display-widgets.md#selection-and-display)), which could overwrite the value from the link. Turn on *Disable active object auto-selection* for this table, and check the behaviour before relying on shared links.

## State saving

**[Docs]** Turn on **Enable State Saving** in settings, then give each variable to save an **external ID** and enable it for state saving. Options: save the current page, a custom display name ("inbox" instead of "module state"), and where states may be saved (folder shortcuts, the user's home folder, any project). Any saved state can be made the module's **default**.

**[Docs]** States store values by **external ID**, so changing an external ID breaks old states, while keeping it lets you swap the widget behind a variable without breaking them.

**[Docs]** Requirements and limits: the module **header must be visible**; users need **platform access**; it isn't inherited by embedded modules; derived-property object sets can't be saved ([02-02](../02-workshop-data-and-logic/02-functions-and-derived-properties.md#workshop-derived-properties)). It doesn't remember anything **automatically**: per-user preferences that should just persist belong in an Ontology object.

**[Example]** Ama's team saves states called *queues*: *DHL at risk*, *Due today*. Each stores the Filter List's output variable (`orderFilters`) and the column layout array ([03-01](../03-workshop-widgets/01-core-display-widgets.md#columns)). States are saved under a shortcut to `Delivery Desk [Workflow]/Saved queues`, so they're shared, not scattered across home folders.

## Translations and colours

**[Docs]** **Translations** (*Settings › Advanced functionalities*) cover the module header title, section titles and tabs, Tabs labels, Button Group text and descriptions, Metric Card labels and descriptions, Markdown content, Object Table and Object List column titles, Pivot Table aggregation titles and Filter List section titles. Viewers see the module in their **browser's locale** when it has been translated. Translate by hand or with **AIP** (needs AIP enabled for custom workflows); new or changed strings appear under *To translate*.

**[Docs]** **Used colors** saves a module palette. Saved colours can be renamed, have light and dark variants, show where they're used, and update everywhere when edited. Intent colours aren't listed.

## Read-only dashboards, kiosk mode, redact mode

These look similar and are not:

| | **Read-only dashboard** | **Kiosk mode** | **Redact mode** |
|---|---|---|---|
| What it is | An **organization** set up so a group can only view dashboards | A long-lived, **read-only**, permission-scoped session | Visual obfuscation of the page |
| Security feature? | Yes | Yes | **No**: data still loads |
| Set up in | Control Panel (new organization, app access limited to Workshop and Slate, home page, organization assignment rules, existing users as guests) | Control Panel allowlist per organization, then the module's *Kiosk Mode* toggle | Add `?workshop_enableRedactMode=true` to the URL |
| Writes allowed | Per permissions | **None** | As normal |

**[Docs]** **Kiosk mode** details: launching shows the **content in scope** of the published version (object types, link types, functions, embedded apps). Entities in embedded **Workshop** modules are included; those inside other embedded apps aren't, so a Vertex graph or a function's Search Around can fail if the type or link isn't referenced in the module itself; add a direct reference. Object types backed by a **restricted view** aren't supported, embedded **Slate** apps are disabled, and the normal inactivity timeout still applies. Administrators can end sessions from Control Panel.

**[Docs]** **Redact mode** swaps text for an obfuscated font, stripes icons and chart areas, and hides images, canvases, video, audio and iframes. Everything else (variables, actions, data) works normally.

**[Example]** Kofi wants the Accra late-shipments board on a wall screen all day. Kiosk mode fits: read-only, long-lived. Kestrel's Shipment security is an object security policy, not a restricted view ([Ontology 12-03](../../Ontology/12-security-and-governance/03-object-and-property-security.md)), so the restricted-view limitation doesn't bite. **[Explanation]** The page doesn't say whose identity a kiosk session uses; we assume the launcher's, scoped down. Then who launches it matters: the regional policy compares the user's region with `Shipment.region`, so Kofi should launch it himself. The board then shows Accra's shipments, as on his desk. For a demo deck about the board, redact mode is the right tool, not kiosk.

---
[Module index](README.md) · Previous: [02 — Performance](02-performance.md) · Next: [04 — Cross-application interactivity](04-cross-application-interactivity.md)
