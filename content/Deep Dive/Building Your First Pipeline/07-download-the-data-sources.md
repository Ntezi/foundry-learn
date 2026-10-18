# 07 — Download the Data Sources

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Data Preprocessing and Cleaning | 07/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1873751) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## The three raw files
**[Course]** You download three files from the lesson and later upload them:

| File | Format | Contents |
|---|---|---|
| `products_raw.snappy.parquet` | Parquet (Snappy-compressed) | Products sold at the store |
| `customers_raw.csv` | CSV | Basic customer details |
| `transactions_raw.json` | JSON | Transactions: product, customer, date, quantity |

If your browser opens a file instead of downloading it (JSON often does), save it with Ctrl/Cmd+S. If you can't download or upload, use the [optional Marketplace install](08-optional-deploy-datasets-via-marketplace.md).

## Why three formats?
**[Explanation]** Deliberately, so you see three ingestion cases:
- **Parquet** is self-describing: the schema is in the file.
- **CSV** has headers, but Foundry has to *infer* the types.
- **JSON** here has to be parsed from an *unstructured* dataset into rows ([lesson 12](12-work-with-different-file-types.md)).

These are the same distinctions you met in the Data Connection course: synced files need a schema, database tables arrive typed. The format decides how much work the first transform has to do.

## Review checklist
- [ ] I can say which of the three formats carries its own schema.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [[Optional] Deploy Datasets via Marketplace](08-optional-deploy-datasets-via-marketplace.md)
