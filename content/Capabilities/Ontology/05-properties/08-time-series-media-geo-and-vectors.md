# 08 — Time series, media, geospatial and vector properties

*Sources: [Base types](https://www.palantir.com/docs/foundry/object-link-types/base-types/) · [Property metadata](https://www.palantir.com/docs/foundry/object-link-types/property-metadata/) · [Time series overview](https://www.palantir.com/docs/foundry/time-series/time-series-overview/) · [Create or select a time series object type](https://www.palantir.com/docs/foundry/time-series/create-or-select-ts-ot/) · [Add time series properties](https://www.palantir.com/docs/foundry/time-series/time-series-properties-use-case-ontology/) · [Using media in the Ontology](https://www.palantir.com/docs/foundry/media-sets-advanced-formats/media-in-ontology/) · [Use geospatial data in the Ontology](https://www.palantir.com/docs/foundry/geospatial/ontology/) · [Process multimodal and embedding models](https://www.palantir.com/docs/foundry/ontology/aip-multimodal-and-embedding-models/) · checked October 2, 2026 · Ready for Review*

Four property kinds that don't hold a plain value. Each one *points at*, or *encodes*, something richer: a stream of measurements, a file, a shape on the earth, a position in embedding space. This is a short tour of each, with what to know before you use it.

## Time series

**[Docs]** Time series data is measurements over time, usually at a regular interval: flights per day, output per hour, sensor readings. Two pieces are needed:

- a **time series object type**, which holds metadata and gives apps access;
- a **time series sync**, a dataset- or stream-backed resource that indexes the values.

A **time series property (TSP)** on an object holds a **series ID**, not the values themselves. The values come from the sync.

**[Docs]** There are two ways to model it:

| Pattern | Use when | Example from the docs |
|---|---|---|
| **TSP directly on the object type** | Every object of the type has that series | `Machine.temperature` — all machines have it |
| **Linked sensor object type** | Only some objects have a given measurement, or there are many configuration variants | `Equipment` with linked sensors: pumps have pressure, reactors have temperature |

Sensor object types avoid long runs of empty TSPs and keep per-sensor metadata (units, interpolation) in one place. Apps search around to linked sensors automatically.

**[Docs]** Practical details:

- Series IDs are usually built in Pipeline Builder by concatenating the series name with the object key (for example `temperature_M-17`), or by unpivoting a wide measurement table.
- On OSv2, one TSP can be backed by **several syncs** through *qualified series IDs*.
- TSPs are configured on the object type's **Capabilities** page, where one can be marked the default for Quiver.

**[Example]** Kestrel stores warehouse throughput (parcels picked per hour) as a TSP on `Warehouse`, because all five warehouses report it. Dock-door temperature sensors exist only at the two warehouses with cold storage, so they are **sensor objects** linked to `Warehouse`.

## Media references

**[Docs]** A media reference property points to an **item in a media set** (an image, video, audio file or document). It stores the MIME type and the media set, view and item RIDs.

- **Backing:** the backing dataset needs a **media reference column**, and the property needs one or more **media sources**, set on the Capabilities page. One of them can be the upload destination for files added through actions.
- **Previews and processing:** media references give fast, interactive previews in Workshop and Object Explorer, and tiled imagery in Map. Functions can read the raw item and run OCR, text extraction or transcription. The OSDK exposes media too.
- **Uploads:** files uploaded in action forms are stored only when the form **is submitted successfully**.
- **No lists:** **lists of media references are not supported** as a property type.

**[Example]** `Refund.evidencePhoto` holds the customer's photo of a damaged item, uploaded through the *Request refund* action.

## Geospatial: geopoint and geoshape

**[Docs]**

| Type | Format | Notes |
|---|---|---|
| **Geopoint** | `"latitude,longitude"` as a string (e.g. `57.64911,10.40744`) in WGS 84, or a Geohash | Can be a title key, not a primary key. OSv2 validates geopoints more strictly |
| **Geoshape** | A GeoJSON **Geometry** string: LineString, Polygon or a Multi- variant | Not a Feature or FeatureCollection. Polygons must be closed, counter-clockwise and not self-intersecting. Use geopoint for single points |

Both are indexed for geospatial search, used by **Map** and Workshop's map widget. The old `geospatial-tools` library is superseded by Pipeline Builder's geospatial transforms. Older `geo.latitude` / `geo.longitude` type classes are deprecated in favour of geopoint.

**[Example]** `Warehouse.location` is a geopoint. `DeliveryZone.boundary` is a geoshape polygon. Kofi's map shows today's late shipments over zone boundaries.

## Vectors

**[Docs]** A vector property stores an **embedding** on an object for **semantic search**:

- It has *limited support*: it can only be queried by KNN (nearest-neighbour) search.
- At most **2,048 dimensions**.
- It can't be an array, a primary key or a title key.

**[Docs]** The embedding-model page adds practical guidance:

- Query-to-passage search works better with **asymmetric** models trained for it, such as MS MARCO models.
- Many non-Ada embedding models handle only **512 tokens**, so chunk accordingly.
- An alternative is to have an LLM write a hypothetical passage first and embed that.

**[Explanation]** A vector property is the Ontology's hook into retrieval for AI. The full workflow — chunk objects, embeddings, hybrid search — is in [16 — Semantic search and embeddings](../16-ai-and-agents/02-semantic-search-and-embeddings.md), and we built a first version in the [AIP Workflow speedrun](../../../Tracks/Speedrun/Your%20First%20AIP%20Workflow/17-embedding.md).

## Also in this family

**[Docs]** These are named in the base types list:

- **Attachment:** files on objects for use with functions on objects.
- **Geotemporal series:** a reference to a moving object's track.
- **Cipher text:** a string encoded with Cipher.

**[Explanation]** Where they come back: attachments as action parameters in [08-03](../08-actions/03-submission-criteria.md) and [08-08](../08-actions/08-using-actions-in-the-platform.md), and in functions in [09-05](../09-functions/05-writing-functions-in-practice.md); geotemporal tracks in [10-05 — Specialized apps](../10-applications/05-specialized-apps.md). Cipher text is **not covered further**. It only appears as a property type that the OSDK skips ([10-04](../10-applications/04-osdk-and-apis.md)) and Marketplace doesn't package ([14-04](../14-lifecycle-and-operations/04-marketplace-packaging.md)).

Open question [RQ-15](../SOURCES.md#open-research-questions) (vector limits) is mostly answered in [16-02](../16-ai-and-agents/02-semantic-search-and-embeddings.md). Index-time costs of vectors remain undocumented.

---
[Module index](README.md) · Previous: [07 — Formatting and reducers](07-formatting-and-reducers.md) · Next module: [06 — Links](../06-links/README.md)
