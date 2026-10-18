# 10 — Explore the Application

*Module: Install Foundational Ontology & Understand Agentic Workflow · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Read the application as a process, not just a screen

The installed Workshop module is named Clinical Trial Recruitment Hub. The course's initial state has one trial and candidate patients whose Eligibility Decision is Pending. Those are expected training conditions, not observations from a live installation in this notes pass.

Open the module from the installation folder during later practice. Inspect the trial selection, patient table and filters. If you inspect the application's configuration in edit mode, return to View before following the operational review path.

Select a patient and choose Review Patient. The overlay presents the protocol and patient details together. This is the evidence context a subject-matter expert needs before making the decision. The interface is arranging information around a task, rather than simply exposing a table of records.

## Three different kinds of state

| State | Example | Why it matters |
|---|---|---|
| UI selection | The highlighted patient | Determines which entity the user is reviewing |
| Domain data | Criteria and patient details | Supplies the evidence used in the decision |
| Recorded workflow outcome | Pending or a suitability result | Represents the business state that an Action changes |

A selection change is not a stored eligibility decision. Opening an overlay is not completing a review. These distinctions are easy to miss when a low-code application hides the API calls you would normally inspect in browser developer tools.

## Inspect the existing command

The course asks you to open Modify Eligibility Decision, inspect the decision and reasoning fields, then close the dialog and overlay without submitting. It mentions Suitable and Not suitable in this manual exploration. Later, the model prompt adds Manual review required. Verify the installed Action's accepted values during practice rather than assuming that the initial two-value description is a complete schema.

This is how you discover the interface the agent will reuse. An Action parameter is like an argument to a domain command: its meaning matters, not merely its data type. Two fields may both be strings while representing entirely different responsibilities.

## A practical debugging habit

Before running any AI, record which candidate is selected, what trial is being reviewed, and which source fields are visible. If the later preview appears wrong, compare those same identities and values with the Logic inputs. That can reveal a wrong-object binding before you spend time rewriting the prompt.

If the initial app is empty, return to the installation readiness explanation. If the data is visible but the review control is unavailable, investigate the operational permissions and application state. These are different failure boundaries.

**What to remember:** reproduce the human's information flow before automating it. The model should not receive a different candidate or a narrower evidence set without that being a deliberate design decision.

**Review question:** what has changed after opening the review dialog and closing it without submission? You inspected the workflow and changed temporary UI state; the exercise does not establish a persisted decision change.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2279656) · [Course index](README.md) · [Review guide](FIRST-HALF-REVIEW.md)

Course instructions are paraphrased. Engineering comparisons, examples and suggested checks are teaching additions, not observed Foundry results. Next: review this lesson and its question, then use [the later practice plan](PRACTICE.md) after all course notes and understanding review are complete.
