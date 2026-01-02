'use client';

export function UsersSettings() {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Users & Permissions</h2>
          <p className="text-slate-400 text-sm">Manage team members and their access levels</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors">
          <i className="fas fa-user-plus mr-2"></i>
          Invite User
        </button>
      </div>

      <div className="space-y-3">
        {/* Admin User */}
        <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">JC</span>
            </div>
            <div>
              <div className="font-medium text-white">John Cronk</div>
              <div className="text-sm text-slate-400">john@cronknutrients.com</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full">
              Admin
            </span>
            <span className="text-xs text-slate-500">You</span>
          </div>
        </div>

        {/* Warehouse User */}
        <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">WA</span>
            </div>
            <div>
              <div className="font-medium text-white">Warehouse Associate</div>
              <div className="text-sm text-slate-400">warehouse@cronknutrients.com</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
              Warehouse
            </span>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Roles */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">Roles</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <i className="fas fa-shield-alt text-emerald-400"></i>
              <span className="font-medium text-white">Admin</span>
            </div>
            <p className="text-sm text-slate-400">Full access to all features including costs, reports, and settings</p>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <i className="fas fa-warehouse text-blue-400"></i>
              <span className="font-medium text-white">Warehouse</span>
            </div>
            <p className="text-sm text-slate-400">Pick, pack, ship orders. No access to costs or financial data</p>
          </div>
        </div>
      </div>
    </div>
  );
}
