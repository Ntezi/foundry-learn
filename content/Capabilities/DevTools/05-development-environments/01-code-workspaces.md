# 01 — Code Workspaces

*Sources: [Code Workspaces: Overview](https://www.palantir.com/docs/foundry/code-workspaces/overview/) · [Code Workspaces: Code viewer](https://www.palantir.com/docs/foundry/code-workspaces/code-viewer/) · [Code Workspaces: Getting started](https://www.palantir.com/docs/foundry/code-workspaces/getting-started/) · [Interact with data](https://www.palantir.com/docs/foundry/code-workspaces/data/) · [Interact with external systems](https://www.palantir.com/docs/foundry/code-workspaces/external-systems/) · [Interact with the Ontology](https://www.palantir.com/docs/foundry/code-workspaces/ontology/) · [Train and interact with models](https://www.palantir.com/docs/foundry/code-workspaces/training-models/) · [JupyterLab®](https://www.palantir.com/docs/foundry/code-workspaces/jupyterlab/) · [RStudio® Workbench](https://www.palantir.com/docs/foundry/code-workspaces/rstudio/) · [Palantir-provided models](https://www.palantir.com/docs/foundry/code-workspaces/palantir-provided-models/) · [Code Workspaces: Security](https://www.palantir.com/docs/foundry/code-workspaces/security/) · [Code Workspaces: FAQ](https://www.palantir.com/docs/foundry/code-workspaces/code-workspaces-faq/) · [Code Workspaces: Troubleshooting](https://www.palantir.com/docs/foundry/code-workspaces/troubleshooting/) · [Compute usage](https://www.palantir.com/docs/foundry/code-workspaces/compute-usage/) · checked October 22, 2026 · Ready for Review*

**[Concept]** **Code Workspaces** runs third-party IDEs inside Foundry: **JupyterLab**, **RStudio Workbench** and **VS Code**. Each workspace is a container backed by a Foundry **code repository**, so it gets branching, commit history and Foundry permissions. This note covers JupyterLab and RStudio, the analysis and data-science side. VS Code workspaces, built on the same infrastructure, are in [02](02-vs-code-workspaces.md).

**[Docs]** The overview's rule of thumb: Code Workspaces "runs on a single node", while other Foundry tools use Spark. For large transformations use **Pipeline Builder** or **Code Repositories**; for data connections and streaming use **Data Connection** and **Foundry Streaming**; for point-and-click analysis use **Contour**.

## What a workspace is

**[Docs]**

- **Backed by a repository.** New workspaces and their repository are one resource; older ones stay as two, and you then share the repository separately. Transforms can't be published from the backing repository directly: "All code must be published from the code workspace."
- **Roles.** Project `Editor` or `Owner` can change the workspace's settings; `Viewer` can launch it. Each user gets an **isolated session**; colleagues see your code only after you **Sync changes** and they sync or reset.
- **Lifecycle.** The repository is cloned to `/home/user/repo`. **Auto-shutdown** defaults to **30 minutes** of inactivity (maximum **6 hours**), and a session lasts at most **24 hours**. `%%keep_alive` keeps a running Jupyter cell alive for up to 24 hours.
- **Resources.** Machines default to a maximum of **8 CPUs and 64 GB** of memory, up to what the project's resource queue (or imported compute profiles) allows. PySpark works, but in **local mode** on that one machine.
- **Code viewer.** A read-only view of the **committed** state: browse a branch, tag or commit, compare two points, copy a permalink to lines. It needs no running workspace, and opens by default while a stopped VS Code workspace starts.

## Saving work: syncs and checkpoints

**[Docs]** Two mechanisms, and the docs recommend relying on the first:

| | Code sync | Data checkpoint | Code checkpoint |
|---|---|---|---|
| Triggered | Manually (**Sync changes**) | Every **10 minutes**, and before shutdown | Only before shutdown |
| Stores | Committed files in `/home/user/repo` | `repo` (uncommitted too), `libs`, `envs`, `data`; RStudio memory in `.RData` | `repo` minus large or data-like files (best effort) |
| Shared with others | Yes, through the repository | **No** | — |
| Kept | Permanently | Up to **30 days** | No retention limit |

**[Docs]** Put data files in `data-checkpoint` (kept in checkpoints, excluded from syncs) or `data-tmp` (discarded at shutdown); the workspace warns about `.csv`, `.parquet`, `.xlsx` and similar files in `repo`. A sync that fails because the commit is too large usually means data got committed: remove it from history (the troubleshooting page gives `git filter-repo` commands) and add it to `.gitignore`.

## Data in and out

**[Docs] Reading.** Every dataset or restricted view needs an **alias**, mapped to its RID in a hidden file under `/home/user/repo/.foundry`. Jupyter reads with `Dataset.get("alias").read_table(format="arrow")` (also `pandas`, `polars`, `lazy-polars`, `path`); RStudio with `datasets.read_table("alias")`. Data comes from the workspace's **branch**, falling back to `master`, unless you pin a branch per dataset.

**[Docs] Staying inside one machine.** Use push-down filters before loading: `.select(...)`, `.where(Column.get(...) == ...)` and `.limit(...)` in Jupyter, `foundry::filter` with `dplyr` in RStudio. Row filters need **Parquet**; CSV takes column filters only. SQL through `FoundrySdkSqlExecutor` (or the `%sql` magic) queries one dataset per `SELECT`, with a default limit of **one million rows**. Dataset views can't be imported; copy them to a dataset first.

**[Docs] Writing.** *Save to dataset* registers an output alias and a snippet. Interactively, each call is one transaction: `write_table` makes a `SNAPSHOT`, `upload_directory` an `UPDATE`. Once the script is registered as a **transform**, interactive writes go to a `code-workspace-sandbox/` branch, and the transform run writes one `SNAPSHOT` (or `APPEND` if incremental) to the real branch.

**[Docs] Transforms from notebooks and R scripts.** Select **Build** next to an output dataset, check the inferred script and inputs, then **Sync and run**. The transform does **not** inherit the workspace's environment: install libraries at the top of the script. Neither Jupyter notebook transforms nor R transforms can call external services; the Jupyter page points to external transforms instead.

**[Docs] Files.** The IDE's own download button is disabled. To get a file out, write it to a dataset and download it from there, under the enrollment's export controls.

## Packages and environments

**[Docs]** Jupyter installs from `conda-forge` and `pypi.org` by default; RStudio from Posit Public Package Manager and Bioconductor, with `renv`. With **managed environments** (the *Managed Conda environments* setting) Jupyter installs go through `maestro env conda install` / `maestro env pip install`, and two files in the repository track them: `meta.yaml` (what you asked for) and `hawk.lock` (what was resolved). The same environment is then restored for the workspace, its applications, its notebook transforms and its models. Installing with `mamba` or `pip` directly is deprecated. `folium` and `pandasgui` aren't supported.

## Ontology, models and AI

**[Docs]**

- **Ontology.** One OSDK per workspace (Python, or from R through `reticulate`), built in the **Ontology** panel from chosen object and action types; versions are usable once **Published**. Time series properties are read through FoundryTS ([07-01](../07-foundryts/01-foundryts.md)). Restricted-view-backed entities and **query functions** aren't supported yet.
- **Models** (JupyterLab only). A **model alias** per model; `ModelOutput(...).publish(adapter)` publishes a version, and `ModelInput(...)` downloads one or deploys it for inference. A deployment is shared per model version and stops after **20 minutes** unused; one request is capped at **40 MB** (roughly 100,000 rows), with `use_chunking` for more. *Publish as transform output* turns a training notebook into a schedulable build.
- **Palantir-provided models** through `palantir_models`, when AIP is enabled; the list varies by enrollment.
- An experimental **AIP agent** in the JupyterLab and RStudio sidebars writes code, installs libraries and runs commands with tools you can switch off. Chat history is lost on restart.

## Applications

**[Docs]** JupyterLab publishes **Dash** and **Streamlit** apps (and previews TensorBoard); RStudio publishes **Shiny**. Each must start its server within **30 seconds** or fails to start. Apps follow the workspace branch: publishing on a branch publishes a branch version. A source an app uses must be listed in its advanced settings, and users need access to every source listed. Apps can't offer file downloads.

## Security

**[Docs]** The security page asks you to treat a workspace as "a general-purpose authoring environment":

- **Requests run as the current user**, with a session credential limited to the operations Code Workspaces supports. It is **not read-only**: authoring writes stay available where the user has permission. A resource in the same project isn't granted by that fact alone.
- **Workspace lineage.** A workspace inherits the markings of every dataset loaded into it. Lose access to one input and you lose the whole workspace.
- **Sources** replace network egress policies for interactive work and apps (except on CBAC environments), but aren't supported for transforms published from a workspace. A dataset whose marking isn't on a source's **exportable markings** list "cannot be used with that source in the same workspace"; the conflict is checked at startup and needs a restart without a checkpoint to clear.
- **Restricted outputs mode** is required to read restricted views (JupyterLab only, through SQL). It blocks writes to all Foundry outputs, turns off sources, network policies, logs and **data** checkpoints (code checkpoints continue), and persists until you turn it off.
- **Tools inside the workspace** (extensions, MCP servers, AI assistants) act within the user's session; they don't add permissions but can use all of them. Audit logs record requests to Foundry services, not a transcript of the editor or AI chat.

**[Docs]** One contradiction is logged as [RQ-09](../SOURCES.md#open-research-questions): the JupyterLab page says Dash and Streamlit apps can use restricted views as inputs and be published, while restricted outputs mode, which those inputs require, is described as blocking outputs derived from them.

## Cost

**[Docs]** Usage is compute-seconds while the session is `INITIALIZING` or `RUNNING`:

`vcpu_compute_seconds = max(vCPUs, GiB_RAM / 7.5) × rate × seconds`

with a rate of **0.1** for JupyterLab, RStudio, VS Code, Dash, Streamlit and Shiny, and from **1.2** (T4) to **4.7** (H100) per GPU. Each workspace adds a sidecar of **0.25 vCPU and 3 GiB**. The **default VS Code profile** (0.75 CPU, 6 GB) is free. The docs' examples: JupyterLab at 1 CPU / 8 GiB for an hour is **528** compute-seconds; VS Code at 4 CPUs / 32 GiB, **1680**. Usage is attributed to the workspace resource and visible in Resource Management.

## For Kestrel

**[Example]** The Kestrel model doesn't record where the delay-risk model ([Ontology 15-03](../../Ontology/15-advanced-patterns/03-models-in-the-ontology.md)) is trained. JupyterLab would suit it: exploring features over `Shipment` and `ShipmentEvent` data, then *Publish as transform output* so retraining is a scheduled build. A data scientist at 1 CPU / 8 GiB for 4 hours a day over 21 working days uses about **44,000** compute-seconds a month (528 × 4 × 21), small next to `kestrel-pay-llm`'s 12.5 million ([03-03](../03-compute-modules-and-custom-endpoints/03-debugging-history-and-cost.md#cost)). Auto-shutdown would stay at the 30-minute default. *Considered, not adopted* (recorded in [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md), October 22).

**[Example]** Workspace lineage matters for Kestrel Pay. A notebook that loads a `Payments [Ontology]` dataset inherits the `Kestrel Pay – Financial` marking ([Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md)), so only marked users can open the workspace at all. Keep payment analysis in its own workspace rather than adding a payments dataset to the delay-risk one. **[Recommendation]** Kestrel shouldn't add a source to a workspace that holds payments data unless the source's exportable markings include `Kestrel Pay – Financial`; otherwise the workspace refuses the combination at startup.

---
[Module index](README.md) · Next: [02 — VS Code workspaces](02-vs-code-workspaces.md)
