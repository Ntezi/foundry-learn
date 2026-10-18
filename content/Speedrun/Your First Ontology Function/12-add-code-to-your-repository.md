# 12 — Read, calculate, preview and release the scalar function

Create `calculateDaysSalesOutstanding.ts` under the tutorial repository's `typescript-functions/src/functions/` directory. Use the supplied lesson code, adapting object-type names to the installed SDK exports. This note explains the actual algorithm, including its limits, rather than supplying an unverified replacement implementation.

The official scalar code was reopened and read for this revision. No function was executed in Foundry.

## 1. Read the function contract

The function accepts a Client and an optional typed Clinic instance, and returns `Promise<Double>`.

| Part | Meaning for this exercise |
|---|---|
| Client | The query capability used to access Ontology objects in the execution context. |
| Optional Clinic | A possible scope input; the code then checks its name. |
| Async/Promise | Querying takes place asynchronously; the result becomes available after the calculation finishes. |
| Double | The numeric result exposed by the function contract. |
| Default export | Declares the function for discovery through the course's v2 conventions. |

The returned number is interpreted as days by the application. `Double` itself does not encode “days,” the reporting scope or the validity of the result. Those meanings come from the algorithm and consumer contract.

The Client is a technical dependency, not a clinic selector the manager must fill in. Keep platform execution inputs distinct from the business input the user understands.

## 2. The optional input controls the query through `clinicName`

The code tests whether the optional Clinic has a truthy `clinicName`. If it does, it queries Financial records whose name equals that value. Otherwise it uses an unfiltered Financial query.

| Input condition | Supplied code's scope |
|---|---|
| No Clinic provided | All Financial records available to that query context. |
| Clinic with a nonempty name | Financial records matching that name. |
| Clinic provided, but name missing or empty | Falls back to the all-Financial query. |
| Nonempty name with no matches | Empty matching population. |

“All” does not mean bypassing permissions or obtaining inaccessible data. It means the query has no clinic-name restriction from this branch of the code.

The fallback is a substantive consequence: a caller can supply a Clinic yet receive a wider result than intended. Matching by name also assumes that names identify the intended reporting population. The function does not traverse a Clinic-to-Financial link or validate unique names.

A production revision might reject a missing name or use stable identity, but that would be an intentional behavior change. Do not silently describe those improvements as part of the provided code.

## 3. Query asynchronously and group facts into monthly totals

The code consumes `financials.asyncIter()` with `for await`. This is asynchronous iteration of query results, not a live stream of newly arriving business events and not a scheduler.

For each record, it skips an undefined month. Otherwise it adds billed and collected amounts to the accumulator for that month, substituting zero for missing amounts. The in-memory structure is effectively:

```text
month → { summed billed amount, summed collected amount }
```

Grouping first means that an all-clinic invocation combines Financial values for the same month before computing DSO. It does not calculate one DSO per clinic and average the answers.

The accumulator retains monthly totals, rather than explicitly keeping every raw record in an array. Nevertheless, every matching record must be read. A small output does not make a large query cheap; cost depends on the input population as well as the number of monthly buckets.

## 4. Put months in chronological order

The implementation sorts the month strings newest first using descending string comparison. This works as intended for consistently padded `YYYY-MM` keys: `2026-10` follows `2026-09`. A value such as `2026-2` violates that assumption.

To obtain month length, it separates year and month number, then uses JavaScript's UTC date construction with day zero of the following month. For example, passing year 2026, month index 6 and day 0 gives June 30: JavaScript month indexes start at zero, and day zero selects the preceding month's final day.

Using UTC avoids the local timezone affecting this month-length operation. It does not validate the business reporting calendar, reject malformed period strings or establish that every month is complete.

## 5. Understand the countback loop

The variable named `remainingRevenue` starts from the **newest month's billed total**. For understanding, read it as “remaining amount to cover.” Its name should not distract you from its initialization.

The following is explanatory pseudocode, not drop-in Foundry code:

```text
remaining amount = newest month's billed total, or zero if absent
elapsed days = zero

for each observed month, newest first:
    if that month's collected amount is less than remaining amount:
        add the whole month's day count
        subtract its collected amount from remaining amount
        continue to the previous observed month
    otherwise:
        if collected amount is positive:
            add (remaining amount / collected amount) × month length
        stop

return elapsed days
```

The full-month branch says that this month's collections cannot cover the remaining starting amount. The fractional branch uses only the proportion of the covering month's days needed by the algorithm.

### Work through an invented example

Assume these monthly totals and calendar lengths:

| Month | Days | Billed | Collected |
|---|---:|---:|---:|
| 2026-06 | 30 | 1,200 | 900 |
| 2026-05 | 31 | 800 | 930 |

Start with 1,200, the newest billed total. June's 900 is insufficient, so add 30 days and leave 300. May covers the remaining 300, contributing `300 / 930 × 31 = 10` days. The result is **40 days**.

Notice that May's billed 800 does not reset or increase the remaining amount. The starting balance comes only from the newest billed total. This is a trace of the tutorial algorithm, not an assertion that it represents every approved DSO methodology.

## 6. Read edge cases as part of the contract

| Condition | Behavior in the supplied code | Interpretation risk |
|---|---|---|
| No matching records | Returns zero | Zero can be mistaken for an excellent result rather than unavailable data. |
| Undefined month | Skips that record | Its amounts never contribute. |
| Missing billed/collected amount | Uses zero | Unknown and genuine zero become indistinguishable. |
| Zero collections while a positive amount remains | Adds the entire month, leaves the amount unchanged | The loop continues without resolving the balance. |
| A month is absent from the history | Iterates only the observed months | The missing calendar period is not automatically counted. |
| Available history is exhausted | Returns the accumulated partial day count | No insufficiency flag explains that the amount was not fully covered. |
| Negative or malformed values | No dedicated validation policy is expressed | Arithmetic can run outside the assumed business domain. |

Changing zero to “unknown” requires a supported return contract and a consumer that handles it. A single numeric result cannot communicate an explanation it never returns. Likewise, testing only the course's normal example does not establish behavior for incomplete history.

## 7. Preview, then release the implementation

In the repository's Functions/Live Preview area, select `calculateDaysSalesOutstanding` and run the intended input case. The course expects approximately **40.51456310679612** for its all-clinic example data. That is a reference value, not an observed result from this notes revision.

Inspect a mismatch by comparing the selected types, input scope, reporting data and algorithm. Do not adjust the formula solely to force the reference number.

The course then uses **Source Control → Commit & Sync**, **Tag Version**, a first major release **1.0.0**, and **Tag and Release**. Inspect the Tags/build result and wait for success before selecting the function in Workshop. A commit or created tag alone does not prove the release build succeeded.

**What to retain:** the contract includes query scope, missing-data behavior and history completeness—not just the TypeScript signature. You should be able to predict those behaviors before trusting the displayed number.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131599) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; continuation using this approach authorized by the learner. Understanding review remains separate. Course procedures use the official text inspected in this study session; lessons 12–13 were rechecked for this revision. Examples and engineering comparisons are explanatory additions, not executed Foundry results. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-first-half-depth/notes-before-depth-revision.tar.gz). Practice remains [separately tracked](PRACTICE.md).
