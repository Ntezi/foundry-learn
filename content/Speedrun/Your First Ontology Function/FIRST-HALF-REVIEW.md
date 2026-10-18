# First-half review: understand the first Ontology Function

Lessons **01–13** have been rewritten for a software engineer new to Foundry. This is half of the 26 numbered lessons and a complete learning segment: prepared Clinic/Financial assets → typed SDK references → scalar calculation → release → Workshop metric card.

**Status: continuation authorized using this explanatory approach.** Lessons 14–26 have now been revised; see the [second-half review](SECOND-HALF-REVIEW.md). Independent understanding and practical execution are not inferred from authorization to continue.

## Where to start

Read [the course index](README.md) in order, or use these representative lessons to check the depth:

- [01 — Where Functions fit](01-course-introduction.md): the relationship to pipeline logic, Workshop and reusable domain services.
- [07 — The supplied data model](07-introduction.md): Clinic entities versus monthly Financial observations, record grain and association by name.
- [11 — SDK bindings](11-add-ontology-object-references-and-generate-the-sdk.md): generated schema versus runtime data, imported names and the two SDK lifecycle modes.
- [12 — The calculation](12-add-code-to-your-repository.md): query scope, asynchronous iteration, grouping, month ordering, the countback loop, edge cases and release.
- [13 — Workshop integration](13-configure-your-function-in-workshop.md): numeric variable binding, all-clinic scope, formatting and why aggregate results differ from an average of clinic results.

Lesson 12 is intentionally longer than the setup lessons. It is the first place where the code's details determine the metric's meaning. Read it in stages and work through the example before comparing with the official snippet.

## Questions to try first

1. What does an Ontology Function add that a table of stored properties does not?
2. What is the difference between a Clinic and a monthly Financial object?
3. Why can importing a generated type succeed while querying its records fails?
4. How would you recognize whether the repository uses the course's manual SDK installation flow or current local SDK generation?
5. What happens when a Clinic is supplied without a usable name?
6. Why does the function group records by month before calculating?
7. In the worked June/May example, why does the result equal 40 days, and why is May's billed amount not added to the balance?
8. What happens when a calendar month is missing, or all available history is insufficient?
9. Why can zero be an ambiguous result?
10. Why is the combined result 20 days in lesson 13 while the mean of the two clinic results is 22.5?
11. Why might a preview work while Workshop cannot discover or display the intended function?
12. Why does selecting a Clinic row not automatically change the metric card's scope?

### Answer guidance

1. It queries modeled entities and implements a reusable calculation or behavior with an explicit input/output contract. The first function returns a calculated scalar rather than simply exposing a stored field.
2. A Clinic is the entity being evaluated; a Financial object is an observation for a reporting period associated with a clinic. One clinic can have several reports across time. Inspect the actual grain and identifiers rather than assuming a row is a clinic.
3. Generated bindings describe schema. Runtime resource identity, data readiness and authorization determine the query's usable data. Compilation is not an access or data-quality check.
4. Inspect the repository's resource/SDK configuration and supported workflow. The course demonstrates version/create/install; local SDKs update from imports and bundle bindings during release. Do not migrate or mix flows just to match a screenshot.
5. The provided truthiness check falls back to the unfiltered Financial query. That is wider than the caller may intend and still subject to the execution context's data access.
6. It needs monthly totals for the countback loop. For an all-clinic invocation, this aggregates facts across clinics before computing the result; it does not average separately computed clinic values.
7. Start with June's billed 1,200. June's collected 900 adds 30 days and leaves 300. May's collected 930 covers 300 in `300 / 930 × 31 = 10` days. Only the newest billed total initializes the amount, so May's billed 800 does not increase it.
8. The code iterates observed month keys only, so a missing calendar month is not automatically counted. Exhausting history returns the accumulated partial result without an explicit insufficiency indicator.
9. No matching records return zero, and missing amounts can be treated as zero. A numeric card cannot distinguish an unknown result from a meaningful zero unless the function/consumer contract supports that distinction.
10. The aggregate calculation is `1200 / 1800 × 30 = 20`. The clinic results are 30 and 15, whose simple mean is 22.5. Aggregating inputs and averaging ratio-based outputs are different operations.
11. Inspect source export/generation compatibility, commit, successful release build, selected function/version, input bindings and the card's numeric variable. A successful preview does not complete those integration steps.
12. The card's function input must be explicitly connected to the intended Clinic context. A nearby table's selection or filter is not automatically an argument to the function.

## One important interpretation boundary

The code uses a countback calculation over monthly billed and collected totals. It does not inspect individual invoice payment dates, so do not describe its output as a verified average of observed invoice settlement durations. Applying this metric outside the tutorial needs agreement on the financial definition, periods, data quality and decision policy.

The 40-day worked example and the 20-versus-22.5 comparison are invented teaching examples. Their arithmetic was checked locally. The course's 40.51456310679612 remains a source reference value, not a Foundry execution result observed in this revision.

## Your review

Please review whether the explanations make the new concepts understandable, especially the SDK, the query scope and the countback loop. Name any point where you still cannot explain why it works, where you would use it, or how to identify an incorrect result.

The second-half revision is now available. Its [review guide](SECOND-HALF-REVIEW.md) records the confirmed screenshot thresholds, local date-check findings and remaining column-input/runtime checks.

## Preservation and practical status

The previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-first-half-depth/notes-before-depth-revision.tar.gz), with [checksums](../../study-backups/2026-09-09/ontology-function-first-half-depth/SHA256SUMS). Learn still shows 26/26 complete; independent understanding and [practical execution](PRACTICE.md) remain separate. No Marketplace installation, repository, release, Workshop edit or Action was executed during this notes revision.
