# 05 — Data and Tech Elements

*Module: Use Case Prioritization Elements · Inspected September 23, 2026 · Notes: Ready for Review*

## A best guess, not full technical scoping

At this stage, only assess whether the use case is **uncharted territory** or builds on **existing, already-assessed data and technology**, and flag early dependencies. Things to consider:

- **Data accuracy**, and whether it can be validated
- Whether **data governance** exists or has to be set up
- Whether the **data sources exist** and connect to the target systems
- **Regulatory** requirements
- **Solutions** the use case will use or connect to
- **Other deliverables** feeding into or out of this project
- **Setups or subscriptions** that take time (VMs are a common example). These may reveal outside processes, such as procurement or IT, that must start first

> **Fit for Foundry:** **"Data problems are Foundry problems"**, but they shouldn't stop the use case. They often *expand* it, for example by adding data-quality workflows or in-platform governance. Early on, work around them, for example with **direct data extracts**, so work streams run **in parallel** rather than strictly in order (connect data → build → test with users).

**Remember:** don't let imperfect data block a use case. Work around it, and fix the data within the platform as part of the work.

**Review question:** source data quality is poor. Does the course say to postpone the use case? No. Flag it, work around it early, and consider data-quality workflows as part of the scope.

---
[Official lesson](https://learn.palantir.com/scoping-use-cases-for-foundry-aip/2103817) · [Course index](README.md) · [Review guide](REVIEW.md)

Course content is paraphrased. Tables, summaries and review questions are teaching additions. Next: 06 — Wrap Up and Next Steps.
