# 03 — Deployments: live, batch, direct and branching

*Sources: [Set up and use a Modeling Objective live deployment](https://www.palantir.com/docs/foundry/manage-models/set-up-live/) · [Set up a batch deployment](https://www.palantir.com/docs/foundry/manage-models/set-up-batch/) · [Create a direct model deployment](https://www.palantir.com/docs/foundry/manage-models/create-a-model-deployment/) · [Branching direct model deployments](https://www.palantir.com/docs/foundry/manage-models/branching-direct-model-deployments/) · checked October 23, 2026 · Ready for Review*

Three ways to serve a model and one page on branching. Two belong to an objective and follow its releases (a **live** endpoint and a **batch** pipeline); the third belongs to the model itself (a **direct** deployment) and follows its versions. The comparison table on the direct-deployment page is the decision sheet, and the orientation note's two biggest choices come down to it.

## Objective live deployments

**[Docs]** "A live deployment is a persistent, scalable deployment for your releases that you can interact with via an API endpoint." Requirement: "the modeling objective must contain an existing release with the corresponding tag", Staging or Production. Create it from the objective's *Deployments* section with a name, description and the environment; the details page shows "interim statuses, indicating that the container image containing the latest release and inference code is being deployed", then green checkmarks for status and health.

**[Docs]** What the page covers: *Publish Function* (a wrapper "with the same input and output API as your model", [05](05-models-in-the-ontology-and-model-functions.md)); the *Query* tab with single-I/O and multi-I/O requests ([04](04-querying-a-live-deployment-inference-history-compute-usage.md)); *Disable* (keeps the Target RID for re-enabling) versus *Delete* ("The old Target RID will no longer be able to be queried"); **resource configuration**, "a minimum and maximum replica range, which enables automatic horizontal scaling based on request volume, as well as CPU and GPU counts", editable afterwards with no downtime; **service logs** on *Logs & Metrics* (startup logs listing the conda packages to install, per-replica `tags.node_id` filtering, Python `logging` lines from the model, "a retention period of 7 days"); and two **metric** families, *Kubernetes host* (all processes on the host; "if your model's performance is slow but the host metrics are at 100%, your model might be getting throttled") and *inference container* (exact usage of the model's container; "not available for container-based models").

**[Docs]** Spark models in live deployments are beta: every deployment ships a JDK and "only local Spark is supported", and JSON requests must be converted to Spark frames by hand ([02-04](../02-training-models-in-foundry/04-spark-ml-distributed-training-and-gpus.md)).

## Objective batch deployments

**[Docs]** "A batch deployment is a special pipeline configured inside a modeling objective which allows data to be run through a model that outputs results to a Foundry dataset." Two prerequisites: a release with the environment tag, and an input dataset that "should be carefully maintained and updated regularly—it represents the new information of the problem you are trying to solve". Choose the environment, the input and a new or existing output dataset. Resources are Spark profiles, as in Python transforms. The limit repeated from [01-02](../01-models-and-model-adapters/02-writing-a-model-adapter.md#what-the-api-must-look-like-downstream): "only compatible with models using a single tabular dataset input".

**[Docs]** Keeping the output fresh: a schedule on the output dataset, and specifically "a new logic schedule that builds the output dataset whenever the logic for that dataset updates", because "When a new model is released in the objective, the logic for the output dataset will be updated and this schedule will be triggered." A time-based schedule handles new input data; the logic schedule handles new releases.

## Direct model deployments

**[Docs]** "Direct model deployments are live hosted endpoints that immediately connect models to user applications such as Workshop and Slate". Start one from the model's *Live deployment* tab (*Start deployment*); configure "scaling, resources, environment variables, and sources"; "Direct model deployments can be configured to scale from zero", add a replica at "75% capacity" up to the maximum, and "automatically scale down after 30 minutes without a live request". One **schedule override** of the replica range can be set for chosen days and a time range ("Currently, you can only schedule one override"). One function per branch (*Create function*).

**[Docs]** **Automatic upgrades**: "One direct model deployment can be created for each branch of a model", and "When a new model version is published to that branch, the direct model deployment will automatically upgrade to the new endpoint with no downtime"; its function gets a new version too. "If you do not want automatic upgrades, consider using a Modeling Objective live deployment". Direct deployments "are backed by compute modules" ([DevTools 03](../../DevTools/03-compute-modules-and-custom-endpoints/README.md)).

**[Docs]** **Type safety**, which objective live deployments "do not currently support": an `int` field truncates 3.6 to 3; dates and timestamps are cast ("Timestamp fields now expect a string with format ISO 8601"); fields "marked as required in the model API" are required. Debugging: *Logs* (stream, filter, download, run history), *Metrics* (scaling, job, container, replica), and *Run with Flamegraph* for one request ("unavailable for container models and requests that return an error"). Monitoring: "monitored under the Live deployment resource type, which supports the Single scope", with "Seven live deployment rules", the ones catalogued in [Observability 01-02](../../Observability/01-monitoring-views/02-monitoring-rules-reference.md). In Workflow Lineage the model is "a trained model node".

**[Docs]** Marketplace: "package them in a Marketplace product", which "supports deployments on the model's default branch" and lets installers choose whether to start the deployment; function publication is then managed by Marketplace ([07-03](../07-language-models-migration-and-products/README.md)).

## The comparison

**[Docs]** The page's table, rows as given:

| Feature | Direct model deployment | Objective live deployment |
|---|---|---|
| Automatic upgrades | Yes | No |
| Automatic scaling | Yes | Yes |
| Type safety | Yes | No |
| Scheduled overrides | Yes | No |
| Supported endpoints | V2 only | V1 and V2 |
| Model inference history | No | Yes |
| Pre-release review | No | Yes |
| Automatic model evaluation | No | Yes |
| Trained in Code Repositories / Code Workspaces | Yes / Yes | Yes / Yes |
| Container images | Yes | Yes |
| Externally hosted models | No | Yes |
| Spark model adapter API type | No | Yes |
| Marketplace support | No | No |

**[Observed]** The table's last row says *No* for Marketplace on both, while the same page's text says a direct deployment and its function can be packaged in a Marketplace product. The text is newer in tone (it names installer options); the row looks unrevised. [07-03](../07-language-models-migration-and-products/README.md) reads the Marketplace page itself and settles it; until then, treat *direct deployments travel in products* as the page's claim and the table row as stale.

**[Explanation]** Read the table as two philosophies. A direct deployment is the model *as a service*: it follows the model's branch, types its inputs, scales to zero, and suits a team that iterates fast and owns both ends. An objective live deployment is the model *as a governed release*: nothing changes until someone marks a release, every call can be recorded, every candidate was evaluated the same way, and the price is no type casting at the endpoint and a deployment that is always on. The orientation page's own words were *quick iteration* versus *production-grade modeling project management* ([00-01](../00-orientation/01-the-modelling-map.md#which-tool-for-which-job)).

## Branching direct deployments

**[Docs]** Direct deployments "integrate with Global Branching" ([DevTools 06](../../DevTools/06-branching-and-cross-app/README.md)): build a model version on a global branch, open its *Live deployment* tab, and Foundry "automatically creates a disabled branch deployment by copying the configuration from main"; edit, *Start deployment* to test; changes "are isolated to the global branch". A function published on the branch gets a version suffixed `-branch-YYYYMMDD-HHMMSS`, usable only on that branch; "Foundry only supports branch-local model function versions on global branches". The configuration can be **protected** so that changes to `main` need a proposal; reviewers see a side-by-side comparison; merge requires approvals, an up-to-date configuration, a model built on the branch, and, for a function, that "its target stable version has not already been published on main". Rebasing keeps one whole configuration ("you cannot resolve individual fields separately"). Merging into `main` applies the configuration, creates a disabled deployment if none existed, and publishes the branch function "as a stable function version on main".

## For Kestrel

**[Example]** *Proposed*, and it is the decision [Ontology 15-03](../../Ontology/15-advanced-patterns/03-models-in-the-ontology.md) asked this area to make:

| Need | Deployment | Why |
|---|---|---|
| `Shipment.delayRisk`, nightly, for Ama's queue | An objective **batch deployment** on the `Delivery delay` Production release, output dataset in `Commerce [Transform]`, a time schedule nightly plus the logic schedule so a new release re-scores; Priya's transform turns the output into the struct | Single tabular input, so the objective path is open; the output follows the production release with lineage, which the plain transform of [02-05](../02-training-models-in-foundry/05-modelinput-in-transforms.md#for-kestrel) could only imitate by pinning a version by hand. 02-05's transform stays as the *shaping* step, not the scoring step |
| `deliveryRisk(shipment)`, the live score on screen | An objective **live deployment** (Production) with a published function; a second, Staging, for Daniel's test branch | 15-03's rule: the version changes only on a decision. Pre-release review and inference history come with it. The cost: no type casting at the endpoint, so the wrapper validates its four inputs ([01-04](../01-models-and-model-adapters/04-modeladapter-api-reference.md#for-kestrel)); and the deployment is always on, priced in [04](04-querying-a-live-deployment-inference-history-compute-usage.md#for-kestrel) |
| `liveFraudScore(payment)` | An objective **live deployment** on `Payment fraud` (Production), with inference history recording every call | The history is the refund audit trail; a direct deployment has none |
| Ledger-wide fraud scores (`Payment.riskAssessment`) | An objective **batch deployment** on the same objective | Same reasoning as the delay batch |
| A **direct deployment** | *Considered, not adopted* for both models | Auto-upgrade contradicts 15-03; type safety and scale-to-zero are the two things given up, and both are compensated above. Kept in mind for a future model that iterates daily and feeds no queue |

**[Example]** Two revisions this proposes for [15-03](../../Ontology/15-advanced-patterns/03-models-in-the-ontology.md) at adoption time ([09-01](../09-kestrel-case/README.md)): its consequence 5 quotes scale-from-zero, the 75% replica rule and the 30-minute scale-down, which this page attributes to *direct* deployments, while its consequence 4 recommends an *objective* deployment; the adopted text should say that the objective deployment scales between a minimum and maximum replica range and does not scale to zero. And its route list should name the batch deployment as the pipeline that backs `delayRisk`. Branching direct deployments is *considered, not adopted*: Daniel already works on global branches in `kestrel-dev` ([DevTools 09-02](../../DevTools/09-kestrel-case/02-daniels-developer-setup.md)), but with no direct deployment there is nothing to branch; the staging release plays that role.

---
[Module index](README.md) · Previous: [02 — Checks on submissions and objective settings](02-checks-on-submissions-and-objective-settings.md) · Next: [04 — Querying a live deployment, inference history, compute usage](04-querying-a-live-deployment-inference-history-compute-usage.md)
