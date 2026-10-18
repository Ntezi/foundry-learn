# 08a — [Optional] Deploy Datasets via Marketplace

## An alternate route to the same starting point

Use this lesson if you cannot download the training files or manually upload them to Foundry. It is an alternative to the normal import route, not a required second installation after a successful upload.

Open **Applications → Marketplace**. Search in **Search products**, rather than Search stores, for **Speedrun: Your First AIP Workflow**. Open the matching product and follow its installation prompts, saving the training resources in the course folder. The lesson links to a more detailed installation example in the application deep dive.

## What a successful installation would establish

Marketplace packages can provision resources so a learner does not need to reproduce the same initial upload. That convenience does not establish that all subsequent capabilities are available. You still need the appropriate Pipeline Builder, AIP, Ontology and application permissions for later stages.

Inspect what the actual package creates. The page calls this deploying datasets, while the main walkthrough consumes an Articles media set. Confirm the installed input's type and contents before wiring it into the pipeline. Do not assume the package has already built the whole workflow or invented a resource inventory not shown in the installation.

For a software engineer, this is similar to using a prepared development fixture or environment package. Installation saves setup work, but you still verify the fixture version and the resources your application uses.

## Avoid duplicate input paths

If manual upload already succeeded, no additional Marketplace copy is needed for the tutorial. If a previous attempt left partial resources, inspect them before installing again. Two resources with similar labels can make it easy to select the wrong input and compare results from different corpora unknowingly.

The practical evidence should record which route was used, the installed resource identity and the document contents inspected. A generic “installed successfully” message does not answer which Articles resource supplies the pipeline.

## Scope of this note

We read the optional lesson to make the first-half notes useful if upload access is restricted. No Marketplace product was installed. Reading the optional page is also separate from the 49 required-lesson count in Learn.

**Remember:** an alternate import route solves an input-provisioning problem. It does not bypass missing permission to execute an LLM transform. Explain which dependency it replaces and which later dependencies remain.

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/2121234) · [Course index](README.md) · [First-half review](FIRST-HALF-REVIEW.md)

Prepared September 9, 2026 from the signed-in lesson text. Explanations, examples and suggested checks are teaching additions; no live Foundry result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
