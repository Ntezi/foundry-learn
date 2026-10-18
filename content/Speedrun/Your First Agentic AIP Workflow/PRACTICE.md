# Later practice — Your First Agentic AIP Workflow

**Status: Not Started.** Prepared September 12, 2026. This plan now covers both halves. All lesson notes are prepared; complete learner understanding review before beginning hands-on work. No results below are prefilled as successes.

## P0 — Explain the design without execution

Use the [review guide](FIRST-HALF-REVIEW.md). Objective: distinguish object identity, evidence, output schema, Action mapping and persistence. Expected result: explain the complete path and the source corrections in your own words. Verification: discuss the worked example and unresolved questions. This is understanding review, not a Foundry build.

## P1 — Establish the training foundation

**Official exercise:** lessons 05–10. Objective: use a valid learning Project and install the correct notional clinical-trial application.

Prerequisites: the access listed in [Permissions & Help](03-permissions-and-help.md), a permitted namespace/Ontology and model availability. Reuse an existing suitable learning Project; create the course folder and install the named product with the intended suffix/prefix and inputs.

Expected result: the installation's resources become available and the Clinical Trial Recruitment Hub displays training objects after initialization. Verification: record package version, installation location, type identities, model binding and data-readiness evidence. Inspect the manual review dialog and close without submission as the lesson directs.

Common failures: wrong product, wrong destination, unsupported creation permission, unresolved model input or pipeline initialization not yet complete. Diagnose the existing installation before making additional copies.

Reflection: which supplied resource encodes the business operation your agent will reuse?

## P2 — Author the function contract

**Official exercise with explicit notes correction:** lessons 12–16. Create Review Patient for Clinical Trial, add the two Object inputs, bind the course's evidence fields, configure the struct and Single completion, then map the existing Action's patient, decision and reasoning arguments.

Use consistent eligibility field names in the prompt and schema; this corrects the source mismatch rather than reproducing it. Inspect actual Action accepted values and function execution/write settings. Record the model selected in the new LLM block separately from the installation's pipeline model.

Expected result: a saved, inspectable configuration with the intended references and no unresolved bindings. Verification: follow every input and output into its consumer. This is configuration evidence, not proof of a correct model result or persisted edit.

Common failures: literal placeholders, other learner's types, swapped string arguments, enrollment/eligibility name mismatch or an unsupported decision value. Reflection: which errors can typing catch, and which require semantic inspection?

## P3 — Inspect the official preview

**Official exercise:** lesson 17. Before execution, verify actual run/write semantics in your enrollment. Select the source's example patient and trial if present, run the documented preview, and inspect inputs, rendered evidence, model fields, Action arguments and proposed changes.

Expected result: an explainable proposal affecting the intended training object. Do not preassign a clinical outcome from a name alone. Establish the expected decision from the notional protocol and data before comparing the model result.

Verification: record the input identities, configuration/model, observed result and proposal. Distinguish any separately observed persistence from a preview display. Common failures include wrong evidence, fabricated reasoning and correct output applied to the wrong patient.

Reflection: what has this one run proved, and what remains for evaluation?

## P4 — Supplemental checks to prepare for evaluation

These are teaching additions, not additional official lessons. Prepare cases with a clear supported outcome, relevant missing evidence, conflicting evidence and invalid or unexpected output labels. Define expected outcomes with the domain owner before running them. Also inspect how human resolutions should be protected from stale or repeated updates.

Expected result: a small documented set of cases with explicit expected behavior. Verification: compare both decision and reasoning, and inspect edit targets. Do not treat a single passing example as a reliability rate. Formal evaluation and automation preparation are now included in P5–P8 below.

## Evidence record — unexecuted

| Field | Current value |
|---|---|
| Foundry Project / folder / installation | Not checked |
| Package version and namespace/Ontology | Not checked |
| Input types and test-object identities | Not checked |
| Pipeline model / authored block model | Not checked |
| Execution scope and write mode | Not checked |
| Prompt/output/Action contract | Notes prepared; runtime unverified |
| Preview inputs and result | Not run |
| Persisted object effect | Not verified |
| Evaluation and automation | Not configured |
| Human review routing | Not verified |
| Learner reflection | Pending |

[Course index](README.md) · [Central tracker](../../PROGRESS.md)


## P5 — Build and inspect the evaluation baseline

**Official exercise:** lessons 19–25. Expose the Use LLM block (`useLlm`), create the named suite, accept the expected schema change and configure Exact string match on `eligibility_decision`. Add the three screenshot-confirmed fictional cases in [lesson 23](23-configure-test-cases.md), with independently checked expected labels. Select user-scoped run security as the course specifies.

Before later execution, verify actual runtime/write behavior and access. Expected result: a completed run with case-level comparisons. Verification: record configuration, inputs/evidence, evaluator options, expected and actual values, errors, metric definition and run identity. Inspect reasoning separately from the label score. No pass rate is prefilled.

Common failures: stale labels, wrong intermediate field, casing/whitespace mismatch, wrong object type or execution denial. Reflection: which quality questions remain outside this evaluator?

## P6 — Compare and select a configuration

**Official exercise:** lesson 26. Change only the model, keep evidence and test settings stable, Save and run, then compare the intended two runs. Expected result: a documented case-level comparison, not a predetermined winner. Record both model/configuration identities and explain any regressions or fixes. Broader cases and repeated-run checks are supplemental.

Verification: distinguish a true model change from changed input data, prompt or evaluator. Reflection: why is 3/3 on three labels insufficient to claim universal reliability?

## P7 — Publish and manually verify the effect

**Official exercise:** lessons 28–32. Publish the deliberately selected configuration, record its version, and create the course automation. Verify the Patient set, event-derived patient input, static trial and automatic-edit behavior shown in the source screenshot. Inspect write-mode compatibility: the current staged-write integration may require an Action wrapper/effect instead of the course's Logic effect. Do not silently toggle execution modes.

In the later practical phase, verify the selected objects are the notional training population before the course's all-object manual execution. Expected result: observable per-object effects and matching stored decision/reasoning fields after refreshing Workshop. Record failures and incomplete work explicitly. This verifies the manual path, not new-object triggering.

Common failures: wrong function version, static patient binding, unsupported effect mode, wrong trial, denied execution or stale app view. Reflection: what would a repeated run do to a human-resolved case? The course does not establish that policy.

## P8 — Verify the new-object trigger

**Official exercise:** lessons 33–34. Create one fictional patient through the training application's form, using the pictured data if appropriate. Record the created object's identity. Inspect the addition event in History, its patient/trial inputs, effect status and final stored assessment on the same object.

Expected result: a correlated automatic execution for the new object. No decision is assumed from the patient's name alone. If it is absent from a Pending-only view, search across states before creating another copy. Verify the outcome against the notional protocol and evidence.

Evidence must distinguish the addition event from a manual run. Record actual timing rather than assuming instantaneous execution. Reflection: which failure boundary is implicated if the object exists but no event appears?

## Optional extensions — not required for core practice completion

Lesson 36 suggests protocol processing, a clearer review interface and further process design; lesson 37 introduces interactive assistants. These are future choices, not tasks silently added to the current exercise. Select one only after the core workflow and its limitations are understood.
