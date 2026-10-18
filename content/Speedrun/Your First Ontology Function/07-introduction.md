# 07 — Understand the supplied model before calculating

This course supplies a Marketplace bundle containing Clinic and Financial object types with backing datasets, plus a prebuilt **Clinic Finance Tracker** Workshop application. The exercise concentrates on functions rather than making you rebuild all the data preparation and interface work from the previous speedrun.

Before writing code, understand what each kind of object represents. A correct algorithm over misunderstood records still produces a misleading result.

## Clinic versus Financial observation

A **Clinic** represents the organizational entity being evaluated. A **Financial** record represents a monthly billing/collection observation associated with a clinic. One clinic can therefore have several Financial records across time.

Here is an invented illustration:

| Entity | Example identity | Meaning |
|---|---|---|
| Clinic | Clinic-A | The clinic itself. |
| Financial | Report-A-2026-06 | A financial observation for Clinic A in June. |
| Financial | Report-A-2026-07 | A financial observation for Clinic A in July. |

These example IDs are not claimed to be the installed keys. They illustrate **grain**: what one record means. Counting three rows in this illustration would not mean three clinics.

The tutorial's grouping code can combine several Financial records sharing a month. That flexibility does not establish that duplicates are valid. A repeated source report could still inflate billed and collected totals. Inspect the actual reporting grain and identity before interpreting the aggregation.

## Distinguish model, data and generated code

The object type defines properties and identity. Its instances carry the data available through that model. The backing dataset provides source data for the type. Later, the SDK turns the model's definitions into code bindings that let your function query those instances.

Generating an SDK is not importing every Financial record into a local TypeScript module. You obtain schema-aware code; actual record values are retrieved when the function queries them.

## Inspect the fields the algorithm depends on

The scalar function uses `clinicName`, `month`, `amountBilled` and `revenueCollected` on the relevant types. Establish which properties are optional, whether periods use canonical `YYYY-MM`, and what units the two monetary amounts use.

For all-clinic totals, values must be comparable. Adding amounts recorded in different units or currencies would need an explicit conversion policy. That is an illustrative data-contract concern, not a claim that the tutorial mixes currencies.

The course uses Financials in prose and Financial in its sample code. Your installed API names, including any prefix, determine the symbols available in the generated SDK. English pluralization does not select a TypeScript export.

## Association is not necessarily a traversed link

The supplied scalar code matches Financial records by `clinicName`. It does not demonstrate traversing an Ontology link from Clinic to Financial. Do not describe a relationship query as implemented merely because the two entities are related in the business.

Matching by name can combine records if names repeat or fail to match if a name changes. A stable identifier or modeled link can be a stronger design, but adopting it would require an intentional model and code change.

**Remember:** learn the nouns, record grain and association rule before the algorithm. Those facts determine what your calculation actually measures.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131547) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; continuation using this approach authorized by the learner. Understanding review remains separate. Course procedures use the official text inspected in this study session; lessons 12–13 were rechecked for this revision. Examples and engineering comparisons are explanatory additions, not executed Foundry results. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-first-half-depth/notes-before-depth-revision.tar.gz). Practice remains [separately tracked](PRACTICE.md).
