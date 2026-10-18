# 19 — Add an Additional Function to Your Code

## The new output contract

The course adds `calculateDaysSalesOutstandingMoM.ts`. Its function accepts `Client` and an optional Clinic and returns `TwoDimensionalAggregation<Range<TimestampISOString>, Double>`. Read that type from the inside out: each key describes a timestamp range, each value is a number, and the aggregation contains the resulting buckets.

The shape carries information the chart needs. A label such as “June” is ambiguous across years; a UTC start and end identify a particular month. The intended monthly interval is half-open: include its start, exclude the next month's start. Adjacent periods can then share a boundary without assigning the same instant to both.

## Trace the calculation in two stages

First, the function builds monthly billed and collected totals. A truthy `clinic?.clinicName` selects matching Financial records; otherwise it queries all Financial records. This is the same explicit scope fallback as the scalar function. Supplying a Clinic with an empty name can therefore produce an overall result rather than a clinic result. Missing month values are skipped only when undefined; missing amounts use zero. These are source behaviors, not comprehensive validation.

Second, it sorts the observed month keys descending and runs an outer loop over possible starting months. For each starting month, it initializes the remaining amount from that month's billed total, then runs an inner loop backward from that position. Earlier months contribute their day counts or a fractional final month until the amount is covered or the available history ends.

The outer loop creates the series. The inner loop calculates one point. This separation is useful when debugging: wrong values across all buckets suggest calculation or scope trouble; plausible values attached to wrong months suggest bucket construction or ordering trouble.

## A two-point worked example

Use invented data: June 2026 billed 1,200, collected 900; May 2026 billed 800, collected 930.

For June, 900 is insufficient to cover 1,200. Add June's 30 days and carry 300 backward. May covers the remainder, contributing 300/930 × 31 = 10 days. June's result is 40.

For May, start again with **800**, not June's 1,200 or the previous loop's remainder. May's collections cover it, giving 800/930 × 31 ≈ 26.67 days. No June collections participate in this May calculation. The two points are therefore June → 40 and May → approximately 26.67.

These are absolute DSO values. The change from May to June is another calculation, not the returned y-value. Also remember the scalar for all clinics cannot generally be reconstructed as an unweighted mean of per-clinic results.

## The timestamp concern, now tested locally

The supplied code expects month strings like `YYYY-MM`, but constructs a date with ``new Date(`${startMonth}T00:00:00.000Z`)``, without an explicit day. Earlier notes correctly flagged this for investigation, but it should not be described as a proven runtime failure.

A local Node check during this revision accepted `2026-06T00:00:00.000Z`, `2026-12T00:00:00.000Z` and `2028-02T00:00:00.000Z` as the first day of those months. **Therefore the missing day did not produce Invalid Date in the tested local runtime.** This does not verify the deployed Foundry runtime or arbitrary input strings.

A clearer candidate for canonical validated month input is to include `-01` explicitly. This explanatory fragment is not a deployed patch:

```typescript
const start = new Date(`${month}-01T00:00:00.000Z`);
const end = new Date(start);
end.setUTCMonth(end.getUTCMonth() + 1);
```

Validate the input format and month range before this step, and verify finite timestamps before serializing. A regex shape check alone does not make month 13 valid. The local explicit-date check produced June 1 → July 1 (30 days), December 1 → January 1 (31 days), and February 1 → March 1 in 2028 (29 days). These checks establish local JavaScript behavior only; inspect actual returned buckets in Function Preview later.

## Cost and confidence are separate concerns

With M observed months, the nested countback loops can perform O(M²) work in the worst case after data retrieval. That is easy to overlook because a short history runs quickly. More urgent for interpretation, the oldest points have less available history, entirely absent months are not inserted, and incomplete periods are not excluded automatically.

Do not optimize an unclear metric first. Establish its business definition, missing-data behavior and expected results, then measure performance at realistic scale.

The course previews the aggregation, commits and releases `1.0.2`. During [P3](PRACTICE.md#p3), verify one hand-calculated point, actual start/end timestamps, ordering, selected-clinic scope and empty data before configuring the chart. Record any correction separately from the original snippet.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131743) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course-specific procedures use the official text inspected in this study session; column code, formatting screenshots, monthly code and edit code were rechecked for this half. Examples and design alternatives are explanatory additions. Local JavaScript checks are distinguished from Foundry execution. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-second-half-depth/notes-before-depth-revision.tar.gz). [Practice](PRACTICE.md) remains Not Started.
