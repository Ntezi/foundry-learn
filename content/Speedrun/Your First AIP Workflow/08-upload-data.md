# 08 — Upload Data

## The operation and its result

In the course folder, choose **New → Upload files**, select the supplied PDFs and choose **Upload to a new media set**. Continue with **Next**, select **Transactionless** write mode and upload. Rename the resulting media set **Articles**.

Then open Articles and inspect its media items. The lesson asks you to open an item and preview the document. That is a small but important check: you want usable PDFs in the expected resource, not merely filenames that appeared in an upload dialog.

## Why this is not a CSV import

A tabular upload asks Foundry to interpret a file as rows and columns. Here the files themselves are the input objects for later PDF processing. The pipeline will use media references to obtain their content, then transform that content into rows.

Think of it as storing uploaded files plus references in a conventional application, before a worker parses them. The media set is not already the Chunks dataset. Uploading the PDFs does not run entity extraction, create embeddings or make a question-answering application available.

The course specifies Transactionless mode. These notes preserve that selection without inventing detailed replacement, rollback or update guarantees from its name. If you later design recurring document updates, inspect the actual media-set write semantics for that use case rather than treating this manual training choice as a general ingestion policy.

## Check what entered the system

During practice, compare the media items with the intended five source files. Open representative documents and confirm that they are readable. If an item is missing or duplicated, resolve that before generating many derived chunks; downstream errors become harder to diagnose once the model has processed the wrong corpus.

Also distinguish a scanned page from a page with selectable text. The extraction lesson provides a Full-page Scan option for image-based content. A successful PDF preview establishes that the file can be displayed, not that its text will be extracted accurately by the default method.

## Why source identity matters later

Each document can produce many pages and each page many chunks. Their rows must retain the media-item reference or identity. Otherwise an attractive answer may have no practical route back to the original document.

The display name Articles is for navigation. Later, verify the pipeline references this exact media set rather than another resource with the same name. This is the same discipline as checking an application's storage bucket and object key, rather than trusting a friendly label alone.

**Checkpoint:** explain the difference between “the PDFs uploaded,” “the text extracted correctly” and “the model produced useful entities.” They are three independent results. Only the first belongs to this lesson's practical outcome.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1961865) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
