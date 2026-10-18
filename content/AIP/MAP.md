# Topic map

Find a note by task. Rows link to the note where it is written, otherwise to the module.

| I need to… | Go to |
|---|---|
| See what AIP is made of | [00-01 What AIP is](00-orientation/01-what-aip-is.md) |
| Understand the Agent Stack (sessions, Agent Builder, Agent Manager) | [00-01 The Agent Stack](00-orientation/01-what-aip-is.md#the-agent-stack-the-newest-layer) |
| Find out why a model isn't available to me | [01-01 Why a model is missing](01-models-and-llms/01-supported-llms-and-model-catalog.md#2-why-a-model-is-missing) |
| Deal with a model being retired | [01-01 Runbook](01-models-and-llms/01-supported-llms-and-model-catalog.md#5-runbook-a-model-you-use-is-being-retired) |
| Call AIP models with the OpenAI or Anthropic SDK | [01-02 LLM-provider compatible APIs](01-models-and-llms/02-llm-provider-compatible-apis.md) |
| Write a better prompt | [01-03 Prompt engineering](01-models-and-llms/03-prompt-engineering.md) |
| Use a model Palantir doesn't host | [02-01 Choosing a path](02-bring-your-own-model/01-choosing-a-byom-path.md) · [02-02 Registration](02-bring-your-own-model/02-rest-and-compute-module-backed-models.md) |
| Keep data inside our network, or redact it before a provider sees it | [02-03 Self-hosting and proxy layers](02-bring-your-own-model/03-self-hosting-and-proxy-layers.md) |
| Recognise or migrate an old `@ChatCompletion()` model | [02-04 Legacy registered LLMs](02-bring-your-own-model/04-legacy-registered-llms.md) |
| Build an LLM-powered function without code | [03-02 Building a Logic function](03-aip-logic/02-building-a-logic-function.md) |
| Decide between AIP Logic and a TypeScript or Python function | [03-01 Logic or code?](03-aip-logic/01-logic-concepts.md#logic-or-code) · [Ontology 09](../Ontology/09-functions/README.md) |
| Make a Logic function edit the Ontology | [03-02 If the function must edit the Ontology](03-aip-logic/02-building-a-logic-function.md#if-the-function-must-edit-the-ontology) |
| Choose user- or project-scoped execution | [03-03 Who the function runs as](03-aip-logic/03-execution-modes-and-branching.md#part-1--who-the-function-runs-as) |
| Develop Logic on a branch and get it reviewed | [03-03 Developing on a branch](03-aip-logic/03-execution-modes-and-branching.md#part-2--developing-on-a-branch) |
| Estimate Logic cost or fix a failing Logic function | [03-04 Logic in production](03-aip-logic/04-logic-in-production.md) |
| Test an AI function before shipping it | [04-01 Evals concepts and suites](04-aip-evals/01-evals-concepts-and-suites.md) · [04-03 Runs and experiments](04-aip-evals/03-runs-and-experiments.md) |
| Compare models or prompts systematically | [04-03 Experiments](04-aip-evals/03-runs-and-experiments.md#experiments) |
| Find out why a test case failed | [04-04 Reading results](04-aip-evals/04-reading-results.md) |
| Build a chatbot for a team | [05-01 Chatbot Studio concepts](05-chatbot-studio/01-chatbot-concepts.md) |
| Let a chatbot move the screen the user is on | [05-02 Commands as tools](05-chatbot-studio/02-commands-as-tools.md) |
| Call a chatbot from Automate, Evals or my own app | [05-03 Chatbots outside the studio](05-chatbot-studio/03-chatbots-outside-the-studio.md) |
| Analyse what a chatbot did | [05-04 Session logging](05-chatbot-studio/04-session-logging.md) |
| Give a chatbot Ontology context or tools | [Ontology 16-01](../Ontology/16-ai-and-agents/01-ontology-as-ai-context.md) · [Ontology 16-03](../Ontology/16-ai-and-agents/03-ontology-tools-for-agents.md) |
| Let AI propose edits that a person approves | [Ontology 16-04](../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md) |
| Extract data from PDFs | [06-01 Extraction strategies](06-document-intelligence/01-extraction-strategies.md) · [06-02 Deploying extraction](06-document-intelligence/02-deploying-extraction.md) |
| Call document-to-text from my own code | [06-03 Document-to-text](06-document-intelligence/03-document-to-text.md) |
| Choose an AI app for an end user | [07-01 Which app for whom](07-end-user-apps/01-which-app-for-whom.md) |
| Put our own help content into AIP Assist | [07-03 Custom content sources](07-end-user-apps/03-assist-custom-content-sources.md) |
| Embed an analysis agent in Workshop | [07-04 AIP Analyst: embedding it](07-end-user-apps/04-aip-analyst.md#embedding-it) |
| Review code that AI FDE generated | [07-05 Review checklist](07-end-user-apps/05-ai-fde.md#reviewing-ai-fdes-function-code-a-checklist) |
| Run a team of agents on a plan or document | [07-06 Boardroom](07-end-user-apps/06-boardroom.md) |
| Add voice to an OSDK app | [07-07 Realtime audio](07-end-user-apps/07-threads-evolve-and-realtime-audio.md#realtime-audio-voice-as-an-interface) |
| Answer a security reviewer's questions about AIP | [08-01 Security, privacy and ethics](08-security-governance-and-admin/01-security-privacy-and-ethics.md) |
| Find out why someone can't see an AIP app | [08-02 Enabling AIP](08-security-governance-and-admin/02-enabling-aip.md#the-checklist) |
| Control which data reaches which model | [08-03 LLM data access with markings](08-security-governance-and-admin/03-llm-data-access-with-markings.md) |
| Fix rate-limit errors or protect a production workflow | [08-04 Capacity and rate limits](08-security-governance-and-admin/04-capacity-and-rate-limits.md) |
| Estimate or explain AIP cost | [09-01 Compute usage](09-cost-and-observability/01-compute-usage.md) |
| Find out what an AI workflow did | [09-02 Observability](09-cost-and-observability/02-observability.md) |
| See the whole thing built for Kestrel | [10-01 Building Delivery Desk](10-kestrel-case/01-building-delivery-desk.md) · [10-02 Carrier invoices](10-kestrel-case/02-carrier-invoices.md) |
| Prepare for exam domains 3, 7 and 8 | [11-01 Review questions](11-practice/01-review-questions-by-module.md) |
| Look up a documented number | [99 Limits and thresholds](99-reference/limits-and-thresholds.md) |
| Make a common AIP decision quickly | [99 Decision guide](99-reference/decision-guide.md) |
| Find which note covers a docs page | [99 Docs index](99-reference/docs-index.md) |

---
[AIP home](README.md) · [Glossary](GLOSSARY.md)
