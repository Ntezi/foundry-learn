# 10 — Create the repository: choose the compatible function runtime

Create a Code Repository in the course location, choose **Functions → TypeScript Functions v2**, name it **My First Function <username>**, and open its VS Code workspace. The template supplies the conventions needed to build, preview and release this kind of function.

This should feel closer to familiar software engineering than the earlier visual configuration. The new part is how the code connects to the Ontology and becomes available to Foundry consumers.

## Why the template matters more than the editor

VS Code is the authoring interface. The selected template determines the function generation, dependencies and publishing conventions. Choosing the same editor for two repositories does not make their runtimes compatible.

The supplied v2 snippet uses `@osdk/client`, `@osdk/functions` and generated Ontology bindings. Older TypeScript v1 examples can use decorators and `@foundry/functions-api`. Do not combine generations simply because both are TypeScript.

This is similar to copying code between different major versions of a framework. The language may remain familiar while imports, discovery rules and supported contracts change. Type errors should lead you to inspect the generation and package versions, not automatically install whichever dependency makes the error disappear.

## Know the responsibilities of the imported pieces

| Piece | Role in this exercise |
|---|---|
| Client and object-instance types | Express querying and typed object inputs. |
| Function numeric types | Describe the result for the function contract. |
| Generated Clinic/Financial bindings | Connect symbols in source code to the imported business model. |
| Repository tooling | Preview, build and release the implementation. |

A generated Clinic symbol is not a hand-written class declaring a new Clinic type. It references the model imported into the repository. The next lesson establishes that dependency.

## Create a code home, then verify its context

Confirm the repository name and course location, inspect the selected Functions v2 template and allow the development workspace to initialize. Then identify the resource-import interface and the source tree used by the course.

The scalar function will be added under `typescript-functions/src/functions/` in the tutorial's repository layout. Treat that as the course-relative source location, not an existing local file in our notes directory.

No repository was created or compiled during this editorial pass. These instructions explain the intended practical steps and the evidence you should collect when performing them.

## What to carry into your own development

Use the supported template to establish compatibility, then understand the generated project rather than treating it as magic. Check its imports, function declaration pattern and release workflow before adapting examples from other documentation versions.

**Understanding check:** your code contains a v1 decorator but your repository is Functions v2. What should you investigate first? Whether the sample belongs to the intended generation and how v2 declares a function. Recreating the Workshop card would not address that mismatch.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131575) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; continuation using this approach authorized by the learner. Understanding review remains separate. Course procedures use the official text inspected in this study session; lessons 12–13 were rechecked for this revision. Examples and engineering comparisons are explanatory additions, not executed Foundry results. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-first-half-depth/notes-before-depth-revision.tar.gz). Practice remains [separately tracked](PRACTICE.md).
