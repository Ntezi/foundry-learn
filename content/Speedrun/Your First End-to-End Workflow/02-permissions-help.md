# 02 — Permissions & Help: distinguish access to a tool from access to its resources

In a typical application, you may be able to log in while still being unable to call an admin endpoint. Foundry has a similar distinction: seeing Pipeline Builder in the application menu does not prove you can read a particular input dataset, write an output, or create an Ontology object type.

This lesson prevents a common beginner mistake: treating every blocked button as evidence that you followed the tutorial incorrectly.

## What you need access to, and why

The course uses Workspace Navigator/Compass for finding resources; Pipeline Builder for transforming datasets; Ontology Manager for defining the Order model; Object Explorer for inspecting objects; and Workshop for the application. You also need the relevant permissions to create or edit resources in your learning Project, upload the data and author the required Ontology assets.

Think in terms of **identity + resource + operation**. “I can open Foundry” describes none of the specific operations above. “My user can read this dataset but cannot create an object type in this Ontology” is a useful diagnosis.

A Project provides organization and access configuration, but it is not safe to infer every downstream authorization from a folder's visibility. Object access and the ability to submit an Action must also be considered when those layers are introduced.

## A practical way to investigate a block

Suppose the three source datasets are visible, but you cannot create the Order type. Re-uploading the CSVs would not address the failure: the blocked operation is Ontology authoring.

1. Identify the exact resource or destination, such as the intended training Ontology.
2. Note what you were trying to do: view, create, edit, build or apply a change.
3. Preserve the exact visible error and the page/resource link.
4. Check that you are using your training location and the intended signed-in identity.
5. Ask the administrator or training contact for the specific missing capability.

The course points to **Support → Training** for enrollment guidance. Administrators may provide the Project, folder or files if those setup operations are unavailable to learners. That still does not imply permission to author an object type.

## The software-engineering lesson

Separate authentication, authorization and resource discovery. Authentication establishes who you are. Authorization determines which operations you may perform. Discovery determines what you can find in the interface. These concerns interact, but one successful step does not prove the others.

This way of diagnosing access problems is useful when a pipeline works for its author but a colleague cannot use the resulting app. Test the failing user's operation against the actual resource, rather than requesting broad administrative access by default.

**Check your understanding:** a colleague can open the application but cannot assign an order. What should you inspect?

Start with the specific assignment operation, its configured permissions or submission criteria, and access to the target object. Do not immediately change Project-wide permissions. The Action details are taught in the second half; the lesson here is how to locate the correct authorization boundary.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-e2e-workflow/1944887) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; you accepted this explanatory depth and requested the second half. Independent practical understanding remains separately tracked. Course procedure comes from the lesson text reviewed earlier that day. Analogies, worked examples and engineering extensions are explanatory additions. Previous notes and execution logs are preserved in the [pre-revision archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz); current practice status is tracked [separately](PRACTICE-AND-EVIDENCE.md).
