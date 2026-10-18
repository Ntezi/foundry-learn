# 23 — Configure Test Cases

*Module: Evaluate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Cover the three outcomes intentionally

Use Manual beside Add test cases, then add two more manual rows so there are three. Each row needs a patient input, a clinicalTrial input and an expected decision. Save the configured cases.

The course text describes a suitable patient, an unsuitable patient and a patient with missing information. Its embedded screenshot was inspected for the specific examples:

| Patient | Trial | Expected value shown in the course |
|---|---|---|
| Priya Nair | Glycurex for Type 2 Diabetes | Suitable |
| Vivek Kapoor | Glycurex for Type 2 Diabetes | Not suitable |
| Yash Rajan | Glycurex for Type 2 Diabetes | Manual review required |

These are labels supplied for fictional course data. They are not clinical advice, observed model results or evidence that a same-named object in another installation has identical properties. During practice, select the correct objects and inspect their current data before interpreting a discrepancy.

## Why three rows are useful but incomplete

Each row exercises a distinct outcome. That catches a simplistic implementation that always emits one label. It also makes the uncertainty route visible instead of treating it as an afterthought.

However, one case per outcome is not complete coverage. Many different conditions can lead to the same label. Missing one relevant field, contradictory statements and a value exactly at a threshold are different challenges even if they all belong to one category in some examples.

The course conclusion later calls the suite comprehensive of all possible cases. The notes correct that claim: these three examples span the three displayed outcome categories, not every possible patient, protocol or data-quality scenario.

## Preserve the reason for the expected value

In a practical test record, add a short independent explanation of why the expected decision follows from the notional evidence. The official evaluator only needs the label, but a human maintaining the test needs to know its basis. Otherwise a future protocol change may leave a stale expected value that makes a correct model appear wrong.

Object inputs also create a reproducibility question: if the object's properties change between runs, you may no longer be testing the same evidence even though the row still references the same patient. Record the values or relevant data version alongside a comparison. This is an engineering verification recommendation, not a claim that the course automatically snapshots everything.

## Extend after the baseline

Supplemental cases should target actual failure modes: relevant blanks, explicit negatives, conflicting evidence, unfamiliar phrasing and valid boundary values. Agree expected behavior before running. Keep some independent cases separate from those used repeatedly to tune the prompt, so improvement is not just memorization of the development set.

**Check:** if all three cases pass, why not automate every similar workflow immediately? The sample is small and scores only one field; operational correctness, permissions, input diversity and downstream effects still need evidence.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282376) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
