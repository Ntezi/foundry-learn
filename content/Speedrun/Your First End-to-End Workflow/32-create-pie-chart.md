# 32 — Create the status pie chart: summarize the current population

Add a **Pie chart** using **Filtered [username] Orders**, group by **Status**, and show the legend. The purpose is to summarize how the currently relevant Orders are distributed across workflow states.

A chart is an aggregation: it combines individual records into a summary. Before interpreting its shape, establish the population and measure it represents.

## An invented example you can calculate yourself

Suppose the filtered set contains twelve Orders:

| Status | Number of Orders | Share of these twelve |
|---|---:|---:|
| open | 3 | 25% |
| assigned | 6 | 50% |
| closed | 3 | 25% |

A status-count pie chart should show the assigned category as half of this population. It should not show half the revenue or half the total item quantity. Those would require different measures and could produce very different results.

One Order with quantity 100 contributes one Order to a count, just as an Order with quantity 1 does. This connects the visualization back to the data grain established in lesson 03.

## Configure the source before interpreting the picture

Use the same filtered object set as the table and inspect the chart's aggregation configuration. The course intends a status distribution of Orders. Confirm that the displayed values represent the intended count rather than assuming that any pie over Status must use the right measure.

The legend lets a reader identify categories. Color without a label is insufficient: a reader needs to know which slice means assigned, and category colors should be interpreted consistently when compared with other views.

With a one-customer filter applied, both table and chart should describe that customer's Orders. If the chart still describes the whole base set, it can mislead a worker into thinking their current subset has the company's overall status mix.

## What the pie can and cannot tell you

It can show proportions within the current scope. It cannot by itself tell you whether there are five Orders or five thousand unless counts are also visible, and it does not explain why a status has that share.

A large assigned share might mean ownership is well distributed, or it might mean work has been assigned but remains unfulfilled. You need timing and process context to interpret it. The next chart introduces the due-day dimension.

For your own application, a different chart may be easier when there are many statuses or similar-sized categories. The course uses a pie to introduce grouped visualization; learning its meaning matters more than treating it as the universal best chart.

## Verify by narrowing the question

Apply a filter for a known status and inspect whether the table records and chart summary agree. Also observe the no-match state: an empty set should not be interpreted as a healthy zero-workload result if the underlying query actually failed.

**Remember:** a percentage always has a denominator. Here the denominator is the current filtered Order population, not every order ever placed and not necessarily every order in the company.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792188) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
