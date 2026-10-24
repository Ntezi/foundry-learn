# 02 — VS Code workspaces

*Sources: [VS Code workspaces: Overview](https://www.palantir.com/docs/foundry/vs-code/overview/) · [Choose between local development and VS Code workspaces](https://www.palantir.com/docs/foundry/vs-code/local-vs-workspace-guide/) · [VS Code workspaces: Benefits of VS Code workspaces](https://www.palantir.com/docs/foundry/vs-code/benefits/) · [VS Code workspaces: Global Branching](https://www.palantir.com/docs/foundry/vs-code/global-branching/) · [VS Code workspaces: AI development tools](https://www.palantir.com/docs/foundry/vs-code/ai-development-tools/) · [VS Code workspaces: Troubleshooting](https://www.palantir.com/docs/foundry/vs-code/troubleshooting/) · checked October 22, 2026 · Ready for Review*

**[Concept]** A **VS Code workspace** is VS Code running on Palantir infrastructure through Code Workspaces ([01](01-code-workspaces.md)), with the **Palantir extension** preinstalled. It's available wherever Code Workspaces is enabled. The same extension can also be installed in your **local** VS Code; that path is [03](03-palantir-extension-for-vs-code.md). This note is about the in-platform editor and how to choose between the three code environments.

## What it's for

**[Docs]** Supported workflows:

- **Python transforms**: environment set up at startup, preview (including sample-less and code-defined filters), debugging with variable inspection, builds from the editor, snippets.
- **Functions** (TypeScript v1, v2 and Python): import resources and generate SDKs, preview before committing, switch between **Code** and **Global** branches, tag versions, run tests in the terminal.
- **OSDK React applications**, created from a Developer Console application's *Code repository* section, with OAuth and CI preconfigured and a live-reload dev server ([02-02](../02-developer-console-and-apis/02-bootstrapping-and-hosting.md)).
- **Python compute modules** and **Python libraries**, with run and debug.

**[Docs]** Open one with **Open in VS Code** on a supported repository, or choose VS Code when creating a repository. A repository setting makes VS Code the default editor; some repository types always open in VS Code.

## Three environments, one comparison

**[Docs]** The docs position them like this: **Code Repositories** is the Palantir-built IDE and "the intended platform tool for pull request reviews and repository management"; a **VS Code workspace** is VS Code on Palantir infrastructure; the **local extension** brings preview, debug and build to your own VS Code. The feature comparison, condensed:

| | Code Repositories | VS Code workspace | Local extension |
|---|---|---|---|
| Python transform preview, debugger, unit tests | Yes | Yes | Yes |
| Full data preview | A sample, pre-filterable | Yes | Yes |
| Java transforms | Yes | **No** | **No** |
| SQL integration | Yes | No | No |
| TypeScript function preview | Yes | Yes | **No** |
| TypeScript language server, live reload (OSDK apps) | No | Yes | Yes |
| Shell terminal | No | Yes (remote host) | Yes |
| Public extensions | — | **No** | Yes, if your organization allows |
| AI assistance | AIP Autocomplete | Continue | No |

**[Docs]** Between the two VS Code options:

| | VS Code workspace | Local extension |
|---|---|---|
| Setup | None | Download and install the extension |
| Data | Stays on the platform; only preview results are shown (up to 1000 rows) | Streamed into local memory during preview |
| Needs | Code Workspaces enabled | An administrator enabling **local preview**, plus `s3-proxy:datasets-read` and `api:datasets-read` on every input |

**[Docs]** "If you are unsure which option is best for you, we recommend starting with VS Code workspaces."

## What it adds over Code Repositories

**[Docs]** The benefits page lists **full dataset preview** (no random sampling), **incremental preview** that runs the same resolution logic as production builds (v1 and v2 semantics), **code-defined filters**, a faster language server, an integrated terminal, and saved key bindings and themes. Preview details are in [03](03-palantir-extension-for-vs-code.md).

**[Docs] Cost.** VS Code workspaces bill as Code Workspaces do ([Compute usage](https://www.palantir.com/docs/foundry/code-workspaces/compute-usage/)); the **default profile (0.75 CPU, 6 GB) is free**, and larger profiles or GPUs are charged at the usual rates ([01](01-code-workspaces.md#cost)).

## Global Branching in the editor

**[Docs]** A repository in VS Code has two kinds of branch: its **Code Repositories branch** (the git branch) and a **global branch**, which can hold changes across applications and must be based on the repository's default branch.

- The **branch taskbar** (the blue bar at the bottom, VS Code workspaces only) shows the active branch and keeps the terminal, Command Palette and editor on it. Locally, use the extension's tabbed branch selector.
- Create or check out a global branch from the taskbar, the extension's **Global branch** tab, or the Command Palette (**Palantir: Create Global Branch**, **Palantir: Checkout Global Branch**). Checking out a branch the repository isn't on prompts you to **add it**; uncommitted changes must be resolved first.
- **Transforms:** preview and build run against the checked-out branch.
- **Functions:** live preview, published preview and resource imports follow the active global branch; a **Tag Version** on a branch creates the tag against that branch.
- **OSDK React apps** need the Global Branching repository setup on the default branch first ([02-03](../02-developer-console-and-apis/03-operating-an-application.md)).

**[Docs]** The general model (proposals, approvals, lifecycle) is in [06-01](../06-branching-and-cross-app/01-global-branching.md).

## AI development tools

**[Docs]** **Continue** is built in when AIP is enabled, preconfigured with Palantir-provided models and with knowledge of the Palantir SDKs and the repository. In transforms repositories it reads **dataset schemas** when you include a dataset RID; in TypeScript OSDK repositories it knows the objects, links, actions and functions in your OSDK. Start with `How do I write a transform?` or `Tell me about my OSDK`. Continue itself costs nothing extra; the models bill at AIP rates.

**[Docs]** **Palantir MCP** is integrated by default ([04-02](../04-mcp-and-pro-code-agents/02-palantir-mcp.md)). In a workspace it provides context tools for OSDK, Python and TypeScript function repositories, transform preview (so the agent can run a transform and fix errors), Ontology management, Developer Console tools to regenerate the OSDK, and navigation tools including SQL queries.

**[Docs]** These agents run inside the user's session and the workspace credential's scope; they "do not independently expand the user's Foundry permissions" ([01](01-code-workspaces.md#security)).

**[Docs] Troubleshooting.** A blank or failing editor is usually the browser cache: do a hard reload (in Chrome, **Empty Cache and Hard Reload**). Other errors are Code Workspaces errors ([01](01-code-workspaces.md)).

## For Kestrel

**[Example]** Kestrel's functions house rule already says *VS Code workspace* for `kestrel-functions` and `kestrel-ml` ([Ontology 09-05](../../Ontology/09-functions/05-writing-functions-in-practice.md)), and Daniel's Kestrel Pay work runs in-platform because `Payment` data carries the `Kestrel Pay – Financial` marking ([04-02](../04-mcp-and-pro-code-agents/02-palantir-mcp.md#for-kestrel)). The comparison adds two facts:

- The Kestrel model doesn't record which language Priya's transforms use ([Ontology 02-02](../../Ontology/02-foundry-data-foundations/02-pipelines-that-feed-the-ontology.md)). **Python** transforms fit VS Code workspaces; a **Java** transform would have to stay in Code Repositories, which remains the place for pull request review either way.
- **[Recommendation]** Most of Kestrel's developers can stay on the **free default profile**; a larger profile is worth it only for full-dataset previews over big inputs.

---
[Module index](README.md) · Previous: [01 — Code Workspaces](01-code-workspaces.md) · Next: [03 — The Palantir extension for VS Code](03-palantir-extension-for-vs-code.md)
