# Cronk WMS — Master To-Do List

## ✅ PHASE 1: Foundation (Prompts 1-17)

Run these prompts in Claude Code first:

- [ ] 01 - Foundation, Context, Toast System
- [ ] 02 - Inventory Functionality
- [ ] 03 - Bundles Functionality
- [ ] 04 - Orders Functionality
- [ ] 05 - Purchase Orders Functionality
- [ ] 06 - Work Orders Functionality
- [ ] 07 - Settings Functionality
- [ ] 08 - Pick & Pack Functionality
- [ ] 09 - Shipping, Dashboard, FBA, Reports
- [ ] 10 - Returns Management
- [ ] 11 - Cycle Counting / Stock Counts
- [ ] 12 - Stock Transfers
- [ ] 13 - Automation Rules
- [ ] 14 - Serial Number Tracking
- [ ] 15 - Lot/Batch Tracking
- [ ] 16 - Supplier Management
- [ ] 17 - Pick & Pack Navigation Restructure

---

## 🔥 PHASE 2: Data & Auth

### Firebase Integration
- [ ] Setup Firebase project
- [ ] Firestore database structure
- [ ] Replace mock data with Firestore
- [ ] Real-time listeners for live updates
- [ ] Data persistence across sessions

### Authentication
- [ ] Firebase Auth setup
- [ ] Login / Signup pages
- [ ] Password reset flow
- [ ] Auto-approve @cronknutrients.com emails
- [ ] Session management

### User Roles & Permissions
- [ ] Admin role (full access)
- [ ] Warehouse Associate role (no cost/profit data)
- [ ] Role-based UI hiding
- [ ] Role-based route protection

---

## 🔌 PHASE 3: Integrations

### Shopify Integration
- [ ] OAuth flow for connecting stores
- [ ] Import products from Shopify
- [ ] Import orders from Shopify
- [ ] Sync inventory levels TO Shopify
- [ ] Update order status in Shopify
- [ ] Add tracking numbers to Shopify
- [ ] **Read/Write toggles per operation**
- [ ] Webhook receivers for real-time updates
- [ ] Multi-store support

### Veeqo Integration
- [ ] API connection setup
- [ ] Pull shipping rates
- [ ] Purchase shipping labels
- [ ] Mark orders as shipped
- [ ] Sync tracking numbers
- [ ] **Read/Write toggles per operation**

### Future Integrations (Phase 5+)
- [ ] Amazon Seller Central
- [ ] QuickBooks / Xero accounting
- [ ] TikTok Shop
- [ ] Walmart Marketplace
- [ ] Klaviyo / email marketing
- [ ] EDI support (for big retailers)

---

## 📦 PHASE 4: Warehouse Operations

### Bin/Location Management
- [ ] Define warehouse zones (A, B, C...)
- [ ] Define aisles within zones
- [ ] Define bins/shelves within aisles
- [ ] Assign products to bins
- [ ] Bin capacity tracking
- [ ] Visual warehouse map
- [ ] Bin labels printing

### Put-Away Suggestions
- [ ] Suggest bin on receive based on:
  - [ ] Product velocity (fast movers near pack station)
  - [ ] Product size/weight
  - [ ] Available bin capacity
  - [ ] Product category grouping
- [ ] Put-away task queue

### Pick Path Optimization
- [ ] Calculate optimal pick route
- [ ] Sort pick list by location
- [ ] Zone-based wave picking
- [ ] Batch orders by zone
- [ ] Visual pick path display

### Wave/Batch Picking Enhancements
- [ ] Create waves by zone
- [ ] Create waves by carrier/service
- [ ] Create waves by ship-by date
- [ ] Wave progress tracking
- [ ] Wave assignment to pickers

### Mobile/Tablet Mode
- [ ] Responsive pick interface
- [ ] Large buttons for touch
- [ ] Camera barcode scanning
- [ ] Offline mode with sync
- [ ] PWA (installable app)

---

## 🏷️ PHASE 5: Labels & Printing

### Barcode Generation
- [ ] Generate UPC barcodes
- [ ] Generate SKU barcodes
- [ ] Generate FNSKU labels (Amazon)
- [ ] Generate bin location labels
- [ ] QR codes for products
- [ ] Batch print labels

### Label Designer
- [ ] Custom packing slip template
- [ ] Custom invoice template
- [ ] Custom shipping label additions
- [ ] Brand logo placement
- [ ] Variable data fields
- [ ] Template preview
- [ ] Multiple templates per use case

### Print Station
- [ ] Printer configuration
- [ ] Test print function
- [ ] Print queue management
- [ ] Reprint functionality
- [ ] Print history/log

---

## 📊 PHASE 6: Analytics & Forecasting

### Demand Forecasting
- [ ] Sales velocity calculation (daily/weekly/monthly)
- [ ] Trend detection (growing/declining)
- [ ] Seasonality patterns
- [ ] Forecast next 30/60/90 days
- [ ] Visual forecast chart

### Reorder Intelligence
- [ ] Auto-calculate reorder point based on:
  - [ ] Average daily sales
  - [ ] Supplier lead time
  - [ ] Safety stock buffer
- [ ] Reorder quantity suggestions
- [ ] "Days until stockout" calculation
- [ ] Stockout risk alerts

### ABC Classification
- [ ] Auto-classify products:
  - [ ] A = Top 20% (80% of revenue)
  - [ ] B = Middle 30%
  - [ ] C = Bottom 50%
- [ ] Classification by revenue
- [ ] Classification by velocity
- [ ] Classification by profit margin
- [ ] Visual ABC breakdown

### Inventory Health
- [ ] Dead stock report (no sales in X days)
- [ ] Slow movers report
- [ ] Overstock report
- [ ] Inventory aging (days in stock)
- [ ] Inventory value by age bucket
- [ ] Shrinkage tracking

### Performance Dashboards
- [ ] Warehouse productivity (picks/hour, packs/hour)
- [ ] Order accuracy rate
- [ ] On-time shipping rate
- [ ] Carrier performance comparison
- [ ] Employee performance (if tracked)

---

## 💰 PHASE 7: Financial & Costing

### Landed Cost
- [ ] Add freight cost to PO
- [ ] Add duties/customs to PO
- [ ] Add handling fees to PO
- [ ] Calculate per-unit landed cost
- [ ] Update product cost with landed cost
- [ ] Landed cost history

### Profitability Enhancements
- [ ] Profit by channel
- [ ] Profit by product
- [ ] Profit by customer (B2B)
- [ ] Profit by time period
- [ ] Margin trend charts
- [ ] Profit leaderboard (top products)

### Cost Tracking
- [ ] Track cost changes over time
- [ ] Weighted average cost method
- [ ] FIFO costing option
- [ ] Cost variance alerts
- [ ] Supplier cost comparison

---

## 🛒 PHASE 8: Order Enhancements

### Backorder Management
- [ ] Mark items as backordered
- [ ] Track backorder queue
- [ ] Auto-allocate when stock arrives
- [ ] Customer notification integration
- [ ] Backorder ETA tracking
- [ ] Backorder reports

### Address Validation
- [ ] USPS address verification API
- [ ] Auto-correct addresses
- [ ] Flag suspicious addresses
- [ ] Residential vs commercial detection
- [ ] Address standardization

### Partial Shipments
- [ ] Ship available items now
- [ ] Hold remaining for later shipment
- [ ] Track split shipments on one order
- [ ] Customer communication

### Order Tags & Flags
- [ ] Custom order tags
- [ ] Auto-tag rules
- [ ] Visual tag filters
- [ ] Priority flags
- [ ] Hold flags
- [ ] Fraud risk flags

---

## 🚚 PHASE 9: Shipping Enhancements

### Rate Shopping
- [ ] Compare USPS vs UPS vs FedEx
- [ ] Show cheapest option
- [ ] Show fastest option
- [ ] Factor in dimensional weight
- [ ] Save rate preferences
- [ ] Carrier account integration

### Shipping Rules
- [ ] Auto-select carrier by weight
- [ ] Auto-select carrier by destination
- [ ] Auto-select carrier by order value
- [ ] Signature required rules
- [ ] Insurance rules
- [ ] Saturday delivery rules

### Carrier Performance
- [ ] Track delivery times
- [ ] Track damage rates
- [ ] Track on-time percentage
- [ ] Cost per package by carrier
- [ ] Carrier scorecards

### International Shipping
- [ ] Customs forms (CN22, CN23)
- [ ] HS code management
- [ ] Country of origin tracking
- [ ] Duties estimation
- [ ] Restricted items warnings

---

## 🏢 PHASE 10: B2B & Wholesale (Future)

### Wholesale Pricing
- [ ] Multiple price lists
- [ ] Customer group assignments
- [ ] Tiered pricing (buy more = save more)
- [ ] Contract pricing
- [ ] Price list effective dates

### B2B Customer Portal
- [ ] Customer login
- [ ] View order history
- [ ] Reorder past orders
- [ ] View invoices
- [ ] Download statements
- [ ] Submit orders

### Credit Management
- [ ] Credit limits per customer
- [ ] Payment terms (Net 30/60/90)
- [ ] Credit hold automation
- [ ] Aging reports
- [ ] Payment reminders

### B2B Orders
- [ ] Quote/estimate creation
- [ ] Quote to order conversion
- [ ] Minimum order quantities
- [ ] Minimum order values
- [ ] Custom catalogs per customer

---

## ⚡ PHASE 11: Quick Wins & Polish

### Search & Navigation
- [ ] Global search (Cmd+K / Ctrl+K)
- [ ] Search products, orders, POs, customers
- [ ] Recent items list
- [ ] Keyboard shortcuts throughout
- [ ] Breadcrumb navigation

### Bulk Operations
- [ ] Bulk edit products
- [ ] Bulk adjust stock
- [ ] Bulk print labels
- [ ] Bulk update prices
- [ ] Bulk assign bins

### Custom Fields
- [ ] Add custom fields to products
- [ ] Add custom fields to orders
- [ ] Add custom fields to customers
- [ ] Custom field types (text, number, date, dropdown)
- [ ] Filter/search by custom fields
- [ ] Include in exports

### Saved Views
- [ ] Save filter combinations
- [ ] Name saved views
- [ ] Quick switch between views
- [ ] Share views with team

### Quality of Life
- [ ] Duplicate product detection
- [ ] SKU format validation
- [ ] Barcode validation
- [ ] Undo recent actions
- [ ] Dark/Light mode toggle
- [ ] Notification preferences
- [ ] Email summary options

---

## 🔒 PHASE 12: Security & Compliance

### Audit Trail
- [ ] Log all data changes
- [ ] Who changed what, when
- [ ] Before/after values
- [ ] Audit log search
- [ ] Audit log export
- [ ] Retention policy

### Activity Logging
- [ ] User login history
- [ ] Actions per user
- [ ] Session tracking
- [ ] Suspicious activity alerts

### Data Management
- [ ] Data export (full backup)
- [ ] Data import
- [ ] GDPR compliance tools
- [ ] Data retention settings
- [ ] Account deletion flow

### Compliance Features
- [ ] FDA lot tracking requirements
- [ ] COA (Certificate of Analysis) attachments
- [ ] Expiration date enforcement
- [ ] Recall management
- [ ] Compliance reports

---

## 🚀 PHASE 13: SaaS Productization

### Multi-Tenant Architecture
- [ ] Tenant/organization model
- [ ] Data isolation per tenant
- [ ] Tenant-specific settings
- [ ] Tenant switching (for agencies)

### Onboarding
- [ ] Welcome wizard
- [ ] Setup checklist
- [ ] Sample data option
- [ ] Integration connection flow
- [ ] Video tutorials

### Billing & Subscriptions
- [ ] Stripe integration
- [ ] Subscription management
- [ ] Invoice generation
- [ ] Usage tracking (if needed)
- [ ] Plan upgrades/downgrades
- [ ] Cancellation flow

### White Labeling (Optional)
- [ ] Custom logo
- [ ] Custom colors
- [ ] Custom domain
- [ ] Remove "Powered by" branding

---

## 📱 PHASE 14: Mobile App (Future)

### Native Mobile App
- [ ] iOS app
- [ ] Android app
- [ ] Camera scanning
- [ ] Push notifications
- [ ] Offline mode
- [ ] Pick/Pack focused interface

---

## 📋 Summary Counts

| Phase | Items | Priority |
|-------|-------|----------|
| Phase 1: Foundation Prompts | 17 | 🔴 NOW |
| Phase 2: Data & Auth | 11 | 🔴 HIGH |
| Phase 3: Integrations | 17 | 🔴 HIGH |
| Phase 4: Warehouse Ops | 23 | 🟡 MEDIUM |
| Phase 5: Labels & Printing | 18 | 🟡 MEDIUM |
| Phase 6: Analytics | 25 | 🟡 MEDIUM |
| Phase 7: Financial | 16 | 🟡 MEDIUM |
| Phase 8: Order Enhancements | 18 | 🟡 MEDIUM |
| Phase 9: Shipping | 18 | 🟡 MEDIUM |
| Phase 10: B2B | 17 | 🟢 LATER |
| Phase 11: Quick Wins | 22 | 🟡 ONGOING |
| Phase 12: Security | 16 | 🟡 MEDIUM |
| Phase 13: SaaS | 14 | 🟢 LATER |
| Phase 14: Mobile | 6 | 🟢 LATER |

**Total: ~220 feature items**

---

## Next Steps

1. ✅ Complete prompts 01-17
2. Test everything thoroughly
3. Come back here, pick next phase
4. I'll write the prompts for that phase

Good luck! 🚀
