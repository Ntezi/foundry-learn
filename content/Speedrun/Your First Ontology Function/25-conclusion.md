# 25 — Conclusion

## What you have learned to connect

This speedrun takes an Ontology-backed calculation through four interfaces. You have not merely added four widgets: you have learned to shape domain logic for different consumers and to distinguish analytical results from operational changes.

| Consumer | Function result | Question it answers |
|---|---|---|
| Metric card | Double | What is DSO for this scope? |
| Clinic table | Object-specifier-to-Double record | Which result belongs to each Clinic? |
| Monthly chart | Time-range/numeric aggregation | How does the result vary by starting month? |
| Action | Clinic edit batch | What changes should be applied to this Clinic? |

The return type is part of the application architecture. It expresses what the next component can safely do with the result. A number lacks row identity; a map lacks a time-axis contract; an edit batch expresses proposed changes instead of a display value.

## Tell the whole story in ordinary language

A manager sees an overall collections metric, compares clinics, examines one clinic's trend, and decides whether to put it under review with a goal. Clinic and Financial objects supply the business context. SDK bindings let the TypeScript functions refer to those objects. Released functions expose calculations to Workshop. The Action supplies the path for applying the review decision.

This is useful beyond clinics. A service team might calculate ticket risk, compare customers, inspect a trend and initiate a follow-up. The transferable pattern is the decision loop and its contracts. The DSO formula and random goal policy are specific to this tutorial and should not be copied unquestioningly into another domain.

## Debug by following the dependency

A blank table cell can originate in an incomplete map. A misleading chart can originate in a missing clinic name. A goal inconsistency can originate in copied calculation code or unreliable source data. A failed update can originate in an Action rule or permission even when the function preview succeeds.

Start from the symptom and trace backward: visible output, consumer input/version, function output, query scope, object identity and source data. For writes, also trace forward from proposed edits to submission and observed state. This is familiar service debugging, with Foundry's resource boundaries made explicit.

## Know what remains unproven

The course portal has already confirmed 26/26 required lessons complete. The notes now explain all 26 lessons in depth. Those facts do not establish independent practical ability. No Marketplace installation, repository release, Workshop configuration or Action execution was performed during this teaching revision.

The column-input mismatch still needs an installed-runtime check. The chart's date expression was tested locally and accepted by local Node, but its deployed output still needs preview verification. Formatting thresholds are now confirmed from the source screenshots; their actual visual behavior needs the planned boundary test. Review-state changes and goal clearing need before/after evidence.

The course points toward additional uses of Functions, including other platform consumers. You do not need to master every integration before understanding this one. First explain these four contracts without looking, then complete the scoped practice and record the results.

**Your review task:** choose one failure scenario above and explain how you would isolate it without randomly changing code. Use the [second-half review guide](SECOND-HALF-REVIEW.md) to check your reasoning before moving to practical work.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131570) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course-specific procedures use the official text inspected in this study session; column code, formatting screenshots, monthly code and edit code were rechecked for this half. Examples and design alternatives are explanatory additions. Local JavaScript checks are distinguished from Foundry execution. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-second-half-depth/notes-before-depth-revision.tar.gz). [Practice](PRACTICE.md) remains Not Started.
