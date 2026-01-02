'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export function LocationsSettings() {
  const { state } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Warehouse Locations</h2>
            <p className="text-slate-400 text-sm">Manage your inventory locations</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            Add Location
          </button>
        </div>

        <div className="space-y-3">
          {state.locations.map((location) => (
            <div
              key={location.id}
              className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <i className="fas fa-warehouse text-emerald-400 text-xl"></i>
                </div>
                <div>
                  <div className="font-medium text-white flex items-center gap-2">
                    {location.name}
                    {location.isDefault && (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-400">{location.address || 'No address set'}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right mr-4">
                  <div className="text-white font-medium">
                    {state.inventory.filter(i => i.locationId === location.id).reduce((sum, i) => sum + i.quantity, 0).toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400">Units</div>
                </div>
                <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FBA Locations */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Amazon FBA Locations</h2>
            <p className="text-slate-400 text-sm">Track inventory at Amazon fulfillment centers</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <i className="fab fa-amazon text-orange-400 text-xl"></i>
              </div>
              <div>
                <div className="font-medium text-white">Amazon FBA - US</div>
                <div className="text-sm text-slate-400">Synced from Seller Central</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right mr-4">
                <div className="text-white font-medium">1,247</div>
                <div className="text-xs text-slate-400">Units</div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-lg">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400 text-sm">Synced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
