# 36 — Save, publish and view: verify what the user receives

The course now saves and publishes the Workshop module, then opens **View**. This is a delivery boundary: a configuration you can inspect in Edit mode is not automatically evidence that a user is opening that intended version.

## Three concerns to keep separate

**Editing** changes the module definition: layout, variables, widgets and events. **Saving** records a version of that configuration. **Publishing** controls which saved version is presented as the published application.

Workshop has an **Automatically publish when saving** setting, so save and publish may be coupled in a particular module. Inspect its version settings rather than assuming every save remains private or every save immediately changes the published app. Version history can also expose a specific saved version in View, including versions that are not the published one. [Official publishing and versioning documentation](https://www.palantir.com/docs/foundry/workshop/versions).

This resembles a distinction between saved source, a release and the version a user actually runs. The analogy concerns lifecycle; Workshop implements that lifecycle through its own module versioning.

## Follow the course's intended handoff

Save the configured module, make sure the intended version is published, and open View. Check the module identity and version context before evaluating the result.

Walk through the read-only experience: the filter controls should narrow the table; both charts should use the intended population; selecting an Order should update its details. A page that loads successfully is only the beginning of this check.

The historical record noted version `v0.2.0` for an earlier read-only stage. Later work recorded `v0.4.0` with assignment. These are historical landmarks, not instructions to force the current app back to an earlier version or a claim that those versions were reopened in this revision.

## App version and data state are different

Publishing a module does not upload a new CSV, rebuild `all_orders` or repair an object mapping. Similarly, a changed Order may be visible through the same module version because the configuration and the data it consumes are different things.

This matters during debugging. If a button is missing, inspect the module version and configuration. If an Order has an old customer name, inspect the data path as well as the selected resource. Re-publishing the same layout does not necessarily address stale backing data.

Viewing the application as its author also does not prove that another user has the same access. Access to the module, its object data and later its Actions must be evaluated for the intended user.

**A useful acceptance statement:** “In the intended published version, filtering changes the table and charts consistently, and selecting this known Order displays its corresponding details.” That states observable behavior more precisely than “the dashboard is done.”

**Check yourself:** does View mode always mean you are inspecting the currently published version? No. Confirm the version context; the platform supports viewing specific saved versions too.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1792195) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course procedure uses the lesson text reviewed earlier in this study session. Worked examples and software-engineering comparisons are explanatory additions; extra design considerations are not claims of implemented features. Earlier notes are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-second-half-depth/notes-before-depth-revision.tar.gz). Live practice remains [separately tracked](PRACTICE-AND-EVIDENCE.md).
