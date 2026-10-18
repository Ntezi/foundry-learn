# 17 — Customizing the Workshop app

*Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Make the signal easy to notice

This lesson adds a graph view named **Total Counts Alert**, using **Current Count** and conditional colours. Despite the name, this is visual formatting in the application. It is not the notification automation taught next. Someone must view the graph to see its colour signal.

The opening mentions aggregating claim values, but the demonstrated metric is a count of objects, not a sum of monetary claim amounts. Keep the unit explicit: 100 claims and a total claim value of 100 are different business measurements.

Enter Workshop edit mode from the top menu, or use Cmd+E on Mac / Ctrl+E where applicable. Select the central Process Explorer widget. In the configuration panel, find Views, choose Add Item and open the new view. Set Label to Total Counts Alert and Metric to Current Count, then configure Conditional Formatting.

## The illustrated rules have boundary gaps

The lesson's screenshots were inspected directly. They show:

| Style intent | Lower bound, inclusive | Upper bound, exclusive | Meaning |
|---|---:|---:|---|
| Success | 0 | 100 | 0 ≤ count < 100 |
| Danger | 101 | 400 | 101 ≤ count < 400 |

For integer counts, 100 matches neither rule. Counts of 400 or more also match neither illustrated rule. Do not describe the second rule as “everything above 100.” A screenshot of a coloured graph is not proof that all relevant values receive a colour.

For learning, reproduce and understand what the source shows, then explicitly decide whether to improve coverage. A possible teaching alternative is Success below 100 and Danger at or above 100, if that is the intended policy and the available rule editor supports it. This alternative is not an official course requirement or a verified configuration in your installation.

Check values 0, 99, 100, 101, 399 and 400. Under the source rules, the first two match Success; 101 and 399 match Danger; 100 and 400 are uncovered. For missing metrics, do not assume “no colour” means healthy. Review fallback formatting separately.

## A threshold needs business meaning

A current count of 250 in investigation might be concerning if the team can handle 50 cases, but ordinary if its designed capacity is much greater. An approved terminal state can hold many completed claims without being a queue bottleneck. Applying the same threshold to every node is a simple demonstration, not a validated operational policy.

Filters also change the population being counted. A quiet colour after narrowing the cohort does not mean the whole process is healthy. Make the active view and filter context clear when interpreting the result.

## Save versus publish

The course opens the app version menu under the title, enables **Automatically publish when saving**, closes the menu, then uses **Save and publish** and **View**. Publishing makes the intended version available to its users; an unsaved or unpublished edit is not evidence of what those users see.

During later practice, record the saved/published version and inspect it in View mode. Automatic publishing is convenient for this training workflow, but it means future saves can also become published changes. Understand that behavior before using it in an application shared with a team. No application setting was changed during note preparation.

**Review question:** why does a red node not mean an email was sent? Conditional formatting changes presentation; sending a notification requires the separate automation and a successful effect.

---
[Official lesson](https://learn.palantir.com/speedrun-mining-your-first-business-process/2102984) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md) · [Later practice](PRACTICE.md)

Course steps are paraphrased. Synthetic examples and engineering checks are teaching additions; no live Foundry implementation is claimed.
