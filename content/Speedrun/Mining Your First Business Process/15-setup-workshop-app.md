# 15 — Setup Workshop App

*Inspected September 12, 2026 · Notes: Ready for Review · Practice: Not Started*

## Connect the filter, graph and table

The package already contains a Workshop module named **Claims Process Application**. Open that module in edit mode. Its left panel supplies filters, its bottom panel contains an object table, and the central area is where the process graph belongs. This is configuration of a supplied application, not a requirement to build its entire layout from scratch.

1. In the central area, choose Add Widget.
2. Find and add **Machinery Process Overview**.
3. In its configuration, select the process graph created in the first part.
4. Under Inputs, bind **Filtered Claim Objects** to **Claim [State]**.
5. Under Outputs, bind **Object Table Claims** to **Claim [State]**.
6. Notice the Node selection and Edge selection outputs; the later exploration uses graph selections. The lesson does not require inventing additional bindings for them here.

## What the bindings mean

The input object set determines the population supplied to this widget. It should be the set produced by the app's filters. The output object set supplies the downstream claim table with the widget's resulting claim selection. You can reason about it as:

```text
Filter choices → Filtered Claim Objects → Machinery widget
                                      → Object Table Claims → claim table
```

This is a conceptual dependency chain, not executable code. The exact names above are the package's variables. Do not create similarly named substitutes unless the actual installed module requires it: names alone do not guarantee that a variable is connected to the intended producer or consumer.

In ordinary frontend development, this resembles passing a filtered collection into a component and wiring its selection output to a detail table. Workshop uses typed variables and object sets to provide that coordination. A widget rendering successfully proves only that it can render; it does not prove the input and output are correct.

## Validate behavior during later practice

First inspect the unfiltered screen. Apply one clear property filter and confirm the graph reflects that population. Then select a path and check that the table contains claims consistent with the path and the active filters. Clear the selection and filter and observe whether the intended broader population returns.

If the table never changes, trace the output binding and the table's configured source. If the graph ignores filters, inspect its input binding. If both are empty, inspect the filter population and indexing readiness before assuming the widget is broken. Also confirm that the chosen process and Claim type belong to this course installation; a similarly named resource from another exercise can be the wrong dependency.

These checks matter because silent context mismatches can produce plausible but incorrect conclusions. A filter labelled high risk is not evidence that every visible component is using it.

**Review question:** which binding would you inspect first when filters change the table but not the graph? Start with the graph's input object set, then trace the variable back to the filter configuration.

---
[Official lesson](https://learn.palantir.com/speedrun-mining-your-first-business-process/2102860) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md) · [Later practice](PRACTICE.md)

Course steps are paraphrased. Synthetic examples and engineering checks are teaching additions; no live Foundry implementation is claimed.
