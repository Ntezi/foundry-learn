# 03 — Debugging, history and cost

*Sources: [Debugging](https://www.palantir.com/docs/foundry/compute-modules/debugging/) · [Compute module history](https://www.palantir.com/docs/foundry/compute-modules/history/) · [Usage and pricing](https://www.palantir.com/docs/foundry/compute-modules/usage/) · checked October 22, 2026 · Ready for Review*

**[Concept]** Running a compute module means watching replicas: whether they start, whether they answer, what changed when they stopped answering, and what they cost while they run.

## Replica states

**[Docs]** Start with **Replica Status** on the **Overview** tab; select a replica for its images and **Replica Diagnostics**.

| State | Meaning | Look at |
|---|---|---|
| **Starting** | Getting a host, pulling images, starting containers | A long stay suggests a large image (**>5GB**), a large resource request, or a slow readiness probe. Logs mean your container at least started |
| **Started** | Running; about to become responsive or not | Staying here long may be an infrastructure issue |
| **Responsive** | Answering queries | Normal; check logs for functional problems |
| **Unresponsive** | Not answering, or not reporting readiness; gets no traffic and may be terminated | Logs, then diagnostics once the replica is deleted |
| **Decommissioned** | Finishing in-flight requests before deletion | Normal: replicas have a max TTL under 24 hours |
| **Starting Error** | Failed to start (image, configuration or infrastructure) | **Diagnostics**: there are no logs yet |
| **Deleted** | Gone, normally or not | Switch to **Archived**; diagnostics are kept for **one hour** |

**[Docs]** The page's diagnostics example is a `CrashLoopBackOff`: the container keeps exiting, so read its logs and code.

## Upgrades are safe by default

**[Docs]** Changing the configuration of a running module starts a **second deployment** alongside the first. New requests switch to it once one of its replicas is responsive; the old one drains and is deleted. If the new deployment never becomes responsive, **the current one keeps serving**: a failed upgrade causes no downtime. Revert or fix forward to end it. Some settings need downtime, and the UI asks you to acknowledge that before saving.

**[Explanation]** So *my change didn't take effect* usually means the upgrade is stuck, not that it was ignored. Check the upgrade's own replica section on the Overview tab.

## History

**[Docs]** The **History** tab lists, newest first:

- **configuration changes**, labelled by type (for example *Containers changed*) with image transitions such as `0.0.1 → 0.0.2`, each with a configuration version you can open or **diff** against the previous one;
- **run events**: starts and stops, by whom and when.

**[Docs]** **View replica history** for a run lists every replica with its image, start, duration, status (including why it ended early) and end time, with links to each replica's logs and metrics, and a link to the run in **Job Tracker**. Replica details are kept for **7 days**.

## Cost

**[Docs]** Usage is counted in Foundry **compute-seconds** whenever a replica is starting or running, and attributed to the module. Nothing is charged when no replicas run. Predictive scaling can start replicas without requests.

**[Docs]** The formulas:

```text
vcpu_compute_seconds = max(vCPUs_per_replica, GiB_RAM_per_replica / 7.5)
                       × num_replicas × vcpu_usage_rate × time_active_in_seconds
gpu_compute_seconds  = GPUs_per_replica × num_replicas × gpu_usage_rate × time_active_in_seconds
```

| Resource | Default usage rate |
|---|---|
| vCPU | **0.2** |
| T4 GPU | **1.2** |
| V100 GPU | **3** |
| A100 GPU | **1.3** |
| A10G GPU | **1.5** |
| L4 GPU | **2.1** |
| H100 GPU | **4.7** |

**[Docs]** Enterprise contracts may differ; ask your Palantir representative. Without configuration a replica requests **1 vCPU, 4 GB memory and no GPU**; four default replicas may therefore use about 4 vCPUs and 16 GB.

**[Explanation]** Three levers, in order of effect:

1. **Minimum replicas.** Anything above zero bills around the clock.
2. **GPU type**, because GPU rates dwarf the vCPU rate.
3. **Concurrency limit.** A higher limit lets fewer replicas carry the same load.

## For Kestrel

**[Example]** A rough monthly figure for `kestrel-pay-llm`, with the settings from [02](02-configuration-and-sdks.md#for-kestrel) (including its proposed daytime override) and assumed resources of one **L4** GPU and 8 vCPUs per replica (the AIP notes don't fix the hardware):

```text
one replica, all month (30 days = 2,592,000 s)
  GPU:  1 × 1 × 2.1 × 2,592,000           ≈ 5.44 million compute-seconds
  vCPU: max(8, RAM/7.5) × 1 × 0.2 × 2,592,000 ≈ 4.15 million (with 8 vCPUs, RAM ≤ 60 GiB)
second replica, ~10 working hours × 22 days (792,000 s)
  GPU ≈ 1.66 million;  vCPU ≈ 1.27 million
total ≈ 12.5 million compute-seconds a month
```

**[Explanation]** The minimum replica, not the daytime override, is most of the bill, and it's required for a model-backed module. That's the price of keeping Kestrel Pay's inference in-house; add it to Kestrel's AI cost view in [AIP 09](../../AIP/09-cost-and-observability/README.md) by hand: registered-model costs don't appear as model spend in Resource Management, and for a compute-module-backed model the cost *is* the compute ([AIP 02-01](../../AIP/02-bring-your-own-model/01-choosing-a-byom-path.md)).

---
[Module index](README.md) · Previous: [02 — Configuration and SDKs](02-configuration-and-sdks.md) · Next: [04 — Custom endpoints](04-custom-endpoints.md)
