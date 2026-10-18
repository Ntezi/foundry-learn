# 02 — Performance

*Sources: [Performance Profiler](https://www.palantir.com/docs/foundry/workshop/performance-profiler/) · [Widget display optimization](https://www.palantir.com/docs/foundry/workshop/widget-display-optimization/) · [Usage metrics](https://www.palantir.com/docs/foundry/workshop/usage-metrics/) · [Auto-refresh](https://www.palantir.com/docs/foundry/workshop/auto-refresh/) · checked October 18, 2026 · Ready for Review*

Four tools, in the order you reach for them: **measure** (Profiler), **tune what loads when** (display optimization), **keep data live** without hurting either (auto-refresh), and **see what people actually use** (usage metrics).

## Performance Profiler

**[Docs]** In edit mode, open the **Profiler** tab and choose **Reload in Profiler Mode**. The page reloads and records from initialisation: total load time, a timeline of widget and variable loads, and load time per widget and variable. Only what affects the screen is counted, as in view mode. Clicking around (new tabs, actions, events) records further loads; you can filter by page or overlay, search, clear, and exit (which reloads again).

**[Recommendation]** Profile before changing anything, then again after. Slow variables usually show up here before they show up anywhere else; the lineage graph's computation times ([01-03](../01-workshop-foundations/03-variables-and-interfaces.md#the-variable-lineage-graph)) tell you what feeds them.

## Widget display optimization

**[Docs]** By default a widget **mounts** when its layout renders and **unmounts** when it doesn't (another tab, a closed drawer), freeing memory but reloading data and state every return. Two settings change that, per widget, in the **Display** tab:

| Mount ↓ / Unmount → | Normal | Unmount when off-screen | Never unmount |
|---|---|---|---|
| **Normal** (default) | Default behaviour | — | Keep state across tab switches |
| **Delay until on-screen** | Lazy-load below the fold | "Virtualise" a long page | ✓ |
| **Eagerly mount** | — | — | Preload a hidden tab or overlay |

**[Docs]** The docs' scenarios: keep a **custom widget** alive across tab switches (normal + never), **preload** a tab users nearly always reach (eager + never; costs initial load time), **keep scroll and form state** (normal + never), **lazy-load** a long page (delay + normal), **virtualise** it (delay + off-screen).

**[Docs]** Limits: navigating away from the module (including switching Carbon tabs) resets everything; a widget inside an embedded module can be eager only if the embedded module widget is eager too; in loop layouts it applies to the visible page only; hidden widgets may measure their size wrongly; and behaviours that run on first appearance, such as an Object Table's **automatic first-row selection**, can run while hidden.

**[Example]** In the Delivery Desk queue, the chatbot drawer gets **Normal + Never unmount**, so closing the drawer doesn't throw away the conversation. Nothing else changes: the docs warn that keeping many widgets mounted risks memory pressure and tab crashes on weaker machines.

## Auto-refresh

**[Docs]** Auto-refresh (in the module's **Settings**) **watches** registered object sets; when anything changes them (another user's action, a pipeline, a stream) the **whole module's data** refreshes. Settings: a **minimum time between refreshes** (at least **10 seconds**) and *Disable in edit mode*. Users can pause and resume updates through the *Enable/Disable auto-refresh updates* events.

**[Docs]** Limits that shape the design:

| Limit | Consequence |
|---|---|
| **Object Storage v2 only**, including types and link types used in the set's definition | An OSv1 link between two OSv2 types breaks it (`InvalidObjectSetForPlanning`) |
| Linked object types aren't watched | Linked properties and aggregations don't refresh unless the linked type is watched too. The docs' trick: put the linked set in an Object Set Title in a zero-size section |
| Some filter types can't be watched (terms, phrase, multiMatch, prefixOnLastToken, objectSetLink) | Watch a broader, unfiltered set and filter downstream |
| The watched set must be in a **visible** widget | A set used only in a closed drawer refreshes only while it's open; a hidden or background browser tab delays refreshes |
| Not inherited from embedded modules | Configure it per module; for a live child inside a static parent, use an iframe |
| User input can be reset by a refresh | Avoid automatic recompute on input variables, or move input to a separate module or tab |

**[Docs]** Auto-refresh can raise data load and cost; skip it where live data doesn't matter.

**[Example]** The queue watches `atRiskOrders`. Order is OSv2 ([Ontology 14-06](../../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md)), so it qualifies. The shipment status column comes from the linked Shipment, which isn't watched, so a carrier update wouldn't show; a zero-size Object Set Title on the queue's shipments makes Shipment changes trigger the refresh too. The Comments tab turns auto-refresh off while open, so a refresh can't wipe a half-written comment ([03-05](../03-workshop-widgets/05-buttons-forms-and-navigation.md#comments)).

## Usage metrics

**[Docs]** The **Metrics** tab in the editor shows:

- **Action metrics**: successful submissions per action, with the widgets that use each; on by default.
- **Layout view metrics**: views per page, tab and overlay; **opt in** under *Module settings › Metrics › Usage Metrics Tracking*. Data appears up to **24 hours** later and updates daily. Only views on **main** in **view mode** count; overlays from an embedded module count for that module.

Periods: **7, 30 or 90 days** (default 30), each compared with the period before. All counts are aggregates; no user is identifiable.

**[Example]** Three months in, the queue's *Customer cases* tab has almost no views and *Re-route shipment* almost no submissions from the queue (Kofi's team uses its own page). Both are candidates to drop from the queue, which lightens it for everyone.

---
[Module index](README.md) · Previous: [01 — Publishing, versions and branching](01-publishing-versions-and-branching.md) · Next: [03 — Routing, state and presentation](03-routing-state-and-presentation.md)
