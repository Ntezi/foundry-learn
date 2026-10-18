# 25 — Inspect the Results

*Module: Evaluate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Read from the aggregate down to the case

After the evaluation finishes, open Most recent run. The course highlights aggregate metrics such as average pass and duration, individual case outcomes, evaluator results and intermediate values.

Start by confirming that the displayed run is the one you intended to inspect. Then read the aggregate as an entry point, not a verdict. A score tells you where to investigate; the case details explain what happened.

## Work through a hypothetical result

Suppose three completed comparisons return pass, fail and pass. The simple fraction of matching cases is 2/3, about 66.7%. This arithmetic is a teaching example, not an observed course result. The UI's aggregation can depend on its metric and iteration configuration, so inspect what its displayed number summarizes.

Now open the failing case. If Expected is Not suitable and Actual is Suitable, first inspect the inputs and evidence. If the wrong trial was bound, prompt tuning is not the first fix. If the evidence is correct but the reasoning ignores a decisive criterion, you have a behavior failure to investigate.

If Expected is Suitable and Actual differs only in case or whitespace, inspect the output contract and evaluator options. That is still relevant when a downstream consumer requires exact labels, but it is a different failure from misinterpreting the evidence.

## Do not ignore passing cases

A matching label can come with an unsupported explanation. It may be correct by coincidence or through a reasoning error that happens not to change this particular outcome. Read the intermediate result, including the explanation, even though the configured evaluator scores only the decision.

Likewise, this suite's metric does not prove that the right patient was updated or that a reviewer can act on an uncertain case. Those remain separate integration and operational checks.

## Turn findings into targeted changes

A useful failure record contains the input identity, relevant evidence, expected label and rationale, actual fields, model/configuration, and suspected boundary of failure. Make one purposeful change, then rerun the relevant suite. Avoid simultaneously changing the prompt, model and expected labels because you will not know which change caused the difference.

Average duration is also not a promise about every case. A slow outlier may matter to operational users even if the mean is acceptable. The three-case example is too small to establish a reliable production latency distribution.

**What to remember:** explain the failure, not just the score. “Two of three labels matched; the remaining case used the wrong trial binding” provides a clear next action. “The AI is 67% accurate” overstates a tiny, narrowly scored experiment.

**Review question:** why inspect a passing case's explanation? Exact-label matching cannot reveal an unsupported or contradictory reason; a correct label can conceal a fragile interpretation.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282378) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
