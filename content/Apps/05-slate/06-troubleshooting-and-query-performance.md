# 06 — Troubleshooting and query performance

*Sources: [Debug applications](https://www.palantir.com/docs/foundry/slate/applications-debug-problems/) · [Optimize indexes and schema design](https://www.palantir.com/docs/foundry/slate/references-indexes/) · [Optimize queries in Postgres](https://www.palantir.com/docs/foundry/slate/references-query-perf/) · [Slate FAQ](https://www.palantir.com/docs/foundry/slate/faq/) · [Understand dependencies](https://www.palantir.com/docs/foundry/slate/best-practices-app-functionality/) · checked October 18, 2026 · Ready for Review*

**[Concept]** Slate problems usually show up in the UI (an empty table, a button that does nothing) but start somewhere upstream in the graph. The FAQ's advice is to identify the **category** of failure first, rather than reverse-engineering one app line by line.

## The tools

**[Docs]** Slate has two built-in tools:

- The **health check dialog**. In edit mode, Slate runs every query and function on load and lists errors and warnings in the action bar. Open it to jump to the failing node on the canvas or in the graph. It also shows **OSDK** loading errors on their own tab. Conditional queries whose conditions aren't met in the default state don't run, so they won't show up. The Queries panel highlights failed queries; the Functions panel doesn't highlight failed functions, so test them.
- The **debugger** in the Dependencies tab. Set **breakpoints** on nodes in the graph; execution pauses before the node runs and a drawer shows its current value. Play from any node to run forward to the next breakpoint, or refresh to re-trigger all events without reloading the page.

**[Docs]** Outside Slate: Chrome's **Network** panel shows each query's duration, and a query turning red at **20 seconds** has hit Slate's client-side timeout. A `debugger;` statement in a function or event pauses in Chrome DevTools when you test it. The Dependencies table's **Time in node** finds slow nodes ([03](03-functions-variables-and-handlebars.md#the-dependency-graph)).

## Common failures

| Symptom | Likely cause | What the docs suggest |
|---|---|---|
| Slow page load, intermittent timeouts | Many root queries all running on load | Make data queries **manual** behind a Submit button, or **conditional**; load filters from small pre-aggregated tables |
| A query fast on Test but slow or timing out in the app | The **Postgate** connection pool: **10** connections per user, and a queued query times out after **5 seconds** waiting | Fewer heavy queries on load (heavy: more than 5 seconds on average); push work upstream |
| A query fails as data grows | The **5 MB** result cap | Select fewer columns, filter, aggregate or page ([02](02-reading-and-writing-data.md#queries)) |
| Postgres can't find a column | Mixed-case column names need double quotes | Rename columns to lower-case snake case upstream |
| A function doesn't rerun | It has no inputs that changed; results are cached | Add an input that changes, or update an upstream node ([03](03-functions-variables-and-handlebars.md#slate-functions)) |
| A reset does nothing | The graph is lazy and the value didn't change | Add entropy ([04](04-events-and-interaction.md#reset-to-defaults)) |
| Partial text written on submit | Textarea's 0.5 s debounce | Reorder the form, add a confirmation, or use an input box |
| The app won't save | The **2,000,000-byte** JSON limit | Upload images instead of base64, move large logic to Foundry Functions, minify libraries |
| Widgets rendered too small | Percentage sizes fighting a flex parent | Use flex settings only ([05](05-styles-and-widgets.md#layout)) |
| Printing looks wrong | Slate can't render arbitrary layouts for print | Use a shareable view, or build a separate print view with print CSS |

**[Docs]** The FAQ adds a general rule: queries should take **under 5 seconds** round trip, and data should reach the browser in its **final form**, not need heavy reshaping in JavaScript.

## Query performance (legacy Postgres)

**[Docs]** Both performance pages open by recommending the Ontology (object sets and actions) over Postgres. They still matter for apps built on synced datasets:

- **Push work upstream.** Pre-compute totals, distinct lists and cleanup in a derived dataset rather than on every page load for every user.
- **Target 500 ms or less** per query, which the docs consider achievable for most cases under 10 million records with careful data modelling. Run a query several times before measuring, so the cache is warm.
- Read plans with **`EXPLAIN`** (estimated cost, rows, width) and **`EXPLAIN ANALYZE`** (actual time; multiply by `loops` for the total). Drop `ANALYZE` if the query itself times out.
- In queries: select only the columns you display; prefer `GROUP BY` over `DISTINCT`; join on simple equality; prefer `EXISTS` and joins over correlated subqueries and large `IN()` lists; avoid leading-wildcard `LIKE` and function calls in `WHERE`; use `UNION ALL`, not `UNION`.
- **Indexes**: add them to remove sequential scans, unless the table is small or the query returns more than about 5% of rows. Order multi-column indexes deliberately and prefer selective columns. The page includes SQL to find missing and unused indexes.

**[Explanation]** Kestrel reads the Ontology rather than synced datasets, so in practice the first two sections of this note are the ones its apps need. The Postgres section is for apps you inherit.

---
[Module index](README.md) · Previous: [05 — Styles and widgets](05-styles-and-widgets.md) · Next module: [06 — OSDK React and custom widgets](../06-osdk-react-and-custom-widgets/README.md)
