# 05 — AI FDE

*Sources: [AI FDE](https://www.palantir.com/docs/foundry/ai-fde/overview/) · [Navigation](https://www.palantir.com/docs/foundry/ai-fde/navigation/) · [Modes and capabilities](https://www.palantir.com/docs/foundry/ai-fde/modes-and-capabilities/) · [Pre-fill sessions with URL parameters](https://www.palantir.com/docs/foundry/ai-fde/prefill-sessions/) · [Security and governance](https://www.palantir.com/docs/foundry/ai-fde/security-and-governance/) · [Best practices](https://www.palantir.com/docs/foundry/ai-fde/best-practices/) · checked October 8, 2026 · Ready for Review*

**Why this note is longer than its neighbours.** The exam guide's domain 7 asks you to review AI FDE-generated function code and validate schema, platform idioms, provenance and side-effect safety before publishing ([exam guide note](../../Application%20Developer/07_Exam_Guide.md)). So this note ends with a review checklist, after explaining what AI FDE does and what stops it.

## What it is

**[Docs]** AI FDE, "the AI-powered forward deployed engineer", is "an interactive agent that operates Foundry for you through conversational commands": data transformations, code repositories, Ontology building and more. It needs AIP enabled; **Global Branching** is recommended so it can make Ontology edits.

**[Docs] How it works:** it analyses your intent and context, chooses Foundry operations, runs them with native tools, and explains what it did. It works in a **closed loop**: act, observe the result, decide the next step. It validates its own work, for example with a transform preview, a function preview or CI checks.

**[Docs]** It starts with **minimal context** (general Foundry knowledge, no user data), to avoid "context pollution". You add context: drag in folders, datasets or documentation, pick resources (datasets, functions, branches, interfaces, action types, object types), upload media, or enable search tools.

## Modes and capabilities

**[Docs]** A **mode** is the broad task; it loads the right documentation and tools. The agent can pick a mode from your prompt, and switch mid-task.

| Mode | Configuration |
|---|---|
| Data integration | Python transforms or Pipeline Builder |
| Data connection | — |
| Ontology editing | — |
| Functions editing | Language: Logic, TypeScript or Python (and testing with AIP Evals) |
| Exploration (read-only) | — |
| Governance (permissions, markings, data protection) | — |
| Machine learning | Model Studio (no-code) or pro-code, and editor |
| OSDK React | — |
| Platform Q&A | — |

**[Docs]** **Capabilities** are finer-grained and work across modes. *Agent capabilities*: change mode, request clarification, **generate plan**, load documentation, manage context and capabilities. *Domain capabilities*: filesystem, Notepad, solution design diagrams, **execute actions**, and more.

**[Docs]** The **chat outline** keeps prompts, responses, tools used and tokens per message; you can summarise or remove messages to stay inside the context window. Models perform better with **only the tools the task needs** enabled.

## What stops it doing damage

**[Docs] Identity.** AI FDE "is not a separate service account or bot". It acts in **your** Foundry session: if you can't create a repository or edit an object type, neither can it, and the permission errors are the same.

**[Docs] Branches by default.** It proposes changes in a **Global Branch proposal** or a **Code Repository pull request**.

**[Docs] Tool approval:**

| Category | Examples |
|---|---|
| **Approval every time** | Executing Ontology actions, creating applications or widgets, publishing, creating tags |
| **Branch-aware** | File edits and dataset builds auto-approve on **feature branches**, need approval on **protected** branches |
| **Auto-approved** | Read-only operations: searching, reading definitions |

By default approval is also needed for changes on the default branch, unbranched changes (such as creating a repository) and tools with side effects such as builds. You can pre-approve tools for a session, scoped to a branch or project.

**[Docs] Sessions and audit.** A session is visible **only to its creator** and carries the creator's markings; lose a marking, lose the session. Everything is in the standard audit logs under your identity, and LLM usage and rate limits are attributed to you.

## Pre-filled sessions

**[Docs]** `/workspace/ai-fde/prefill` with `prompt`, one or more `skillRid`, and `autoStart`. Values must be URL-encoded. Auto-started sessions still follow tool approval. Put long, reusable instructions in an **AIP skill** and keep the prompt short.

**[Example]** Kestrel's Ontology change page has a button: `…/prefill?skillRid=<kestrel-ontology-standards>&prompt=Add+a+property+to+<selected type>+…` with `autoStart` **off**, so Daniel edits the request before sending. The skill holds Kestrel's naming rules and the change policy from [Ontology 14-01](../../Ontology/14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md).

## Best practices, and the infrastructure warning

**[Docs]**

- Verify generated resources before production; test transform logic on representative data; understand a tool call before approving it.
- Limit tools and context to what the task needs.
- Decompose; build basic structures first. AI FDE suits **rapid prototyping**; combine it with manual work for production quality.
- Track functions it creates or changes with **AIP Evals**.
- **Infrastructure:** unlike a person, AI FDE can run "dozens of operations in minutes", and several sessions can run in parallel. Watch storage reads and writes, compute (especially GPUs) and storage capacity.

## Reviewing AI FDE's function code: a checklist

**[Recommendation]** Our checklist for the exam's four review points. Each item names the platform rule it checks.

**1. Schema**
- [ ] Input and output types match what callers expect (Workshop variables, action parameters, the evaluation suite's columns).
- [ ] Object types, properties and links it reads exist under those API names, on **this** branch. API names can't change on a branch ([03-03](../03-aip-logic/03-execution-modes-and-branching.md#known-limitations)).
- [ ] Nullable properties are handled.

**2. Platform idioms**
- [ ] Repository and language follow team rules (Kestrel: TSv2 repositories by domain, [Ontology 09-05](../../Ontology/09-functions/05-writing-functions-in-practice.md)).
- [ ] Models are called through an **alias**, not a hard-coded RID ([01-01 runbook](../01-models-and-llms/01-supported-llms-and-model-catalog.md#5-runbook-a-model-you-use-is-being-retired)).
- [ ] Queries filter and aggregate on the server rather than loading large object sets ([Ontology 03-03](../../Ontology/03-ontology-fundamentals/03-objects-and-object-sets.md)).
- [ ] Deterministic work isn't routed through an LLM call.

**3. Provenance**
- [ ] Every number or claim in the output comes from loaded data, not model prose; stored model outputs keep their model version (the `delayRisk` pattern, [Ontology 15-03](../../Ontology/15-advanced-patterns/03-models-in-the-ontology.md)).
- [ ] The change came through a **pull request or branch proposal**, and the session's plan matches the diff.
- [ ] An Evals suite ran on the published version, with results someone else can see (project-scoped, [04-03](../04-aip-evals/03-runs-and-experiments.md)).

**4. Side-effect safety**
- [ ] Edits happen only through **actions**, with their own criteria; a query function makes no edits.
- [ ] Actions that message customers or move money keep human confirmation (Delivery Desk's T5 rule).
- [ ] Webhooks, notifications and builds triggered by the change are listed and intended.
- [ ] Nothing was approved "for the session" on a protected branch.

**[Example]** Daniel asked AI FDE, in *Data integration* mode, to build the pipeline that parses extracted invoice pages into `CarrierInvoiceLine` rows ([06-02](../06-document-intelligence/02-deploying-extraction.md)). It produced a branch and a pull request in minutes. The review caught one item: the generated code set the `Shipment` link directly from the printed tracking number, which [06-01](../06-document-intelligence/01-extraction-strategies.md#where-the-data-goes) says must only happen after matching. A provenance failure, fixed before merge.

---
[Module index](README.md) · Previous: [04 — AIP Analyst](04-aip-analyst.md) · Next: [06 — Boardroom](06-boardroom.md)
