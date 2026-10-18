# 06 — AI, observability and embedded apps

*Sources: [AIP Analyst widget](https://www.palantir.com/docs/foundry/workshop/widgets-aip-analyst/) · [AIP Chatbot](https://www.palantir.com/docs/foundry/workshop/widgets-aip-chatbot/) · [AIP Generated Content](https://www.palantir.com/docs/foundry/workshop/widgets-aip-generated-content/) · [Observability Chart](https://www.palantir.com/docs/foundry/workshop/widgets-observability-chart/) · [Embed Foundry apps](https://www.palantir.com/docs/foundry/workshop/widgets-embed-foundry-apps/) · [Iframe](https://www.palantir.com/docs/foundry/workshop/widgets-iframe/) · checked October 18, 2026 · Ready for Review*

Three ways a module reaches beyond its own widgets: **AI** widgets that put an LLM next to the data, an **observability** widget that charts the platform's own telemetry, and **embedding** of other Foundry apps or outside web pages.

## AI widgets

| Widget | What it puts in the module | Configured where |
|---|---|---|
| **AIP Chatbot** | A chat with an AIP Chatbot that can read and write module variables | **AIP Chatbot Studio** (recommended); a legacy in-widget mode is heading for sunset |
| **AIP Analyst** | The Analyst agent, scoped by the builder | The widget, with tool and data limits ([AIP 07-04](../../AIP/07-end-user-apps/04-aip-analyst.md)) |
| **AIP Generated Content** | One generated response: from an AIP Logic function, or streamed from an LLM | The widget |

### AIP Chatbot

**[Docs]** Pick the chatbot, its **published version**, and whether to show its reasoning. If the chatbot has **application variables**, map each to a Workshop variable; the chatbot then reads or writes it according to the permissions set in Chatbot Studio. A **textbox variable** mirrors the chat input: setting it from outside the widget sends a message, which is how a button can ask the chatbot something. With *Load data from scenario*, the chatbot reads and acts inside a scenario and its edits stay there.

**[Docs]** The legacy mode (prompt and tools defined in the widget) lacks versioning, metrics and session history; the widget offers *Upgrade to an AIP Chatbot*.

**[Example]** Ama's team gets Delivery Desk ([AIP 05-01](../../AIP/05-chatbot-studio/01-chatbot-concepts.md)) in a drawer on the queue. The chatbot's application variable for the selected order is mapped to `selectedOrder`, so "draft an update for this one" means the row Ama is on. A *Draft update* button sets the textbox variable to "Draft a delay update for this order", which sends it. The widget pins the published version, so a new chatbot version reaches the queue only when someone moves the pin, after it passes the evals suite ([AIP 04-01](../../AIP/04-aip-evals/01-evals-concepts-and-suites.md)).

### AIP Generated Content

**[Docs]** Three modes: an **AIP Logic** function; **Direct to LLM** with a prompt variable, temperature and model; or the same with a **prompt function**. Output goes to a string or object set variable. Every viewer needs access to **AIP Logic**, or they see "Could not find widget with type: oa-aip-generated-content".

**[Docs]** The Direct to LLM model list on the page is four OpenAI models: GPT-3, GPT-4, GPT-4 32K and GPT-4-Turbo. Like the streaming event's list, it looks out of date ([RQ-02](../SOURCES.md#open-research-questions)).

## Observability Chart

**[Docs]** Charts telemetry for **one** function, action type or compute module: **executions** (successes and failures), **P95 duration**, **CPU** or **memory**. The time range comes from two timestamp variables, which the widget also **writes**: brushing a range on the chart updates them and anything bound to them. *Run history* opens the resource in Workflow Lineage. If the resource isn't reporting (for example a stopped compute module), the widget shows a message instead of an empty chart.

**[Example]** A small *Delivery Desk health* page: two Observability Charts for `draftDelayMessage` (executions, P95 duration) and two for *Hold order*, all bound to one pair of start and end variables, so brushing one chart moves all four. It's the in-app view of what [AIP 09-02](../../AIP/09-cost-and-observability/02-observability.md) describes for the platform.

## Embedding other apps

**[Docs]** The *Embed Foundry apps* family: **Iframe**, Derived series, Map application template, Notepad document (read-only or edit), Quiver dashboard, Vertex graph, and Workshop **embedded module** ([02-04](../02-workshop-data-and-logic/04-embedding-modules.md)).

### Iframe

**[Docs]** Embeds a URL, a **Slate** app, or a **bidirectional** custom app. General rules:

- More than **one** iframe on screen isn't recommended: each costs memory and processing.
- External pages need your Content Security Policy configured, a `frame-ancestors` header on their side allowing your Foundry URL, and CORS if they call Foundry APIs. Add `embedded=true` to hide the Foundry sidebar on Foundry pages. Local-network access is off unless enabled.
- An iframe **reloads** whenever it is hidden and shown again, losing its state, unless display optimization keeps it mounted ([04-02](../04-workshop-in-production/02-performance.md#widget-display-optimization)).

| Mode | Talks to Workshop through | Limits |
|---|---|---|
| **URL** | Nothing (static or variable URL) | — |
| **Slate** | URL parameters (reload the app when changed), **input parameters** read with `Slate.getMessage`, **output parameters** and **triggerable events** sent with `Slate.sendMessage` | Inputs: strings, numbers, object sets. Outputs: object sets, object set filters, strings |
| **Bidirectional** | The `@osdk/workshop-iframe-custom-widget` package (`useWorkshopContext`): read and write variables, run events | Object sets capped at **10,000** objects and one preset object type; **no structs**. The docs prefer a **custom widget** for new work ([06-04](../06-osdk-react-and-custom-widgets/04-custom-widgets-in-workshop.md)) |

**[Docs]** Only an embedded **Developer Console** application can follow the module's global branch (with the branch-context setup); other iframe configurations don't inherit it and can apply actions to **main**.

**[Explanation]** That last point matters when testing on a branch ([04-01](../04-workshop-in-production/01-publishing-versions-and-branching.md)): an embedded Slate app clicked during a branch review writes to production data.

---
[Module index](README.md) · Previous: [05 — Buttons, forms and navigation](05-buttons-forms-and-navigation.md) · Next module: [04 — Workshop in production](../04-workshop-in-production/README.md)
