# 09 — A function-backed variable: connect source code to a consumer

The first function returns a single numeric result for a Workshop metric card. The repository contains the calculation, a released function makes that behavior consumable, and a Workshop variable supplies its returned value to the card.

The phrase **function-backed variable** means the variable's value comes from evaluating a selected function with configured inputs. It is not merely a textbox containing code or a stored numeric property added to Clinic.

## Follow the lifecycle

```text
Ontology references → generated bindings → TypeScript source
                                              ↓
                                         live preview
                                              ↓
                                   commit and release build
                                              ↓
                                selected function in Workshop
                                              ↓
                                    numeric variable → card
```

Each arrow represents a dependency that can be wrong independently. The source can be correct while the consumer selects an old release. The function can be released successfully while the card uses a different variable.

This is familiar from package development: editing library source does not automatically change an application consuming a released package version. Foundry supplies its own release and integration surfaces, but the need to identify the consumed implementation remains.

## Why return a number first?

A **scalar** is one value, in contrast with a collection or a mapping of many entities to values. Starting with a numeric result makes the integration easy to trace: query relevant facts, calculate one result, display it.

The simplicity of the return type does not imply simplicity of the calculation. The code will group records by month and walk backwards through that history. The widget only needs the resulting number, so it should not reimplement that algorithm.

This separation lets other consumers reuse the same calculation. It also makes failures easier to locate: an incorrect underlying number points toward input scope or logic; an incorrect label or decimal display points toward presentation.

## Identify what each successful stage proves

A clean compile shows that the source satisfies the checked type/build requirements. A preview result provides an observation for particular inputs and context. A successful release build makes that version available through the publishing path. A correctly bound Workshop variable connects a consumer to it.

None of those observations alone validates the business metric's definition. A number can be precisely calculated from incomplete months or an unintended all-clinic query.

## A useful debugging thought experiment

You change the calculation, see a different preview result and open Workshop, which still displays the previous value. Before changing the source again, inspect whether you committed, released successfully and selected the intended consumer version. Then compare the inputs and relevant data context.

**Remember:** source correctness, release readiness and consumer binding are different claims. Trace the first point at which the evidence diverges.

**Check yourself:** can Workshop display the function's result before the metric card is bound to its variable? Merely having a released function is insufficient; the application must explicitly consume and display it.

---

[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131552) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Teaching revision: September 9, 2026; continuation using this approach authorized by the learner. Understanding review remains separate. Course procedures use the official text inspected in this study session; lessons 12–13 were rechecked for this revision. Examples and engineering comparisons are explanatory additions, not executed Foundry results. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-first-half-depth/notes-before-depth-revision.tar.gz). Practice remains [separately tracked](PRACTICE.md).
