# 02 — Permissions & Help

*Module: Overview · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Access is part of the dependency chain

The permissions lesson explicitly names Ontology Manager, Machinery and Workshop. Later first-half instructions also use Marketplace and Object Explorer. Reading this course in Learn does not establish that those applications or authoring capabilities are available in your Foundry enrollment.

The official permission table distinguishes work an administrator can prepare from capabilities you need directly:

| Requirement | Course guidance |
|---|---|
| Create a learning Project | An administrator can create a Project for the learner |
| Upload files | An administrator can upload them and provide copying instructions |
| Create object types, links and Actions | The permission must be granted |
| Edit the learning Project | The permission must be granted |
| Create Machinery processes and Workshop apps | The permission must be granted |

The actual data lesson uses a Marketplace installation. Therefore the upload fallback in this general permissions table is not evidence that the current package can be installed without the necessary Marketplace permissions. Inspect the route actually used in your enrollment.

## Where to look when an option is missing

The course points to Support → Training in Foundry for local instructions. These may describe restrictions on projects, uploads, Ontology creation or package installation. If New → Process is unavailable, the mining lesson says Machinery may need enabling through Control Panel and that settings and permissions should be checked.

Do not interpret that as an instruction to change organization-wide configuration blindly. During later practice, identify whether the issue is application availability, resource location or authoring permission, then use the enrollment's supported administration path. No setting or permission was changed while preparing these notes.

## Why read access is not enough

Mining from a dataset can create a Log object type and a relationship to the existing process entity. You are not merely opening an analytical chart; the exercise creates Ontology artifacts. A user who can inspect claim rows may still lack permission to create those artifacts.

For an engineer, this resembles being allowed to query a database but not to apply a migration. Both forms of access are useful, but one does not imply the other. The distinction explains why a successful data preview does not guarantee the mining setup can finish.

## Report a blocker at the right level

Record the attempted operation, resource location, actual error and what read-only checks succeeded. “I can inspect Claim objects but cannot install the Log object type” is actionable. “Machinery does not work” hides the failing boundary.

UI labels can change; the source explicitly acknowledges screenshot drift. Prefer the intended operation and verified resource identity over mechanically matching a picture.

**Review question:** why does this course need Ontology creation permission even though the initial Claim type is supplied? The mining setup creates the log representation and its relationship to process entities. Initial data availability does not cover that authoring step.

---
[Official lesson](https://learn.palantir.com/speedrun-mining-your-first-business-process/2102607) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, synthetic examples and suggested checks are teaching additions. No live Foundry installation, data change or process mining is claimed. Next: review this lesson and its question; complete the remaining course notes and understanding review before [later practice](PRACTICE.md).
