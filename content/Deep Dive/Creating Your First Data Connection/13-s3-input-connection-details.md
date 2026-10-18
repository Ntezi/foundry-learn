# 13 — Input Connection Details

*Module: Data Connection: S3 · Inspected September 23, 2026 · Notes: Ready for Review · Practice: Not Started*

## What you configure

- **URL** of the bucket (`s3://…`) and its **region**.
- **Credentials:** the course uses the **access key and secret** method.

The lesson supplies sandbox credentials for this step. They are deliberately not copied into these notes; take them from the official lesson when you practice.

## Good practice in real deployments

Credentials are stored on the source, not in downstream code. Anyone with edit rights on the source's Project can change them, which is another reason to place sources carefully.

---
[Official lesson](https://learn.palantir.com/deep-dive-data-connection/1864432) · [Course index](README.md) · [Review guide](REVIEW.md)

Course instructions are paraphrased. Engineering comparisons and review questions are teaching additions. No live Foundry connection was made for these notes. Next: 14 — Set-up a Direct connection Egress Policy.
