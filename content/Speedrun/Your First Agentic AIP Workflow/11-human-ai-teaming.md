# 11 — Understand Human-AI Teaming in the Agentic Workflow

*Module: Install Foundational Ontology & Understand Agentic Workflow · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Define the process before automating a step

The course separates recruitment into reviewing criteria and gathering candidates, assessing eligibility, then enrolling eligible candidates. Its agent supports the assessment stage. This decomposition stops “automate recruitment” from becoming an unbounded instruction with no clear start, end or accountable owner.

The Ontology supplies a shared language for the work: objects identify participants, properties hold relevant information, and Actions express allowed operations. Humans and AI can then use the same business operation instead of maintaining two unrelated update paths.

## What human-AI teaming actually requires

The course says uncertain eligibility should lead to manual review. In the first-half implementation, that request is represented by an output value and reasoning recorded through an Action. It is not evidence of a configured notification, assigned reviewer, escalation timer or completed review.

A supplemental process sketch makes the distinction concrete:

```text
Pending
  -> model assesses available evidence
  -> Suitable | Not suitable | Manual review required
  -> designated person resolves uncertain cases
  -> later enrollment process, where appropriate
```

The first three lines describe the intended first-half assessment flow. The last two are process responsibilities; their operational implementation is not established by these lessons. The model reporting uncertainty and a person reliably receiving the work are separate requirements.

For a software engineer, think of the difference between storing `needs_review = true` and operating a staffed work queue. The flag is useful, but it does not allocate work or prove that anyone will look at it.

## Design the handoff around evidence

A useful unresolved result says which relevant fact is missing or conflicting. “I am unsure” leaves the reviewer to repeat the entire investigation. “The required training completion is absent from the record,” in a fictional equipment-loan analogy, tells the reviewer what to obtain next.

The course requests a one-sentence explanation. That can help a person understand the result, but it is generated text, not independent proof that the model reasoned correctly. The reviewer needs access to the actual underlying evidence. A confident explanation can be wrong; an unconfident explanation can also be incomplete.

## Questions to bring to a real project

Who owns unresolved cases? Can a human override an automated decision? What happens if the input data changes while someone is reviewing it? Should a repeated automated run overwrite a human's resolution? These are design questions to answer and test, not controls demonstrated by the tutorial.

The human path and the AI path sharing an Action can reduce duplication of validation and business behavior. It does not guarantee they run with identical permissions or that every generated argument is correct.

**Remember:** successful teaming is a defined handoff with useful evidence and clear responsibility. A manual-review label is the beginning of that handoff, not its completion.

**Check:** if every uncertain candidate receives the right label but nobody processes that queue, which part failed? The model's classification may be functioning; the operational process is incomplete.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2279665) · [Course index](README.md) · [Review guide](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, examples and suggested checks are teaching additions, not observed Foundry results. Next: review this lesson and its question, then use [the later practice plan](PRACTICE.md) after all course notes and understanding review are complete.
