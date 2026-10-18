# 08 — Connecting an External System with Foundry

*Module: Data Connection: Getting Data Into Foundry · Inspected September 23, 2026 · Notes: Ready for Review · Practice: Not Started*

## Both sides must be able to talk

By default, connections run **in Foundry (Foundry worker)**, and networking is controlled by **network egress policies**. The course separates two network cases:

| Network | Typical systems | Policy type | Who initiates |
|---|---|---|---|
| **Public** (reachable from the Internet) | Cloud storage, SaaS REST APIs | **Direct connection** egress policy | Foundry connects directly; the system must accept inbound traffic from Foundry |
| **Private** (inside your organization) | On-prem databases, ERPs, internal APIs | **Agent proxy** egress policy + a **Data Connection agent** | The agent runs inside your network and sends **encrypted, one-way outbound** requests to Foundry; the system only needs to accept traffic from the agent |

A **Data Connection agent** is a downloadable program on a machine inside your network, managed from Data Connection.

## Agent worker (discouraged)

An older alternative, **agent worker**, runs the connection on the agent machine itself, with networking managed there and no Foundry egress policies. The course **discourages** it: you have to keep the right software on that machine, and you're limited by its hardware.

This course uses **direct connection** only, since all three training sources are public.

## Engineering comparison

An agent proxy works like a reverse tunnel: the private side dials out, so you never open inbound firewall ports to the Internet.

**Remember:** public → direct connection; private/on-prem → agent + agent proxy policy; agent worker = legacy, avoid.

**Review question:** an on-prem SQL Server can't accept inbound Internet traffic. How does Foundry reach it? Through a Data Connection agent inside the network with an agent proxy egress policy.

---
[Official lesson](https://learn.palantir.com/deep-dive-data-connection/1855248) · [Course index](README.md) · [Review guide](REVIEW.md)

Course instructions are paraphrased. Engineering comparisons and review questions are teaching additions. No live Foundry connection was made for these notes. Next: 09 — Introduction.
