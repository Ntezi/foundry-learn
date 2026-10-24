# 03 — Protecting sensitive data and requesting justification

*Sources: [Protecting sensitive data](https://www.palantir.com/docs/foundry/security/protecting-sensitive-data/) · [Requesting justification for sensitive actions](https://www.palantir.com/docs/foundry/security/requesting-justification-for-sensitive-actions/) · checked October 23, 2026 · Ready for Review*

A **lab in nine steps**: the docs lock down passenger dates of birth with a PII marking, in the order that doesn't lock anyone out. [02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#applying-a-marking-to-a-live-pipeline) has the full procedure as a list; this is the same thing walked through on a real pipeline, with Kestrel's `Customer PII` beside it. The short justification page is at the end.

## Why a marking and not a project

**[Docs]** Project owners manage access to their projects: discretionary control. For sensitive data "a stronger, more centralized access control model is needed". A marking is mandatory control: users without it "are guaranteed to never be able to access that data, even if the project owner tries sharing it with them", and the restriction "propagates to any data derived from this dataset anywhere in the platform". The example: passenger **DOB**s, to be seen only by people who completed PII training.

## The lab

| # | **[Docs]** Sky Industries | **[Example]** Kestrel (`Customer PII`) |
|---|---|---|
| 1 | **Create a category**, *Information*, because more markings of that kind will follow (PHI, say) | Category `Kestrel data`, visible, restricted to the Kestrel organization ([02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#for-kestrel)) |
| 2 | **Create the PII marking** in it; add the trained users as **members** and the admin team as **managers** | `Customer PII`: members granted by Ama's and Lena's leads after training; managers the platform administrators |
| 3 | **Simulate.** Open the pipeline's data lineage, turn on **simulation mode**, apply PII to `raw/passengers`, and see every downstream dataset that would be affected | Simulate on `Storefront [Datasource]/raw` |
| 4 | **Find the stop point.** The simulation shows PII reaching the ontology dataset, which would lock out every end user. Decision: keep the sensitive column "as long as possible" and drop `dob` on the ontology copy, `/Sky Industries/Customer Metrics [Ontology]/passengers` | The stop point is the transform that splits `customer_master` from `customer_contact` in `Commerce [Transform]` ([02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#for-kestrel)); the contact dataset keeps the marking |
| 5 | **Open the code.** From the dataset in lineage: *Code > View in repository* | Same |
| 6 | **Branch, drop, stop, PR.** Create a branch; drop the `dob` column; remove the soon-to-be-inherited PII marking from the input (`stop_propagating`); open the pull request | Same, on `Commerce [Transform]`'s repository, under the two-approval policy this area proposes extending to that project |
| 7 | **Merge and rebuild.** After a colleague approves, build this dataset "and everything downstream of it" so the latest transactions all stop propagating. The example is all `SNAPSHOT`, the default; `APPEND` and `UPDATE` need the extra guidance | The transaction types of Kestrel's pipelines aren't recorded in the model (17-02 §9 gap, logged in Phase 7); if the ledger syncs are `APPEND`, the ledger's marking must stay applied at the project from the start rather than be retro-fitted |
| 8 | **Simulate again.** Apply PII in simulation and confirm `ontology/passenger` is **not** affected; that proves the `stop_propagating` is live | Same |
| 9 | **Apply.** On `raw/passenger`, open the **security helper**, apply, save. The marking propagates immediately; the lineage shows marking badges | Same |

**[Explanation]** Steps 3 and 8 are the same action with different purposes. The first simulation finds where to stop; the second proves the stop works. Skipping the second is how a marking reaches the ontology dataset and every Workshop module goes blank at once. Step 7's rebuild is the step people forget: `stop_propagating` is a property of a **transaction**, so until the stop-point dataset and everything below it have been rebuilt, the old transactions still inherit.

**[Explanation]** The page's order, stop **before** apply, is the opposite of what feels natural. It's correct because applying first propagates instantly ([02-01](../02-markings-and-mandatory-controls/01-markings-and-classification-based-access-controls.md#part-1--what-a-marking-does)) and the `stop_propagating` can only take effect after a merge and a rebuild; between the two, every downstream user is locked out.

## Requesting justification for sensitive actions

**[Docs]** Four steps, all in the Checkpoints application ([06-02](../06-approvals-and-checkpoints/02-checkpoints.md) has the full mechanism):

1. Decide which action should need a justification and check there is a **checkpoint type** for it.
2. Configure the checkpoint: parameters and conditions of the prompt.
3. In the *Configuration* tab, use **Preview** to see what users will be shown; adjust.
4. Trigger it by attempting a matching action, submit a justification, and find it under the **records**.

**[Recommendation]** Step 1 is the real work. A checkpoint can only guard actions that have a type; the Download category in [03-05](../03-discretionary-controls-propagation-and-diagnosis/05-download-controls-and-the-two-deprecated-settings.md#part-1--download-controls) is one family, and 06-02 lists the rest. Decide from the list, not from a wish.

## For Kestrel

**[Example]** The lab is the procedure for the `customer_contact` proposal in 02-01; nothing new. For justification, *adopted* in Phase 7 ([11](../11-kestrel-case/README.md)): a justification checkpoint on **downloads** from the payments projects (03-05) and on the *Issue refund* action in Kestrel Pay, checked in 06-02 against [Ontology 16-04](../../Ontology/16-ai-and-agents/04-human-in-the-loop-and-staged-writes.md)'s control ladder so that an action already gated by an approval doesn't also prompt for a reason.

---
[Module index](README.md) · Previous: [02 — Securing an operational application](02-securing-an-operational-application.md) · Next: [04 — Cross-organization collaboration](04-cross-organization-collaboration.md)
