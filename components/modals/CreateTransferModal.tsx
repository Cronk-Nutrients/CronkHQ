'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useApp, StockTransfer, TransferItem, Product } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';

interface CreateTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: Product | null;
}

export function CreateTransferModal({ isOpen, onClose, preselectedProduct }: CreateTransferModalProps) {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { success, error } = useToast();

  // Form state
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Transfer items
  const [transferItems, setTransferItems] = useState<{
    productId: string;
    productName: string;
    sku: string;
    requestedQty: number;
  }[]>([]);

  // Get stock at location
  const getStockAtLocation = (productId: string, locationId: string) => {
    const inv = state.inventory.find(i => i.productId === productId && i.locationId === locationId);
    return inv?.quantity || 0;
  };

  // Available products at source location
  const availableProducts = useMemo(() => {
    if (!fromLocation) return [];

    let products = state.products.filter(p => {
      const stock = getStockAtLocation(p.id, fromLocation);
      return stock > 0 && !transferItems.some(ti => ti.productId === p.id);
    });

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.sku.toLowerCase().includes(search)
      );
    }

    return products;
  }, [state.products, state.inventory, fromLocation, searchTerm, transferItems]);

  // Add product to transfer
  const addProduct = (product: Product) => {
    const available = getStockAtLocation(product.id, fromLocation);
    setTransferItems([
      ...transferItems,
      {
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        requestedQty: Math.min(1, available),
      },
    ]);
    setSearchTerm('');
    setShowSearchResults(false);
  };

  // Update item quantity
  const updateItemQty = (index: number, qty: number) => {
    const item = transferItems[index];
    const available = getStockAtLocation(item.productId, fromLocation);
    setTransferItems(
      transferItems.map((ti, i) =>
        i === index ? { ...ti, requestedQty: Math.min(Math.max(1, qty), available) } : ti
      )
    );
  };

  // Remove item
  const removeItem = (index: number) => {
    setTransferItems(transferItems.filter((_, i) => i !== index));
  };

  // Generate transfer number
  const generateTransferNumber = () => {
    const num = state.transfers.length + 1;
    return `TRF-${String(num).padStart(4, '0')}`;
  };

  // Handle create
  const handleCreate = () => {
    if (!fromLocation) {
      error('Please select a source location');
      return;
    }

    if (!toLocation) {
      error('Please select a destination location');
      return;
    }

    if (fromLocation === toLocation) {
      error('Source and destination must be different');
      return;
    }

    if (transferItems.length === 0) {
      error('Please add at least one product to transfer');
      return;
    }

    const fromLoc = state.locations.find(l => l.id === fromLocation);
    const toLoc = state.locations.find(l => l.id === toLocation);
    const transferNumber = generateTransferNumber();

    const newTransfer: StockTransfer = {
      id: `trf-${Date.now()}`,
      transferNumber,
      status: 'pending',
      fromLocation,
      fromLocationName: fromLoc?.name || '',
      toLocation,
      toLocationName: toLoc?.name || '',
      items: transferItems.map(item => ({
        productId: item.productId,
        productName: item.productName,
        sku: item.sku,
        requestedQty: item.requestedQty,
        shippedQty: 0,
        receivedQty: 0,
        status: 'pending' as const,
      })),
      notes: notes || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch({ type: 'ADD_TRANSFER', payload: newTransfer });
    success(`Transfer ${transferNumber} created`);
    handleClose();
    router.push(`/inventory/transfers/${newTransfer.id}`);
  };

  // Reset and close
  const handleClose = () => {
    setFromLocation('');
    setToLocation('');
    setNotes('');
    setSearchTerm('');
    setShowSearchResults(false);
    setTransferItems([]);
    onClose();
  };

  // Handle preselected product
  useMemo(() => {
    if (preselectedProduct && fromLocation && !transferItems.some(ti => ti.productId === preselectedProduct.id)) {
      const available = getStockAtLocation(preselectedProduct.id, fromLocation);
      if (available > 0) {
        setTransferItems([{
          productId: preselectedProduct.id,
          productName: preselectedProduct.name,
          sku: preselectedProduct.sku,
          requestedQty: Math.min(1, available),
        }]);
      }
    }
  }, [preselectedProduct, fromLocation]);

  if (!isOpen) return null;

  const totalUnits = transferItems.reduce((sum, item) => sum + item.requestedQty, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose}></div>

        {/* Modal */}
        <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <div>
              <h2 className="text-xl font-bold text-white">Create Stock Transfer</h2>
              <p className="text-sm text-slate-400">Move inventory between locations</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Location Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  From Location
                </label>
                <select
                  value={fromLocation}
                  onChange={(e) => {
                    setFromLocation(e.target.value);
                    setTransferItems([]);
                  }}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Select source...</option>
                  {state.locations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  To Location
                </label>
                <select
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  disabled={!fromLocation}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                >
                  <option value="">Select destination...</option>
                  {state.locations
                    .filter(l => l.id !== fromLocation)
                    .map(loc => (
                      <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                </select>
              </div>
            </div>

            {/* Visual Arrow */}
            {fromLocation && toLocation && (
              <div className="flex items-center justify-center gap-4 py-2">
                <div className="text-slate-400 font-medium">
                  {state.locations.find(l => l.id === fromLocation)?.name}
                </div>
                <i className="fas fa-arrow-right text-emerald-400 text-xl"></i>
                <div className="text-slate-400 font-medium">
                  {state.locations.find(l => l.id === toLocation)?.name}
                </div>
              </div>
            )}

            {/* Add Products */}
            {fromLocation && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Add Products to Transfer
                </label>
                <div className="relative">
                  <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
                  <input
                    type="text"
                    placeholder="Search products at source location..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSearchResults(true);
                    }}
                    onFocus={() => setShowSearchResults(true)}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />

                  {/* Search Results Dropdown */}
                  {showSearchResults && searchTerm && (
                    <div className="absolute top-full left-0 right-0 bg-slate-800 border border-slate-700 rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
                      {availableProducts.length === 0 ? (
                        <div className="p-4 text-center text-slate-500">
                          No products found
                        </div>
                      ) : (
                        availableProducts.slice(0, 10).map(product => (
                          <button
                            key={product.id}
                            onClick={() => addProduct(product)}
                            className="w-full flex items-center justify-between p-3 hover:bg-slate-700 transition-colors text-left"
                          >
                            <div>
                              <div className="text-white">{product.name}</div>
                              <div className="text-sm text-slate-400">{product.sku}</div>
                            </div>
                            <div className="text-sm text-slate-400">
                              {getStockAtLocation(product.id, fromLocation)} available
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Selected Items */}
                {transferItems.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {transferItems.map((item, index) => (
                      <div key={item.productId} className="flex items-center gap-4 p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                        <div className="flex-1">
                          <div className="text-white">{item.productName}</div>
                          <div className="text-sm text-slate-400">
                            {item.sku} &bull; Available: {getStockAtLocation(item.productId, fromLocation)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-slate-400">Qty:</label>
                          <input
                            type="number"
                            min={1}
                            max={getStockAtLocation(item.productId, fromLocation)}
                            value={item.requestedQty}
                            onChange={(e) => updateItemQty(index, parseInt(e.target.value) || 1)}
                            className="w-20 bg-slate-700/50 border border-slate-600 rounded px-2 py-1 text-white text-center focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        <button
                          onClick={() => removeItem(index)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}

                    <div className="flex justify-end pt-2 text-slate-400">
                      Total: {transferItems.length} product{transferItems.length !== 1 ? 's' : ''}, {totalUnits} unit{totalUnits !== 1 ? 's' : ''}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Reason for transfer, special instructions..."
                rows={3}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700/50">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!fromLocation || !toLocation || transferItems.length === 0}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fas fa-exchange-alt"></i>
              Create Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
