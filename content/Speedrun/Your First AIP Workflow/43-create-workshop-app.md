# 43 — Create a Workshop App

## Create the application resource

Navigate to the training Project and choose **New → Workshop module**, either from the menu or the context menu. Use the course context when saving and organizing the module so the final application is easy to locate with its supporting resources.

The course calls the resource a module and uses it to build an app. It is the application definition containing layout, widgets and variables. Creating it does not automatically attach your Logic function or Ontology types.

## What an empty module establishes

You have an authoring surface for composing an interface. The next lessons will name the app, organize sections and bind variables. An empty module opening successfully says nothing yet about retrieval, model access or answer quality.

This is analogous to scaffolding a frontend project. The framework is available, but the API calls and component props still need to be configured.

## Existing resources are dependencies, not embedded copies

The app will refer to the Chunk type, Knowledge Graph Template and published Logic function. It does not duplicate the PDFs or replace the pipeline that produced them. Understanding those references makes it easier to diagnose an application that displays stale or missing information.

If the wrong function is selected, the app may still render valid text from the wrong workflow. If the wrong Chunk type is selected, retrieval can operate over a different corpus. Friendly names are useful, but verify the actual identities in the training context.

## Keep authoring and user experience separate

The editor exposes configuration panels and variables to the builder. View mode exposes the intended user workflow. A feature that works while inspecting a draft should later be checked in the saved/published application context.

Likewise, builder access is not proof that a different intended viewer can use all dependencies. During practice, verify the actual user and data access where relevant rather than broadening permissions speculatively.

## Next step

The app's first meaningful structure is a question area followed by evidence and answer areas. The layout lesson establishes that visual organization; subsequent lessons create the actual dataflow.

**Review question:** what remains after creating the Workshop module? Identify layout, question state, object retrieval, template binding, function binding, publication and verification. The resource exists only after actual creation; no module was created during this notes revision.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962672) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
