# Claude Code Update: CSV Import + Real Data Structure

**IMPORTANT:** The company is **Cronk Nutrients** (NOT "Advanced Nutrients"). Fix any references to wrong company names. The main supplier is **HIGROCORP INC.** (Canadian manufacturer).

Read the full spec in `claude-code-prompt.md` for context. This update adds CSV import and uses real product data.

## Priority Tasks

### 1. Update Mock Data to Use Real Product Structure

Replace fake mock data with realistic data based on actual Inflow export. Use these real SKUs and structure:

**Sample Products (use these exact SKUs):**

```typescript
const products = [
  // Classic Line - 500mL
  {
    sku: "CNMIC500ML",
    barcode: "628678692275",
    name: "500mL Micro 5-0-1",
    category: "Classic Line",
    cost: 2.65,
    price_msrp: 8.99,
    price_amazon: 12.88,
    length: 4.13,
    width: 1.98,
    height: 5.90,
    weight: 1.2,
    case_pack_qty: 12,
    linked_label_sku: "LABEL-500ML-MICRO",
    default_vendor: "HIGROCORP INC.",  // Canadian supplier
    is_active: true
  },
  {
    sku: "CNGRO500ML",
    barcode: "628678692237",
    name: "500mL Grow 2-1-6",
    category: "Classic Line",
    cost: 2.65,
    price_msrp: 8.99,
    price_amazon: 12.88,
    // ... same dimensions as above
  },
  {
    sku: "CNBLM500ML",
    barcode: "628678692312",
    name: "500mL Bloom 0-5-3",
    category: "Classic Line",
    // ...
  },
  
  // Classic Line - 1L
  {
    sku: "CNMIC1L",
    barcode: "628678692282",
    name: "1L Micro 5-0-1",
    category: "Classic Line",
    cost: 3.83,
    price_msrp: 12.99,
    price_amazon: 14.88,
    length: 5.25,
    width: 2.35,
    height: 7.42,
    weight: 2.4,
    case_pack_qty: 12,
    linked_label_sku: "LABEL-1L-MICRO",
  },
  {
    sku: "CNGRO1L",
    barcode: "628678692244",
    name: "1L Grow 2-1-6",
    // ...
  },
  {
    sku: "CNBLM1L", 
    barcode: "628678692329",
    name: "1L Bloom 0-5-3",
    // ...
  },
  
  // Classic Line - 4L
  {
    sku: "CNMIC4L",
    barcode: "628678692299",
    name: "4L Micro 5-0-1",
    category: "Classic Line",
    cost: 10.50,
    price_msrp: 39.99,
    price_amazon: 38.88,
    length: 7.08,
    width: 4.17,
    height: 11.90,
    weight: 9.0,
    case_pack_qty: 4,
  },
  
  // Additives
  {
    sku: "CNCM500ML",
    barcode: "628678692350",
    name: "500mL CalMag 2-0-0",
    category: "Additives",
    cost: 2.79,
    price_msrp: 10.99,
  },
  {
    sku: "CNBB500ML",
    barcode: "628678692398",
    name: "500mL Bud Booster 0-1-3",
    category: "Additives",
    cost: 4.41,
    price_msrp: 18.99,
  },
  {
    sku: "CNMJ500ML",
    barcode: "628678692435",
    name: "500mL Monkey Juice",
    category: "Additives",
    cost: 6.16,
    price_msrp: 24.99,
  },
  {
    sku: "CNARA500ML",
    barcode: "628678692718",
    name: "500mL Armadillo Armour",
    category: "Additives",
    cost: 9.61,
    price_msrp: 37.99,
  },
  {
    sku: "CNSB500ML",
    barcode: "628678692527",
    name: "500mL Sticky Bandit",
    category: "Additives",
    cost: 4.51,
    price_msrp: 16.99,
  },
  
  // Autoflower Line
  {
    sku: "CNBON500ML",
    barcode: "628678692558",
    name: "500mL Bonnie Vegetation",
    category: "Autoflower Line",
  },
  {
    sku: "CNCYD500ML",
    barcode: "628678692596",
    name: "500mL Clyde Bloom",
    category: "Autoflower Line",
  },
  
  // Shipping Supplies - Boxes
  {
    sku: "S-18343",
    name: '12 x 12 x 8" Lightweight Corrugated Box',
    category: "Shipping Supplies",
    item_type: "box",
    length: 12,
    width: 12,
    height: 8,
    is_smart_box_eligible: true,
  },
  {
    sku: "S-4710",
    name: '12 x 6 x 8" Corrugated Box',
    category: "Shipping Supplies",
    item_type: "box",
    length: 12,
    width: 6,
    height: 8,
    is_smart_box_eligible: true,
  },
  {
    sku: "S-4884",
    name: '12 x 9 x 12" Corrugated Box',
    category: "Shipping Supplies",
    item_type: "box",
    is_smart_box_eligible: true,
  },
  {
    sku: "S-4881",
    name: '4 x 4 x 6" Corrugated Box',
    category: "Shipping Supplies",
    item_type: "box",
    is_smart_box_eligible: true,
  },
  {
    sku: "S-16727",
    name: '5 x 5 x 8" Corrugated Box',
    category: "Shipping Supplies",
    item_type: "box",
    is_smart_box_eligible: true,
  },
  
  // Shipping Supplies - Other
  {
    sku: "LAB010R",
    name: '1 1/4" x 6" Gripper Label',
    category: "Shipping Supplies",
    item_type: "gripper_sticker",
  },
  {
    sku: "S-2350",
    name: 'Kraft Tape - 3" x 375\'',
    category: "Shipping Supplies",
    item_type: "tape",
  },
];
```

**Sample Inventory (multi-location):**

```typescript
const inventory = [
  // Cronk Warehouse
  { sku: "CNMIC1L", location: "Cronk Warehouse", quantity: 643 },
  { sku: "CNGRO1L", location: "Cronk Warehouse", quantity: 672 },
  { sku: "CNBLM1L", location: "Cronk Warehouse", quantity: 593 },
  { sku: "CNCM1L", location: "Cronk Warehouse", quantity: 939 },
  { sku: "CNBB1L", location: "Cronk Warehouse", quantity: 893 },
  { sku: "CNMJ1L", location: "Cronk Warehouse", quantity: 688 },
  
  // Amazon USA
  { sku: "CNARA1L", location: "Amazon USA", quantity: 8 },
  { sku: "CNBB1L", location: "Amazon USA", quantity: 13 },
  { sku: "CNCM1L", location: "Amazon USA", quantity: 1 },
  { sku: "CNMJ1L", location: "Amazon USA", quantity: 9 },
  
  // Amazon Canada  
  { sku: "CN3PRT1L", location: "Amazon Canada", quantity: 1 },
  
  // Shipping Supplies
  { sku: "LAB010R", location: "Cronk Warehouse", quantity: 6179 },
  { sku: "S-18343", location: "Cronk Warehouse", quantity: 157 },
  { sku: "S-4710", location: "Cronk Warehouse", quantity: 90 },
  { sku: "S-4884", location: "Cronk Warehouse", quantity: 236 },
  
  // Labels at Higrocorp (sublocation)
  { sku: "LABEL-1L-MICRO", location: "Cronk Warehouse", sublocation: "Higrocorp", quantity: 461 },
  { sku: "LABEL-1L-GROW", location: "Cronk Warehouse", sublocation: "Higrocorp", quantity: 461 },
];
```

**Locations:**
- Cronk Warehouse (main)
- Amazon USA (FBA)
- Amazon Canada (FBA)

**Sublocations:**
- Higrocorp (supplier holding labels)
- Bin locations (A1-01, B2-03, etc.) - future

---

### 2. Build CSV Import Feature

Create a Settings > Import page with:

**UI Components:**
1. Drag & drop zone for CSV files
2. File type selector: "Product Details" or "Stock Levels"
3. Preview table showing first 10 rows
4. Column mapping interface (if headers don't match exactly)
5. Validation panel showing errors/warnings
6. Import button with progress indicator

**Product Details CSV Expected Columns:**
```
ProductName, SKU, Category, ItemType, BarCode, Cost, 
AMZ, MSRP USD, CAD, CAD WS, US WS, USD DS,
ProductLength, ProductWidth, ProductHeight, ProductWeight,
LastVendor, PurchasingUomRatio2, IsActive, HsCode, CountryOfOrigin
```

**Stock Levels CSV Expected Columns:**
```
ProductName, SKU, Location, Sublocation, Quantity
```

**Import Logic:**
1. Parse CSV using papaparse
2. Validate required fields (SKU is mandatory)
3. For products: upsert by SKU (update if exists, create if new)
4. For stock: aggregate by SKU + Location + Sublocation
5. Show summary: X products updated, Y created, Z errors

**File:** `src/app/settings/import/page.tsx`

---

### 3. Update Inventory Page

- Add "Import CSV" button in header
- Table columns should show: SKU, Name, Category, Cronk WH Qty, Amazon USA Qty, Amazon CA Qty, Total, Cost, MSRP
- Filter by category dropdown
- Search by SKU, Barcode, or Name
- Click row to see item detail

---

### 4. Smart Box Selection Logic

When packing an order:

```typescript
function suggestBox(orderItems: OrderItem[]): Box | Box[] {
  // Calculate total volume needed
  const totalVolume = orderItems.reduce((sum, item) => {
    const product = getProductBySku(item.sku);
    const itemVolume = product.length * product.width * product.height;
    return sum + (itemVolume * item.quantity);
  }, 0);
  
  // Get eligible boxes sorted by volume (smallest first)
  const eligibleBoxes = products
    .filter(p => p.item_type === 'box' && p.is_smart_box_eligible)
    .map(box => ({
      ...box,
      volume: box.length * box.width * box.height
    }))
    .sort((a, b) => a.volume - b.volume);
  
  // Find smallest box that fits
  const suggestedBox = eligibleBoxes.find(box => box.volume >= totalVolume * 1.2); // 20% buffer
  
  if (suggestedBox) {
    return suggestedBox;
  }
  
  // If no single box fits, suggest split shipment
  return calculateSplitShipment(orderItems, eligibleBoxes);
}
```

---

### 5. Update TypeScript Types

```typescript
// src/types/index.ts

interface Product {
  id: string;
  sku: string;           // Primary identifier (e.g., "CNMIC1L")
  barcode?: string;      // UPC (e.g., "628678692282")
  name: string;
  category: string;
  item_type?: 'bottle' | 'box' | 'gripper_sticker' | 'tape' | 'label' | 'merch';
  description?: string;
  
  // Dimensions (inches)
  length?: number;
  width?: number;
  height?: number;
  weight?: number;       // pounds
  volume?: number;       // calculated
  
  // Pricing
  cost: number;          // Base COGS in USD
  price_msrp?: number;
  price_amazon?: number;
  price_cad?: number;
  price_wholesale_cad?: number;
  price_wholesale_usd?: number;
  price_distributor?: number;
  
  // Purchasing
  default_vendor?: string;
  case_pack_qty?: number;  // 12 for 500mL/1L, 4 for 4L
  
  // Linked items
  linked_label_sku?: string;  // For auto-assembly
  
  // Flags
  is_active: boolean;
  is_smart_box_eligible?: boolean;  // For boxes only
  
  // Customs
  hs_code?: string;
  country_of_origin?: string;
}

interface InventoryLevel {
  sku: string;
  location: 'Cronk Warehouse' | 'Amazon USA' | 'Amazon Canada';
  sublocation?: string;  // "Higrocorp", "A1-01", etc.
  quantity: number;
}

interface Order {
  id: string;
  order_number: string;
  channel: 'Shopify' | 'Amazon FBM' | 'Amazon FBA' | 'Manual';
  status: 'pending' | 'to_pick' | 'picking' | 'to_pack' | 'packing' | 'ready_to_ship' | 'shipped';
  customer: {
    name: string;
    email: string;
    address: Address;
  };
  items: OrderItem[];
  totals: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  cogs: number;
  profit: number;
  margin: number;
  shipments: Shipment[];  // Supports split shipments
  created_at: string;
}

interface OrderItem {
  sku: string;
  name: string;
  quantity: number;
  price: number;
  cost: number;
}

interface Shipment {
  id: string;
  order_id: string;
  box_sku?: string;       // Which box was used
  items: { sku: string; quantity: number }[];  // Which items in this box
  gripper_stickers_used: number;
  carrier?: string;
  tracking_number?: string;
  label_url?: string;
  shipped_at?: string;
}
```

---

## Files to Create/Update

### 0. Fix Branding (Do This First!)
- Search and replace "Advanced Nutrients" → "Cronk Nutrients" in ALL files
- Update logo/header text to show "Cronk Nutrients" or "Cronk WMS"
- Make sure supplier references show "HIGROCORP INC." not fake supplier names

1. `src/data/mockData.ts` - Replace with real product structure
2. `src/types/index.ts` - Add TypeScript interfaces
3. `src/app/settings/import/page.tsx` - CSV import page
4. `src/components/import/CsvDropzone.tsx` - Drag & drop component
5. `src/components/import/CsvPreview.tsx` - Preview table
6. `src/components/import/ColumnMapper.tsx` - Map columns UI
7. `src/lib/utils/csvParser.ts` - CSV parsing logic
8. Update `src/app/inventory/page.tsx` - Add import button, use real SKUs
9. Update pack workflow to use smart box selection

Start with mockData.ts and types, then build the CSV import feature.