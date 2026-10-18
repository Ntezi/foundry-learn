# First-half review: build understanding before continuing

Lessons **01–24** have been rewritten for a software engineer who is new to Foundry. This is exactly half of the 48 numbered notes, including the optional Marketplace lesson at position 09. Lesson 24 introduces Workshop; detailed application construction starts at 25.

**Status: explanatory depth accepted; continuation requested.** You said “This is nice. Continue.” Lessons 25–48 are now revised in the [second-half review](SECOND-HALF-REVIEW.md). The earlier Learn completion record is unchanged; a page completion or certificate is separate from your understanding and practical experience.

## What changed

The main notes now teach the reasoning directly, instead of placing a short explanation above older execution logs. The lessons use different formats where useful: architecture mappings, narrative scenarios, annotated configuration choices, small worked tables and diagnostic exercises. The technical notes explain both the useful software-engineering analogy and its limits.

Examples distinguish data availability from freshness, names from meaning, source IDs from consolidated identity, join success from correct cardinality, saved logic from built output, and object identity from a display title. Invented examples are labelled; local CSV observations are distinguished from historical Foundry results.

## A practical reading route

Read all 24 in order for the complete explanation. For an initial depth check, these five provide representative samples:

- [03 — The use case](03-the-use-case.md): why the business needs the workflow and how to translate that need into engineering questions.
- [13 — Clean Bureau SAS](13-clean-bureau-sas.md): why each cleaning operation exists, what it proves and what it leaves unresolved.
- [15 — Join Office Goods](15-join-clean-office-goods-with-customer-list.md): a worked join, unmatched customers and how duplicate lookup keys can multiply orders.
- [19 — Finalize and run](19-finalize-and-run-pipeline.md): save, preview, deploy and build, with a debugging path for stale results.
- [22 — Create the Order type](22-create-your-object.md): primary key versus title, property mapping, API names and indexing.

Use [the complete course index](README.md) to navigate the other lessons. There is no need to rush these notes to match the speedrun's video or course duration.

## Try explaining these in your own words

These are self-study prompts, not an assessment submission. The answer guidance is below so you can check your reasoning after trying.

1. Why do we clean each company's orders separately before combining them?
2. How can a customer join produce the correct row count but wrong customer names?
3. Why can removing blank order IDs still leave invalid object identity?
4. What is the difference between `Union Orders`, `all_orders` and an Order object type?
5. If the app displays old data after a pipeline edit, which boundaries would you inspect?
6. Why is Item Name useful as a title but unsuitable as the primary key?
7. Why does uploading the CSV once not create a live orders inbox?
8. What does the first half establish that Workshop will depend on?

### Answer guidance

1. Each source has its own naming, type and interpretation differences. Separate adapters converge on one deliberate output contract.
2. Matching against the wrong source-ID namespace can produce one plausible but incorrect match for every order. Counts alone do not test meaning.
3. Duplicate nonempty IDs, collisions between sources and unstable IDs remain separate problems. Identity must be present, unique in the modeled population and stable.
4. `Union Orders` is a transformation node; `all_orders` is its configured dataset output, containing stored results after a build; the object type defines the application-facing Order identity and properties backed by prepared data.
5. Check the selected resources and saved/deployed revision, successful output build, correct datasource/property mapping and indexing, then the application's selected type, filters and displayed state. Investigate the actual observation rather than assuming every layer failed.
6. Many distinct Orders can concern the same item. The title aids recognition; the primary key addresses one entity even when its descriptive properties change.
7. The file is a snapshot. A live workflow needs a designed mechanism for receiving and processing later changes, with an appropriate freshness requirement.
8. Known inputs, source-specific preparation, shared customer context, a deliberate order output and a model with addressable instances. Workshop turns that foundation into user interactions.

## Feedback that will help the second half

Please tell me which explanations are still too shallow or assume unfamiliar knowledge. It is especially useful to name a lesson and the point where you still cannot explain *why*, *where you would use it*, or *how you would recognize a wrong result*. Also say whether the worked examples and software-engineering comparisons help.

Your feedback approved continuing with this teaching approach. Independent understanding and live practice remain separately tracked.

## Preservation and evidence

The full pre-revision numbered notes and course index are preserved in the [archive](../../study-backups/2026-09-09/e2e-first-half-depth/notes-before-depth-revision.tar.gz), with [checksums](../../study-backups/2026-09-09/e2e-first-half-depth/SHA256SUMS). Historical build observations remain accessible there and in the [practical evidence record](PRACTICE-AND-EVIDENCE.md). This pass edits study material; it does not claim a new live Foundry build or independent learner mastery.
