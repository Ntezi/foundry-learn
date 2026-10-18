# 26 — Compare Results to Another LLM

*Module: Evaluate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Change one variable to answer a useful question

Return to the Use LLM block and change Model. The course offers GPT-4.1 mini or another model of interest; use an available model in your enrollment during practice. Choose Save and run in the evaluation drawer. When it finishes, open Most recent run and use Click to compare to another run. Select the intended runs in the two selectors and compare metrics and individual cases.

The selectors also show which model each run used. More detail is available through Analyze in Evals or View metrics dashboard. No model comparison has been executed in this notes pass.

## What makes a comparison fair?

Keep the prompt, output schema, evaluator options, expected labels and input evidence unchanged while comparing models. If object properties changed between runs, the same object references do not necessarily mean the same test data. Record enough context to explain the comparison.

Suppose model A matches two cases and model B matches all three. That is evidence that B did better on those observed comparisons, not that B is universally better. Repeated runs and additional cases can reveal variation or failures hidden by the small sample.

An engineering analogy is benchmarking two implementations against the same workload. If the workload changes at the same time, you cannot confidently attribute a difference to the implementation.

## Inspect improvements and regressions separately

Do not look only at the aggregate. A new model can fix one important uncertainty case while breaking a previously correct negative case. The total score may remain unchanged even though the risk profile changes. Pair individual cases across runs so the effect is visible.

For the fictional equipment-loan analogy, incorrectly granting eligibility and incorrectly requesting manual review have different operational consequences. A team may choose a model with more manual reviews if it avoids unsupported approvals, but that trade-off should be explicit and measured with domain-appropriate cases.

The course lets you observe duration as well as pass results. Cost, capacity and operational requirements are additional selection considerations, but these notes do not invent pricing or declare a preferred model. A small speedrun comparison cannot determine the best model for every environment.

## Keep the selected configuration deliberate

Changing the model in the editor changes the candidate configuration. Before publishing in the next module, decide which tested configuration you intend to release. Do not publish the last model tried merely because it remains selected.

Store the run identities and your reason for the selection. If a later run behaves differently, those records help distinguish a model change from a prompt or data change.

**Review question:** model B is faster with the same three-case score. Is the choice settled? No. Check case-level behavior and reasoning, sample size, repeatability and the workflow's requirements before treating that limited result as sufficient evidence.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282379) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
