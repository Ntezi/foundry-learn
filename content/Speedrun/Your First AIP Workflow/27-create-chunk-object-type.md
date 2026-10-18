# 27 — Create the Chunk Object Type

## Identity, display and evidence have different jobs

Create an object type backed by the existing **Chunks** dataset. Name it `(<username>) Chunk`, choose an appropriate icon and select **Chunk Id** as the primary key. Set **Summary** as the title.

The primary key identifies an object. The title helps a person recognize it. A generated summary may change or resemble another summary without making the underlying chunk the same object. This is the same reason a customer display name should not usually substitute for a customer ID.

## Follow the course creation path

In Ontology Manager, choose **New → Object type → Use existing datasource** and select your own Chunks dataset from the training context. Complete metadata and property configuration, create the type and save it to the course folder.

The lesson discusses the Actions tab as a place to generate common operations. It does not specify a particular set of Chunk Actions in the inspected text. Do not invent checked options from that heading. The subsequent Entity lesson gives explicit Action choices, which are a separate instruction.

The course says the default Embedding settings are sufficient for its example despite an advanced-type warning. That is a walkthrough statement, not a reason to ignore an actual incompatibility. Later semantic search still needs a usable embedding property and compatible configuration. Record the actual property setup when practicing.

## Configure the media reference deliberately

After creating the type, select **Media Reference**, change its base type to **Media Reference**, choose a **Media Set**, select the original **Articles** resource and set it as the media reference property.

This connects the property to the source media resource so consumers can interpret it as a reference to a document. A plain value that looks like a reference is not equivalent to a correctly configured media property. Preserve the exact Articles identity; a similarly named media set from another installation is not interchangeable.

This step supports the evidence path: a Chunk should remain connected to the document from which its content was extracted. It does not itself verify the extraction's accuracy or printed-page numbering. Those checks still belong to the first-half data preparation.

## If Main cannot be edited

The course describes an Ontology branch/proposal route for organizations that restrict direct changes. Its example branch name is `<your_username>/e2eaipspeedrun`. Where available, branch indexing can allow data to be indexed on the branch. If that capability is unavailable, the lesson directs the learner to obtain the required merge through the organization's administrator or representative before dependent work.

Follow the actual enrollment's process during practice. This is not authorization to merge into a production Ontology or bypass an approval requirement. No branch or proposal is created by these notes. The important conceptual distinction is schema authoring versus the branch/context in which consumers can use indexed objects.

## Save and verify availability

Choose **Save → Save to Ontology**. The lesson says indexing starts after saving and can take a few minutes. A saved definition is not an immediate guarantee of populated objects.

Later, verify a known chunkId, its title, content, source reference and data availability in the intended Ontology context. If no objects appear, inspect backing data, indexing, branch and access before recreating the type.

**Review question:** why could Summary look correct while the wrong PDF opens? Display text and media-reference configuration are different parts of the object contract. Trace each independently.


**Go deeper in the Ontology area:** [04 — Object types](../../Ontology/04-object-types/README.md)

---
[Official lesson](https://learn.palantir.com/speedrun-your-e2e-aip-workflow/1962316) · [Course index](README.md) · [Second-half review](SECOND-HALF-REVIEW.md)

Prepared September 10, 2026 from the signed-in lesson text. Examples, engineering comparisons and suggested checks are teaching additions. No live Foundry build or model result is claimed. Notes ready for review; [practice](PRACTICE.md) Not Started.
