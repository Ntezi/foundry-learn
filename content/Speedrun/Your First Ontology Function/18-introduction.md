# 18 — Introduction

## From comparison to change over time

The table answers “Which clinic has a high DSO now?” It cannot tell you whether the clinic has improved or deteriorated. A clinic at 38 days may have improved from 50, while another at 33 may have worsened from 20. The same present value can lead to different conversations depending on its history.

The chart adds time as an explicit dimension. Instead of one value per clinic, the function returns one value for each observed month, optionally scoped to the active clinic. For a software engineer, this is another response adapter around the domain calculation: the chart needs a time bucket and a numeric measure, not an arbitrary JSON object.

## What one bar means

Each bar is a countback DSO calculation starting in that bar's month and looking backward through available months. It is not the amount billed that month, a count of Financial records, or the percentage change from the previous bar. The name “month-over-month” here describes a monthly series; the function does not calculate a percent-change formula.

For the June/May teaching example, June starts with June's billed amount and can consume June then May collections. May starts with May's billed amount and cannot use June collections, which are later than its starting period. This restriction preserves the direction of the calculation.

The x-axis therefore carries a business meaning: “the starting period for this calculation.” The y-axis is Days. A clear chart title should also identify which clinic or overall scope is being shown.

## A historical-looking chart may still be recomputed

The function reads the data available when it runs. It does not, by itself, retrieve a stored copy of what the application displayed at each month-end. If older Financial records are corrected, a bar for an older month may change on recomputation.

That may be exactly what you want for an updated analytical view. If the question is “What value did the manager approve on June 30?”, you need evidence of that earlier decision or a snapshot. A live historical series and an audit history answer different questions.

## Watch the edges of the series

The oldest observed month has the least earlier history available. Its value can therefore be limited by history exhaustion. An apparently improving trend might partly reflect incomplete inputs rather than better performance. Likewise, the current month may be incomplete, and the code does not automatically wait for the accounting period to close.

An absent month is also different from a zero-height bar. The code iterates observed month keys; it does not automatically insert missing calendar months. A later product design should decide whether to show a gap, warning, or other explicit state. Do not silently interpolate values as though they were measured.

**What to remember:** a time axis gives a result context, but does not make it historically authoritative. Before interpreting a trend, establish scope, period completeness, available history and whether the values are recomputed. The next lesson traces the actual function and its timestamp construction.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131563) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course-specific procedures use the official text inspected in this study session; column code, formatting screenshots, monthly code and edit code were rechecked for this half. Examples and design alternatives are explanatory additions. Local JavaScript checks are distinguished from Foundry execution. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-second-half-depth/notes-before-depth-revision.tar.gz). [Practice](PRACTICE.md) remains Not Started.
