# 46 — Test the application: prove the intended state transition

The course's test follows the whole user journey in View: filter to one Order, select it, open Assign, enter **Gail Weber**, submit, and inspect the result. Its purpose is to verify that the UI, target binding and Action work together.

Use the course's exact test Order ID:

```text
8d64e941-799c-4e35-b913-d0e3475c307ec206b101-f8b3-4bbe-a1f4-c674dc3124c8
```

A test against an exact identity is stronger than selecting whichever row happens to appear first or searching only by a repeated item name.

## Record the starting state before following the narrative

The course describes changing the assignee from **Alfredo Birns** to **Gail Weber**. The historical training run already found Gail Weber when the form opened. Submitting Gail again therefore did not demonstrate an Alfredo-to-Gail change.

That does not make the observation useless. It can show that the operation was accepted and the expected values remained visible. It simply supports a narrower claim than a changed assignee.

In software testing terms, the fixture state matters. A repeated demonstration can leave data different from the tutorial's original starting condition. Never write the expected “before” value into your evidence without observing it.

## Walk through the test deliberately

1. Confirm the intended module and version in View.
2. Filter Order ID to the exact identifier and inspect the matching result.
3. Select it and record its actual Assignee and Status.
4. Open Assign and confirm the prefilled Order identity matches the selected record.
5. Enter the intended assignee and submit in the authorized training context.
6. Observe the response and inspect that same Order's resulting Assignee and Status.
7. If filters hide it after the status changes, use its exact ID in an appropriate scope to verify the result.

If the starting value already equals the requested value, record that accurately. A separate test of a changed value would need an intentionally chosen training state and appropriate authorization; do not casually alter unrelated Orders merely to recreate a screenshot.

## What the evidence establishes

| Observation | Supported conclusion |
|---|---|
| Assign dialog opens | The button triggers a dialog/operation path. |
| Correct Order is prefilled | The observed selection-to-parameter binding works for this case. |
| Submission succeeds | The operation was accepted for this submission. |
| Same Order shows expected Assignee and Status | The observed object state matches the requested outcome. |
| Only a success notification is captured | The actual target and resulting properties still need verification. |

The historical run recorded a success notification, Assignee Gail Weber and Status assigned. Those are prior observations, not a fresh test performed while rewriting these notes. Current live access and verification remain in the practical evidence record.

## Do not blindly retry an uncertain result

If a submission response is unclear, inspect the target's current state before deciding what to do next. Setting the same values may appear harmless in this simple example, but other Actions can create records or trigger side effects. Do not generalize this tutorial into a claim that every Action is safe to repeat.

**The lesson:** an end-to-end test needs identity, observed before-state, requested change and observed after-state. It also needs an honest statement of what was not tested, including other users, conflicts, notifications and external write-back.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/2015077) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
