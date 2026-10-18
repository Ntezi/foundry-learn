> Historical summary preserved on 2026-09-09. Track positions, timings and current requirements below may be outdated. Use the [current overview](../../Application%20Developer/00_Overview.md) and [central plan](../../STUDY-PLAN.md). Detailed revision pending.

# Speedrun: Your First End-to-End Workflow

Link: https://learn.palantir.com/speedrun-your-first-e2e-workflow
Duration: 60–90 minutes
Status: Recommended warm-up before the Application Developer track (not an official track item, but referenced as prior knowledge for "Deep Dive: Building Your First Application")

## Overview
Introductory, hands-on Foundry course. Goal: build **"a fully-functional end-to-end workflow"** from raw data to an operational application, touching the major platform components without needing deep mastery of any one of them yet.

## Learning objective
Get broad exposure to Foundry's pipeline: ingest → transform → model (ontology) → build app (Workshop) → operate.

## Key steps / sections

**1. Setup**
- Create a Foundry Learning Project
- Create a course-specific training folder

**2. Data ingestion**
- Manual data upload
- Optional: deploy a dataset from the Marketplace

**3. Data transformation (pipelines)**
- Create/configure a pipeline
- Clean data — datasets used: *Bureau SAS* and *Office Goods Corp*
- Join datasets with customer information
- Union datasets together
- Configure the output dataset

**4. Application development**
- Create an Ontology object definition on top of the cleaned data
- Build a Workshop module with visualizations: pie charts, bar charts
- Configure an object table with filtering
- Configure an Action to let users edit objects — example used: **"Assign Order"** action

**5. Operational deployment**
- Wire the module + action together
- Test the finished application

## Prerequisites
Access to Palantir Foundry — via your organization, or a free Developer Tier account.

## My takeaways
- This is the "see the whole forest" course before the track zooms into each tree (Workshop, Ontology, Functions individually).
- Good to actually build along in a Foundry Developer Tier sandbox rather than just reading.
