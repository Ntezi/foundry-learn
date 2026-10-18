# 09 — Install the Marketplace Product

*Module: Install Foundational Ontology & Understand Agentic Workflow · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Treat installation as dependency binding

Marketplace delivers the course's starting resources. Installing the right product is only part of the task: its resources must be placed in the right folder, associated with an editable Ontology, and supplied with the requested model and organizational inputs.

**Source correction:** this page twice describes a supply-chain Ontology, while its product-selection instructions and the surrounding course concern clinical-trial recruitment. Treat that wording as an apparent copy-and-paste error. Select **Speedrun: Your First Agentic AIP Workflow**, not a different supply-chain product. The actual package in your enrollment remains a later practical check.

## Walkthrough and the reason for each decision

1. Open Applications and search for Marketplace. Within Marketplace, use **Search products**, not Search stores, to find the course's product.
2. Open the product and choose Install or Install again. The course asks for the latest package version. Record the version actually installed so later results have a reproducible baseline.
3. Enable the installation suffix and enter your username. Select Use existing location and browse to the course-specific working folder. These choices help distinguish this installation from another learner's copy.
4. Select a valid namespace and an Ontology you are allowed to edit. If the correct context is unclear, resolve it with the platform administrator rather than assuming that any visible Ontology is the intended one.
5. Resolve the missing Functions input with an available language model. The page gives GPT-4.1 mini as an example for one part of the product pipeline; this is not a requirement or evidence that your enrollment currently offers it. Record the chosen model and version.
6. Choose the organization for Action submission. The generic course says any listed option may be selected; in a real enrollment, use the organization intended for your training installation. This is a contextual adaptation, not a newly discovered platform rule.
7. Enable Prefix ontology entities and use your username. Keep the other course defaults, review the configuration, then install during the later practice phase.
8. Open View Installation and the Installed in link to reach the course folder. The lesson expects two folders and a Workshop module next to the installation.

## Why both suffix and prefix?

The installation suffix distinguishes installed resource names; the Ontology prefix helps distinguish the entities you select later. They are related naming mechanisms, not a substitute for checking actual types and references. When configuring `patient`, for example, choose the Patient type belonging to this installation.

The model selected for the package supports part of its pipeline. Do not assume it is automatically the model selected in the new Use LLM block you author later. Those are separate places where a model dependency may exist.

## Installation success versus usable data

The lesson warns that the pipeline and Ontology can take several minutes to become ready after installation. An initially empty application therefore does not immediately prove the installation failed. Later, inspect the installation and data readiness, allow the documented initialization time, and refresh before deciding what failed.

Repeated reinstallations are a poor first response because they can create more copies without resolving the missing dependency. Preserve the original installation identity and investigate that path first.

**Evidence to collect later:** package version, destination, suffix/prefix, namespace, Ontology, supplied model and whether the application shows its notional objects. No installation or model call occurred in this notes pass.

**Review question:** why might the install screen report success while the application has no patients yet? Resource creation and downstream data readiness are different stages; the course explicitly notes the initialization delay.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2278623) · [Course index](README.md) · [Review guide](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, examples and suggested checks are teaching additions, not observed Foundry results. Next: review this lesson and its question, then use [the later practice plan](PRACTICE.md) after all course notes and understanding review are complete.
