# 14 — Introduction

## Why the metric card is no longer enough

The first half produced one number. A manager can see that overall DSO is high, but still cannot tell which clinic deserves investigation. The next useful question is “How does each clinic compare?” A function-backed column answers it without making the manager select every clinic individually.

For a software engineer, this is a change in API response shape. A scalar endpoint returns one value for one context. A table needs a collection of values with a reliable way to associate each result with its entity. The calculation can remain conceptually the same while its interface changes.

## Identity is part of the answer

Imagine two training clinics: Clinic A has DSO 40; Clinic B has DSO 25. Returning `[40, 25]` assumes the table uses the same order as the function. Sorting the table by name or another property could break that assumption. Returning a mapping from each Clinic object specifier to its DSO carries identity with the result.

An object specifier identifies an Ontology object. It is different from the clinic's display name, which is business data and may be duplicated or changed. In this course, the query uses clinicName to find Financial records, but the output uses the Clinic object specifier to identify the row. Those two roles must not be confused: a correct output key cannot repair Financial records attributed to the wrong clinic.

The conceptual response is “this specific Clinic → 40,” not “the first row → 40.” That is the same reason a frontend usually joins API responses by stable identifiers instead of array position.

## A displayed calculation is not a stored property

Adding the column does not add a DSO property to the Ontology or write a value into every Clinic. It displays the function's derived result in this Workshop table. This is useful when the metric depends on current input data or application context and can be calculated at an acceptable cost.

Persisting a metric would be a separate design decision. For example, an organization might need a reproducible month-end snapshot of the exact value approved by a manager. A live calculation alone does not provide that historical record. Conversely, storing every display calculation creates refresh and consistency responsibilities. Ask whether you need a current answer, a reusable modeled property, or an audited snapshot before choosing storage.

## The engineering lesson

This module combines a business calculation, object identity, and a UI consumption contract. A function can compute the right number and still fail as a table column because the signature is incompatible or the map omits a displayed object. Correctness includes integration, not just arithmetic.

In lessons 15–17, follow the data through the function, the table binding, and the colors. Treat each as a separate question: Did we calculate the intended metric? Did we attach it to the correct row? Did we communicate its meaning honestly?

**Try explaining:** if you filter the table to one clinic, why is it unsafe to assume the supplied function now queries only that clinic? The table's visible rows and the function's explicit query are separate scopes. The next lesson shows that the course function fetches its own Clinic page.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131558) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course-specific procedures use the official text inspected in this study session; column code, formatting screenshots, monthly code and edit code were rechecked for this half. Examples and design alternatives are explanatory additions. Local JavaScript checks are distinguished from Foundry execution. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-second-half-depth/notes-before-depth-revision.tar.gz). [Practice](PRACTICE.md) remains Not Started.
