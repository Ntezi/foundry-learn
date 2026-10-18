# 35 — Summary

*Module: Automate your Agent · Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## The complete invocation design

The course now has two ways to invoke the same assessment effect: a manual run for selected existing candidates and an object-addition trigger for new candidates. The effect passes an identified patient and a fixed trial into a published Logic function, whose model output feeds an existing Action.

The application exposes the resulting decision and explanation to people. For uncertain cases, a person can open the review interface and examine the underlying evidence. This connects automated interpretation to an operational screen, rather than leaving results isolated in a model experiment.

## Keep the milestones separate

| Milestone | What it demonstrates when observed |
|---|---|
| Published function | A specific callable configuration exists |
| Saved automation | Condition and effect configuration exist |
| Manual effect execution | Selected existing objects were processed through that path |
| Addition event with effect result | The automatic path processed the correlated object |
| Refreshed application fields | The intended result is visible on the target |
| Human review | A person examined or resolved a case, if actually performed |

A later milestone does not justify inventing evidence for another one. For example, a changed field may have been produced manually rather than by the automatic trigger. Trace the path you claim.

## Correct the timing claim

The lesson contrasts lengthy human work with seconds of AI execution. Treat that as the course's motivation, not a measured improvement in your environment. A meaningful comparison would include queue delay, model execution, failures, manual review effort and corrections, not only the fastest successful model call.

The practical objective is a reliable process with useful human intervention, not merely a short runtime. An automated wrong decision can create more work than a slower manual assessment.

## What remains a design responsibility

The training configuration does not establish a complete policy for duplicates, retries, stale input or human overrides. It does not create a staffed review queue or a separate enrollment operation. Those gaps are useful topics for the next lesson's extensions.

Use an explicit baseline when extending the system. Changing the monitored set or trial binding changes which work is performed, while changing the model changes how the assessment is produced. Both kinds of changes should have corresponding tests and evidence.

No automation was created or executed during this notes pass. The course's second-person summary describes the intended hands-on outcome; our progress record remains Not Started for practice.

**Remember:** operational success is a connected chain from event to correct visible state, with a defined path for unresolved work. An installed agent and a successful model response are only parts of that chain.

**Review question:** which evidence would convince a teammate that automatic processing works? One identifiable new object, its addition event, the correct effect inputs/version, successful completion and corresponding stored fields—plus the limits of that single-case observation.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-agentic-aip-workflow/2282386) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Instructions are paraphrased; engineering comparisons, examples and proposed checks are teaching additions. No Foundry execution is claimed. Next: review the explanation and question, then follow [the later practice plan](PRACTICE.md) after understanding review.
