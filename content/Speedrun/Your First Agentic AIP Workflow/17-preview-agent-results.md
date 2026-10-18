# 17 — Preview Results of your Agent

*Module: Create an Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Preview is an integration check

The course asks you to open the play control, populate the function inputs and choose Preview run. It gives the fictional patient Priya Nair and the trial Glycurex for Type 2 Diabetes as example selections. The Debugger opens to show execution steps. Hover over the object associated with the proposed edits and inspect the decision and explanation.

These are source-provided selections, not a claim that those objects exist in your installation or that a specific eligibility result is correct. No preview was executed during this notes pass.

## Read the trace in dependency order

1. **Inputs:** confirm the patient and trial identities. A correct result for the wrong pair is still a failure.
2. **Rendered evidence:** check the criteria and patient values that actually reached the model. Look for literal placeholders, absent values and incorrect bindings.
3. **LLM output:** inspect both field names, the decision label and the explanation. Check the explanation against the evidence rather than judging its fluency.
4. **Action arguments:** verify the same patient reference is used and the decision and reasoning are not swapped.
5. **Proposed changes:** inspect the object and properties affected. Compare them with the intended domain operation.

This sequence is like debugging an endpoint through request parsing, application logic and the database command. Investigating upstream evidence before downstream effects helps isolate the cause.

## A successful preview has a limited meaning

The lesson describes proposed Ontology edits. Seeing a proposal is not evidence that the application's persistent record changed. Likewise, a successful technical run does not establish a correct decision, and one correct example does not establish reliable behavior across many cases.

Later practical evidence should distinguish the configuration used, observed model output, proposed changes and any separately verified persisted effect. Do not label a preview as an enrollment event or an automated production run.

Current supporting documentation distinguishes legacy Logic edit outputs from staged-write behavior. In staged-write mode, edits use temporary storage and apply when execution completes; this also affects downstream integration. Enrollment availability and configuration can vary. Verify the actual mode before interpreting a future run, rather than generalizing that every play/run control is non-writing. We have not changed a mode or executed a function. [Official staged-write documentation](https://www.palantir.com/docs/foundry/logic/staged-writes/).

## Correct the generic takeaway

This page discusses Chain of Thought behavior and selecting tools. However, the earlier configuration explicitly chose Single completion with a fixed Action afterward. Read that discussion as broader context, not a statement that you configured dynamic tool selection here. The debugger's observable steps and outputs are useful evidence; do not treat them as access to a model's complete internal reasoning.

## Useful counterexamples for later testing

After the official example, a supplemental test set should include relevant missing information, conflicting evidence, a clear negative case and a clear positive case. Expected outcomes should be agreed before running the model. That prevents you from accepting whichever answer happens to appear as the correct one.

If you see the expected label with a false explanation, the test has not fully passed. If you see valid output but the wrong edit target, the mapping has not passed. Evaluation needs to cover both model behavior and operational effect.

**Review question:** the debugger proposes Manual review required on the correct object. What is still unknown? Whether the output is justified, whether any change persisted, whether a reviewer receives the case and whether other cases behave reliably. Each needs separate evidence.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2280712) · [Course index](README.md) · [Review guide](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, examples and suggested checks are teaching additions, not observed Foundry results. Next: review this lesson and its question, then use [the later practice plan](PRACTICE.md) after all course notes and understanding review are complete.
