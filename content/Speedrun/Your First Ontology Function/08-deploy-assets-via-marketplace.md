# 08 — Deploy the Marketplace assets: install a coherent starting point

Find **Speedrun: Your First Ontology Function** in Marketplace product search. Select the existing course folder, configure the username installation suffix and Ontology entity prefix, inspect validation, then install and wait for the installation and associated builds to finish.

These are the course's planned practical steps. This documentation revision has not performed an installation.

## Why use a bundle here?

The exercise needs compatible data, object types and an application. A bundle delivers those related resources together so the learner can focus on adding reusable logic to an existing workflow.

Think of a sample application distribution that includes fixtures, schema and an interface. It saves setup time, but a successful installation does not establish that you understand the data model or that every dependent resource is ready to query.

In the E2E course, Marketplace was an optional alternative to manual CSV upload. In this course it supplies a broader prepared foundation. Do not carry over the earlier assumption that Marketplace only delivers three files.

## Two naming choices solve different problems

| Choice | Purpose |
|---|---|
| Installation suffix | Helps distinguish your installed resources from other copies. |
| Ontology entity prefix | Distinguishes the installed model entities within the target Ontology context. |

A folder is not a separate Ontology namespace. Two learners using different folders can still need distinct entity identifiers. Conversely, changing a resource label is not the same as selecting a different underlying object type.

The exact installed names matter later: the sample code's Clinic and Financial identifiers may need adaptation to the generated exports. Record those names when inspecting the installation instead of guessing from a screenshot or another learner's prefix.

## Separate installation from usable data

After installation, inspect the resulting resources. Confirm the Clinic and Financial types, their backing data, representative objects and the Clinic Finance Tracker module. Check the relevant build and indexing status when diagnosing missing records.

A type definition may exist before its instances are ready for application queries. An application resource may open before every dependency is accessible. These are separate milestones, just as a deployed backend process can exist before a data migration or seed job finishes.

Validation messages should be understood before continuing. They can reveal a naming conflict or a missing permission that retrying the same install would not solve. Avoid installing another copy merely because one dependent build is still progressing.

## What evidence will be useful later?

Record the installation identity, destination, entity API names and observed readiness. No fixed clinic count is invented here because the training installation has not been inspected live for this exercise.

When the calculation returns an unexpected number, those records help distinguish wrong inputs from wrong code. Reproducing a reference number requires the intended data and model, not just an identical function name.

**Check yourself:** why can a generated Clinic type compile while its query returns no usable records? Schema availability and data readiness/access are different parts of the system.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131548) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; continuation using this approach authorized by the learner. Understanding review remains separate. Course procedures use the official text inspected in this study session; lessons 12–13 were rechecked for this revision. Examples and engineering comparisons are explanatory additions, not executed Foundry results. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-first-half-depth/notes-before-depth-revision.tar.gz). Practice remains [separately tracked](PRACTICE.md).
