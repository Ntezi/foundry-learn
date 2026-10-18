# First-half review — Your First Agentic AIP Workflow

**First-half checkpoint: lessons 01–18 were prepared first. Continuation was subsequently authorized; lessons 19–38 are now available in the [second-half guide](SECOND-HALF-REVIEW.md).** The notes explain an implementation; they do not claim it has been built. Learn is 18/38 after page viewing on September 12, 2026. Practical work is Not Started.

## Read for these four ideas

1. **Identity stays outside generated text.** The patient object flows from the function input into the Action. The model generates the assessment fields, not the identity of the record to edit. Read [Configure Inputs](14-configure-inputs.md).
2. **A prompt is part of an interface contract.** The course prompt's enrollment field names disagree with its eligibility output fields. The notes align the prompt, struct and Action, and explain why structured output is still not proof of a correct decision. Read [Compose the LLM Part](15-compose-llm-logic.md).
3. **A shared Action gives humans and AI the same business operation.** Both callers still need correct arguments and appropriate authority. Read [Ontology edits](16-instruct-agent-edit-ontology.md).
4. **An unresolved outcome is work to route.** Manual review required does not itself notify someone. A previewed edit does not prove persistence. Read [Human-AI teaming](11-human-ai-teaming.md) and [Preview](17-preview-agent-results.md).

## A worked example without medical assumptions

This is a supplemental equipment-loan analogy, not the official patient exercise. A fictional policy requires confirmed organization membership and completed safety training. We define the example's decision rules explicitly: confirmed compliance is Suitable; a known failure is Not suitable; missing evidence with no decisive failure is Manual review required.

| Applicant | Membership | Safety training | Expected outcome under these example rules |
|---|---|---|---|
| A | Confirmed | Completed | Suitable |
| B | Confirmed | Explicitly not completed | Not suitable |
| C | Confirmed | Unknown | Manual review required |

For applicant C, an appropriate explanation identifies the missing training evidence. It should not invent a failure or claim the equipment was issued. The application command receives C's original object reference and the generated outcome and explanation.

Now imagine the output fields are named `enrollment_decision` and `enrollment_reasoning`, but the next block expects `eligibility_decision` and `eligibility_reasoning`. The meaning may seem obvious to you, but the interface is inconsistent. Fix the contract before judging model quality. Next imagine the fields are correct but the command receives applicant A. The language answer can be sensible while the operation targets the wrong entity. That is why input identity and Action mapping both need inspection.

Finally, storing Manual review required for C does not tell you whether a reviewer receives the task. Nor does a displayed proposal prove that C's persistent record changed. You need separate evidence for both.

## Explain these without looking at the notes

1. How does this course differ from the previous retrieval-and-answer AIP speedrun?
2. Why install an existing application before building the AI behavior?
3. How do a learning Project, course folder and Ontology prefix serve different purposes?
4. Why are `patient` and `clinicalTrial` Object inputs rather than names in a prompt?
5. Does selecting an Object input automatically supply all its properties to the LLM?
6. What is the difference between the system instructions and task evidence?
7. Which field names should agree across prompt, struct and Action?
8. What does a two-String-field struct establish, and what does it not establish?
9. Does this exercise demonstrate a model choosing a sequence of tools?
10. Why can swapping decision and reasoning escape a basic type check?
11. How does missing evidence differ from a known failure?
12. What remains to be built after storing Manual review required?
13. Why is an eligibility decision not equivalent to enrollment?
14. What evidence distinguishes a proposed edit from a persisted result?
15. Why should model selection for the package pipeline be recorded separately from the new LLM block?
16. What would you inspect before changing a prompt that appears to use the wrong trial?

## Answer guidance

1. The previous course returns a grounded answer; this exercise feeds a model result into an operational Action.
2. It establishes the domain and manual baseline, so you enhance a defined operation rather than inventing the process inside a prompt.
3. The Project is the expected Foundry resource container, the folder organizes this course, and the prefix distinguishes installed Ontology entities. Local Markdown folders are separate from all three.
4. Typed references identify entities and allow explicit property access and a stable mutation target. Names can be ambiguous.
5. No. The task prompt must bind the relevant properties explicitly.
6. Instructions describe the assessment behavior; task data supplies this invocation's criteria and candidate information.
7. Use `eligibility_decision` and `eligibility_reasoning`, consistent with the output configuration and following Action lesson.
8. It establishes named typed fields. It does not guarantee allowed labels, sound reasoning or a correct target.
9. No. Single completion is followed by a builder-selected Action block.
10. Both are strings; semantic roles differ even when types match.
11. Unknown is not automatically false. Outcomes depend on the agreed criteria and precedence rules, which evaluation should test.
12. A reliable human handoff: ownership, visibility, resolution and evidence. These are not demonstrated just by the label.
13. The configured operation modifies an assessment; a separate enrollment process is not shown in this half.
14. Inspect actual post-execution object state and execution context separately from the preview proposal. No such execution occurred here.
15. They serve different configured components; choosing one does not establish the other's model binding.
16. The selected trial object and the rendered criteria binding, before altering model behavior.

## Review within the two-hour daily limit

Use one or more of these sessions as needed. They are proposed allocations, not measured study hours:

| Session | Reading | Active recall and discussion | Total |
|---|---|---|---|
| A | Lessons 01–07, 60 min | Prerequisites, process and setup, 30 min | 90 min |
| B | Lessons 08–13, 60 min | Manual workflow and human handoff, 30 min | 90 min |
| C | Lessons 14–18, 75 min | Worked example and questions, 45 min | 120 min |

These deliberately allow slower learning than the published walkthrough. They are optional pacing blocks, not extra time silently inserted into the old deadline plan. If all three are needed, reconcile them with the central remaining-work estimate; do not count assistant writing as time you studied.

**ACTION REQUIRED FROM ME**

Review the first half, especially lessons 11 and 14–17. Tell me whether the explanations are sufficiently detailed and identify any unclear concepts or answers you want to discuss. Continuation to the evaluation and automation half has now been authorized and completed as notes. Complete all course notes and understanding review before the separately planned Foundry practice phase.

[Course index](README.md) · [Practice plan](PRACTICE.md)
