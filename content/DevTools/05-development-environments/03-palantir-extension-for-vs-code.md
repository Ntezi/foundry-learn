# 03 — The Palantir extension for VS Code

*Sources: [Palantir extension for Visual Studio Code: Overview](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/overview/) · [Palantir extension for Visual Studio Code: Feature list](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/extension-features/) · [Preview transforms](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/transforms-preview/) · [Active Preview](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/active-preview/) · [Debug transforms](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/debug-transforms/) · [Build transforms](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/transforms-build/) · [Code-defined input filtering](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/code-defined-filtering/) · [Transforms type hints](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/transforms-type-hints/) · [Python libraries](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/python-libraries/) · [Environment debugger](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/environment-debugger/) · [Security considerations for local development](https://www.palantir.com/docs/foundry/palantir-extension-for-visual-studio-code/security-considerations/) · checked October 22, 2026 · Ready for Review*

**[Concept]** The **Palantir extension for Visual Studio Code** brings Code Repositories features into VS Code, "currently focused on Python transforms". It's preinstalled in VS Code workspaces ([02](02-vs-code-workspaces.md)) and is "the endorsed method for local development for Python transforms". Everything below works in both places unless it says *local*.

## Installing it locally

**[Docs]** Local use needs two things from an administrator: local preview enabled in **Control Panel** (the Code Repositories settings page), and `s3-proxy:datasets-read` and `api:datasets-read` (the **Download** operation) on every preview input. The docs call these "privileged operations that allow users to download entire datasets locally".

**[Docs]** The extension isn't in the VS Code Marketplace. Download the VSIX from the platform (switch the **VS Code** button to **Local VS Code**), install it from the Extensions sidebar or with `Extensions: Install from VSIX...`, then open or clone a Palantir repository from the Palantir sidebar. Local-only commands include `palantir.cloneRepository` and `palantir.refreshToken`.

## Preview

**[Docs]** Start a preview from the Command Palette (**Run preview**), the Palantir side panel, the **Preview** CodeLens above a transform, or the **Preview** panel. Choose how inputs load with **Configure input strategy**:

| Strategy | What loads | Good for | Watch out for |
|---|---|---|---|
| **Sampled** (default) | A random **1000** rows (configurable) | Quick sanity checks | Narrow filters and joins come back "deceivingly short" |
| **Full dataset** | No pre-sampling; the engine pushes filters down and reads only matching chunks | Accurate filters and joins | Needs filter expressions to help; Spark and DuckDB push down best, Polars streaming is adequate, **pandas doesn't push down** |
| **Code-defined filters** | Your own filter functions, applied in order | Specific scenarios, reusable logic | The filter itself runs against the **entire production dataset** |

**[Docs] Incremental preview** uses the same resolution and evaluation logic as production builds, for Spark and lightweight transforms and both v1 and v2 semantics. The panel tags each run **Ran incrementally** or **Ran as a snapshot**, with the reason on hover.

**[Docs]** Against Code Repositories preview, VS Code preview adds incrementality, media sets (`put_media_item` only), Spark profiles (a listed subset of runtime settings only) and, in Code Workspaces, Iceberg tables. It doesn't support **language models**. Cipher columns show `**DATA WILL BE ENCRYPTED AT BUILD TIME**`. The models footnote contradicts itself ([RQ-07](../SOURCES.md#open-research-questions)).

### Code-defined filters

**[Docs]** The extension discovers eligible filters anywhere in the repository. A filter must be a **top-level, fully type-annotated** function with one of these signatures:

- Spark: `(pyspark.sql.DataFrame) -> pyspark.sql.DataFrame`
- Lightweight: `(polars.LazyFrame) -> polars.LazyFrame`
- Raw files: `(collections.abc.Iterator[transforms.api.FileStatus]) -> collections.abc.Iterator[transforms.api.FileStatus]`

It can't be nested, guarded by `if`/`with`/`for`, in a class, imported, assigned to a variable, `async`, private (leading `_`) or decorated. Parameters must be **keyword-only** (after `*`) and of type `str`, `int`, `float` or `bool`; defaults make them optional, and the extension prompts for the rest. A CodeLens hint confirms a function is eligible.

### Active Preview

**[Docs]** With **Active Preview** on, every save re-runs the preview, using heavy caching (including filtered inputs **in memory**, so inputs must fit). While it runs: **auto-save is off**, you can't start another preview or debug, every save hits any external API your transform calls, and you shouldn't rename or move the transform or edit `setup.py`. Restart it if changes elsewhere in the project don't show up.

## Debug, build, and the environment

**[Docs]**

- **Debug:** set a breakpoint, choose **Debug** above the transform, then **Inspect current value of …** (or **Palantir: Inspect variable**) to load a DataFrame into the Preview panel with column statistics.
- **Build:** **Palantir: Build on Foundry**, the side panel, or the **Build** panel. Builds run on the platform against the full dataset, and you must **push** local changes first.
- **Type hints:** a linter flags missing or wrong transform parameter types and offers Quick Fixes; silence it with `# palantir: ignore`, `# palantir: ignore-next-line`, `# type: ignore` or `# noqa`, or in settings.
- **Libraries:** the library panel installs a version and adds it to `meta.yaml`; a library from a backing repository not imported into the project prompts you to import it.
- **Environment debugger:** when a solve fails, **Resolve in environment debugger** draws the conflict graph with conflicting requirements in red, and lets you remove or change your own (*user-defined*) dependencies. On a solved environment, open the `hawk` lockfile to trace why a package is present.
- **Snippets:** `ptf` (Python transform), `pltf` (Polars), `pdtf` (pandas), or their long forms.

## Security of local preview

**[Docs]** "The best way to ensure no data leaves the platform during transforms preview is to execute it within VS Code workspaces." Locally:

- Local preview needs **Download** on all inputs (and outputs, for incremental transforms) **and** the Control Panel setting, so it can't raise anyone's permissions.
- No input datasets are written to disk. Data is streamed into memory over Foundry's S3-compatible API, and each preview shows up in **audit logs**.
- At most **10000** result rows are cached on disk for the Preview table, under **Palantir > Cache: Path**. The cache is deleted at the next preview, on a clean exit, at each start, or with `palantir.transforms.datasets.cleanUp`.
- The protections are against accidents: they "cannot prevent intentional abuse". Nothing stops a user writing data to their disk during a preview.

## For Kestrel

**[Recommendation]** Kestrel should keep **local preview off** and develop transforms in VS Code workspaces ([02](02-vs-code-workspaces.md#for-kestrel)). **Adopted** into [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md) on October 22, for all transforms work (04-02 had settled it only for Kestrel Pay). Local preview would require granting **Download** on every input, and for datasets marked `Kestrel Pay – Financial` that's a grant to export the whole dataset. If a commerce developer later needs local tools, enable it for that group only and only on inputs they could already download.

**[Example]** A reusable code-defined filter for previewing Kestrel's shipment logic one region at a time, assuming a Spark transform over a dataset with a `region` column (the `Shipment` property is `region`, [Ontology 17-02](../../Ontology/17-case-studies/02-kestrel-reference-model.md)):

```python
from pyspark.sql import DataFrame
from pyspark.sql import functions as F

def shipments_in_region(df: DataFrame, *, region: str = "Accra") -> DataFrame:
    """Only one region's shipments"""
    return df.filter(F.col("region") == region)
```

Chosen under **Code-defined filters**, it runs sample-less and is pushed down where the engine allows, so a preview of Kofi's region works on Accra's rows instead of a random 1000 that may hold few of them.

---
[Module index](README.md) · Previous: [02 — VS Code workspaces](02-vs-code-workspaces.md) · Next: [04 — SuperRepo and the Foundry CLI](04-superrepo-and-foundry-cli.md)
