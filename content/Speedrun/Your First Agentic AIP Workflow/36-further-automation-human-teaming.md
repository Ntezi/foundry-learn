# 36 — Next Steps: Further Automation and Human-AI Teaming

*Module: Conclusion · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Improve the surrounding process, not just the prompt

The course offers several extension ideas: processing protocol documents, improving the manual-review interface, designing enrollment collaboration and identifying missing process steps. These are suggested directions for further practice, not additional implementations completed by the speedrun.

The common question is where information or responsibility is lost between steps. An operational improvement may require a clearer application, a better data model or a different Action rather than another model call.

## Follow the upstream evidence

The lesson points out that the installed Pipeline Builder already uses an LLM to process the protocol PDF and summarize relevant data. This helps explain the model input required during Marketplace installation.

That creates a chain worth inspecting later: original protocol → processed criteria → assessment prompt → decision. If the criteria summary omits an important condition, the assessment model may produce a plausible answer from incomplete input. Evaluating only the final label can make it harder to locate that upstream error.

A supplemental improvement would retain a clear connection from extracted criteria to the source protocol and test extraction fidelity separately. This is an engineering suggestion, not a claim that such provenance or a dedicated evaluator has been implemented in the bundle.

## Make uncertainty actionable for people

The source suggests modifying Workshop to help subject-matter experts find flagged patients. A useful design might expose a focused manual-review view, the agent's reason, relevant evidence and the next permitted action. Adding an owner and resolution state could make responsibilities clearer.

Start by observing how a person actually resolves a case. If the needed information must come from elsewhere, merely making the row red will not remove the bottleneck. The interface should help the person obtain or inspect the evidence and record what changed.

## Keep enrollment as a separate operation

The extension asks how humans and AI might collaborate on enrollment. That confirms the distinction from the earlier eligibility Action: the speedrun assessed candidates; it did not implement the whole enrollment process.

For a real design, identify the required facts, authorizations, states and accountable decisions before creating another automation. If multiple trials are involved, revisit the single static trial assumption and whether assessment should be represented separately for each patient/trial pair.

## Choose one extension with a measurable purpose

An equipment-loan analogy illustrates the approach. If most manual reviews happen because training evidence is missing, improving evidence collection may reduce the queue more effectively than changing the classifier. Measure the actual cause of delay before choosing an AI feature.

No extension has been built here. After the core practice is verified, select one bounded improvement and define how you will know it helped without degrading other behavior.

**Review question:** why might a better assessment prompt fail to fix missing protocol conditions? The information may already have been lost upstream. Inspect the source-to-criteria step before trying to compensate downstream.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282390) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
