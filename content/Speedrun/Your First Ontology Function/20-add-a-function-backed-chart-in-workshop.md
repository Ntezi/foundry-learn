# 20 — Add a Function-Backed Chart in Workshop

## Make selection an explicit input

This lesson connects the monthly function to a bar chart and binds its Clinic argument to **Clinic Table Active Object**. Selecting a row then supplies context for the trend. Think of this as a reactive dependency: selection state feeds a function input, and the returned aggregation feeds a chart layer.

The important connection is the binding, not the fact that the chart sits beside the table. A nearby widget can remain global if its function input is unset. This explains many dashboards that look coordinated but show inconsistent scopes.

## Walk through the course configuration

After the `1.0.2` release succeeds, return to Workshop and configure the chart's bar layer to use the monthly function. Select the intended function/version and bind the optional Clinic input to the table's active object. Inspect that the chart receives time-range keys and numeric values, then try different clinic selections. The course instructs you to save and publish the application.

Saving the application configuration and publishing the function are separate operations. The first records which UI components and inputs are connected; the second exposes a version of executable code. Both can be correct independently while the chosen binding or version is wrong.

For a beginner, it helps to narrate one interaction: “I activate Clinic A; the input supplies A; the function queries Financial records matching A's name; it creates monthly buckets; the chart renders those buckets.” If you cannot identify one link in that sentence, investigate it before styling the chart.

## Predict the three scope cases

With a clinic that has a usable name, the course function filters by that name. With the optional input genuinely unset, it follows its overall-data branch. With a supplied clinic whose name is absent or empty, it also follows that overall branch. The last case is easy to miss because the table can visibly highlight a clinic while the function uses all clinics.

A table may automatically activate a row, so “I did not click anything” is not sufficient evidence that the input is unset. Inspect the actual variable value. Active object is also conceptually different from a collection of checked rows; the tutorial's function accepts one optional Clinic, not an arbitrary multi-selection.

Filtering the visible table is another operation again. Unless the function receives and uses the filter's scope, it does not automatically restrict the Financial query. Keep the chart title and metric-card label clear if one is clinic-specific and the other is overall.

## Verify the meaning before the appearance

Use the same clinic and unchanged data to compare the latest chart point with that clinic's scalar result. A mismatch should lead you to inspect scope, source data and function versions. It is not automatically a chart rendering defect.

Then inspect actual bucket boundaries and the axis display timezone. UTC midnight is an unambiguous instant, but a viewer's timezone can display it on the prior calendar date. A monthly axis should communicate the intended reporting period rather than an accidental local-date label.

**Review scenario:** changing rows leaves the chart unchanged. Check the active-object variable, its binding, the supplied clinicName and the selected release before rewriting the aggregation. Later [P3](PRACTICE.md#p3) records two clinic selections and a verified unset-input case; no interaction has been performed in Foundry during this note revision.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131744) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course-specific procedures use the official text inspected in this study session; column code, formatting screenshots, monthly code and edit code were rechecked for this half. Examples and design alternatives are explanatory additions. Local JavaScript checks are distinguished from Foundry execution. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-second-half-depth/notes-before-depth-revision.tar.gz). [Practice](PRACTICE.md) remains Not Started.
