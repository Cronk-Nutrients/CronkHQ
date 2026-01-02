'use client';

export function ShippingSettings() {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-2">Shipping Settings</h2>
      <p className="text-slate-400 text-sm mb-6">Configure shipping carriers and default settings</p>

      {/* Default Settings */}
      <div className="mb-8 space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-2">Default Carrier</label>
          <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500">
            <option>USPS</option>
            <option>UPS</option>
            <option>FedEx</option>
            <option>DHL</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-2">Default Service</label>
          <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500">
            <option>Priority Mail</option>
            <option>Ground Advantage</option>
            <option>First Class</option>
            <option>Express</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-2">Default Package Type</label>
          <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500">
            <option>Package</option>
            <option>Flat Rate Envelope</option>
            <option>Small Flat Rate Box</option>
            <option>Medium Flat Rate Box</option>
            <option>Large Flat Rate Box</option>
          </select>
        </div>
      </div>

      {/* Ship From Address */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Ship From Address</h3>
        <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
          <div className="text-white">Cronk Nutrients</div>
          <div className="text-slate-400">123 Warehouse Way</div>
          <div className="text-slate-400">Rosenberg, TX 77471</div>
          <button className="mt-3 text-emerald-400 hover:text-emerald-300 text-sm">
            <i className="fas fa-edit mr-1"></i> Edit
          </button>
        </div>
      </div>

      {/* Packing Slip */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Packing Slip</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 bg-slate-800" />
            <span className="text-slate-300">Include packing slip in shipments</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 bg-slate-800" />
            <span className="text-slate-300">Show prices on packing slip</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 bg-slate-800" />
            <span className="text-slate-300">Include promotional insert</span>
          </label>
        </div>
      </div>
    </div>
  );
}
