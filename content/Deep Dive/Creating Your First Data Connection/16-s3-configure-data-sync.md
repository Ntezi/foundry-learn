# 16 — Configure a Data Sync

*Module: Data Connection: S3 · Inspected September 23, 2026 · Notes: Ready for Review · Practice: Not Started*

## Explore, then sync

1. **Explore** the source to open the **Source Explorer**, which lists what you can reach. The first load can take a few minutes.
2. Find the training CSV file and click **+** next to it.
3. **Create sync for 1 dataset.** This creates the sync *and* starts the first import.
4. **Open build details** to watch progress until it succeeds.

## Key vocabulary

The course states that **any operation that changes a dataset's contents is a build**. A sync run is a build.

**Remember:** source (connection) → sync (copy job) → build (the run that writes the dataset).

**Review question:** what does "Create sync" do besides saving configuration? It triggers the first import build right away.

---
[Official lesson](https://learn.palantir.com/deep-dive-data-connection/1864434) · [Course index](README.md) · [Review guide](REVIEW.md)

Course instructions are paraphrased. Engineering comparisons and review questions are teaching additions. No live Foundry connection was made for these notes. Next: 17 — View Imported Data.
