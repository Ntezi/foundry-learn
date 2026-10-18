# 03 — Runs and experiments

*Sources: [Run an evaluation suite](https://www.palantir.com/docs/foundry/aip-evals/run-suite/) · [Run experiments](https://www.palantir.com/docs/foundry/aip-evals/experiments/) · checked October 8, 2026 · Ready for Review*

A **run sheet**: every setting you choose when running a suite, what it changes, and what Kestrel picked. Then experiments, which are many runs at once.

## Where to run from

**[Docs]** From the **Evals sidebar in AIP Logic** (*Run evaluation suite*, or *Save and run* if there are unsaved changes) or from the **AIP Evals application** (*View* in the Logic sidebar, or open the suite from Files). Single test cases run from the play icon next to each case, which opens the debugger; useful while iterating.

## Run configuration (the cog next to *Run evaluation suite*)

| Setting | **[Docs]** options | Kestrel's choice |
|---|---|---|
| **Function to test** | Logic: *last saved* (default) or a published version. Other functions: published versions only. Several targets at once with *Test multiple functions* | Published version before release; last saved while iterating |
| **Input mapping** | Map suite columns to function inputs; types must match; names needn't | `order` column → `order` input |
| **Execution mode** | **User-scoped** (default): your permissions; results visible only to you and **deleted after 24 hours**; not written to the results dataset. **Project-scoped [Beta]**: all resources imported into the project; results visible to the project, **kept indefinitely**, written to the results dataset if configured | Project-scoped for release runs, so Ama's lead can see them. It's **beta**; if it isn't available, run user-scoped and export the results to Notepad or PDF for the record |
| **Number of iterations** | Run each case several times; the docs recommend **at least three** for LLM-backed functions | 3 |
| **Test parallelization** | **10** cases in parallel by default; lower it if you hit rate limits | 5, to stay under the project's LLM limit |
| **Run metadata** | Branch, version and model captured automatically; add your own key-value pairs | `promptVersion=v2`, `reviewer=daniel` |

- **[Docs]** "A high variance in numeric evaluators like ROUGE score can indicate that the test case and evaluator are not meaningful."
- **[Docs]** Experiments can't be configured in multi-target mode.

**[Explanation]** The two execution modes mirror Logic's own ([03-03](../03-aip-logic/03-execution-modes-and-branching.md)), with one extra consequence: user-scoped results vanish after a day. A release decision based on a run nobody else can see, and that won't exist tomorrow, isn't a decision anyone can audit.

## Comparing two runs

**[Docs]** In the results view, *Click to compare another run* opens a second run side by side; *View diff* is on by default and highlights differing outputs. The debugger button on each test case opens a step-by-step view of the function and its evaluators.

## Experiments

**[Docs]** An experiment tests **all combinations** of parameter values you list (grid search), each combination as a separate run, so you can find the best balance of quality and cost.

**Setup, in the docs' order:**

1. **Parameterise the function.** Add the things you want to vary as **inputs** and use them. For a model: add a model input, make it **optional**, and set each Use LLM block's model selector to that variable (under the *Registered* tab of the selector).
2. **Enable experiments** with the toggle in the run configuration.
3. **Define the experiment**: a name, and values for each experiment parameter. These **override** the per-test values in the suite. The dialog shows how many runs will happen and previews the combinations.
4. **Run experiment**.

**[Example]** Kestrel's experiment before choosing Delivery Desk's model:

| Parameter | Values |
|---|---|
| `model` | current model · a cheaper model from the same provider · the model suggested as a substitute in Upgrade Assistant |
| `extraPromptContext` | "" · "Keep it under 50 words." |

3 × 2 = **6 runs**, each over 49 test cases × 3 iterations = 882 executions in total, plus the LLM-as-a-judge calls. **[Explanation]** Experiments multiply quickly; estimate the executions before pressing run, and lower parallelisation if the project's rate limit is tight ([02-02](../02-bring-your-own-model/02-rest-and-compute-module-backed-models.md#rate-limits-in-numbers) shows how project limits work).

### Reading an experiment

**[Docs]**

- The *Most recent run* card in Logic shows only the **last** run of the set (run 6 of 6); open **Results** in AIP Evals for all of them.
- In AIP Evals → **Results → Runs**, *Group by* a column (for example `model`) to compare aggregates.
- Select **up to 4 runs** and open **Test cases** to compare case by case; group test cases or iterations to make the table readable.
- Hover a row → **Open** for inputs, outputs and logs of the function and its evaluators.

**[Example]** Grouped by `model`, the cheaper model passed the format and refund rules as often as the current one but failed the tone judge more. Kestrel kept the current model and adopted the shorter prompt variant.

---
[Module index](README.md) · Previous: [02 — Evaluating inside a function](02-intermediate-parameters.md) · Next: [04 — Reading results](04-reading-results.md)
