# 12 — Add Data

## Declare the pipeline's source dependency

Choose **Add Foundry data**, select the **Articles** media set using the plus button and confirm with **Add data**. The pipeline can now reference that resource as its input. This is not a second upload of the PDFs.

The distinction matters: ingestion created or supplied the media set; this step connects an existing resource to the transformation. In software terms, you are wiring a dependency into a worker, not implementing the storage service again.

## Inspect identity and representation

Check that the selected Articles is the intended resource in your learning context. A matching display name is insufficient when several learners have similarly named inputs. The first processing step expects a media reference, so inspect the available input schema and preview as well as the name.

A media reference is a way to locate the item to process. It is not the text content and not an embedding. The next lesson explicitly invokes PDF extraction to produce textual data from it.

## Why the input boundary deserves attention

If the wrong source is selected, downstream transformations may still run and produce plausible summaries. That can make an input error harder to notice than a syntax failure. Comparing the input's document identities with the intended five PDFs is therefore a meaningful correctness check.

Likewise, a preview that shows no usable rows should be investigated before adding an LLM call. Check the selected resource, import completion and access. A prompt cannot repair an empty or incorrect input source.

## Small fixtures can help later diagnosis

The lesson notes that Add Data also offers manually entered data, useful for mock or configuration datasets. Later, a tiny controlled fixture can help you understand an array explosion or deduplication step without paying for repeated model calls.

That is a supplemental debugging technique, not a replacement for the course's Articles input. Record when you use synthetic data so a local or preview result is not mistaken for successful processing of the actual corpus.

## What to remember

A graph edge represents a real dependency. Changing which resource it points to can change every downstream result without changing the visible transformation operations. This is comparable to a service using a different database through the same interface.

**Try explaining:** if two pipelines have identical steps but different summaries, what should you compare before their prompts? Compare source resource identity, document versions, extraction results and model configuration. The source boundary is the first place to establish that you are comparing like with like.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1961885) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
