# 02 — Charts and maps

*Sources: [Visualization widgets](https://www.palantir.com/docs/foundry/workshop/widgets-visualization/) · [Chart XY](https://www.palantir.com/docs/foundry/workshop/widgets-chart/) · [Vega Chart](https://www.palantir.com/docs/foundry/workshop/widgets-vega-chart/) · [Pie Chart](https://www.palantir.com/docs/foundry/workshop/widgets-pie-chart/) · [Pivot Table](https://www.palantir.com/docs/foundry/workshop/widgets-pivot-table/) · [Metric Card](https://www.palantir.com/docs/foundry/workshop/widgets-metric-card/) · [Gantt Chart](https://www.palantir.com/docs/foundry/workshop/widgets-gantt-chart/) · [Timeline](https://www.palantir.com/docs/foundry/workshop/widgets-timeline/) · [Map](https://www.palantir.com/docs/foundry/workshop/widgets-map/) · [Map \[Legacy\]](https://www.palantir.com/docs/foundry/workshop/widgets-map-legacy/) · [Time Series Analysis](https://www.palantir.com/docs/foundry/workshop/widget-time-series-analysis/) · [Free-form Analysis](https://www.palantir.com/docs/foundry/workshop/widget-free-form-analysis/) · [Stepper](https://www.palantir.com/docs/foundry/workshop/widgets-stepper/) · [Markdown](https://www.palantir.com/docs/foundry/workshop/widgets-markdown/) · checked October 18, 2026 · Ready for Review*

The visualization family is large; this note covers the charting, mapping and analysis widgets, plus Stepper and Markdown. Media and history widgets are in [03](03-media-documents-and-history.md).

## Which chart

| Question the user asks | Widget | Notes |
|---|---|---|
| How do categories compare? Trend over time? | **Chart XY** (bar, line, scatter) | Layers, segments, multiple series and axes; selection outputs a filter |
| Share of a whole? | **Pie Chart** (pie or donut) | One grouping property; PNG export |
| Totals across two groupings? | **Pivot Table** | Up to seven row groupings, one column grouping |
| What is the number right now? | **Metric Card** | Cards, Tags or List; optional sparkline |
| When does each thing happen, and do they overlap? | **Gantt Chart** | Start and end properties; rows by group |
| In what order did things happen? | **Timeline** | Events from one or more object types |
| Where is it? | **Map** (desktop) or **Map [Legacy]** (mobile, no WebGL) | See below |
| Something none of these draw | **Vega Chart** | Vega or Vega-Lite spec |
| Let users explore on their own | **Free-form Analysis**, **Time Series Analysis** | Quiver-like cards inside the module |

## Chart XY

**[Docs]** Data comes in **layers**; each layer has an input (an object set, or a time series set for line charts), a chart type, an X-axis property, one or more series with an aggregation (count by default; average, min, max, sum, approximate unique count) and an optional **segment by** property. Bars can be stacked, percentage or grouped; lines can be plain, area or stacked area, with null handling *Gap*, *Ignored* or *Zeroes*. Chart-wide settings cover titles, numeric formatting, sorting (A–Z by default, by value, or custom via a numeric sort property), per-series value axes, linear or log scale, bounds, legend and orientation.

**[Docs]** **Selection** on an object-set layer outputs an **object set filter variable** for downstream widgets. At runtime, a date or timestamp X axis with basic aggregation shows a cog for **bucket size** (day, week, month).

**[Docs]** **Function-backed layers** return a `TwoDimensionalAggregation<Key, Value>` or `ThreeDimensionalAggregation<Key, Segment, Value>`. The shape of the returned literal differs: TypeScript v1 wraps buckets in `{ buckets: [...] }`, TypeScript v2 returns the bare array (and uses `groups` for the inner level of a 3D aggregation), Python uses `SingleBucket` and `NestedBucket`. In TypeScript v2, `.aggregate()` returns flat rows that you must turn into buckets yourself, and two `.aggregate()` calls aren't guaranteed to return groups in the same order, so join them on group values. TypeScript v1's `.topValues()` becomes the `exact` strategy with a default of **10,000** buckets instead of 1,000.

## Vega Chart

**[Docs]** Full Vega or **Vega-Lite** (the widget uses Vega-Lite **5.18**). Data comes from an object set with chosen properties, an aggregation, or a **function returning a list of structs**, and is injected into the spec. AIP can draft the spec from a prompt; the Preview tab shows the full spec with data, ready to paste into the online Vega editor.

**[Docs]** Two things to know: **selection parameters** (Vega-Lite only) output an object set filter or a JSON string, but you must add each named parameter to the spec yourself; and a `Long` field is a **string** in TypeScript v2, so use `Double` for anything on a quantitative axis.

## Pivot Table

**[Docs]** Object-backed pivots take one object type; group rows by up to **seven** properties and columns by one, with date bucketing; aggregate by count, cardinality, average, max, min or sum; show totals; and output a **filter** from selected cells. Workshop derived properties can be aggregated here ([02-02](../02-workshop-data-and-logic/02-functions-and-derived-properties.md)). Cmd/Ctrl+C copies the selection as tab-separated values.

**[Docs]** **Function-backed** pivots take an array of structs, each with a `values` field. Omit grouping fields to return totals (omit the row fields for a row total, the column fields for a column total, all for the grand total); return `undefined`, not `''`, for a null bucket. Selection goes to a struct variable.

## Metric Card

**[Docs]** Shows string or numeric **variables**, never data directly, so every metric needs a variable behind it ([01-03](../01-workshop-foundations/03-variables-and-interfaces.md)). Layouts: **Cards** (the only one with sparklines), **Tags**, **List**; sizes Compact, Regular, Large. Per metric: label, description tooltip, numeric formatting (*Fraction digits*), conditional formatting, a secondary metric, a time series sparkline with time range and baseline, and an **interactive metric** that runs a command, action or event on click.

## Gantt Chart and Timeline

**[Docs]** **Gantt**: layers with start and end properties (or *Discrete* for one date), label, grouping, colour (static, Ontology formatting or rules), hover properties, selection output and events, current-time indicator, time zone (static, variable, local), grid markers, and row modes *New rows*, *Overlap* or *Smart rows*.

**[Docs]** **Timeline**: layers of one object type each, ordered by a date or timestamp; vertical or horizontal; newest or oldest first; per-layer titles, properties, colours and icons; active object output; optional time-between-events tooltip.

## Map, and when to use the legacy one

**[Docs]** The **Map** widget has a base map, **object layers** (configured locally, recommended, or from a map template) and **overlay layers**. It renders with MapboxGL and **requires WebGL**; it is built for desktop and **doesn't support mobile**. Selected objects per layer are bidirectional variables. Drawing tools output GeoJSON strings and can select or search objects that intersect a shape; time controls, playback and viewport variables are available. A geoshape property used in a layer geometry loads automatically.

**[Docs]** **Map [Legacy]** gets no new development but is fully supported. The docs' comparison:

| | Map [Legacy] | Map |
|---|---|---|
| Large object sets | Limited | Yes |
| Time-dependent styles | No | Yes |
| Complex geometries performance | No | Yes |
| Mobile | **Yes** | No |
| Without WebGL | **Yes** (falls back to Leaflet) | No |

**[Docs]** Legacy layers: point, cluster, choropleth (including H3 hexagons through a function), line segment, static (GeoJSON or vector tiles) and saved. Point and non-aggregated choropleth layers load at most **10,000** objects. It also has a time stepper and viewport filters that output object set filters.

**[Example]** Kofi's region view uses the **Map** on his desk. His warehouse-floor module ([04-05](../04-workshop-in-production/05-mobile.md)) can't: mobile modules disable the Map widget, so a map there means Map [Legacy].

## Analysis widgets

**[Docs]**

- **Time Series Analysis**: users add time series from the Ontology and derive plots (rolling and periodic aggregates, derivatives, integrals, DSP filters, formulas, Bollinger bands…) and event sets, across canvases. Builders can fix series or event sets with object sets, limit plot types and set the date range. Analyses can be saved as resources and opened in **Quiver** (a one-way copy).
- **Free-form Analysis**: cards over an input object set: metric and text cards, filter and linked-object cards, table and pivot cards, bar, line, pie, heat grid and waterfall charts. Outputs an object set; saved paths can be opened in Quiver or copied to Notepad.

## Stepper and Markdown

**[Docs]** **Stepper** shows a multi-step workflow, **linear** (in order) or **non-linear**; each step has a label, click events and an *is completed* Boolean.

**[Docs]** **Markdown** renders text or a string variable, including tables, task lists and `==highlight==` (one fixed colour). It doesn't render HTML. Two extensions make it interactive:

- **Inline references**: `:objectreference[Alert A00150]{objectType="flight-alert" primaryKey="A00150"}` makes the text selectable as that object, with a highlight colour per object type and selection events.
- **Annotations**: annotation objects with a start index (inclusive) and end index (exclusive) highlight text; users can create new annotations from a selection through an action.

**[Example]** A shift-handover note in the Delivery Desk queue, kept in a string variable, can reference orders inline (`:objectreference[O-10442]{objectType="order" primaryKey="O-10442"}`), so an agent clicking *O-10442* selects that order. The `objectType` value is our placeholder for Order's identifier. The object type must be listed in the widget's configuration, or the reference renders as plain text.

---
[Module index](README.md) · Previous: [01 — Core display widgets](01-core-display-widgets.md) · Next: [03 — Media, documents and history](03-media-documents-and-history.md)
