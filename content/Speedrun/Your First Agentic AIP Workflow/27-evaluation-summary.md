# 27 — Summary

*Module: Evaluate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## What you now know how to measure

The evaluation module adds a measurement path around the model's decision field:

```text
patient + trial + expected label
              |
     configured Logic invocation
              |
   exposed Use LLM decision field
              |
    exact-string comparison
              |
    case result and aggregate metrics
```

The suite contains three source examples and supports comparing runs after a model change. The purpose is to make differences visible and repeatable enough to investigate, rather than choosing a configuration from an attractive single answer.

## Keep the claim proportional to the test

The concrete exercise checks the decision label. It does not automatically score the explanation, the Ontology target or the complete human workflow. Three examples cover three outcome categories, not every possible input. A small passing suite is useful evidence but does not establish production readiness by itself.

The source summary describes what a learner would have done hands-on. In this session, those steps have only been studied and documented. No suite, metric, model call or practical result exists from this notes pass.

## A useful hierarchy of confidence

First verify the contract: the fields and bindings exist and refer to the intended data. Then verify example behavior: outputs match independently defined expectations. Next investigate broader behavior: more varied cases and changes in configuration. Finally verify the operational path: events invoke the intended version and edits affect the right records.

These checks build on one another. Testing many cases against a misbound field creates a large amount of misleading evidence. Conversely, perfect bindings do not guarantee that the model interprets every case correctly.

## What to preserve for the next module

Before later publishing, identify the configuration you selected, the runs used to support that choice, unresolved failures and what the evaluator does not cover. Treat the choice as a release decision with evidence, not as an automatic consequence of reaching the next page.

The following module handles invocation and effects. It will first run the automation manually on existing objects, then demonstrate a new-object trigger. Those are separate paths and need separate evidence. An evaluation suite's success does not establish either path.

**Remember:** a test suite makes quality questions concrete. Its strength comes from the quality of its cases, expected values and evaluator, not simply from the existence of a dashboard.

**Review question:** what should you say if all three decision labels match but explanations have not been reviewed? Report the three matching labels under the recorded configuration and explicitly leave explanation quality unverified. Do not call the entire agent correct.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282380) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
