# 12 — Work with Different File Types: Preprocess and Clean the Transactions Dataset

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Data Preprocessing and Cleaning | 12/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1874719) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## Learning objectives
- Turn an **unstructured JSON file** into rows.
- Parse a non-standard **date string** into a timestamp.
- Know where Foundry's **AI assistant** helps and where you should check its output.

## Key concept
**[Course]** Foundry datasets are **collections of files, usually Parquet**. Raw data can arrive in other formats, and the pipeline has to turn it into proper datasets. Docs: [Datasets](https://www.palantir.com/docs/foundry/data-integration/datasets/).

## Walkthrough with reasoning
**[Course]**
1. **Transform** on the `transactions` node → **Extract rows from a JSON file**. Paste one sample record to generate the schema: transaction_id, transaction_date, units, customer_id, variation_id, product_id.
2. Set **"Allow JSON values to span multiple lines" to false**. The course's reason: each row is a single JSON record.
3. **Cast** `transaction_date` → **Timestamp**, timezone **London GMT**. The date looks like `Thu Jan 25 2024 07:21:01 GMT+0000 (Greenwich Mean Time)`. Use the AI assistant's **Generate** to infer the format, or paste `EEE MMM dd yyyy HH:mm:ss 'GMT'Z (zzzz)`, then remove any other formats.
4. **Cast** `units` → double. The AI assistant can generate this board, but it may leave gaps, so check it.
5. **Drop** the extra columns the extraction adds: `_error` and `file`.

## Why the multi-line setting matters
**[Explanation]** The file is in **JSON Lines** form: one complete JSON object per line. With multi-line off, the parser treats each line as one record, which is fast and simple. Multi-line on is for pretty-printed JSON where one object spans several lines. The wrong setting gives parse errors or one giant broken record. The course phrase "one JSON file per row" is best read as "one JSON object per line".

## Reading the timestamp pattern
**[Explanation]** Token by token:

| Pattern | Matches |
|---|---|
| `EEE` | Day name (Thu) |
| `MMM` | Month name (Jan) |
| `dd` | Day (25) |
| `yyyy` | Year (2024) |
| `HH:mm:ss` | Time (07:21:01) |
| `'GMT'` | The literal text GMT |
| `Z` | Offset (+0000) |
| `(zzzz)` | Zone name in brackets |

If the source ever sends another format, those rows fail to parse. That's why removing unused formats and checking for nulls matters. The offset (`+0000`) records the true instant. The timezone setting controls how values without one are interpreted.

## The `_error` and `file` columns
**[Course]** The extraction adds `_error` (parse problems) and `file` (the source file name). They aren't needed here, but with many files they help catch malformed input.

**[Explanation]** In production, don't just drop `_error`: filter or alert on non-null values first. Otherwise malformed records disappear silently. This is a natural place for a **data expectation** ([lesson 23](23-pipeline-maintainability.md)).

## AI assistant
**[Course]** It can generate format strings and whole transform boards when your enrollment has it. Its output may be incomplete, so review it.

**[Explanation]** Treat generated boards like code from a colleague: read every step and check the preview before applying. The Intro course's governance point applies here too, since generated logic still becomes part of your pipeline's contract.

## Review checklist
- [ ] I can explain the multi-line option in terms of JSON Lines.
- [ ] I can read the timestamp pattern and say what happens to a row in a different format.
- [ ] I know why `_error` shouldn't just be dropped in production.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [Introduction](13-data-integration-introduction.md)
