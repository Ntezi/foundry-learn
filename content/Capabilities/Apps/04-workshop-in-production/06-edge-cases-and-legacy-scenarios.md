# 06 — Edge cases and legacy scenarios

*Sources: [Time series properties](https://www.palantir.com/docs/foundry/workshop/time-series-properties/) · [Unsupported object property types](https://www.palantir.com/docs/foundry/workshop/unsupported-object-properties/) · [Scenarios \[Legacy\]](https://www.palantir.com/docs/foundry/workshop/scenarios-overview/) · [Getting started](https://www.palantir.com/docs/foundry/workshop/scenarios-getting-started/) · [Core concepts and limitations](https://www.palantir.com/docs/foundry/workshop/scenarios-concepts/) · [Configure a domain](https://www.palantir.com/docs/foundry/workshop/scenarios-configure-domain/) · [Save scenarios](https://www.palantir.com/docs/foundry/workshop/scenarios-save/) · [Load scenarios](https://www.palantir.com/docs/foundry/workshop/scenarios-load/) · [Apply scenarios](https://www.palantir.com/docs/foundry/workshop/scenarios-apply/) · [Scenario Manager](https://www.palantir.com/docs/foundry/workshop/widgets-scenario-manager/) · [Scenario Selector](https://www.palantir.com/docs/foundry/workshop/widgets-scenario-selector/) · [Scenario Summary](https://www.palantir.com/docs/foundry/workshop/widgets-scenario-summary/) · checked October 18, 2026 · Ready for Review*

Three topics that sit at the edges of everyday Workshop: **time series** properties, property types Workshop **won't load by default**, and the **legacy** Workshop scenarios feature.

## Time series properties

**[Docs]** A time series property stores a history of timestamped values (it needs time series services, which may not be installed). Workshop uses them in **Chart XY, Map, Metric Card and Object Table**, through *time series set* variables or directly on objects. Three building blocks recur across those widgets:

**Transforms** turn one series into another, and can be chained:

| Transform | Produces |
|---|---|
| Aggregate | Cumulative, periodic (windows aligned to a timestamp) or rolling windows |
| Derivative | Rate of change, scaled to a chosen time unit (cases/day → cases/week) |
| Integral | Area under the curve (kW → kWh), linear, left- or right-hand sum |
| Formula | A formula over several input series |
| Time range / Time shift | A filtered or shifted series |

**Summarizers** turn a series into one number: **Single value** (one aggregation over a time range) or **Value change** (the difference between two). Aggregations: average, count, difference, first, integral, last, min, max, product, relative difference, standard deviation, sum, time-weighted average (for irregular sampling).

**Time ranges** are **exact** or **relative**. A relative range's *now* is fixed when first needed and stays until the page reloads, so all widgets agree with each other.

**Baselines** (Object Table, Metric Card sparklines) are a static value, a numeric property, or a time series summarizer.

**[Example]** Kestrel's refrigerated vans carry a temperature sensor linked to `Vehicle` ([Ontology 15-01](../../Ontology/15-advanced-patterns/01-events-history-and-time.md)). An Object Table of vans can show its latest reading with a *Last* summarizer, a sparkline over the last 24 hours (relative), and a static baseline at the cold-chain limit.

## Property types Workshop won't load by default

**[Docs]** **Geoshape** (large coordinate JSON) and **vector** (large float arrays) are "generally unsupported". Object List and Property List show a **Load** button, the Object Table a "…" button, to load one value on demand; the **Map** loads geoshapes automatically. Builders see a warning icon on these properties. "Complex non-performant object properties" also can't be variables ([01-03](../01-workshop-foundations/03-variables-and-interfaces.md)).

## Workshop scenarios [Legacy]

**[Docs]** Workshop scenarios are **legacy**: fully supported, no new development, and the docs recommend **Ontology scenarios** for new modules. The design using Ontology scenarios for Kestrel (Kofi's dock-closure plan) is in [Ontology 15-02](../../Ontology/15-advanced-patterns/02-scenarios.md). What follows is enough to recognise and maintain an existing legacy module.

**[Docs]** A scenario is an immutable **fork** of Ontology data made by applying actions and evaluating **models** (wrapped in functions, used in function-backed actions). A model is evaluated over a **domain**, a set of objects whose results must be independent of each other. To *change* a scenario, create a new one (or duplicate it).

| Piece | Role |
|---|---|
| **Scenario Manager** widget | Create, edit, delete scenarios; static (saved) and dynamic lists; outputs the active scenario; configures models and domains |
| **Scenario Selector** widget | Pick one scenario or several from a list without creating them |
| **Scenario Summary** widget | The actions in a scenario; remove or undo them |
| Scenario-aware widgets | Object Table and Chart XY compare scenarios side by side; Property List, Links, Gantt and Timeline can load from one; aggregations and property variables take a scenario |
| Button Group | *Apply to Scenario* for actions; *Save Scenario* and *Apply scenario* events |

**[Docs]** Limits: at most **30,000** edits and **50** actions per scenario; loading more than **10,000** objects inside a scenario errors; attachment properties aren't supported; action and function limits still apply.

**[Docs]** Scenarios are **temporary** unless saved. Saving needs an object type with an ID property typed `scenarios:versioned-scenario-rid` and a name typed `scenarios:scenario-name`, plus create and update actions (the update action's object parameter typed `scenarios:scenario-object-locator`). Saved scenarios load back through a scenario array variable *loaded from object set*. **Applying** runs the scenario's actions on the Ontology **transactionally** (all or none); model results aren't applied; an optional apply action's criteria control who may apply. Saving scenarios as a viewer can need a custom "Viewer with Create Scenarios" role from Palantir.

**[Docs]** Marketplace packaging doesn't support static or object-backed scenarios ([01](01-publishing-versions-and-branching.md#packaging-with-marketplace)).

---
[Module index](README.md) · Previous: [05 — Mobile](05-mobile.md) · Next module: [05 — Slate](../05-slate/README.md)
