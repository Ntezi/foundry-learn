# 40 — Considerations and Best Practices

*Module: Wrapping Up · Inspected September 23, 2026 · Notes: Ready for Review · Practice: Not Started*

## Questions to answer before going to production

The course says the tutorial is a foundation, not a production guide, and lists what to settle first:

**Freshness and timing**
- How often must the data update, and when does it change in the source?
- How fresh must it be to be useful?
- Are there windows when you can't read from the source, or when it's under heavy load?

**Retention**
- How long should the data be kept?

**Change semantics**
- Is the source ever internally inconsistent, for example mid-batch?
- How does the data change: only new rows, or updates to existing ones?
- How are deletions handled?

Your answers drive sync type (full vs incremental), **scheduling**, **retention** and **monitoring**. Docs: [scheduling](https://www.palantir.com/docs/foundry/building-pipelines/scheduling-overview/), [scheduling best practices](https://www.palantir.com/docs/foundry/building-pipelines/scheduling-best-practices/), [retention](https://www.palantir.com/docs/foundry/retention/overview/), [monitoring](https://www.palantir.com/docs/foundry/maintaining-pipelines/monitoring-views-intro/).

**Remember:** append-only vs updates vs deletes decides whether a simple append-style sync is safe.

**Review question:** the source updates rows in place and deletes some. Why is an append-only incremental sync risky? It captures new rows but misses changes and deletions.

---
[Official lesson](https://learn.palantir.com/deep-dive-data-connection/1864468) · [Course index](README.md) · [Review guide](REVIEW.md)

Course instructions are paraphrased. Engineering comparisons and review questions are teaching additions. No live Foundry connection was made for these notes. Next: 41 — Conclusion.
