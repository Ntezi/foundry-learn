# 01 — Slate apps and how they're managed

*Sources: [Slate overview](https://www.palantir.com/docs/foundry/slate/overview/) · [Navigation](https://www.palantir.com/docs/foundry/slate/navigation/) · [Slate FAQ](https://www.palantir.com/docs/foundry/slate/faq/) · [Application types](https://www.palantir.com/docs/foundry/slate/applications-types/) · [Create and publish an application](https://www.palantir.com/docs/foundry/slate/applications-create/) · [Pages](https://www.palantir.com/docs/foundry/slate/applications-pages/) · [Manage application versions](https://www.palantir.com/docs/foundry/slate/applications-versioning/) · [Merge application changes](https://www.palantir.com/docs/foundry/slate/applications-merging/) · [Import, export, and duplicate](https://www.palantir.com/docs/foundry/slate/applications-import-export/) · [Slate in Marketplace](https://www.palantir.com/docs/foundry/slate/marketplace-slate/) · checked October 18, 2026 · Ready for Review*

**[Concept]** Slate is a drag-and-drop builder for **custom-styled web apps**. You place widgets on a canvas and wire them to queries, JavaScript functions, variables and events, then restyle anything with CSS. Workshop gives you Ontology-aware widgets and a fixed look; Slate gives you a blank web page and leaves more of the work to you.

**[Docs]** The FAQ is blunt about the trade-off. It calls Slate the most complex Foundry tool for developers: it packages a single-page web app builder but "provides few built-in rails", so anti-patterns that cause slow or non-deterministic behaviour are easy to build. Its advice is to prefer small, single-purpose apps linked together over one large app.

**[Recommendation]** Choose Slate for the cases [Ontology 10-03](../../Ontology/10-applications/03-workshop-and-slate.md#choosing-between-them) lists: a custom look, a public form for people without Foundry accounts, or a legacy app you have to maintain. For an operational app on the Ontology, start in Workshop (modules [01](../01-workshop-foundations/README.md)–[04](../04-workshop-in-production/README.md)).

## The editor

**[Docs]** Edit mode has four areas:

- the **action bar** (name, Actions menu, panel buttons);
- the **widget list**;
- the **canvas**, with a screen-size preview;
- the **widget editor**, with tabs for properties, layout, raw **JSON** and events.

Panels open over the canvas for queries, functions, object sets, object context, Foundry Functions, events, the dependency graph, styles and variables. **Cmd/Ctrl+K** searches all of them. Deleting a widget, query, function or other element can be undone from the toast, and a widget's event wiring comes back with it.

**[Docs]** The JSON tab exposes every widget property. Properties the Property tab doesn't show are managed by Slate, so review JSON edits to those defaults carefully.

## Integrated and public apps

| | Integrated app | Public app |
|---|---|---|
| Who uses it | Foundry users in your organization, by their permissions | People **without Foundry accounts**, view-only, through the public link |
| Data access | Objects, datasets, actions, functions, files | **None** outside the app itself: no objects, datasets, actions or files. Images and fonts must be embedded as base64 |
| Writing data | Actions, OSDK, API gateway queries | Secure-upload channels into a dataset ([02](02-reading-and-writing-data.md#public-apps-uploading-data)) |
| Who can create | Normal project permissions | Also needs the **Manage public Slate applications** workflow (Control Panel, organization permissions). Projects only; no private folders, no templates |
| Publishing | Can publish automatically on save | Must be published explicitly each time; one published version at a time; tags aren't reachable |
| Reach | Your Foundry | The same network as Foundry; an instance on a restricted network can't publish to the web. Not indexed by search engines |

**[Docs]** Unpublishing hides a public app from unauthenticated users; authenticated users with permissions can still open it.

**[Example]** A Kestrel public app could collect delivery feedback from customers, since they have no Foundry accounts. It couldn't look up the customer's order to check it: a public app can't read objects. It could only check the format of what was typed and write the submission to a dataset for a pipeline to match later. *Candidate only; not part of the Kestrel model.* Customers who want to **see** their order status use the separate portal designed in [Ontology 10-04](../../Ontology/10-applications/04-osdk-and-apis.md).

## Pages and state

**[Docs]** **Pages** split one app's UI, queries, variables, functions and events into separately loaded scopes. Navigation uses the `slate.navigateTo[page]` action and the `slate.onNavigate[page]` event; each page has its own URL. State crosses pages through **shared variables**. Per-user state that should survive reloads goes in the **user storage variable** ([03](03-functions-variables-and-handlebars.md#variables)).

## Versions, tags and merging

**[Docs]** Versions are listed from the number beside the save check mark. From the list you can view, revert, compare with latest, and manage tags.

- **Always publish when saving** keeps viewers on the latest version. Turned off, the permalink opens the **published** version, so you can keep saving work in progress.
- **Revert** saves the old version as the newest one: reverting version 55 to 51 creates version 56, identical to 51.
- **Tags** expose a version at `?$tag=<name>`. Viewers can open tagged versions but not untagged ones. `published` is reserved, and a tag sits on one version at a time.

**[Docs]** When two editors save from the same version, the second chooses: **discard**, **overwrite**, **save as** a new app, or **merge**. Without conflicts, Slate merges the JSON and shows a preview. With conflicts (the same element changed by both, or colliding widget IDs), it shows three JSON panes: theirs, the result, yours. Slate keeps the **other user's** version of each conflicting element until you copy your changes across and mark it resolved.

**[Recommendation]** Give widgets meaningful names (`w_holdButton`, not `w12`). The docs note that default names make ID collisions, and so merge conflicts, more likely.

## Import, export, Save as and Marketplace

| Route | What moves | Watch out for |
|---|---|---|
| **Export / Import JSON** | Widgets, functions, query logic, events, variables, styles | No datasets, objects, actions, data sources, images, global stylesheets or Code Sandbox libraries. Import fails if referenced data sources are missing. Importing a permalink that already exists creates a **new version** of that app. **Regenerate the OSDK bundle** after import |
| **Save as** | The latest version, as v1 of a new app | The OSDK bundle is copied, not regenerated. Saving over an existing app adds a new version to it, which you can use to stage or promote apps |
| **Marketplace** | Single- and multi-page apps, including OSDK apps (with a pre-built bundle) | Only **API Gateway** data sources; no custom data sources such as Postgres; no global stylesheets; no Foundry Form or Time Series widgets. Ontology API names must match the source |

**[Docs]** The docs recommend Marketplace to share apps across instances and Save as to duplicate within one, rather than JSON import and export. Only **local variables on the home page** can be Marketplace parameters (string or boolean). Versioned functions aren't supported with the OSDK in Marketplace; only the latest version of a function works.

**[Explanation]** Kestrel ships product outputs through Marketplace across `kestrel-dev`, `kestrel-test` and `kestrel` ([Ontology 14-04](../../Ontology/14-lifecycle-and-operations/04-marketplace-packaging.md#which-environment-changes-what)). A Slate app built on legacy Postgres queries couldn't take that route at all.

---
[Module index](README.md) · Next: [02 — Reading and writing data](02-reading-and-writing-data.md)
