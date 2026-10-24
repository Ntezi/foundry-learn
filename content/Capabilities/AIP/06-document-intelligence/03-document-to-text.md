# 03 — Document-to-text media transformations

*Sources: [Document-to-text media transformations](https://www.palantir.com/docs/foundry/document-intelligence/document-to-text/) · checked October 8, 2026 · Ready for Review*

A **reference card** for the operation behind the traditional strategies. You use it directly when you write your own transform or function instead of deploying one from the app.

## The two operations

**[Docs]**

| Operation | Returns |
|---|---|
| `extractTextV2` | A list of strings of extracted text |
| `extractLayoutAwareTextV2` | Layout-aware text blocks across pages (paragraphs, headers, tables) |

**[Docs]** They replace the older `extractLayoutAwareContent` and `ocrOnPage` operations.

## The request

**[Docs]** The operation sits inside a `documentToText` transformation. Adapted from the docs' example (which uses `SCAN` and `TEXT`):

```json
{ "type": "documentToText",
  "documentToText": { "operation": {
      "type": "extractLayoutAwareTextV2",
      "extractLayoutAwareTextV2": {
        "pageRange": { "startPageInclusive": 0, "endPageExclusive": 5 },
        "config": { "mode": "AUTO", "format": "MARKDOWN",
                    "languages": [ { "type": "language", "language": "KOR" } ] } } } } }
```

## Parameters

| Parameter | **[Docs]** values and advice |
|---|---|
| `config.mode` | `ELECTRONIC`: treat every page as an electronic PDF and read embedded text. `SCAN`: treat every page as an image and run OCR. `AUTO`: decide per page; use only when you don't know, as it adds a small compute overhead |
| `config.format` | `TEXT`, `MARKDOWN` or `HTML` |
| `config.languages` | OCR languages for `SCAN` or `AUTO`, as `{"type": "language", "language": "<code>"}` |
| `pageRange` | Start inclusive, end exclusive: `0`–`5` means pages 0 to 4. Batch pages instead of one request per page; **five to ten** pages is a starting point, depending on document size, model limits and rate limits |

**[Docs]** No language is needed for electronic PDFs or English documents; set it for **non-English scans**.

## Python entry points

**[Docs]** The page gives two examples:

- **Transform**: `MediaSetInput` → list media items → read each item's page count from its metadata → call `media_input.transform_media_item(...)` per page in a thread pool (20 threads in the example) → one row per page with the result as JSON. Incremental is a commented-out decorator.
- **Function**: the same helper pattern as [02](02-deploying-extraction.md#runbook-the-functions), with `ExtractDocumentLayoutAwareTextV2Operation`, `PageRange` and language config; one version takes a media set and item RID, the other an object with a media reference.

## Kestrel's settings

**[Example]**

| Carrier invoices from | `mode` | `format` | `languages` | Why |
|---|---|---|---|---|
| DHL (generated PDFs) | `ELECTRONIC` | `MARKDOWN` | none | Embedded text; Markdown keeps table rows |
| Regional carrier (scans) | `SCAN` | `MARKDOWN` | none (English) | Images; no language needed for English |
| Mixed archive from before 2024 | `AUTO` | `MARKDOWN` | none | Unknown per page; accept the overhead |

**[Explanation]** Picking `ELECTRONIC` or `SCAN` per carrier, instead of `AUTO` everywhere, is a small saving that compounds: Kestrel knows its senders, so it doesn't pay for detection on every page. These traditional settings are also the fallback strategy if the generative one becomes too expensive ([01](01-extraction-strategies.md#kestrels-bake-off)).

---
[Module index](README.md) · Previous: [02 — Deploying extraction](02-deploying-extraction.md) · Next module: [07 — End-user AI apps](../07-end-user-apps/README.md)
