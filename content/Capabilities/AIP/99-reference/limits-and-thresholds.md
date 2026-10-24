# Limits and thresholds

*Sources: the pages linked in each row · numbers as read October 7–8, 2026, all re-verified October 14, 2026 · compiled October 14, 2026 · Ready for Review*

Every number in this area that the docs state, in one place, with where it comes from. **Numbers change**: check the linked page before relying on one. Long per-model tables (supported models, rate limits by tier, compute rates) are not copied; their pages are linked at the end.

## Models and registration

| What | Value | Docs page | Note |
|---|---|---|---|
| Current registered-model (BYOM) implementation | Since **March 2026** | [Bring your own model](https://www.palantir.com/docs/foundry/aip/bring-your-own-model/) | [02-01](../02-bring-your-own-model/01-choosing-a-byom-path.md) |
| Project rate limit for a registered model, default | **70%** of the enrollment limit | [Bring your own model](https://www.palantir.com/docs/foundry/aip/bring-your-own-model/) | [02-02](../02-bring-your-own-model/02-rest-and-compute-module-backed-models.md#rate-limits-in-numbers) |
| Compute module backing a model: minimum replicas | **At least 1** | [Models backed by compute modules](https://www.palantir.com/docs/foundry/aip/compute-module-backed-models/) | [02-02](../02-bring-your-own-model/02-rest-and-compute-module-backed-models.md) |
| Upgrade Assistant marks a resource COMPLETED | Last call to the deprecated model **more than 24 hours** ago | [Model deprecation](https://www.palantir.com/docs/foundry/model-catalog/model-deprecation/) | [01-01](../01-models-and-llms/01-supported-llms-and-model-catalog.md#5-runbook-a-model-you-use-is-being-retired) |
| Legacy rate-limit retry hint in the docs' example | `retryAfterMillis: 20000` | [Use your registered LLM](https://www.palantir.com/docs/foundry/aip/use-registered-llm/) | [02-04](../02-bring-your-own-model/04-legacy-registered-llms.md) |

## AIP Logic

| What | Value | Docs page | Note |
|---|---|---|---|
| Compute per basic LLM block execution | **4** compute-seconds | [Compute usage with AIP Logic](https://www.palantir.com/docs/foundry/logic/compute-usage/) | [03-04](../03-aip-logic/04-logic-in-production.md#what-it-costs) |
| Compute per LLM block tool execution | **8** compute-seconds (per block or per call: RQ-04) | same | same |
| Execution time limit (Workshop, function execution API) | **5 minutes**; not enforced in the Debugger | [AIP Logic FAQ](https://www.palantir.com/docs/foundry/logic/faq/) | [03-04](../03-aip-logic/04-logic-in-production.md#why-it-failed-symptom-table) |
| Default temperature | **0** | same | [03-02](../03-aip-logic/02-building-a-logic-function.md#step-5--run-and-debug) |
| User-scoped execution logs | Own runs only, kept **24 hours** | [Execution mode settings](https://www.palantir.com/docs/foundry/logic/execution-mode-settings/) | [03-03](../03-aip-logic/03-execution-modes-and-branching.md) |
| Project-scoped run history dataset | Last **10,000** runs | same | same |
| Metrics window | Success/failure and **P95** duration over **30 days** | [AIP Logic metrics](https://www.palantir.com/docs/foundry/logic/logic-metrics/) | [03-04](../03-aip-logic/04-logic-in-production.md#is-it-healthy) |
| Run history | Past **7 days** | same | same |

## AIP Evals

| What | Value | Docs page | Note |
|---|---|---|---|
| Recommended iterations for LLM-backed functions | **At least 3** | [Run an evaluation suite](https://www.palantir.com/docs/foundry/aip-evals/run-suite/) | [04-03](../04-aip-evals/03-runs-and-experiments.md) |
| Test cases run in parallel, default | **10** | same | same |
| User-scoped results | Visible only to you, deleted after **24 hours** | same | same |
| Runs you can compare case by case | Up to **4** | [Run experiments](https://www.palantir.com/docs/foundry/aip-evals/experiments/) | [04-03](../04-aip-evals/03-runs-and-experiments.md#reading-an-experiment) |

## Chatbots, Threads and Assist

| What | Value | Docs page | Note |
|---|---|---|---|
| Chatbot temperature | Default **0**, maximum **1** | [Chatbot Studio: Getting started](https://www.palantir.com/docs/foundry/chatbot-studio/getting-started/) | [05-01](../05-chatbot-studio/01-chatbot-concepts.md#the-settings-sheet) |
| Chatbots with command tools | Retention window expires after **24 hours** of inactivity | [Commands as tools](https://www.palantir.com/docs/foundry/chatbot-studio/commands-as-tools/) | [05-02](../05-chatbot-studio/02-commands-as-tools.md) |
| Threads relevant-chunks mode | **4,096** characters per chunk (~1,024 tokens), **512** overlap, ada-002 embeddings by default | [AIP Threads: Getting started](https://www.palantir.com/docs/foundry/threads/getting-started/) | [07-07](../07-end-user-apps/07-threads-evolve-and-realtime-audio.md#aip-threads-chat-with-documents) |
| Threads document types | Native (non-scanned) **PDFs** only | same | same |
| Analyst semantic-search similarity threshold | **0** (broadest) to **1** (exact) | [Using AIP Analyst](https://www.palantir.com/docs/foundry/aip-analyst/using-aip-analyst/) | [07-04](../07-end-user-apps/04-aip-analyst.md#settings-worth-knowing) |

## Document Intelligence and realtime audio

| What | Value | Docs page | Note |
|---|---|---|---|
| Layout-aware generative extraction failures | About **5%** (`ERROR_RESPONSE_JSON_PARSING`) | [Deploy to Python transforms](https://www.palantir.com/docs/foundry/document-intelligence/deploy-to-python-transforms/) | [06-02](../06-document-intelligence/02-deploying-extraction.md#runbook-the-transform) |
| `THREAD_NUMBER` | Default **20**; **300** highest tested | same | same |
| Function libraries | `foundry-platform-sdk` **≥ 1.78**; `aip-workflows` **≥ 0.40.0** | [Deploy to Python functions](https://www.palantir.com/docs/foundry/document-intelligence/deploy-to-python-functions/) | [06-02](../06-document-intelligence/02-deploying-extraction.md#runbook-the-functions) |
| Pages per function call or request | **5–10** suggested | same; [Document-to-text](https://www.palantir.com/docs/foundry/document-intelligence/document-to-text/) | [06-03](../06-document-intelligence/03-document-to-text.md#parameters) |
| Extraction evaluations | Need **Anthropic Claude 4 Sonnet** on the enrollment; scores **1–5** | [Document Intelligence: Core concepts](https://www.palantir.com/docs/foundry/document-intelligence/core-concepts/) | [06-01](../06-document-intelligence/01-extraction-strategies.md#the-comparison-loop) |
| Realtime audio input format in the tutorial | 16-bit PCM at **24 kHz** | [Build a voice-enabled OSDK application](https://www.palantir.com/docs/foundry/realtime-audio/build-a-voice-enabled-osdk-application/) | [07-07](../07-end-user-apps/07-threads-evolve-and-realtime-audio.md#realtime-audio-voice-as-an-interface) |

## Capacity and cost

| What | Value | Docs page | Note |
|---|---|---|---|
| Capacity kept for interactive queries | **20%** at enrollment and project level; batch at most **80%** per minute | [LLM capacity management](https://www.palantir.com/docs/foundry/aip/llm-capacity-management/) | [08-04](../08-security-governance-and-admin/04-capacity-and-rate-limits.md#batch-vs-interactive) |
| Reserved capacity | Up to **50%** of a model's capacity; preserved up to **95%** of a reduced total | same | [08-04](../08-security-governance-and-admin/04-capacity-and-rate-limits.md#the-administrators-tools) |
| Per-user limits that may break AIP features | Below **50,000 TPM** or **10 RPM**; **0** not allowed | same | same |
| Usage view history | **Two weeks**, down to the minute; per-project or per-resource split below **6 hours** | same | same |
| Default enrollment tier | **Medium** (large and XL on request; the table also lists Small: RQ-06) | same; [LLM enrollment rate limits](https://www.palantir.com/docs/foundry/aip/llm-enrollment-rate-limits/) | [08-04](../08-security-governance-and-admin/04-capacity-and-rate-limits.md#three-levels-of-limit) |
| Average token length | About **4** characters | [Compute usage with AIP](https://www.palantir.com/docs/foundry/aip/aip-compute-usage/) | [09-01](../09-cost-and-observability/01-compute-usage.md) |
| The docs' token example | 24 GPT-4o tokens × 43 / 10,000 = **0.1032** compute-seconds | same | same |

## Long tables (linked, not copied)

- [Supported LLMs](https://www.palantir.com/docs/foundry/aip/supported-llms/): models, embedding and audio models, availability by geography and impact level.
- [LLM enrollment rate limits](https://www.palantir.com/docs/foundry/aip/llm-enrollment-rate-limits/): TPM and RPM per model, backend and tier, plus per-user defaults.
- [Compute usage with AIP](https://www.palantir.com/docs/foundry/aip/aip-compute-usage/): compute-seconds per 10k input and output tokens, per model and region.

---
[Module index](README.md) · Next: [Decision guide](decision-guide.md) · [AIP home](../README.md)
