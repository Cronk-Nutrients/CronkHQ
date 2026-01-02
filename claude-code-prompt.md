# Cronk Nutrients WMS - Full Project Brief for Claude Code

## Project Overview

Build a complete **Warehouse Management System (WMS)** for Cronk Nutrients, a company that sells liquid nutrients via Shopify and Amazon (FBA/FBM). This app **replaces Inflow completely** and becomes the single source of truth for inventory, while still using Veeqo for shipping and Shopify as the storefront.

**Project Location:** `/Volumes/1TB SSD/inventory-app`
**Tech Stack:** Next.js 16 + TypeScript + Tailwind CSS (already initialized)

---

## Current Workflow & Pain Points (Why We're Building This)

**Current Tools:**
- **Shopify** — Storefront, orders come in here
- **Amazon FBM** — Additional sales channel
- **Veeqo** — Order processing, shipping labels (KEEP - cheapest rates)
- **Inflow** — Inventory management, POs, bundles (REPLACING WITH THIS APP)

**Pain Points to Solve:**
1. Jumping between Shopify, Veeqo, and Inflow constantly
2. Manually adjusting stock for boxes and gripper stickers after each order
3. Veeqo's batch picking is clunky — can't unassign orders from bins
4. Manual work orders to track label inventory when bottles arrive
5. FBA prep is done manually in Amazon with stock adjustments in Inflow

**Goal:** One app that handles everything Inflow does, connects to Veeqo for shipping, and automates the tedious manual adjustments.

## CSV Import Feature (Critical)

The app must support importing products and stock levels via CSV upload. This is how Cortland will migrate from Inflow.

**Two CSV formats to support:**

### 1. Product Details Import (inFlow_ProductDetails.csv format)

| Column | Maps To | Notes |
|--------|---------|-------|
| ProductName | name | Display name |
| SKU | sku | **Primary identifier** |
| Category | category | Additives, Classic Line, Autoflower Line, Merch, etc. |
| ItemType | item_type | "Stocked product", "Assembly", etc. |
| BarCode | barcode | UPC code |
| Cost | cost | Base COGS in USD |
| AMZ | price_amazon | Amazon price |
| MSRP USD | price_msrp | Retail price |
| CAD | price_cad | Canadian price |
| CAD WS | price_wholesale_cad | Canadian wholesale |
| US WS | price_wholesale_usd | US wholesale |
| USD DS | price_distributor | Distributor price |
| ProductLength | length | Inches |
| ProductWidth | width | Inches |
| ProductHeight | height | Inches |
| ProductWeight | weight | Pounds |
| LastVendor | default_vendor | Supplier name |
| PurchasingUomRatio2 | case_pack_qty | Units per case (12 for 500mL/1L, 4 for 4L) |
| IsActive | is_active | True/False |
| HsCode | hs_code | For customs |
| CountryOfOrigin | country_of_origin | CA, US, etc. |

### 2. Stock Levels Import (inFlow_StockLevels.csv format)

| Column | Maps To | Notes |
|--------|---------|-------|
| ProductName | name | For reference |
| SKU | sku | **Links to product** |
| Location | location | "Cronk Warehouse", "Amazon USA", "Amazon Canada" |
| Sublocation | sublocation | "Higrocorp" (supplier), bin locations, etc. |
| Quantity | quantity | Stock count |

**Import Features:**
- Drag & drop CSV upload
- Preview data before importing
- Map columns if headers don't match exactly
- Show validation errors (missing SKUs, invalid data)
- Update existing products or create new ones
- Handle duplicate SKUs across locations (sum or replace option)

**Important:** All lookups in the app should use SKU or Barcode as the identifier, not product name.

---

## Real Data Structure (From Inflow Export)

**Locations:**
- Cronk Warehouse (main)
- Amazon USA (FBA)
- Amazon Canada (FBA)

**Sublocations:**
- Higrocorp (supplier who holds labels and assembles bottles)
- Bin locations (A1-01, etc.) — to be added

**Product Categories:**
- Classic Line (Micro, Grow, Bloom)
- Autoflower Line (Bonnie, Clyde)
- Additives (CalMag, Bud Booster, Monkey Juice, Armadillo Armour, Sticky Bandit)
- PuurOrganics Line (PuurBalance, PuurCalMag, PuurK, PuurNitro, PuurPhos)
- Merch (T-shirts, Hoodies, Stickers)
- Shipping Supplies (Boxes, Labels, Tape, Gripper Stickers)

**Product Sizes:**
- 500mL (case pack: 12)
- 1L (case pack: 12)
- 4L (case pack: 4)

**Label Naming Convention:**
- "Front Label 500mL Bloom 0-5-4"
- "Front Label 1L Micro 5-0-1"
- "Front Label 4L CalMag 2-0-0"

**Shipping Supplies in Inventory:**
- Boxes: "12 x 12 x 8" Lightweight Corrugated Box" (SKU: S-18343)
- Boxes: "12 x 6 x 8" Corrugated Box" (SKU: S-4710)
- Boxes: "12 x 9 x 12" Corrugated Box" (SKU: S-4884)
- Boxes: "4 x 4 x 6" Corrugated Box" (SKU: S-4881)
- Boxes: "5 x 5 x 8" Corrugated Box" (SKU: S-16727)
- Gripper Stickers: "1 1/4" x 6" Gripper Label" (SKU: LAB010R)
- Tape: "Kraft Tape - 3" x 375'" (SKU: S-2350)

---

Use this exact design language throughout:

- **Background:** Dark slate (`bg-slate-900`, `bg-slate-800`)
- **Cards:** Glassmorphism effect (`bg-slate-800/50 backdrop-blur border border-slate-700/50`)
- **Primary accent:** Emerald (`emerald-500`, `emerald-400`)
- **Secondary accents:** Amber for warnings, Red for critical, Blue for info, Purple for shipping
- **Text:** White headings, `text-slate-400` for secondary text
- **Rounded corners:** `rounded-xl` for cards, `rounded-lg` for buttons/inputs
- **Shadows:** Subtle glow effects on hover states

---

## Core Features

### 1. Inventory Management
- Track all products with SKU, barcode, cost (COGS), and multiple price points (MSRP, Shopify, Amazon, Wholesale, Distributor)
- **Bin/Location tracking** (e.g., A1-01, B2-03) for warehouse organization
- **Multi-location inventory:** Texas Warehouse, Amazon FBA, Amazon FBM
- Track non-sellable items: bottle labels, gripper stickers, tape, boxes
- **Inventory valuation:** Show total MSRP value and cost value by location
- **Weighted average costing** - auto-update COGS when POs are received
- **Low stock alerts** with reorder points
- **Lot/Batch tracking** for traceability

### 2. Bundle Management
- Virtual bundles (e.g., "1L Big Bud Kit" = 1L Micro + 1L Grow + 1L Bloom + 1L Bud Booster + 1L CalMag)
- **Bundle availability = MIN(component_qty / qty_per_bundle)**
- Sync bundle availability to Shopify and Amazon
- Show which component is the "limiting item"

### 3. Bill of Materials (BOM) & Work Orders
- Manufacturing/assembly work orders
- Consume components → produce finished SKUs
- Track labor time, materials used, yield
- Work order statuses: Draft, In Progress, Completed

### 4. Fulfillment Rules Engine (AUTO-DEDUCTIONS)

This is a key feature that eliminates manual work:

**Gripper Stickers — Auto-Deduct**
- When an order is picked/packed, automatically deduct gripper stickers
- Rule: **1 gripper sticker per bottle (regardless of size — 500mL, 1L, or 4L)**
- Deduct from inventory automatically — no manual adjustment needed

**Smart Box Selection (Volume-Based)**
- Each box in inventory has dimensions (L × W × H) → system calculates volume
- Each product has dimensions stored → system knows product volumes
- System calculates total volume of items in order → suggests best-fit box
- **Box Eligibility Setting:** Boxes can be marked as "Smart Box Eligible" or not
  - Only eligible boxes are used in smart selection
  - User can deselect boxes they don't want auto-assigned
- **Manual Override:** User can always override the suggested box
- Box is auto-deducted from inventory when order ships

**Split Shipments**
- Sometimes one order needs multiple boxes
- User can split an order into 2+ shipments
- Each shipment gets its own box assignment and tracking number
- System tracks which items go in which box

**How It Works:**
1. Order comes in with 3x 1L bottles + 2x 4L bottles
2. System calculates total volume needed
3. System suggests "Box C" (or split into 2 boxes if too big)
4. System calculates: 5 gripper stickers needed (1 per bottle)
5. User can accept suggestion or manually override box selection
6. When order ships:
   - Deduct 5 gripper stickers from inventory
   - Deduct box(es) from inventory
   - All automatic, no manual entry

### 5. Orders Management
- Pull orders from Shopify (webhooks) and Amazon (via Veeqo or direct)
- Order statuses: To Pick, To Pack, Ready to Ship, Shipped, Delivered
- Show per-order profitability: Revenue, COGS, Profit, Margin %
- Filter by channel, status, date range
- Bulk actions (assign to batch, print pick lists)

### 6. Pick Workflow (Separate Page)

**Improvements over Veeqo's picking:**
- **Can unassign orders from bins/totes** (Veeqo doesn't allow this)
- More flexible batch management
- Better visibility into what's being picked

**Features:**
- **Batch/Wave picking** — group orders into pick waves
- Assign orders to pick batches
- **Unassign orders** from batches if needed (fix Veeqo limitation)
- Scanner input to scan tote barcode → assigns order to tote
- Mobile-friendly pick interface showing: Item, SKU, Qty, Bin Location
- Pick statuses: Queued, Assigned to Batch, In Progress, Completed
- See all orders in a batch, move orders between batches

### 7. Pack Workflow (Separate Page)
- Scan tote barcode → pulls up order details
- Verify items scanned match order
- **Live shipping rates from Veeqo** - show carrier options (USPS, UPS, FedEx)
- Select carrier → buy label → mark shipped
- Print packing slip and shipping label

### 8. FBA Prep Workflow (Separate Page)
- Create FBA shipment → select SKUs and quantities
- Move inventory from "Texas WH" to "FBA Prep Station"
- Case pack requirements: 12 units for 500mL/1L, 4 units for 4L
- Track prep tasks: gripper stickers, kitting bundles, labeling, palletizing
- Different COGS tracking for FBA prep costs

### 9. Purchase Orders

**Standard PO Flow:**
- Create POs to suppliers (support CAD and USD)
- Auto-convert CAD → USD using exchange rate
- Receive POs → update inventory and recalculate weighted avg cost
- PO statuses: Draft, Sent, Partially Received, Received

**AUTO-ASSEMBLY for Labels (Key Feature):**

Cortland orders labels from Supplier A, and bottles from Supplier B. Supplier B applies the labels at their factory. The system needs to handle this automatically.

**Label Structure:**
- Each product has 3 label sizes: 500mL, 1L, 4L
- Example label SKUs: `Label-Micro-500mL`, `Label-Micro-1L`, `Label-Micro-4L`
- Labels are tracked as separate inventory items with their own cost

**When CREATING a PO for Bottles (not on receive):**
1. User creates PO for 240x "1L Micro" bottles at $5.00 each
2. System detects this product has a linked label (`Label-Micro-1L`)
3. System **immediately** deducts 240x labels from label inventory (matches PO qty)
4. System adds label cost ($0.26) to the product's COGS
5. Final COGS for "1L Micro" = $5.00 (bottle) + $0.26 (label) = **$5.26**

**Why deduct on PO creation (not receive)?**
- Labels are already at the supplier's factory when you order bottles
- This reflects reality: labels are "consumed" when you place the bottle order
- Gives early warning if label inventory is low before ordering bottles

**This solves:**
- No manual work orders for label assembly
- Label inventory is auto-tracked and deducted at the right time
- COGS always includes true landed cost (bottle + label)
- Can see when labels are running low before ordering more bottles
- Works with any PO quantity (200, 240, 300, 500, etc.)

### 10. SKU Mapping
- Map internal SKUs to Shopify variant IDs and Amazon ASINs/SKUs
- Handle cases where one product has different SKUs per channel

### 11. Reports & Dashboard
- **Date range picker:** Today, WTD, MTD, YTD, Custom
- **Key metrics:** Revenue, Gross Profit, COGS, AOV, Units Sold
- **Inventory valuation** by location with unrealized profit
- **Channel performance:** Shopify vs Amazon side-by-side
- **Fulfillment pipeline:** To Pick → To Pack → Ready to Ship → Shipped
- On-time shipping rate
- Best/worst selling SKUs
- Inventory turnover, dead stock alerts

### 12. Settings & Integrations
- Shopify connection (API key, store URL)
- Amazon connection (via Veeqo or direct SP-API)
- Veeqo connection (API key)
- Warehouse locations setup
- Fulfillment rules configuration
- User management

---

## Integration Strategy (For Future Phases)

**This App = Inventory Brain + WMS**
**Veeqo = Shipping Backend (rates + labels)**
**Shopify = Storefront**

```
┌─────────────────────────────────────────────────────────────────┐
│                     CRONK WMS (This App)                        │
│                                                                 │
│  • Inventory management (replaces Inflow)                       │
│  • Bundle calculations                                          │
│  • Pick/Pack workflows (better than Veeqo's)                    │
│  • POs with auto-label-assembly                                 │
│  • Work orders                                                  │
│  • FBA Prep tracking                                            │
│  • Auto-deductions (gripper stickers, boxes)                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
         │                                    │
         ▼                                    ▼
   ┌───────────┐                        ┌───────────┐
   │  VEEQO    │                        │  SHOPIFY  │
   │           │                        │           │
   │ • Rates   │                        │ • Orders  │
   │ • Labels  │                        │ • Products│
   │ • Tracking│                        │ • Inventory│
   └───────────┘                        └───────────┘
```

---

> **Skip this section for now.** This is just documentation for when we add integrations later.

### Shopify Admin API
- **Pull:** Products/variants, orders (webhooks), current inventory
- **Push:** Inventory levels, fulfillment status, tracking numbers
- **Carrier Service API:** Live shipping rates at checkout (via Veeqo rates)

### Veeqo API (Primary shipping layer)
- **Pull:** Shipping rates, tracking numbers, shipment status
- **Push:** Orders ready to ship
- Use Veeqo as bridge to avoid direct Amazon SP-API complexity
- Endpoint: `https://api.veeqo.com/`
- Auth: API key in header

### Amazon SP-API (Optional - can use Veeqo as bridge)
- **Pull:** FBA inventory levels, FBA/FBM orders
- **Push:** FBM inventory quantities

---

## Data Architecture (Based on Real Inflow Data)

### Products Table
```
products {
  id
  sku (UNIQUE - primary lookup key)
  barcode (UNIQUE - secondary lookup key)
  name
  category (Classic Line, Additives, Autoflower Line, PuurOrganics, Merch, Shipping Supplies)
  item_type (Stocked product, Assembly, Service, etc.)
  description
  
  // Dimensions
  length
  width  
  height
  weight
  volume (calculated: L × W × H)
  
  // Costs
  cost (base COGS in USD)
  
  // Multiple Price Points
  price_msrp
  price_amazon
  price_cad
  price_wholesale_cad
  price_wholesale_usd
  price_distributor
  
  // Purchasing
  default_vendor
  case_pack_qty (12 for 500mL/1L, 4 for 4L)
  
  // Linked Label (for auto-assembly)
  linked_label_sku (e.g., "Front Label 1L Micro 5-0-1")
  
  // Flags
  is_active
  is_smart_box_eligible (for boxes only)
  hs_code
  country_of_origin
}
```

### Inventory Table
```
inventory {
  id
  sku (links to products)
  location (Cronk Warehouse, Amazon USA, Amazon Canada)
  sublocation (Higrocorp, bin location like A1-01, etc.)
  quantity
}
```

### Labels Table (Products that are labels)
```
- Labels are just products with category "Labels" or names starting with "Front Label"
- They have their own SKU and inventory
- They link to bottle products via the linked_label_sku field on the bottle
```

### Shipping Supplies
```
- Boxes, tape, gripper stickers are products with category "Shipping Supplies"
- Boxes have is_smart_box_eligible flag
- Gripper stickers SKU: LAB010R
```

### Orders & Fulfillment
- `orders` - id, channel, status, customer info, totals, profit
- `order_items` - order_id, product_id, quantity, price, cost
- `shipments` - id, order_id, box_id, carrier, tracking, label_url, shipped_at (supports multiple shipments per order for split shipments)
- `shipment_items` - shipment_id, order_item_id, quantity (which items in which box)
- `pick_batches` - id, status, assigned_to, created_at
- `pick_batch_orders` - batch_id, order_id, tote_barcode

### Purchasing
- `purchase_orders` - id, supplier, status, currency, exchange_rate
- `po_line_items` - po_id, product_id, quantity, unit_cost

### Work Orders
- `work_orders` - id, product_id (output), status, quantity, notes
- `work_order_inputs` - work_order_id, component_id, quantity_used

### SKU Mapping
- `sku_mappings` - product_id, channel (shopify/amazon), external_sku, external_id

---

## 13 HTML Demo Pages (Reference for UI)

These demo files show the exact UI design to replicate. Convert each to React/Next.js pages:

| # | Page | Route | Demo File |
|---|------|-------|-----------|
| 1 | Dashboard | `/` | `demo-01-dashboard.html` |
| 2 | Inventory List | `/inventory` | `demo-02-inventory.html` |
| 3 | Orders | `/orders` | `demo-03-orders.html` |
| 4 | Pick & Pack Overview | `/pick-pack` | `demo-04-pick-pack.html` |
| 5 | Pick Station | `/pick` | `demo-05-pick.html` |
| 6 | Pack Station | `/pack` | `demo-06-pack.html` |
| 7 | FBA Prep | `/fba-prep` | `demo-07-fba-prep.html` |
| 8 | Item Detail | `/inventory/[id]` | `demo-08-item-detail.html` |
| 9 | Purchase Orders | `/purchase-orders` | `demo-09-purchase-orders.html` |
| 10 | Work Orders | `/work-orders` | `demo-10-work-orders.html` |
| 11 | Bundles | `/bundles` | `demo-11-bundles.html` |
| 12 | Reports | `/reports` | `demo-12-reports.html` |
| 13 | Settings | `/settings` | `demo-13-settings.html` |

---

## Suggested Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with sidebar
│   ├── page.tsx                # Dashboard
│   ├── inventory/
│   │   ├── page.tsx            # Inventory list
│   │   └── [id]/page.tsx       # Item detail
│   ├── orders/page.tsx
│   ├── pick/page.tsx
│   ├── pack/page.tsx
│   ├── fba-prep/page.tsx
│   ├── purchase-orders/page.tsx
│   ├── work-orders/page.tsx
│   ├── bundles/page.tsx
│   ├── reports/page.tsx
│   └── settings/page.tsx
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── PageWrapper.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   ├── Input.tsx
│   │   └── Select.tsx
│   ├── dashboard/
│   │   ├── StatsCard.tsx
│   │   ├── ChannelPerformance.tsx
│   │   └── FulfillmentPipeline.tsx
│   ├── inventory/
│   │   ├── InventoryTable.tsx
│   │   ├── ItemDetailCard.tsx
│   │   └── StockAdjustModal.tsx
│   ├── orders/
│   │   ├── OrdersTable.tsx
│   │   ├── OrderDetailSlideOver.tsx
│   │   └── OrderFilters.tsx
│   ├── pick/
│   │   ├── PickQueue.tsx
│   │   ├── BatchAssignment.tsx
│   │   └── PickInterface.tsx
│   └── pack/
│       ├── PackStation.tsx
│       ├── ShippingRates.tsx
│       └── LabelPrint.tsx
├── lib/
│   └── utils/
│       ├── calculations.ts     # Bundle availability, margins, etc.
│       └── formatters.ts       # Currency, date formatting
├── context/
│   └── AppContext.tsx          # Global state for mock data
├── hooks/
│   ├── useInventory.ts
│   ├── useOrders.ts
│   └── useBundles.ts
├── types/
│   └── index.ts                # TypeScript interfaces
└── data/
    └── mockData.ts             # Fake data for development
```

---

## Current Phase: Frontend Only (No APIs Yet)

**IMPORTANT:** We are ONLY building the frontend UI right now. No API integrations, no webhooks, no database connections yet. Everything runs on mock data and local state.

### What to Build Now:
1. Set up shared layout (Sidebar, Header)
2. Convert all 13 HTML demos to React components
3. Create comprehensive mock data for all entities
4. Make all navigation work between pages
5. Make all modals, forms, dropdowns, and interactions functional
6. Use React state (useState, useContext) for all data
7. Make filters, search, and sorting work on mock data
8. Make the date range picker update dashboard numbers

### What NOT to Build Yet:
- ❌ No API calls to Shopify, Veeqo, or Amazon
- ❌ No webhooks
- ❌ No database or Supabase
- ❌ No authentication/login
- ❌ No server actions or API routes

### Goal:
A fully clickable, functional prototype that looks and feels like a real app, but runs entirely on fake data. This lets us perfect the UI/UX before adding backend complexity.

---

## Future Phases (Later - Not Now)

**Phase 2:** Database & Auth (Supabase)
**Phase 3:** Shopify Integration
**Phase 4:** Veeqo Integration  
**Phase 5:** Amazon + Advanced Features

---

## Key Formulas

**Bundle Availability:**
```
availability = MIN(component_qty / qty_per_bundle) for each component
```

**Weighted Average Cost (on PO receipt):**
```
new_avg = (old_qty × old_cost + new_qty × new_cost) / (old_qty + new_qty)
```

**Margin Calculation:**
```
margin = (price - cost) / price × 100
```

**CAD to USD Conversion:**
```
usd_amount = cad_amount × exchange_rate
```

**Box Volume Calculation:**
```
box_volume = length × width × height
product_volume = length × width × height
order_volume = SUM(product_volume × quantity) for each item
suggested_box = smallest eligible box where box_volume >= order_volume
```

**COGS with Auto-Label Assembly:**
```
product_cogs = bottle_cost + label_cost
Example: $5.00 + $0.26 = $5.26
```

**Gripper Stickers per Order:**
```
stickers_needed = total_bottles_in_order × 1
```

---

## First Task for Claude Code

Start by creating the foundation:

1. **`src/components/layout/Sidebar.tsx`** - Navigation sidebar matching the demo design with working links
2. **`src/components/layout/Header.tsx`** - Top header with date picker, sync status (fake), notifications
3. **`src/app/layout.tsx`** - Root layout that wraps all pages with Sidebar + Header
4. **`src/data/mockData.ts`** - Use REAL product structure from Inflow export:
   - Products with actual SKUs (CNMIC1L, CNBLM500ML, etc.)
   - Real barcodes (628678692282, etc.)
   - Multiple price points (AMZ, MSRP USD, Wholesale, etc.)
   - Actual dimensions and weights
   - Real categories (Classic Line, Additives, Autoflower Line)
   - Stock levels by location (Cronk Warehouse, Amazon USA, Amazon Canada)
   - Labels as separate inventory items ("Front Label 1L Micro 5-0-1")
   - Boxes with ULINE SKUs (S-18343, S-4710, etc.)
   - Gripper stickers (LAB010R)
5. **`src/app/page.tsx`** - Dashboard page converted from `demo-01-dashboard.html`
6. **CSV Import components** - For uploading product and stock data

**Critical:** All product lookups must use **SKU** or **Barcode** as the identifier, NOT product name. This is how the system will match data from Shopify/Veeqo/Amazon.

Then proceed through each page in order (Inventory, Orders, Pick, Pack, etc.)

**Remember:** All data comes from mockData.ts - no API calls. Use useState/useContext for state management.

---

## Notes

- **Company Name:** Cronk Nutrients (NOT "Advanced Nutrients" — fix any references)
- **Product sizes:** 500mL, 1L, and 4L bottles
- **Labels:** Each product has 3 label SKUs (one per size) — e.g., `Label-Micro-500mL`, `Label-Micro-1L`, `Label-Micro-4L`
- **Bundles** are "kits" containing multiple products (e.g., "1L Big Bud Kit")
- **Gripper stickers:** Always 1 per bottle, regardless of size
- The owner's name is Cortland
- **Currency:** Primary USD, but Canadian suppliers invoice in CAD
- **Warehouse location:** Texas (called "Cronk Warehouse" in inventory)
- **Primary Supplier:** HIGROCORP INC. — Canadian company that manufactures the nutrients and applies labels at their factory
- **Label Supplier:** Separate supplier (ships labels directly to Higrocorp)
- **Channels:** Shopify (primary), Amazon FBM, Amazon FBA (USA and Canada)