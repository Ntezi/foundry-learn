# Lesson 11 — Save, Publish, and View

Official lesson: https://learn.palantir.com/deep-dive-building-your-first-application/1944280

## Lifecycle

Save and publish creates an immutable version and, by default, makes that version visible to users. Edit mode exposes variables and configuration; View mode is the operational experience. Share the View URL with users. Only editors can return to Edit mode.

Add the visible application title `Shipment Operations Center` to the header, choose the package/box icon, and apply Cerulean 3. Save again. The title inside the module is distinct from the resource name in Compass.

## Versioning discipline

Save after meaningful changes. The versions interface identifies the published version, supports viewing earlier immutable versions, and can revert the current state. Automatic publish-on-save can be disabled when saving and releasing need separate controls.

## Status

- Palantir Learn lesson: completed.
- Foundry execution: partially completed on 2026-08-28.
- Evidence: published Workshop version `v0.2.0`; the resource is available at `/workspace/module/view/latest/ri.workshop.main.module.7285b2c0-9a23-4240-9b77-9154d6ce6e10`.
- Remaining from this lesson: add the visible header title, package icon, and Cerulean 3 styling. This is authorized but paused because the authenticated Foundry browser session expired and redirected to Palantir sign-in on 2026-08-28.
