# 18 — Summary

*Module: Create an Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Reconstruct the workflow without the editor

You should now be able to describe the first-half design from memory:

```text
patient: Patient       clinicalTrial: Clinical Trial
        \                    /
         selected attributes and criteria
                      |
             Use LLM, Single completion
                      |
     eligibility_decision + eligibility_reasoning
                      |
        Modify Eligibility Decision Action
                      |
         inspect proposed change in preview
```

This describes the course configuration. It is not a record of a deployed function or a verified patient update.

The typed inputs keep the operation tied to identified entities. The prompt supplies policy and evidence. The struct gives later blocks named fields. The Action connects the result to an existing business operation. The preview helps you inspect those boundaries together. Each component solves a different problem; none substitutes for the others.

## What this first half does and does not establish

It explains how to create a basic AI-assisted assessment function and inspect a proposed edit. Evaluation and automation are still ahead. The course's summary discusses more flexible agent behavior, but this exercise's configured sequence remains Single completion followed by a predetermined Action.

Do not upgrade that result into “the AI can solve arbitrary tasks.” Its usefulness depends on the supplied information, configured operation and tested behavior. The absence of hand-written boilerplate does not remove specification work, validation or operational ownership.

Similarly, the three decision labels do not constitute a complete human workflow. Manual review required is useful because it preserves an unresolved case. A person, queue or application process still needs to handle it. Recording Suitable is not proof of completed enrollment.

## Transfer the lesson to your own engineering work

Imagine an existing procurement application where a reviewer reads a request and a policy, then records a category and explanation. This course suggests a structured way to add AI assistance: preserve the entity identity, provide the relevant policy and request data, define an explicit output contract and reuse the existing command.

Before automating invocation, check ambiguous cases, invalid outputs, wrong targets and competing human updates. A model's confidence or a polished sentence does not replace those checks. This analogy is supplemental and is not an instruction to deploy another workflow now.

## The next learning boundary

The remaining curriculum covers evaluation, automation and conclusion material. Evaluation should help distinguish an impressive demo from measured behavior on defined cases. Automation will make the invocation happen in response to the intended process condition. Their actual steps will be documented after your first-half review; no lesson bodies from that half were read in this pass.

**Pause here:** use the [first-half review guide](FIRST-HALF-REVIEW.md). Explain where identity is preserved, why the prompt/schema names must agree, how uncertainty becomes an outcome, and why a preview is not persistence evidence.

Notes 01–18 are Ready for Review. The full course's notes remain In Progress, and practical work remains Not Started. Continue to the second half after reviewing the explanations; complete all course notes and understanding review before the later practical phase.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2280713) · [Course index](README.md) · [Review guide](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, examples and suggested checks are teaching additions, not observed Foundry results. Next: review this lesson and its question, then use [the later practice plan](PRACTICE.md) after all course notes and understanding review are complete.

**Continuation update (September 12):** second-half notes have now been prepared after user authorization. The paragraph above records the first-half stopping point. See the [second-half review](SECOND-HALF-REVIEW.md); practical work is still Not Started.
