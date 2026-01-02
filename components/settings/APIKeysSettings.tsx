'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

interface APIKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  permissions: string[];
}

export function APIKeysSettings() {
  const { success } = useToast();
  const [showKey, setShowKey] = useState<string | null>(null);

  const apiKeys: APIKey[] = [
    {
      id: '1',
      name: 'Production API Key',
      key: 'sk_live_cronk_a1b2c3d4e5f6g7h8i9j0',
      created: '2024-01-15',
      lastUsed: '2 hours ago',
      permissions: ['read', 'write'],
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'sk_test_cronk_z9y8x7w6v5u4t3s2r1q0',
      created: '2024-02-01',
      lastUsed: '1 day ago',
      permissions: ['read'],
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    success('API key copied to clipboard');
  };

  const maskKey = (key: string) => {
    return key.substring(0, 12) + '••••••••••••••••••••';
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">API Keys</h2>
            <p className="text-slate-400 text-sm">Manage API keys for external integrations</p>
          </div>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors">
            <i className="fas fa-plus mr-2"></i>
            Generate New Key
          </button>
        </div>

        <div className="space-y-3">
          {apiKeys.map((apiKey) => (
            <div
              key={apiKey.id}
              className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                    <i className="fas fa-key text-emerald-400"></i>
                  </div>
                  <div>
                    <div className="font-medium text-white">{apiKey.name}</div>
                    <div className="text-xs text-slate-400">
                      Created {apiKey.created} • Last used {apiKey.lastUsed}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {apiKey.permissions.map((perm) => (
                    <span
                      key={perm}
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        perm === 'write'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 bg-slate-900 rounded-lg font-mono text-sm text-slate-300">
                  {showKey === apiKey.id ? apiKey.key : maskKey(apiKey.key)}
                </code>
                <button
                  onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                  title={showKey === apiKey.id ? 'Hide' : 'Show'}
                >
                  <i className={`fas ${showKey === apiKey.id ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
                <button
                  onClick={() => copyToClipboard(apiKey.key)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                  title="Copy"
                >
                  <i className="fas fa-copy"></i>
                </button>
                <button
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                  title="Revoke"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Webhooks */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Webhooks</h2>
            <p className="text-slate-400 text-sm">Configure webhook endpoints for real-time events</p>
          </div>
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
            <i className="fas fa-plus mr-2"></i>
            Add Webhook
          </button>
        </div>

        <div className="p-8 border border-dashed border-slate-700 rounded-xl text-center">
          <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-plug text-slate-500 text-xl"></i>
          </div>
          <div className="text-slate-400 mb-2">No webhooks configured</div>
          <div className="text-sm text-slate-500">
            Add a webhook to receive real-time notifications about orders, inventory, and more
          </div>
        </div>
      </div>

      {/* API Documentation */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">API Documentation</h2>
        <div className="grid grid-cols-3 gap-4">
          <a href="#" className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-emerald-500/50 transition-colors group">
            <i className="fas fa-book text-emerald-400 text-xl mb-3"></i>
            <div className="font-medium text-white group-hover:text-emerald-400 transition-colors">Getting Started</div>
            <div className="text-sm text-slate-400">Learn the basics of our API</div>
          </a>
          <a href="#" className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-emerald-500/50 transition-colors group">
            <i className="fas fa-code text-blue-400 text-xl mb-3"></i>
            <div className="font-medium text-white group-hover:text-emerald-400 transition-colors">API Reference</div>
            <div className="text-sm text-slate-400">Complete endpoint documentation</div>
          </a>
          <a href="#" className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-emerald-500/50 transition-colors group">
            <i className="fas fa-laptop-code text-purple-400 text-xl mb-3"></i>
            <div className="font-medium text-white group-hover:text-emerald-400 transition-colors">SDKs & Libraries</div>
            <div className="text-sm text-slate-400">Node, Python, PHP, and more</div>
          </a>
        </div>
      </div>
    </div>
  );
}
