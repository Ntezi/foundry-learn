# 05 — Styles and widgets

*Sources: [Styles overview](https://www.palantir.com/docs/foundry/slate/style-overview/) · [Custom styles on widgets](https://www.palantir.com/docs/foundry/slate/applications-style-text/) · [Configure and apply styles](https://www.palantir.com/docs/foundry/slate/concepts-styles/) · [Global stylesheets](https://www.palantir.com/docs/foundry/slate/styles-global-stylesheet/) · [Build complex layouts](https://www.palantir.com/docs/foundry/slate/best-practices-complex-layouts/) · Widgets: [Chart](https://www.palantir.com/docs/foundry/slate/widgets-chart/) · [Container](https://www.palantir.com/docs/foundry/slate/widgets-container/) · [Control](https://www.palantir.com/docs/foundry/slate/widgets-control/) · [Platform](https://www.palantir.com/docs/foundry/slate/widgets-platform/) · [Text](https://www.palantir.com/docs/foundry/slate/widgets-text/) · [Time](https://www.palantir.com/docs/foundry/slate/widgets-time/) · [Visualization](https://www.palantir.com/docs/foundry/slate/widgets-visualization/) · [Advanced](https://www.palantir.com/docs/foundry/slate/widgets-advanced/) · checked October 18, 2026 · Ready for Review*

**[Concept]** Slate widgets are built on Palantir's open-source **Blueprint** framework and styled with ordinary CSS, written in **Less**. There are no skins or templates: restyling means overriding Blueprint's rules with selectors specific enough to win. The docs' main tool for this is the browser's element inspector.

**[Docs]** The docs also warn against chasing a pixel-perfect mockup at the cost of a clean, maintainable app: every style override is a trade against simplicity.

## Where styles live

| Place | Scope | Use it for |
|---|---|---|
| **Custom styles on a widget** (Styles tab) | That widget, and a container's children | Trying things out. They can collide with stylesheet rules on the same properties |
| **Local stylesheet** (Styles panel) | The whole app; one per app | Defining classes, applied through each widget's **Additional Classes** |
| **Global stylesheet** | Every app in the same **space** that turns it on | A shared look across apps. CSS only, no Less. Needs the `slate:edit-stylesheet` role on the space to create or change and `slate:view-stylesheet` to use; not available to apps in private folders |

**[Docs]** Global stylesheet edits preview immediately in your app but reach other apps only when you select **Update**. Turning one on for an app is the **Use in application** toggle, then a save. Changes and deletions affect every app that uses the stylesheet.

**[Docs]** Other style tools:

- **Blueprint colours** as Less variables (chosen with WCAG 2.0 in mind), Blueprint **CSS classes** for buttons, tags and progress bars, and Blueprint **icons**, referenced the way your Blueprint version requires.
- **Custom fonts** uploaded to Foundry as `.otf` and imported by RID.
- `?$theme=dark` loads the whole page dark from the start, for that one load.

### Dynamic styles

**[Docs]** CSS is compiled at page load, so it can't contain Handlebars. Three patterns make styling respond to state:

- **Template Additional Classes.** Predefine classes and let a function pick which apply.
- **Template the `style` attribute** inside an HTML widget or HTML table cell.
- **Hide widgets** with a templated `hidden` class (simple, but flickers on load), a **tabbed container** with a blank tab (no flicker), or a class on the parent that removes the child from the DOM by its root ID, `widget-<name>`.

**[Example]** `f_queueView` ([03](03-functions-variables-and-handlebars.md#slate-functions)) returns a class per row: `status-on-hold`, `status-late` or nothing. The local stylesheet defines those classes once with Blueprint colour variables, so the colours match the rest of Foundry.

## Layout

**[Docs]** Lay out with **containers**, not CSS positioning:

- Avoid nesting containers more than **3 or 4 levels** deep; each widget adds DOM, and a heavier DOM makes the app slower.
- Ctrl/Cmd-click several widgets to **align or distribute** them, or use a **flex container** for automatic layout.
- For multi-page workflows inside one page, use a **tabbed container** with **Lazy rendering enabled**. Hide the tab titles and template `selectedTabIndex` to move users through steps. Tabs are only UI: the queries behind a hidden tab still run when the graph resolves, unless you make them conditional.
- The FAQ adds that widgets rendered too small on load usually come from percentage sizes clashing with a flex parent. Use only the flex settings, not CSS widths and heights.

## The widget families

| Family | Widgets | Notes |
|---|---|---|
| **Chart** | Bar (with legend, stacked, horizontal), multiple series, Gantt, heat grid, line, pie, scatter, tree map | Data as parallel arrays per dataset. Selection exposes `selection.data`; pan/zoom can't be combined with data or area selection. Time axes expect epoch milliseconds. `redraw` action. Gantt needs a time-series x-axis and category y-axis |
| **Container** | Basic, dialog, flex, repeating, split, tabbed | `lazyRenderingEnabled`, `selectedTabIndex`. Dialog has `open`/`close` actions and `opened`/`closed` events. Repeating containers are display-only ([04](04-events-and-interaction.md#designing-for-input)) |
| **Control** | Button, checkbox, dropdown, input box, multiselect, radio, segmented control, slider, textarea, toggle | Most have `disabled`, `values`/`displayValues` and selected values. Dropdown and multiselect can search on the server. Input box can run named queries on Enter. Textarea has a **0.5 s debounce**, so a quick submit can send partial text |
| **Platform** | Object Card, Resource Selector, Time Series, **Action** | Object Card renders an object's card from its RID. Resource Selector opens a Compass picker. Action runs an action type ([below](#platform-widgets)) |
| **Text** | Text (Markdown or HTML), HTML, card, clickable, image, link, list | Handlebars in content; `sl-tooltip` tooltips. Images hosted in Foundry use a `blobster` URL |
| **Time** | Calendar, date picker, date range picker, timeline | — |
| **Visualization** | Graph, image gallery, map, table, toast, tree | See below |
| **Advanced** | Code Sandbox, File Import, Iframe | See below |

### Tables and maps

**[Docs]** A browser can reliably hold about **5–10k rows**, depending on the user's machine. For anything larger, turn on **server paging and sorting**: the query reads the table's paging and sort properties, adds `LIMIT`/`OFFSET` and `ORDER BY`, and a count query feeds the **server total**. Set a key column so selection survives paging.

**[Docs]** The **Map** widget uses Leaflet with Mapbox base tiles. Overlay layers: location, heat map and heat grid, shape (GeoJSON), vector (needs an external tile server), choropleth and Raven (ask Palantir). Shape layers slow down noticeably at about **1,000 features**; location layers at about **5,000–10,000 points**. Use vector layers beyond that.

### Platform widgets

**[Docs]** The **Action** widget picks an action type you can access and prefills parameters from defaults or Handlebars. For an object parameter, the default is an **object locator** (`typeId` and `primaryKey`), or a list of locators when the parameter accepts several. A default set in the widget overrides the action type's own default. Dates use ISO 8601. The form can be hidden and submitted with `w_name.submit`. Events report success or failure and validation success or failure.

**[Docs]** **Object Card** takes an object RID, so a primary key must first be resolved to a RID, for example with the Object Set panel. Inside a repeating container, index into a list of RIDs with `lookup`.

### Code Sandbox, File Import and Iframe

**[Docs]** The **Code Sandbox** is a custom widget inside Slate: your JavaScript, HTML and CSS running in a sandboxed iframe that talks to Slate through `postMessage`.

| Direction | Function | What it does |
|---|---|---|
| Slate → widget | `SlateFunctions.watch(path, fn)` | Calls `fn` whenever that part of the widget's **state** changes (state is filled with Handlebars in the Interactions tab) |
| Slate → widget | `SlateFunctions.getState()` | Reads the state once |
| Slate → widget | `SlateFunctions.onAction(name, fn)` | Handles a `custom.<name>` action triggered by a Slate event |
| Widget → Slate | `SlateFunctions.setState(path, value)` | Updates the state other widgets read |
| Widget → Slate | `SlateFunctions.triggerEvent(name, body)` | Raises a `custom.<name>` event |

Rules from the docs:

- **No Handlebars** in its JavaScript, HTML or CSS; pass values through the Interactions state. Changing the JavaScript reloads the whole widget.
- **No network requests** (no `fetch`). Route data through Slate queries.
- `<script>` tags in its HTML don't run.
- **Libraries** load from project paths or RIDs, or from URLs that CORS and CSP allow, and must expose themselves globally (for example as UMD).
- Palantir doesn't support debugging custom code in it.

**[Docs]** **File Import** lets users upload files for the app to process. The **Iframe** widget embeds a page; add `?embedded=true` for content loaded through Workspace.

**[Explanation]** In Workshop the equivalent of the Code Sandbox is a **custom widget set** ([06-03](../06-osdk-react-and-custom-widgets/03-custom-widget-sets.md)): versioned code in a repository rather than code pasted into one app.

---
[Module index](README.md) · Previous: [04 — Events and interaction](04-events-and-interaction.md) · Next: [06 — Troubleshooting and query performance](06-troubleshooting-and-query-performance.md)
