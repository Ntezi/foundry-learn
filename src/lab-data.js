// Kestrel Commerce: the small, deliberately imperfect source tables the Ontology Lab works on.
// Each table has traps that mirror real ones: duplicate keys, nulls, a composite key,
// a source-system name that is not a business name.

export const DATASETS = {
  customers_crm: {
    label: 'customers_crm',
    system: 'CRM export',
    columns: ['customer_id', 'email', 'full_name', 'segment', 'country'],
    rows: [
      ['C-001', 'ama.mensah@example.com', 'Ama Mensah', 'consumer', 'GH'],
      ['C-002', 'kofi.boateng@example.com', 'Kofi Boateng', 'consumer', 'GH'],
      ['C-003', 'priya.nair@example.com', 'Priya Nair', 'business', 'GB'],
      ['C-004', 'daniel.osei@example.com', 'Daniel Osei', 'consumer', 'GH'],
      ['C-005', 'lina.weber@example.com', 'Lina Weber', 'business', 'DE'],
      ['C-006', 'ama.mensah@example.com', 'Ama Mensah (work)', 'business', 'GH'],
      ['C-007', null, 'Walk-in customer', 'consumer', 'GH'],
      ['C-008', 'yusuf.adebayo@example.com', 'Yusuf Adebayo', 'consumer', 'NG'],
    ],
  },
  orders_web: {
    label: 'orders_web',
    system: 'Storefront',
    columns: ['order_id', 'customer_id', 'placed_at', 'status', 'total'],
    rows: [
      ['ORD-1001', 'C-001', '2026-09-02', 'shipped', 64.5],
      ['ORD-1002', 'C-002', '2026-09-03', 'open', 18.0],
      ['ORD-1003', 'C-001', '2026-09-05', 'open', 129.0],
      ['ORD-1004', 'C-003', '2026-09-05', 'paid', 540.0],
      ['ORD-1005', 'C-004', '2026-09-06', 'shipped', 27.0],
      ['ORD-1006', 'C-005', '2026-09-08', 'cancelled', 88.0],
      ['ORD-1007', 'C-001', '2026-09-09', 'paid', 36.0],
      ['ORD-1008', 'C-008', '2026-09-10', 'open', 215.0],
      ['ORD-1009', 'C-003', '2026-09-11', 'shipped', 310.0],
      ['ORD-1010', 'C-002', '2026-09-12', 'open', 12.5],
    ],
  },
  order_lines: {
    label: 'order_lines',
    system: 'Storefront',
    columns: ['order_id', 'line_no', 'sku', 'qty', 'unit_price'],
    rows: [
      ['ORD-1001', 1, 'SKU-TEE-BLK-M', 2, 18.0],
      ['ORD-1001', 2, 'SKU-MUG-001', 1, 9.5],
      ['ORD-1001', 3, 'SKU-CAP-RED', 1, 19.0],
      ['ORD-1002', 1, 'SKU-TEE-BLK-M', 1, 18.0],
      ['ORD-1003', 1, 'SKU-HOOD-GRY-L', 2, 45.0],
      ['ORD-1003', 2, 'SKU-MUG-001', 4, 9.5],
      ['ORD-1004', 1, 'SKU-HOOD-GRY-L', 12, 45.0],
      ['ORD-1005', 1, 'SKU-CAP-RED', 1, 19.0],
      ['ORD-1005', 2, 'SKU-STK-PACK', 2, 4.0],
      ['ORD-1006', 1, 'SKU-HOOD-GRY-L', 2, 44.0],
      ['ORD-1007', 1, 'SKU-TEE-BLK-M', 2, 18.0],
      ['ORD-1008', 1, 'SKU-BAG-TOTE', 5, 43.0],
      ['ORD-1009', 1, 'SKU-HOOD-GRY-L', 6, 45.0],
      ['ORD-1009', 2, 'SKU-BAG-TOTE', 1, 40.0],
      ['ORD-1010', 1, 'SKU-STK-PACK', 3, 4.0],
      ['ORD-1010', 2, 'SKU-MUG-001', 1, 0.5],
    ],
  },
  products_pim: {
    label: 'products_pim',
    system: 'Product catalogue',
    columns: ['sku', 'name', 'category', 'supplier_id', 'list_price'],
    rows: [
      ['SKU-TEE-BLK-M', 'Kestrel tee, black, M', 'apparel', 'SUP-01', 18.0],
      ['SKU-HOOD-GRY-L', 'Kestrel hoodie, grey, L', 'apparel', 'SUP-01', 45.0],
      ['SKU-CAP-RED', 'Red cap', 'apparel', 'SUP-02', 19.0],
      ['SKU-MUG-001', 'Enamel mug', 'home', 'SUP-03', 9.5],
      ['SKU-STK-PACK', 'Sticker pack', 'stationery', 'SUP-03', 4.0],
      ['SKU-BAG-TOTE', 'Canvas tote', 'home', 'SUP-02', 43.0],
    ],
  },
  suppliers: {
    label: 'suppliers',
    system: 'ERP',
    columns: ['supplier_id', 'name', 'country'],
    rows: [
      ['SUP-01', 'Accra Textiles', 'GH'],
      ['SUP-02', 'Northline Goods', 'GB'],
      ['SUP-03', 'Volta Ceramics', 'GH'],
    ],
  },
  wms_shp_hdr: {
    label: 'wms_shp_hdr',
    system: 'Warehouse (WMS)',
    columns: ['shp_id', 'ord_ref', 'carrier', 'shp_status', 'eta'],
    rows: [
      ['SHP-77001', 'ORD-1001', 'GhanaPost', 'delivered', '2026-09-06'],
      ['SHP-77002', 'ORD-1005', 'DHL', 'in_transit', '2026-09-12'],
      ['SHP-77003', 'ORD-1009', 'DHL', 'in_transit', '2026-09-16'],
      ['SHP-77004', 'ORD-1004', 'FedEx', 'label_created', '2026-09-14'],
    ],
  },
  returns: {
    label: 'returns',
    system: 'Storefront',
    columns: ['return_id', 'order_id', 'reason', 'return_status', 'eta'],
    rows: [
      ['RET-501', 'ORD-1001', 'wrong size', 'received', null],
      ['RET-502', 'ORD-1005', 'damaged', 'in_transit', '2026-09-20'],
    ],
  },
};

// Base types the lab offers for a property.
export const BASE_TYPES = ['String', 'Integer', 'Double', 'Boolean', 'Date', 'Timestamp'];

// Guess a base type from a column's values.
export function guessType(values) {
  const v = values.filter((x) => x != null);
  if (!v.length) return 'String';
  if (v.every((x) => typeof x === 'number')) return v.every((x) => Number.isInteger(x)) ? 'Integer' : 'Double';
  if (v.every((x) => typeof x === 'boolean')) return 'Boolean';
  if (v.every((x) => /^\d{4}-\d{2}-\d{2}$/.test(String(x)))) return 'Date';
  return 'String';
}

// Analyse a column as a primary-key candidate: are the values unique and never null?
export function keyCheck(ds, col) {
  const i = ds.columns.indexOf(col);
  const vals = ds.rows.map((r) => r[i]);
  const nulls = vals.filter((v) => v == null).length;
  const counts = new Map();
  for (const v of vals) if (v != null) counts.set(v, (counts.get(v) || 0) + 1);
  const dupes = [...counts.entries()].filter(([, n]) => n > 1);
  const collapsed = dupes.reduce((s, [, n]) => s + n - 1, 0);
  return { nulls, dupes, collapsed, ok: !nulls && !dupes.length, objects: counts.size };
}

// Infer how a foreign key relates two tables: for each value of fk in `from`, how many rows in `to` carry that key?
export function cardinality(fromDs, fromCol, toDs, toCol) {
  const fi = fromDs.columns.indexOf(fromCol), ti = toDs.columns.indexOf(toCol);
  const fromVals = fromDs.rows.map((r) => r[fi]).filter((v) => v != null);
  const toVals = toDs.rows.map((r) => r[ti]).filter((v) => v != null);
  const toCounts = new Map(); toVals.forEach((v) => toCounts.set(v, (toCounts.get(v) || 0) + 1));
  const fromCounts = new Map(); fromVals.forEach((v) => fromCounts.set(v, (fromCounts.get(v) || 0) + 1));
  const maxTo = Math.max(0, ...fromVals.map((v) => toCounts.get(v) || 0));
  const maxFrom = Math.max(0, ...toVals.map((v) => fromCounts.get(v) || 0));
  const unmatched = fromVals.filter((v) => !toCounts.has(v)).length;
  return { maxTo, maxFrom, unmatched, kind: maxTo <= 1 && maxFrom <= 1 ? 'one-to-one' : maxFrom <= 1 ? 'one-to-many' : maxTo <= 1 ? 'many-to-one' : 'many-to-many' };
}

// A name check in the spirit of the design notes: does this look like a business noun or a source table?
export function nameAdvice(name) {
  const n = name.trim();
  if (!n) return { ok: false, msg: 'Give the type a name.' };
  if (/[_\-\s]/.test(n) || /^[a-z]/.test(n)) return { ok: false, msg: 'Use a singular business noun in PascalCase, e.g. "Shipment". API names are generated from it.' };
  if (/(hdr|tbl|web|crm|pim|wms|sap|v\d|raw|stg|dim|fact)/i.test(n)) return { ok: false, msg: `"${n}" is a source table wearing an object type's name. Could Ama explain it to a new colleague without mentioning the system? Name the thing, not the table.` };
  if (/s$/i.test(n) && !/(ss|us|is)$/i.test(n)) return { ok: true, warn: `"${n}" is plural. Object types are singular ("Order"); the plural is display metadata.` };
  if (/(row|record|line)$/i.test(n) && !/^OrderLine$/.test(n)) return { ok: true, warn: `"${n}" names a row, not a thing. Fine for an order line; suspicious elsewhere.` };
  return { ok: true };
}

export const apiName = (name) => name.replace(/[^A-Za-z0-9]/g, '');
export const propApiName = (col) => col.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase()).replace(/[^A-Za-z0-9]/g, '');
