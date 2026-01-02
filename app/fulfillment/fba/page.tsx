'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ClipboardList,
  Settings,
  Truck,
  Box,
  Package,
  Layers,
  Check,
  Loader2,
  Plus,
  FileInput,
  Printer,
  X,
  Play,
  Search,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { Breadcrumb } from '@/components/Breadcrumb';

interface FBAShipmentItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  prepped: number;
  casePacked: number;
}

interface FBAShipment {
  id: string;
  name: string;
  destination: 'amazon_usa' | 'amazon_canada';
  destinationCode: string;
  destinationCity: string;
  status: 'prep' | 'ready' | 'shipped';
  items: FBAShipmentItem[];
  prepTasks: {
    stickers: boolean;
    fnsku: boolean;
    casePacked: boolean;
    palletized: boolean;
  };
  shipByDate: Date;
  createdAt: Date;
  shippedAt?: Date;
  carrier?: string;
  trackingNumber?: string;
  shippingCost?: number;
}

export default function FBAPrepPage() {
  const { state, dispatch } = useApp();
  const { addToast } = useToast();

  const [fbaShipments, setFbaShipments] = useState<FBAShipment[]>([
    {
      id: 'fba-001',
      name: 'FBA-2024-047',
      destination: 'amazon_usa',
      destinationCode: 'PHX5',
      destinationCity: 'Phoenix, AZ',
      status: 'prep',
      items: [
        { productId: 'prod-1', productName: '1L Micro 5-0-1', sku: 'CNMIC1L', quantity: 144, prepped: 144, casePacked: 8 },
        { productId: 'prod-2', productName: '1L Bud Booster 0-1-3', sku: 'CNBB1L', quantity: 96, prepped: 96, casePacked: 5 },
      ],
      prepTasks: { stickers: true, fnsku: true, casePacked: false, palletized: false },
      shipByDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
    },
    {
      id: 'fba-002',
      name: 'FBA-2024-046',
      destination: 'amazon_usa',
      destinationCode: 'DFW7',
      destinationCity: 'Dallas, TX',
      status: 'ready',
      items: [
        { productId: 'prod-3', productName: '1L CalMag 2-0-0', sku: 'CNCM1L', quantity: 144, prepped: 144, casePacked: 12 },
        { productId: 'prod-4', productName: '1L Grow 2-1-6', sku: 'CNGR1L', quantity: 48, prepped: 48, casePacked: 4 },
      ],
      prepTasks: { stickers: true, fnsku: true, casePacked: true, palletized: true },
      shipByDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPrepModal, setShowPrepModal] = useState(false);
  const [showShipModal, setShowShipModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<FBAShipment | null>(null);

  // Create modal state
  const [newShipmentName, setNewShipmentName] = useState('');
  const [newDestination, setNewDestination] = useState<'amazon_usa' | 'amazon_canada'>('amazon_usa');
  const [newDestinationCode, setNewDestinationCode] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<{ productId: string; quantity: number }[]>([]);
  const [productSearch, setProductSearch] = useState('');

  // Ship modal state
  const [shipCarrier, setShipCarrier] = useState('UPS Freight');
  const [shipTracking, setShipTracking] = useState('');
  const [shipCost, setShipCost] = useState('');

  // Calculate stats
  const stats = useMemo(() => {
    const activeShipments = fbaShipments.filter(s => s.status !== 'shipped');
    const preppingCount = fbaShipments.filter(s => s.status === 'prep').length;
    const readyCount = fbaShipments.filter(s => s.status === 'ready').length;
    const unitsInPrep = activeShipments.reduce((sum, s) => sum + s.items.reduce((itemSum, i) => itemSum + i.quantity, 0), 0);
    const casesPacked = activeShipments.reduce((sum, s) => sum + s.items.reduce((itemSum, i) => itemSum + i.casePacked, 0), 0);
    const palletsReady = fbaShipments.filter(s => s.status === 'ready').length;

    return { activeShipments: activeShipments.length, preppingCount, readyCount, unitsInPrep, casesPacked, palletsReady };
  }, [fbaShipments]);

  // Filtered products for selection
  const filteredProducts = useMemo(() => {
    if (!productSearch) return state.products.slice(0, 5);
    return state.products.filter(p =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase())
    ).slice(0, 5);
  }, [state.products, productSearch]);

  // Get total stock for a product
  const getTotalStock = (productId: string) => {
    return state.inventory
      .filter(inv => inv.productId === productId && inv.locationId === 'loc-1')
      .reduce((sum, inv) => sum + inv.quantity, 0);
  };

  // Handle create shipment
  const handleCreateShipment = () => {
    if (!newShipmentName || selectedProducts.length === 0) {
      addToast('error', 'Please provide a name and add products');
      return;
    }

    const shipmentNumber = `FBA-${new Date().getFullYear()}-${String(fbaShipments.length + 48).padStart(3, '0')}`;
    const newShipment: FBAShipment = {
      id: crypto.randomUUID(),
      name: shipmentNumber,
      destination: newDestination,
      destinationCode: newDestinationCode || 'TBD',
      destinationCity: newDestination === 'amazon_usa' ? 'Amazon USA FC' : 'Amazon Canada FC',
      status: 'prep',
      items: selectedProducts.map(sp => {
        const product = state.products.find(p => p.id === sp.productId);
        return {
          productId: sp.productId,
          productName: product?.name || 'Unknown',
          sku: product?.sku || '',
          quantity: sp.quantity,
          prepped: 0,
          casePacked: 0,
        };
      }),
      prepTasks: { stickers: false, fnsku: false, casePacked: false, palletized: false },
      shipByDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
    };

    setFbaShipments(prev => [...prev, newShipment]);
    addToast('success', `FBA Shipment "${shipmentNumber}" created`);

    // Reset form
    setNewShipmentName('');
    setSelectedProducts([]);
    setNewDestinationCode('');
    setShowCreateModal(false);
  };

  // Handle prep task toggle
  const handleTogglePrepTask = (shipmentId: string, task: keyof FBAShipment['prepTasks']) => {
    setFbaShipments(prev => prev.map(s => {
      if (s.id === shipmentId) {
        const updatedTasks = { ...s.prepTasks, [task]: !s.prepTasks[task] };
        // Check if all tasks complete
        const allComplete = updatedTasks.stickers && updatedTasks.fnsku && updatedTasks.casePacked && updatedTasks.palletized;
        return {
          ...s,
          prepTasks: updatedTasks,
          status: allComplete ? 'ready' : 'prep',
        };
      }
      return s;
    }));
  };

  // Handle mark as shipped
  const handleMarkShipped = () => {
    if (!selectedShipment || !shipTracking) {
      addToast('error', 'Please provide tracking information');
      return;
    }

    // Deduct inventory from warehouse
    selectedShipment.items.forEach(item => {
      dispatch({
        type: 'ADJUST_STOCK',
        payload: {
          productId: item.productId,
          locationId: 'loc-1', // Cronk Warehouse
          adjustment: -item.quantity,
        },
      });

      // Add to Amazon location
      const amazonLocationId = selectedShipment.destination === 'amazon_usa' ? 'loc-2' : 'loc-3';
      dispatch({
        type: 'ADJUST_STOCK',
        payload: {
          productId: item.productId,
          locationId: amazonLocationId,
          adjustment: item.quantity,
        },
      });
    });

    setFbaShipments(prev => prev.map(s => {
      if (s.id === selectedShipment.id) {
        return {
          ...s,
          status: 'shipped',
          shippedAt: new Date(),
          carrier: shipCarrier,
          trackingNumber: shipTracking,
          shippingCost: parseFloat(shipCost) || 0,
        };
      }
      return s;
    }));

    addToast('success', `FBA Shipment "${selectedShipment.name}" marked as shipped`);
    setShowShipModal(false);
    setSelectedShipment(null);
    setShipTracking('');
    setShipCost('');
  };

  // Add product to selection
  const handleAddProduct = (productId: string) => {
    if (selectedProducts.find(p => p.productId === productId)) return;
    setSelectedProducts(prev => [...prev, { productId, quantity: 144 }]);
    setProductSearch('');
  };

  // Remove product from selection
  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.productId !== productId));
  };

  // Update product quantity
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setSelectedProducts(prev => prev.map(p => p.productId === productId ? { ...p, quantity } : p));
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Calculate totals for create modal
  const createModalTotals = useMemo(() => {
    const totalUnits = selectedProducts.reduce((sum, p) => sum + p.quantity, 0);
    const totalCases = Math.ceil(totalUnits / 12);
    const totalPallets = Math.ceil(totalCases / 20);
    const prepCost = totalUnits * 0.44;
    return { totalUnits, totalCases, totalPallets, prepCost };
  }, [selectedProducts]);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Fulfillment', href: '/fulfillment' }, { label: 'FBA Prep' }]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <i className="fab fa-amazon text-orange-400 text-2xl"></i>
            FBA Prep
          </h1>
          <p className="text-sm text-slate-400">Prepare and ship inventory to Amazon fulfillment centers</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors flex items-center gap-2">
            <FileInput className="w-4 h-4" />
            Import from Seller Central
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New FBA Shipment
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-slate-800/50 backdrop-blur border border-orange-500/30 rounded-xl p-4 shadow-lg shadow-orange-500/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">{stats.activeShipments}</div>
              <div className="text-xs text-slate-400">Active Shipments</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-amber-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Settings className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">{stats.preppingCount}</div>
              <div className="text-xs text-slate-400">Prepping</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Truck className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{stats.readyCount}</div>
              <div className="text-xs text-slate-400">Ready to Ship</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
              <Box className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.unitsInPrep}</div>
              <div className="text-xs text-slate-400">Units in Prep</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
              <Package className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.casesPacked}</div>
              <div className="text-xs text-slate-400">Cases Packed</div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 backdrop-blur border border-emerald-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Layers className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">{stats.palletsReady}</div>
              <div className="text-xs text-slate-400">Pallets Ready</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Shipments */}
      <div className="grid grid-cols-2 gap-6">
        {fbaShipments.filter(s => s.status !== 'shipped').map(shipment => {
          const totalUnits = shipment.items.reduce((sum, i) => sum + i.quantity, 0);
          const totalPrepped = shipment.items.reduce((sum, i) => sum + i.prepped, 0);
          const totalCases = shipment.items.reduce((sum, i) => sum + i.casePacked, 0);
          const expectedCases = Math.ceil(totalUnits / 12);
          const progress = totalUnits > 0 ? Math.round((totalPrepped / totalUnits) * 100) : 0;
          const prepCost = totalUnits * 0.44;

          return (
            <div
              key={shipment.id}
              className={`bg-slate-800/50 backdrop-blur border rounded-xl overflow-hidden ${
                shipment.status === 'ready' ? 'border-blue-500/30' : 'border-amber-500/30'
              }`}
            >
              <div className={`px-5 py-4 border-b border-slate-700/50 flex items-center justify-between ${
                shipment.status === 'ready' ? 'bg-blue-500/5' : 'bg-amber-500/5'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                    <i className="fab fa-amazon text-orange-400 text-xl"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">{shipment.name}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full flex items-center gap-1 ${
                        shipment.status === 'ready'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {shipment.status === 'ready' ? (
                          <>
                            <Check className="w-3 h-3" />
                            Ready to Ship
                          </>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                            Prepping
                          </>
                        )}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{shipment.destinationCode} - {shipment.destinationCity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400">Ship By</div>
                  <div className="text-lg font-bold text-white">{formatDate(shipment.shipByDate)}</div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Shipment Contents */}
                <div>
                  <div className="text-xs text-slate-400 mb-2">CONTENTS</div>
                  <div className="space-y-2">
                    {shipment.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-emerald-500/20 rounded flex items-center justify-center">
                            <Package className="w-4 h-4 text-emerald-400" />
                          </div>
                          <span className="text-white">{item.productName}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-white font-medium">{item.quantity} units</span>
                          <span className="text-slate-500 ml-2">{Math.ceil(item.quantity / 12)} cases</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-400">Prep Progress</span>
                    <span className={`font-medium ${shipment.status === 'ready' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {totalPrepped} / {totalUnits} units
                    </span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${shipment.status === 'ready' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Prep Tasks */}
                <div>
                  <div className="text-xs text-slate-400 mb-2">PREP TASKS</div>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleTogglePrepTask(shipment.id, 'stickers')}
                      className={`w-full flex items-center justify-between text-sm p-2 rounded-lg transition-colors ${
                        shipment.prepTasks.stickers ? 'bg-emerald-500/10' : 'bg-slate-800/50 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {shipment.prepTasks.stickers ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-slate-500" />
                        )}
                        <span className={shipment.prepTasks.stickers ? 'text-slate-300' : 'text-slate-400'}>
                          Apply Gripper Stickers
                        </span>
                      </div>
                      <span className={shipment.prepTasks.stickers ? 'text-emerald-400' : 'text-slate-500'}>
                        {totalUnits} / {totalUnits}
                      </span>
                    </button>
                    <button
                      onClick={() => handleTogglePrepTask(shipment.id, 'fnsku')}
                      className={`w-full flex items-center justify-between text-sm p-2 rounded-lg transition-colors ${
                        shipment.prepTasks.fnsku ? 'bg-emerald-500/10' : 'bg-slate-800/50 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {shipment.prepTasks.fnsku ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-slate-500" />
                        )}
                        <span className={shipment.prepTasks.fnsku ? 'text-slate-300' : 'text-slate-400'}>
                          Apply FNSKU Labels
                        </span>
                      </div>
                      <span className={shipment.prepTasks.fnsku ? 'text-emerald-400' : 'text-slate-500'}>
                        {totalUnits} / {totalUnits}
                      </span>
                    </button>
                    <button
                      onClick={() => handleTogglePrepTask(shipment.id, 'casePacked')}
                      className={`w-full flex items-center justify-between text-sm p-2 rounded-lg transition-colors ${
                        shipment.prepTasks.casePacked
                          ? 'bg-emerald-500/10'
                          : !shipment.prepTasks.fnsku
                          ? 'bg-slate-800/30 opacity-50 cursor-not-allowed'
                          : 'bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20'
                      }`}
                      disabled={!shipment.prepTasks.fnsku}
                    >
                      <div className="flex items-center gap-2">
                        {shipment.prepTasks.casePacked ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : shipment.prepTasks.fnsku ? (
                          <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-slate-500" />
                        )}
                        <span className={shipment.prepTasks.casePacked ? 'text-slate-300' : shipment.prepTasks.fnsku ? 'text-white' : 'text-slate-400'}>
                          Pack into Cases
                        </span>
                      </div>
                      <span className={shipment.prepTasks.casePacked ? 'text-emerald-400' : 'text-slate-500'}>
                        {totalCases} / {expectedCases} cases
                      </span>
                    </button>
                    <button
                      onClick={() => handleTogglePrepTask(shipment.id, 'palletized')}
                      className={`w-full flex items-center justify-between text-sm p-2 rounded-lg transition-colors ${
                        shipment.prepTasks.palletized
                          ? 'bg-emerald-500/10'
                          : !shipment.prepTasks.casePacked
                          ? 'bg-slate-800/30 opacity-50 cursor-not-allowed'
                          : 'bg-slate-800/50 hover:bg-slate-700/50'
                      }`}
                      disabled={!shipment.prepTasks.casePacked}
                    >
                      <div className="flex items-center gap-2">
                        {shipment.prepTasks.palletized ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-slate-500" />
                        )}
                        <span className={shipment.prepTasks.palletized ? 'text-slate-300' : 'text-slate-400'}>
                          Palletize
                        </span>
                      </div>
                      <span className={shipment.prepTasks.palletized ? 'text-emerald-400' : 'text-slate-500'}>
                        {shipment.prepTasks.palletized ? 1 : 0} / 1 pallet
                      </span>
                    </button>
                  </div>
                </div>

                {/* Costs */}
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-2">PREP COSTS (Est.)</div>
                  <div className="grid grid-cols-4 gap-2 text-center text-sm">
                    <div>
                      <div className="text-white font-medium">${(totalUnits * 0.32).toFixed(2)}</div>
                      <div className="text-xs text-slate-500">Stickers</div>
                    </div>
                    <div>
                      <div className="text-white font-medium">${(totalUnits * 0.04).toFixed(2)}</div>
                      <div className="text-xs text-slate-500">FNSKU</div>
                    </div>
                    <div>
                      <div className="text-white font-medium">${(expectedCases * 1.00).toFixed(2)}</div>
                      <div className="text-xs text-slate-500">Cases</div>
                    </div>
                    <div>
                      <div className="text-emerald-400 font-medium">${prepCost.toFixed(2)}</div>
                      <div className="text-xs text-slate-500">Total</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {shipment.status === 'ready' ? (
                  <div className="grid grid-cols-2 gap-3">
                    <button className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                      <Printer className="w-4 h-4" />
                      Print Labels
                    </button>
                    <button
                      onClick={() => {
                        setSelectedShipment(shipment);
                        setShowShipModal(true);
                      }}
                      className="px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Truck className="w-4 h-4" />
                      Mark Shipped
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedShipment(shipment);
                      setShowPrepModal(true);
                    }}
                    className="w-full px-4 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Continue Prepping
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Show empty state if no active shipments */}
      {fbaShipments.filter(s => s.status !== 'shipped').length === 0 && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-12 text-center">
          <i className="fab fa-amazon text-6xl text-orange-400/30 mb-4"></i>
          <h3 className="text-xl font-semibold text-white mb-2">No Active FBA Shipments</h3>
          <p className="text-slate-400 mb-6">Create a new shipment to start prepping inventory for Amazon</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New FBA Shipment
          </button>
        </div>
      )}

      {/* Case Pack Reference */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-white">Case Pack Configuration</h2>
            <p className="text-xs text-slate-400">Standard case quantities for FBA shipments</p>
          </div>
          <button className="text-sm text-orange-400 hover:text-orange-300">
            Edit Configuration
          </button>
        </div>
        <div className="p-4 grid grid-cols-4 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-400 font-bold">500ml</span>
            </div>
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-xs text-slate-400">units/case</div>
            <div className="text-xs text-slate-500 mt-1">~15 lbs/case</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-emerald-400 font-bold">1L</span>
            </div>
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-xs text-slate-400">units/case</div>
            <div className="text-xs text-slate-500 mt-1">~18 lbs/case</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-purple-400 font-bold">4L</span>
            </div>
            <div className="text-2xl font-bold text-white">4</div>
            <div className="text-xs text-slate-400">units/case</div>
            <div className="text-xs text-slate-500 mt-1">~20 lbs/case</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 text-center">
            <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Layers className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white">4</div>
            <div className="text-xs text-slate-400">bundles/case</div>
            <div className="text-xs text-slate-500 mt-1">Kitted first</div>
          </div>
        </div>
      </div>

      {/* Shipment History */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-white">Shipment History</h2>
            <p className="text-xs text-slate-400">Recent FBA shipments and their status</p>
          </div>
          <button className="text-sm text-orange-400 hover:text-orange-300">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700/50">
              <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-3 font-medium">Shipment ID</th>
                <th className="px-4 py-3 font-medium">Destination</th>
                <th className="px-4 py-3 font-medium">Units</th>
                <th className="px-4 py-3 font-medium">Cases</th>
                <th className="px-4 py-3 font-medium">Prep Cost</th>
                <th className="px-4 py-3 font-medium">Ship Cost</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Shipped</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {fbaShipments.filter(s => s.status === 'shipped').map(shipment => {
                const totalUnits = shipment.items.reduce((sum, i) => sum + i.quantity, 0);
                const totalCases = Math.ceil(totalUnits / 12);
                return (
                  <tr key={shipment.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-sm text-white">{shipment.name}</td>
                    <td className="px-4 py-3 text-sm text-white">{shipment.destinationCode} - {shipment.destinationCity}</td>
                    <td className="px-4 py-3 text-sm text-white">{totalUnits}</td>
                    <td className="px-4 py-3 text-sm text-white">{totalCases}</td>
                    <td className="px-4 py-3 text-sm text-white">${(totalUnits * 0.44).toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-white">${shipment.shippingCost?.toFixed(2) || '0.00'}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full">Shipped</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {shipment.shippedAt ? formatDate(shipment.shippedAt) : '-'}
                    </td>
                  </tr>
                );
              })}
              {fbaShipments.filter(s => s.status === 'shipped').length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                    No shipped shipments yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
          <div className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto m-4">
            <div className="p-6 border-b border-slate-700 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
              <div>
                <h2 className="text-xl font-bold text-white">Create FBA Shipment</h2>
                <p className="text-sm text-slate-400">Select products and quantities to send to Amazon</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Shipment Name</label>
                  <input
                    type="text"
                    value={newShipmentName}
                    onChange={(e) => setNewShipmentName(e.target.value)}
                    placeholder="e.g., January Restock"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Destination</label>
                  <select
                    value={newDestination}
                    onChange={(e) => setNewDestination(e.target.value as 'amazon_usa' | 'amazon_canada')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="amazon_usa">Amazon USA</option>
                    <option value="amazon_canada">Amazon Canada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Fulfillment Center (Optional)</label>
                <select
                  value={newDestinationCode}
                  onChange={(e) => setNewDestinationCode(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="">Auto-assign by Amazon</option>
                  <option value="PHX5">PHX5 - Phoenix, AZ</option>
                  <option value="DFW7">DFW7 - Dallas, TX</option>
                  <option value="ONT8">ONT8 - San Bernardino, CA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Add Products</label>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                  />
                </div>
                {productSearch && (
                  <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden mb-3">
                    {filteredProducts.map(product => (
                      <button
                        key={product.id}
                        onClick={() => handleAddProduct(product.id)}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-700/50 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-500/20 rounded flex items-center justify-center">
                            <Package className="w-4 h-4 text-emerald-400" />
                          </div>
                          <div>
                            <div className="text-white text-sm">{product.name}</div>
                            <div className="text-xs text-slate-400">{product.sku}</div>
                          </div>
                        </div>
                        <div className="text-sm text-slate-400">Stock: {getTotalStock(product.id)}</div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Selected Products */}
                <div className="space-y-3">
                  {selectedProducts.map(sp => {
                    const product = state.products.find(p => p.id === sp.productId);
                    if (!product) return null;
                    return (
                      <div key={sp.productId} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <div className="text-white">{product.name}</div>
                          <div className="text-xs text-slate-400">Stock: {getTotalStock(product.id)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={sp.quantity}
                            onChange={(e) => handleUpdateQuantity(sp.productId, parseInt(e.target.value) || 0)}
                            className="w-20 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white text-center text-sm"
                          />
                          <span className="text-slate-400 text-sm">= {Math.ceil(sp.quantity / 12)} cases</span>
                          <button
                            onClick={() => handleRemoveProduct(sp.productId)}
                            className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedProducts.length > 0 && (
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="text-sm text-slate-400 mb-3">Shipment Summary</div>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-white">{createModalTotals.totalUnits}</div>
                      <div className="text-xs text-slate-500">Total Units</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{createModalTotals.totalCases}</div>
                      <div className="text-xs text-slate-500">Total Cases</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">~{createModalTotals.totalPallets}</div>
                      <div className="text-xs text-slate-500">Est. Pallets</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-400">${createModalTotals.prepCost.toFixed(2)}</div>
                      <div className="text-xs text-slate-500">Est. Prep Cost</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl">
                  Cancel
                </button>
                <button
                  onClick={handleCreateShipment}
                  disabled={selectedProducts.length === 0}
                  className="flex-1 px-4 py-3 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl font-medium"
                >
                  Create Shipment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prep Modal */}
      {showPrepModal && selectedShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowPrepModal(false)} />
          <div className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-auto m-4">
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Prep Station - {selectedShipment.name}</h2>
                <p className="text-sm text-slate-400">Pack items into cases</p>
              </div>
              <button onClick={() => setShowPrepModal(false)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-amber-500/10 border-2 border-amber-500/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-amber-400 font-medium">NOW PACKING</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Package className="w-10 h-10 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-white">{selectedShipment.items[0]?.productName || 'Product'}</div>
                    <div className="text-slate-400">SKU: {selectedShipment.items[0]?.sku || 'N/A'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-white">12</div>
                    <div className="text-slate-400">units per case</div>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => {
                      addToast('success', 'Case marked complete!');
                    }}
                    className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Case Complete
                  </button>
                  <button className="px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl flex items-center gap-2">
                    <Printer className="w-4 h-4" />
                    Print Case Label
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Overall Progress</span>
                  <span className="text-white">
                    {selectedShipment.items.reduce((sum, i) => sum + i.casePacked, 0)} / {Math.ceil(selectedShipment.items.reduce((sum, i) => sum + i.quantity, 0) / 12)} cases packed
                  </span>
                </div>
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{
                      width: `${(selectedShipment.items.reduce((sum, i) => sum + i.casePacked, 0) / Math.ceil(selectedShipment.items.reduce((sum, i) => sum + i.quantity, 0) / 12)) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ship Modal */}
      {showShipModal && selectedShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowShipModal(false)} />
          <div className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md m-4">
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-xl font-bold text-white">Mark Shipment as Shipped</h2>
              <p className="text-sm text-slate-400">{selectedShipment.name} - {selectedShipment.destinationCode}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Carrier</label>
                <select
                  value={shipCarrier}
                  onChange={(e) => setShipCarrier(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                >
                  <option>UPS Freight</option>
                  <option>FedEx Freight</option>
                  <option>Amazon Partnered Carrier</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Tracking / PRO Number</label>
                <input
                  type="text"
                  value={shipTracking}
                  onChange={(e) => setShipTracking(e.target.value)}
                  placeholder="Enter tracking number..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Shipping Cost</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <input
                    type="number"
                    value={shipCost}
                    onChange={(e) => setShipCost(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowShipModal(false)} className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl">
                  Cancel
                </button>
                <button
                  onClick={handleMarkShipped}
                  className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  Confirm Shipped
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
