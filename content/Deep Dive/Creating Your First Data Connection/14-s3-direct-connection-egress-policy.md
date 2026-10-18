# 14 — Set-up a Direct connection Egress Policy

*Module: Data Connection: S3 · Inspected September 23, 2026 · Notes: Ready for Review · Practice: Not Started*

## Allow Foundry to reach the bucket

Foundry suggests next steps based on the URL you entered. Then either:

- **Import existing policy**, if another learner already created it (policies are one-time, instance-wide), or
- **Create this policy**: choose **Direct connection** (the bucket is on the public Internet), give it a descriptive name, confirm the pre-filled address, then Save. It is applied to the source automatically. Then **Save and continue**.

**Remember:** a policy allows a *destination*. Reuse it rather than creating duplicates.

**Review question:** why pick Direct connection here? The S3 endpoint is publicly reachable, so no agent is needed.

---
[Official lesson](https://learn.palantir.com/deep-dive-data-connection/1864433) · [Course index](README.md) · [Review guide](REVIEW.md)

Course instructions are paraphrased. Engineering comparisons and review questions are teaching additions. No live Foundry connection was made for these notes. Next: 15 — Select an Output Folder.
