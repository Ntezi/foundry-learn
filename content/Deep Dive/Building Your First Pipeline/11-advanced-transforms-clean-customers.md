# 11 — Advanced Transforms: Clean the Customers Dataset

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Data Preprocessing and Cleaning | 11/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1874636) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## Learning objectives
- Use **Preview** and column **stats** to find data problems before writing logic.
- Build a **nested** transform: parse a JSON string into a struct, flatten it, then concatenate the fields.

## Step 1: Profile before transforming
**[Course]** Open **Preview** on `customers` → **View stats** on `customer_id`. Some values of the supposed primary key **aren't unique**. Select the duplicated values (Shift-click selects several) → **Keep values** to filter to them and inspect before choosing a strategy. Docs: [Preview](https://www.palantir.com/docs/foundry/pipeline-builder/outputs-preview-pipeline/).

**[Explanation]** This is the key habit of the course: **look at the data, then decide**. You can't pick a deduplication rule without seeing *why* the duplicates exist. Are they incomplete copies, true updates, or two different customers sharing an ID?

## Step 2: "Drop duplicates"
**[Course]** New transform (for example *Clean Customers*) → **Filter rows** → **remove rows where email, name and address are null**.

**[Explanation / correction]** This step is labelled "Drop duplicates", but the rule filters on **nulls**, not on duplicate keys. It removes the duplicates only if every extra copy of a `customer_id` is an incomplete row, which is presumably what Step 1's inspection showed in this dataset. Check it yourself after applying: re-run **View stats** on `customer_id` and confirm every value is now unique. On real data you might need an explicit deduplicate transform, or a rule such as "keep the most recently updated row".

## Step 3: Make the address readable
**[Course]** `address` holds a **JSON string** such as `{"city": …, "street": …, "state": …}`.
1. **Flatten struct** needs a *struct* input, so nest **Parse JSON as Struct** inside it. Paste a sample address so the schema (city, street, state) is inferred, and point it at `address`.
2. Flatten produces `city`, `state` and `street` columns. Change the separator from underscore to space if needed.
3. **Concatenate strings** on city, state and street with `, ` as the separator → output column `address`.

**[Explanation] The type progression.** `string` (JSON text) → `struct` (typed nested record) → separate columns → one display string. Each transform only accepts certain input types, so you convert step by step. *Nesting* one expression inside another avoids creating an extra intermediate column.

**[Explanation] Check the order.** The course text says "street + city + state", but the steps select city, state and street. The output order follows the order you select. Check that the result reads as intended.

## Step 4: Tidy up
**[Course]** **Drop columns** city, state and street → Apply all changes → Close.

## Real-project relevance
**[Explanation]** Downstream, `customer_id` will probably become an Ontology **primary key**, and duplicate primary keys break object indexing. Catching duplicates here, in the clean step, is much cheaper than debugging a failed Ontology sync later. Keeping a readable `address` also saves every app builder from reformatting it.

## Trade-offs and gotchas
- **[Explanation]** Replacing structured address parts with one string makes it easy to read but harder to filter by state. Consider keeping `state` as its own column if analysis needs it.
- **[Explanation]** Inferring a schema from one pasted sample assumes every row has the same shape. Rows with missing or extra keys may parse to nulls. Look at the preview.

## Review checklist
- [ ] I can explain why the null filter removed duplicates *here*, and how I'd verify it.
- [ ] I can describe the string → struct → columns → string progression.
- [ ] I can say why duplicate customer IDs matter for the Ontology later.


**Go deeper in the Ontology area:** [05 — Properties and values](../../Ontology/05-properties/README.md)

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [Work with Different File Types: Preprocess and Clean the Transactions Dataset](12-work-with-different-file-types.md)
