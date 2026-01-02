# Cronk WMS - Feature Roadmap & TODO List

> **Last Updated:** January 2, 2025
> **Current Prompts Completed:** 1-23
> **Status:** Building comprehensive WMS/Ecom Management Tool

---

## ✅ Completed Features (Prompts 1-23)

| # | Feature | Status |
|---|---------|--------|
| 01 | Project Foundation & Setup | ✅ Done |
| 02 | Dashboard Layout | ✅ Done |
| 03 | Inventory Management | ✅ Done |
| 04 | Product Details | ✅ Done |
| 05 | Orders Management | ✅ Done |
| 06 | Order Details | ✅ Done |
| 07 | Pick Station | ✅ Done |
| 08 | Pack Station | ✅ Done |
| 09 | FBA Prep | ✅ Done |
| 10 | Purchase Orders | ✅ Done |
| 11 | Work Orders / Manufacturing | ✅ Done |
| 12 | Bundles & Kits | ✅ Done |
| 13 | Returns Management | ✅ Done |
| 14 | Stock Transfers | ✅ Done |
| 15 | Cycle Counts | ✅ Done |
| 16 | Shipping Analytics | ✅ Done |
| 17 | Supplier Management | ✅ Done |
| 18 | Sidebar Navigation Restructure | ✅ Done |
| 19 | Deep Links & Self-Test | ✅ Done |
| 20 | Settings Page Redesign | ✅ Done |
| 21 | Marketing Dashboard | ✅ Done |
| 22 | Comprehensive Reports | ✅ Done |
| 23 | Dashboard Marketing Metrics | ✅ Done |

---

## 🔴 CRITICAL PRIORITY (Must Have Before Launch)

### Authentication & Security
- [ ] **24. Authentication System**
  - User login/logout
  - Password reset flow
  - Session management
  - Remember me functionality
  - Secure token storage

- [ ] **25. User Roles & Permissions**
  - Admin role (full access)
  - Warehouse role (no costs/financials)
  - Viewer role (read-only)
  - Role-based menu visibility
  - Permission checks on actions

### Data Persistence
- [ ] **26. Firebase Integration**
  - Firestore database setup
  - Real-time data sync
  - Data models for all entities
  - CRUD operations
  - Offline persistence

### Core UX Features
- [ ] **27. Global Search (Cmd+K)**
  - Search all entities (orders, products, customers, POs)
  - Keyboard shortcut activation
  - Recent searches
  - Quick actions from search
  - Fuzzy matching

- [ ] **28. Notifications Center**
  - Bell icon in header
  - Real-time notifications
  - Low stock alerts
  - Order alerts
  - Integration sync errors
  - Mark as read/unread
  - Notification preferences

- [ ] **29. Bulk Operations**
  - Multi-select rows with checkboxes
  - Bulk edit products
  - Bulk update inventory
  - Bulk status change orders
  - Bulk delete with confirmation
  - Bulk export selected

- [ ] **30. Audit Trail / Activity Log**
  - Track all changes (who, what, when)
  - Activity feed on dashboard
  - Entity-level history (product history, order history)
  - Filter by user/action/date
  - Export audit logs

### Customer Management
- [ ] **31. Customer Database**
  - Customer list page
  - Customer detail page
  - Order history per customer
  - Customer LTV calculation
  - Customer tags/groups
  - Customer notes
  - Customer search

### Order Management
- [ ] **32. Backorder Management**
  - Track backorders separately
  - Auto-fulfill when stock arrives
  - Backorder queue
  - Customer notification settings
  - Backorder reports

### Warehouse Operations
- [ ] **33. Bin/Location Management**
  - Create warehouse zones
  - Create aisles, racks, shelves, bins
  - Visual warehouse map
  - Assign products to bins
  - Bin capacity tracking
  - Pick path display

---

## 🟡 HIGH PRIORITY (Phase 2 - Post Launch)

### Warehouse Operations
- [ ] **34. Barcode Generation**
  - Generate UPC barcodes
  - Generate SKU labels
  - Generate FNSKU labels
  - Generate bin labels
  - Print label sheets
  - Barcode preview

- [ ] **35. Mobile/Tablet Mode (PWA)**
  - Responsive warehouse interface
  - Touch-optimized pick screen
  - Touch-optimized pack screen
  - Camera barcode scanning
  - Offline capability
  - Install as app

- [ ] **36. Wave Picking**
  - Create pick waves by carrier
  - Create pick waves by zone
  - Create pick waves by priority
  - Wave progress tracking
  - Wave completion

- [ ] **37. Put-Away Suggestions**
  - Suggest bin based on product category
  - Suggest bin based on velocity
  - Suggest bin based on proximity
  - Override suggestions
  - Learn from patterns

### Financial Features
- [ ] **38. Landed Cost Tracking**
  - Add freight costs to POs
  - Add duty/customs costs
  - Add other fees
  - Calculate true COGS
  - Landed cost per unit
  - Cost breakdown reports

- [ ] **39. Multi-Currency Support**
  - Set base currency
  - Add exchange rates
  - Currency conversion on POs
  - Currency display preferences
  - Historical rates

### Inventory Features
- [ ] **40. Lot/Batch Expiration Management**
  - Expiration date tracking
  - FEFO picking (First Expired, First Out)
  - Expiration alerts (30/60/90 days)
  - Expired lot reports
  - Quarantine expired lots

- [ ] **41. Serial Number Tracking**
  - Enable per product
  - Capture on receiving
  - Track through fulfillment
  - Serial number lookup
  - Warranty tracking

### Forecasting & Planning
- [ ] **42. Demand Forecasting**
  - 30/60/90 day projections
  - Based on historical sales
  - Seasonal adjustments
  - Stockout predictions
  - Days of inventory remaining

- [ ] **43. Reorder Point Calculator**
  - Auto-calculate based on velocity
  - Factor in lead time
  - Safety stock settings
  - Suggested reorder quantities
  - One-click PO creation

- [ ] **44. ABC Classification**
  - Auto-classify A/B/C products
  - Based on revenue contribution
  - Based on velocity
  - Visual indicators
  - Focus reports on A items

### B2B / Wholesale
- [ ] **45. Wholesale Price Tiers**
  - Create price tiers
  - Assign customers to tiers
  - Tier-specific pricing
  - Volume discounts
  - Price rules

- [ ] **46. Net Payment Terms**
  - Net 30/60/90 options
  - Assign terms to customers
  - Payment due tracking
  - Overdue alerts
  - Aging reports

- [ ] **47. Credit Limits**
  - Set credit limit per customer
  - Block orders over limit
  - Credit limit alerts
  - Payment history

### Advanced Order Features
- [ ] **48. Split Shipments**
  - Split order to multiple shipments
  - Partial fulfillment
  - Track split shipment status
  - Combine tracking to customer

- [ ] **49. Pre-Orders**
  - Accept pre-orders
  - Expected availability date
  - Pre-order queue
  - Auto-convert when available
  - Pre-order reports

- [ ] **50. Recurring Orders / Subscriptions**
  - Create subscription orders
  - Frequency settings (weekly, monthly, etc.)
  - Auto-generate orders
  - Subscription management
  - Pause/resume subscriptions

### Integrations
- [ ] **51. Shopify Deep Sync**
  - Product sync (bidirectional)
  - Inventory sync (real-time)
  - Order import
  - Order status push
  - Fulfillment webhook
  - Multi-location support

- [ ] **52. Amazon SP-API Integration**
  - Order import
  - Inventory sync to FBA
  - FBA inventory pull
  - Order status sync
  - Returns sync

- [ ] **53. Veeqo Integration**
  - Order sync
  - Inventory sync
  - Shipping rate fetch
  - Label generation
  - Tracking push

- [ ] **54. Webhook System**
  - Outbound webhooks
  - Event types (order.created, inventory.updated, etc.)
  - Webhook management UI
  - Delivery logs
  - Retry logic

- [ ] **55. Public REST API**
  - API key authentication
  - Rate limiting
  - API documentation
  - All CRUD endpoints
  - Webhook endpoints

### UX Improvements
- [ ] **56. Saved Views / Filters**
  - Save filter combinations
  - Name saved views
  - Quick access to saved views
  - Share views (admin)
  - Default view setting

- [ ] **57. Custom Fields**
  - Add custom fields to products
  - Add custom fields to orders
  - Add custom fields to customers
  - Field types (text, number, date, dropdown)
  - Display in tables

- [ ] **58. Keyboard Shortcuts**
  - Navigation shortcuts
  - Action shortcuts
  - Shortcut help modal
  - Customizable shortcuts

---

## 🟢 MEDIUM PRIORITY (Phase 3)

### Quality & Compliance
- [ ] **59. Certificate of Analysis**
  - Attach COA to lots
  - COA expiration tracking
  - COA viewer
  - Required COA flag

- [ ] **60. Recall Management**
  - Create recall
  - Identify affected lots
  - Identify affected orders
  - Identify affected customers
  - Recall status tracking

### Advanced Warehouse
- [ ] **61. Pick Path Optimization**
  - Calculate shortest route
  - Zone-based picking
  - Visual pick path
  - Estimated pick time

- [ ] **62. Receiving Inspection / QC**
  - QC checkpoint on receiving
  - Pass/fail inspection
  - Inspection notes
  - Reject to quarantine
  - QC reports

- [ ] **63. Quarantine Location**
  - Dedicated quarantine bins
  - Move to quarantine
  - Quarantine reasons
  - Release from quarantine
  - Quarantine reports

- [ ] **64. Pallet/Container Receiving**
  - Receive by pallet
  - Pallet label generation
  - Container tracking
  - Bulk put-away

### Financial
- [ ] **65. Invoicing**
  - Generate invoices
  - Invoice templates
  - Email invoices
  - Invoice history
  - PDF export

- [ ] **66. Payment Tracking**
  - Track payments against invoices
  - Payment methods
  - Partial payments
  - Payment history
  - Outstanding balance

- [ ] **67. FIFO/LIFO/Avg Cost Methods**
  - Select costing method
  - Apply to COGS calculations
  - Cost layer tracking
  - Method comparison reports

### Integrations
- [ ] **68. QuickBooks Integration**
  - Sync invoices
  - Sync payments
  - Sync products
  - Sync customers
  - Chart of accounts mapping

- [ ] **69. Xero Integration**
  - Same as QuickBooks
  - Xero-specific mapping

- [ ] **70. Klaviyo Integration**
  - Sync customer data
  - Sync order data
  - Segment sync
  - Event tracking

### UX
- [ ] **71. Recently Viewed**
  - Track recently viewed items
  - Quick access dropdown
  - Persist across sessions

- [ ] **72. Favorites / Bookmarks**
  - Star/bookmark items
  - Favorites sidebar
  - Quick access

- [ ] **73. Activity Feed**
  - Real-time activity stream
  - Filter by type
  - Clickable activities

### Order Features
- [ ] **74. Order Editing**
  - Edit orders after placement
  - Add/remove items
  - Change quantities
  - Recalculate totals
  - Edit history

- [ ] **75. Order Merging**
  - Select multiple orders
  - Merge into one shipment
  - Combined packing slip
  - Save shipping

- [ ] **76. Gift Orders**
  - Different ship-to address
  - Gift message
  - Gift wrapping option
  - Hide prices on slip

---

## 🔵 LOW PRIORITY (Future / Nice to Have)

### Platform
- [ ] **77. Offline Mode**
  - Work without internet
  - Queue changes
  - Sync when online
  - Conflict resolution

- [ ] **78. Native Mobile App**
  - iOS app
  - Android app
  - Push notifications
  - Biometric auth

- [ ] **79. White-Label**
  - Custom branding
  - Custom domain
  - Custom colors
  - Remove Cronk branding

- [ ] **80. Multi-Language (i18n)**
  - Language selector
  - Translate UI
  - RTL support

- [ ] **81. Multi-Tenant (SaaS)**
  - Separate customer data
  - Tenant isolation
  - Tenant-specific settings
  - Usage tracking

### Integrations
- [ ] **82. EDI Support**
  - EDI 850 (PO)
  - EDI 856 (ASN)
  - EDI 810 (Invoice)
  - Big box retailer support

- [ ] **83. Additional Marketplaces**
  - Walmart integration
  - eBay integration
  - Etsy integration
  - TikTok Shop integration

### Advanced Features
- [ ] **84. Customer Portal**
  - Customer login
  - Order history
  - Reorder capability
  - Invoice access
  - Returns initiation

- [ ] **85. Minimum Order Quantities**
  - Set MOQ per product
  - Set MOQ per customer
  - MOQ enforcement
  - MOQ warnings

- [ ] **86. Quote/Estimate System**
  - Create quotes
  - Send quotes
  - Quote approval
  - Convert to order
  - Quote expiration

- [ ] **87. Cost Variance Alerts**
  - Alert when supplier costs change
  - Threshold settings
  - Approval workflow
  - Historical comparison

---

## 📊 Progress Tracker

### By Priority
| Priority | Total | Done | Remaining |
|----------|-------|------|-----------|
| ✅ Completed (1-23) | 23 | 23 | 0 |
| 🔴 Critical | 10 | 0 | 10 |
| 🟡 High | 25 | 0 | 25 |
| 🟢 Medium | 18 | 0 | 18 |
| 🔵 Low | 11 | 0 | 11 |
| **TOTAL** | **87** | **23** | **64** |

### By Category
| Category | Items |
|----------|-------|
| Authentication & Security | 2 |
| Data & Database | 1 |
| Core UX | 4 |
| Customer Management | 1 |
| Order Management | 5 |
| Warehouse Operations | 9 |
| Inventory Features | 3 |
| Financial Features | 6 |
| Forecasting & Planning | 3 |
| B2B / Wholesale | 4 |
| Integrations | 9 |
| Quality & Compliance | 2 |
| Platform & Technical | 5 |
| Advanced Features | 4 |

---

## 🎯 MVP Launch Checklist

Minimum features needed for personal use + beta testing:

- [ ] Authentication System (#24)
- [ ] User Roles & Permissions (#25)
- [ ] Firebase Integration (#26)
- [ ] Global Search (#27)
- [ ] Notifications Center (#28)
- [ ] Bulk Operations (#29)
- [ ] Audit Trail (#30)
- [ ] Customer Database (#31)
- [ ] Backorder Management (#32)
- [ ] Shopify Integration (#51)

**MVP = Prompts 24-32 + 51**

---

## 🚀 Public SaaS Launch Checklist

Additional features for public release:

All MVP features PLUS:
- [ ] Bin/Location Management (#33)
- [ ] Barcode Generation (#34)
- [ ] Mobile/Tablet Mode (#35)
- [ ] Multi-Tenant Architecture (#81)
- [ ] Public API (#55)
- [ ] Webhook System (#54)

---

## 📝 Notes

- Prompts should be run in numerical order within each priority tier
- Each prompt builds on previous work
- Test thoroughly after each prompt
- Some features may require multiple prompts
- Integration features require API credentials

---

## 🔗 Related Documents

- `/mnt/user-data/outputs/prompts/` - All prompt files
- `/mnt/user-data/uploads/` - Demo HTML files
- Master Roadmap from earlier session (220+ items)

---

*This document will be updated as features are completed.*
