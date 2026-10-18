# 03 — Custom widget sets

*Sources: [Custom widgets](https://www.palantir.com/docs/foundry/custom-widgets/overview/) · [Core concepts](https://www.palantir.com/docs/foundry/custom-widgets/core-concepts/) · [Create a widget set](https://www.palantir.com/docs/foundry/custom-widgets/create/) · [Develop and preview a widget set](https://www.palantir.com/docs/foundry/custom-widgets/development/) · [Publish a widget set](https://www.palantir.com/docs/foundry/custom-widgets/publish/) · [Add an additional widget](https://www.palantir.com/docs/foundry/custom-widgets/additional-widget/) · [Manage Node.js version](https://www.palantir.com/docs/foundry/custom-widgets/manage-node-version-in-foundry-code-repository/) · [Widget sets in Marketplace](https://www.palantir.com/docs/foundry/custom-widgets/marketplace/) · [Troubleshooting](https://www.palantir.com/docs/foundry/custom-widgets/troubleshooting/) · checked October 18, 2026 · Ready for Review*

**[Concept]** A custom widget is your own front-end code running **inside** a Workshop module, in a sandboxed iframe. It fills the gap between Workshop's widget catalogue and a whole React app: one missing piece (a candlestick chart, a flight-plan view, a signature pad are the docs' examples) without building and hosting a separate application. **[Docs]** Custom widgets are currently supported **only in Workshop**.

| Term | Meaning |
|---|---|
| **Widget set** | A Compass resource holding **versions** of front-end code. One version can contain several widgets (at most **50**), each with its own entry point, sharing code and assets |
| **Widget** | One component in a set; inherits the set's permissions and declares how it talks to its host |
| **Parameters** | Data the host passes in: primitives, arrays, object sets, scenario references ([04](04-custom-widgets-in-workshop.md#parameters-and-events)) |
| **Events** | Signals from the widget that update parameters or trigger host actions |

## Create

**[Docs]** In Files, choose **New → Widget set** in a project or folder; it inherits that location's permissions. Then pick where the code lives:

- **In Foundry**: a Foundry code repository with CI/CD built in. The first release starts automatically and takes a few minutes; check it under **Tags** in Code Workspaces.
- **Outside of Foundry**: your own repository (GitHub, say), published with the CLI.

**[Docs]** The wizard can also configure an **OSDK**. If you do, the widget set's **Ontology APIs** must be enabled before OSDK calls succeed. That's a separate step for a user with the **Information Security Officer** role, or a custom role granting *Enable widget set unscoped API access* ([04](04-custom-widgets-in-workshop.md#the-osdk-inside-a-widget)).

## Develop with dev mode

**[Docs]** **Dev mode** shows your unpublished code in Foundry **for your account only**; everyone else keeps seeing the published version. It expires after **24 hours**.

| Where you run the dev server | Setup | Command |
|---|---|---|
| Your machine | Clone the repository; create a user-generated token; set `FOUNDRY_TOKEN` | `npm run dev`, then open the setup link it prints |
| VS Code workspace | Open the repository in a workspace; Foundry handles auth | `npm run dev:remote` (starts automatically for templates) |

**[Docs]** Dev mode states:

- **Disabled**: you see the published version.
- **Enabled**: you see your development version, labelled with its source (localhost or the workspace).
- **Enabled (inactive)**: your server has no override for **this** widget. That's normal when you're looking at a widget you aren't developing.
- **Paused**: published version until you resume or stop.

**[Docs]** Where to preview:

- the **playground**, for one widget at different sizes, editing parameter values and watching emitted events;
- **Workshop**, for real bindings and layout;
- the **VS Code preview panel**, without leaving the editor.

A brand-new widget must be **published once** before Workshop can select it; after that, dev mode works in Workshop too. Code and style changes reload on save. Changes to **parameters or events** in the config file need dev mode reapplied (requires `@osdk/widget.vite-plugin` 3.34.0 or later).

### Runtime limits

**[Docs]** The sandbox restricts what a widget can do:

- **No persistent browser storage**: no `localStorage`, `sessionStorage` or IndexedDB. Share state through parameters; persist it with Workshop saved state or the Ontology.
- **Dedicated web workers** are allowed; shared and service workers aren't.
- **Network**: a fixed, restrictive CSP. External requests and non-Ontology APIs are blocked; wrap external calls in a Foundry function or webhook.
- **Unmounting**: Workshop unmounts a widget when its layout is hidden, discarding its state, unless widget display optimization keeps it mounted ([04-02](../04-workshop-in-production/02-performance.md#widget-display-optimization)).

## Publish

| Method | When |
|---|---|
| **Foundry CI/CD** | Code in a Foundry repository: pushing a tag builds and publishes |
| **`@osdk/cli`** | Code outside Foundry: one command from a terminal or external CI |
| **Manual upload** | A `.zip` of the production build, with no wrapping folder, uploaded on the widget set page |

**[Docs]** The build includes a manifest, `.palantir/widgets.config.json`, produced by `@osdk/widget.vite-plugin`. It lists the widgets and the version. `foundry.config.json` decides how the version is calculated: from `package.json`, or from git tags with `git-describe`.

**[Docs]** Publishing a new version **doesn't update existing usages**. Each Workshop module keeps the version it was configured with until someone changes it.

**[Explanation]** That's deliberate: a widget release can't silently change a production module. It also means a fix doesn't reach users until each module owner moves to the new version and republishes their module ([04-01](../04-workshop-in-production/01-publishing-versions-and-branching.md)).

### More widgets, Node.js and Marketplace

**[Docs]** To add a widget to a set (React + Vite templates):

1. Write a config file with `defineConfig`.
2. Write an entry point that renders the widget with its parameter and event context.
3. Add an HTML file that loads the entry point, and include it in Vite's build inputs.

`npm run build` then lists the new widget in the manifest.

**[Docs]** Node.js version: add an `.nvmrc` at the repository root and point `.jemma/settings.sh` at it so CI uses the same version. Without nvm, CI uses the version in `.jemma/settings.sh` and the Foundry environment uses **18.20.8**.

**[Docs]** In **Marketplace**, add a widget set as a product output, or add a Workshop module that embeds it and the set comes along. Limits:

- the vite plugin must be 3.1.0 or later;
- installed source code is for debugging only, not for developing new versions;
- Ontology APIs aren't enabled automatically: enable them once after installation, and the setting survives upgrades;
- Ontology API names must match the source;
- only the latest version of a function works with the OSDK.

## When a widget crashes the page

**[Docs]** A widget that uses too much memory or blocks the thread can freeze the browser tab. The anti-patterns the docs list:

- **Infinite re-renders**: a `useEffect` that updates its own dependency; timers or animation loops never cleared; event handlers that trigger themselves; expensive work for every item on every render.
- **Loops that never exit**, or that run far more often than expected.
- **Loading every object into the browser.** Instead, show one page at a time, filter and sort in the query, use aggregations for totals, select only needed properties with `$select`, and compute values with `.withProperties` (derived properties).

Use Chrome DevTools' Performance tab to record what happened.

**[Example]** Kestrel candidate: a `delivery-widgets` widget set in the `Delivery Desk [Workflow]` project, holding a **shipment timeline** widget that draws a shipment's `ShipmentEvent`s on a time axis for the order panel ([04](04-custom-widgets-in-workshop.md#kestrel-the-shipment-timeline)). A shipment has a handful of events, so loading them all is fine here; the same widget pointed at all shipments would hit the last anti-pattern. *Candidate only; Phase 6 decides whether it joins the Kestrel model.*

---
[Module index](README.md) · Previous: [02 — Inside the advanced to-do tutorial](02-advanced-to-do-tutorial.md) · Next: [04 — Custom widgets in Workshop](04-custom-widgets-in-workshop.md)
