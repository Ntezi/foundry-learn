# 32 — Input Connection Details

*Module: Data Connection: REST API · Inspected September 23, 2026 · Notes: Ready for Review · Practice: Not Started*

## What you configure

- **Domain base URL** of the API and **port 443** (standard HTTPS).
- **Authentication: None** at the source level. Here the code handles authentication by sending a token.
- An **additional secret** holding the token, so it's stored on the source and not hard-coded.

The lesson supplies sandbox credentials for this step. They are deliberately not copied into these notes; take them from the official lesson when you practice.

## Why store the token as a secret

The transform reads it at run time (see [Configure Code](38-rest-configure-code.md)). Rotating the token then means editing the source, not the code, and the token never shows up in commits.

---
[Official lesson](https://learn.palantir.com/deep-dive-data-connection/1864452) · [Course index](README.md) · [Review guide](REVIEW.md)

Course instructions are paraphrased. Engineering comparisons and review questions are teaching additions. No live Foundry connection was made for these notes. Next: 33 — Set-up a Direct connection Egress Policy.
