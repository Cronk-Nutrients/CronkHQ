'use client';

export function LabelsSettings() {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-2">Labels & Printing</h2>
      <p className="text-slate-400 text-sm mb-6">Configure label printers and templates</p>

      {/* Printers */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Connected Printers</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                <i className="fas fa-print text-slate-400"></i>
              </div>
              <div>
                <div className="font-medium text-white">DYMO LabelWriter 450</div>
                <div className="text-sm text-slate-400">Shipping Labels</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-lg">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-emerald-400 text-sm">Ready</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                <i className="fas fa-print text-slate-400"></i>
              </div>
              <div>
                <div className="font-medium text-white">Zebra ZD420</div>
                <div className="text-sm text-slate-400">Product Labels</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-lg">
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
              <span className="text-emerald-400 text-sm">Ready</span>
            </div>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors">
          <i className="fas fa-plus mr-2"></i>
          Add Printer
        </button>
      </div>

      {/* Label Templates */}
      <div>
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Label Templates</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl text-center">
            <div className="w-full h-24 bg-slate-700 rounded-lg mb-3 flex items-center justify-center">
              <i className="fas fa-shipping-fast text-slate-500 text-2xl"></i>
            </div>
            <div className="font-medium text-white text-sm">Shipping Label</div>
            <div className="text-xs text-slate-400">4x6 inch</div>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl text-center">
            <div className="w-full h-24 bg-slate-700 rounded-lg mb-3 flex items-center justify-center">
              <i className="fas fa-barcode text-slate-500 text-2xl"></i>
            </div>
            <div className="font-medium text-white text-sm">Product Barcode</div>
            <div className="text-xs text-slate-400">2x1 inch</div>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl text-center">
            <div className="w-full h-24 bg-slate-700 rounded-lg mb-3 flex items-center justify-center">
              <i className="fab fa-amazon text-slate-500 text-2xl"></i>
            </div>
            <div className="font-medium text-white text-sm">FNSKU Label</div>
            <div className="text-xs text-slate-400">1x2.625 inch</div>
          </div>
        </div>
      </div>
    </div>
  );
}
