# 01 — Extraction strategies

*Sources: [AIP Document Intelligence](https://www.palantir.com/docs/foundry/document-intelligence/overview/) · [Core concepts](https://www.palantir.com/docs/foundry/document-intelligence/core-concepts/) · checked October 8, 2026 · Ready for Review*

**The Kestrel problem.** Carriers send their monthly invoices as PDFs: DHL's are generated electronically, a smaller regional carrier sends scans, and some invoices have long tables of per-shipment charges. Lena's team at Kestrel Pay retypes the totals into a spreadsheet. The goal is to turn every invoice line into data that can be matched to `Shipment` objects.

This note is a **bake-off**: what AIP Document Intelligence offers, how you compare strategies on your own documents, and what Kestrel picked.

## What the app is

**[Docs]** AIP Document Intelligence is "Foundry's entry point for all document extraction workflows". You open a **media set** of documents, run extraction strategies on it, compare their quality, speed and token cost, and then deploy the chosen one with one click ([02](02-deploying-extraction.md)).

## The strategies

**[Docs]**

| Family | Strategy | How it works | Limits |
|---|---|---|---|
| **Traditional** (no LLM) | **Raw text** | Reads text from the PDF's metadata | Electronically generated PDFs only |
| | **OCR** | Optical character recognition | Loses layout |
| | **Layout-aware OCR** | OCR with bounding boxes | Keeps layout and structure |
| **Generative AI** | **VLM extraction** | A vision language model, with a prompt tuned to produce Markdown; you can edit the prompt | Tokens and model capacity |
| | **VLM with preprocessing** | Runs traditional OCR first and gives the VLM both the OCR output and the page image | More context for complex documents |

- **[Docs]** Traditional configurations use the **transform media item** endpoint, the same document-to-text transformations described in [03](03-document-to-text.md).
- **[Docs]** Preprocessing is a toggle: *Configuration → Generative AI → Preprocess document*. The docs say combining VLMs with preprocessing "has proven quite successful" on complex documents.

## The comparison loop

**[Docs]** The workflow:

1. **Pick or upload a media set.**
2. **Configuration** tab: traditional or generative, preprocessing on or off, prompt changes. **Save** keeps the configuration.
3. **Run**.
4. **Extraction result** tab: the Markdown output, mapped to bounding boxes on the original PDF so you can check it against the page.
5. Optionally **Evaluate results**.
6. Optionally **Chunk**: preview how the text would be split and adjust the chunking parameters.
7. **Deployment** tab when you're satisfied.

**[Docs] Metrics and evaluations.** Each run shows extraction-quality rubric metrics, execution time and input/output tokens. **Evaluations** use the VLM as a judge, scoring areas such as tables, headers, lists and code blocks from **1 (worst) to 5 (best)**, with a prompt Palantir tuned against its own ground-truth set. Evaluations currently need **Anthropic Claude 4 Sonnet** to be available on your enrollment.

**[Explanation]** The judge scores how well the document was turned into Markdown, not whether the numbers you care about are correct. For invoices, also check the business fields yourself on a few pages: a table can be beautifully formatted with one digit wrong.

## Kestrel's bake-off

**[Example]** Daniel builds a media set of 30 invoices (10 DHL electronic, 10 scanned regional, 10 with multi-page tables) and runs each strategy:

| Strategy | DHL (electronic) | Regional (scanned) | Long tables | Tokens | Verdict |
|---|---|---|---|---|---|
| Raw text | Clean text, table columns run together | Not available (no embedded text) | Columns lost | None | No |
| OCR | Readable | Readable, layout lost | Columns lost | None | No |
| Layout-aware OCR | Good | Good | Mostly good; some merged cells | None | Fallback |
| VLM | Very good | Good; misread two faint totals | Good | Medium | Close |
| VLM + preprocessing | Very good | Very good | Very good | Highest | **Chosen** |

Evaluation scores for tables: 4–5 with preprocessing against 3–4 without. Lena checked the invoice totals on 30 pages by hand: two errors without preprocessing, none with it.

**[Explanation]** The tokens buy accuracy on the documents that matter most (scans and long tables). For DHL's electronic invoices alone, layout-aware OCR would have been enough and free of tokens; Kestrel keeps one strategy for simplicity and revisits it if cost becomes a problem ([09](../09-cost-and-observability/README.md)).

## Where the data goes

**[Example]** The extracted lines become two new object types, added to the [Kestrel reference model](../../Ontology/17-case-studies/02-kestrel-reference-model.md):

| Type | Key | Notable properties | Links |
|---|---|---|---|
| `CarrierInvoice` | `invoiceId`, e.g. `DHL-INV-2026-09` | `invoiceDate`, `totalAmount`, `currency`, `sourceDocument` (media reference) | → `Carrier` (many-to-one) |
| `CarrierInvoiceLine` | `invoiceLineId` | `trackingNumber` (as printed), `chargeType`, `amount`, `matchStatus` | → `CarrierInvoice` (many-to-one); → `Shipment` (many-to-one, when matched) |

**[Explanation]** `trackingNumber` is kept **as printed** and the link to `Shipment` is set by matching, not by trusting the extraction. A misread tracking number then shows up as an unmatched line for Lena's team to review, instead of silently charging the wrong shipment.

---
[Module index](README.md) · Next: [02 — Deploying extraction](02-deploying-extraction.md)
