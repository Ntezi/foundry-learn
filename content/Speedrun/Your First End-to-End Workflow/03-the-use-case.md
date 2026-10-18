# 03 — The use case: solve the fulfillment gap before the systems are merged

Office Goods Corp has acquired Bureau SAS. Both companies still have their own transactional systems, and the IT consolidation is about a year away. Meanwhile, people must fulfill orders across the combined business. They are reconciling spreadsheets because their work already spans both companies even though the systems do not.

The immediate need is one place to identify orders that need attention and assign an owner. This explains the entire technical design: two order inputs, a customer reference, a unified Order model and an operational inbox.

## Translate the business problem into engineering questions

**What does one row represent?** This is called the data's *grain*. The course treats each identified record as an Order. Before applying the pattern elsewhere, establish whether a row means a whole order, an order line or an event in an order's history. Counting lines and calling them orders produces misleading totals even if every transform runs successfully.

**How is a customer identified?** Office Goods and Bureau have different customer IDs. Their IDs cannot be compared as if they came from one global namespace. The consolidated customer file supplies the correspondence.

**What decision will a worker make?** A useful first application helps a worker find a relevant order, inspect enough context, and assign responsibility. A chart summarizing all orders supports that process, but a chart alone does not complete it.

**Where does a change take effect?** Later lessons configure an assignment in Foundry's object layer. The speedrun does not build an integration that sends that change back to either company's transactional system. That distinction determines what you can promise the business.

## A small illustrative scenario

A worker receives two exports containing orders for the same customer. In Office Goods the customer is `OG-17`; in Bureau it is `BS-82`. Without a shared mapping, a report may show two apparently unrelated customers. After mapping both IDs to a consolidated customer, the inbox can present the orders with consistent customer context.

The orders themselves remain separate. Consolidating customer identity is not a reason to merge two distinct orders into one. You are combining a work population, not erasing business events.

## Why this can be useful before a migration finishes

As a software engineer, you can view the pipeline as an integration layer around existing systems. It absorbs source-specific differences so each screen does not need its own Office Goods adapter and Bureau adapter. The business receives a shared workflow while the original systems continue operating.

However, the tutorial uses static files. A production version would need an explicit freshness requirement, an owner for customer matching, and a decision about whether assignments live only in Foundry or are synchronized elsewhere. These are design extensions, not completed tutorial functionality.

**The lesson to retain:** model the business process and the meaning of its data before choosing widgets. Ask “What can the worker do more reliably after this exists?”

**Reason it through:** if an unmatched customer causes an order to disappear from the inbox, have we simplified the data or hidden work? We have hidden work. That consequence will help you understand the join choices in lessons 15–16.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1790983) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
