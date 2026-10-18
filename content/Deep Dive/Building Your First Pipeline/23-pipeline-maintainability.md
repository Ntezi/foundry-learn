# 23 — Pipeline Maintainability

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Additional Considerations and Best Practices | 23/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1875656) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## Four areas the course highlights
**[Course]** Future trainings cover maintenance in depth. The key areas to know now:

| Area | What it is | Docs |
|---|---|---|
| **Scheduling** | Refresh data at regular intervals so it stays current with the source; configured inside Pipeline Builder | [Schedules](https://www.palantir.com/docs/foundry/pipeline-builder/schedules-overview/), [scheduling best practices](https://www.palantir.com/docs/foundry/building-pipelines/scheduling-best-practices/) |
| **Branching** | Once several workflows depend on a pipeline, **enforce branching** so changes are developed without destabilizing production | [Branches](https://www.palantir.com/docs/foundry/pipeline-builder/branches-overview/) |
| **Data expectations** | Data-quality checks against predefined criteria (**types, value ranges, uniqueness**) to catch anomalies early | [Data expectations](https://www.palantir.com/docs/foundry/pipeline-builder/dataexpectations-overview/) |
| **Incremental transforms** | Process **only data that changed** since the last run, cutting compute and time on large volumes | [Incremental pipelines](https://www.palantir.com/docs/foundry/building-pipelines/create-incremental-pipeline-pb/) |

## [Docs] Details checked Sep 24
- **Schedules** ([docs](https://www.palantir.com/docs/foundry/pipeline-builder/schedules-overview/)): set inside Pipeline Builder. Triggers can be a **time**, a **data update**, a **logic update**, or a combination.
- **Branches** ([docs](https://www.palantir.com/docs/foundry/pipeline-builder/branches-overview/)): work on a branch, then merge through a **proposal**. A branch can be **protected** so changes need an approved proposal.
- **Data expectations** ([docs](https://www.palantir.com/docs/foundry/pipeline-builder/dataexpectations-overview/)): set **per output**, and **if one fails, the build fails**. Types include **primary key, row count, value is one of, not null, not NaN**, and a row-level condition.
- **Incremental** ([docs](https://www.palantir.com/docs/foundry/building-pipelines/create-incremental-pipeline-pb/)): each build processes only data **added since the last build**. The input must change **only by appending**. Marking a snapshot input incremental has no effect. **Aggregations, windows and pivots see only the new rows.**

## Applying them to this course's pipeline
**[Explanation]** Our design exercise, not course material:
- **Scheduling:** transactions arrive continually. Rebuild CLV daily after the transactions source syncs, ideally triggered by the upstream update rather than a fixed clock time, so it never runs on stale input.
- **Branching:** to fix the bad join in a shared pipeline, work on a **branch**, validate the row count, then merge. This is the Intro course's "branching governs what changes reach production", applied to data.
- **Expectations:** a **primary key** expectation (a documented type) on `transaction_id` in *transactions x products* would have caught lesson 17's bug automatically. Also check `customer_id` uniqueness in clean customers, and no non-null `_error` values after the JSON extraction.
- **Incremental:** transactions are append-only, so they suit incremental processing. The per-customer aggregate still needs care: **[Docs]** in an incremental pipeline an aggregation sees only the new rows, so it would produce totals for *new transactions only*, not updated lifetime totals, unless you design for that. The Data Connection course's question "are updates just new additions, or are existing rows changed?" applies directly.

## Review checklist
- [ ] For each of the four areas, I can say which failure it prevents in *this* pipeline.
- [ ] I can explain why an incremental input doesn't make the aggregate trivially incremental.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [Summary](24-summary.md)
