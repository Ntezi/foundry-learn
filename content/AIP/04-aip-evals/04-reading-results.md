# 04 — Reading results

*Sources: [Analyze run results](https://www.palantir.com/docs/foundry/aip-evals/analyze-run-results/) · [Write run results to a dataset](https://www.palantir.com/docs/foundry/aip-evals/results-dataset/) · [Evaluations metrics dashboard](https://www.palantir.com/docs/foundry/aip-evals/metrics-dashboard/) · [AIP Logic overview](https://www.palantir.com/docs/foundry/logic/overview/) · checked October 8, 2026 · Ready for Review*

A run has finished with an 86% pass rate. This note follows one failing case from the summary to the cause, then covers the three places results can go next.

## From summary to cause

**[Docs]** With pass criteria on the evaluators, AIP Evals marks each test case **Passed** or **Failed** and shows the overall pass percentage.

**[Example]** Seven of Kestrel's 49 cases failed. Daniel opens one.

**Step 1 — Open the debug view.** **[Docs]** In AIP Evals: *Results* → select the run → *Test cases* → hover a result → **Open**. In Logic or Chatbot Studio: hover the case in the run results dialog → **Debugger**.

**Step 2 — Read what the view offers.** **[Docs]**

| For | You see |
|---|---|
| The test function's inputs and outputs | Always |
| TypeScript or Python functions | Syntax-highlighted code that ran |
| Logic functions | The native Logic debugger, step by step |
| Evaluators | Inputs, outputs, expected vs actual, and **debug outputs** |

**[Docs]** LLM-as-a-judge returns its **reasoning** as a debug output. Custom evaluators can return strings that appear the same way, and a custom evaluator built in Logic can be opened in the Logic debugger.

**[Example]** The failing case: the tone judge said false. Its reasoning: the draft "thanks the customer for their patience" twice, which the judge counted as two apologies. Daniel decides the **judge's condition** is the problem, not the draft, and rewrites it: "The message apologises at most once. Thanking the customer does not count as an apology."

**[Explanation]** A failed case has three possible culprits: the function, the test case's expected value, or the evaluator. Check them in reverse order; evaluator wording is the cheapest to get wrong and the cheapest to fix.

**Step 3 — Group the failures.** Two documented helpers:

- **[Docs]** **Analyze with AI FDE**, from a run's *Test cases* tab in AIP Evals or from the run results dialog in Logic. AI FDE opens with the run's context to find root-cause patterns and suggest prompt changes ([07](../07-end-user-apps/README.md)).
- **[Docs]** The Logic pages describe a **results analyzer** in the Results view that groups failing cases into root-cause categories and suggests targeted prompt edits.

## Where results go

| Destination | **[Docs]** what it holds | Conditions |
|---|---|---|
| **Results view** in AIP Evals, Logic or Chatbot Studio | Aggregates, per-case results, debug views; compare targets when a suite has several | User-scoped results disappear after 24 hours |
| **Metrics dashboard** | Charts and statistics; aggregate or per-case comparisons; an **LLM trace viewer** (double-click a case under *View tests*), including the judge's decision process | **Metric objectives aren't supported** in the dashboard view |
| **Run results dataset** | Function outputs, evaluator results, user and automatic metadata, errors; intermediate parameters ([02](02-intermediate-parameters.md)) | Only with **project-scoped** runs, and the dataset must be in the **same project** as the suite |

**[Docs] Dataset limits worth knowing:**

- The **passed/failed status** per metric is "not yet supported" in the dataset. You get the raw metric values, not the verdicts.
- A function that **edits the Ontology** writes no function output.
- If you remove the dataset you can't select it again; create a new one.
- Create it from the suite page: *run history dataset* section → **Create dataset**.

**[Docs]** The page's motivating case: subject-matter experts who won't use AIP Evals can see results in Workshop or analyse them in Contour.

**[Example]** Kestrel writes release runs to `delivery-desk-eval-runs` in `Delivery Desk [Workflow]`. Because verdicts aren't in the dataset, a small pipeline recomputes pass/fail from the metric values with the same thresholds as the suite, and a Workshop page shows Ama's lead the pass rate by rule over time.

**[Explanation]** Recomputing verdicts means the thresholds now live in two places. Note them in the pipeline's description and change both together.

---
[Module index](README.md) · Previous: [03 — Runs and experiments](03-runs-and-experiments.md) · Next module: [05 — AIP Chatbot Studio](../05-chatbot-studio/README.md)
