# 28 — Create filters: make one decision control the right widgets

The worker should not have to scan every Order to find relevant work. The Filter List lets them express criteria, such as a particular customer or status. The critical configuration is how those criteria become a filtered object set used by the table and later charts.

## Follow the dependency, not just the widget

```text
Base Orders ───────────────────────┐
     │                             │
     └→ Filter List → Order Filters│
                        │          │
                        └──────────┴→ Filtered Orders → Table + charts
```

The Filter List's output is the filter criteria. It is not itself the resulting collection of Orders. The filtered object-set definition combines the base population with those criteria.

This resembles derived frontend state: you maintain the user's choices and derive the visible query from them. You do not expect a dropdown to update an unrelated table merely because both are on the same screen.

## Configure the course flow

1. Add **Filter List** and use the base Orders variable as its input.
2. Configure the property filters. The recorded tutorial configuration exposes all eleven Order properties and allows filters to be added or removed.
3. Name its output **Order Filters**. The lesson text also uses “Order Filter”; choose the actual variable you created instead of inventing a second variable to match a spelling variation.
4. Create **Filtered [username] Orders** as an object-set definition using the intended Orders and that filter output.
5. Replace the table's input with this filtered set.

The recorded panel is labelled **Filter [username] Orders**, contained and collapsible. Those choices organize the controls; the variable binding makes them functional.

## Work through a small example

Suppose an invented base population contains 100 Orders, with 30 having status `assigned`. Choosing that status should produce a filtered set of those 30 records. The table and status chart should both use that same set if they are meant to describe the current filtered workload.

If the table shows 30 but a chart still summarizes 100, inspect the chart's input variable. This can be a valid intentional global comparison, but it would need an explicit label. It is not the intended shared-filter design here.

Keeping the Filter List based on the broader set also gives the controls a sensible starting population. Feeding a narrowed result back into its own filtering path can create circular dependencies or confusing choices. Inspect the configured graph instead of guessing from what appears on screen.

## A filter does not authorize access

Filtering to your own Orders is a convenience for finding work. It is not a security policy preventing access to other Orders. Real access restrictions belong in the applicable permissions and object security design.

Also distinguish a zero-result state from a failed query. “No Orders match these criteria” is a meaningful result; a permission or loading error is a different condition. The interface should not make them indistinguishable.

**Understanding check:** the filter controls visibly change but the table does not. Where do you look first? Inspect the filter output, its use in the filtered-set definition and the table's selected input. Those are the three links that connect the interaction to the result.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/2289491) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
