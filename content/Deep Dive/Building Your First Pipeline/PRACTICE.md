# Practice plan: Deep Dive: Building Your First Pipeline

**Status: Not Started.** Nothing below has been done yet. Record results only after you actually run it, or once you confirm it's done.

Do this **after** the [review guide](REVIEW.md). Official exercises follow the course. Supplemental exercises are our additions and are labelled.

## Access check (do first)
- [ ] You can open **Compass** and **Pipeline Builder** in your enrollment.
- [ ] You have a learning Project and course folder you can edit ([04](04-create-learning-project.md), [05](05-create-training-folder.md)).
- [ ] You can upload files. If not, the Marketplace product "Deep Dive: Building Your First Pipeline" is available ([08](08-optional-deploy-datasets-via-marketplace.md)).
- [ ] You have downloaded the three files from [lesson 07](07-download-the-data-sources.md).

---

## Exercise 1 (official): Build the cleaning stage
- **Objective:** three clean nodes whose types and keys you can rely on.
- **Steps:** lessons [09](09-create-a-new-pipeline.md)–[12](12-work-with-different-file-types.md).
- **Reasoning to say as you go:** why each cast is needed, and why the JSON is unstructured.
- **Expected:**
  - `price` and `units` are doubles, and `transaction_date` is a timestamp.
  - `product_name` has no trailing spaces.
  - `address` is a single readable string.
  - `_error` and `file` are dropped.
- **Verify:**
  - Preview each clean node.
  - Run **View stats** on `customer_id` after the null filter and confirm every value is unique.
  - Check no `transaction_date` is null.
- **Common failures:**
  - Multi-line JSON option left on.
  - Timestamp format mismatch, which gives null dates.
  - Address separator left as underscore.
  - JSON node not renamed.

## Exercise 2 (official): Joins, outputs and the bad join
- **Objective:** find and fix a many-to-many join, using evidence.
- **Steps:** lessons [14](14-simple-joins.md)–[17](17-identify-a-bad-join.md).
- **Expected:**
  - Before the fix, transactions x products has about 172 rows against 50 transactions. The course's figures are course data, not results from your own run.
  - Contour shows `transaction_id` counts above 1.
  - After switching the key to `variation_id`, the row count equals the clean transactions count.
- **Verify:**
  - Record the row counts before and after.
  - Keep a screenshot of the Contour histogram.
  - Note which join type your UI selected.
- **Common failures:**
  - Forgetting to redeploy after changing the key, so the materialized output stays stale.
  - Contour opened on the pre-fix dataset.

## Exercise 3 (official): CLV output
- **Objective:** a per-customer revenue dataset.
- **Steps:** lesson [18](18-create-an-operationally-valuable-dataset.md), then save and deploy.
- **Expected:** one row per customer, with summed revenue.
- **Verify:**
  - The row count equals the number of distinct `customer_id` values in transactions x customers.
  - Hand-check one customer's total against their transactions.
- **Common failures:**
  - Building the aggregate before fixing the join, so revenue is inflated.
  - Keeping customer columns that aren't grouped, so values are ambiguous.

## Exercise 4 (supplemental): Make the checks permanent
- **Objective:** turn the manual checks into automatic ones.
- **Steps:** read the [data expectations docs](https://www.palantir.com/docs/foundry/pipeline-builder/dataexpectations-overview/). If your enrollment supports it, add these checks:
  - **primary key** on `transaction_id` for transactions x products;
  - uniqueness on `customer_id` for clean customers.
- **Expected:** with the old `product_id` key temporarily restored **on a branch**, the expectation flags the problem.
- **Verify:** record what the check reported. Per the docs, a failed expectation should fail the build; confirm that is what you see.
- **Failure modes:** testing on the main branch, which affects others. Always use a branch.

## Exercise 5 (supplemental, design only): Segment the pipeline
- **Objective:** practise the lesson 22 trade-off.
- **Task:** sketch two versions: (a) one end-to-end pipeline; (b) separate clean and use-case pipelines. For each, list the materialized outputs, who could reuse them, and the added build latency.
- **No Foundry changes needed.**

## Reflection (after practice)
Write 3–5 sentences: which of your assumptions about the data were wrong, which check caught it, and what you'd automate on a real project. Then update the relevant lesson notes with anything the UI did differently from the course.

## Results
_Not yet recorded._
