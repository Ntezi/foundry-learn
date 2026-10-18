# 02 — Permissions & Help: locate the operation that is blocked

This course needs access to Marketplace, Code Repositories, Ontology Manager and Workshop. It also requires the relevant ability to deploy training assets, create a repository, create the later Action and edit the application. Seeing an app in the menu is not proof that you can perform all those operations.

Think of a backend developer who can inspect a service but cannot deploy it, or an end user who can call an endpoint but cannot edit its source. Authoring and using a capability are different permissions.

## Map access to the workflow

| Stage | What you need to be able to do | What success here does not prove |
|---|---|---|
| Training location | Use a suitable Project/folder | Marketplace deployment will be allowed. |
| Marketplace setup | Install the intended course assets | Every resulting object is available to the execution context. |
| Repository authoring | Create/edit the Functions repository | The published function can be used by every operator. |
| Ontology references | Identify the intended types and generate usable bindings | Generated types grant access to underlying records. |
| Workshop editing | Configure the variable and card | A different user's data access or runtime result is identical. |

The later Action introduces another permission boundary. These first-half notes explain the read-and-calculate path; they do not assume Action application is already available.

## Diagnose by identity, resource and operation

Suppose you can open the repository but its object query fails. Recreating the folder is unlikely to address a data-access failure. First identify the signed-in or effective execution context, the object type being queried and the exact operation that failed.

Preserve the actual error and relevant resource link. “I cannot run this function against the installed Financial type” is more useful than “Foundry does not work.” Then determine whether the failure is discovery, authoring, query execution or release consumption.

The course allows an administrator-created Project or an approved existing Project in place of creating your own. Other required capabilities still need the appropriate access. Use **Support → Training** for enrollment-specific guidance.

## What to infer from a successful preview

A preview that returns a number demonstrates behavior under that preview's inputs and context. It does not establish that the intended operator sees the same data or that Workshop is using the same released function version.

When preview succeeds but the application fails, compare the actual invocation context and resource dependencies before changing the algorithm. Conversely, an incorrect numeric result without an access error can be a scope or logic problem; permissions are not the explanation for every discrepancy.

**Where this reasoning is useful:** shared internal tools, APIs with role-based access, and any platform where the person building an application is not the only person who will run it.

**Understanding check:** why does importing a Clinic type into generated TypeScript not prove that its records are readable? The import describes the schema used by code. Authorization determines which operations and data are available at execution time.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131539) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; continuation using this approach authorized by the learner. Understanding review remains separate. Course procedures use the official text inspected in this study session; lessons 12–13 were rechecked for this revision. Examples and engineering comparisons are explanatory additions, not executed Foundry results. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-first-half-depth/notes-before-depth-revision.tar.gz). Practice remains [separately tracked](PRACTICE.md).
