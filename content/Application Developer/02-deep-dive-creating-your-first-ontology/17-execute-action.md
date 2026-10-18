# Lesson 17 — Execute Your Action

## Execution result

Completed in Foundry on 2026-08-28:

- Object: `Late Arrival for HA29 (SEA-OGG) @ 2023-02-19T0950`
- Flight Alert Id: `2023-02-19-HA-29-SEA-OGG-0950`
- Action: `[Marius] Assign root cause`
- Root Cause submitted: `Waiting for gate assignment upon arrival`
- Verification: the object view displays the new value and Foundry reported `Edits successfully applied.`
- Link verification: the alert resolves to exactly one `[OFT] Flight`

## Course Essentials
Open one of the new Flight Alert objects, invoke `[username] Assign root cause`, enter a sample cause such as “Waiting for gate assignment upon arrival,” submit, and verify the Root Cause changed.

## What happens under the hood
The form binds an object identity and parameter value to the action. Submission criteria and validation are checked, action rules run, the edit is persisted, indexes/views refresh, and logging may record actor, time, and outcome.

## Verification
A success toast alone is insufficient. Confirm the target object changed, the intended value is visible, no unrelated property changed, the audit record exists where configured, and downstream consumers observe the update.

## Practical Ontology Engineering
Consider concurrency: two operators may assign different causes. Choose last-write-wins, optimistic locking, approval, or an explicit conflict workflow. Consider idempotency and distinguish “retry the same command” from “make a second decision.”

## Deep Understanding Check
How would you prevent an already-resolved alert from receiving an incompatible root-cause update?
