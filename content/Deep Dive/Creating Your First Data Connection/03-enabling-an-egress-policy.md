# 03 — Enabling an Egress Policy

*Module: Permissions & Help · Inspected September 23, 2026 · Notes: Ready for Review · Practice: Not Started*

## Why egress needs a policy

Foundry doesn't let outbound network traffic reach arbitrary addresses. A **network egress policy** allows specific destinations (host and port). Creating one requires the **Information Security Officer** role on the enrollment. If a policy already exists, you can import it without that role.

## Check your access

In **Control Panel → All settings → Networking → Network egress**. If the setting is greyed out, you lack permission. Ask an administrator to allow the course's training endpoints (S3 on 443, Postgres on 5432, the API on 443) and to let you import the policies. The exact hostnames are in the lesson.

## Endpoint note

The course warns that its training URLs and credentials are valid at publication but not guaranteed indefinitely.

**Remember:** egress policy = an allow-list for outbound connections, owned by security admins.

**Review question:** you can't create a policy, but one for your source already exists. What can you do? Import the existing policy.

---
[Official lesson](https://learn.palantir.com/deep-dive-data-connection/1973917) · [Course index](README.md) · [Review guide](REVIEW.md)

Course instructions are paraphrased. Engineering comparisons and review questions are teaching additions. No live Foundry connection was made for these notes. Next: 04 — Introduction.
