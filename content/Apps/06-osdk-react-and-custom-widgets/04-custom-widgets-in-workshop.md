# 04 — Custom widgets in Workshop

*Sources: [Embedding a widget in Workshop](https://www.palantir.com/docs/foundry/custom-widgets/embedding-in-workshop/) · [Parameters and events](https://www.palantir.com/docs/foundry/custom-widgets/parameters-and-events/) · [Use OSDK in a widget set](https://www.palantir.com/docs/foundry/custom-widgets/use-osdk/) · [Dark theme support](https://www.palantir.com/docs/foundry/custom-widgets/dark-theme/) · [Auto sizing](https://www.palantir.com/docs/foundry/custom-widgets/auto-sizing/) · [Open a URL in Workshop](https://www.palantir.com/docs/foundry/custom-widgets/open-url-in-workshop/) · [Enable additional iframe attributes](https://www.palantir.com/docs/foundry/custom-widgets/iframe-attributes/) · checked October 18, 2026 · Ready for Review*

**[Concept]** Once published ([03](03-custom-widget-sets.md)), a widget behaves like any other Workshop widget with a contract: **parameters** bound to Workshop variables carry data in, and **events** carry changes and signals back out. Everything else the widget does stays inside its iframe.

## Adding one to a module

**[Docs]** Add a **Custom widget** in Workshop, then in **Widget setup** select the widget set, the widget and the **version**. Bind each parameter to a Workshop variable and each widget event to Workshop events. A widget appears in the selector only after its first release.

**[Docs]** By default the widget **reloads** when it's removed from the page and shown again, losing its state. Keep it mounted with display optimization, or keep its state in Workshop variables passed in as parameters.

## Parameters and events

**[Docs]** A widget config file allows up to **50 parameters and 50 events**, with camelCase IDs.

| Parameter type | Value format |
|---|---|
| `boolean`, `number`, `string` | Plain values |
| `date` | `YYYY-MM-DD` |
| `timestamp` | ISO 8601 with time zone |
| arrays of the above | `type: "array"` with a `subType` |
| `objectSet` | An object set RID, plus a ready-made OSDK object set; declared with an object type or interface from the widget's OSDK (`allowedType`) |
| `scenario` | An Ontology scenario RID, for reading and applying actions inside the scenario's sandbox |

Object set filters and structs aren't supported as parameter types yet.

**[Docs]** Each event declares a display name and `parameterUpdateIds`: the parameters it may change. In Workshop, an event can update those bound variables, trigger Workshop events, or both.

**[Docs]** Object set parameters, in detail:

- The widget needs an OSDK client passed to `FoundryWidget`. To use the `useObjectSet` hook, wrap it in **`OsdkProvider2`**.
- `useObjectSet` can't take a null set, so render the consuming component only once the set exists.
- When the set's definition changes or the host invalidates its data, the parameter's RID and OSDK set update.
- To **send** a set back, emit an event with an OSDK `ObjectSet`; the SDK turns it into a temporary object set RID. If the same event fires several times quickly, only the **last** is sent. Errors while creating the temporary set aren't reported to your code.

## The OSDK inside a widget

**[Docs]** Setup:

1. On the widget set page, **Configure SDK**: choose an ontology and the resources.
2. Have the **Ontology APIs** enabled for the widget set ([03](03-custom-widget-sets.md#create)).
3. Install the generated package (`@custom-widget/sdk`). In a Foundry repository, `.npmrc` is already set up. Outside Foundry, add an `.npmrc` scoped to your Foundry and widget set RID, using `FOUNDRY_TOKEN`.
4. Create the client with `baseUrl` set to `window.location.origin` and `createFoundryWidgetTokenProvider()`. The token is a placeholder: at runtime every call uses the **viewing user's** token and permissions.

**[Docs]** Callable APIs: user endpoints from the Admin namespace (get user, batch, current user, profile picture, search), and, with Ontology APIs enabled, the **Ontologies** and **Functions** namespaces plus *Upload Media*. **Object set subscriptions aren't supported.**

**[Docs]** **`refreshHostDataOnAction`**: when the widget applies an action that changes data behind an object set parameter, the host refreshes those parameters automatically. It's on by default for new widget sets; set it in the vite plugin's defaults or per widget for older ones.

## Fitting into the page

| Concern | How |
|---|---|
| **Dark theme** | `prefers-color-scheme` in CSS, or `window.matchMedia()` in JavaScript, follows Workshop's theme |
| **Fill the container** (absolute and flex layouts) | `height: 100%` / `width: 100%` on `html` and `body` |
| **Size to content** (auto layouts) | Don't set 100% on `html`/`body`; the body's size drives the container. Needs `@osdk/widget.client-react` 3.3.0+ |
| **Open a URL** | Emit an event bound to Workshop's *Open URL* event. A URL built by an asynchronous variable transform may not be ready when the event runs; set the string variable directly in the same event |
| **Camera, microphone, autoplay, downloads, forms, popups** | Declare them in the config's `permissions`; the **module builder** must then grant each one in Workshop (some need a checkpoint). Users still get the browser's own prompt |

**[Recommendation]** Don't request `allow-popups` just to open links; the docs suggest a Workshop event instead. Popups also inherit the widget's sandbox, so a popup that downloads files needs `allow-downloads` as well.

## Kestrel: the shipment timeline

**[Example]** The widget from [03](03-custom-widget-sets.md#when-a-widget-crashes-the-page), placed in the order panel child module (interface variable `order`, [02-04](../02-workshop-data-and-logic/04-embedding-modules.md)):

| Contract item | Definition | Bound in Workshop to |
|---|---|---|
| `events` (parameter) | `objectSet`, `allowedType: ShipmentEvent` | An object set variable holding the events of the order's shipments (built from `order`) |
| `selectedEventId` (parameter) | `string` | A string variable that drives a detail section |
| `selectEvent` (event) | `parameterUpdateIds: ["selectedEventId"]` | Updates the variable; also opens the detail drawer |

**[Explanation]** The widget reads with the viewing agent's own token, so the security on Kestrel's types applies inside it exactly as in the rest of the module. No service-user exception is needed, unlike the portal in [Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md#q2--who-is-the-user-and-what-token-do-they-get). If the widget later applies *Re-route shipment*, which creates a `ShipmentEvent`, `refreshHostDataOnAction` refreshes the `events` parameter.

**[Explanation]** The widget can't stay live by itself: subscriptions aren't supported inside widgets. The parameters page says the `useObjectSet` hooks offer "real-time updates", which seems to conflict; logged as [RQ-06](../SOURCES.md#open-research-questions). Until it's settled, rely on the host. Workshop's auto-refresh on the module's object sets ([04-02](../04-workshop-in-production/02-performance.md#auto-refresh)) should update the bound parameter; untested.

---
[Module index](README.md) · Previous: [03 — Custom widget sets](03-custom-widget-sets.md) · Next module: [07 — Pilot](../07-pilot/README.md)
