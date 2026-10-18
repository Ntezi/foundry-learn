# 02 — Evaluating inside a function

*Sources: [Use intermediate parameters to evaluate block output](https://www.palantir.com/docs/foundry/aip-evals/intermediate-parameters/) · checked October 8, 2026 · Ready for Review*

**[Docs]** Evaluating only the final output "may be insufficient" for functions that chain several operations. AIP Logic and AIP Evals let you expose a **block's output** as an **intermediate parameter** and evaluate it like a final output.

## How

**[Docs]** Two steps:

1. Select the **flask icon** on a Logic block to expose its output as an intermediate parameter.
2. Pick that parameter in the evaluator configuration panel.

**[Docs]** Intermediate values are also written to the run results dataset, if one is set up ([04](04-reading-results.md)).

## Why it matters: locating the fault

**[Example]** The Logic version of the delay-message drafting has two stages ([03-02](../03-aip-logic/02-building-a-logic-function.md)):

```text
order ──► [facts]  Execute function: shipmentFacts  ──► [reasonText] conditional ──► [draft] Use LLM ──► output
             ▲ flask                                        ▲ flask
```

A failing case says "the draft mentions the wrong date". Without intermediate parameters you can't tell whether the **facts** were wrong (a data or function bug) or the **model** ignored correct facts (a prompt problem). With the flask on `facts`:

| Evaluator | On | Tells you |
|---|---|---|
| Temporal range: `facts.etaLocalDate` within the expected day | Intermediate parameter | The data path is right |
| Regex: the draft contains that date | Final output | The model used it |

If the first passes and the second fails, fix the prompt. If the first fails, no prompt change will help.

**[Explanation]** This is the evaluation version of splitting a Logic function into blocks ([03-04](../03-aip-logic/04-logic-in-production.md)): each block becomes something you can test on its own.

## Evaluating edits

Functions that edit the Ontology are evaluated differently. The docs page *Evaluate Ontology edits* is covered in the Ontology area: [Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md) explains how those evals run edits in an Ontology simulation instead of writing them.

**[Docs]** One related limit, from the results-dataset page: a tested function that edits the Ontology "will not produce a function output" in the results dataset ([04](04-reading-results.md)).

---
[Module index](README.md) · Previous: [01 — Evals concepts and suites](01-evals-concepts-and-suites.md) · Next: [03 — Runs and experiments](03-runs-and-experiments.md)
