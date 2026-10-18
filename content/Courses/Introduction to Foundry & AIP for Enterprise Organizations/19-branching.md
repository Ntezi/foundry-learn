# 19 — Branching: Safe Change Management for Human and AI Builders

*Module: Section 5: Security, Governance & Deployment · Inspected September 23, 2026 · Notes: Ready for Review*

## Builders are humans and AI

When people and AI agents build on the same platform, changes need review before they reach production. Foundry's **global branching model** provides that.

## Governance, not just version control

The course separates two controls:

- **Runtime controls** govern what users and agents may *do* in production.
- **Branching** governs what *changes* reach production in the first place.

## Engineering comparison

Like Git feature branches plus pull-request review, applied across the platform's resources, not only code, and applied to AI builders too.

**Remember:** runtime controls = what can be done; branching = what gets changed.

**Review question:** an AI agent proposes a change to a production pipeline. Which mechanism keeps it out of production until reviewed? Branching.


**Go deeper in the Ontology area:** [14 — Lifecycle and operations](../../Ontology/14-lifecycle-and-operations/README.md)

---
[Official lesson](https://learn.palantir.com/introduction-to-foundry-aip-for-enterprise-organizations/2493006) · [Course index](README.md) · [Review guide](REVIEW.md)

Course content is paraphrased. Engineering comparisons and review questions are teaching additions. Next: 20 — Apollo - Software Delivery Layer.
