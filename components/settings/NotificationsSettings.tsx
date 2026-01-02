'use client';

export function NotificationsSettings() {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-2">Notifications</h2>
      <p className="text-slate-400 text-sm mb-6">Configure how you receive alerts and updates</p>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg cursor-pointer">
              <div>
                <div className="text-white">Low Stock Alerts</div>
                <div className="text-sm text-slate-400">Get notified when products reach reorder point</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 bg-slate-800" />
            </label>
            <label className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg cursor-pointer">
              <div>
                <div className="text-white">New Orders</div>
                <div className="text-sm text-slate-400">Get notified when new orders come in</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 bg-slate-800" />
            </label>
            <label className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg cursor-pointer">
              <div>
                <div className="text-white">Daily Summary</div>
                <div className="text-sm text-slate-400">Receive a daily summary of orders and inventory</div>
              </div>
              <input type="checkbox" className="w-4 h-4 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 bg-slate-800" />
            </label>
            <label className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg cursor-pointer">
              <div>
                <div className="text-white">Sync Errors</div>
                <div className="text-sm text-slate-400">Get notified when integration sync fails</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500 bg-slate-800" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
