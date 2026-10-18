# 24 — Configure Certificates

*Module: Data Connection: Relational Database · Inspected September 23, 2026 · Notes: Ready for Review · Practice: Not Started*

## Why certificates here but not for S3

**SSL/TLS certificates** encrypt traffic between Foundry (the client) and PostgreSQL (the server), so data can't be read or changed in transit. They also **verify the server's identity**, which prevents man-in-the-middle attacks. S3 didn't need this step because AWS secures S3 connections with its own built-in mechanisms.

## Steps (paraphrased)

1. In Connection details → **Certificates** → Create new → **Server certificate bundle**.
2. Give it a bundle name and the alias `server.pem`, and paste the certificate file attached to the lesson.
3. Create the bundle, add it to the source, and set **SSL mode = require**.
4. **Save and continue**.

**Remember:** certificates = encryption in transit + server identity.

**Review question:** what attack does server-certificate verification defend against? Man-in-the-middle.

---
[Official lesson](https://learn.palantir.com/deep-dive-data-connection/1864444) · [Course index](README.md) · [Review guide](REVIEW.md)

Course instructions are paraphrased. Engineering comparisons and review questions are teaching additions. No live Foundry connection was made for these notes. Next: 25 — Select an Output Folder.
