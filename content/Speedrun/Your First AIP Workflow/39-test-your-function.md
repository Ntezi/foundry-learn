# 39 — Test Your Function

## Test the service before the interface

Open the play control in AIP Logic, provide a userQuestion and choose **Preview run**. The course suggests questions about tuberculosis treatment or prevalence as examples for its training corpus. These notes do not answer those medical questions or evaluate clinical recommendations.

The practical purpose is to inspect the retrieval-and-generation path before Workshop adds another layer of variables and presentation. If the function fails in preview, building a polished UI will not repair it.

## Replace “sounds reasonable” with evidence checks

The lesson asks whether the Result makes sense. Strengthen that by comparing the answer with the actual retrieved Content. For each substantial claim, identify the supporting passage or note that support is missing.

Separate retrieval failure from generation failure. If the required passage was not retrieved, inspect search scope, embeddings and corpus coverage. If the passage was supplied but the answer contradicts it, inspect prompt behavior and generation. Changing the retrieval count blindly can obscure which stage failed.

## Use a small but varied question set

Include a question clearly supported by the corpus, one outside its scope, one with ambiguous wording and one that asks for information beyond the documents' dates. For unsupported questions, the desired behavior is a clear statement of insufficient references rather than a plausible invented answer.

Also test blank input and a question with no useful matches. Record the actual behavior rather than assuming every missing-input error is harmless. A later application needs a meaningful empty state.

These are planned evaluation cases. No preview or model call was performed while writing the notes, and no answer is marked correct without observing its sources.

## Record configuration with the result

Store the function resource/version, model/settings, question, retrieved identities, formatted evidence and answer when available. Without that context, comparing two runs can confuse a prompt change with a data update or different retrieval result.

A few successful examples establish only limited evidence. They do not prove robustness across all questions or eliminate hallucinations. Re-run relevant cases after changes that affect retrieval, prompting or data representation.

## Understand the broader mode discussion

The lesson mentions a more agentic execution mode and debugger capabilities. This tutorial configured Single completion. Do not infer that the function has editing tools or chooses an open-ended tool sequence. Use visible inputs, outputs and available execution traces for diagnosis; do not treat them as an infallible account of a model's internal reasoning.

**Checkpoint:** an answer is fluent but contains one unsupported sentence. Is this a successful test? It may demonstrate execution, but it fails the intended grounding behavior. Explain what evidence you would inspect next before modifying the function.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962335) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
