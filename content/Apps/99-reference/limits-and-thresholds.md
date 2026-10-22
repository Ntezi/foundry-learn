# Limits and thresholds

*Sources: the notes linked in each row, whose Sources lines name the doc pages · numbers as read October 18 (modules 01–07) and October 21, 2026 (modules 08–10), each checked against the page text by script · compiled October 21, 2026 · Ready for Review*

Every number this area quotes from the docs, in one place. **Numbers change**: check the note's linked page before relying on one.

## Workshop

| What | Value | Note |
|---|---|---|
| Sorting on a function-backed column | Up to **10,000** objects; above that, no user sort, and a default sort only sorts each loaded page | [03-01](../03-workshop-widgets/01-core-display-widgets.md#function-backed-columns), [02-02](../02-workshop-data-and-logic/02-functions-and-derived-properties.md) |
| Object Table: rows staged for inline edits | **20** for function-backed actions, **200** for others | [03-01](../03-workshop-widgets/01-core-display-widgets.md) |
| Object Table: right-click CSV export | **10,000** rows | [03-01](../03-workshop-widgets/01-core-display-widgets.md) |
| Object List: card reordering | First **500** objects | [03-01](../03-workshop-widgets/01-core-display-widgets.md) |
| Object Set Title as a drag source | Fewer than **500** objects | [03-01](../03-workshop-widgets/01-core-display-widgets.md), [04-04](../04-workshop-in-production/04-cross-application-interactivity.md) |
| Workshop derived properties | **One** link traversal; sorting a set that uses them up to **200** rows | [02-02](../02-workshop-data-and-logic/02-functions-and-derived-properties.md) |
| SQL query variable, single column | Fewer than **10,000** rows | [02-03](../02-workshop-data-and-logic/03-variable-types.md) |
| Loop layout | First **10,000** objects | [02-04](../02-workshop-data-and-logic/04-embedding-modules.md) |
| Chart: exact bucketing default | **10,000** buckets (was 1,000) | [03-02](../03-workshop-widgets/02-charts-and-maps.md) |
| Vega chart widget | Vega-Lite **5.18** | [03-02](../03-workshop-widgets/02-charts-and-maps.md) |
| Map: point and non-aggregated choropleth layers | **10,000** objects | [03-02](../03-workshop-widgets/02-charts-and-maps.md) |
| Image Annotation | **1,000** annotations per image | [03-03](../03-workshop-widgets/03-media-documents-and-history.md) |
| Linked filters on Object Storage v1 | **100,000** objects | [03-04](../03-workshop-widgets/04-filtering-widgets.md) |
| Comment attachments | **200 MB** | [03-05](../03-workshop-widgets/05-buttons-forms-and-navigation.md) |
| Bidirectional iframe object sets | **10,000** objects; no structs | [03-06](../03-workshop-widgets/06-ai-observability-and-embedding.md) |
| Auto-refresh minimum interval | At least **10 seconds** | [04-02](../04-workshop-in-production/02-performance.md) |
| Usage metrics | Up to **24 hours** delay; periods **7, 30, 90** days | [04-02](../04-workshop-in-production/02-performance.md) |
| Mobile Navigation Bar | Up to **four** items | [04-05](../04-workshop-in-production/05-mobile.md) |
| Workshop Scenarios [Legacy] | **30,000** edits, **50** actions per scenario; more than **10,000** objects loaded errors | [04-06](../04-workshop-in-production/06-edge-cases-and-legacy-scenarios.md) |
| Design checklist | Whitespace **30–40%**; touch targets at least **30 px** | [01-05](../01-workshop-foundations/05-design-best-practices.md) |

## Slate

| What | Value | Note |
|---|---|---|
| App configuration size | **2,000,000** bytes of JSON (2 MB) | [05-03](../05-slate/03-functions-variables-and-handlebars.md#variables), [05-06](../05-slate/06-troubleshooting-and-query-performance.md) |
| User storage variable | **10 kB** | [05-03](../05-slate/03-functions-variables-and-handlebars.md#variables) |
| Query result size | **5,000,000** bytes; over it, the query fails | [05-02](../05-slate/02-reading-and-writing-data.md#queries) |
| Client-side query timeout | **20 s** | [05-06](../05-slate/06-troubleshooting-and-query-performance.md) |
| Concurrent queries in Chrome | **6** | [05-03](../05-slate/03-functions-variables-and-handlebars.md#the-dependency-graph) |
| Postgate pool | **10** connections per user; **5 s** wait before a queued query times out | [05-06](../05-slate/06-troubleshooting-and-query-performance.md) |
| Query round trip (FAQ) and Postgres target | Under **5 s**; **500 ms** or less under 10 million records | [05-06](../05-slate/06-troubleshooting-and-query-performance.md) |
| Events before refactoring | More than **50** | [05-04](../05-slate/04-events-and-interaction.md) |
| Textarea debounce | **0.5 s** | [05-05](../05-slate/05-styles-and-widgets.md) |
| Rows a browser holds | About **5–10k** | [05-05](../05-slate/05-styles-and-widgets.md#tables-and-maps) |
| Map slowdown | Shape layers about **1,000** features; location layers **5,000–10,000** points | [05-05](../05-slate/05-styles-and-widgets.md#tables-and-maps) |
| Container nesting | No more than **3 or 4** levels | [05-05](../05-slate/05-styles-and-widgets.md#layout) |

## OSDK React, custom widgets and Pilot

| What | Value | Note |
|---|---|---|
| PR preview availability | **7 days** after the pull request is created | [06-01](../06-osdk-react-and-custom-widgets/01-osdk-react-apps.md) |
| Widgets per widget set | **50** | [06-03](../06-osdk-react-and-custom-widgets/03-custom-widget-sets.md) |
| Parameters and events per widget | **50** each | [06-04](../06-osdk-react-and-custom-widgets/04-custom-widgets-in-workshop.md) |
| Dev mode session | Expires after **24 hours** | [06-03](../06-osdk-react-and-custom-widgets/03-custom-widget-sets.md) |
| Default Node.js in the Foundry environment | **18.20.8** | [06-03](../06-osdk-react-and-custom-widgets/03-custom-widget-sets.md) |
| Plugin versions | Dev-mode parameter changes: `@osdk/widget.vite-plugin` **3.34.0**; Marketplace: **3.1.0**; auto sizing: `@osdk/widget.client-react` **3.3.0** | [06-03](../06-osdk-react-and-custom-widgets/03-custom-widget-sets.md), [06-04](../06-osdk-react-and-custom-widgets/04-custom-widgets-in-workshop.md) |
| Pilot diagnostics | Last **500** log lines | [07-01](../07-pilot/01-what-pilot-is.md) |

## Automate

| What | Value | Note |
|---|---|---|
| Objects per live evaluation | **10,000** | [08-06](../08-automate/06-operating-automations.md#limits) |
| Objects per scheduled evaluation, per-object execution | **10,000** | same |
| Scheduled *added*/*removed* input | **100,000** | same |
| *Run on all objects* input | **1,000,000** | same |
| Manual execution set | **5,000,000** | same |
| Batch size | **1,000** | same |
| Recipients | **10,000** | same |
| Scenarios tracked | **100** | same |
| Execution queue wait | **45 min** | same |
| Event runtime; function effect runtime | **4 hours** | same, [08-03](../08-automate/03-effects.md) |
| Cron frequency | Once a minute; once every **5 minutes** with a function | [08-02](../08-automate/02-conditions.md#time) |
| Dataset row-count threshold | **0–300** | [08-02](../08-automate/02-conditions.md#dataset-conditions) |
| Streaming dataset throughput | **200** records per second | [08-02](../08-automate/02-conditions.md#streams) |
| Allowed cycles | **50** | [08-02](../08-automate/02-conditions.md#condition-settings) |
| Logic parallelization default | Groups of **20** | [08-03](../08-automate/03-effects.md) |
| Dataset preview rows in email | **50** | [08-03](../08-automate/03-effects.md#notifications) |
| Event retries | **1–5**, interval under **24 hours** | [08-04](../08-automate/04-execution-settings.md#retries) |
| Auto-mute | All effects fail in **80%** of the last **30** events | [08-04](../08-automate/04-execution-settings.md#muting-pausing-and-expiration) |
| Expiration | At most **six months** ahead (conflicts with the *Indefinitely* option: RQ-09) | same |
| History retention | **Six months** | [08-05](../08-automate/05-security-ownership-and-history.md) |
| Manual-execution batches | Scheduled **1 minute** apart | [08-01](../08-automate/01-automate-concepts.md) |
| Backlog before normal processing | Under about **100,000** objects | [08-01](../08-automate/01-automate-concepts.md) |
| Performance example | 100,000 evaluations a day → **288** with a 5-minute cap | [08-06](../08-automate/06-operating-automations.md#performance-three-levers) |

## Workflow tools

| What | Value | Note |
|---|---|---|
| Workflow Lineage auto-expansion from Workshop or third-party apps | About **800** nodes | [10-01](../10-workflow-tools/01-workflow-lineage.md) |
| Autopilot state transitions shown | Last **100** edits | [10-02](../10-workflow-tools/02-autopilot.md) |
| Solution Designer PNG export | **2×** zoom | [10-03](../10-workflow-tools/03-solution-designer-and-workflow-builder.md) |

---
[Module index](README.md) · [Decision guide](decision-guide.md) · [Docs index](docs-index.md)
