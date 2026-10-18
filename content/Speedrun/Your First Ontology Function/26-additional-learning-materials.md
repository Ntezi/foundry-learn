# 26 — Additional Learning Materials

## Use additional material to answer a concrete question

The course links onward to Functions, function-backed Workshop components, Actions, AIP Logic, TypeScript and training tracks. These are useful extensions, but reading all of them in sequence can obscure what you actually need next. Choose a resource because it resolves a specific gap in your understanding or implementation.

As an experienced software engineer, you probably do not need a general explanation of every TypeScript feature. Focus first on the Foundry boundaries that are new: Ontology object identity, generated bindings, consumer-specific function contracts, resource versions and governed edits.

## A reading route based on this course

For the unresolved table signature, start with the [Object Table function-backed columns documentation](https://www.palantir.com/docs/foundry/workshop/widgets-object-table/#function-backed-columns). Compare its current TypeScript v2 example with the installed SDK and the course's Client-only function. Your output should be an explanation of the accepted input and returned object identities, not a pasted example whose generation you have not checked.

For a chart that will not accept an aggregation, use [Chart XY documentation](https://www.palantir.com/docs/foundry/workshop/widgets-chart/#function-aggregations-function-backed-layers). Identify the layer's expected return shape, then inspect the actual function output. Keep data validity and UI binding as separate questions.

For edit behavior, use [TypeScript v2 Ontology edits](https://www.palantir.com/docs/foundry/functions/typescript-v2-ontology-edits). Establish what an edit batch represents and where changes are applied. Then use the Action configuration and precise submission outcome to investigate the real operation.

For a function that exists in source but is missing or outdated in Workshop, use [function versioning](https://www.palantir.com/docs/foundry/functions/functions-versioning). Trace commit, tag, successful release and consumer selection. Do not assume that changing a file updated all consumers.

## Extend only after you can explain the base workflow

[Functions overview](https://www.palantir.com/docs/foundry/functions/overview) helps place this TypeScript v2 tutorial in the wider platform. [AIP Logic](https://www.palantir.com/docs/foundry/logic/overview) becomes more useful once you understand what deterministic calculation and governed mutation already provide. The [training tracks](https://learn.palantir.com/page/training-tracks) connect this speedrun to deeper learning and certification preparation.

An AI-assisted workflow still needs clear inputs, reliable outputs and an explicit mutation boundary. Adding an AI component does not repair ambiguous clinic identity or an unexplained goal policy. Carry the contracts you learned here into any later AIP study.

## A small transfer exercise

On paper, replace Clinic with Customer and DSO with a support-risk score. Specify the scalar input, the table mapping key, the chart's time period and the Action's intended state change. Then identify which parts are platform integration and which require a domain owner to define policy.

A strong answer uses stable Customer identity for row alignment, defines the period represented by each point, and makes the Action express an intentional operation such as starting follow-up. It does not reuse random goal generation simply because the tutorial did.

Before practice, review [the second-half questions](SECOND-HALF-REVIEW.md) and [sources and corrections](SOURCES-AND-CORRECTIONS.md). Then use [P0–P5](PRACTICE.md) to learn through actual execution and record evidence. The notes revision is complete; practical mastery and certification remain separately tracked.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131750) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course-specific procedures use the official text inspected in this study session; column code, formatting screenshots, monthly code and edit code were rechecked for this half. Examples and design alternatives are explanatory additions. Local JavaScript checks are distinguished from Foundry execution. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-second-half-depth/notes-before-depth-revision.tar.gz). [Practice](PRACTICE.md) remains Not Started.
