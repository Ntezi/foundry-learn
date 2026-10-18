# 21 — User-Defined Functions (UDFs)

| Course | Module | Lesson | Source | Reviewed | Notes | Practice |
|---|---|---|---|---|---|---|
| Deep Dive: Building Your First Pipeline | Additional Considerations and Best Practices | 21/24 | [Official lesson](https://learn.palantir.com/deep-dive-building-your-first-pipeline/1875654) | September 24, 2026 | Ready for Review | Not Started |

Labels: **[Course]** paraphrases the official lesson · **[Docs]** comes from official documentation · **[Explanation]** / **[Example]** are our additions.

## Key concepts
**[Course]** When pre-built transforms aren't enough, **UDFs** add custom logic, written in a language Foundry supports, as a board in Pipeline Builder. You write the UDF, **publish it to Pipeline Builder**, then use it in boards. The course says **once published, a UDF can't be unpublished**. Docs (as linked by the course): [Java UDFs](https://www.palantir.com/docs/foundry/transforms-java/user-defined-functions/#user-defined-functions-udf).

## Course best practices
**[Course]**
1. **Check you really need one.** Use UDFs as a last resort, because of their performance and maintainability cost.
2. **Use them sparingly.** Built-in transforms are usually optimized.
3. **Keep them simple.** One task each, with little overlap with built-ins.

## Why they are a last resort
**[Explanation]**
- **Performance:** built-in transforms can be optimized by the Spark engine. Custom code is often opaque to the optimizer and may process row by row.
- **Maintainability:** a UDF is code in a separate repository with its own versioning and owners. People reading the pipeline graph can't see inside it.
- **Permanence:** since publishing can't be undone, a published UDF becomes a long-lived dependency. Name and version it carefully.

**[Explanation] Alternatives to try first:** combine built-in expressions, restructure the logic, or move the whole step to a Code Repositories transform when the logic is really code-heavy.

## [Docs] Current state (checked Sep 24)
The course links only to **Java** UDF docs. The current docs support **Python and Java** UDFs and **recommend Python**, keeping Java for cases that need Java libraries ([transforms overview](https://www.palantir.com/docs/foundry/pipeline-builder/transforms-overview/), [Python functions in Pipeline Builder](https://www.palantir.com/docs/foundry/functions/python-functions-builder/)). The "**can't be unpublished**" rule is stated for **Java** UDFs ([Java UDFs](https://www.palantir.com/docs/foundry/transforms-java/user-defined-functions/)). We didn't find it on the Python page, so check before assuming it for Python.

## Review checklist
- [ ] I can give three reasons UDFs are a last resort and one alternative.

---
[Course index](README.md) · [Review guide](REVIEW.md) · [Practice plan](PRACTICE.md) · [Sources and corrections](SOURCES-AND-CORRECTIONS.md) · Next: [Best Practices: Segmenting your Pipeline and Materializing Outputs](22-segmenting-and-materializing-outputs.md)
