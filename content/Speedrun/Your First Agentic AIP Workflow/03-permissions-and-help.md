# 03 — Permissions & Help

*Module: Overview · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Access is a dependency of the workflow

The lesson lists Ontology, Workshop, Pipeline Builder, Marketplace, AIP features, AIP Logic, AIP Evals and Automation. Being signed in to Learn gives access to lessons; it does not establish access to those components in your Foundry enrollment.

The permissions divide into resources an administrator can supply and capabilities you must actually be allowed to exercise:

| Requirement | Official fallback or constraint |
|---|---|
| Create a learning Project | An administrator can create it and provide a working folder |
| Deploy Marketplace resources | An administrator can deploy the training resources for each learner |
| Edit the learning Project | The permission must be granted |
| Create Logic, Evals and Automation resources | The permission must be granted |
| Use AIP developer capabilities | The permission must be granted |
| Edit an Ontology | The permission must be granted |

The course directs you to Foundry's Support → Training application for local restrictions and organization-specific instructions. Screenshots may differ from your current interface. A missing or disabled control should first be classified as a permission, availability or UI-version issue; repeated clicking is not diagnosis.

## Why this matters beyond getting past setup

There are multiple authority boundaries. You may be able to read a patient while lacking permission to edit the relevant Ontology or execute the intended operation. Likewise, an installed application may be visible while AIP developer capabilities are unavailable. Treat each capability as a separate dependency rather than assuming an all-or-nothing “Foundry access” flag.

Supporting documentation distinguishes user-scoped Logic execution from project-scoped execution. The first uses the caller's permissions; the second uses the containing Project's permissions and requires the relevant resource imports and markings access. This setting is separate from the Single completion prompting strategy. Check it during later practical work; we have not inspected your runtime configuration. [Official execution settings](https://www.palantir.com/docs/foundry/logic/execution-mode-settings/).

## How to report a blocker usefully

Record the attempted operation, resource location, expected permission, actual error and whether the same resource can be opened in read mode. For example, “I can open my course folder but cannot create an AIP Logic resource” is more actionable than “AIP is broken.” Do not include credentials or unnecessary patient information in a support request.

No message has been sent to an administrator or training support. No new access blocker is claimed: practical access has not been tested in this pass.

**Review question:** an administrator installs the bundle for you. Does that prove you can create and run the agent? No. Installation removes one dependency; authoring, model and runtime permissions still need verification. Keep the evidence of each check separate in the later practice record.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2278612) · [Course index](README.md) · [Review guide](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, examples and suggested checks are teaching additions, not observed Foundry results. Next: review this lesson and its question, then use [the later practice plan](PRACTICE.md) after all course notes and understanding review are complete.
