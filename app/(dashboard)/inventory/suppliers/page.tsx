'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp, Supplier } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SupplierModal } from '@/components/modals/SupplierModal';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { Breadcrumb } from '@/components/Breadcrumb';
import { formatDate, formatCurrency } from '@/lib/formatting';
import {
  SupplierStatusBadge,
  CurrencyBadge,
  SupplierStatCard,
  SupplierStatsGrid,
} from '@/components/suppliers';
import {
  Building2,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  FileText,
  DollarSign,
} from 'lucide-react';

export default function SuppliersPage() {
  const { state, dispatch } = useApp();
  const { success, warning } = useToast();
  const confirm = useConfirm();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [showActionsFor, setShowActionsFor] = useState<string | null>(null);

  const getProductCount = (supplierId: string) => {
    return state.productSuppliers.filter(ps => ps.supplierId === supplierId).length;
  };

  const getLastOrderDate = (supplierId: string) => {
    const supplier = state.suppliers.find(s => s.id === supplierId);
    const pos = state.purchaseOrders
      .filter(po => po.supplier === supplier?.name)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return pos[0]?.createdAt;
  };

  const filteredSuppliers = useMemo(() => {
    return state.suppliers.filter(supplier => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          supplier.name.toLowerCase().includes(query) ||
          supplier.code.toLowerCase().includes(query) ||
          supplier.contactName?.toLowerCase().includes(query) ||
          supplier.email?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      if (statusFilter === 'active' && !supplier.isActive) return false;
      if (statusFilter === 'inactive' && supplier.isActive) return false;

      return true;
    });
  }, [state.suppliers, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    const total = state.suppliers.length;
    const active = state.suppliers.filter(s => s.isActive).length;

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const monthlyPOs = state.purchaseOrders.filter(po => new Date(po.createdAt) >= thisMonth);
    const monthlySpend = monthlyPOs.reduce((sum, po) => sum + po.total, 0);

    return { total, active, monthlyOrders: monthlyPOs.length, monthlySpend };
  }, [state.suppliers, state.purchaseOrders]);

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
    setShowActionsFor(null);
  };

  const handleToggleActive = (supplier: Supplier) => {
    dispatch({
      type: 'UPDATE_SUPPLIER',
      payload: { ...supplier, isActive: !supplier.isActive, updatedAt: new Date() }
    });
    if (supplier.isActive) {
      warning(`${supplier.name} deactivated`);
    } else {
      success(`${supplier.name} activated`);
    }
    setShowActionsFor(null);
  };

  const handleDelete = async (supplier: Supplier) => {
    const productCount = getProductCount(supplier.id);

    const confirmed = await confirm({
      title: 'Delete Supplier',
      message: productCount > 0
        ? `Are you sure you want to delete "${supplier.name}"? This supplier has ${productCount} product assignments that will also be removed.`
        : `Are you sure you want to delete "${supplier.name}"?`,
      confirmText: 'Delete',
    });

    if (confirmed) {
      dispatch({ type: 'DELETE_SUPPLIER', payload: supplier.id });
      success(`${supplier.name} deleted`);
    }
    setShowActionsFor(null);
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb items={[
        { label: 'Inventory', href: '/inventory' },
        { label: 'Suppliers' }
      ]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-emerald-400" />
            Suppliers
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage your vendor relationships</p>
        </div>
        <Button onClick={() => { setEditingSupplier(null); setIsModalOpen(true); }}>
          <Plus className="w-4 h-4" />
          Add Supplier
        </Button>
      </div>

      {/* Stats */}
      <SupplierStatsGrid>
        <SupplierStatCard
          icon={Building2}
          iconColor="blue"
          value={stats.total}
          label="Total Suppliers"
        />
        <SupplierStatCard
          icon={CheckCircle}
          iconColor="emerald"
          value={stats.active}
          label="Active"
        />
        <SupplierStatCard
          icon={FileText}
          iconColor="purple"
          value={stats.monthlyOrders}
          label="This Month's Orders"
        />
        <SupplierStatCard
          icon={DollarSign}
          iconColor="amber"
          value={formatCurrency(stats.monthlySpend)}
          label="Total Spend (MTD)"
        />
      </SupplierStatsGrid>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search suppliers..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </Card>

      {/* Suppliers Table */}
      <Card className="overflow-hidden">
        {filteredSuppliers.length === 0 ? (
          <div className="p-12 text-center">
            <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              {state.suppliers.length === 0 ? 'No Suppliers Yet' : 'No Suppliers Match Filters'}
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-4">
              {state.suppliers.length === 0
                ? 'Add your first supplier to start managing vendor relationships.'
                : 'Try adjusting your search or filters.'}
            </p>
            {state.suppliers.length === 0 && (
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="w-4 h-4" />
                Add Supplier
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr className="text-xs text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Supplier</th>
                  <th className="px-4 py-3 text-left">Contact</th>
                  <th className="px-4 py-3 text-center">Products</th>
                  <th className="px-4 py-3 text-center">Lead Time</th>
                  <th className="px-4 py-3 text-center">Currency</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-left">Last Order</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredSuppliers.map(supplier => {
                  const productCount = getProductCount(supplier.id);
                  const lastOrder = getLastOrderDate(supplier.id);

                  return (
                    <tr key={supplier.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3">
                        <Link
                          href={`/inventory/suppliers/${supplier.id}`}
                          className="flex items-center gap-3 hover:text-emerald-400"
                        >
                          <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-slate-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{supplier.name}</div>
                            <div className="text-xs text-slate-400 font-mono">{supplier.code}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        {supplier.contactName && (
                          <div className="text-sm text-white">{supplier.contactName}</div>
                        )}
                        {supplier.email && (
                          <div className="text-xs text-slate-400">{supplier.email}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-white">{productCount} products</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {supplier.leadTimeDays ? (
                          <span className="text-white">{supplier.leadTimeDays} days</span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <CurrencyBadge currency={supplier.currency} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <SupplierStatusBadge isActive={supplier.isActive} />
                      </td>
                      <td className="px-4 py-3">
                        {lastOrder ? (
                          <span className="text-sm text-slate-400">{formatDate(lastOrder)}</span>
                        ) : (
                          <span className="text-sm text-slate-500">Never</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2 relative">
                          <button
                            onClick={() => setShowActionsFor(showActionsFor === supplier.id ? null : supplier.id)}
                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {showActionsFor === supplier.id && (
                            <div className="absolute right-0 top-full mt-1 w-40 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10">
                              <div className="py-1">
                                <Link
                                  href={`/inventory/suppliers/${supplier.id}`}
                                  className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700/50 flex items-center gap-2"
                                >
                                  <Eye className="w-4 h-4" />
                                  View Details
                                </Link>
                                <button
                                  onClick={() => handleEdit(supplier)}
                                  className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700/50 flex items-center gap-2"
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleToggleActive(supplier)}
                                  className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700/50 flex items-center gap-2"
                                >
                                  {supplier.isActive ? (
                                    <>
                                      <XCircle className="w-4 h-4" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="w-4 h-4" />
                                      Activate
                                    </>
                                  )}
                                </button>
                                <button
                                  onClick={() => handleDelete(supplier)}
                                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-slate-700/50 flex items-center gap-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
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

      <SupplierModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingSupplier(null); }}
        editSupplier={editingSupplier}
      />

      {showActionsFor && (
        <div className="fixed inset-0 z-0" onClick={() => setShowActionsFor(null)} />
      )}
    </div>
  );
}
