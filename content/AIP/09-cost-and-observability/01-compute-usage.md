# 01 — Compute usage

*Sources: [Compute usage with AIP](https://www.palantir.com/docs/foundry/aip/aip-compute-usage/) · [Compute usage with AIP Logic](https://www.palantir.com/docs/foundry/logic/compute-usage/) · [Compute usage with AIP Analyst](https://www.palantir.com/docs/foundry/aip-analyst/compute-usage/) · [LLM capacity management](https://www.palantir.com/docs/foundry/aip/llm-capacity-management/) · checked October 8, 2026 · Ready for Review*

A **cost worksheet**: how AIP turns tokens into compute-seconds, where the usage is booked, and what Delivery Desk costs per month. Other notes already cover the special meters of [Logic](../03-aip-logic/04-logic-in-production.md#what-it-costs) and [Analyst](../07-end-user-apps/04-aip-analyst.md#what-it-costs); this one ties them together.

## From tokens to compute-seconds

**[Docs]** LLM usage is measured in **tokens**, which the model provider's tokenizer counts; tokens "do not map one-to-one with words", and average about 4 characters. Because providers price differently, AIP converts tokens into **compute-seconds** per model.

**[Docs]** The page's example: a 140-character sentence becomes 24 GPT-4o tokens; at 43 compute-seconds per 10,000 tokens that is 24 × 43 / 10,000 = **0.1032 compute-seconds**.

**[Docs] The rate table** gives compute-seconds per **10k input tokens** and per **10k output tokens**, per model and per Foundry region (North America; EU/UK; South America/APAC/Middle East). It applies to enrollments **hosted on AWS** under **certain default contract terms**; if you have a contract, ask your Palantir representative which rates apply.

**[Explanation]** Three patterns in the table matter more than any single number:

- **Output costs more than input**, typically two to eight times per token. Long answers are expensive; long prompts less so.
- Several models have a **second, higher rate above a context size** (for example above 200k or 272k tokens). A prompt that crosses the threshold costs more per token.
- **North America is the most expensive region** in the table, and the other two regions are cheaper by a roughly constant ratio.

## Which applications use tokens

**[Docs]** AIP Assist, AIP Logic, AIP Error Enhancer, AIP Code Assist, AIP Analyst, AI FDE, LLM-backed tools in Workshop, Quiver and Pipeline Builder, and direct calls to the Language Model Service from Python or TypeScript.

## Where the usage is booked

**[Docs]** Token usage is attached to the **resource** that made the request: explain a pipeline with AIP, and the pipeline carries the cost. When no single resource applies (AIP Assist, the error explainer), it goes to the **user folder** of the person who started it.

| Workload | Booked to |
|---|---|
| A Logic function, a chatbot, a Workshop module | That resource (**[Docs]**) |
| A pipeline's Use LLM node | The pipeline (**[Docs]**) |
| AIP Assist | The user's folder (**[Docs]**) |
| AIP Analyst | Saved analysis → the analysis; embedded → the owning resource; unsaved → the user, or a chosen project ([07-04](../07-end-user-apps/04-aip-analyst.md#what-it-costs)) |
| Registered (bring-your-own) models | Not in Resource Management; the provider bills you ([02-01](../02-bring-your-own-model/01-choosing-a-byom-path.md#three-facts-that-change-the-design)) |

**[Docs] Seeing it:** export the **AIP Token Usage** dataset (Control Panel → internal dataset export) for daily tokens by model and resource, with compute-seconds and currency; Resource Management's **Analysis** page for daily LLM cost by model; *AIP usage & limits* for per-minute usage, which the docs say isn't built for cost ([08-04](../08-security-governance-and-admin/04-capacity-and-rate-limits.md#the-administrators-tools)).

## Kestrel's worksheet

**[Example]** Delivery Desk drafts 1,200 delay messages a month. Assumptions: ~1,500 input tokens per draft (system prompt, rules, six properties) and ~120 output tokens; rates for a model at 31 compute-seconds per 10k input and 124 per 10k output (the table's North America rates for GPT-4.1, used here only as an illustration).

| Line | Per draft | Per month |
|---|---|---|
| Input tokens: 1,500 × 31 / 10,000 | 4.65 | 5,580 |
| Output tokens: 120 × 124 / 10,000 | 1.49 | 1,786 |
| **Tokens subtotal** (TSv2 `draftDelayMessage`) | **6.14** | **7,366** |
| If drafted by the Logic version: + 4 per LLM block ([03-04](../03-aip-logic/04-logic-in-production.md#what-it-costs)) | +4 | +4,800 |
| **Logic version total** | **10.14** | **12,166** |

All figures in compute-seconds.

**[Explanation]** Two things the worksheet shows:

1. For a short prompt, Logic's fixed 4 compute-seconds per block is **as big as the tokens themselves**. That's fine for a wording sandbox; it's a reason to keep the shipped tool in TypeScript ([03-02](../03-aip-logic/02-building-a-logic-function.md#logic-version-vs-typescript-version)).
2. Input dominates even though output is pricier per token, because the prompt is long. Trimming the system prompt and properties ([01-03](../01-models-and-llms/03-prompt-engineering.md)) is the first saving to look for.

**[Recommendation]** Redo the worksheet whenever the model changes. A substitute model suggested by Upgrade Assistant can cost several times more per token; the [experiment](../04-aip-evals/03-runs-and-experiments.md#experiments) that picks a model should compare cost alongside quality, as AIP Evolve's example does ([07-07](../07-end-user-apps/07-threads-evolve-and-realtime-audio.md#aip-evolve-let-agents-improve-an-ai-workflow)).

---
[Module index](README.md) · Next: [02 — Ontology and AIP observability](02-observability.md)
