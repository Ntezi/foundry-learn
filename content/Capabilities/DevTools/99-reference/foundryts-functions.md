# FoundryTS functions

*Sources: the 31 `foundryts.functions` pages linked in the table · checked October 22, 2026 · Ready for Review*

One row per function, in the docs' order. **All descriptions are [Docs] paraphrases.** *Input → output* condenses each page's return type: *series* is a `FunctionNode`, *summary* a `SummarizerNode`, *collection* a `NodeCollection`. Every function is called as `F.name(args)(input)`, where `F` is `foundryts.functions`; how to combine them is in [07-01](../07-foundryts/01-foundryts.md).

| Function | Input → output | What it does | Notes |
|---|---|---|---|
| [`cumulative_aggregate(aggregate)`](https://www.palantir.com/docs/foundry/foundryts/functions-cumulative-aggregate/) | One series → series | Running aggregate from the first point up to each point: `min`, `max`, `count`, `sum`, `product`, `mean`, `standard_deviation`, `difference`, `percent_change`, `first`, `last`, or `time_weighted(...)` | Numeric only |
| [`derivative()`](https://www.palantir.com/docs/foundry/foundryts/functions-derivative/) | One series → series | Per-second rate of change, from the second point on | Numeric only |
| [`distribution(start, end, start_value, end_value, bins)`](https://www.palantir.com/docs/foundry/foundryts/functions-distribution/) | One or more series → summary | Point counts in equal-width value bins (default 10), over the union of all inputs | Numeric only |
| [`dsl(program, labels, before, internal, after)`](https://www.palantir.com/docs/foundry/foundryts/functions-dsl/) | One or more series → series | Applies a Timeseries DSL formula at every timestamp (`a+b`, `a % 2 == 0 ? a : skip`, `isnan(b) ? a : b`), interpolating missing values | Inputs labelled `a`, `b`, … by default; `return_type` deprecated |
| [`exponential_regression(include_multiple, time_unit, start, end)`](https://www.palantir.com/docs/foundry/foundryts/functions-exponential-regression/) | One series → summary | Fits `y = Ae^(Bx)`; returns A, B and their bounds | Numeric only |
| [`first_point()`](https://www.palantir.com/docs/foundry/foundryts/functions-first-point/) | One series → summary | The earliest point; empty for an empty series |  |
| [`integral(method)`](https://www.palantir.com/docs/foundry/foundryts/functions-integral/) | One series → series | Running per-second integral by Riemann sum: `LHS`, `RHS` or `LINEAR` (trapezoidal, default) | Numeric only |
| [`interpolate(before, internal, after, frequency, rename_columns_by, static_column_name)`](https://www.palantir.com/docs/foundry/foundryts/functions-interpolate/) | One or more series → series or collection | Joins series into one with a column each, filling gaps: internal `LINEAR`, `NEAREST`, `PREVIOUS`, `NEXT`, `NONE`; before/after `NEAREST` or `NONE` (default); `frequency` resamples | Never `LINEAR` on enum series |
| [`last_point()`](https://www.palantir.com/docs/foundry/foundryts/functions-last-point/) | One series → summary | The latest point; empty for an empty series |  |
| [`linear_regression(include_intercept, time_unit, start, end)`](https://www.palantir.com/docs/foundry/foundryts/functions-linear-regression/) | One series → summary | Fits `y = Ax + B`; returns slope, intercept, bounds and R² | Numeric only |
| [`mean()`](https://www.palantir.com/docs/foundry/foundryts/functions-mean/) | Collection → series | Mean of all values sharing a timestamp, over the union of timestamps | Numeric only |
| [`periodic_aggregate(aggregate, window, window_type, alignment_timestamp)`](https://www.palantir.com/docs/foundry/foundryts/functions-periodic-aggregate/) | One series → series | Aggregate per fixed window (hourly, daily…); same aggregates as `cumulative_aggregate`; empty windows dropped | `window_type` `end` (default) or `start`; numeric only |
| [`points(*points, name)`](https://www.palantir.com/docs/foundry/foundryts/functions-points/) | — → series | An in-memory series from `(timestamp, value)` tuples, for tests or as a reference series | All values one type |
| [`polynomial_regression(max_degree, time_unit, start, end)`](https://www.palantir.com/docs/foundry/foundryts/functions-polynomial-regression/) | One series → summary | Fits a polynomial up to `max_degree` (default 0); returns the coefficients | Numeric only |
| [`rolling_aggregate(aggregate, window)`](https://www.palantir.com/docs/foundry/foundryts/functions-rolling-aggregate/) | One series → series | Aggregate over a moving window ending at each point; same aggregates as `cumulative_aggregate` | Numeric only |
| [`scale(factor)`](https://www.palantir.com/docs/foundry/foundryts/functions-scale/) | One series → series | Multiplies every value by `factor` | Numeric only |
| [`scatter(start, end, before, internal, after, regression)`](https://www.palantir.com/docs/foundry/foundryts/functions-scatter/) | Two series → summary | Aligned (x, y) pairs from exactly two series, interpolating where timestamps differ; optional regression | Numeric only; `is_truncated` deprecated |
| [`series(*ids)`](https://www.palantir.com/docs/foundry/foundryts/functions-series/) | — → collection | References existing series by series ID |  |
| [`skip_nonfinite()`](https://www.palantir.com/docs/foundry/foundryts/functions-skip-nonfinite/) | One series → series | Drops `inf` and `NaN` points | Numeric only |
| [`statistics(start, end, window, include_std_dev, window_count)`](https://www.palantir.com/docs/foundry/foundryts/functions-statistics/) | One series → summary | Count, mean, earliest, latest, smallest and largest point per window (default: the whole series) | `window_count` works only with `include_std_dev`; numeric only |
| [`sum()`](https://www.palantir.com/docs/foundry/foundryts/functions-sum/) | Collection → series | Sum of all values sharing a timestamp, over the union of timestamps | Numeric only |
| [`time_extent()`](https://www.palantir.com/docs/foundry/foundryts/functions-time-extent/) | One series → summary | The earliest and latest timestamps |  |
| [`time_range(start, end)`](https://www.palantir.com/docs/foundry/foundryts/functions-time-range/) | One series → series | Keeps points from `start` (inclusive) to `end` (exclusive); only those points are read, so queries get cheaper | Integers are nanoseconds; strings parse as pandas Timedelta |
| [`time_series_search(predicate, labels, start, end, interval_values, before, internal, after, min_duration, max_duration)`](https://www.palantir.com/docs/foundry/foundryts/functions-time-series-search/) | One or more series → summary | Intervals where a DSL predicate is true, each with statistics and duration; the docs call them equivalent to Quiver events | Return type printed as `SummaryNode` |
| [`time_shift(duration)`](https://www.palantir.com/docs/foundry/foundryts/functions-time-shift/) | One series → series | Moves every timestamp forward (positive) or back (negative) |  |
| [`time_weighted(aggregate, method, bounds_interpolation)`](https://www.palantir.com/docs/foundry/foundryts/functions-time-weighted/) | — → aggregate spec | Not a node function: an `average` or `integral` that weights each value by how long it held, for the three aggregate functions | `method` `lhs`, `linear` (default), `rhs`; numeric only |
| [`timestamp_scale(factor)`](https://www.palantir.com/docs/foundry/foundryts/functions-timestamp-scale/) | One series → series | Deprecated: now a no-op |  |
| [`udf(func, columns, types)`](https://www.palantir.com/docs/foundry/foundryts/functions-udf/) | Result → any | Runs your own Python on the final dataframe of a query |  |
| [`unit_conversion(from_unit, to_unit)`](https://www.palantir.com/docs/foundry/foundryts/functions-unit-conversion/) | One series → series | Converts values between units of length, temperature, pressure, time and mass | Administrators can extend the unit list; numeric only |
| [`value_shift(delta)`](https://www.palantir.com/docs/foundry/foundryts/functions-value-shift/) | One series → series | Adds `delta` to every value | Numeric only |
| [`where(true, false)`](https://www.palantir.com/docs/foundry/foundryts/functions-where/) | One series → series | Deprecated: transforms non-zero and zero values |  |

**[Explanation]** Functions marked *one series* fail if given a `NodeCollection`: map them over it with `nc.map(...)` ([07-01](../07-foundryts/01-foundryts.md#collections)).

---
[Module index](README.md) · [DevTools home](../README.md)
