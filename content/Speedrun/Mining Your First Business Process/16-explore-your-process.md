# 16 — Explore Your Process

*Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Start with the population and metric

The app has a central Process Explorer graph, a lower Filtered Processes claim table, and a left Filters panel. The source says the filters apply to both other panels. The table may expose Actions, but available Actions depend on the app's configuration; viewing the course did not execute any.

Use Auto-layout under the graph's zoom controls to arrange the graph, then adjust nodes if helpful. Layout changes presentation, not claim histories or business routing. Remove Whitespace is another layout control.

Open **Path explorer** using the list icon at the graph's top right. Hover over a shortened path to see its full sequence. Selecting a path populates the object table with the claims that followed it. Read this as paths represented in the available data and context—not a proof of every theoretically possible future path.

Open **Duration Distribution** below that control and select nodes or edges with Shift-click. The distribution exposes variation hidden by an average. Selected nodes concern time in states; selected edges concern transition timing. Confirm the active metric and its tooltip before comparing values.

## Historical counts are not automatically unique claims

The bottom metrics include Historical Count, Historical Duration, Current Count and Current Duration. The course explicitly explains Historical Count as state-entry occurrences on nodes and transition occurrences on edges. A claim can enter the same state more than once, so a state-entry count is not necessarily a distinct-claim count.

The source's example reports 266 entries into investigation and 16 exits, then identifies 170 non-high-risk claims sent there after filtering. These are supplied training observations, not verified results from your environment. The difference 266−16=250 is a net event-flow difference. Interpreting it as exactly 250 current unique claims also requires consistent boundaries, complete histories and matching semantics. Re-entry, missing earlier events or late exits can complicate that inference.

The introductory source wording calls an average exit time “throughput.” In common operational analysis, throughput usually means completions per unit time, while elapsed time is a duration. For this widget, use its actual selected metric, tooltip and units rather than relying on that ambiguous introductory label. The notes do not invent an exact built-in formula for all duration metrics.

## Test the routing hypothesis

Expand Filters, choose Add filter, select the single property **high-risk**, and select **No**. The supplied scenario says high risk is necessary for entering investigation. Therefore a non-high-risk claim routed there is inconsistent with that scenario's stated rule.

This is a hypothesis about a particular business policy, not a general rule for insurance. Inspect individual histories and check whether the risk flag represents its current value or its value when routing occurred. A flag changed after investigation began can make a current-property filter look like a historical policy violation. Also check null risk values separately: missing is not necessarily false.

The course data was generated in the past, so current duration metrics can become much larger as time passes. Do not present an old fixture's current age as a current production service-level failure.

## Why distributions matter

Synthetic example: four completed investigations take 1, 1, 1 and 21 hours. Their mean is six hours. That average describes none of the individual cases and hides the long tail. A distribution and drill-down identify the exceptional case for investigation. This is a teaching calculation, not a Machinery result.

A useful investigation records the cohort, time coverage, metric and units, suspicious pattern, representative claim histories, and the next evidence needed. Counts help locate work; durations help characterize delay; neither alone proves why the routing logic behaved as it did.

**Review question:** why might filtering current high-risk=false fail to prove a claim was non-high-risk when it entered investigation? The property may have changed since the event; event-time evidence is needed to resolve that.

---
[Official lesson](https://learn.palantir.com/speedrun-mining-your-first-business-process/2102946) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md) · [Later practice](PRACTICE.md)

Course steps are paraphrased. Synthetic examples and engineering checks are teaching additions; no live Foundry implementation is claimed.
