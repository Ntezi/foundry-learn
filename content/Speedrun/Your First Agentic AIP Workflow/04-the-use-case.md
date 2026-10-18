# 04 — The Use Case

*Module: Overview · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Start with the work people actually perform

The training team recruits candidates for clinical trials. Each trial has inclusion and exclusion conditions described in a protocol, while patient information may be inconsistent, incomplete or written in free text. The task is to compare the evidence about a candidate with the relevant criteria.

The supplied foundation contains Patient and Clinical Trial object types and a Workshop application. You enhance that foundation; you do not construct the entire Ontology and data pipeline from scratch in this course. This keeps attention on the decision step and its integration into an operational process.

The broader process has three stages: assemble the criteria and candidates, review eligibility, then enroll eligible people. The exercise targets the middle stage. Recording a suitability decision should not be casually described as completing enrollment. Later instructions reuse an Action named Modify Eligibility Decision; no separate enrollment operation is demonstrated in this first half.

## Why a binary answer is insufficient

Consider a fictional equipment-loan policy as a non-medical analogy. An applicant must belong to the organization and have completed safety training. One record confirms both. Another confirms membership but says nothing about training. The second record is not equivalent to a documented training failure: the evidence is incomplete.

The same distinction motivates three outcomes in the course: Suitable, Not suitable and Manual review required. The final outcome preserves uncertainty as work that remains to be done. A system that forces every incomplete record into yes or no hides uncertainty instead of resolving it.

Do not infer that any single unknown always determines the outcome. If another known fact conclusively disqualifies a candidate under the policy, the correct behavior depends on the agreed decision rules. Resolving such precedence belongs with the subject-matter expert and later test cases, not an assumption improvised by the model.

## Why use an LLM here?

The motivation is interpretation of varied text. If a rule and all its inputs are already structured and precise, ordinary comparisons may be easier to test. An LLM is useful where extraction and interpretation are hard to express as simple conditions. A hybrid design can extract facts with a model and enforce clear rules deterministically. That is an engineering alternative, not the exact course implementation.

The key trade-off is flexibility versus predictability. A model can interpret language that a brittle parser misses, but it can also misread missing information or produce unsupported reasoning. The later evaluation module exists because a plausible example is not sufficient evidence of reliability.

**What to remember:** define the decision, evidence, unresolved state and subsequent operation before writing a prompt. Ask yourself which person handles unresolved cases and which action actually changes state. If those answers are missing, the workflow is not yet fully specified.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2278613) · [Course index](README.md) · [Review guide](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, examples and suggested checks are teaching additions, not observed Foundry results. Next: review this lesson and its question, then use [the later practice plan](PRACTICE.md) after all course notes and understanding review are complete.
