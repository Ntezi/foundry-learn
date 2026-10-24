# 04 — Capacity and rate limits

*Sources: [LLM capacity management](https://www.palantir.com/docs/foundry/aip/llm-capacity-management/) · [LLM enrollment rate limits](https://www.palantir.com/docs/foundry/aip/llm-enrollment-rate-limits/) · [Bring your own model to AIP](https://www.palantir.com/docs/foundry/aip/bring-your-own-model/) · checked October 8, 2026 · Ready for Review*

When a Logic function fails with a rate-limit error at 9 a.m. every Monday, the cause is almost always in this note. It explains the levels of limits, who each request counts against, and the tools an administrator has, then designs Kestrel's setup.

## Why limits exist

**[Docs]** LLM capacity is limited "at the industry level": every provider caps capacity per account in **tokens per minute (TPM)** and **requests per minute (RPM)**. Palantir's compliance requirements make it tighter: **zero data retention** and **georestriction** rule out some provider offerings (for example batch APIs, which store data for up to 24 hours), and georestricted capacity is smaller. The docs name georestriction as "the strongest cause of capacity issues".

## Three levels of limit

**[Docs]**

| Level | Set by | Unit | Notes |
|---|---|---|---|
| **Enrollment** | Palantir, by **tier** | TPM and RPM **per model** | Each model's capacity is independent. Limits from all enabled **backends** for a model add up. Default tier is **medium**; large and XL on request. Shown in Resource Management's *AIP rate limits* tab |
| **Project** | Enrollment administrators | % of enrollment TPM/RPM, per model, for all resources in the project combined | Default project limit is 70% ([02-02](../02-bring-your-own-model/02-rest-and-compute-module-backed-models.md#rate-limits-in-numbers)); create more limits, assign projects, add **model overrides** |
| **User** | Palantir defaults; administrators may override | TPM/RPM per user, per model | For **user-attributed** traffic only |

**[Docs]** The rate-limits page's table lists, per model and backend, a per-user limit and the **Small, Medium, Large and XLarge** tiers, for commercial and US government environments; georestricted enrollments may get less in any tier. **[Explanation]** The capacity page talks of medium, large and XL tiers only; the table also has a small tier ([RQ-06](../SOURCES.md#open-research-questions)). Read numbers from the live table; this note doesn't copy them.

## Which limit does my request count against?

**[Docs]** Every request is **either** project-attributed **or** user-attributed, never both:

| Attribution | Examples from the docs | Limits that apply |
|---|---|---|
| **Project** | Pipeline Builder pipelines, AIP Logic, Automate, Chatbot Studio, Workshop apps | Enrollment + that project's limit (not per-user) |
| **User** | AI FDE, AIP Assist, AIP Analyst, Pipeline Builder *Explain* and *Generate*, IDE integrations that use Foundry-provided models | Enrollment + the user's limit |

## Batch vs interactive

**[Docs]** AIP prioritises **interactive** requests (Workshop, Chatbot Studio, Logic and Pipeline Builder previews) over **batch** ones (transforms, Pipeline Builder builds, Automate running Logic). At enrollment and project level, **20%** of capacity is always kept for interactive queries: batch work can use at most 80% in any minute. Resource Management shows this as a second "batch limit" line.

## The administrator's tools

**[Docs] In Resource Management → AIP usage & limits:**

- **View usage**: tokens and requests per minute, per model, per project or resource, two weeks of data down to the minute, with limit lines. The page notes it isn't built for cost; use the **Analysis** page (*Filter by source: All LLMs*, *Group by source*) for daily LLM cost by model.
- **Project limits** with **model overrides**: for example set the base to **0%** and allow only two models at 30% and 25%, making an allowlist of models for those projects; or set a model to 0% to forbid it.
- **User limits**: overrides as a **percentage** of the enrollment limit or as **absolute** TPM/RPM, at three levels (all users, per model, per user group). An override **replaces** the default. If a user is in several overridden groups, the **highest** limit wins. Limits below **50,000 TPM or 10 RPM** may break AIP features, and 0 isn't allowed.
- **Reserved capacity**: reserve up to **50%** of a model's TPM/RPM and share it out to projects; they use it first, then fall back to shared capacity. No extra charge beyond tokens. The page says over 99% of LLM request failures in the past year were enrollment and project rate limits, which reservation addresses.

**[Docs] When you hit limits:** cap the project that saturates the enrollment; check interactive work isn't being starved by pipelines (limit them, or move them to their own project); spread builds across the day and large ones to weekends; move a workflow to a model you're not using much; ask for a bigger tier.

**[Docs]** Why one project's percentage isn't shared with the others: most projects never call LLMs, so many can share "100%"; when several peak in the same minute, requests retry.

## Kestrel's design

**[Example]** Kestrel set this up after a Monday-morning incident ([09-02](../09-cost-and-observability/02-observability.md#kestrels-incident-drill)). One busy model, call it model M, serves Delivery Desk (interactive), the invoice extraction transform (batch) and the Logic wording sandbox. Enrollment limit for M on the medium tier: say 2,000,000 TPM.

| Setting | Value | Reason |
|---|---|---|
| Project limit "Production" | `Delivery Desk [Workflow]`, `Commerce [Ontology]`: 100% | Production must be able to use everything when it needs to |
| Project limit "Batch" | The invoice-extraction project: 40% | Monthly invoice runs mustn't crowd out other pipelines |
| Project limit "Sandbox" | Experiment projects: 15%, base 0% with overrides for two cheap models | Experiments can't touch M at all |
| Reserved capacity | 300,000 TPM of M, all to `Delivery Desk [Workflow]` | Ama's team is never throttled at 9 a.m. |
| User limits | Defaults; group override for Daniel's team on the AI FDE model | AI FDE is user-attributed and bursty ([07-05](../07-end-user-apps/05-ai-fde.md#best-practices-and-the-infrastructure-warning)) |

**[Explanation]** The batch line already protects interactive work at 80%, but only **within** a project and at enrollment level. Putting batch work in its own project with its own percentage, and reserving capacity for the one interactive app that matters, is what makes Monday morning predictable.

**[Docs]** Registered (bring-your-own) models use the same system: their enrollment and user limits are set at registration ([02-02](../02-bring-your-own-model/02-rest-and-compute-module-backed-models.md)).

---
[Module index](README.md) · Previous: [03 — LLM data access with markings](03-llm-data-access-with-markings.md) · Next module: [09 — Cost and observability](../09-cost-and-observability/README.md)
