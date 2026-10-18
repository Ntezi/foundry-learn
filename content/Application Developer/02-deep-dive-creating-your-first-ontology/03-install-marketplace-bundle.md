# Lesson 3 — Install the Marketplace Bundle

## Why this bundle is needed

This course does not reuse the Orders workflow from the previous Speedrun. Its exercises use a separate **Fresh Air** scenario. The Marketplace bundle supplies the scenario's datasets, pipelines, and initial object types so the remaining lessons can focus on exploring and extending an Ontology rather than rebuilding all prerequisite data.

Before installing another copy, check whether the Foundry instance already has an installation that can be reused. Reusing one avoids duplicate Ontology entities and unnecessary resource deployment.

## Planned installation

If no suitable installation exists:

1. Open Marketplace and find **Deep Dive: Creating Your First Ontology** using the product search.
2. Start an installation.
3. Use the learner's username as the installation suffix.
4. Install into the existing learning project, inside a new course-specific folder named **Deep Dive: Creating your first Ontology**.
5. If many installations exist, prefix Ontology entity names with the username to prevent name collisions.
6. Confirm that all validations pass, then install.

The deployment typically takes 5-8 minutes, builds can take another 5-10 minutes, and object indexing may require roughly 10 additional minutes.

## Completed installation

The user approved the Marketplace deployment. A separate current-version installation was created rather than reusing either of the two legacy 0.1.0 installations owned by other learners.

- Installation: **Deep Dive: Creating Your First Ontology - Marius**
- Product version: **1.1.0**
- Destination project: **Application Developer Training**
- Space: **Hence**
- Ontology: **Hence - INTERNAL**
- Marketplace job: `ri.marketplace.main.installation-job.32758299-bc21-4e3d-a6b5-abc1851ddedc`
- Final installation status: **Success**
- Build duration shown by Foundry: **5 minutes 30 seconds**

Foundry reported 147 installed resources. The course bundle includes airline datasets and pipelines, eight object types, ten link types, one action type, object views, Workshop modules, schedules, and supporting documentation. No failures were reported.

Object indexing can continue after the Marketplace job succeeds, so Object Explorer results may take additional time to become fully available.
