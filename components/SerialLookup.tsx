'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp, SerialNumber } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/formatting';
import {
  Search,
  Hash,
  Package,
  MapPin,
  Calendar,
  ShoppingCart,
  FileText,
  X,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface SerialLookupProps {
  onClose?: () => void;
  embedded?: boolean;
}

export function SerialLookup({ onClose, embedded = false }: SerialLookupProps) {
  const { state } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SerialNumber | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Search for serial
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();
    const found = state.serialNumbers.find(
      sn => sn.serial.toLowerCase() === query || sn.serial.toLowerCase().includes(query)
    );

    if (found) {
      setSearchResult(found);
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResult(null);
    setNotFound(false);
  };

  // Get status badge
  const getStatusBadge = (status: SerialNumber['status']) => {
    const configs = {
      in_stock: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', icon: CheckCircle, label: 'In Stock' },
      reserved: { bg: 'bg-amber-500/20', text: 'text-amber-400', icon: Clock, label: 'Reserved' },
      sold: { bg: 'bg-blue-500/20', text: 'text-blue-400', icon: ShoppingCart, label: 'Sold' },
      returned: { bg: 'bg-purple-500/20', text: 'text-purple-400', icon: RotateCcw, label: 'Returned' },
      damaged: { bg: 'bg-red-500/20', text: 'text-red-400', icon: AlertTriangle, label: 'Damaged' },
    };
    const config = configs[status];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  // Get related serials (same product)
  const relatedSerials = useMemo(() => {
    if (!searchResult) return [];
    return state.serialNumbers
      .filter(sn => sn.productId === searchResult.productId && sn.id !== searchResult.id)
      .slice(0, 5);
  }, [searchResult, state.serialNumbers]);

  const content = (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Enter or scan serial number..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 font-mono"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button onClick={handleSearch}>
          <Search className="w-4 h-4" />
          Search
        </Button>
      </div>

      {/* Not Found */}
      {notFound && (
        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg text-center">
          <Hash className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-white font-medium mb-1">Serial Not Found</h3>
          <p className="text-sm text-slate-400">
            No serial number matching "{searchQuery}" was found in the system.
          </p>
        </div>
      )}

      {/* Search Result */}
      {searchResult && (
        <div className="space-y-4">
          {/* Main Info Card */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Hash className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-mono font-medium text-white">{searchResult.serial}</h3>
                  <p className="text-sm text-slate-400">{searchResult.productName}</p>
                </div>
              </div>
              {getStatusBadge(searchResult.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">SKU:</span>
                <span className="font-mono text-white">{searchResult.sku}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">Location:</span>
                <span className="text-white">{searchResult.locationName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400">Received:</span>
                <span className="text-white">{formatDate(searchResult.receivedAt)}</span>
              </div>
              {searchResult.soldAt && (
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">Sold:</span>
                  <span className="text-white">{formatDate(searchResult.soldAt)}</span>
                </div>
              )}
            </div>

            {/* Links */}
            <div className="mt-4 pt-4 border-t border-slate-700/50 flex flex-wrap gap-2">
              <Link
                href={`/inventory/${searchResult.productId}`}
                className="inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300"
              >
                <Package className="w-4 h-4" />
                View Product
                <ArrowRight className="w-3 h-3" />
              </Link>
              {searchResult.purchaseOrderId && (
                <Link
                  href={`/purchase-orders`}
                  className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 ml-4"
                >
                  <FileText className="w-4 h-4" />
                  View PO
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
              {searchResult.salesOrderId && (
                <Link
                  href={`/orders/${searchResult.salesOrderId}`}
                  className="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 ml-4"
                >
                  <ShoppingCart className="w-4 h-4" />
                  View Order
                  <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>

            {/* Notes */}
            {searchResult.notes && (
              <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                <span className="text-xs text-slate-400 uppercase">Notes</span>
                <p className="text-sm text-white mt-1">{searchResult.notes}</p>
              </div>
            )}
          </Card>

          {/* Related Serials */}
          {relatedSerials.length > 0 && (
            <Card className="p-4">
              <h4 className="text-sm font-medium text-white mb-3">
                Other Serials for this Product ({state.serialNumbers.filter(sn => sn.productId === searchResult.productId).length} total)
              </h4>
              <div className="space-y-2">
                {relatedSerials.map(sn => (
                  <button
                    key={sn.id}
                    onClick={() => {
                      setSearchQuery(sn.serial);
                      setSearchResult(sn);
                    }}
                    className="w-full flex items-center justify-between p-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors"
                  >
                    <span className="font-mono text-sm text-white">{sn.serial}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{sn.locationName}</span>
                      {getStatusBadge(sn.status)}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Empty State */}
      {!searchResult && !notFound && (
        <div className="p-8 text-center">
          <Hash className="w-16 h-16 text-slate-700 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Serial Number Lookup</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Enter a serial number above to look up its status, location, and history.
            You can also scan a barcode with the serial number.
          </p>
        </div>
      )}
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-white flex items-center gap-2">
          <Hash className="w-5 h-5 text-purple-400" />
          Serial Number Lookup
        </h2>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      {content}
    </Card>
  );
}

export default SerialLookup;
