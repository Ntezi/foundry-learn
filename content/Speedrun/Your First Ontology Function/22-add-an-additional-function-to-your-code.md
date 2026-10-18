# 22 — Add an Additional Function to Your Code

## What the function returns

The course adds `clinicEditFunction.ts`, accepting `Client` and a required Clinic instance. `ClinicEdit = Edits.Object<Clinic>` names the allowed edit entity type, and the function returns `ClinicEdit[]`. It uses `createEditBatch<ClinicEdit>(client)` to collect changes and `getEdits()` to return them.

The return value is an edit description, not a numeric metric. The [TypeScript v2 edit documentation](https://www.palantir.com/docs/foundry/functions/typescript-v2-ontology-edits) distinguishes running a function from applying its edits through an Action. Treat preview output as a proposed change; do not claim an object has been persisted merely because the preview shows new fields. The edit type also does not grant the caller authorization.

## Branch one: end an existing review

The function checks `clinic.underReview === true`. In that branch, it proposes an update with `underReview: false` and `goal: undefined`, then returns the batch immediately. The intended business meaning is “stop reviewing this clinic and remove its review goal.”

The early return matters: it avoids the Financial query and DSO calculation in this branch. The goal is no longer relevant to an active review, so the course does not generate a new one. Later practice must verify that the Action actually clears the goal as intended; an undefined property in code should not be casually equated with every API's null-clearing behavior.

The condition is strict equality with true. A false or undefined value does not take the stop branch. That means an unset review property enters the start path in this snippet. Whether missing state should be accepted this way is a business/data-quality decision to address beyond the demo.

## Branch two: calculate and begin review

The start path creates monthly totals, queries Financial records with a direct clinicName equality filter, and repeats the countback DSO algorithm. It does **not** call the scalar function and does **not** contain the scalar's explicit all-clinics fallback. This distinction was verified against the supplied code. Missing-name filter behavior is an installed-SDK check, not something these notes assume.

Because the algorithm is copied here, changes to the scalar do not automatically update goal generation. This is a practical reason to consider a shared calculation helper after understanding the course: a manager should not see one DSO definition in the chart and receive a goal based on another without an intentional explanation.

The course then proposes review enabled and a goal using a random multiplier from 0.7 inclusive to 0.95 exclusive. With an illustrative DSO of 40, the mathematical range is 28 up to, but excluding, 38. The goal is in Days, just like DSO; it is not a currency amount or a percentage field.

This random policy demonstrates that a function can derive a field before editing it. It does not justify a real target. A real owner would need an explainable rule: which baseline is used, how ambitious the goal should be, who approves it and what happens when the baseline is unreliable. A computed DSO of zero from empty data would otherwise produce a zero goal and could look legitimate.

## Why retries are not harmless here

Imagine an initial state of false. A successful Action starts review and assigns a goal. If an operator later submits the same toggle using the refreshed true state, it ends review. This is a deliberate second transition, not an idempotent repetition of “start review.”

If a first submission times out visually, the operator may not know whether it applied. Blindly clicking again risks an unintended transition. Inspect the Action result and current object state first. Two operators and stale inputs add further uncertainty; the exact runtime concurrency behavior must be tested rather than inferred from this snippet.

Separate Start review and End review commands would communicate intention more clearly. They still need validation, an explicit goal policy and a defined retry/concurrency strategy; merely renaming or splitting a function does not automatically provide idempotency.

## What preview and release establish

The course asks you to preview, commit and release `1.0.3`. Preview can help inspect the target Clinic and proposed fields. A successful release exposes the function for the next lesson's Action configuration. Neither is proof that a governed mutation has been applied.

During [P4](PRACTICE.md#p4), record the target identity, original review/goal fields, returned edits, Action submission and observed final state. Verify a separate stop transition and clearing behavior. These are planned checks; no Clinic has been edited in this revision.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131747) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course-specific procedures use the official text inspected in this study session; column code, formatting screenshots, monthly code and edit code were rechecked for this half. Examples and design alternatives are explanatory additions. Local JavaScript checks are distinguished from Foundry execution. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-second-half-depth/notes-before-depth-revision.tar.gz). [Practice](PRACTICE.md) remains Not Started.
