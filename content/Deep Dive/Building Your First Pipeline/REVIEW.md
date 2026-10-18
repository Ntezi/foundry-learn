# Review guide: Deep Dive: Building Your First Pipeline

Answer out loud or in writing before opening the linked lesson. Aim to explain the *why*, not only the step.

## Explain it
| Question | Where |
|---|---|
| Where do pipelines sit between Data Connection and the Ontology? When would you pick Code Repositories instead of Pipeline Builder? | [01](01-introduction.md) |
| Why is cleaning done per source, before joins? Give a failure that happens without it. | [06](06-data-preprocessing-introduction.md), [10](10-basic-transforms-clean-products.md) |
| Why was the JSON uploaded as an unstructured dataset? | [09](09-create-a-new-pipeline.md), [12](12-work-with-different-file-types.md) |
| Why store money as integer cents in production? | [10](10-basic-transforms-clean-products.md) |
| The "drop duplicates" step filters nulls. Under what condition does that remove duplicates, and how would you check it? | [11](11-advanced-transforms-clean-customers.md) |
| Walk through string → struct → columns → string for the address. | [11](11-advanced-transforms-clean-customers.md) |
| What does the "multiple lines" JSON option mean? | [12](12-work-with-different-file-types.md) |
| Why not simply drop `_error` in production? | [12](12-work-with-different-file-types.md) |
| What is the grain of each input and of the CLV output? | [13](13-data-integration-introduction.md) |
| Inside a pipeline, what does "an output can't be an input" mean? How do other pipelines still reuse it? | [16](16-add-a-dataset-output.md) |
| Explain the 50 → 172 row jump and why `variation_id` fixes it. | [17](17-identify-a-bad-join.md) |
| What does this pipeline's "CLV" really measure? | [18](18-create-an-operationally-valuable-dataset.md) |
| Batch or streaming: what decides it? | [20](20-other-pipeline-builder-capabilities.md) |
| Why is a UDF a last resort? | [21](21-user-defined-functions.md) |
| Optimizing for latency vs extensibility: what does each cost? | [22](22-segmenting-and-materializing-outputs.md) |
| Which maintenance feature would have caught the bad join automatically? | [23](23-pipeline-maintainability.md) |

## Scenario checks (our examples)
1. **Product counts double after a new join.** A new product-category table was joined on `category_name`, and product counts in the Ontology doubled. What happened, and what do you check first? *(Right-side key not unique. Check key uniqueness and row count before and after.)*
2. **A sibling team wants your clean customers.** They're building a different use case and want your clean customers but not your CLV logic. What pipeline structure supports that? *(Materialize clean outputs as a separate stage, possibly in its own Project.)*
3. **An hourly dashboard reads a daily pipeline.** Operations wants the dashboard refreshed every hour, but the pipeline runs daily from one end-to-end graph. What changes, and at what cost? *(A schedule or trigger change, maybe incremental processing, and a check on source freshness first. Streaming only if hourly isn't fresh enough.)*
4. **Dropped transactions from a date format change.** The transaction feed started sending ISO-8601 dates, and some transactions vanished from CLV. Where did they go? *(Failed timestamp parse. Rows became null or errors. Expectations on null or `_error` would alert.)*

## Traps
- **"A left join never changes the row count."** False when the right-side key repeats.
- **"Preview showed no duplicates, so there are none."** Preview samples the data. Check the full dataset with Contour or an expectation.
- **"Materialize every node to be safe."** That adds builds, storage, latency and accidental dependencies.
- **"Streaming is always better."** Only when the decision needs data that is seconds old.
- **"Revenue per customer = lifetime value."** Not profit, and not a forecast.
