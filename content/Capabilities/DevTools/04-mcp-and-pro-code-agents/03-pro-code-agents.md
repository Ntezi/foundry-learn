# 03 — Pro-code agents

*Sources: [Pro-code agents](https://www.palantir.com/docs/foundry/agents/overview/) · [Use cases](https://www.palantir.com/docs/foundry/agents/use-cases/) · [Scoped permissions](https://www.palantir.com/docs/foundry/agents/scoped-permissions/) · [Pro-code agent templates](https://www.palantir.com/docs/foundry/agents/agent-templates/) · [Develop on a global branch](https://www.palantir.com/docs/foundry/agents/branching/) · [Connect to external systems](https://www.palantir.com/docs/foundry/agents/sources/) · [Publish and call](https://www.palantir.com/docs/foundry/agents/publish-and-call/) · [Build a pro-code agent in Foundry](https://www.palantir.com/docs/foundry/agents/create-agent/) · [Build a pro-code agent with Continue](https://www.palantir.com/docs/foundry/agents/build-agent-continue/) · checked October 22, 2026 · Ready for Review*

**[Concept]** A **pro-code agent** is an agent you write in code with a third-party agent SDK (the **Claude Agent SDK**, **OpenAI Agents SDK** or **Google ADK**), in a Foundry code repository, and publish as a Foundry **function**. It gets the OSDK, Ontology MCP and Palantir MCP as tools with no credentials to manage. Where AIP Chatbot Studio (formerly AIP Agent Studio) and AIP Logic are configured in the platform ([AIP 00-01](../../AIP/00-orientation/01-what-aip-is.md)), this is the code-first path.

**[Docs]** The branching page marks pro-code agents **beta**; they may not be on your enrollment.

## What the template gives you

**[Docs]** Create one with **+ New repository**, choose the template for your framework under *What are you building?*, then set a name, location, the **Ontology** (required; it becomes the agent's **Ontology binding**) and the **Agent API name** (from the repository name; editable). A **Build agents in Foundry** page guides the next steps.

```text
agent/
├── index.ts          AgentArguments schema + runAgent (the agent loop)
├── systemPrompt.ts   the system prompt
└── customTools.ts    custom tools, served by an in-process MCP server
utils/                platform helpers: OSDK client, publishing
scripts/              build scripts
```

**[Docs]** The three templates share structure, arguments, MCP defaults and publishing; they differ in the loop:

| Template | Loop | Custom tools |
|---|---|---|
| Claude Agent SDK | `query(...)` with `mcpServers` | `tool(...)` + `createSdkMcpServer` |
| OpenAI Agents SDK | `new Agent({...})` + `run(...)` | `tool(...)` from `@openai/agents` |
| Google ADK | `Agent` + `InMemoryRunner`; Gemini through the Foundry language model proxy (`FoundryGemini`), so **no Google API key** | `FunctionTool` |

**[Docs]** Add your own MCP configurations in **new files** under `agent/` (for example `agent/mcps/custom.ts`) so template upgrades don't conflict.

## Tools without credentials

**[Docs]** The agent library (`@palantir/agent-templates-bundle`) resolves URLs and authorization at runtime, so agent code needs **no client ID, secret or Foundry token**:

| Helper | Gives |
|---|---|
| `getOntologySdkClient($ontologyRid)` | An OSDK client for the bound Ontology |
| `getOntologyMcpConfiguration()` | Ontology MCP over the agent's SDK resources; **add an SDK first** |
| `getPalantirMcpConfiguration()` | Palantir MCP; tool search on by default |
| `getPythonTransformsMcpConfiguration()` | Tools for previewing and discovering Python transforms |

**[Docs]** Each is `async` and framework-specific (import from `.../mcp/anthropic`, `.../mcp/openai` or `.../mcp/google`). Palantir MCP and the transforms MCP need the front-door host, resolved from Control Panel at runtime, so they keep working after a Marketplace install; a `fallbackHost` option covers failures.

**[Docs]** The agent can only reach what its scope allows: the Ontology binding plus the application restrictions of the underlying client. Adding an object or action type to the agent's SDK also makes it an OMCP tool, because OMCP is built from the same SDK resources.

## Calling an agent

**[Docs]** Publishing (tag a version; CI deploys it) registers the agent as an **asynchronous function** with its Ontology binding and API name. Then:

- **Automate is the recommended trigger**: a function effect pointing at the agent. It runs as the triggering user or the automation's service user.
- It's also callable from Workshop, the OSDK and actions, but it returns **`Void`**: it can't be a query function. Call it as a function effect, or wrap it in a TypeScript Ontology edit function.
- Have it **write results to Ontology objects** and read them back; the same pattern serves AIP Evals grading.
- It's **not subject to the five-minute** synchronous function limit. Streaming and batch invocation aren't supported.
- Arguments follow `AgentArguments` (declared with `defineInputs`). For objects, pass **primary keys** and re-fetch inside the agent.

**[Docs]** Locally: `npm install`, then `npm run start -- --json-args '...'` (or `--json-args-file`), and `npm run build` before publishing.

**[Docs]** Logs: `console.log/warn/error` go to your terminal locally; after publishing, open the execution in **Workflow Lineage** and **View log details**. Search across runs from the **first executable resource** in the chain (for example the automation, not the agent). You can see your own runs' logs from the past **24 hours** (not on CBAC stacks); others' need Edit on that resource, log access and all the logs' markings.

## Branches and external systems

**[Docs]** On a **global branch** (needs Global Branching and agent branching enabled, and a template version that supports it):

- OSDK and OMCP calls read and write the **branch**, but use the **`main` schema**: types that exist only on the branch aren't in the SDK or the tools.
- **Platform APIs aren't branch-aware**, and **Palantir MCP doesn't support branch context**: don't use it on a branch.
- Index the object types an action edits on the branch before testing.
- Publish with **Tag version** in the repository UI (not a raw git tag) and pick a **stable version target**; branch resources resolve the latest pre-release, and merging the proposal publishes the stable version to `main`.
- Don't change the API name or Ontology binding on one branch while the agent is published on another.

**[Docs]** **Sources** give an agent egress and secrets (at `/app/var/run/source_credentials.json`, keyed by source then secret; `{}` if unresolved). Don't cache the file; it's replaced atomically. Sources for agents aren't supported on **CBAC** environments.

## The use-case patterns

**[Docs]** Three patterns, each with an example:

| Pattern | Trigger | Tools | Example |
|---|---|---|---|
| Ontology data agent | An Ontology change, through Automate | OSDK / OMCP | A declined claim gets an explanation and next steps written back |
| Platform resource agent | A platform event | Palantir MCP | A failed build: read logs, fix, test, open a pull request |
| Migration agent | Legacy code ingested as objects | All three | Reproduce legacy logic as transforms, functions and Ontology resources |

**[Docs]** Before choosing, define the purpose, the minimum data and tools, and which outputs need human review; the page says these privacy and civil liberties decisions are harder to change later.

**[Docs]** With **Continue** and Palantir MCP, you can ask your editor to change the prompt, "Add MyObjectTypeApiName to the SDK and install it here" (which also adds OMCP tools), or "Publish this agent".

## Pro-code agent, AIP agent, or Logic?

**[Explanation]** The deciding facts:

| | Pro-code agent | AIP Chatbot Studio agent | AIP Logic |
|---|---|---|---|
| Built | In code, any of three SDKs | In the platform | In the platform, as a function |
| Talks to a user | **No**: async, returns nothing | Yes, a chat surface | Called by apps or automations |
| Best for | Background jobs that reason and act, especially across platform resources | Interactive assistants | Bounded, typed steps |

## For Kestrel

**[Example]** The Delivery Desk agent stays an AIP chatbot ([Ontology 16-03](../../Ontology/16-ai-and-agents/03-ontology-tools-for-agents.md)): CS agents talk to it, and a pro-code agent can't hold a conversation.

**[Example]** A pro-code agent fits Daniel's side of the work: a **build-fixing agent**, triggered when a build of one of Kestrel's datasets fails (for example a dataset behind `Shipment`), that reads the logs through Palantir MCP and opens a pull request for review, as in the docs' pattern. It writes no Ontology data and needs no OMCP tools, so its scope stays small. *Considered, not adopted* (recorded in [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md), October 22).

---
[Module index](README.md) · Previous: [02 — Palantir MCP](02-palantir-mcp.md) · Next module: [05 — Development environments](../05-development-environments/README.md)
