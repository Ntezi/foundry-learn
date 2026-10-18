# 33 — Create the due-day bar chart: combine timing with status

The status pie chart describes the mix of work. It does not show when that work is due. Add a **Chart XY** with a bar layer over **Filtered [username] Orders**, use **Days Until Due** on the x-axis, segment by **Status**, and choose vertical orientation.

The intended question is: “How is the current order population distributed by due-day value and workflow state?” Inspect the measure and grouping settings so the bars represent the intended Order counts.

## Read the dimensions separately

**Days Until Due** places an Order along the timing dimension. **Status** divides the population into workflow categories. The count summarizes how many Orders contribute to a position or category.

Consider this invented summary:

| Days until due | Open Orders | Assigned Orders | Closed Orders |
|---:|---:|---:|---:|
| -1 | 2 | 1 | 4 |
| 0 | 3 | 5 | 2 |
| 2 | 6 | 3 | 0 |

Under the ordinary meaning of this field, a negative value suggests the due date has passed and zero suggests the reference date is the due date. But you must establish how the source calculated the field before treating those interpretations as a live operational rule.

The two open Orders at -1 could merit investigation. The four closed Orders at -1 should not automatically be counted as outstanding late work. Timing and status together provide context that either field alone lacks.

This example explains interpretation; it is not an observation of the tutorial's current chart or a claim about its exact binning configuration.

## The crucial freshness limitation

`days_until_due` already exists in the supplied CSVs. Neither this chart nor the earlier cleaning pipeline computes it from today's date. It is a stored value from the training snapshot.

A value of 2 today will remain 2 tomorrow if nothing updates the underlying value. Reloading the application may retrieve the same stored 2 again. The fact that the property has an intuitive name does not establish its calculation or reference date.

A real implementation would need to decide whether due days are recomputed during data processing or derived at query/runtime, what timezone defines a day, and whether calendar or working days matter. Those are future design decisions, not features already built by this lesson.

## Compare the chart with the table

Use the same filtered set so both describe the same scope. Select a narrow population and inspect its actual due-day and status values. Compare those with the bars, taking grouping, missing values and any aggregation settings into account.

Vertical orientation controls how the chart is drawn; it does not change the meaning or freshness of the values. A polished axis is not evidence of a valid deadline calculation.

**Where this pattern is useful:** combining a workflow state with a relevant operational dimension—ticket age, delivery deadline or days since a review request. Always trace where the numeric field comes from.

**Understanding check:** a user says the chart is wrong because an Order due yesterday still appears at +2. Which layer should you inspect first? The source and calculation of Days Until Due. Changing the chart's colors or orientation cannot repair a stale measure.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792189) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
