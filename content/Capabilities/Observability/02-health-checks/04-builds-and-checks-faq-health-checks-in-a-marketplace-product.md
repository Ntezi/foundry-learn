# 04 — Builds and checks FAQ; health checks in a Marketplace product

*Sources: [Builds and checks FAQ](https://www.palantir.com/docs/foundry/health-checks/builds-checks-faq/) · [Add health checks to a Marketplace product](https://www.palantir.com/docs/foundry/health-checks/marketplace-data-health/) · checked October 23, 2026 · Ready for Review*

Two pages at the edges of the module. The FAQ is mostly about **builds**, not checks: ten questions a pipeline developer asks when a build fails, read here as a triage card, because an operator who gets a failed schedule-status alert ends up on exactly these questions. The Marketplace page says which checks travel with a product and which must be re-created.

## The FAQ, as a triage card

**[Docs]** The ten questions and the page's answers, compressed:

| Symptom | What the page says to do |
|---|---|
| **A build fails, generally** | Three questions: has it ever succeeded (if so, roll back the logic change; *Logs* in the Builds application's Datasets pane shows history); has the **data** changed (scale, which costs resources; **schema**, which breaks logic that depends on it; *Compare* in the Datasets pane diffs transactions); has an **upstream** dataset's logic changed |
| **A long or confusing error** | Look for the key phrases, usually near the bottom: *What went wrong:*, *Caused by:*, *Py4JJavaError*, *UserCodeError*. An **ErrorInstanceID** with no other context goes to Palantir Support, but check first that it isn't your own logic error. Support wants the full message, the steps already taken, and "the exact time (date, time, timezone)" |
| **"Waiting for resources"** | Platform contention: builds queue until others free resources. Run at quieter times; for schedules, "avoid running jobs at common times such as on the hour or at midnight" |
| **Builds getting slower** | One of three: changed transform logic, bigger input data, more load on the cluster at build time. Check the logic diff and the input scale |
| **Skewed joins** | A **salted join**: add a random column `FLOOR(RAND() * N)` to the big side, `EXPLODE` the small side N times, join on key *and* salt; tune N by powers of two from the key histogram; mind the off-by-one between `CEIL` (1..N) and `FLOOR` (0..N-1). Salting "does not necessarily make your build faster; it simply makes it more likely to succeed" |
| **"shrinkwrap"** | `transforms-shrinkwrap.yml` (a hidden file) maps each referenced path to a dataset ID and its current path; errors come from deletions, renames, moves, or a merge conflict on the file while you iterated. Restore trashed datasets, resolve the file, or delete it to have it regenerated on the next checks |
| **PERMISSION_DENIED** | The triggering user "must be an Editor on the output dataset since running a build is effectively editing the output file". Data Lineage's *Permissions* filter with *Resource Permissions* colours the nodes |
| **"Waiting for input dependencies to be computed"** | The schedule was cancelled because an upstream dataset failed: open the build report, find "the first dataset in this build that failed", fix that |
| **CI fails: repository does not own dataset** | Two repositories claim one output. The owner is in *Details > Job spec > sourceProvenance*. Transfer (delete the job spec, re-run CI from the new repository, remove the source file from the old) or keep (delete the source file in the new one) |
| **Checks failing on timeout** | Re-run; upgrade the repository; add `--refresh-dependencies` to the hidden `ci.yml` (the page prints the flag with a single long dash, which reads as a typesetting artefact; the Gradle flag takes two hyphens) |

**[Explanation]** Two rows belong to this area's story and the rest to the Data integration docs. *Waiting for input dependencies* is the FAQ's name for the cancelled build in [01](01-health-checks-and-the-types-of-checks.md#job-build-schedule): the job status check on the downstream dataset never evaluates, the schedule status check fires, and the fix is upstream. And *PERMISSION_DENIED* is [Security 01-02](../../Security/01-organizations-projects-users-and-groups/02-projects-roles-and-project-templates.md#6-what-exactly-does-a-role-let-someone-do)'s role model meeting a build: Editor on the output, because a build writes. Note also that the last question's "checks" are Code Repositories **CI checks**, not health checks; the FAQ's title covers both meanings.

## Health checks in a Marketplace product

**[Docs]** Foundry DevOps can package Data Health checks into Marketplace products ([DevTools 08-01](../../DevTools/08-product-delivery/01-devops-products.md)). Supported: health checks on **datasets**; configuration validations for all checks **except** those involving a secondary dataset (the *approximate column relation* check's other dataset), those with path configuration, and those configured to create a Foundry Issue. **Monitoring views and check groups are added automatically as inputs**, so packaged checks "will be added to the provided input group during installation". **Data expectation** checks "are automatically added if a dataset transformation is packaged which contains a data expectation in the transformation logic", and the packager can neither add nor remove them, "as they are part of the transforms logic".

**[Docs]** To add checks: create the product, add a dataset transformation or a Pipeline Builder pipeline, then package the checks on its output datasets "using the Suggestions button".

**[Explanation]** Read against [DevTools 09-03](../../DevTools/09-kestrel-case/03-delivery-desk-product-release.md): a product carries the pipeline's expectations whether you want them or not, carries ordinary checks only if you pick them from the suggestions, drops the Issue-filing setting and any check that refers to another dataset, and expects the installer to supply a monitoring view as an input. So an installed product is monitored only if the installing enrollment already has a view to put the checks in.

## For Kestrel

**[Example]** *Adopted* in Phase 6 ([04](../04-kestrel-case/README.md)):

- **The FAQ's first three questions become the first three lines of the schedule-failure SOP** ([01-03](../01-monitoring-views/03-alerts-the-debug-page-and-external-systems.md#for-kestrel)): has it succeeded before, has the data changed, has an upstream changed; then the build report's first failed dataset. The on-call person is whoever holds the ontology team's daily slot in [Ontology 14-06](../../Ontology/14-lifecycle-and-operations/06-monitoring-and-cleanup.md), not necessarily a pipeline developer, so the SOP ends with *hand to Priya's group with the ErrorInstanceID and the exact time* rather than with Spark advice.
- **Schedules avoid the hour and midnight**, per the page, which also spreads Kestrel's runs away from the audit export's and scanner's fixed times ([Security 10-02](../../Security/10-privacy-governance-and-enterprise-security/02-audit-logs.md#for-kestrel), [09-01](../../Security/09-sensitive-data-scanner-and-data-lifetime/01-sensitive-data-scanner-concepts-and-scans.md#for-kestrel)).
- **Delivery Desk v1.1** ([DevTools 09-03](../../DevTools/09-kestrel-case/03-delivery-desk-product-release.md)) packages no transformation: its core types are inputs, so **no health checks travel with it** and none are expected to. The checks above stay with Kestrel's pipelines. If a later product ever packages a pipeline, the rule is: expectations come along by themselves, schema and freshness checks by suggestion, the Issue setting is re-applied after installation, and the installing enrollment supplies a monitoring view as the input group.

---
[Module index](README.md) · Previous: [03 — Checks reference](03-checks-reference.md) · Next module: [03 — Ontology and AIP observability](../03-ontology-and-aip-observability/README.md)
