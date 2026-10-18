# Later practice — Mining Your First Business Process

**Status: Not Started.** This is a preparation checklist for after notes and understanding review. No Foundry package, schema, process, object, application or alert has been created or changed during note preparation.

## P1 — Establish the right workspace and access

Read lessons 02 and 04–07. Reuse the Learning Project and create the course-specific training folder. Confirm access to Marketplace, Object Explorer, Ontology Manager, Machinery and Workshop, plus the required Project/resource/Ontology authoring permissions. The source allows admin help for certain setup tasks; missing authoring permissions still need the appropriate grant. A local notes folder is not a Foundry Project.

Evidence to retain later: the chosen Project/folder, allowed role, the exact product installed and its naming prefix/suffix. A successful package installation is only setup evidence.

## P2 — Prove the data contract

Inspect a Customer→Claim relationship, Claim identity/current state, and claim logs. Check claim_id, new_state and timestamp mapping against the actual installation. Verify timestamp type, format and timezone before any conversion. Apply the lesson's parsing change only if needed; confirm the resulting values and validation outcome.

Select a few claims and manually order their events. Look for missing identifiers, orphan log rows, duplicates, ties, inconsistent labels and stale current state. Record the observation cutoff for open ages. Do not equate a loading/indexing delay with absent data.

Evidence: a small notional sample and a written explanation of which rows belong to each Claim, with one completed visit duration and one open age calculated independently.

## P3 — Configure and validate mining

Follow lesson 11 using the actual Claim Object Type and State property. Install the log Object Type from changes to the backing claim logs dataset; map Process ID, State and Timestamp explicitly. Choose the training location, wait for readiness, inspect the mined result, then confirm and save the process.

The source example expects seven states and nine transitions. Treat that as a comparison point, not a reason to alter data merely to force a match. If results differ, compare source states, time coverage, mapping and indexing first. A saved graph does not prove every transition or metric is correct.

Evidence: selected inputs, readiness, saved process location, observed counts, and manual agreement for a few known claim paths. Separate distinct graph edges from repeated transition occurrences.

## P4 — Trace and name generated resources

Use Ontology Manager and data lineage as described in lesson 12 to connect the generated Claim Log type and backing datasource to the original claim logs. Then rename its display name and plural label in the correct installation and save the intended changes. Do not infer that this renames its API identity or every associated resource.

Evidence: resource identity, lineage relationship and persisted display name. No global rename or unrelated asset cleanup is required.

## P5 — Validate the application bindings

Follow lesson 15 using the supplied Claims Process Application. Bind Filtered Claim Objects as the Machinery widget input and Object Table Claims as its output. Verify that a property filter changes the graph population and that selecting a path changes the table to consistent records. Clear selections and confirm recovery of the intended broader context. Record the actual process and Claim type identities.

## P6 — Check interpretation and formatting

Inspect the active metric's tooltip and units. Compare an individual claim history with graph/path results. Separate occurrence counts from unique claims and account for fixture age. Apply the high-risk=false filter, then inspect whether the risk value is current or known at routing time.

Create the Total Counts Alert view using Current Count. The illustrated ranges are [0,100) Success and [101,400) Danger; explicitly test 99, 100, 101, 399 and 400 and document uncovered boundaries. Any revised thresholds should be labelled as your chosen improvement. Record the saved/published version and verify View mode shows it. No Workshop publication has yet occurred.

## P7 — Validate the notification lifecycle

Confirm Automate access. Follow lesson 18's Objects added to set condition with State=under investigation AND high-risk=false, Live monitoring, grouped notification and yourself as static recipient. Review the complete condition, effect, location and expiry before activating the training automation. The source uses Indefinitely; retain awareness of its ongoing activity after the exercise.

Use notional training data and a supported change path. Test a nonmatching control and a deliberate transition into the matching set; inspect the automation execution and actual notification. Separately establish how existing matching objects, exit/re-entry, and risk-flag changes are handled. Do not infer these behaviors from the condition label. Do not send to other recipients or introduce real claim data for this exercise.

Evidence should connect the known object change, observed predicate membership, execution outcome and received notification. Adding the automation to the graph is an association step, not proof of delivery. The alert has no duration threshold and does not correct routing.

Mark practice Verified only after observing the intended behavior and retaining evidence. Record concrete blockers if encountered; no current live-access blocker has been established for this course. All P1–P7 remain Not Started.
