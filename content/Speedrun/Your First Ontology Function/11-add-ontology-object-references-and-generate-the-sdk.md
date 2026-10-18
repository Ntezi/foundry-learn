# 11 — Import Ontology references and generate typed bindings

The code needs to know which Clinic and Financial types it will use. Import the intended training entities through the repository's resource imports and select the correct Ontology. The course then shows **Create → Create new version → Install** for its SDK workflow.

The purpose of the SDK is schema binding: turn the imported model into names, types and query interfaces that TypeScript can understand.

## What is generated, and what is not?

A generated SDK describes the model your code references. It can expose the Clinic type, Financial type and their property names. It does not embed every clinic's current records as constants, grant permission to read them, or independently validate their business meaning.

For a software-engineering analogy, think of generating a client from an API specification. The client helps you write calls that match the declared schema. You still need the correct service context, access and runtime data.

If the generated Financial property is optional, code must consider its absence. If a property or exported name changes, the generated types may reveal incompatible references during development. That is valuable early feedback, but a type checker cannot determine that a month string contains a valid reporting period unless the contract and validation express that rule.

## Match the actual installed symbols

The course's example imports Clinic and Financial from its Ontology SDK. Your Marketplace prefix may produce different entity API names. Inspect the generated exports and adapt the object-type references consistently: imports, parameter types and query calls must refer to the same intended model.

The prose sometimes says Financials while the code says Financial. Do not pluralize an import by intuition. Use the actual generated identifier and verify which installed type it represents.

A second learner's compatible-looking Financial type can be the wrong dependency even if its properties make the code compile. Correct schema shape and correct resource identity are separate checks.

## Two SDK lifecycle modes to distinguish

The course demonstrates explicit SDK version creation and installation. Current documentation also supports **local Ontology SDKs**, generated from resource imports without manually versioning and installing a separate package. In that mode, bindings update with the imports and are generated and bundled during the function's tagging/build process. [Official local SDK documentation](https://www.palantir.com/docs/foundry/functions/local-sdks).

Therefore, inspect the repository's actual SDK mode. A missing manual Install button does not by itself mean the setup failed. Equally, do not assume an older manually installed SDK updates automatically whenever the model changes.

These are compatibility observations, not an instruction to migrate the course repository during this notes revision. Follow the supported flow for the repository you actually have.

## A small change-impact example

Imagine the model's `amountBilled` property changes name. The repository needs bindings consistent with the intended model, and the source must use the correct property. The function then needs a successful release; Workshop must consume the intended version. Regenerating types alone does not prove that the displayed metric now uses the revised calculation.

**Verify the outcome:** the intended Clinic and Financial references are present, their generated symbols and required properties resolve, and you can identify the SDK lifecycle in use. Actual object querying is verified in the next lesson's preview.

**Remember:** generated bindings connect code to a schema; queries obtain data; permissions govern access; releases connect the implementation to consumers. Do not collapse those into a single “SDK installed” milestone.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131596) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; continuation using this approach authorized by the learner. Understanding review remains separate. Course procedures use the official text inspected in this study session; lessons 12–13 were rechecked for this revision. Examples and engineering comparisons are explanatory additions, not executed Foundry results. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-first-half-depth/notes-before-depth-revision.tar.gz). Practice remains [separately tracked](PRACTICE.md).
