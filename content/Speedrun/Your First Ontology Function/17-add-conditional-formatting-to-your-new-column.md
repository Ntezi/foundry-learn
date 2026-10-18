# 17 — Add Conditional Formatting to Your New Column

## Color communicates a decision rule

A column of numbers requires the manager to scan and compare. Conditional formatting draws attention to values that meet chosen conditions. It makes the table faster to interpret, but also introduces a policy layer: the colors imply which values are concerning.

The course demonstrates formatting mechanics. Its thresholds are not proof of clinically or financially appropriate targets. In a real workflow, the metric owner must explain why a threshold matters, which reporting period it assumes, and what an operator should do when it is crossed.

## The actual three rules

The lesson text and embedded screenshots were inspected for this revision. Configure Math rules against the **Days Sales Outstanding function-backed column**, using these settings in course order:

| Order | Comparison | Threshold | Intent |
|---:|---|---:|---|
| 1 | Greater than | 40 | Danger — red |
| 2 | Greater than | 35 | Warning — orange |
| 3 | Greater than | 30 | Success — green |

The orange and green values were previously unresolved because they were in images. They are now source-verified. In the column configuration, add a rule, choose Math, switch the variable/value selector to the function-backed column if necessary, and set the comparison and Intent. Repeat for the remaining rules.

Do not replace the third rule with “Always true” or “less than 35.” The screenshot explicitly shows **greater than 30**. This means the three conditions do not cover every possible value.

## Work through boundaries before trusting the display

At 41, all three comparisons are true. At 38, the second and third are true. At 33, only the third is true. At exactly 40, the first is false but the second and third are true. At exactly 35, only the third is true. At 30 or below, none of these three conditions is true.

That overlap is why rule order matters. Preserve the course order and verify the actual rendered priority in Workshop during practice; these notes establish the conditions, not an observed runtime conflict-resolution result. With the intended highest-priority matching rule, the expected bands would be red above 40, orange above 35 through 40, and green above 30 through 35. Test that expectation rather than assuming all formatting engines resolve overlaps identically.

A value of 0 is not automatically green under these rules. More fundamentally, the course algorithm can return zero when no useful records exist. That does not establish excellent collections performance. “No data,” “not computed,” and “computed zero” need distinct meanings even if a demo currently compresses them.

## Presentation can conceal important differences

A raw value just above 40 might round to 40.00. If the rule compares the underlying value, it could appear red next to a displayed 40.00. Decide how to explain such boundaries; do not alter the underlying calculation merely to make the color look convenient.

Keep the numeric value and Days unit visible. Color alone is insufficient for readers who cannot distinguish the palette, and an unexplained green cell can imply more certainty than the data supports. A useful operator-facing description would explain both the bands and any missing-data state.

**Try it on paper:** classify the conditions satisfied by 30, 35, 40 and 40.01. Then explain why the course rules are not a complete business policy. [P2](PRACTICE.md#p2) includes the later visual boundary checks.

---
[Official lesson](https://learn.palantir.com/speedrun-your-first-ontology-function/2131742) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Teaching revision: September 9, 2026; ready for your review. Course-specific procedures use the official text inspected in this study session; column code, formatting screenshots, monthly code and edit code were rechecked for this half. Examples and design alternatives are explanatory additions. Local JavaScript checks are distinguished from Foundry execution. Previous notes are preserved in the [archive](../../study-backups/2026-09-09/ontology-function-second-half-depth/notes-before-depth-revision.tar.gz). [Practice](PRACTICE.md) remains Not Started.
