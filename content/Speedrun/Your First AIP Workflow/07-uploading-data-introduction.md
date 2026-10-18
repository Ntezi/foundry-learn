# 07 — Introduction — Uploading the Data

## Why PDFs start as a media set

The input is a collection of documents, not a table whose rows already represent research claims. A PDF contains bytes and layout: pages, text elements and possibly images. A media set is the Foundry resource used here to hold and reference those media items before extraction.

The pipeline later derives tabular rows from those documents. Preserving a reference to the original media item gives the derived information a traceable source. This is the foundation for inspecting evidence instead of trusting a detached summary.

## The supplied training corpus

The lesson supplies five PDFs: Programmatic Management of Drug-Resistant Tuberculosis; Standardized Treatment of Active Tuberculosis; Comparisons and Lessons Learned from Neglected Tropical Diseases and Tuberculosis; Impact of Alcohol Abuse on the Adaptive Immune System; and Tuberculosis in the United States in 2023.

The course identifies these as National Library of Medicine articles and labels the supplied materials CC0. That is a report of the course's description, not an independent licensing audit or a review of the papers' scientific claims. Use the lesson's Downloads section for the exact training files during practice.

The dates and selection also matter conceptually. This is a bounded sample library, not an automatically complete or current body of knowledge. A later answer should be understood in relation to this corpus. The model's fluency cannot fill missing source coverage reliably.

## Raw evidence and derived evidence

The PDF is the source artifact. Extracted page text is a derived representation that can lose reading order or characters. A chunk is another derived representation. Its model-generated summary is another. Each step makes information easier to use while introducing possible loss or distortion.

For a software engineer, this resembles a compiler pipeline with intermediate representations, except some steps are probabilistic. You should retain enough source identity to trace a suspicious output backward through those representations.

## Choose one import route

Manual download and upload is the main course path. If that is unavailable, the optional Marketplace lesson describes an alternative for obtaining the training resources. These are alternate ways to establish the input; doing both without checking can produce duplicate resources and ambiguous pipeline selection.

No PDFs were uploaded or processed in this notes phase. The first practical check will be that the intended five documents are present and readable in the chosen Articles media set. Do not infer a particular page or chunk count before inspecting the actual extraction.

**Review question:** why is a five-document library a useful learning fixture but weak evidence that an application can answer every question in the domain? It provides a manageable test corpus, while coverage and freshness remain limited by what is included.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1961851) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
