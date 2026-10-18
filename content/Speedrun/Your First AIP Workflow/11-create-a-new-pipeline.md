# 11 — Create a New Pipeline

## Create the executable dataflow definition

In the course folder, choose **New → Pipeline Builder**. Name it **Document Processing Transform**, select **Batch pipeline**, use **Standard** batch compute and create the pipeline. These are the course's choices for this fixed-document exercise.

The new resource will describe how input documents become output datasets. Creating it does not yet extract text or call a model. At this point you have an authoring surface and a place to define dependencies and operations.

## Why batch fits this example

You are processing a bounded set of PDFs rather than reacting to an endless stream of events. A batch workflow lets you work with a collection, inspect intermediate representations and build the outputs from it. This fits the task of preparing a library before serving interactive questions.

The later question-answering path has a different timing requirement: a user expects a response after submitting a question. Precomputing summaries and embeddings separates preparation work from that interactive path. It avoids treating every user question as a request to rebuild the entire corpus.

Batch does not mean a pipeline must always be run manually, and selecting batch does not automatically configure a schedule. Those are separate execution and scheduling decisions. The current lesson creates the pipeline; deployment comes later.

## Pipeline Builder as an engineering tool

The visual graph expresses data dependencies much as code or a workflow engine would. A transform node can contain several operations. The output preview helps inspect their effect on data, while named nodes help explain why each stage exists.

Using visual authoring removes some boilerplate, not the need to reason about schemas, row counts, keys and failure handling. The same mistake—such as discarding the field needed for a later join—can occur in SQL, Python or Pipeline Builder.

## What to establish during practice

Confirm the pipeline is in the intended course folder and has the requested style and compute selection. Record its identity so later build evidence refers to this resource. If resuming an existing training build, inspect it before creating another pipeline with the same name.

The useful checkpoint is that you can explain the pipeline's purpose and attach the intended input next. No completed data transformation is implied by an empty graph opening successfully.

**Review question:** why is an LLM-generated summary produced in this batch pipeline different from an answer to a user's later question? The summary is prepared per source chunk; the answer will depend on the user's question and selected evidence.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1961884) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
