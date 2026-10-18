# 18 — Security & Governance Layer

*Module: Section 5: Security, Governance & Deployment · Inspected September 23, 2026 · Notes: Ready for Review*

## Woven in, not bolted on

Everything (the Ontology, the data and logic feeding it, the automations and products on top) runs inside one security and governance layer that covers every data access and every action, by humans or AI.

## Beyond role-based access control

Most platforms stop at "user X can access resource Y". The course lists three further controls:

- **Purpose-based controls:** restrict access by *why*, not just who. A compliance analyst and a marketing analyst may both reach customer records but for different permitted uses and with different visible fields.
- **Data markings and classifications:** sensitivity labels that **travel with the data** through every transformation, dashboard and automation, including when it is passed to an LLM.
- **Active controls:** enforce policy dynamically based on context, not only static grants.

## Audit as the basis of trust

With agents acting beside humans, audit trails matter more. Foundry logs both human and AI activity, not just for compliance but as the foundation for progressive automation: you can't safely widen AI autonomy without seeing what it did and why.

**Remember:** purpose-based + markings that propagate + active controls + audit of humans and AI.

**Review question:** data is marked restricted at ingestion and later appears in an app and an LLM prompt. What happens to the marking? It travels with the data, so the restriction still applies.


**Go deeper in the Ontology area:** [12 — Security and governance](../../Ontology/12-security-and-governance/README.md)

---
[Official lesson](https://learn.palantir.com/introduction-to-foundry-aip-for-enterprise-organizations/1999133) · [Course index](README.md) · [Review guide](REVIEW.md)

Course content is paraphrased. Engineering comparisons and review questions are teaching additions. Next: 19 — Branching: Safe Change Management for Human and AI Builders.
