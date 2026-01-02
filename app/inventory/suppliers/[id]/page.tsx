'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp, Supplier, ProductSupplier } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SupplierModal } from '@/components/modals/SupplierModal';
import { AssignProductsModal } from '@/components/modals/AssignProductsModal';
import { useToast } from '@/components/ui/Toast';
import { Breadcrumb } from '@/components/Breadcrumb';
import { formatDate, formatCurrency, formatNumber } from '@/lib/formatting';
import { SupplierStatusBadge, SupplierCodeBadge } from '@/components/suppliers';
import { POStatusBadge } from '@/components/operations';
import {
  Building2,
  ArrowLeft,
  Edit,
  Plus,
  Mail,
  Phone,
  Globe,
  MapPin,
  User,
  CreditCard,
  Package,
  FileText,
  Trash2,
  Star,
  MoreHorizontal,
} from 'lucide-react';

type Tab = 'overview' | 'products' | 'orders';

export default function SupplierDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { success } = useToast();

  const supplierId = params.id as string;
  const supplier = state.suppliers.find(s => s.id === supplierId);

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [showProductActions, setShowProductActions] = useState<string | null>(null);

  const supplierProducts = useMemo(() => {
    return state.productSuppliers.filter(ps => ps.supplierId === supplierId);
  }, [state.productSuppliers, supplierId]);

  const supplierPOs = useMemo(() => {
    if (!supplier) return [];
    return state.purchaseOrders
      .filter(po => po.supplier === supplier.name)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [state.purchaseOrders, supplier]);

  const stats = useMemo(() => {
    const totalOrders = supplierPOs.length;
    const totalSpend = supplierPOs.reduce((sum, po) => sum + po.total, 0);
    const avgLeadTime = supplier?.leadTimeDays || 0;
    return { totalOrders, totalSpend, avgLeadTime };
  }, [supplierPOs, supplier]);

  const handleRemoveProduct = (ps: ProductSupplier) => {
    dispatch({
      type: 'REMOVE_PRODUCT_SUPPLIER',
      payload: { productId: ps.productId, supplierId: ps.supplierId }
    });
    success('Product removed from supplier');
    setShowProductActions(null);
  };

  const handleSetPrimary = (ps: ProductSupplier) => {
    const existingPrimary = state.productSuppliers.find(
      p => p.productId === ps.productId && p.isPrimary && p.supplierId !== ps.supplierId
    );
    if (existingPrimary) {
      dispatch({
        type: 'UPDATE_PRODUCT_SUPPLIER',
        payload: { ...existingPrimary, isPrimary: false }
      });
    }

    dispatch({
      type: 'UPDATE_PRODUCT_SUPPLIER',
      payload: { ...ps, isPrimary: true }
    });

    const product = state.products.find(p => p.id === ps.productId);
    if (product) {
      dispatch({
        type: 'UPDATE_PRODUCT',
        payload: { ...product, primarySupplierId: ps.supplierId, updatedAt: new Date() }
      });
    }

    success('Set as primary supplier');
    setShowProductActions(null);
  };

  if (!supplier) {
    return (
      <div className="p-6">
        <Card className="p-12 text-center">
          <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Supplier Not Found</h3>
          <p className="text-sm text-slate-400 mb-4">
            The supplier you&apos;re looking for doesn&apos;t exist or has been deleted.
          </p>
          <Link href="/inventory/suppliers">
            <Button variant="secondary">
              <ArrowLeft className="w-4 h-4" />
              Back to Suppliers
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb items={[
        { label: 'Inventory', href: '/inventory' },
        { label: 'Suppliers', href: '/inventory/suppliers' },
        { label: supplier.name }
      ]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/inventory/suppliers" className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-semibold text-white">{supplier.name}</h1>
                <SupplierCodeBadge code={supplier.code} />
                <SupplierStatusBadge isActive={supplier.isActive} />
              </div>
              <p className="text-slate-400 text-sm mt-1">
                {supplierProducts.length} products • {supplierPOs.length} orders
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setIsEditModalOpen(true)}>
            <Edit className="w-4 h-4" />
            Edit
          </Button>
          <Link href={`/operations/purchase-orders?supplier=${supplier.id}`}>
            <Button>
              <Plus className="w-4 h-4" />
              Create PO
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-700/50">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'products', label: `Products (${supplierProducts.length})` },
          { key: 'orders', label: `Orders (${supplierPOs.length})` },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as Tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'text-emerald-400 border-emerald-400'
                : 'text-slate-400 border-transparent hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-3 gap-6">
          {/* Contact Card */}
          <Card className="p-5">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              Contact
            </h3>
            <div className="space-y-3 text-sm">
              {supplier.contactName && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-500" />
                  <span className="text-white">{supplier.contactName}</span>
                </div>
              )}
              {supplier.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <a href={`mailto:${supplier.email}`} className="text-emerald-400 hover:text-emerald-300">
                    {supplier.email}
                  </a>
                </div>
              )}
              {supplier.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <a href={`tel:${supplier.phone}`} className="text-white">{supplier.phone}</a>
                </div>
              )}
              {supplier.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-500" />
                  <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                    {supplier.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              {supplier.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-slate-500 mt-0.5" />
                  <div className="text-white">
                    <div>{supplier.address.street}</div>
                    <div>{supplier.address.city}, {supplier.address.state} {supplier.address.zip}</div>
                    <div className="text-slate-400">{supplier.address.country}</div>
                  </div>
                </div>
              )}
              {!supplier.contactName && !supplier.email && !supplier.phone && (
                <p className="text-slate-500">No contact information</p>
              )}
            </div>
          </Card>

          {/* Stats Card */}
          <Card className="p-5">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Products</span>
                <span className="text-white font-medium">{supplierProducts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Orders</span>
                <span className="text-white font-medium">{stats.totalOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Spend</span>
                <span className="text-emerald-400 font-medium">{formatCurrency(stats.totalSpend)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Avg Lead Time</span>
                <span className="text-white font-medium">{stats.avgLeadTime || 'N/A'} days</span>
              </div>
            </div>
          </Card>

          {/* Terms Card */}
          <Card className="p-5">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400" />
              Terms
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Currency</span>
                <span className="text-white font-mono">{supplier.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Terms</span>
                <span className="text-white">{supplier.paymentTerms || 'Not set'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Min Order</span>
                <span className="text-white">
                  {supplier.minimumOrderValue ? formatCurrency(supplier.minimumOrderValue) : 'None'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lead Time</span>
                <span className="text-white">
                  {supplier.leadTimeDays ? `${supplier.leadTimeDays} days` : 'Not set'}
                </span>
              </div>
            </div>
          </Card>

          {supplier.notes && (
            <Card className="p-5 col-span-3">
              <h3 className="font-medium text-white mb-3">Notes</h3>
              <p className="text-slate-300 text-sm">{supplier.notes}</p>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'products' && (
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
            <h3 className="font-medium text-white">Products from this Supplier</h3>
            <Button variant="secondary" size="sm" onClick={() => setIsAssignModalOpen(true)}>
              <Plus className="w-4 h-4" />
              Assign Products
            </Button>
          </div>

          {supplierProducts.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Products Assigned</h3>
              <p className="text-sm text-slate-400">
                Assign products to this supplier to track costs and create purchase orders.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr className="text-xs text-slate-400 uppercase tracking-wider">
                    <th className="px-4 py-3 text-left">Product</th>
                    <th className="px-4 py-3 text-left">Supplier SKU</th>
                    <th className="px-4 py-3 text-right">Unit Cost</th>
                    <th className="px-4 py-3 text-center">Min Qty</th>
                    <th className="px-4 py-3 text-center">Lead Time</th>
                    <th className="px-4 py-3 text-center">Primary</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {supplierProducts.map(ps => {
                    const product = state.products.find(p => p.id === ps.productId);
                    if (!product) return null;

                    return (
                      <tr key={ps.productId} className="hover:bg-slate-800/30">
                        <td className="px-4 py-3">
                          <Link href={`/inventory/${product.id}`} className="hover:text-emerald-400">
                            <div className="font-medium text-white">{product.name}</div>
                            <div className="text-xs text-slate-400 font-mono">{product.sku}</div>
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          {ps.supplierSku ? (
                            <span className="font-mono text-slate-300">{ps.supplierSku}</span>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-white">{formatCurrency(ps.unitCost)}</span>
                          <span className="text-slate-500 text-xs ml-1">{ps.currency}</span>
                        </td>
                        <td className="px-4 py-3 text-center text-slate-300">{ps.minimumOrderQty || '-'}</td>
                        <td className="px-4 py-3 text-center text-slate-300">
                          {ps.leadTimeDays || supplier.leadTimeDays || '-'} days
                        </td>
                        <td className="px-4 py-3 text-center">
                          {ps.isPrimary && <Star className="w-4 h-4 text-amber-400 mx-auto fill-amber-400" />}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end relative">
                            <button
                              onClick={() => setShowProductActions(showProductActions === ps.productId ? null : ps.productId)}
                              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>

                            {showProductActions === ps.productId && (
                              <div className="absolute right-0 top-full mt-1 w-36 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10">
                                <div className="py-1">
                                  {!ps.isPrimary && (
                                    <button
                                      onClick={() => handleSetPrimary(ps)}
                                      className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700/50 flex items-center gap-2"
                                    >
                                      <Star className="w-4 h-4" />
                                      Set Primary
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleRemoveProduct(ps)}
                                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-slate-700/50 flex items-center gap-2"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Remove
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'orders' && (
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-700/50">
            <h3 className="font-medium text-white">Purchase Order History</h3>
          </div>

          {supplierPOs.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No Orders Yet</h3>
              <p className="text-sm text-slate-400">
                Create a purchase order to start ordering from this supplier.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr className="text-xs text-slate-400 uppercase tracking-wider">
                    <th className="px-4 py-3 text-left">PO #</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-center">Items</th>
                    <th className="px-4 py-3 text-right">Total</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {supplierPOs.map(po => (
                    <tr key={po.id} className="hover:bg-slate-800/30">
                      <td className="px-4 py-3">
                        <span className="font-mono text-white">{po.poNumber}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-400">{formatDate(po.createdAt)}</td>
                      <td className="px-4 py-3 text-center text-slate-300">{po.items.length} items</td>
                      <td className="px-4 py-3 text-right text-white">{formatCurrency(po.total)}</td>
                      <td className="px-4 py-3 text-center"><POStatusBadge status={po.status} /></td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/operations/purchase-orders`} className="text-emerald-400 hover:text-emerald-300 text-sm">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      <SupplierModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editSupplier={supplier}
      />

      <AssignProductsModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        supplier={supplier}
      />

      {showProductActions && (
        <div className="fixed inset-0 z-0" onClick={() => setShowProductActions(null)} />
      )}
    </div>
  );
}
