# 38 — Configure Code for Accessing Data

*Module: Data Connection: REST API · Inspected September 23, 2026 · Notes: Ready for Review · Practice: Not Started*

## What the transform does (structure of the course snippet)

```python
from transforms.api import transform_df, Output
from transforms.external.systems import external_systems, Source

@external_systems(rest_api_source=Source("<SOURCE RID>"))
@transform_df(Output("<OUTPUT DATASET PATH>"))
def compute(rest_api_source, ctx):
    conn = rest_api_source.get_https_connection()
    url = conn.url + "/<endpoint>"
    token = rest_api_source.get_secret("<secret name>")
    client = conn.get_client()          # pre-configured requests.Session
    response = client.get(url, headers={"Authorization": token})
    response.raise_for_status()
    return ctx.spark_session.createDataFrame(response.json())
```

Replace the source RID (from the globe panel) and the output path (copied from the Files panel). The course notes you may need to fix indentation after pasting.

## Reading it as an engineer

- `@external_systems` injects the **source**, so the code gets the base URL, egress permission and secrets without hard-coding them.
- `get_client()` returns a **requests `Session`** already set up for that connection.
- `raise_for_status()` makes HTTP errors **fail the build** instead of silently writing empty data.
- The JSON response becomes a **Spark DataFrame** written to the output dataset.

**Review question:** why call `raise_for_status()`? So a 4xx/5xx response fails the build and doesn't produce a misleading dataset.

---
[Official lesson](https://learn.palantir.com/deep-dive-data-connection/1864458) · [Course index](README.md) · [Review guide](REVIEW.md)

Course instructions are paraphrased. Engineering comparisons and review questions are teaching additions. No live Foundry connection was made for these notes. Next: 39 — Commit and Build Your Dataset.
