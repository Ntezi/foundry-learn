# 01 — Review questions by module

*Sources: the notes each question links to · written October 14, 2026 · not yet attempted*

Scenario questions in the style of the Application Developer Associate exam: a situation, a question, and the answer folded away. Each question is tagged with its exam domain from the [official guide](../../Application%20Developer/07_Exam_Guide.md):

- **D3** Ontology Functions (including when to use AIP Logic)
- **D7** AIP Logic and AI-Powered Applications
- **D5** OSDK, APIs and External Applications
- **D8** Application Security, Governance and Operations
- **—** not in the Associate guide (useful for work, not the exam)

Answer before opening each one. Every answer links to the note that explains it.

## 00 — Orientation

**Q1 · —** A colleague says "Agent Studio" and "AIP Agents". What are they called now, and which app is the newest agent infrastructure in the AIP sidebar?

<details><summary>Answer</summary>

AIP Chatbot Studio and AIP Chatbots. The newest is **the Agent Stack**: sessions, typed context items, events and a state machine, with Agent Builder, the Agent SDK and Agent Manager. [00-01](../00-orientation/01-what-aip-is.md#the-agent-stack-the-newest-layer)
</details>

## 01 — Models and LLMs

**Q2 · D8** A model is greyed out in the Model Catalog. Name three possible causes.

<details><summary>Answer</summary>

Legal terms not accepted (disabled); georestriction or a required Palantir review (disallowed); not yet integrated, or experimental models hidden; or the model isn't enabled for your organization. [01-01](../01-models-and-llms/01-supported-llms-and-model-catalog.md#2-why-a-model-is-missing), [08-02](../08-security-governance-and-admin/02-enabling-aip.md#model-families)
</details>

**Q3 · D7** A function has started failing with `LanguageModelNotAvailable` and a message about a brown-out. What is happening, where do you find what else is affected, and why is a TSv2 function quicker to fix than a TSv1 one?

<details><summary>Answer</summary>

The model is being deprecated and is in a scheduled brownout. Upgrade Assistant lists affected resources (PENDING/COMPLETED), but not ones that weren't used during the migration period. TSv2 calls the model through an **alias**, so the fix is one alias change; TSv1 names the model in the import and every call site. [01-01](../01-models-and-llms/01-supported-llms-and-model-catalog.md#5-runbook-a-model-you-use-is-being-retired)
</details>

**Q4 · D7** A Workshop module's AIP Chatbot widget uses a sunset model. Where do you change the model?

<details><summary>Answer</summary>

In the chatbot's settings in AIP Chatbot Studio, then publish. Not in the widget. [01-01](../01-models-and-llms/01-supported-llms-and-model-catalog.md#5-runbook-a-model-you-use-is-being-retired)
</details>

**Q5 · —** You want to use the OpenAI Python SDK against Foundry's models. Which endpoint, and what authenticates the call?

<details><summary>Answer</summary>

The OpenAI-compatible proxy under `/api/v2/llm/proxy/openai/v1/…`, with `Authorization: Bearer {FOUNDRY_TOKEN}`. Only models enabled on the enrollment are reachable; usage shows in Resource Management and is rate limited. [01-02](../01-models-and-llms/02-llm-provider-compatible-apis.md)
</details>

## 02 — Bring your own model

**Q6 · D8** Compliance requires that payment data never leaves your network. Which bring-your-own-model path fits, and who must register it?

<details><summary>Answer</summary>

A **compute-module-backed** registered model running your own inference server (self-hosting). Only an **enrollment administrator** registers models, and needs Owner or Editor on the source. [02-01](../02-bring-your-own-model/01-choosing-a-byom-path.md), [02-03](../02-bring-your-own-model/03-self-hosting-and-proxy-layers.md)
</details>

**Q7 · D8** True or false: users of a registered model need permission on its Data Connection source.

<details><summary>Answer</summary>

False. "Source permissions are severed at registration"; use is granted through registered-model enablement in Control Panel. [02-01](../02-bring-your-own-model/01-choosing-a-byom-path.md#who-does-what)
</details>

**Q8 · —** Why might AI FDE be unable to use a newly registered model?

<details><summary>Answer</summary>

Its capabilities weren't declared: **Reasoning, Structured outputs and Tool calling** must be enabled for AI FDE and AIP Analyst to use it. [02-02](../02-bring-your-own-model/02-rest-and-compute-module-backed-models.md#registration-the-shared-part)
</details>

## 03 — AIP Logic

**Q9 · D3** A task needs deterministic tax calculations over thousands of orders and must be unit tested in Git. Logic or code?

<details><summary>Answer</summary>

Code (TypeScript v2 or Python). Logic suits language-centred work and non-developer maintainers; Logic can call the code function through *Execute function* if an LLM step is also needed. [03-01](../03-aip-logic/01-logic-concepts.md#logic-or-code)
</details>

**Q10 · D7** A Logic function with an *Apply action* block shows edits in the Debugger, but nothing changes in the Ontology. Why?

<details><summary>Answer</summary>

Logic edits are only applied when the function runs **from an action** (or an automation). Publish it, create an action backed by it, and call that action. [03-01](../03-aip-logic/01-logic-concepts.md#the-rule-that-trips-people-up), [03-02](../03-aip-logic/02-building-a-logic-function.md#if-the-function-must-edit-the-ontology)
</details>

**Q11 · D7** Which tool categories can a Use LLM block offer the model, and whose permissions do tool calls run with?

<details><summary>Answer</summary>

Apply actions, Call function, Query objects, Calculator. The model only *asks*; Logic runs the call within the invoking user's permissions. [03-02](../03-aip-logic/02-building-a-logic-function.md#step-4--tools-when-the-llm-should-choose)
</details>

**Q12 · D8** Row and property security policies stop the model reading restricted data. Do they protect what the model writes?

<details><summary>Answer</summary>

No. They don't extend to the model's output or the edits it composes; pair them with markings or classification-based access control. [03-01](../03-aip-logic/01-logic-concepts.md#what-the-model-can-and-cant-see)
</details>

**Q13 · D8** You need every run of a Logic function to be visible to the whole team for 30 days. Which setting?

<details><summary>Answer</summary>

**Project-scoped execution** with a **run history dataset** (keeps the last 10,000 runs). User-scoped mode shows each user only their own logs, for 24 hours. Project-scoped needs all used resources imported into the project. [03-03](../03-aip-logic/03-execution-modes-and-branching.md#part-1--who-the-function-runs-as)
</details>

**Q14 · D7** A Logic function works in the Debugger but fails when called from Workshop. Most likely cause?

<details><summary>Answer</summary>

The **five-minute** execution limit, which applies outside the Debugger. [03-04](../03-aip-logic/04-logic-in-production.md#why-it-failed-symptom-table)
</details>

**Q15 · D7** List the four conditions for a branched Logic function to be deployable.

<details><summary>Answer</summary>

Up to date with main; published on the branch; no errors; no pending approvals. [03-03](../03-aip-logic/03-execution-modes-and-branching.md#before-it-can-merge)
</details>

**Q16 · —** A run has two LLM blocks, one of which uses a tool. Compute-seconds per run, ignoring tokens?

<details><summary>Answer</summary>

2 × 4 + 1 × 8 = **16**, per the docs' example (whether a block with several tool calls pays 8 once or per call is open: RQ-04). [03-04](../03-aip-logic/04-logic-in-production.md#what-it-costs)
</details>

## 04 — AIP Evals

**Q17 · D7** Your function drafts free text. Which evaluators check "no refund promises", "under 400 characters" and "polite tone"?

<details><summary>Answer</summary>

Keyword checker (false passes), String length, and LLM-as-a-judge with a clear, verifiable condition. [04-01](../04-aip-evals/01-evals-concepts-and-suites.md#evaluators-from-rules-to-metrics)
</details>

**Q18 · D7** A test case runs three iterations and fails one. Does the case pass?

<details><summary>Answer</summary>

No: a case passes only if **all** iterations pass, and an iteration only if all its metrics pass. [04-01](../04-aip-evals/01-evals-concepts-and-suites.md#when-a-test-case-passes)
</details>

**Q19 · D7** The final answer has the wrong date. How do you tell a data bug from a prompt bug?

<details><summary>Answer</summary>

Expose the facts-loading block's output as an **intermediate parameter** (flask icon) and evaluate it separately from the final output. [04-02](../04-aip-evals/02-intermediate-parameters.md)
</details>

**Q20 · D7** You want to compare three models and two prompt variants. What do you configure, and what can't you combine it with?

<details><summary>Answer</summary>

Parameterise model and prompt as inputs, enable **experiments**, list the values (grid search: 6 runs). Experiments aren't available in multi-target mode. [04-03](../04-aip-evals/03-runs-and-experiments.md#experiments)
</details>

**Q21 · D8** Your evaluation results disappeared the next day and never reached the results dataset. Why?

<details><summary>Answer</summary>

The suite ran **user-scoped**: results last 24 hours and aren't written to the dataset. Writing needs project-scoped execution (beta) and the dataset in the same project. [04-03](../04-aip-evals/03-runs-and-experiments.md#run-configuration-the-cog-next-to-run-evaluation-suite), [04-04](../04-aip-evals/04-reading-results.md#where-results-go)
</details>

## 05 — AIP Chatbot Studio

**Q22 · D7** Rank retrieval context, application state and tools by the getting-started page's guidance.

<details><summary>Answer</summary>

Retrieval context: simple and fast, recommended for most cases. Application state: to fit the chatbot into Workshop. Tools: for complex and action-taking chatbots. [05-01](../05-chatbot-studio/01-chatbot-concepts.md#the-vocabulary)
</details>

**Q23 · D7** Users get an error after a long conversation and must start a new session. Why?

<details><summary>Answer</summary>

The **context window** was exceeded: system prompt, history, injected context, state and tools together. [05-01](../05-chatbot-studio/01-chatbot-concepts.md#the-vocabulary)
</details>

**Q24 · D7** You call a chatbot published as a function from an automation and omit an object-set variable. What context does it get?

<details><summary>Answer</summary>

The default for object-set variables: **all objects of the type**. Pass every object-set variable explicitly. [05-03](../05-chatbot-studio/03-chatbots-outside-the-studio.md#1-chatbot-as-a-function)
</details>

**Q25 · D7** Setting up an Evals suite for a chatbot: two rules for test cases?

<details><summary>Answer</summary>

`sessionRid` null (or each case continues an old session); object-set variables null or a real value, never empty. Suite in the same project as the chatbot. [05-03](../05-chatbot-studio/03-chatbots-outside-the-studio.md#testing-it-with-aip-evals)
</details>

**Q26 · —** A chatbot with command tools runs as a function inside Automate. What happens to the commands?

<details><summary>Answer</summary>

They are **ignored**: commands need an app that supports them, paired with the chatbot. [05-02](../05-chatbot-studio/02-commands-as-tools.md#backend-tool-vs-command)
</details>

**Q27 · D5/D7** An OSDK app must hold conversations with a chatbot. What must the chatbot satisfy, and which Developer Console setting allows creating sessions?

<details><summary>Answer</summary>

It must use object, action and function types from **a single Ontology**; enable the AIP Chatbots API operations and the **AIP Chatbots write** permission. Resources don't update automatically when the chatbot changes. [05-03](../05-chatbot-studio/03-chatbots-outside-the-studio.md#2-sessions-through-platform-apis)
</details>

**Q28 · D8** Which session-log events show whether a tool call failed and how long it took?

<details><summary>Answer</summary>

`tool_call_result` (success or failure, `duration_milliseconds`); group by `traceId` or `session_rid`. Exported logs contain prompts and identifiers, so mark and restrict the dataset and set retention. [05-04](../05-chatbot-studio/04-session-logging.md)
</details>

## 06 — Document Intelligence

**Q29 · —** Scanned invoices with long tables: which strategy family, and which option helps most?

<details><summary>Answer</summary>

Generative (VLM) extraction **with preprocessing** (OCR output passed to the VLM along with the page). [06-01](../06-document-intelligence/01-extraction-strategies.md#the-strategies)
</details>

**Q30 · —** About 5% of layout-aware extractions fail with `ERROR_RESPONSE_JSON_PARSING`. How do you rerun only those?

<details><summary>Answer</summary>

Pass their media item IDs in `filter_on_media_items` and remove `@incremental` for that run. [06-02](../06-document-intelligence/02-deploying-extraction.md#runbook-the-transform)
</details>

## 07 — End-user apps

**Q31 · D7** The exam guide asks you to review AI FDE-generated function code. Name the four review areas and one check in each.

<details><summary>Answer</summary>

Schema (types and API names exist on this branch); platform idioms (model alias, server-side filtering); provenance (came through a PR or branch proposal; Evals ran); side-effect safety (edits only through actions; customer-facing actions confirmed). [07-05](../07-end-user-apps/05-ai-fde.md#reviewing-ai-fdes-function-code-a-checklist)
</details>

**Q32 · D8** Can AI FDE do something its user can't? Which of its actions always need approval?

<details><summary>Answer</summary>

No: it runs in the user's session, not as a service account. Approval every time for executing actions, creating apps or widgets, publishing and tags; file edits and builds auto-approve only on feature branches. [07-05](../07-end-user-apps/05-ai-fde.md#what-stops-it-doing-damage)
</details>

**Q33 · —** Does AIP Assist see your data?

<details><summary>Answer</summary>

Not by default. With attached code in Code Repositories it gets the **metadata** of datasets and objects referenced. [07-02](../07-end-user-apps/02-aip-assist.md#what-it-can-see-read-this-twice)
</details>

**Q34 · D7** An AIP Analyst question gets slower and dearer as the conversation goes on. Why, and two fixes?

<details><summary>Answer</summary>

Earlier messages and tool results are resent every turn. Hide or clean up large results; branch into a new tab; aggregate instead of loading objects. [07-04](../07-end-user-apps/04-aip-analyst.md#what-it-costs)
</details>

## 08 — Security, governance and administration

**Q35 · D8** The enrollment allowlist is {A, B}. A user's session carries markings A and C; the prompt contains only A-marked data. Allowed?

<details><summary>Answer</summary>

**Rejected**: the check is on the **token**, and C isn't allowed. The user can choose a scoped session without C. [08-03](../08-security-governance-and-admin/03-llm-data-access-with-markings.md#the-rule)
</details>

**Q36 · D8** A registered model is set to *Allow any data* while the enrollment has an allowlist. What applies?

<details><summary>Answer</summary>

*Allow any data*: a model-specific policy completely replaces the enrollment policy. [08-03](../08-security-governance-and-admin/03-llm-data-access-with-markings.md#configuring-it)
</details>

**Q37 · D8** A user can use AIP Threads but not AIP Logic. What do you check?

<details><summary>Answer</summary>

Application access for AIP Logic in Control Panel; also that AIP is enabled for every organization marking on the project. [08-02](../08-security-governance-and-admin/02-enabling-aip.md#the-checklist)
</details>

**Q38 · D8** Which requests count against a user's rate limit rather than a project's?

<details><summary>Answer</summary>

User-attributed ones: AI FDE, AIP Assist, AIP Analyst, Pipeline Builder Explain/Generate, IDE integrations. Logic, chatbots, pipelines and Workshop are project-attributed. [08-04](../08-security-governance-and-admin/04-capacity-and-rate-limits.md#which-limit-does-my-request-count-against)
</details>

**Q39 · D8** A nightly LLM pipeline starves a daytime chatbot of capacity. Three remedies.

<details><summary>Answer</summary>

Put the pipeline in its own project limit; reserve capacity for the chatbot's project; reschedule builds; move one workload to another model. Note 20% is always kept for interactive queries. [08-04](../08-security-governance-and-admin/04-capacity-and-rate-limits.md#the-administrators-tools)
</details>

**Q40 · D8** Do third-party model providers keep or train on prompts sent through AIP?

<details><summary>Answer</summary>

No to both, by technical and contractual guarantees; data is discarded after completion. [08-01](../08-security-governance-and-admin/01-security-privacy-and-ethics.md#part-1--the-security-reviewers-questions)
</details>

## 09 — Cost and observability

**Q41 · —** 2,000 input and 200 output tokens on a model at 31 and 124 compute-seconds per 10k tokens. Compute-seconds?

<details><summary>Answer</summary>

2,000 × 31/10,000 + 200 × 124/10,000 = 6.2 + 2.48 = **8.68**. [09-01](../09-cost-and-observability/01-compute-usage.md#from-tokens-to-compute-seconds)
</details>

**Q42 · D8** Where is AIP Assist's token usage booked?

<details><summary>Answer</summary>

To the user's folder, because it isn't attributable to one resource. [09-01](../09-cost-and-observability/01-compute-usage.md#where-the-usage-is-booked)
</details>

## 10 — Kestrel case

**Q43 · D7** In Delivery Desk, which tool requires confirmation and which writes a proposal instead of the change?

<details><summary>Answer</summary>

T5 *Send delay update* (confirm first); T6 *Propose re-route* (writes a `RerouteProposal`). [10-01](../10-kestrel-case/01-building-delivery-desk.md#stage-4--assemble-the-chatbot)
</details>

**Q44 · —** In the carrier-invoice flow, why is matching done in code?

<details><summary>Answer</summary>

A wrong match charges the wrong shipment; an unmatched line is visible and cheap to fix. AI reads the PDF; code decides the link. [10-02](../10-kestrel-case/02-carrier-invoices.md#what-is-ai-and-what-isnt)
</details>

---
[Module index](README.md) · Next module: [99 — Reference](../99-reference/README.md)
