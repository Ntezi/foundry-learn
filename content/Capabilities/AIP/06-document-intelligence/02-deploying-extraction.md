# 02 — Deploying extraction

*Sources: [Deploy extraction strategies to Python transforms](https://www.palantir.com/docs/foundry/document-intelligence/deploy-to-python-transforms/) · [Deploy extraction strategies to Python functions](https://www.palantir.com/docs/foundry/document-intelligence/deploy-to-python-functions/) · [Core concepts: deployment paths](https://www.palantir.com/docs/foundry/document-intelligence/core-concepts/) · checked October 8, 2026 · Ready for Review*

The bake-off in [01](01-extraction-strategies.md) picked a strategy. This note decides **where it runs** and then covers operating it, as a runbook.

## Transform or function?

**[Docs]**

| | Python transform | Python functions |
|---|---|---|
| Unit of work | **All pages of all documents** in a media set, as a batch pipeline | **One page** (or a small page range) per call |
| How you get it | **Deployment** tab → saved configuration → **Create transform repository**; optionally with chunking and embedding | Follow the in-app **Deploy to functions** guide and copy its generated snippets into a Python functions repository |
| Configured for you | Dataset, model, custom prompt and configuration, filled in automatically | Your extraction function is generated in-app; helper, chunking and embedding functions are static snippets |
| Orchestration | The build schedule | **Yours**, for example with Automate, shaped around your Ontology |
| Good for | Back-catalogues and steady monthly batches | Per-document workflows: a document arrives, an object is created, extraction runs for that object |

**[Example]** Kestrel uses **both**:

- A **transform** for the monthly batch: every invoice in `carrier-invoices` → one row per page → chunked → parsed into `CarrierInvoice` and `CarrierInvoiceLine` rows by a downstream pipeline.
- A **function** for disputes: when Lena's team flags a single invoice as disputed, an automation re-extracts just that document's pages with the object-input template, so the review screen shows fresh text without waiting for the next batch.

## Runbook: the transform

**[Docs] First run**

1. Set the output dataset in the `@transform.using` decorator in `src/myproject/document_extraction/my_extraction.py`.
2. Build. **Preview mode isn't supported** by this template: errors in preview are expected, the real build works.

**[Docs]** The template uses **lightweight** transforms; older versions used Spark and were "much slower". Migrate old ones.

**[Docs] Make it incremental.** By default every run processes **all** documents. Uncomment the `@incremental(...)` line so new documents are processed and appended.

**[Docs] Changing the prompt.** The template inherits the prompt; it lives in `prompts.py`. **Don't edit it there**: make the change in Document Intelligence, check it, and redeploy, so the app and the batch stay identical. What you may change depends on the extractor:

| Extractor input | Customisable |
|---|---|
| `VisionLLMDocumentsExtractorInput` | User prompt only |
| `VisionLLMLayoutDocumentsExtractorInput` (layout-aware) | System prompt only; the user prompt carries a JSON schema and must stay fixed |

**[Docs] Expected failures.** Layout-aware generative extraction needs the model to return valid JSON in a fixed schema. Otherwise the row fails with `ERROR_RESPONSE_JSON_PARSING`; the docs say "approximately 5%" may fail even with top-tier models. Failed rows still get layout information from the layout model. To retry just those: pass their media item IDs in `filter_on_media_items` and **remove `@incremental`** so they are reprocessed.

**[Docs] Speed vs capacity.** `THREAD_NUMBER` sets concurrent page extractions: **20** by default; **300** is the highest tested, in development environments with plenty of vision-model capacity. Too high in a capacity-limited environment causes rate-limit errors, and the retries consume capacity other jobs need.

**[Docs] Logs.** Build details → **Telemetry**, filter `message` for values starting with `aip_workflows`.

**[Docs] Images that need fixing first** (for example rotated pages): transform them in a separate pipeline into a new media set, then run Document Intelligence on that.

**[Docs] Chunking.** Output is one row **per page**. `create_chunks_per_document` joins a document's pages before chunking (the default); `create_chunks_per_row` chunks each page on its own. Chunking before embedding is recommended because embedding models have context limits.

**[Example]** Kestrel's settings: incremental on; `THREAD_NUMBER` 20, so batch extraction doesn't use up LLM capacity that Delivery Desk needs during the day; a weekly job collects `ERROR_RESPONSE_JSON_PARSING` rows and reruns them by media item ID. Invoices are chunked **per row** (per page), because each page's table is matched to shipments on its own; policy PDFs for search ([Ontology 16-02](../../Ontology/16-ai-and-agents/02-semantic-search-and-embeddings.md)) would use per-document chunking.

## Runbook: the functions

**[Docs] Repository setup**

- Libraries: `foundry-platform-sdk` **≥ 1.78**; `aip-workflows` **≥ 0.40.0** for chunking; `openai` for embeddings.
- Import the selected model into the repository for LLM-based extraction.
- Raise the function **timeout**, to the maximum your enrollment allows.

**[Docs] Shape of the code.** Helper functions start a media-set transform job, poll its status every half second, and fetch the result. The error-handled version returns a `TransformResult` with `result`, `error` and `retryable`, instead of raising, "so your orchestration can branch on the result": rate-limit and availability errors are marked retryable. The extraction function itself is generated in the app; choose the **media set and item RID** template or the **object property** template (which needs your object type imported).

**[Docs]** The docs suggest batches of **five to ten pages** per call to avoid timeouts.

**[Explanation]** The `retryable` flag is the function-side equivalent of the transform's retry advice: an Automate-driven workflow should retry retryable failures later and send the rest to a person, not loop.

---
[Module index](README.md) · Previous: [01 — Extraction strategies](01-extraction-strategies.md) · Next: [03 — Document-to-text media transformations](03-document-to-text.md)
