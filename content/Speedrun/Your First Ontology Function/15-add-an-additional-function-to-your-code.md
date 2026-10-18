# 15 — Add an Additional Function to Your Code

## Read the function as an adapter for a table

Create `functionColumnDaysSalesOutstanding.ts` following the course. The exported function receives a `Client` and returns a promise of `Record<ObjectSpecifier<Clinic>, Double>`. The record is the table-facing result: its keys identify Clinic objects and its values are numeric DSO results. The course prose calls this a FunctionsMap, but the supplied TypeScript v2 code uses a Record. Follow the code's actual generation and types when implementing it.

The Client gives the function a way to query Ontology data. It is not a list of clinics selected by the user. This matters because the supplied function chooses its own scope instead of receiving a table object collection.

## Follow one clinic through the code

The function first calls `client(Clinic).fetchPage()` and extracts `data`. It creates an empty result record and loops over those clinics. For each clinic, it creates fresh monthly totals and queries Financial with `clinicName: { $eq: clinic.clinicName }`. It then iterates the Financial records, groups amounts by month, sorts month keys newest first, and performs the countback calculation explained in lesson 12.

The query here is unconditional. Unlike the scalar function, this snippet does **not** contain a truthy-name branch that explicitly selects all Financial records when the name is missing. Do not transfer that fallback explanation to this code. What the installed SDK does with an undefined filter value must be checked; the snippet supplies no explicit missing-name policy.

After calculation, `result[clinic.$objectSpecifier] = dso` attaches the value to that exact Clinic. Resetting the monthly accumulator inside the clinic loop is essential: otherwise one clinic's amounts could contaminate the next clinic's result.

Suppose Clinic A has June billed 1,200 and collected 900, then May collected 930. June contributes 30 days, leaving 300; May contributes 300/930 × 31 = 10. The map gets A's object specifier → 40. Clinic B must be calculated from B's records with a new accumulator. These figures are an explanatory example, not course data or a Foundry result.

## Two limits a small demo can hide

**The Clinic query reads one page.** There is no continuation loop in the snippet. If a future dataset has more clinics than fit in that page, the map can omit clinics even though the code completes successfully. “No exception” is not evidence of complete coverage. Do not invent a page size; inspect continuation and actual counts during later practice.

**Financial queries repeat per clinic.** With N returned clinics, there is one initial Clinic query and N per-clinic Financial query streams, potentially with multiple requests for pagination. The loop awaits each stream. This is a familiar repeated-query pattern, and a larger dataset may make the table slow. A future design could accept the relevant clinics and group appropriate Financial records more efficiently, but that requires respecting permissions, query limits and the business relationship. No optimization has been implemented here.

The DSO loop is also copied rather than factored into a shared helper. If someone later corrects missing-history behavior in the scalar alone, card and column definitions may diverge. A shared pure calculation helper with consumer-specific adapters is an engineering improvement to consider after reproducing and understanding the tutorial.

## The unresolved consumer contract

Current [Object Table documentation](https://www.palantir.com/docs/foundry/workshop/widgets-object-table/#function-backed-columns) describes a function input containing the relevant objects; the course snippet accepts only Client. This is a real source discrepancy. A successful TypeScript compile does not prove Workshop will accept the function as a column.

During practice, inspect the actual picker and runtime requirements. If an object-set or array adapter is needed, use the current TypeScript v2 documentation and installed SDK types, record the deviation, and preview the resulting identity-to-value mapping. These notes do not supply a guessed replacement signature or claim the discrepancy is resolved.

## Preview, release, and prove alignment

The course sequence is preview → commit → tag `1.0.1` → wait for deployment. Preview should show an object-keyed map. Later compare one mapped value with the scalar called for the same clinic and data. Then verify the table row's object identity, not just its display name.

Remember that the course's tag sequence is its walkthrough convention. Releasing a function and selecting the intended release in Workshop are separate steps. A newer source file in your editor does not establish that the table is consuming it.

**Checkpoint:** explain why a three-clinic demo can look perfect while both pagination coverage and the table-input contract still need investigation. See [P2](PRACTICE.md#p2) for the later practical checks.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131559) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course-specific procedures use the official text inspected in this study session; column code, formatting screenshots, monthly code and edit code were rechecked for this half. Examples and design alternatives are explanatory additions. Local JavaScript checks are distinguished from Foundry execution. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-second-half-depth/notes-before-depth-revision.tar.gz). [Practice](PRACTICE.md) remains Not Started.
