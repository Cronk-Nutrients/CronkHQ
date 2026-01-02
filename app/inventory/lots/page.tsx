'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp, InventoryLot } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatDate, formatNumber } from '@/lib/formatting';
import { useToast } from '@/components/ui/Toast';
import {
  Layers,
  Search,
  Filter,
  Package,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Ban,
  RotateCcw,
  ArrowLeft,
  ChevronDown,
  AlertOctagon,
  Eye,
  MoreHorizontal,
  XCircle,
  ShieldAlert
} from 'lucide-react';

export default function LotsPage() {
  const { state, dispatch } = useApp();
  const { success, warning } = useToast();

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<InventoryLot['status'] | 'all' | 'expiring_soon'>('all');
  const [productFilter, setProductFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  // Selected lot for actions
  const [selectedLot, setSelectedLot] = useState<InventoryLot | null>(null);
  const [showActions, setShowActions] = useState(false);
  const [recallNotes, setRecallNotes] = useState('');
  const [showRecallModal, setShowRecallModal] = useState(false);

  // Get unique products that have lots
  const productsWithLots = useMemo(() => {
    const productIds = [...new Set(state.lots.map(l => l.productId))];
    return state.products.filter(p => productIds.includes(p.id));
  }, [state.lots, state.products]);

  // Check if lot is expiring soon (within 30 days)
  const isExpiringSoon = (lot: InventoryLot) => {
    if (!lot.expirationDate) return false;
    const product = state.products.find(p => p.id === lot.productId);
    const warningDays = product?.expirationWarningDays || 30;
    const daysUntilExpiry = Math.ceil((new Date(lot.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry > 0 && daysUntilExpiry <= warningDays;
  };

  // Check if lot is expired
  const isExpired = (lot: InventoryLot) => {
    if (!lot.expirationDate) return false;
    return new Date(lot.expirationDate) < new Date();
  };

  // Filter lots
  const filteredLots = useMemo(() => {
    return state.lots.filter(lot => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          lot.lotNumber.toLowerCase().includes(query) ||
          lot.productName.toLowerCase().includes(query) ||
          lot.sku.toLowerCase().includes(query) ||
          lot.supplierLotNumber?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter !== 'all') {
        if (statusFilter === 'expiring_soon') {
          if (!isExpiringSoon(lot)) return false;
        } else if (lot.status !== statusFilter) {
          return false;
        }
      }

      // Product filter
      if (productFilter !== 'all' && lot.productId !== productFilter) {
        return false;
      }

      // Location filter
      if (locationFilter !== 'all' && lot.locationId !== locationFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      // Sort by expiration date (closest first), then by received date
      if (a.expirationDate && b.expirationDate) {
        return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
      }
      if (a.expirationDate) return -1;
      if (b.expirationDate) return 1;
      return new Date(b.receivedDate).getTime() - new Date(a.receivedDate).getTime();
    });
  }, [state.lots, searchQuery, statusFilter, productFilter, locationFilter, state.products]);

  // Stats
  const stats = useMemo(() => {
    const total = state.lots.length;
    const active = state.lots.filter(l => l.status === 'active').length;
    const expiringSoon = state.lots.filter(l => isExpiringSoon(l)).length;
    const expired = state.lots.filter(l => isExpired(l) || l.status === 'expired').length;
    const quarantined = state.lots.filter(l => l.status === 'quarantine').length;
    const recalled = state.lots.filter(l => l.status === 'recalled').length;
    const totalUnits = state.lots.reduce((sum, l) => sum + l.quantity, 0);

    return { total, active, expiringSoon, expired, quarantined, recalled, totalUnits };
  }, [state.lots]);

  // Get status badge
  const getStatusBadge = (lot: InventoryLot) => {
    if (isExpired(lot) && lot.status === 'active') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400">
          <XCircle className="w-3 h-3" />
          Expired
        </span>
      );
    }

    if (isExpiringSoon(lot) && lot.status === 'active') {
      const daysUntilExpiry = Math.ceil((new Date(lot.expirationDate!).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-amber-500/20 text-amber-400">
          <AlertTriangle className="w-3 h-3" />
          Expires in {daysUntilExpiry}d
        </span>
      );
    }

    const configs = {
      active: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', icon: CheckCircle, label: 'Active' },
      quarantine: { bg: 'bg-amber-500/20', text: 'text-amber-400', icon: Clock, label: 'Quarantine' },
      expired: { bg: 'bg-red-500/20', text: 'text-red-400', icon: XCircle, label: 'Expired' },
      recalled: { bg: 'bg-purple-500/20', text: 'text-purple-400', icon: ShieldAlert, label: 'Recalled' },
    };
    const config = configs[lot.status];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  // Handle quarantine
  const handleQuarantine = (lot: InventoryLot) => {
    dispatch({
      type: 'QUARANTINE_LOT',
      payload: { lotId: lot.id, notes: 'Quarantined by user' }
    });
    success(`Lot ${lot.lotNumber} quarantined`);
    setSelectedLot(null);
    setShowActions(false);
  };

  // Handle recall
  const handleRecall = () => {
    if (!selectedLot) return;
    dispatch({
      type: 'RECALL_LOT',
      payload: { lotId: selectedLot.id, notes: recallNotes || 'Recalled by user' }
    });
    warning(`Lot ${selectedLot.lotNumber} recalled`);
    setShowRecallModal(false);
    setRecallNotes('');
    setSelectedLot(null);
  };

  // Handle release from quarantine
  const handleRelease = (lot: InventoryLot) => {
    dispatch({
      type: 'UPDATE_LOT',
      payload: { ...lot, status: 'active' }
    });
    success(`Lot ${lot.lotNumber} released from quarantine`);
    setSelectedLot(null);
    setShowActions(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/inventory"
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-purple-400" />
              Lot Inventory
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Track and manage inventory lots with expiration dates
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-semibold text-white">{formatNumber(stats.total)}</div>
          <div className="text-sm text-slate-400">Total Lots</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-semibold text-emerald-400">{formatNumber(stats.active)}</div>
          <div className="text-sm text-slate-400">Active</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-semibold text-blue-400">{formatNumber(stats.totalUnits)}</div>
          <div className="text-sm text-slate-400">Total Units</div>
        </Card>
        <button onClick={() => setStatusFilter('expiring_soon')} className="text-left">
          <Card className="p-4 hover:border-amber-500/50">
            <div className="text-2xl font-semibold text-amber-400">{formatNumber(stats.expiringSoon)}</div>
            <div className="text-sm text-slate-400">Expiring Soon</div>
          </Card>
        </button>
        <button onClick={() => setStatusFilter('expired')} className="text-left">
          <Card className="p-4 hover:border-red-500/50">
            <div className="text-2xl font-semibold text-red-400">{formatNumber(stats.expired)}</div>
            <div className="text-sm text-slate-400">Expired</div>
          </Card>
        </button>
        <button onClick={() => setStatusFilter('quarantine')} className="text-left">
          <Card className="p-4 hover:border-amber-500/50">
            <div className="text-2xl font-semibold text-amber-400">{formatNumber(stats.quarantined)}</div>
            <div className="text-sm text-slate-400">Quarantined</div>
          </Card>
        </button>
        <button onClick={() => setStatusFilter('recalled')} className="text-left">
          <Card className="p-4 hover:border-purple-500/50">
            <div className="text-2xl font-semibold text-purple-400">{formatNumber(stats.recalled)}</div>
            <div className="text-sm text-slate-400">Recalled</div>
          </Card>
        </button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search lots, products, or supplier lot #..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="expiring_soon">Expiring Soon</option>
            <option value="expired">Expired</option>
            <option value="quarantine">Quarantine</option>
            <option value="recalled">Recalled</option>
          </select>

          {/* Product Filter */}
          <select
            value={productFilter}
            onChange={e => setProductFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all">All Products</option>
            {productsWithLots.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          {/* Location Filter */}
          <select
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all">All Locations</option>
            {state.locations.map(loc => (
              <option key={loc.id} value={loc.id}>{loc.name}</option>
            ))}
          </select>

          {/* Clear Filters */}
          {(searchQuery || statusFilter !== 'all' || productFilter !== 'all' || locationFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setProductFilter('all');
                setLocationFilter('all');
              }}
              className="text-sm text-slate-400 hover:text-white"
            >
              Clear Filters
            </button>
          )}
        </div>
      </Card>

      {/* Lots Table */}
      <Card className="overflow-hidden">
        {filteredLots.length === 0 ? (
          <div className="p-12 text-center">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              {state.lots.length === 0 ? 'No Lots Yet' : 'No Lots Match Filters'}
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              {state.lots.length === 0
                ? 'Lots are created when receiving products with lot tracking enabled. Enable lot tracking on a product, then receive items on a purchase order.'
                : 'Try adjusting your search or filters to find what you\'re looking for.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr className="text-xs text-slate-400 uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Lot Number</th>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-center">Quantity</th>
                  <th className="px-4 py-3 text-left">Location</th>
                  <th className="px-4 py-3 text-left">Expiration</th>
                  <th className="px-4 py-3 text-left">Received</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredLots.map(lot => (
                  <tr
                    key={lot.id}
                    className={`hover:bg-slate-800/30 transition-colors ${
                      isExpired(lot) ? 'bg-red-500/5' :
                      isExpiringSoon(lot) ? 'bg-amber-500/5' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="font-mono text-white">{lot.lotNumber}</div>
                      {lot.supplierLotNumber && (
                        <div className="text-xs text-slate-500">Supplier: {lot.supplierLotNumber}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/inventory/${lot.productId}`}
                        className="text-white hover:text-emerald-400"
                      >
                        {lot.productName}
                      </Link>
                      <div className="text-xs text-slate-400 font-mono">{lot.sku}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="text-white font-medium">{formatNumber(lot.quantity)}</div>
                      {lot.reservedQty > 0 && (
                        <div className="text-xs text-amber-400">{lot.reservedQty} reserved</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {lot.locationName}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {lot.expirationDate ? (
                        <div className={`flex items-center gap-1 ${
                          isExpired(lot) ? 'text-red-400' :
                          isExpiringSoon(lot) ? 'text-amber-400' : 'text-slate-300'
                        }`}>
                          <Calendar className="w-3 h-3" />
                          {formatDate(lot.expirationDate)}
                        </div>
                      ) : (
                        <span className="text-slate-500">No expiration</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-sm">
                      {formatDate(lot.receivedDate)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {getStatusBadge(lot)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <div className="relative">
                          <button
                            onClick={() => {
                              setSelectedLot(lot);
                              setShowActions(selectedLot?.id === lot.id ? !showActions : true);
                            }}
                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {/* Actions Dropdown */}
                          {showActions && selectedLot?.id === lot.id && (
                            <div className="absolute right-0 mt-1 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10">
                              <div className="py-1">
                                {lot.status === 'active' && (
                                  <>
                                    <button
                                      onClick={() => handleQuarantine(lot)}
                                      className="w-full px-4 py-2 text-left text-sm text-amber-400 hover:bg-slate-700/50 flex items-center gap-2"
                                    >
                                      <Clock className="w-4 h-4" />
                                      Quarantine
                                    </button>
                                    <button
                                      onClick={() => {
                                        setShowRecallModal(true);
                                        setShowActions(false);
                                      }}
                                      className="w-full px-4 py-2 text-left text-sm text-purple-400 hover:bg-slate-700/50 flex items-center gap-2"
                                    >
                                      <ShieldAlert className="w-4 h-4" />
                                      Recall
                                    </button>
                                  </>
                                )}
                                {lot.status === 'quarantine' && (
                                  <>
                                    <button
                                      onClick={() => handleRelease(lot)}
                                      className="w-full px-4 py-2 text-left text-sm text-emerald-400 hover:bg-slate-700/50 flex items-center gap-2"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                      Release
                                    </button>
                                    <button
                                      onClick={() => {
                                        setShowRecallModal(true);
                                        setShowActions(false);
                                      }}
                                      className="w-full px-4 py-2 text-left text-sm text-purple-400 hover:bg-slate-700/50 flex items-center gap-2"
                                    >
                                      <ShieldAlert className="w-4 h-4" />
                                      Recall
                                    </button>
                                  </>
                                )}
                                <Link
                                  href={`/inventory/${lot.productId}`}
                                  className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700/50 flex items-center gap-2"
                                >
                                  <Eye className="w-4 h-4" />
                                  View Product
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Recall Modal */}
      {showRecallModal && selectedLot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-medium text-white flex items-center gap-2 mb-4">
              <ShieldAlert className="w-5 h-5 text-purple-400" />
              Recall Lot
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Recalling lot <span className="font-mono text-white">{selectedLot.lotNumber}</span>.
              This will mark the lot as recalled and prevent it from being used in orders.
            </p>
            <div className="mb-4">
              <label className="block text-sm text-slate-400 mb-1.5">Recall Reason</label>
              <textarea
                value={recallNotes}
                onChange={e => setRecallNotes(e.target.value)}
                placeholder="Enter recall reason..."
                rows={3}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 resize-none"
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowRecallModal(false);
                  setRecallNotes('');
                  setSelectedLot(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRecall}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Confirm Recall
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Click away to close actions */}
      {showActions && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setShowActions(false);
            setSelectedLot(null);
          }}
        />
      )}
    </div>
  );
}
