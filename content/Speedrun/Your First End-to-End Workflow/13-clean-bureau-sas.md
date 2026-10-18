# 13 — Clean Bureau SAS: protect identity and align the schema

Bureau's orders will eventually share an output and an Order object type with Office Goods orders. This cleaning branch prepares Bureau records for that shared contract. The course creates a transform path named **Clean Bureau** from `orders_bureau_transactional_system`.

## Three operations, three different purposes

### 1. Cast `order_due_date` to Timestamp

A **cast** converts a value to a selected data type. The course replaces the existing due-date column with a Timestamp representation so the two branches can use compatible types downstream.

A Date describes a calendar date. A Timestamp represents a point in time under the platform's time conventions. Giving a date a Timestamp type does not recover a real time-of-day that the source never supplied. In a real workflow, you would establish whether “due July 30” means the start of that day, the end of a business day or a specific delivery deadline, and in which timezone.

Here, inspect the resulting values and type. Do not assume a successful conversion has answered those business questions.

### 2. Filter missing order identifiers

Configure **Filter rows** to keep `order_id` values that are **not null**, with **Treat empty string as null** enabled.

`null` means no value; an empty string is a present text value with no characters. The checkbox ensures both cases are treated as missing for this filter. A whitespace-only string and a repeated nonempty identifier are separate issues; do not assume this setting resolves them.

An Order needs a stable identity so it can be selected, inspected and later targeted by an Action. A record with no usable identity does not satisfy that requirement. But rejecting it also removes potential work from the output, so rejected-row counts matter in a real process.

### 3. Normalize column names

Apply **Normalize column names** using the course defaults. This makes field references consistent with the naming convention, such as `lower_snake_case`.

Naming normalization is syntactic. It cannot decide whether a field's values are correct, whether two similarly named fields mean the same thing, or whether an identifier is globally unique.

## The complete configuration sequence

Select the Bureau input, open Transform, name the path `Clean Bureau`, add the cast, identifier filter and name normalization in that order, then apply and save. The intended cleaned schema has nine columns. Inspect both the graph node and its preview to confirm you edited the Bureau branch.

## A worked identity check

Consider these invented input IDs: `B-1`, an empty value, `B-1` again and `B-2`. Removing the missing value leaves three rows. It does not leave three unique orders: `B-1` is still repeated. Filtering for presence and checking uniqueness are different validations.

For the actual local Bureau CSV, the September 9 inspection found 746 records, no blank/whitespace-only order IDs and no repeated IDs within the file. That explains why the filter need not remove rows in this supplied sample. It does not make the rule pointless: the pipeline documents how it will handle missing IDs if inputs change.

**Where this lesson is useful:** anywhere external records must become addressable application entities. A successful data-type conversion or non-null filter is one check, not a certificate of business correctness.

**Explain before proceeding:** what does the cast improve, and what does it not invent? It improves type compatibility; it does not invent the intended deadline time or timezone semantics.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1791218) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
