# 19 — Introduction

*Module: Evaluate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Why the preview is only the beginning

The first half establishes a route from patient and trial inputs to an LLM result and an Action. A preview helps detect broken bindings. It does not tell you how the model behaves across supported, unsupported and uncertain cases, or whether a later configuration change makes those cases worse.

This module introduces an evaluation suite: a collection of inputs, expected results and scoring rules. You use it to examine behavior and compare models. For a software engineer, it resembles a regression test harness around the part of the function whose behavior is difficult to specify with ordinary source code.

LLM output can vary even with similar or identical inputs. Evaluation is valuable even when a particular configuration appears repeatable: a stable wrong answer is still wrong, and changing a model, prompt or upstream data can change the behavior. Avoid treating non-determinism as the only reason to test.

## Separate three questions

| Question | Evidence needed |
|---|---|
| Did the invocation execute? | Run status and errors |
| Did the model choose the expected label? | Actual output compared with a trusted expected value |
| Did the whole workflow do the right thing? | Correct evidence, explanation, target, edit and downstream behavior |

The course focuses its evaluator on the second question. You will expose the Use LLM block and compare its decision field with an expected string. That is a useful, bounded test. It does not automatically answer the third question just because the resource is called an agent evaluation suite.

## Define success before observing output

An expected result should come from the notional protocol and patient evidence, not from accepting the model's first answer. Otherwise you create a circular test: the implementation provides both the answer and the standard used to judge it.

The three official examples represent the three result categories. They are a starting point for learning the tooling. They cannot cover every combination of incomplete data, conflicting statements, threshold boundaries and unexpected text. Later, keep examples used to tune the prompt separate from additional cases used to check generalization.

A practical analogy is a parser with three smoke tests. Passing them shows those examples work under that configuration; it does not establish that every input string is parsed correctly.

**Remember:** an evaluation score is a statement about a particular dataset, evaluator and configuration. Preserve those details with the result. Without them, “the model passed” is too vague to support a decision.

**Review question:** why evaluate a model that always returns the same label for your first patient? Repeatability does not establish correctness, diversity of behavior or resilience to changes. You still need independent expected outcomes and more than one case.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282370) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
