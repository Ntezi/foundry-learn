# 18 — Define `all_orders`: publish a contract outside the pipeline editor

`Union Orders` describes the final transformation result inside the graph. The next step gives that result a dataset output named **all_orders**, so downstream resources have a defined resource to consume after it is built.

Select `Union Orders`, choose **Add output → New dataset**, name it `all_orders`, retain the intended columns and save.

## Why the output belongs here

Placing the output after `Join Office Goods` would publish only one company's enriched orders. Placing it before the customer joins would omit the shared customer context. `Union Orders` is the point where the course's preparation is complete.

This resembles selecting the public return value of a computation. Intermediate values help implement the computation, but consumers should depend on a deliberate result with a stable contract.

The dataset is also a resource that can be inspected independently after materialization. **Materialization** means executing the computation and storing its result, rather than only describing how to compute it. This lesson defines the output; the next lesson deploys and builds it.

## Know what the eleven fields mean

| Field or group | Why the downstream workflow needs it |
|---|---|
| `order_id` | Addresses a particular Order. |
| `order_due_date` | Provides the prepared due-date value. |
| `customer_id` | Retains the original source customer's identifier; its namespace still matters. |
| `consolidated_customer_id`, `customer_name` | Provide shared customer identity and readable context. |
| `status`, `assignee` | Describe the current recorded work state and ownership. |
| `quantity`, `item_name`, `unit_price` | Describe what was ordered. |
| `days_until_due` | Supplies a stored numeric value later used by a chart; this pipeline does not recompute it. |

Output mapping is a consumer-facing decision. If you omit `assignee` here, the upstream preview may still show it, but the downstream model cannot obtain it from this output. If you rename `order_id` later, its existing object-property mapping may need a coordinated update.

## Definition, preview and stored result are separate

An output definition says where a result should go and which fields it includes. A preview gives development feedback on configured logic. A built dataset contains a result produced by an execution.

For a software analogy, declaring a file path and writing a function that returns records does not mean the file has been written. The configured pipeline must still run successfully. The older training record showed the newly defined output as not yet deployed at this point; that is a valid intermediate state.

## Why this boundary is useful beyond the tutorial

It lets the implementation change behind a stable output contract. You could improve source cleaning without teaching every downstream application how Bureau formats its dates. Conversely, changing the output's meaning can affect several consumers, even when the edit looks small in the graph.

**Inspection exercise:** before deployment, check the output's upstream node, name and all eleven mapped fields. Explain the consequence of attaching it to the wrong branch.

**Takeaway:** a reusable output is a promise to consumers. Creating its definition is necessary, but producing valid data is a separate step.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1791231) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
