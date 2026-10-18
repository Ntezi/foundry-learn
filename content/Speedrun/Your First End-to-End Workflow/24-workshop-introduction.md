# 24 — Workshop introduction: turn Orders into a useful work surface

The data preparation and Order model now have a purpose beyond inspection: help a fulfillment worker decide which order needs attention and what to do about it. Workshop is the application-building tool used for that interface.

Workshop uses object data as its primary application building block, with Actions for changes and Functions for business logic. Its documented application patterns include operational inboxes and task management. [Official Workshop overview](https://www.palantir.com/docs/foundry/workshop/overview).

## Start from the worker's journey

Imagine a worker opening the inbox:

1. Narrow the order population to work that matters now.
2. Scan a table to find a relevant order.
3. Select it and inspect supporting details.
4. Understand the wider workload through charts.
5. Later, assign responsibility and observe the changed state.

The first four activities establish the reading and investigation experience. Later course sections add the assignment Action. The course does not implement a close-order command or external source-system synchronization, even though the broader scenario discusses more operational possibilities.

## Connect this to frontend state you already know

An **object set** describes a collection of Orders. A filter narrows that collection using criteria. A selected object identifies the one Order whose details the user is inspecting.

An illustrative React-style mental model is:

```text
all relevant Orders
   + current filter criteria
   → filtered Orders for the table and summaries

selected Order identity
   → details for that one Order
```

This is explanatory pseudocode, not Workshop API code. The familiar challenge is keeping components tied to the right state. If a chart summarizes all Orders while the table displays a filtered subset, the user may interpret incompatible populations as the same workload. If details use the wrong selection, the user can inspect one order while believing it is another.

The second half will configure these relationships. The point now is to understand why variables and widget inputs matter, rather than seeing them as arbitrary form fields.

## A dashboard becomes operational through a deliberate change

Seeing an unassigned order helps the worker notice a problem. Assigning it changes responsibility. Those are different interactions: the first queries and displays state; the second submits a permitted operation against a particular identity.

This resembles separating a read request from a domain command in a backend. A UI filter is not authorization, and a visible button alone does not establish that the user may apply the corresponding change.

## Where this pattern is useful

Similar interfaces can support ticket triage, claims review or inventory exceptions. The transferable design is a focused path from finding work to inspecting context and performing the appropriate operation. The right layout follows that path; more charts do not automatically make the application more useful.

**First-half review checkpoint.** We have covered setup, ingestion, preparation, the Order model and the purpose of the application. You accepted the explanatory depth and asked to continue. The revised lessons 25–48 now develop the application and Action workflow; use the [second-half review](SECOND-HALF-REVIEW.md) after reading them.

Before proceeding, explain why Workshop needs both a collection of Orders and a selected Order. The collection supports searching and summarizing work; the selected identity focuses details and later operations on one particular entity.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792152) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
