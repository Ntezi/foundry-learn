# 04 — Events and interaction

*Sources: [Configure Events and Actions](https://www.palantir.com/docs/foundry/slate/concepts-events/) · [Events and actions index](https://www.palantir.com/docs/foundry/slate/concepts-events-and-actions-index/) · [Enable user interaction](https://www.palantir.com/docs/foundry/slate/best-practices-user-interaction/) · [Understand dependencies](https://www.palantir.com/docs/foundry/slate/best-practices-app-functionality/) · checked October 18, 2026 · Ready for Review*

**[Concept]** The dependency graph ([03](03-functions-variables-and-handlebars.md)) handles *when this changes, recompute that*. **Events** handle everything else: *when this happens, do that*. An event (a click, a value change, a query finishing) triggers an **action** (run a query, set a variable, open a dialog), with optional JavaScript in between that shapes the value passed on.

**[Docs]** The docs' rule of thumb: rely on the graph first and keep event chains short. An app with **more than 50 events**, especially events doing more than opening toasts or starting queries, is a sign to refactor or split it into smaller apps.

## Event JavaScript

**[Docs]** Each event/action pair can run JavaScript. Like functions, it has no DOM access, saves no state and accepts **no helpers**. Two special values:

- `{{slEventValue}}`: the value that came with the event, such as the new value on a `.changed` event or the payload of a message.
- `{{slDisableAction}}`: return it to cancel **this** run of the action, for conditional events.

**[Recommendation]** Keep event JavaScript to a line or two. The docs warn that it has no linting or error reporting, so mistakes fail silently. Put the condition in a function and return `{{slDisableAction}}` from the event when the function says no. You can still drop a `debugger` statement in and step through it in Chrome DevTools.

## What can trigger what

**[Docs]** The index lists events and actions at five levels:

| Level | Events | Actions |
|---|---|---|
| **App** (`slate.`) | `ready` (page framework loaded, queries started), `resize`, `onNavigate[page]`, `onPrint`, `userStorageChanged`, `getMessage`, `getBroadcast`, `onCloseCheckpoint`, `onChildWindowClosed`, `viewSaved` | `navigateTo[page]`, `scrollToId`, `setWindowTitle`, `print`, `downloadBlob`, `exportWidget` (PNG or PDF), `sendMessage`, broadcast-channel actions, `showCheckpoint`, `openAppsPortal`, `askAIPAssist`, `logout`, `copyToClipboard`, `redirectToUrl`, `saveView`, `loadView` |
| **Query** | `success`, `failure` | `run` (manual or not), `export` / `exportXlsx` / `exportCsv` |
| **Function** | `ran` | `run`, exports |
| **Variable** | `changed` | `set` |
| **Widget** | `cssClassesUpdated`, `transitionend`, `<property>.changed` (interaction properties only), plus widget-specific events | Widget-specific actions such as `open`, `close`, `redraw`, `clear` |

**[Docs]** Details worth remembering:

- **Messages.** A Slate app inside an iframe receives `postMessage` payloads through `slate.getMessage` (the Workshop iframe page spells it `Slate.getMessage`; both appear); the payload is `{{slEventValue}}`, and messages can also set variables or run actions. `slate.sendMessage` posts to the parent, or to child windows opened by `redirectToUrl` with a window ID. This is how a Slate app embedded in Workshop talks to the module ([03-06](../03-workshop-widgets/06-ai-observability-and-embedding.md#iframe)).
- **`redirectToUrl` on `slate.ready`** sends users away as soon as the page loads, which makes the app hard to edit. If you need it, guard it with a URL parameter.
- **Exports.** A function export needs an object of equal-length column arrays. Delete the `._results` property Slate adds to query results first, or the export fails. Export file names may only contain letters, numbers, underscores or spaces.
- **`exportWidget`** can't export iframe, Code Sandbox or multiselect widgets, or containers holding them.

## Custom click events

**[Docs]** HTML and Table widgets can raise their own events:

1. Mark an element with `slClickEvent="hold"` and, optionally, `slClickEventValue="<value>"`.
2. Register the name in the widget's **Click Event Names**. Registration is hard-coded even when the HTML is generated, so Slate knows the possible triggers.

**[Example]** The queue table renders a small *Hold* link in each row with `slClickEvent="hold"` and `slClickEventValue` set to the order ID. The event `w_queueTable.click.hold` has two actions: set `v_orderToHold` to `{{slEventValue}}`, and open `w_holdDialog` ([02](02-reading-and-writing-data.md#writing-to-the-ontology)). **[Explanation]** The docs' delete-link pattern chains through `variable.changed` instead. That fits a delete, but not here: an agent who clicks *Hold* on the same order twice doesn't change the variable, so a `.changed` event wouldn't fire and the dialog wouldn't reopen. The graph is lazy ([03](03-functions-variables-and-handlebars.md#the-dependency-graph)).

## Designing for input

**[Docs]** The guidance in *Enable user interaction*:

- **Keep chained inputs short.** When one filter's choice limits the next filter's options, long chains make apps slow and confusing.
- **Separate configuring from analysing.** Set the queries behind a set of filters to **manual** and add an *Update* button, especially with free-text inputs, which would otherwise rerun queries on every keystroke.
- **Any query that writes data must be manual** and fired by an explicit user action.
- **Dependencies between inputs must trickle down.** You can't build filters that all affect each other, because the graph can't have cycles.
- **Repeating containers are display-only.** An input inside one can only be referenced from inside that container. To let users build up a list of criteria, keep one set of inputs and append each saved selection to an array variable.

### Reset to defaults

**[Docs]** Keep defaults in a `v_defaults` variable and template each widget's selected value (and selected display value) from it. Resetting by setting `v_defaults` to the same object does nothing, because the graph is lazy. Add a changing value, such as a random number, so Slate sees a new value. With defaults split into one variable per field, URL parameters can set each default, and a `v_entropy` variable resets them all.

### Validating input

**[Docs]** One validation function gathers all inputs, runs every check and returns an object such as `{ disable, messages }`. The submit button's `disabled` property reads `{{f_validate.disable}}`, and a text widget shows the messages.

**[Example]** In the Slate *Hold order* form, `f_validateHold` checks that a reason is chosen and that the selected order's status allows a hold. The second check repeats the action's submission criteria ([Ontology 08-03](../../Ontology/08-actions/03-submission-criteria.md)) only to give feedback early; the action still enforces it.

### Shareable views

**[Docs]** A **shareable view** saves the current state as a URL with a view ID. Create one from *Get shareable view* in View mode, or with `slate.saveView`; the ID arrives on `slate.viewSaved`, and `slate.loadView` restores it. Limits:

- **home page only**, and only **local** variables (shared variables aren't saved);
- state is matched by widget and variable **names**, so renaming loses it, as does changing a widget's type;
- views load on any version of the app while those names exist.

**[Explanation]** Shareable views are the Slate counterpart of Workshop's state saving ([04-03](../04-workshop-in-production/03-routing-state-and-presentation.md#state-saving)). The FAQ recommends them over printing when users just want to keep or present a view.

---
[Module index](README.md) · Previous: [03 — Functions, variables and Handlebars](03-functions-variables-and-handlebars.md) · Next: [05 — Styles and widgets](05-styles-and-widgets.md)
