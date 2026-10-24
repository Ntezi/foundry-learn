# 02 — Palantir MCP

*Sources: [Palantir MCP](https://www.palantir.com/docs/foundry/palantir-mcp/overview/) · [Installation](https://www.palantir.com/docs/foundry/palantir-mcp/installation/) · [Getting started](https://www.palantir.com/docs/foundry/palantir-mcp/getting-started/) · [Example MCP workflows](https://www.palantir.com/docs/foundry/palantir-mcp/example-mcp-workflows/) · [Available tools](https://www.palantir.com/docs/foundry/palantir-mcp/available-tools/) · [Tool search](https://www.palantir.com/docs/foundry/palantir-mcp/tool-search/) · [Security](https://www.palantir.com/docs/foundry/palantir-mcp/security/) · checked October 22, 2026 · Ready for Review*

**[Concept]** **Palantir MCP** is an MCP server for **builders**. It gives an AI coding assistant (Claude Code, Cursor, Copilot, Continue and others) two things: **context** about Foundry's libraries and your repository, and **tools** to explore and change projects, datasets, the Ontology's structure, repositories and branches. It doesn't write Ontology data; that's [Ontology MCP](01-ontology-mcp.md).

## What it does well

**[Docs]** The overview's examples:

- **Library context**: it recognises the repository type (OSDK, Python transforms, TypeScript functions) and injects tailored context, plus snippets from Palantir's code index. Its screenshot shows it explaining AIP Chatbot Studio, "formerly known as AIP Agent Studio".
- **OSDK apps**: search the Ontology, change it safely, update the Developer Console app ("Create this object-type/link-type and integrate it with my application").
- **Python transforms**: run `preview_transform`, fix errors, re-run until it passes.

**[Docs]** Example workflows: repository context discovery; dataset search, SQL and creation of **new** datasets with notional data; Ontology search; and Ontology changes with SDK regeneration, which always go through a **proposal**.

## Installing it

**[Docs]** An administrator first enables Palantir MCP in **Control Panel** (under **Code Repositories**), for all users or chosen users and groups. **Local use is off by default.** Then follow **MCP Hub > Palantir MCP**, or the fallback instructions per IDE. All of them run `npx -y palantir-mcp --foundry-api-url https://<host>` with a user token in `FOUNDRY_TOKEN`.

```bash
export FOUNDRY_HOST="<your-foundry-hostname>"
export FOUNDRY_TOKEN=<token>        # not needed inside a Foundry repository
claude mcp add palantir-mcp --scope project \
  -e FOUNDRY_TOKEN='${FOUNDRY_TOKEN}' \
  -- npx "-y" "palantir-mcp" "--foundry-api-url" "https://$FOUNDRY_HOST"
```

**[Docs]** Details:

- Inside a **Foundry repository**, Palantir MCP can use your **Foundry Git token**; drop the token settings.
- The docs recommend **project scope** for Claude Code, so the server belongs to one project.
- The host goes without `https://` in `FOUNDRY_HOST`; the URL argument adds it.
- A Foundry **VS Code workspace** has it built in as an AI development tool ([05-02](../05-development-environments/02-vs-code-workspaces.md#ai-development-tools)).

## Tool search

**[Docs]** By default the agent sees only one tool, `search_tools`. It describes the capability it needs ("run a SQL query"), and the server ranks its catalogue **locally** (no extra model call), returns matching tools with their schemas, adds them to the agent's list and sends `tools/list_changed`. Discovered tools stay for the session.

**[Docs]** Tool search controls what's **visible**, not what's **allowed**: permitted tools are callable even before discovery, and all restrictions and permission checks still apply.

**[Docs]** Some clients only call tools from their cached list and ignore `tools/list_changed`. For those, load the full catalogue at start-up with `--no-tool-search` (after the `--` for Claude Code) or `PALANTIR_MCP_TOOL_SEARCH=false`. The Continue example ships with `--no-tool-search`.

## The tool catalogue

**[Docs]** Tools fall into groups, and many are **local-only** (not in Code Workspaces):

| Group | Examples | Notes |
|---|---|---|
| Compass | list, search and create projects; move resources within a project | Creating projects and searching are local-only |
| Datasets | schema, SQL, **create** a dataset from CSV, builds, job status, stats | `build_datasets` in Code Workspaces only in Python transforms repositories |
| Media, data health, lineage | media sets and items; health checks and groups; resource graph | |
| Ontology | search; view, **create or update, delete** object, link and action types **on a branch** | |
| Object sets | query, aggregate, semantic search | **Local-only** |
| OSDK, Platform SDK | SDK context and examples; publish an SDK version; API reference | |
| Code repositories | context, clone, pull requests and comments, `publish_function` | |
| Global Branching | create, view and close branches and proposals | |
| Developer Console | connect a non-Foundry Git repository; convert to `@osdk/react`; view the SDK definition | |
| Compute modules | docs, status, logs, start/stop, execute a function | Mostly local-only |
| Data Connection | REST sources, webhooks, egress policies | Local-only |
| Documentation | page loading, summaries, search | Search requires AIP |

**[Explanation]** The object-set query tools mean Palantir MCP **can read** Ontology data locally, through your token. The OMCP pages' "cannot write ontology data" is the accurate limit, not *never sees data*.

## Security and data flow

**[Docs]** Where the data goes depends on where you run it:

| | In Foundry (Continue in a VS Code workspace) | On your machine |
|---|---|---|
| LLM | Palantir-provided third-party LLMs | Whatever your tool uses: Claude Code sends to Anthropic, Copilot to Microsoft |
| Governance | Your contract with Palantir | Your contract with that provider |
| Data location | Stays in your Foundry environment | Tool outputs go to the provider |

**[Docs]** The installation page puts it plainly: once data reaches an external system through Palantir MCP, "the governance of its use shifts from Palantir to the external system".

**[Docs]** Write safeguards, from the security page: no destructive write tools; every write tool is either non-destructive or needs human approval; agents may **create** datasets but not update or delete existing ones; all Ontology changes, deletions included, go through a **proposal** that a human merges.

**[Explanation]** The tool list includes `delete_foundry_object_type` and friends (on a branch, so a proposal still gates them) and `manage_health_check`, which "creates, updates, or deletes health checks" with no proposal step. The security page's "We do not provide destructive write tools" seems too strong for health checks. Logged as [RQ-05](../SOURCES.md#open-research-questions).

## For Kestrel

**[Example]** Daniel's choices, which [09-02](../09-kestrel-case/README.md) builds out:

- **Kestrel Pay work runs in a Foundry VS Code workspace**, not a local IDE: `Payment` data carries the `Kestrel Pay – Financial` marking, and in-platform use keeps tool outputs inside Foundry.
- **Local Palantir MCP** is enabled for Daniel's group only, for commerce work, and only if Kestrel's agreement with his IDE's model provider allows tool outputs to go there. The Kestrel model doesn't record that agreement; check it before enabling.
- Ontology changes it proposes land in Kestrel's normal two-approval review ([Ontology 14-01](../../Ontology/14-lifecycle-and-operations/01-saving-reviewing-and-restoring.md)); the MCP never merges.

---
[Module index](README.md) · Previous: [01 — Ontology MCP](01-ontology-mcp.md) · Next: [03 — Pro-code agents](03-pro-code-agents.md)
