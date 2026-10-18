# 38 — Conclusion

*Module: Conclusion · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Reconstruct the whole system

The course begins with an existing notional clinical-trial application. You define an assessment function, expose its model decision for testing, compare expected labels, publish a selected configuration and connect it to an automation. The application then gives people a way to inspect assessments and unresolved cases.

The architecture can be explained without naming a single navigation button:

```text
Business process and evidence
    -> typed patient/trial inputs
    -> model assessment with a structured result
    -> established domain Action
    -> published function invoked by a configured effect
    -> object changes visible in the operational application
```

Evaluation measures a selected part of this flow. It does not replace the need to trace the entire effect. That distinction is one of the most useful lessons for a software engineer building an AI feature in an existing system.

## Correct the strongest claim in the conclusion

The course says its evaluation suite covers all possible eligibility cases. The exercise actually provides three examples representing three output categories. Those are different claims. A suite can contain every label while missing many important combinations of inputs and failure modes.

Likewise, the conclusion's successful-build language describes the intended practical course outcome. Our work here completed the lesson reading and detailed notes. It did not install, evaluate, publish or automate a Foundry workflow.

## What you should retain

Identity is a contract: the correct object must reach the Action. Evidence is a dependency: missing or misbound information cannot be repaired by confidence. Output schema is an interface: names and allowed values must agree with consumers. Evaluation is a measurement: its scope and sample limit the conclusions. Automation is an invocation mechanism: events, inputs, versions and effects must be traced. Human review is a process: a label is useful only when people can act on it.

These responsibilities exist even when the authoring tool writes the boilerplate for you. The practical value comes from specifying and verifying the workflow, not from minimizing the number of lines of code.

## Where to go next

The source suggests Mining Your First Business Process and other Build with AIP examples. Those remain future learning options; no new course or exercise was started here. The existing two-hour daily study limit and outstanding review/practice work still apply.

First use the [second-half review guide](SECOND-HALF-REVIEW.md). Then resolve important gaps and follow the [practice plan](PRACTICE.md), recording actual evidence rather than copying the source's success statements.

Learn now shows 38/38 after page viewing, and a course certificate link is available in the index. This is separate from certification exams and independent competence. All 38 lesson notes are prepared; practical work remains Not Started.

**Final understanding check:** can you explain why three passing model labels, one successful manual batch and a visible decision still do not by themselves prove the automatic new-object path? They establish different pieces. You must connect the specific new object to its event, effect inputs/version and saved result.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282392) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
