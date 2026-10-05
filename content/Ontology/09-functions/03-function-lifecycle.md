# 03 — Function lifecycle

*Sources: [Function versioning](https://www.palantir.com/docs/foundry/functions/functions-versioning/) · [Version range dependencies](https://www.palantir.com/docs/foundry/functions/version-range-dependencies-for-functions/) · [Permissions](https://www.palantir.com/docs/foundry/functions/permissions/) · [Manage published functions](https://www.palantir.com/docs/foundry/functions/manage-functions/) · [Function metrics](https://www.palantir.com/docs/foundry/functions/function-metrics/) · [Monitoring](https://www.palantir.com/docs/foundry/functions/monitoring/) · [Optimize performance](https://www.palantir.com/docs/foundry/functions/optimize-performance/) · checked October 2, 2026 · Ready for Review*

A release diary for `deliveryRisk`, from first draft to a breaking change. Each entry is one lifecycle step, and the doc rule behind it.

## 0.1.0 — First publish

Daniel publishes the sketch from [01](01-functions-on-objects.md#a-first-read-only-function) as `0.1.0`.

**[Docs]** Versions follow **Semantic Versioning**, are chosen by the publisher, and are **immutable**. `0.y.z` is "initial development … should not be considered stable". During `0.y.z`, convention puts breaking changes in minor releases.

**[Docs]** Some consequences of staying on `0.y.z`:

- Actions can't **auto-upgrade** on these versions ([08-04](../08-actions/04-function-backed-actions.md#version-pinning-and-why-auto-upgrade-is-a-security-decision)).
- Compatibility warnings don't require a major bump.

## Who can run it

The first Workshop test fails for Ama with `ReadFunctionsPermissionDenied`.

**[Docs]** Running a function needs the **Viewer** role on the **repository** it was published from. The docs recommend keeping function repositories in the same project as the apps that use them.

`FunctionRegistry:ReadOntologyFunctionPermissionDenied` is a different problem: the function isn't registered in **Developer Console**. Folder permissions won't fix that one.

**[Docs] Function-backed actions are the exception.** End users don't need to be able to read the function. Only the admin who configures the action does. After that, action-level permissions apply.

**[Docs] The repository has its own permissions,** separate from yours. Generating code needs the types imported into the project. **Live preview** also needs the **backing datasources** imported (a restricted view if the type has row-level security). Imports are **project-wide**, so changing them in one repository affects the others in the same project.

**[Docs] Results depend on who runs it.** Object loads use the **end user's** permissions, so "different users executing the same function may receive different results". As with actions ([08-06 Q3](../08-actions/06-action-permissions.md#q3--does-a-restricted-view-protect-the-data-the-action-writes)), row and column controls apply to **reads only**, not to the function's output.

**[Explanation]** If `refundPolicyCheck` returns a summary string that includes card details, nothing re-protects that string. Keep restricted values out of function outputs, or mark them.

## 0.2.0 — Make it fast

Ama's table has 400 rows. The column takes 40 seconds and sometimes fails.

**[Docs]** The limits:

| Limit | Value |
|---|---|
| Elapsed time | **60 s** by default (configurable); 280 s in live preview; up to 4 h through Automate |
| TSv1 CPU time | 30 s, not configurable |
| Memory | TSv1 128 MB; serverless TSv2 and Python 1,024 MiB by default (512–5,120); deployed Python 2 GB |
| TSv1 `.all()` | 100,000 objects; 3 Search Arounds |

**[Docs]** The optimize-performance page explains why the sketch is slow:

- **Input types.** It ranks them: an object **set** is best, an object array is acceptable, and a **single object** is the anti-pattern. Every execution also has a **fixed overhead of 4 compute-seconds**.
- **Links.** It calls looping over objects and loading links on each iteration "the most common source of performance issues" ([06-03](../06-links/03-traversal-and-search-arounds.md#4-the-anti-pattern-loops)).
- **Promise.all.** Speeds things up "but does not reduce resource consumption or cost". Only bulk operations reduce both.
- **Performance tab.** A waterfall shows *Execute function* against *Load objects from arguments / links*.

So `0.2.0` takes the table's shipments as a set, loads the carriers and orders with **one** `pivotTo("carrier")` and **one** `pivotTo("order")`, and computes every score in memory. Behaviour is unchanged; it is a performance fix.

## 1.0.0 — Stable

After two weeks without surprises, Daniel releases `1.0.0`.

**[Docs]** In the repository settings for protected branches, he can **restrict stable tags**, so that a stable release requires review. Why that matters: consumers on a **version range** (`>=1.0.0 <2.0.0`) pick up stable releases automatically.

**[Docs]** How ranges resolve:

- Workshop, Actions and Automate can pin a version or depend on a **caret-style range** (minor and patch only).
- At runtime, "the maximum satisfying version will be chosen on an eventual basis". That can take a few minutes.
- **Deployed** functions resolve to the currently deployed version. If it doesn't satisfy the range, you get an **error**.

**[Docs]** The guidance: if an app "cannot tolerate any breaks", **pin**. If a range picks up a break, pin to the last good version and contact the publisher.

**Kestrel's policy:**

- Ama's Workshop column: **range**.
- *Approve refund*: **pinned**, for the auto-upgrade permission reason in [08-04](../08-actions/04-function-backed-actions.md#version-pinning-and-why-auto-upgrade-is-a-security-decision).

## 1.1.0 — An optional input

The new input is `includeWeather?: boolean`.

**[Docs]** Adding an *optional* input is backward compatible: a minor release. **[Docs]** The built-in check also warns about:

- dropping a function;
- dropping any input (even an optional one);
- **reordering** inputs;
- adding a required input;
- bad input or output type changes, such as **widening** integer to float (which also warns) or string to *optional* string.

**[Docs]** There is a caveat for **custom types**: for now, adding or removing *any* field, optional fields included, may trigger a warning.

**[Docs]** "It is not safe to release a minor or patch version based solely on a successful outcome from these checks." The checks don't see behaviour changes.

## 1.1.1 — The accident

Daniel accidentally adds a **required** `region` input and ships it as a patch. Ama's column breaks within minutes, because it is on a range.

**[Docs]** The fix is to restore compatibility in a **new minor version**: remove the required input and release `1.2.0`. Don't try to rewrite `1.1.1`, because versions are immutable. Consumers should pin to `1.1.0` while they wait.

## Watching it

**[Docs]** Function metrics are on the function's page in Ontology Manager, or in Workflow Lineage:

- 30 days of success and failure counts and **P95** duration;
- 7 days of run history;
- failure categories: runtime, resource limit, **user-facing**, invalid inputs or outputs, data loading not allowed, *undeclared object types edited*, structured, deployment, and *consistent snapshot*.

Monitoring rules cover P95 duration, all failures, **user-facing only**, and **non-user-facing only**. Workshop, OSDK apps and Workflow Lineage can be dynamic scopes.

**[Explanation]** Alert on **non-user-facing** failures. Those are bugs and infrastructure problems. User-facing errors such as "refund exceeds policy" are the function doing its job.

## 2.0.0 — The breaking change

The output changes from a `Double` to `{ score, reason }`, so the agent can explain its proposals.

**[Docs]** A changed output type is breaking, so it needs a major version. Range consumers on `^1` stay on `1.x` until each one opts in.

**[Docs]** Two more settings worth knowing:

- Functions in function-backed actions read from **one consistent snapshot** by default (a configuration option).
- **Configuration overrides**, such as a raised timeout, are per version. New versions inherit them from the previous stable version only on recent repository templates. Check the timeout after each release.

---
[Module index](README.md) · Previous: [02 — Query functions and Ontology edits](02-query-functions-and-ontology-edits.md) · Next: [04 — Functions on models and LLMs](04-functions-on-models-and-llms.md)
