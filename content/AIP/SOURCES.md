# Sources, corrections and open questions

The register for every source used in the AIP notes. Each note also names its pages in its one-line *Sources* header.

## How sources are recorded

- **Official Palantir pages first.** A claim about AIP behaviour links to the exact page and is labelled **[Docs]** only when the page says it. Only the page's real wording goes in quote marks.
- **Interpretation is labelled:** **[Explanation]**, **[Recommendation]**, or an **Open question** with an ID below.
- **Version-sensitive facts are dated:** supported models, limits, deprecations, preview features. They are collected in [99 — Limits and thresholds](99-reference/README.md).
- **Read depth is recorded honestly:** *read in full*, *read in part*, or *surveyed for planning*. Navigation titles are never treated as reading a page.

## Register

### Sidebar inventory (October 7, 2026)

The *AI Platform (AIP)* sidebar was read in the built-in browser on October 7, 2026 from the DOM of the AIP overview page: **96 links**, of which 95 are documentation pages and 1 is the AIP filter of the release notes (out of scope).

| Part | Pages |
|---|---|
| General (overview to observability) | 10 |
| Administration | 4 |
| Bring your own model | 7 |
| Applications overview | 1 |
| 12 applications: AI FDE 6, AIP Evolve 1, AIP Analyst 8, Boardroom 5, AIP Assist 9, AIP Chatbot Studio 12, AIP Document Intelligence 5, AIP Evals 10, AIP Logic 11, AIP Model Catalog 2, Realtime audio 2, AIP Threads 2 | 73 |
| **Total** | **95** |

Of the 95, 7 are explained in the Ontology area and get a pointer (listed in each module README); 88 get notes here. The full page-to-module list is kept in `~/work/aip/sidebar.tsv` and becomes the [docs index](99-reference/README.md).

**Planning correction.** The plan of October 6 counted 90 pages from a summarising web fetch. That fetch missed the **Applications overview** page and the whole **Boardroom** application (5 pages). Both are now in the plan: the overview in [00](00-orientation/README.md), Boardroom in [07](07-end-user-apps/README.md).

### Phase 3: modules 00–02 (read in full, October 8, 2026)

Read in the built-in browser by extracting each page's article body (headings, paragraphs, lists, tables and code). All 16 pages were read in full.

| Page | Used in |
|---|---|
| [AIP overview](https://www.palantir.com/docs/foundry/aip/overview/) | [00-01](00-orientation/01-what-aip-is.md) |
| [AIP features](https://www.palantir.com/docs/foundry/aip/aip-features/) | [00-01](00-orientation/01-what-aip-is.md) |
| [The Agent Stack](https://www.palantir.com/docs/foundry/aip/agent-stack/) (sidebar: *Applications → Overview*) | [00-01](00-orientation/01-what-aip-is.md) |
| [Get started with AIP](https://www.palantir.com/docs/foundry/aip/getting-started-with-aip/) | [00-02](00-orientation/02-getting-started.md) |
| [Supported LLMs](https://www.palantir.com/docs/foundry/aip/supported-llms/) | [01-01](01-models-and-llms/01-supported-llms-and-model-catalog.md), [02-01](02-bring-your-own-model/01-choosing-a-byom-path.md) |
| [Model Catalog](https://www.palantir.com/docs/foundry/model-catalog/overview/) | [01-01](01-models-and-llms/01-supported-llms-and-model-catalog.md) |
| [Model deprecation](https://www.palantir.com/docs/foundry/model-catalog/model-deprecation/) | [01-01](01-models-and-llms/01-supported-llms-and-model-catalog.md), [01-02](01-models-and-llms/02-llm-provider-compatible-apis.md) |
| [LLM-provider compatible APIs](https://www.palantir.com/docs/foundry/aip/llm-provider-compatible-apis/) | [01-02](01-models-and-llms/02-llm-provider-compatible-apis.md) |
| [Best practices for LLM prompt engineering](https://www.palantir.com/docs/foundry/aip/best-practices-prompt-engineering/) | [01-03](01-models-and-llms/03-prompt-engineering.md) |
| [Bring your own model to AIP](https://www.palantir.com/docs/foundry/aip/bring-your-own-model/) | [02-01](02-bring-your-own-model/01-choosing-a-byom-path.md), [02-02](02-bring-your-own-model/02-rest-and-compute-module-backed-models.md) |
| [Models backed by REST API sources](https://www.palantir.com/docs/foundry/aip/rest-api-backed-models/) | [02-02](02-bring-your-own-model/02-rest-and-compute-module-backed-models.md) |
| [Models backed by compute modules](https://www.palantir.com/docs/foundry/aip/compute-module-backed-models/) | [02-02](02-bring-your-own-model/02-rest-and-compute-module-backed-models.md), [02-03](02-bring-your-own-model/03-self-hosting-and-proxy-layers.md) |
| [Self-host models with AIP](https://www.palantir.com/docs/foundry/aip/self-host-models/) | [02-03](02-bring-your-own-model/03-self-hosting-and-proxy-layers.md) |
| [Build a proxy or federation layer with AIP](https://www.palantir.com/docs/foundry/aip/build-a-proxy-or-federation-layer/) | [02-03](02-bring-your-own-model/03-self-hosting-and-proxy-layers.md) |
| [Register an LLM using function interfaces [Legacy]](https://www.palantir.com/docs/foundry/aip/chat-completion-function-interface-quickstart/) | [02-04](02-bring-your-own-model/04-legacy-registered-llms.md) |
| [Use your registered LLM [Legacy]](https://www.palantir.com/docs/foundry/aip/use-registered-llm/) | [02-04](02-bring-your-own-model/04-legacy-registered-llms.md) |

**Checking.** Every phrase in quote marks in these ten notes was matched by script against the extracted page text: all 28 doc quotes found (one differs only in capitalisation, a UI label). The supported-model list and geography table are deliberately not reproduced, because they change often.

**Not reproduced.** The docs' code samples (TypeScript v1, TypeScript v2 and Python model calls; the `ChatCompletion` implementations) are described, with one short line quoted. The Python proxy sketch in 01-02 is our own **[Example]**.

### Phase 4: modules 03–06 (read in full, October 8, 2026)

31 pages read in full in the built-in browser with the same extraction as Phase 3. The 7 pages covered in the Ontology area (Logic staged writes and Automate; Evals ontology edits; Chatbot Studio application state, retrieval context, citations, tools) were not re-read; each module README points to them.

| Page | Used in |
|---|---|
| [AIP Logic overview](https://www.palantir.com/docs/foundry/logic/overview/) | 03-01, 04-04 |
| [AIP Logic: Core concepts](https://www.palantir.com/docs/foundry/logic/core-concepts/) | 03-01, 03-03, 04-01 |
| [AIP Logic: Getting started](https://www.palantir.com/docs/foundry/logic/getting-started/) | 03-01, 03-02 |
| [AIP Logic: Blocks](https://www.palantir.com/docs/foundry/logic/blocks/) | 03-02 |
| [Execution mode settings](https://www.palantir.com/docs/foundry/logic/execution-mode-settings/) | 03-03 |
| [Branching AIP Logic](https://www.palantir.com/docs/foundry/logic/branching-logic/) | 03-03 |
| [Compute usage with AIP Logic](https://www.palantir.com/docs/foundry/logic/compute-usage/) | 03-04 |
| [AIP Logic metrics](https://www.palantir.com/docs/foundry/logic/logic-metrics/) | 03-04 |
| [AIP Logic FAQ](https://www.palantir.com/docs/foundry/logic/faq/) | 03-02, 03-04 |
| [AIP Evals](https://www.palantir.com/docs/foundry/aip-evals/overview/) | 04-01 |
| [Evaluation suites for Logic functions](https://www.palantir.com/docs/foundry/aip-evals/getting-started/) | 04-01 |
| [Create an evaluation suite](https://www.palantir.com/docs/foundry/aip-evals/create-suite/) | 04-01 |
| [Use intermediate parameters to evaluate block output](https://www.palantir.com/docs/foundry/aip-evals/intermediate-parameters/) | 04-02 |
| [Run an evaluation suite](https://www.palantir.com/docs/foundry/aip-evals/run-suite/) | 04-03 |
| [Run experiments](https://www.palantir.com/docs/foundry/aip-evals/experiments/) | 04-03 |
| [Write run results to a dataset](https://www.palantir.com/docs/foundry/aip-evals/results-dataset/) | 04-02, 04-04 |
| [Analyze run results](https://www.palantir.com/docs/foundry/aip-evals/analyze-run-results/) | 04-04 |
| [Evaluations metrics dashboard](https://www.palantir.com/docs/foundry/aip-evals/metrics-dashboard/) | 04-04 |
| [AIP Chatbot Studio](https://www.palantir.com/docs/foundry/chatbot-studio/overview/) | 05-01 |
| [Chatbot Studio: Core concepts](https://www.palantir.com/docs/foundry/chatbot-studio/core-concepts/) | 05-01 |
| [Chatbot Studio: Getting started](https://www.palantir.com/docs/foundry/chatbot-studio/getting-started/) | 05-01 |
| [Use commands as tools in AIP Chatbot Studio](https://www.palantir.com/docs/foundry/chatbot-studio/commands-as-tools/) | 05-02 |
| [Chatbots as Functions](https://www.palantir.com/docs/foundry/chatbot-studio/chatbots-as-functions/) | 05-03 |
| [Use AIP Chatbots through Foundry APIs](https://www.palantir.com/docs/foundry/chatbot-studio/foundry-apis/) | 05-03 |
| [Distribute AIP Chatbots using Marketplace](https://www.palantir.com/docs/foundry/chatbot-studio/marketplace/) | 05-03 |
| [Session logging](https://www.palantir.com/docs/foundry/chatbot-studio/session-logging/) | 05-04 |
| [AIP Document Intelligence](https://www.palantir.com/docs/foundry/document-intelligence/overview/) | 06-01 |
| [Document Intelligence: Core concepts](https://www.palantir.com/docs/foundry/document-intelligence/core-concepts/) | 06-01, 06-02 |
| [Deploy extraction strategies to Python transforms](https://www.palantir.com/docs/foundry/document-intelligence/deploy-to-python-transforms/) | 06-02 |
| [Deploy extraction strategies to Python functions](https://www.palantir.com/docs/foundry/document-intelligence/deploy-to-python-functions/) | 06-02 |
| [Document-to-text media transformations](https://www.palantir.com/docs/foundry/document-intelligence/document-to-text/) | 06-03 |

**Checking.** 39 doc phrases in quote marks across the 15 notes were matched by script against the page text: 33 exact, 5 differing only in capitalisation, 1 split across a line break inside a code docstring. The exam guide's wording in 03-01 comes from the official guide fetched October 7 ([Application Developer exam guide note](../Application%20Developer/07_Exam_Guide.md)).

**Not reproduced.** The Document Intelligence templates, helper functions and session-log schemas are described, not copied; one short JSON request in 06-03 is adapted from the docs' example and says so.

### Phase 5: modules 07–09 (read in full, October 8, 2026)

41 pages read in the built-in browser with the same extraction. Two long reference tables were **surveyed, not read row by row**: the per-model table on *LLM enrollment rate limits* (193 model rows) and the rate table on *Compute usage with AIP*. Their prose was read in full, the notes quote only the docs' own worked examples, and they point to the live tables for numbers.

| Page | Used in |
|---|---|
| [AIP Assist](https://www.palantir.com/docs/foundry/assist/overview/) | 07-02 |
| [AIP Assist best practices](https://www.palantir.com/docs/foundry/assist/aip-best-practices/) | 07-02 |
| [AIP Assist application integrations](https://www.palantir.com/docs/foundry/assist/application-integrations/) | 07-02 |
| [Suggested actions in AIP Assist](https://www.palantir.com/docs/foundry/assist/aip-assist-suggested-actions/) | 07-02 |
| [Custom content sources in AIP Assist](https://www.palantir.com/docs/foundry/assist/aip-assist-custom-docs-overview/) | 07-03 |
| [Register custom content sources](https://www.palantir.com/docs/foundry/assist/aip-assist-registering-content/) | 07-03 |
| [Serve custom content sources](https://www.palantir.com/docs/foundry/assist/adding-documentation-to-aip-assist/) | 07-03 |
| [Deploy AIP Chatbots to AIP Assist](https://www.palantir.com/docs/foundry/assist/agents-in-aip-assist/) | 07-03 |
| [Custom content source best practices](https://www.palantir.com/docs/foundry/assist/custom-documentation-best-practices/) | 07-03 |
| [AIP Analyst](https://www.palantir.com/docs/foundry/aip-analyst/overview/) | 07-04 |
| [AIP Analyst: Capabilities](https://www.palantir.com/docs/foundry/aip-analyst/capabilities/) | 07-04 |
| [Using AIP Analyst](https://www.palantir.com/docs/foundry/aip-analyst/using-aip-analyst/) | 07-04 |
| [Analysis resources](https://www.palantir.com/docs/foundry/aip-analyst/analysis-resources/) | 07-04 |
| [Compute usage with AIP Analyst](https://www.palantir.com/docs/foundry/aip-analyst/compute-usage/) | 07-04, 09-01 |
| [AIP Analyst Workshop widget](https://www.palantir.com/docs/foundry/aip-analyst/workshop-widget/) | 07-04 |
| [Embed AIP Analyst](https://www.palantir.com/docs/foundry/aip-analyst/embed/) | 07-04 |
| [AIP Analyst: Admin configuration](https://www.palantir.com/docs/foundry/aip-analyst/admin-configuration/) | 07-04 |
| [AI FDE](https://www.palantir.com/docs/foundry/ai-fde/overview/) | 07-05 |
| [AI FDE: Navigation](https://www.palantir.com/docs/foundry/ai-fde/navigation/) | 07-05 |
| [AI FDE: Modes and capabilities](https://www.palantir.com/docs/foundry/ai-fde/modes-and-capabilities/) | 07-05 |
| [Pre-fill sessions with URL parameters](https://www.palantir.com/docs/foundry/ai-fde/prefill-sessions/) | 07-05 |
| [AI FDE: Security and governance](https://www.palantir.com/docs/foundry/ai-fde/security-and-governance/) | 07-05 |
| [Best practices for using AI FDE](https://www.palantir.com/docs/foundry/ai-fde/best-practices/) | 07-05 |
| [Boardroom](https://www.palantir.com/docs/foundry/boardroom/overview/) | 07-06 |
| [Create a boardroom](https://www.palantir.com/docs/foundry/boardroom/create-a-boardroom/) | 07-06 |
| [Boardroom modes](https://www.palantir.com/docs/foundry/boardroom/modes/) | 07-06 |
| [Configure a boardroom](https://www.palantir.com/docs/foundry/boardroom/configure-a-boardroom/) | 07-06 |
| [Use skills and templates](https://www.palantir.com/docs/foundry/boardroom/skills-and-templates/) | 07-06 |
| [AIP Threads](https://www.palantir.com/docs/foundry/threads/overview/) | 07-07 |
| [AIP Threads: Getting started](https://www.palantir.com/docs/foundry/threads/getting-started/) | 07-07 |
| [AIP Evolve](https://www.palantir.com/docs/foundry/aip-evolve/overview/) | 07-07 |
| [Realtime audio](https://www.palantir.com/docs/foundry/realtime-audio/overview/) | 07-07 |
| [Build a voice-enabled OSDK application](https://www.palantir.com/docs/foundry/realtime-audio/build-a-voice-enabled-osdk-application/) | 07-07 |
| [AIP security and privacy](https://www.palantir.com/docs/foundry/aip/aip-security/) | 08-01 |
| [AI ethics and governance](https://www.palantir.com/docs/foundry/aip/ethics-governance/) | 08-01 |
| [Enable AIP features](https://www.palantir.com/docs/foundry/aip/enable-aip-features/) | 08-02 |
| [Control LLM data access with Markings](https://www.palantir.com/docs/foundry/aip/control-llm-data-access-with-markings/) | 08-03 |
| [LLM capacity management](https://www.palantir.com/docs/foundry/aip/llm-capacity-management/) | 08-04, 09-01 |
| [LLM enrollment rate limits](https://www.palantir.com/docs/foundry/aip/llm-enrollment-rate-limits/) | 08-04 |
| [Compute usage with AIP](https://www.palantir.com/docs/foundry/aip/aip-compute-usage/) | 09-01 |
| [Ontology and AIP observability](https://www.palantir.com/docs/foundry/aip/aip-observability/) | 09-02 |

**Checking.** 41 doc phrases in quote marks in these 18 notes were matched by script against the page text: 37 exact, 4 differing only in capitalisation.

## Corrections log

| Date | Where | Correction |
|---|---|---|
| Oct 7, 2026 | Plan | Page count 90 → 95; Applications overview and Boardroom added (see above) |
| Oct 8, 2026 | Self-review of 00–09 | 02-01 Kestrel Pay model policy aligned with 08-03 (`Customer PII` + `Kestrel Pay – Financial`; a model policy replaces the enrollment allowlist) |
| Oct 8, 2026 | Self-review | 09-02 incident and 08-04 capacity design reconciled: the incident came first and motivated the design |
| Oct 8, 2026 | Self-review | 07-06 Boardroom: separated the agents' context (what data agents use) from the boardroom's mandatory marking (who can see its outputs) |
| Oct 8, 2026 | Self-review | 07-04: replaced a misapplied `ChargebackQuery` example with the Kestrel Pay object and property policies |
| Oct 8, 2026 | Self-review | 04-03: Kestrel's project-scoped Evals runs now note the mode is beta, with a fallback |
| Oct 8, 2026 | Self-review | GLOSSARY *Use LLM block*: removed an inference presented as a docs paraphrase |
| Oct 8, 2026 | Self-review | 08-03: the reason for token-level checking is now labelled as our reading, not Foundry internals |
| Oct 8, 2026 | Self-review | Kestrel reference model (Ontology 17-02) given an *Added in the AIP area* section and AIP security and capacity bullets; Ontology 09-04's legacy BYOM line clarified |
| Oct 14, 2026 | Second review | Ontology 16-03 ↔ AIP 05 circular pointer fixed; 07-01 'Acts as' marked not stated for Threads and Boardroom; Assist sees metadata, not data (07-01, GLOSSARY); Ontology README and QUALITY-REVIEW no longer list the AIP sidebar as unchecked |
| Oct 7, 2026 | Plan | *Retrieval context: context types* is the same page (`/chatbot-studio/retrieval-context/`) the Ontology area cites in 16-01, so it is a pointer, not a new note |
| Oct 14, 2026 | Quality review | Sidebar moved: Agent Stack overview `agent-stack/overview/` → `aip/agent-stack/`; all links, GLOSSARY, register and docs index updated |
| Oct 14, 2026 | Quality review | 01-01: the quoted experimental-model wording is no longer on *Supported LLMs*; it now says status can come from the provider or Palantir; "not intended for production use"); note updated |
| Oct 14, 2026 | Quality review | 03-02: *Struct* quote now matches the FAQ's typography; 03-01: exam-guide wording linked to the official guide, since the local summary doesn't carry it |
| Oct 14, 2026 | Quality review | Navigation: "Next module" links on the last note of modules 00–11; Previous/Next across the three reference pages |
| Oct 14, 2026 | Pre-ship review | QUALITY-REVIEW limited to changes actually observed; "as read Oct 14" instead of "since"/"drifted"; 00-02 no longer quotes "Logic or code?" as the exam guide's wording; 02-01 and 03-02 headers re-dated |

## Open research questions

| ID | Question | Status |
|---|---|---|
| RQ-01 | LLM-provider compatible APIs: what goes in the request's `model` field when calling from outside Foundry? The page doesn't say; inside a TSv2 function the docs pass a model RID through an alias. | Open. [01-02](01-models-and-llms/02-llm-provider-compatible-apis.md) |
| RQ-02 | The Agent Stack (Agent Builder, Agent SDK, Agent Manager): how does it relate to AIP Chatbot Studio? Successor, sibling or shared runtime? | Open. [00-01](00-orientation/01-what-aip-is.md#the-agent-stack-the-newest-layer) |
| RQ-03 | **Doc conflict.** *Supported LLMs* says BYOM works with Pipeline Builder; *Bring your own model* lists supported apps without Pipeline Builder and excludes only its *Generate* and *Explain*. Can Pipeline Builder's Use LLM node, and Python functions, use a registered model? | Open. Re-checked Oct 14: the BYOM page's introduction lists Pipeline Builder among the products, but its *Supported applications* list still doesn't. [02-01](02-bring-your-own-model/01-choosing-a-byom-path.md#where-a-registered-model-works) |
| RQ-04 | AIP Logic compute: the worked example charges 8 compute-seconds per LLM block that uses a tool. Is that once per block execution, or once per tool call when a block calls several tools in one run? | Open. [03-04](03-aip-logic/04-logic-in-production.md#what-it-costs) |
| RQ-05 | **Doc inconsistency.** *AI ethics and governance* introduces "eight core themes" but describes seven (Equitable, Explainable, Reliable, Traceable, Collaborative, Accountable, Human-centered). Is a theme missing, or is the count wrong? | Open (re-checked Oct 14: unchanged). [08-01](08-security-governance-and-admin/01-security-privacy-and-ethics.md#part-2--the-ethics-reviewers-themes) |
| RQ-06 | **Doc inconsistency.** *LLM capacity management* says customers are on the medium tier by default with large and XL as upgrades; the *LLM enrollment rate limits* table also has a **Small** tier. Who is on Small? | Open (re-checked Oct 14: unchanged). [08-04](08-security-governance-and-admin/04-capacity-and-rate-limits.md#three-levels-of-limit) |

---
[AIP home](README.md) · [Migration record](MIGRATION.md)
