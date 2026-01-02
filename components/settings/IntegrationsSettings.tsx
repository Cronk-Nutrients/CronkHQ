'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useOrganization } from '@/context/OrganizationContext';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconType?: 'fab' | 'fas';
  color: string;
  category: 'sales' | 'shipping' | 'automation' | 'marketing-ads' | 'marketing-email' | 'marketing-analytics';
  details?: string;
  badge?: string;
  badgeColor?: string;
  href?: string;
}

interface ConnectedIntegration {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconType?: 'fab' | 'fas';
  color: string;
  details: string;
  badge?: string;
  badgeColor?: string;
  href?: string;
}

const integrations: Integration[] = [
  // Sales Channels
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'E-commerce',
    icon: 'fa-shopify',
    iconType: 'fab',
    color: '#96bf48',
    category: 'sales',
    href: '/settings/integrations/shopify',
  },
  {
    id: 'amazon',
    name: 'Amazon Seller Central',
    description: 'Marketplace',
    icon: 'fa-amazon',
    iconType: 'fab',
    color: '#ff9900',
    category: 'sales',
  },
  {
    id: 'walmart',
    name: 'Walmart',
    description: 'Marketplace',
    icon: 'W',
    color: '#0071dc',
    category: 'sales'
  },
  {
    id: 'ebay',
    name: 'eBay',
    description: 'Marketplace',
    icon: 'fa-ebay',
    iconType: 'fab',
    color: '#e53238',
    category: 'sales'
  },
  {
    id: 'etsy',
    name: 'Etsy',
    description: 'Marketplace',
    icon: 'fa-etsy',
    iconType: 'fab',
    color: '#f56400',
    category: 'sales'
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    description: 'E-commerce',
    icon: 'fa-wordpress',
    iconType: 'fab',
    color: '#96588a',
    category: 'sales'
  },
  {
    id: 'bigcommerce',
    name: 'BigCommerce',
    description: 'E-commerce',
    icon: 'BC',
    color: '#34313f',
    category: 'sales'
  },
  {
    id: 'tiktok',
    name: 'TikTok Shop',
    description: 'Social Commerce',
    icon: 'fa-tiktok',
    iconType: 'fab',
    color: '#000000',
    category: 'sales'
  },

  // Shipping & Fulfillment
  {
    id: 'shipstation',
    name: 'ShipStation',
    description: 'Shipping Platform',
    icon: 'fa-ship',
    iconType: 'fas',
    color: '#6bc24a',
    category: 'shipping'
  },
  {
    id: 'shippo',
    name: 'Shippo',
    description: 'Shipping API',
    icon: 'S',
    color: '#108cff',
    category: 'shipping'
  },
  {
    id: 'shipbob',
    name: 'ShipBob',
    description: '3PL Fulfillment',
    icon: 'SB',
    color: '#5046e4',
    category: 'shipping'
  },
  {
    id: 'easypost',
    name: 'EasyPost',
    description: 'Shipping API',
    icon: 'EP',
    color: '#4287f5',
    category: 'shipping'
  },
  {
    id: 'deliverr',
    name: 'Flexport / Deliverr',
    description: '3PL Fulfillment',
    icon: 'D',
    color: '#00d4aa',
    category: 'shipping'
  },
  {
    id: 'pirateship',
    name: 'Pirate Ship',
    description: 'Discount Shipping',
    icon: 'fa-skull-crossbones',
    iconType: 'fas',
    color: '#7c3aed',
    category: 'shipping'
  },

  // Automation & Tools
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Workflow Automation',
    icon: 'fa-bolt',
    iconType: 'fas',
    color: '#ff4a00',
    category: 'automation'
  },
  {
    id: 'make',
    name: 'Make',
    description: 'Workflow Automation',
    icon: 'M',
    color: '#6d4aff',
    category: 'automation'
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Accounting',
    icon: 'QB',
    color: '#2ca01c',
    category: 'automation'
  },
  {
    id: 'xero',
    name: 'Xero',
    description: 'Accounting',
    icon: 'X',
    color: '#13b5ea',
    category: 'automation'
  },
  {
    id: 'googlesheets',
    name: 'Google Sheets',
    description: 'Data Export',
    icon: 'fa-google',
    iconType: 'fab',
    color: '#0f9d58',
    category: 'automation'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Notifications',
    icon: 'fa-slack',
    iconType: 'fab',
    color: '#4a154b',
    category: 'automation'
  },

  // Marketing - Ad Platforms
  {
    id: 'google-ads',
    name: 'Google Ads',
    description: 'Search & Display Ads',
    icon: 'fa-google',
    iconType: 'fab',
    color: '#4285f4',
    category: 'marketing-ads'
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    description: 'Facebook & Instagram',
    icon: 'fa-meta',
    iconType: 'fab',
    color: '#0081fb',
    category: 'marketing-ads'
  },
  {
    id: 'amazon-ads',
    name: 'Amazon Ads',
    description: 'Sponsored Products & Brands',
    icon: 'fa-amazon',
    iconType: 'fab',
    color: '#ff9900',
    category: 'marketing-ads'
  },
  {
    id: 'tiktok-ads',
    name: 'TikTok Ads',
    description: 'Video Ads',
    icon: 'fa-tiktok',
    iconType: 'fab',
    color: '#000000',
    category: 'marketing-ads'
  },
  {
    id: 'pinterest-ads',
    name: 'Pinterest Ads',
    description: 'Shopping & Idea Pins',
    icon: 'fa-pinterest',
    iconType: 'fab',
    color: '#e60023',
    category: 'marketing-ads'
  },
  {
    id: 'snapchat-ads',
    name: 'Snapchat Ads',
    description: 'Story & Collection Ads',
    icon: 'fa-snapchat',
    iconType: 'fab',
    color: '#fffc00',
    category: 'marketing-ads'
  },
  {
    id: 'microsoft-ads',
    name: 'Microsoft Ads',
    description: 'Bing Search Ads',
    icon: 'fa-microsoft',
    iconType: 'fab',
    color: '#00a4ef',
    category: 'marketing-ads'
  },
  {
    id: 'twitter-ads',
    name: 'X (Twitter) Ads',
    description: 'Promoted Posts',
    icon: 'fa-x-twitter',
    iconType: 'fab',
    color: '#000000',
    category: 'marketing-ads'
  },

  // Marketing - Email & SMS
  {
    id: 'klaviyo',
    name: 'Klaviyo',
    description: 'Email & SMS Marketing',
    icon: 'K',
    color: '#12b789',
    category: 'marketing-email'
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Email Marketing',
    icon: 'fa-mailchimp',
    iconType: 'fab',
    color: '#ffe01b',
    category: 'marketing-email'
  },
  {
    id: 'omnisend',
    name: 'Omnisend',
    description: 'Email & SMS',
    icon: 'O',
    color: '#1d1d1b',
    category: 'marketing-email'
  },
  {
    id: 'postscript',
    name: 'Postscript',
    description: 'SMS Marketing',
    icon: 'PS',
    color: '#5046e4',
    category: 'marketing-email'
  },
  {
    id: 'attentive',
    name: 'Attentive',
    description: 'SMS Marketing',
    icon: 'A',
    color: '#000000',
    category: 'marketing-email'
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'Transactional Email',
    icon: 'SG',
    color: '#1a82e2',
    category: 'marketing-email'
  },
  {
    id: 'drip',
    name: 'Drip',
    description: 'Email Automation',
    icon: 'D',
    color: '#ff6600',
    category: 'marketing-email'
  },
  {
    id: 'convertkit',
    name: 'ConvertKit',
    description: 'Creator Email',
    icon: 'CK',
    color: '#fb6970',
    category: 'marketing-email'
  },

  // Marketing - Analytics & Attribution
  {
    id: 'triple-whale',
    name: 'Triple Whale',
    description: 'Attribution & Analytics',
    icon: '🐳',
    color: '#1e3a5f',
    category: 'marketing-analytics'
  },
  {
    id: 'northbeam',
    name: 'Northbeam',
    description: 'Marketing Attribution',
    icon: 'NB',
    color: '#000000',
    category: 'marketing-analytics'
  },
  {
    id: 'rockerbox',
    name: 'Rockerbox',
    description: 'Marketing Attribution',
    icon: 'RB',
    color: '#ff5722',
    category: 'marketing-analytics'
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Web Analytics',
    icon: 'fa-chart-simple',
    iconType: 'fas',
    color: '#e37400',
    category: 'marketing-analytics'
  },
  {
    id: 'hotjar',
    name: 'Hotjar',
    description: 'Heatmaps & Recordings',
    icon: 'H',
    color: '#fd3a5c',
    category: 'marketing-analytics'
  },
  {
    id: 'segment',
    name: 'Segment',
    description: 'Customer Data Platform',
    icon: 'S',
    color: '#52bd94',
    category: 'marketing-analytics'
  },
];

export function IntegrationsSettings() {
  const { organization } = useOrganization();
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [connectedIntegrations, setConnectedIntegrations] = useState<ConnectedIntegration[]>([]);

  // Listen for organization changes to get connected integrations
  useEffect(() => {
    if (!organization?.id) {
      setConnectedIntegrations([]);
      return;
    }

    const orgRef = doc(db, 'organizations', organization.id);
    const unsubscribe = onSnapshot(orgRef, (snapshot) => {
      if (!snapshot.exists()) {
        setConnectedIntegrations([]);
        return;
      }

      const data = snapshot.data();
      const connected: ConnectedIntegration[] = [];

      // Check Shopify connection
      if (data.shopify?.isConnected) {
        connected.push({
          id: 'shopify',
          name: 'Shopify',
          description: 'E-commerce',
          icon: 'fa-shopify',
          iconType: 'fab',
          color: '#96bf48',
          details: `${data.shopify.storeUrl}`,
          href: '/settings/integrations/shopify',
        });
      }

      // Add other integration checks here as they are implemented
      // if (data.amazon?.isConnected) { ... }
      // if (data.veeqo?.isConnected) { ... }

      setConnectedIntegrations(connected);
    });

    return () => unsubscribe();
  }, [organization?.id]);

  const salesChannels = integrations.filter(i => i.category === 'sales');
  const shippingIntegrations = integrations.filter(i => i.category === 'shipping');
  const automationTools = integrations.filter(i => i.category === 'automation');
  const marketingAds = integrations.filter(i => i.category === 'marketing-ads');
  const marketingEmail = integrations.filter(i => i.category === 'marketing-email');
  const marketingAnalytics = integrations.filter(i => i.category === 'marketing-analytics');

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration);
    // Would open connect modal
  };

  const renderIcon = (integration: Integration | ConnectedIntegration, size: 'sm' | 'lg' = 'sm') => {
    const sizeClass = size === 'lg' ? 'w-12 h-12 text-2xl' : 'w-10 h-10 text-lg';

    if (integration.iconType) {
      return (
        <div
          className={`${sizeClass} rounded-xl flex items-center justify-center`}
          style={{ backgroundColor: integration.color }}
        >
          <i className={`${integration.iconType} ${integration.icon} text-white`}></i>
        </div>
      );
    }

    return (
      <div
        className={`${sizeClass} rounded-xl flex items-center justify-center`}
        style={{ backgroundColor: integration.color }}
      >
        <span className="text-white font-bold">{integration.icon}</span>
      </div>
    );
  };

  // Filter out integrations that are already connected
  const connectedIds = new Set(connectedIntegrations.map(c => c.id));
  const availableSalesChannels = salesChannels.filter(i => !connectedIds.has(i.id));

  const getBadgeClass = (color?: string) => {
    switch (color) {
      case 'emerald': return 'bg-emerald-500/20 text-emerald-400';
      case 'orange': return 'bg-orange-500/20 text-orange-400';
      case 'blue': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-2">Integrations</h2>
      <p className="text-slate-400 text-sm mb-6">Connect your sales channels, shipping carriers, and automation tools</p>

      {/* Connected Integrations */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Connected</h3>
        <div className="space-y-3">
          {connectedIntegrations.map((integration) => {
            const content = (
              <div
                className={`flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl ${
                  integration.href ? 'hover:bg-emerald-500/10 cursor-pointer transition-colors' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  {renderIcon(integration, 'lg')}
                  <div>
                    <div className="font-medium text-white flex items-center gap-2">
                      {integration.name}
                      {integration.badge && (
                        <span className={`px-2 py-0.5 ${getBadgeClass(integration.badgeColor)} text-xs rounded-full`}>
                          {integration.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-slate-400">{integration.details}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-emerald-400 text-sm">Connected</span>
                  </div>
                  <div className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                    <i className="fas fa-cog"></i>
                  </div>
                </div>
              </div>
            );

            if (integration.href) {
              return (
                <Link key={integration.id} href={integration.href}>
                  {content}
                </Link>
              );
            }

            return <div key={integration.id}>{content}</div>;
          })}

          {connectedIntegrations.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <i className="fas fa-plug text-2xl mb-2"></i>
              <p>No integrations connected yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Sales Channels */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Sales Channels</h3>
        <div className="grid grid-cols-3 gap-4">
          {availableSalesChannels.map((integration) => (
            <div
              key={integration.id}
              className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                {renderIcon(integration)}
                <div>
                  <div className="font-medium text-white">{integration.name}</div>
                  <div className="text-xs text-slate-500">{integration.description}</div>
                </div>
              </div>
              {integration.href ? (
                <Link
                  href={integration.href}
                  className={`block w-full px-3 py-2 text-sm rounded-lg transition-colors text-center ${
                    integration.id === 'shopify'
                      ? 'bg-[#96bf48] hover:bg-[#7ea03a] text-white'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  Connect
                </Link>
              ) : (
                <button
                  onClick={() => handleConnect(integration)}
                  className="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-lg transition-colors"
                >
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Shipping & Fulfillment */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Shipping & Fulfillment</h3>
        <div className="grid grid-cols-3 gap-4">
          {shippingIntegrations.map((integration) => (
            <div
              key={integration.id}
              className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                {renderIcon(integration)}
                <div>
                  <div className="font-medium text-white">{integration.name}</div>
                  <div className="text-xs text-slate-500">{integration.description}</div>
                </div>
              </div>
              <button
                onClick={() => handleConnect(integration)}
                className="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-lg transition-colors"
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Automation & Tools */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Automation & Tools</h3>
        <div className="grid grid-cols-3 gap-4">
          {automationTools.map((integration) => (
            <div
              key={integration.id}
              className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                {renderIcon(integration)}
                <div>
                  <div className="font-medium text-white">{integration.name}</div>
                  <div className="text-xs text-slate-500">{integration.description}</div>
                </div>
              </div>
              <button
                onClick={() => handleConnect(integration)}
                className={`w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                  integration.id === 'zapier'
                    ? 'bg-orange-600 hover:bg-orange-500 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Marketing - Advertising Platforms */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">
          <i className="fas fa-bullhorn mr-2"></i>
          Advertising Platforms
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {marketingAds.map((integration) => (
            <div
              key={integration.id}
              className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                {renderIcon(integration)}
                <div>
                  <div className="font-medium text-white">{integration.name}</div>
                  <div className="text-xs text-slate-500">{integration.description}</div>
                </div>
              </div>
              <button
                onClick={() => handleConnect(integration)}
                className="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-lg transition-colors"
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Marketing - Email & SMS */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">
          <i className="fas fa-envelope mr-2"></i>
          Email & SMS Marketing
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {marketingEmail.map((integration) => (
            <div
              key={integration.id}
              className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                {renderIcon(integration)}
                <div>
                  <div className="font-medium text-white">{integration.name}</div>
                  <div className="text-xs text-slate-500">{integration.description}</div>
                </div>
              </div>
              <button
                onClick={() => handleConnect(integration)}
                className={`w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                  integration.id === 'klaviyo'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Marketing - Analytics & Attribution */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">
          <i className="fas fa-chart-line mr-2"></i>
          Analytics & Attribution
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {marketingAnalytics.map((integration) => (
            <div
              key={integration.id}
              className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                {renderIcon(integration)}
                <div>
                  <div className="font-medium text-white">{integration.name}</div>
                  <div className="text-xs text-slate-500">{integration.description}</div>
                </div>
              </div>
              <button
                onClick={() => handleConnect(integration)}
                className="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm rounded-lg transition-colors"
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Integration */}
      <div className="p-4 border-2 border-dashed border-slate-700 rounded-xl text-center">
        <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3">
          <i className="fas fa-code text-slate-400 text-xl"></i>
        </div>
        <h4 className="font-medium text-white mb-1">Custom Integration</h4>
        <p className="text-sm text-slate-400 mb-3">Use our REST API to build custom integrations</p>
        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm rounded-lg transition-colors">
          View API Documentation
        </button>
      </div>
    </div>
  );
}
