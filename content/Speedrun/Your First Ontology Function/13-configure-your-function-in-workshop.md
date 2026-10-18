# 13 — Bind the function in Workshop: make the numeric result useful

Open the installed **Clinic Finance Tracker** from the course folder and enter Edit mode. Create a variable through **Variables → plus → Numeric → Function**, name it **Days Sales Outstanding**, and select `calculateDaysSalesOutstanding`.

Then select the existing Days Sales Outstanding metric card. In its **Number** configuration, bind **Value** to the numeric variable you just created. The intended first-half result is the function's scalar output displayed as approximately **40.51 Days** for the course's all-clinic example.

## Follow the dependency explicitly

```text
Selected function release + configured inputs
    → numeric variable result
    → metric card Value
    → displayed number and units
```

The function owns the calculation. The variable connects an invocation to the application. The card owns presentation. A variable name matching the card title does not establish the binding; the selected numeric Value does.

This resembles calling a service through a frontend data layer and supplying the result to a display component. If the card uses another variable, correcting the function may have no visible effect.

## Make scope clear before interpreting the result

The lesson's default card is the all-clinic calculation: the optional Clinic input is not bound to a selected clinic in these instructions. Selecting a row or narrowing a nearby table does not automatically change the function's query.

The E2E course taught that table and charts share scope only when their dependencies connect them. The same principle applies here. To create a clinic-specific result later, an input binding must supply the intended Clinic, and the function must interpret that input correctly. Recall that a Clinic lacking a usable name currently falls back to the broader query.

Do not label an all-clinic result as the selected clinic's result merely because it is displayed beside that clinic's details. Layout proximity is not query context.

## Why overall DSO is not necessarily the mean of clinic DSO

The supplied function sums monthly billed and collected values before counting back. The ratio-based calculation is not generally preserved by taking an arithmetic average of separate results.

Here is an invented, single-month example with 30 days and positive collections sufficient to cover each billed total:

| Scope | Billed | Collected | Result under the course's fractional-month rule |
|---|---:|---:|---:|
| Clinic A | 600 | 600 | 30 days |
| Clinic B | 600 | 1,200 | 15 days |
| Combined monthly facts | 1,200 | 1,800 | 20 days |

The simple mean of 30 and 15 is 22.5, whereas the combined calculation gives 20. Neither number should be labelled interchangeably: they describe different calculations. This example teaches the algorithm's aggregation behavior; it is not a finding about the installed clinics or advice on choosing an accounting metric.

## Keep numeric meaning separate from formatting

The reference function result has more precision than the card displays. Presentation can round it to two decimals while the underlying numeric value remains available for other calculations. Returning a preformatted string such as “40.51 Days” would change the function's contract and would not fit the same Numeric variable without a corresponding redesign.

A blank/error state should also be distinguished from numeric zero. In this snippet, an empty query can return zero; the card cannot infer “no data” from a number that carries no reason or status.

## Verify the integration, not just a familiar number

Inspect the selected function and release, its input binding, the numeric variable result and the card's Value. Compare the same scope in preview if you need to investigate a discrepancy. Then check the intended saved/published application context before making a delivery claim; the lesson's immediate configuration result is not a new live verification performed here.

Lessons 01–13 complete the first scalar-function path. You authorized continuation; proceed to [the column module](14-introduction.md) and the [second-half review](SECOND-HALF-REVIEW.md).

**Understanding check:** a table is filtered to Clinic A, but the card shows 20 days in the invented example. Is that automatically wrong? No. Inspect whether the card intentionally invokes the all-clinic calculation. The problem could be unclear labelling or a missing desired input binding rather than incorrect arithmetic.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131635) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; continuation using this approach authorized by the learner. Understanding review remains separate. Course procedures use the official text inspected in this study session; lessons 12–13 were rechecked for this revision. Examples and engineering comparisons are explanatory additions, not executed Foundry results. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-first-half-depth/notes-before-depth-revision.tar.gz). Practice remains [separately tracked](PRACTICE.md).
