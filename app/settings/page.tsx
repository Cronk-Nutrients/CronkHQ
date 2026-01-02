'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CompanySettings } from '@/components/settings/CompanySettings';
import { LocationsSettings } from '@/components/settings/LocationsSettings';
import { UsersSettings } from '@/components/settings/UsersSettings';
import { LabelsSettings } from '@/components/settings/LabelsSettings';
import { ShippingSettings } from '@/components/settings/ShippingSettings';
import { NotificationsSettings } from '@/components/settings/NotificationsSettings';
import { IntegrationsSettings } from '@/components/settings/IntegrationsSettings';
import { APIKeysSettings } from '@/components/settings/APIKeysSettings';
import { BillingSettings } from '@/components/settings/BillingSettings';

type SettingsTab =
  | 'company'
  | 'locations'
  | 'users'
  | 'labels'
  | 'shipping'
  | 'notifications'
  | 'integrations'
  | 'api'
  | 'billing';

interface TabConfig {
  id: SettingsTab;
  label: string;
  icon: string;
  href?: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('company');

  const tabs: TabConfig[] = [
    { id: 'company', label: 'Company', icon: 'fa-building' },
    { id: 'locations', label: 'Locations', icon: 'fa-warehouse' },
    { id: 'users', label: 'Users & Permissions', icon: 'fa-users' },
    { id: 'labels', label: 'Labels & Printing', icon: 'fa-print' },
    { id: 'shipping', label: 'Shipping', icon: 'fa-truck' },
    { id: 'notifications', label: 'Notifications', icon: 'fa-bell' },
    { id: 'integrations', label: 'Integrations', icon: 'fa-plug' },
    { id: 'api', label: 'API Keys', icon: 'fa-key' },
    { id: 'billing', label: 'Billing', icon: 'fa-credit-card' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'company':
        return <CompanySettings />;
      case 'locations':
        return <LocationsSettings />;
      case 'users':
        return <UsersSettings />;
      case 'labels':
        return <LabelsSettings />;
      case 'shipping':
        return <ShippingSettings />;
      case 'notifications':
        return <NotificationsSettings />;
      case 'integrations':
        return <IntegrationsSettings />;
      case 'api':
        return <APIKeysSettings />;
      case 'billing':
        return <BillingSettings />;
      default:
        return <CompanySettings />;
    }
  };

  return (
    <div className="flex gap-6 min-h-[calc(100vh-8rem)]">
      {/* Sidebar */}
      <div className="w-56 flex-shrink-0">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-3 sticky top-6">
          <h2 className="text-lg font-bold text-white px-3 py-2 mb-2">Settings</h2>
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              if (tab.href) {
                return (
                  <Link
                    key={tab.id}
                    href={tab.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <i className={`fas ${tab.icon} w-4`}></i>
                    {tab.label}
                  </Link>
                );
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <i className={`fas ${tab.icon} w-4`}></i>
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Additional Links */}
          <div className="mt-6 pt-4 border-t border-slate-700/50">
            <Link
              href="/settings/automations"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-slate-700/50 hover:text-white transition-colors"
            >
              <i className="fas fa-bolt w-4"></i>
              Automations
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {renderContent()}
      </div>
    </div>
  );
}
