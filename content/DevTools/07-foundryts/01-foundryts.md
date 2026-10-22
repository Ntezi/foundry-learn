# 01 — FoundryTS

*Sources: [FoundryTS: Overview](https://www.palantir.com/docs/foundry/foundryts/overview/) · [FoundryTS](https://www.palantir.com/docs/foundry/foundryts/foundryts/) · [Interval](https://www.palantir.com/docs/foundry/foundryts/interval/) · [NodeCollection](https://www.palantir.com/docs/foundry/foundryts/node-collection/) · [nodes.FunctionNode](https://www.palantir.com/docs/foundry/foundryts/nodes-function-node/) · [nodes.SummarizerNode](https://www.palantir.com/docs/foundry/foundryts/nodes-summarizer-node/) · [objects.FoundryObject](https://www.palantir.com/docs/foundry/foundryts/objects-foundry-object/) · [objects.Object](https://www.palantir.com/docs/foundry/foundryts/objects-object/) · [search.Property](https://www.palantir.com/docs/foundry/foundryts/search-property/) · [search.Search](https://www.palantir.com/docs/foundry/foundryts/search-search/) · [search.ontology](https://www.palantir.com/docs/foundry/foundryts/search-ontology/) · checked October 22, 2026 · Ready for Review*

**[Concept]** **FoundryTS** is "a Python library to run scalable queries against time series data". It reads Foundry's time series storage and uses Foundry's Spark cluster to distribute computations. You build a **lazy query** from series references and functions, and nothing runs until you ask for a dataframe. Time series properties themselves are explained in [Ontology 05-08](../../Ontology/05-properties/08-time-series-media-geo-and-vectors.md) and [15-01](../../Ontology/15-advanced-patterns/01-events-history-and-time.md#q4--time-series); the 31 functions are tabulated in [FoundryTS functions](../99-reference/foundryts-functions.md).

## The pieces

| Piece | What it is |
|---|---|
| `FoundryTS` | The singleton that sends queries to the backend; initialized from environment variables, so you rarely create it yourself |
| `Object`, `FoundryObject` | References to an object type and one object, used to reach a time series property |
| `FunctionNode` | A lazy series: transform it again, or summarize it |
| `SummarizerNode` | A lazy final result (statistics, a distribution, a regression); can't be transformed further |
| `NodeCollection` | Several nodes, passed together or mapped one by one |
| `Interval` | A start (inclusive) and end (exclusive), with optional name and metadata |
| `Search` | Finds series by object properties, through `fts.search` |

## Getting a series

**[Docs]** From an object:

```python
from foundryts.objects import Object

series = Object("aircraft").id("aircraft-1").property("altimeter_series_id")
```

`Object` takes the object type's **ID**, not its API name or RID; `property` takes the **property ID** from the Ontology Manager property editor. Both pages warn about this, because each has three possible references. `dataframe_identifier` names the series in a multi-series result and is needed for complex property types such as templates.

**[Docs]** Other sources: `F.series("id1", "id2")` gives a `NodeCollection` of existing series by series ID; `F.points((timestamp, value), ..., name="…")` makes an in-memory series for testing or as a reference series.

**[Docs]** By search: `fts.search.series(query, object_types=[...], property_type_id=...)` returns a `NodeCollection` of every matching series, up to `max_results` (1 to 10,000; default 10,000). The query compares properties with `ontology("name") == value`.

- Scope it with `object_types`, or it searches all time series objects.
- `property_type_id` is required if an object has several time series properties and no default.
- The properties you filter on must be **searchable**; time series properties aren't.
- Search finds **series**, not values inside them. To find points or periods, use `dsl()` or `time_series_search()`.
- Templates and series written by several syncs (*qualified series IDs*) need `experimental_enable_complex_properties=True`.

## Nodes are lazy

**[Docs]** Every function returns a function to apply: `F.scale(1.5)(series)`. Nodes also have the same functions as methods, so `series.scale(1.5).time_shift(1000)` chains two transforms without running anything. Evaluation happens on output:

| Method | On | Returns |
|---|---|---|
| `to_pandas()` | Both node types | A pandas DataFrame; a summary is flattened to one row per result with dot-separated column names |
| `to_dataframe()` | Both node types | A PySpark DataFrame, for many rows or many results evaluated together |
| `to_dict()`, `to_object()` | `SummarizerNode` | Nested dictionaries or Python objects |
| `columns()`, `types()` | Both node types | The result's column names and types, without evaluating |

## Collections

**[Docs]** A `NodeCollection`'s dataframe gains a **`series`** column (the series ID or the `points` name).

- Functions that take **several** series (`scatter`, `mean`, `sum`, `dsl`, `distribution`) accept a collection.
- Functions that take **one** series fail on a collection: use `nc.map(F.scale(10))` to apply them to each member.
- `nc.map_intervals(intervals)` turns each series into one time range per `Interval`, adding `interval.start` and `interval.end` columns.
- `nc.to_pandas(parallel=4, mode="thread")` evaluates members in parallel (threads or processes), and the combined result must **fit in memory**. `nc.to_dataframe(numPartitions=16)` spreads it over Spark executors; raise `numPartitions` for large collections. `to_rdd` is deprecated.

## Where it runs

**[Docs]** Two places appear in the docs:

- **Code Workspaces** (Jupyter): publish an OSDK with the object type, then `TimeSeries.from_osdk(obj.property)` gives a series with `.node()` and `.to_pandas()` ([05-01](../05-development-environments/01-code-workspaces.md#ontology-models-and-ai)).
- **A Python function**: the `Object` page's example sets `FOUNDRYTS_CODEX_HUB_URIS`, `FOUNDRYTS_ONTOLOGY_METADATA_URIS`, `FOUNDRYTS_OSS_URIS` and `FOUNDRY_AUTH_TOKEN` (from `FOUNDRY_TOKEN`) before creating `FoundryTS()`.

**[Docs]** `TimeSeries.from_osdk` isn't documented in the FoundryTS reference pages ([RQ-08](../SOURCES.md#open-research-questions)).

## The function families

**[Explanation]** The 31 functions fall into a few groups (details in the [reference table](../99-reference/foundryts-functions.md)):

- **Select and reshape:** `time_range`, `time_shift`, `scale`, `value_shift`, `unit_conversion`, `skip_nonfinite`, `interpolate`.
- **Aggregate over time:** `rolling_aggregate`, `periodic_aggregate`, `cumulative_aggregate`, with `time_weighted()` as the aggregate for irregular sampling; `derivative`, `integral`.
- **Combine series:** `mean`, `sum`, `dsl` (formulas such as `a+b` or `isnan(b) ? a : b`), `scatter`.
- **Summarize:** `statistics`, `distribution`, `first_point`, `last_point`, `time_extent`, the three regressions.
- **Find periods:** `time_series_search` returns the intervals where a `dsl` predicate holds, each with statistics; the docs call these intervals "equivalent to events in Quiver".
- **Escape hatch:** `udf` runs your own Python on the final dataframe.

**[Docs]** Most functions are numeric-only. `time_range` makes queries cheaper because only points in the range are read. `timestamp_scale` is a deprecated no-op, and `where` is deprecated.

## For Kestrel

**[Example]** Only refrigerated vans carry a temperature probe, modelled as a sensor object linked to `Vehicle` ([Ontology 15-01](../../Ontology/15-advanced-patterns/01-events-history-and-time.md#q4--time-series)). 15-01 says to turn **threshold crossings** into events, not readings. FoundryTS finds them directly. The sensor type's ID isn't in the Kestrel model; `vehicle-temperature-sensor` below is a placeholder.

```python
from datetime import datetime

import foundryts.functions as F
from foundryts import FoundryTS

fts = FoundryTS()
probes = fts.search.series(object_types=["vehicle-temperature-sensor"])

last_day = probes.map(F.time_range(start=datetime(2026, 10, 21), end=datetime(2026, 10, 22)))
excursions = last_day.map(F.time_series_search(predicate="a > 8", min_duration="10min"))
excursions.to_pandas()   # one row per excursion: series, start, end, duration, max, mean...

hourly = last_day.map(F.periodic_aggregate(F.time_weighted("average"), "1h"))
```

**[Explanation]**

- `time_series_search` with `min_duration` is exactly 15-01's rule, *above 8 °C for 10 minutes*. Each row has the series, the interval and its statistics, ready to become an excursion event.
- A **time-weighted** hourly average suits a probe whose readings may arrive irregularly; a plain `mean` would over-weight bursts.
- `time_range` gets `datetime` objects, not date strings: it reads strings as durations (pandas Timedelta).
- Searching by `object_types` alone needs no searchable property, and finds every probe because only refrigerated vans have one.

**[Example]** The excursions back a planned `TemperatureExcursion` event object linked to `Vehicle`, **adopted** into [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md) on October 22; its key and where the job runs are still open. The FoundryTS pages show Jupyter and a Python function as places to run it, not a transform.

---
[Module index](README.md) · Next module: [08 — Product delivery](../08-product-delivery/README.md)
