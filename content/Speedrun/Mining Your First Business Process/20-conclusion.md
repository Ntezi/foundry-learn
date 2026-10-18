# 20 — Conclusion

*Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Reconstruct the whole workflow

The course begins with a business question: why are insurance claims taking too long? The supplied data contains business entities and state-change logs. The Ontology gives those entities and relationships a common application-facing representation. Machinery uses the histories to mine a process. Workshop provides filters, metrics and drill-down. Automate supplies a notification for a selected suspicious condition.

The reusable lesson is the chain from data to a decision someone can act on. Each link needs its own contract. Claim identity connects events to the right entity; timestamps support ordering and duration; object-set bindings preserve the selected population; metric definitions make counts interpretable; automation predicates define exactly what is being detected.

## Transfer it to software you already know

Imagine investigating support-ticket delays. A Ticket object might hold current status, while events record entry into queued, assigned and resolved states. You could inspect repeated assignment loops, compare duration distributions and narrow the population by product. A notification might identify a ticket entering a status without a required assignment.

Before building that extension, ask whether your logs really capture state entries, whether timestamps have consistent meaning, and whether mutable properties should be interpreted at event time. An ordinary request log may omit important business transitions. A process graph cannot reconstruct evidence that was never recorded.

This example is a transfer exercise, not a second workflow built by the course. Machinery also supports process authoring and extension, but reading this mining course does not establish that transitions, Actions or every integration have been configured. The source's promise of a future authoring course is not a verified current release date.

## Completion has several meanings

All 20 required lesson pages were read in this study continuation. Learn shows 20/20 and offers a course certificate. All 20 lesson notes are prepared. The learner's understanding review and hands-on implementation remain separate: no package installation, graph mining run, Workshop publication or notification was performed during note preparation. Optional feedback was left unopened and no certification exam was taken.

Use the second-half review to explain the workflow without relying on button names. Then use the practice checklist to demonstrate the actual behavior in the training environment. A course certificate records course-platform completion; it does not substitute for that evidence.

**Final recall challenge:** explain how a non-high-risk claim appearing in investigation travels from raw events to an investigator's attention. Include what is historical, what is current, what the filter means, and what the notification does not prove. If you can also identify where missing events, changed risk flags or incorrect variable bindings would mislead you, you have understood the most transferable parts of this speedrun.

---
[Official lesson](https://learn.palantir.com/speedrun-mining-your-first-business-process/2103034) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md) · [Later practice](PRACTICE.md)

Course steps are paraphrased. Synthetic examples and engineering checks are teaching additions; no live Foundry implementation is claimed.
