# 04 — Logic in production

*Sources: [Compute usage with AIP Logic](https://www.palantir.com/docs/foundry/logic/compute-usage/) · [AIP Logic metrics](https://www.palantir.com/docs/foundry/logic/logic-metrics/) · [AIP Logic FAQ](https://www.palantir.com/docs/foundry/logic/faq/) · checked October 8, 2026 · Ready for Review*

Three questions once a Logic function is live: what does it cost, is it healthy, and why did it fail. Then pointers to the two production topics the Ontology area already covers.

## What it costs

**[Docs]** Two meters run when Logic executes:

1. **LLM tokens**, measured "in the manner of the underlying model", growing with prompt size, response size and the number of prompts.
2. **Compute-seconds** for blocks. The **block** is "the atomic unit of usage measurement":
   - a basic LLM block execution: **4 compute-seconds**;
   - an LLM block tool execution: **8 compute-seconds**;
   - action, function and data-transformation blocks: **nothing on their own**, but the systems they call (Ontology queries, actions, functions) can use their own compute.

**[Docs]** The page's worked example: two LLM blocks, one of which calls an action, run twice: (2 × 4 + 1 × 8) × 2 = **32 compute-seconds**, plus tokens. It also says to contact your Palantir representative before calculating usage if you have an enterprise contract.

**Open question** [RQ-04](../SOURCES.md#open-research-questions): the example charges 8 compute-seconds per LLM block that *uses* a tool. The page doesn't say whether a block that calls tools several times in one run is charged 8 once or once per call.

**[Example]** Cost worksheet for Delivery Desk's drafts, using the Logic version from [02](02-building-a-logic-function.md):

| Item | Per draft | Per month (Ama's team: 1,200 delayed orders) |
|---|---|---|
| Use LLM block, no tools | 4 compute-seconds | 4,800 compute-seconds |
| *Execute function* block (`shipmentFacts`) | 0 for the block; the function's own compute | Measure in Resource Management |
| Conditional and variable blocks | 0 | 0 |
| Tokens | Prompt with ~6 properties + 3-sentence answer | Model's token rate × volume |

If the same feature were a single Use LLM block that **queried** the order and shipment with a *Query objects* tool, each draft would be at least 4 + 8 = 12 compute-seconds, and the tool's results would add tokens. **[Explanation]** Loading facts deterministically and passing only the properties needed is cheaper on both meters.

**[Docs] The page's three levers:**

| Lever | Do this |
|---|---|
| Tokens | Put only relevant text in prompts, especially with large documents from the Ontology |
| Block executions | Combine blocks into one prompt where it makes sense; be careful when blocks run programmatically rather than from a human action |
| Foundry compute | Know how many queries, actions and function calls your chain makes, including retries |

**[Explanation]** The FAQ's advice on *splitting* blocks (below) and the compute page's advice on *combining* them pull in opposite directions. Split when one block is unreliable or near its context limit; combine when blocks are reliable and you are paying 4 compute-seconds per step for no gain.

## Is it healthy

**[Docs]** A Logic resource is backed by a function, so its metrics are the function's:

- **success and failure counts** and **P95 execution duration** over the last **30 days**;
- shown in **Ontology Manager** or by selecting the Logic node in **Workflow Lineage**;
- **run history** covers the past **seven days**;
- updated in near real time from the Foundry Telemetry Service;
- failure types follow the function failure categories;
- you need **viewer** access on the Logic resource to see them.

More in [09 — Observability](../09-cost-and-observability/README.md).

## Why it failed: symptom table

**[Docs]** Built from the FAQ:

| Symptom | Cause | Fix |
|---|---|---|
| Works in the Debugger, fails in Workshop or through the API | The **five-minute** execution limit applies outside the Debugger, not inside it | Make it faster: fewer tool calls, smaller prompts, split work across functions |
| Token bar in the Debugger is red | All activity counts, **including tool responses**; limits reset **per block** | Pick only needed properties; limit Query objects properties; split into more Use LLM blocks; use deterministic blocks; the FAQ also suggests a larger-context model |
| Inconsistent results on a multi-step task | One big block doing several steps | Split: each block gets its own context and sees only what you pass |
| Surprising wrong answers | The model misunderstands the data | Ask it to explain its plan; add few-shot examples; keep 5–10 input/output pairs as unit tests and run them after every prompt change |
| Same input, different outputs | Temperature | Default is 0; check nobody raised it in the block's configuration |
| A tool floods the model with objects | No return limit | *Configure object return limits* on the tool |

**[Docs] Learning from feedback**, the FAQ's pattern: store each recommendation with its reasoning; in Workshop, write back the human feedback and the human-verified decision to a "Suggestion" object; give the Logic function a Query objects tool on that object so it can see how people judged similar past recommendations.

**[Example]** Kestrel already has this object: `RerouteProposal`, which records what the agent proposed and whether a lead accepted it ([Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md)). A *Query objects* tool on accepted and rejected proposals for the same route is the FAQ's pattern applied.

## Covered in the Ontology area

| Docs page | Where |
|---|---|
| [Staged writes](https://www.palantir.com/docs/foundry/logic/staged-writes/) | [Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md) |
| [Automate AIP Logic](https://www.palantir.com/docs/foundry/logic/aip-logic-integration-automate/) | [Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md), [Ontology 10-06](../../Ontology/10-applications/06-automate-and-ontology-events.md) |

**[Explanation]** Remember the execution mode when automating: an automation runs as its owner ([Ontology 10-06](../../Ontology/10-applications/06-automate-and-ontology-events.md)), and a project-scoped function runs with the project's access. Decide who is acting before you automate.

---
[Module index](README.md) · Previous: [03 — Execution modes and branching](03-execution-modes-and-branching.md) · Next module: [04 — AIP Evals](../04-aip-evals/README.md)
