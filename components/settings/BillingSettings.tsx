'use client';

import { useAuth } from '@/context/AuthContext';

export function BillingSettings() {
  const { isDemo } = useAuth();

  // Demo pricing
  const monthlyPrice = isDemo ? 499 : 79;
  const planName = isDemo ? 'Enterprise Plan' : 'Pro Plan';
  const planFeatures = isDemo
    ? 'Unlimited everything, dedicated support, custom integrations, API access'
    : 'Unlimited orders, advanced analytics, priority support';

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 backdrop-blur border border-emerald-500/30 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-bold text-white">{planName}</h2>
              <span className="px-2 py-0.5 bg-emerald-500/30 text-emerald-400 text-xs rounded-full">
                Active
              </span>
            </div>
            <p className="text-slate-300">{planFeatures}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">${monthlyPrice}</div>
            <div className="text-slate-400">/month</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-emerald-500/20 flex items-center justify-between">
          <div className="text-sm text-slate-400">
            <i className="fas fa-calendar mr-2"></i>
            Next billing date: February 15, 2024
          </div>
          <button className="text-emerald-400 hover:text-emerald-300 text-sm">
            Change Plan
          </button>
        </div>
      </div>

      {/* Usage */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Usage This Month</h2>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Orders Processed</span>
              <span className="text-white font-medium">2,847 / Unlimited</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">SKUs</span>
              <span className="text-white font-medium">156 / Unlimited</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">API Calls</span>
              <span className="text-white font-medium">45,234 / 100,000</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Payment Method</h2>
          <button className="text-emerald-400 hover:text-emerald-300 text-sm">
            <i className="fas fa-plus mr-2"></i>
            Add Payment Method
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center">
              <i className="fab fa-cc-visa text-white text-xl"></i>
            </div>
            <div>
              <div className="font-medium text-white">Visa ending in 4242</div>
              <div className="text-sm text-slate-400">Expires 12/2026</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
              Default
            </span>
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg">
              <i className="fas fa-edit"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Billing History</h2>
        <div className="overflow-hidden rounded-lg border border-slate-700">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Description</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-slate-400">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <tr className="hover:bg-slate-800/50">
                <td className="px-4 py-3 text-white">Jan 15, 2024</td>
                <td className="px-4 py-3 text-slate-300">{planName} - Monthly</td>
                <td className="px-4 py-3 text-white">${monthlyPrice}.00</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                    Paid
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-emerald-400 hover:text-emerald-300 text-sm">
                    <i className="fas fa-download mr-1"></i>
                    PDF
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="px-4 py-3 text-white">Dec 15, 2023</td>
                <td className="px-4 py-3 text-slate-300">{planName} - Monthly</td>
                <td className="px-4 py-3 text-white">${monthlyPrice}.00</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                    Paid
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-emerald-400 hover:text-emerald-300 text-sm">
                    <i className="fas fa-download mr-1"></i>
                    PDF
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/50">
                <td className="px-4 py-3 text-white">Nov 15, 2023</td>
                <td className="px-4 py-3 text-slate-300">{planName} - Monthly</td>
                <td className="px-4 py-3 text-white">${monthlyPrice}.00</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                    Paid
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-emerald-400 hover:text-emerald-300 text-sm">
                    <i className="fas fa-download mr-1"></i>
                    PDF
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
