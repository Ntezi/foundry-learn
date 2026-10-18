# 39 — Enable object edits: establish the capability to capture decisions

The Order type is backed by prepared data from `all_orders`. To support the course's assignment operation, inspect the correct training type in Ontology Manager, open **Datasources**, enable **Allow edits** if needed, and save to the Ontology.

The purpose is to let the object model incorporate user-driven changes. You are not editing the transformation graph or rewriting the original uploaded CSV by checking this setting.

## Distinguish three kinds of change

| Change | Where its definition belongs in this workflow |
|---|---|
| Correct how source dates are standardized | Pipeline transformation logic. |
| Decide which prepared field maps to an Order property | Ontology mapping. |
| Record a worker's chosen assignee | An operational object edit through the configured Action. |

A source correction and an operational decision can affect values that appear on the same screen while having different origins. Understanding that distinction prevents you from trying to implement every user decision by modifying the source pipeline.

## How to think about edited state

The useful conceptual model is that the application-facing Order can reflect backing data together with supported user edits. Do not treat it as a temporary value changed only inside the current browser.

When backing data changes later, how it interacts with edits depends on the object configuration and edit-resolution behavior. Avoid universal claims such as “every build overwrites assignments” or “every edit always wins.” Review the actual configuration and the [official explanation of how edits are applied](https://www.palantir.com/docs/foundry/object-edits/how-edits-applied) when designing that interaction. This speedrun does not fully exercise competing source and user updates.

In software terms, this is a state-ownership question: which system supplies a property, which operation can change it, and what happens when multiple update paths exist?

## Enabling capability is not granting unrestricted access

Allowing edits and permitting a particular person to submit an Action are separate concerns. The following lesson restricts the training Action to your user. Do not infer that every viewer can now make every possible change.

Also inspect the existing type before changing it. The recorded training type is Marius Order with API name `MariusTrainingOrder`; a similarly named shared type may have a different access design. Enabling edits on the wrong type would not fix the intended application's configuration.

The old training record kept object edit history disabled. That is historical setup evidence, not a complete audit strategy or an instruction to turn off existing history elsewhere. Object edit history and other logs are distinct facilities; absence of one should not be described as proof that no logging exists at all.

## What this lesson establishes

After the correct setting is saved, the model has the edit capability required for the next operation. That does not prove an assignment Action exists, that Workshop invokes it or that any real assignment has succeeded.

**Check yourself:** after enabling edits, should a worker's name in the raw CSV automatically change? No. The tutorial configures object-layer behavior; an external write-back integration would be separate work.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792200) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
