# 29 — Publish your Agent

*Module: Automate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Publish the configuration you intend other components to use

Return to AIP Logic and open Configuration. Select the Ontology you are using and can access. Give the published function a username-prefixed display name, such as `[username] Review Patient for Clinical Trial`, and a unique identifier such as `yourUsernameReviewPatientForClinicalTrial`. The lesson calls this identifier an “AIP name”; inspect the actual identifier field in your interface rather than treating that wording as a separate concept.

Select User-scoped execution, then Publish and Done. These are later practice instructions; no function has been published in this notes pass.

## Why publication is separate from saving

Saving preserves editor work. Publication makes an identifiable function available to supported consumers. The next lesson configures Automate to use it. That separation lets you reason about the candidate you are editing and the version a consumer actually invokes.

Think of a tested implementation and a released artifact. A consumer should use the artifact you intended to release, not merely whatever code happens to be open in your editor. Record the published identity/version during practice and compare it with the version selected in the automation.

The course says the published function can be used anywhere in Foundry. Read that as availability for supported integrations, subject to permissions, types and execution compatibility. Publication is not a universal access grant and does not make an incompatible consumer accept the function.

## Publish the tested choice, not the last experiment

The previous lesson changed the model for comparison. Before publication, confirm which model and prompt you selected and why. If you edited the configuration after the successful evaluation, that run no longer fully describes the artifact you are publishing.

The output schema also matters. Evaluation exposes a block for measurement, while the automation consumes a function with its own behavior and integration requirements. Keep these interfaces distinct when checking that the intended version is usable.

## Security scope is another explicit choice

The lesson specifies user-scoped execution. This is separate from prompting strategy and write mode. During later practice, verify the actual identity used when the automation invokes the function; a successful evaluation under your own access does not by itself prove every future invocation can read and edit the same resources.

Names help prevent collision between learners, but a username prefix does not establish access isolation. Select the right resource and check its context rather than relying on appearance alone.

**Evidence to preserve:** published name and identifier, Ontology, version, model/prompt configuration, security scope and the evaluation runs supporting the release choice. No successful execution is implied merely by recording a publication.

**Review question:** why might the automation still run an older behavior after you save a prompt change? Saving an editor change does not prove the consumer is using a newly published version. Inspect publication and the consumer's version binding.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282382) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
