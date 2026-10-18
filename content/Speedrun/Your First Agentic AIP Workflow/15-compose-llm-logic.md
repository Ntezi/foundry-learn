# 15 — Compose the LLM Part of your Logic

*Module: Create an Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Separate policy, evidence and output contract

Insert a Use LLM block. Its system instructions define the assessment behavior; its task prompt supplies the particular trial criteria and patient information. This separation is similar to reusable business logic receiving request-specific data.

The intended decision has three possible meanings:

| Result | Intended interpretation |
|---|---|
| Suitable | The supplied evidence supports suitability under the criteria |
| Not suitable | The supplied evidence supports unsuitability |
| Manual review required | Relevant missing or ambiguous information prevents a determination |

The course asks for a one-sentence reason with the decision. This helps a reviewer locate the basis of the result, but it is still generated output and must be compared with the evidence.

## Correct a field-name mismatch before wiring the Action

The page's example prompt requests `enrollment_decision` and `enrollment_reasoning`. Its later output-configuration instructions instead create `eligibility_decision` and `eligibility_reasoning`. The following Action lesson selects the **eligibility** fields.

Use the output schema and downstream mapping as one consistent contract, and adapt the prompt to request those same eligibility names. This is an explicit notes correction, not a verbatim reproduction of the supplied prompt. Do not assume that the platform will reliably reconcile two naming conventions for you.

The page also uses wording about enrolling a suitable candidate. The configured Action records eligibility, so the instruction should describe assessing and recording suitability, without claiming that enrollment is performed.

A concise teaching rewrite is:

```text
Assess the supplied patient information against the supplied trial criteria.
Use Suitable, Not suitable, or Manual review required as the decision.
Use Manual review required when relevant uncertainty prevents a decision.
Return eligibility_decision and eligibility_reasoning; explain the basis
in one sentence. Do not invent missing facts or claim enrollment occurred.
```

This is suggested wording to understand and later test, not a prompt proven on your model. The exact precedence between a decisive exclusion and an unrelated unknown should be agreed with the subject-matter expert and included in evaluation cases.

## Supply the actual evidence

Use `/` and the variable picker to replace every placeholder with a real variable. Plain text such as `<age>` is not a binding merely because it resembles a template expression.

| Prompt item | Intended source |
|---|---|
| Criteria | Relevant criteria property of `clinicalTrial` |
| Age, contraception, diagnosis, disease stage | Corresponding properties of `patient` |
| Gender, health status, informed consent | Corresponding properties of `patient` |
| Lab results, lifestyle factors | Corresponding properties of `patient` |
| Pregnancy status, treatment history | Corresponding properties of `patient` |

These labels are taken from the course's task prompt. Select the actual installed properties through the picker; the text does not establish every underlying API name. Retain labels around inserted values so the model can tell which fact represents which attribute.

A typed object input does not mean every relevant field automatically appears in the prompt. Conversely, adding more unrelated data does not necessarily improve the answer. Supply the evidence needed for this assessment, preserve missingness, and inspect the rendered values rather than assuming the template is correct.

## Configure the result and strategy

Set the output to a struct with two String fields: `eligibility_decision` and `eligibility_reasoning`. Select **Single completion** under Model settings → Prompting strategy, as the lesson specifies.

A struct creates addressable fields for downstream blocks. Two String fields alone are not an enum and do not prove that the model will choose an allowed label or provide sound reasoning. Schema correctness, allowed values and evidence-based correctness are separate checks.

The configured sequence does not demonstrate dynamic tool selection. You will add the Action as a separate block. The later generic discussion of Chain of Thought should not override this concrete instruction.

## Diagnose the smallest failing boundary

If a required field is absent, inspect the prompt/schema names. If a reason references the wrong criterion, inspect the selected trial and rendered input. If a correct decision arrives in the wrong Action field, inspect the mapping rather than changing the prompt. If the model treats an unknown as a negative fact, add an explicit test case and refine the behavioral instruction based on observed results.

**Remember:** a model result can be well-formed and still wrong. The purpose of this lesson is to define a testable contract, not to establish reliability from a carefully worded prompt.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2279762) · [Course index](README.md) · [Review guide](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, examples and suggested checks are teaching additions, not observed Foundry results. Next: review this lesson and its question, then use [the later practice plan](PRACTICE.md) after all course notes and understanding review are complete.
