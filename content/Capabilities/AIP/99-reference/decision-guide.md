# Decision guide

*Sources: the notes each branch links to · compiled October 14, 2026 · Ready for Review. The flowcharts are ours; every leaf links to the note with the docs' wording.*

Five decisions that come up on almost every AIP project, as flowcharts. Each ends at the note to read next.

## 1. Which model setup?

```mermaid
flowchart TD
    A{Can you use Palantir-provided models<br/>legally and for compliance?} -- yes --> B{Is your use case served by a model<br/>enabled for your enrollment and region?}
    B -- yes --> P["Palantir-provided model (01-01)"]
    B -- no --> E["Check enablement, georestriction, experimental toggle (01-01, 08-02)"]
    A -- no, or you have your own fine-tuned model --> C{Does the model expose a standard provider API at a reachable URL?}
    C -- yes --> R["Registered model: REST API source (02-02)"]
    C -- no --> D{Must inference stay inside your network?}
    D -- yes --> S["Registered model: self-hosted in a compute module (02-03)"]
    D -- no, you need to redact, remap or route --> X["Registered model: proxy or federation layer (02-03)"]
```

[01-01](../01-models-and-llms/01-supported-llms-and-model-catalog.md) · [08-02](../08-security-governance-and-admin/02-enabling-aip.md) · [02-02](../02-bring-your-own-model/02-rest-and-compute-module-backed-models.md) · [02-03](../02-bring-your-own-model/03-self-hosting-and-proxy-layers.md)

## 2. AIP Logic or a code function?

```mermaid
flowchart TD
    A{Is the core of the task language:<br/>classify, extract, draft, choose?} -- no --> C["Code function: TypeScript v2 or Python (03-01)"]
    A -- yes --> B{Who maintains it?}
    B -- analysts or business users --> L["AIP Logic (03-01, 03-02)"]
    B -- developers with tests in Git --> D{Must an LLM choose among tools?}
    D -- yes --> L2["AIP Logic, calling code for deterministic steps (03-02)"]
    D -- no --> C2["Code function calling the model through an alias (01-02)"]
    L --> F{Must it edit the Ontology?}
    L2 --> F
    F -- yes --> G["Back an action with it, or run it from an automation (03-02)"]
```

[03-01](../03-aip-logic/01-logic-concepts.md#logic-or-code) · [03-02](../03-aip-logic/02-building-a-logic-function.md) · [01-02](../01-models-and-llms/02-llm-provider-compatible-apis.md)

## 3. User-scoped or project-scoped?

```mermaid
flowchart TD
    A{Should the model see only what the caller can see?} -- yes --> U["User-scoped (default): own logs, 24 hours (03-03)"]
    A -- no, same behaviour for everyone, e.g. an automation --> P["Project-scoped: import every resource into the project;<br/>shared logs; run history dataset (03-03)"]
    U --> Q{Need shared, durable evidence?}
    Q -- yes --> R["Reproduce with the user's inputs, or use project-scoped with a run history dataset (03-03);<br/>for Evals, project-scoped runs (beta) (04-03)"]
```

[03-03](../03-aip-logic/03-execution-modes-and-branching.md#part-1--who-the-function-runs-as) · [04-03](../04-aip-evals/03-runs-and-experiments.md)

## 4. How do people reach a chatbot?

```mermaid
flowchart TD
    A{Who uses it, and where?} -- people in a Foundry app --> W["Workshop AIP Chatbot widget (05-01)"]
    A -- people asking for help anywhere --> AS["Publish to AIP Assist (05-02, 07-03)"]
    A -- an automation, an Evals suite or code, one shot --> F["Chatbot as a function (05-03)"]
    A -- your own app, multi-turn, streaming --> S["Sessions platform APIs via Developer Console (05-03)"]
    A -- another environment or team --> M["Marketplace product (05-03)"]
```

[05-01](../05-chatbot-studio/01-chatbot-concepts.md) · [05-02](../05-chatbot-studio/02-commands-as-tools.md) · [05-03](../05-chatbot-studio/03-chatbots-outside-the-studio.md) · [07-03](../07-end-user-apps/03-assist-custom-content-sources.md)

## 5. Which end-user app?

```mermaid
flowchart TD
    A{What does the person need?} -- help using the platform --> AS["AIP Assist (07-02)"]
    A -- answers from a few PDFs --> TH["AIP Threads (07-07)"]
    A -- answers from Ontology data --> AN["AIP Analyst (07-04)"]
    A -- a researched document, deck or plan --> BR["Boardroom (07-06)"]
    A -- to build or change things in Foundry --> FDE["AI FDE (07-05)"]
    A -- to make an existing AI workflow cheaper or better --> EV["AIP Evolve (07-07)"]
```

[07-01 comparison](../07-end-user-apps/01-which-app-for-whom.md) · [07-02](../07-end-user-apps/02-aip-assist.md) · [07-04](../07-end-user-apps/04-aip-analyst.md) · [07-05](../07-end-user-apps/05-ai-fde.md) · [07-06](../07-end-user-apps/06-boardroom.md) · [07-07](../07-end-user-apps/07-threads-evolve-and-realtime-audio.md)

---
[Module index](README.md) · Previous: [Limits and thresholds](limits-and-thresholds.md) · Next: [Docs index](docs-index.md) · [AIP home](../README.md)
