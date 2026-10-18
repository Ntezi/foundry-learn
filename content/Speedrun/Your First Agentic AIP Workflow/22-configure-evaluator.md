# 22 — Configure an Evaluator

*Module: Evaluate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Decide exactly what counts as a pass

Add an evaluator and choose Exact string match. Configure Actual value as `Use LLM (block).eligibility_decision`. For Expected value, create a new parameter called Expected value. This adds a column where each test case can specify the intended decision.

The evaluator asks whether two labels match. It does not re-read the protocol and decide whether the expected label was medically or logically correct. That responsibility belongs to the definition and review of the test case.

## Why exact matching fits this field

The decision vocabulary is deliberately small: Suitable, Not suitable and Manual review required. These are operational states, not arbitrary prose. A value that sounds similar to a person may still fail a consumer's contract.

By contrast, several differently worded explanations could convey the same valid reason. Applying exact matching to the entire generated explanation would mix wording preference with factual quality. The course avoids that by scoring only the decision field.

Official documentation says the exact-string evaluator is case-sensitive and includes whitespace by default, with configurable comparison options. Record the effective options if your interface exposes them. Do not silently relax the comparison merely to improve the score. [Evaluator documentation](https://www.palantir.com/docs/foundry/aip-evals/create-suite/#built-in-evaluators).

A supplemental comparison illustrates the consequence:

| Expected | Actual | Default exact comparison |
|---|---|---|
| Suitable | Suitable | Match |
| Suitable | suitable | Mismatch |
| Suitable | Suitable followed by a space | Mismatch |
| Manual review required | Not suitable | Mismatch |

The first two mismatches can be formatting problems; the last is a different decision. Investigate the failure type instead of treating every mismatch as the same kind of model error.

## The evaluator's blind spots

A model can return the expected label and invent the explanation. It can produce the right result for the wrong reason, making it fragile on nearby cases. The Action can then target the wrong patient even though the decision metric passes.

Additional checks could evaluate explanation support, valid vocabulary and correct edit targets. These are supplemental quality requirements, not evaluators configured by this lesson. A custom evaluator also needs its own validation; moving judgment into another function or model does not make the judgment infallible.

The expected-value column is therefore part of a contract you maintain. Keep labels consistent with the Action's accepted values and the first-half output schema. Never populate expected values by copying the model's current answer without independent review.

**Review question:** a run has a 100% exact-label score. What can you conclude? Every scored comparison met the configured match rule for that run's cases. You cannot conclude that the explanations, edits, unseen cases or human handoffs are correct.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282374) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
