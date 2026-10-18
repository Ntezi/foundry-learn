# Ontology Function practice plan and evidence

Course: [Speedrun: Your First Ontology Function](https://learn.palantir.com/speedrun-your-first-ontology-function). Prepared 2026-09-09. **Core practice: Verified (September 13, 2026).** Results below distinguish observed execution from the supplemental checks that remain.

Before practice, finish reviewing **this entire course’s** lesson notes and resolve important conceptual gaps. It is not necessary to finish notes for the other speedruns. The planned September 10–11 practical allowance is 90 minutes including verification and observations; if a dependency issue consumes it, carry remaining work forward without skipping verification.

<a id="p0"></a>
## P0 — Explain the workflow before touching Foundry

**Supplemental understanding review, 30 minutes.** Objective: explain the decision loop and choose the appropriate platform boundary. Prerequisites: read all 26 notes and the correction register.

1. Draw Clinic/Financial → SDK → scalar/map/chart → Action, naming each input and output.
2. Work the paper countback example and explain empty data, missing clinicName, and insufficient history.
3. Compare the course column signature with the documented input requirement. Resolve by source inspection or record a specific runtime check before that integration step.
4. Explain lesson 17’s confirmed >40 Danger, >35 Warning and >30 Success rules, including overlap and boundaries. Review lesson 19's local date-check result and remaining runtime validation.

Expected result: an explanation in your own words and explicit remaining access checks. Verification: answer the lesson questions without reading the answer. Common failure: repeating API names without explaining scope, identity, or persistence. Reflection: identify which assumption would most harm an operator’s decision.

<a id="p1"></a>
## P1 — Install dependencies and expose the scalar KPI

**Official walkthrough, lessons 4–13; planned 30 minutes.** Objective: trace a released numeric function into Workshop. Requirements: approved training Project/folder, Marketplace installation, correct Ontology, Code Repositories/VS Code, Action authoring later, Workshop editing, and access to required objects. Do not use production data.

1. Reuse the existing learning Project if suitable; create the course folder only if absent. Record location and identity.
2. Install the named course Marketplace product with username suffix/prefix. Wait for builds and check objects have usable data; record installation and API names.
3. Create the v2 Functions repository. Identify SDK mode; import the intended Clinic and Financial types; generate/install bindings as appropriate to that mode.
4. Add the course scalar snippet with correct API names. Read the fallback and data-quality assumptions before previewing.
5. Preview the course data, then commit and tag 1.0.0 (or an appropriate unused version if resuming). Wait for a successful release build.
6. Bind the released function to the numeric variable and metric card.

Expected: course reference about 40.51456310679612 in preview and 40.51 Days in the card, conditional on matching course data. Verification: record actual value, selected function version, build result, input scope, and one manual cross-check. Failure modes: wrong namespace, empty indexed data, missing SDK import, missing data permission, failed release, or wrong consumer version. Reflection: show where the metric definition lives and why the card only formats it.

<a id="p2"></a>
## P2 — Add per-clinic results and conditional formatting

**Official walkthrough lessons 14–17 with supplemental checks; planned 20 minutes.** Requirements: P1 complete, column input-contract discrepancy resolved; source thresholds are confirmed in lesson 17, with rendered behavior still to test.

1. Read the supplied column function before adding it; record its first-page and repeated-query limits.
2. Preview the map and compare its object-specifier keys to the intended clinic rows. If the documented object-set parameter is required, use the current documented v2 pattern and record the change; do not guess a type signature.
3. Commit and release the course’s next version; select it in the Function-backed property column.
4. Apply the confirmed three formatting rules in course order; verify their boundaries.

Expected: distinct correctly aligned DSO values, labelled Days, with explainable formatting. Verification: compare a clinic’s scalar result with its mapped value; check table filtering and missing map entries. The first-page limit requires a later supplemental pagination case beyond the initial dataset. Failure modes: incompatible signature, mismatched object types, partial map, stale release, or overlapping rules. Reflection: explain why the metric-card value need not equal the mean of clinic values.

<a id="p3"></a>
## P3 — Connect a monthly chart to selection state

**Official walkthrough lessons 18–20 with supplemental date checks; planned 20 minutes.** Requirements: released prior functions; validated period representation and chart output contract.

1. Add the month-over-month function; inspect the actual `month` values and date construction before preview. Local Node accepted the tested shortened month expressions; do not label this a proven Foundry bug. Verify actual runtime buckets.
2. If a correction is necessary, record the exact changed expression and rationale separately from the course snippet.
3. Preview valid month boundaries, an empty selection, and selected-clinic scope. Commit/release; configure the bar layer and Clinic Table Active Object input.
4. Save/publish and compare two clinic selections plus no selection.

Expected: timestamp buckets with numeric DSO and scope responsive to selection. Verification: inspect actual returned start/end values, a year boundary, ordering, and a hand-calculated point. Failure modes: invalid date, inconsistent period format, insufficient history, wrong active object, or stale UI. Reflection: explain how a missing month should be communicated to an operator.

<a id="p4"></a>
## P4 — Apply and verify a governed Clinic edit

**Official walkthrough lessons 21–24 with supplemental verification; planned 15 minutes.** Requirements: training-only target, permission to create/apply Action Types, valid selected Clinic, previous calculation available.

1. Read the edit function; inspect the proposed batch in preview. Do not treat preview as persistence.
2. Commit/release, create the function-backed Action in Ontology Manager, and review the intended training audience and submission behavior.
3. Add the Action to Inline Actions in Workshop. Record target ID and before-values; submit once; inspect actual object state and application display.
4. Deliberately test the opposite transition once, recording before/after values and goal-clearing behavior. Avoid blind retries of a toggle.

Expected: review/goal changes only on the selected Clinic. Verification: object identity and before/after state, Action execution evidence, and UI refresh behavior. Failure modes: missing authorization, invalid edit return, wrong target, stale display, or accidental double submission. Reflection: explain why explicit Start review/End review commands would be preferable in a real process.

<a id="p5"></a>
## P5 — Record evidence and decide what remains

**Supplemental reflection, planned 5 minutes.** Record actual repository/release IDs, object IDs, inputs, observed outputs, errors, and unresolved issues. Update the central tracker only after evidence review. Explain one decision and one trade-off to a teammate.

The timing above covers the core walkthrough, not exhaustive mastery. Reserve later deep-dive sessions for pagination beyond one page, invalid data, alternate-user access, simultaneous operators, repeated submissions, performance at scale, governed goal policy, and a new-domain rebuild. These are outstanding supplemental exercises, not silently completed tests.

## Evidence fields to populate later

Use: date; learner/executing identity; environment and resource IDs; exercise; expected result; actual result; evidence link; failure/repair; reflection; status. No empty result rows or prechecked success claims have been added.

## September 12 — authorized practice setup

The learner authorized practical work in [this Foundry folder](https://app.hence.ai/workspace/compass/view/ri.compass.main.folder.383c2b2d-189b-4616-822c-f76d0fb02253), with existing End-to-End Workflow resources organized first.

Opened the specified URL in Chrome. Foundry redirected to its login form before displaying folder contents. No resources were listed, moved, created or installed. The browser tab is retained for sign-in.

Resume sequence: inspect the supplied folder; identify the historical End-to-End assets by resource identity; group those assets into a Your First End-to-End Workflow subfolder without changing access or deleting resources; create or reuse a Your First Ontology Function subfolder; proceed with P1–P5 and record actual results. Check existing folders before creating duplicates. Ontology resource display names and API identifiers should not be changed merely to organize Compass files.

The requested hands-on phase is now authorized. The earlier notes-first guidance is preparation context, not a new permission gate. Learner understanding and practical verification will still be recorded separately.

## September 12 — access restored and setup executed

The in-app browser is signed in to app.hence.ai as Marius. Chrome's separate session remained signed out; use the in-app session for this practice.

- Reused Application Developer Training under the user-supplied Marius folder.
- Created Speedrun: `ri.compass.main.folder.fc11b3eb-08ac-46d3-b231-b6042301c89b`.
- Created Your First End-to-End Workflow: `ri.compass.main.folder.f34b0c8d-07d8-43cb-8089-e9de53712163`. Foundry confirmed moving six existing resources: all_orders, consolidated_customers, Marius Orders Inbox, Orders Pipeline, orders_bureau_transactional_system, orders_office_goods. Resource identities were retained. Existing deep-dive resources were not moved.
- Created Your First Ontology Function: `ri.compass.main.folder.9328da3d-5046-4856-b2ee-1eb61cdc688d`.
- Inspected the two existing course product installations; neither belonged to Marius's folder.
- Installed official Palantir Learning Store course product 0.2.0, suffix Marius. Installation `ri.marketplace.main.block-set-installation.b0e63d41-0c11-4cf9-a9eb-f82035691c53`; job `ri.marketplace.main.installation-job.c29bef39-bced-4f61-9d98-079526b06ebc` reported Success, completed in 8 seconds.
- Target Ontology: Hence - INTERNAL, `ri.ontology.main.ontology.81178de9-b114-4c4a-8f1c-61a4d5ff88a6`. The current installation-job UI generated object types; a separate Ontology prefix field was not exposed in the inspected draft configuration. Exact generated API identities still require inspection.
- Clinic dataset: `ri.foundry.main.dataset.598deab9-c78f-4aca-b02e-a52797a12369`.
- Financials dataset: `ri.foundry.main.dataset.39556756-8874-4b93-abad-8998109018f8`.
- Clinic Finance Tracker: `ri.workshop.main.module.49e34ca5-6d17-4150-99d9-8f8a2a3972aa`.
- Selected TypeScript Functions V2 template, named repository My First Function Marius, and initiated its VS Code workspace in the course folder. Startup is in progress; no function result or release is verified yet.

Installation success is not yet proof of indexed query data, correct function output, Workshop integration or persisted Action behavior. P1 remains in progress; P2–P5 remain pending.

## September 12–13 — scalar execution and release repair

- Repository: `ri.stemma.main.repository.9ada4709-4b8a-44c6-b80d-e1746ebe59ac`, My First Function Marius, in the course folder.
- Imported Clinic (`Clinic`, primary key `clinicName`): `ri.ontology.main.object-type.beb27d82-689c-42de-ba02-f66b9a4f49ed`. Imported Financial (`Financial`, primary key `identifier`): `ri.ontology.main.object-type.c2211429-40fc-4815-a7a1-c8c7c1748b33`.
- SDK creation required Code Repositories → Resource imports → Create with package name `ontology`; selecting imports alone in VS Code did not create the package. Generation succeeded and applied 41 files.
- Financial properties verified in generated types: amountBilled, revenueCollected, clinicName, identifier, month. Month is a datetime, so practice code extracts YYYY-MM before grouping. This adaptation is distinct from the notes' assumed month-string representation.
- Installed Financials dataset showed 36 rows. Workshop displayed Successful Clinic, Average Clinic and Struggling Clinic, each initially underReview=false and Goal=No value.
- Initial scalar function discovery returned no diagnostics. Actual read-only execution with no Clinic input returned **40.51456310679612**, matching the reference. Commit `304c7612604a1cc2b7fb58af258440f53a17d665`.
- However, the release build found strict TypeScript indexing errors TS2538, TS2769 and TS2532. Preview/discovery success did not establish release compilation. Tag 1.0.0 was created but is not a verified usable release.
- September 13: corrected indexing using Map entries, optional first-entry access and direct numeric month/year extraction. Commit `39a0c05c2ad`; release 1.0.1 succeeded in build `ri.jemma.main.build.0000000c-1a2f-3ceb-b0e5-a0729e1e3033`.
- Bound only Marius's published `calculateDaysSalesOutstanding` function (`ri.function-registry.main.function.3763509f-7f1a-453a-9473-6e458ac9dfc2`, version 1.0.1) to the Workshop numeric variable. Saved Workshop version 0.3.0 displays **40.51 Days**. P1 is verified for the course data.

## September 13 — per-clinic column and remaining function implementation

- Created Marius's own `functionColumnDaysSalesOutstanding` in My First Function Marius. It accepts the table's runtime `ObjectSet<Clinic>`, iterates every supplied Clinic, calls Marius's scalar function, and returns values keyed by each Clinic object specifier. No function from another learner's repository was selected.
- Commit `24b28bf1463`; release 1.1.0 succeeded in build `ri.jemma.main.build.0000000c-1aa4-4a2b-858b-300932f2d1cc`.
- Added the function-backed column using the table's runtime input. Observed values: Successful Clinic **31.232558139534884**, Average Clinic **35.285714285714285**, Struggling Clinic **64.01388888888889**.
- Renamed the column Days Sales Outstanding; formatted it as Days with two decimal places; added ordered rules **>40 Danger**, **>35 Warning**, **>30 Success**. Because rules are evaluated top to bottom and the first match wins, 64.01 is Danger, 35.29 is Warning, and 31.23 is Success.
- Created Marius's own `calculateDaysSalesOutstandingMoM`. The current public documentation example used `min` and `max`, but the repository's installed `@osdk/functions` contract accepted neither those keys nor `start`/`end` or tuple forms. Tags 1.2.0 through 1.2.3 failed while those shapes were tested. A compiler probe established that this installed version requires `startValue` and `endValue`; commit `240bbee013f` applied that exact contract.
- Created Marius's own `clinicEditFunction` in the same repository. It returns proposed Clinic edits: an active review is ended and its goal cleared; otherwise DSO is calculated and a training goal between 70% inclusive and 95% exclusive of DSO is proposed. The function reuses Marius's scalar implementation.
- Release 1.2.4 succeeded in build `ri.jemma.main.build.0000000c-1b1d-9b9b-afdb-9b1ecb5e1c87`. It contains all four functions authored in My First Function Marius. The monthly function was bound to the chart at version 1.2.4 with `Object table 1 Active object` as its Clinic input. Successful Clinic produced a visible 12-month bar series around 29–31 days, proving the returned range/value shape was accepted and the selection binding executed. Comparing a second Clinic, no-selection behavior, bucket payloads and a year-boundary value remain supplemental P3 checks.

## September 13 — function-backed Action and final Workshop verification

- The edit function RID is `ri.function-registry.main.function.98d2ed94-0010-4714-966e-91347e6dc5b7`, version 1.2.4.
- An initial Action draft was accidentally created while Ontology Manager was set to Rwanda - DEV/PROD. Saving correctly failed because that Ontology does not contain the function's Clinic type. The invalid unsaved draft was discarded; no unrelated resource was changed. This demonstrated that a function being discoverable across Ontologies does not make its object types valid in the currently selected Ontology.
- Switched Ontology Manager to **Hence - INTERNAL**, where the installed Clinic type is active, and created **Marius Set Clinic Goal**. Action RID: `ri.actions.main.action-type.2376d1b0-186f-4b3d-9073-d2575e85382e`; API name: `marius-set-clinic-goal`. The Action runs Marius's `clinicEditFunction` 1.2.4 and accepts a required Clinic object reference.
- Added the Action to Workshop's Inline Action Form or Table and bound Clinic to `Object table 1 Active object`.
- Selected target: Successful Clinic. Before the first submit: `underReview=false`, Goal `No value`, DSO `31.23 Days`. Foundry reported `Edits successfully applied`; after refresh: `underReview=true`, Goal `22.1349137164183`. The observed factor was about 70.87% of DSO, within the function's 70–95% training range.
- Submitted exactly once more on the same target to test the opposite branch. Foundry again reported success; after refresh: `underReview=false`, Goal `No value`. Average Clinic and Struggling Clinic remained false with no goal, supporting the selected-object boundary.
- Saved Workshop version **0.5.0** and published that version. P1, P2 and P4 are verified; the core P3 chart integration is verified. The deeper P3 comparisons and the P5 supplemental edge cases listed above remain future mastery work rather than course blockers.
