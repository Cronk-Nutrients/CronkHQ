'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { LocationModal, BoxModal, FulfillmentRuleModal } from '@/components/modals';
import { formatNumber, formatCurrency } from '@/lib/formatting';
import type { Location, ShippingBox, PickingTote, FulfillmentRule } from '@/context/AppContext';
import {
  Settings,
  Building2,
  MapPin,
  Users,
  Tag,
  Zap,
  Box,
  Bell,
  Link2,
  Key,
  Plus,
  Pencil,
  Trash2,
  Check,
  Copy,
  Eye,
  EyeOff,
  Ruler,
  Scale,
  Warehouse,
  Package,
  Truck,
  AlertCircle,
  Upload,
  Camera,
} from 'lucide-react';

type SettingsTab = 'company' | 'locations' | 'users' | 'labels' | 'fulfillment' | 'picking' | 'boxes' | 'automations' | 'notifications' | 'integrations' | 'api';

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: 'read' | 'write' | 'full';
  createdAt: Date;
  lastUsed?: Date;
}

interface Integration {
  id: string;
  name: string;
  type: 'ecommerce' | 'shipping' | 'accounting' | 'automation';
  icon: string;
  iconColor: string;
  connected: boolean;
  details?: string;
}

export default function SettingsPage() {
  const { state, dispatch } = useApp();
  const { success, error } = useToast();
  const confirm = useConfirm();

  const [activeTab, setActiveTab] = useState<SettingsTab>('company');

  // Company form state
  const [companyName, setCompanyName] = useState('Cronk Nutrients');
  const [companyEmail, setCompanyEmail] = useState('admin@cronknutrients.com');
  const [companyPhone, setCompanyPhone] = useState('(555) 123-4567');
  const [companyAddress, setCompanyAddress] = useState('123 Supplement Way\nHealthville, CA 90210');
  const [companyWebsite, setCompanyWebsite] = useState('cronknutrients.com');
  const [companyTimezone, setCompanyTimezone] = useState('America/Los_Angeles');
  const [companyCurrency, setCompanyCurrency] = useState('USD');

  // Location modal state
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  // Box modal state
  const [boxModalOpen, setBoxModalOpen] = useState(false);
  const [editingBox, setEditingBox] = useState<ShippingBox | null>(null);

  // Fulfillment rule modal state
  const [fulfillmentRuleModalOpen, setFulfillmentRuleModalOpen] = useState(false);
  const [editingFulfillmentRule, setEditingFulfillmentRule] = useState<FulfillmentRule | null>(null);

  // API Keys state
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Production API',
      key: 'ck_live_51H5K9J2eZvKYlo2C8Y9hA',
      permissions: 'full',
      createdAt: new Date('2024-12-01'),
      lastUsed: new Date('2024-12-29'),
    },
  ]);
  const [showApiKey, setShowApiKey] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPermission, setNewKeyPermission] = useState<'read' | 'write' | 'full'>('read');

  // Integrations state
  const [integrations] = useState<Integration[]>([
    { id: '1', name: 'Shopify', type: 'ecommerce', icon: 'shopify', iconColor: 'text-green-400', connected: true, details: 'cronknutrients.myshopify.com' },
    { id: '2', name: 'Amazon SP-API', type: 'ecommerce', icon: 'amazon', iconColor: 'text-orange-400', connected: true, details: 'Seller: Cronk Nutrients LLC' },
    { id: '3', name: 'Veeqo', type: 'shipping', icon: 'package', iconColor: 'text-emerald-400', connected: true, details: 'Last sync: 2 min ago' },
    { id: '4', name: 'QuickBooks Online', type: 'accounting', icon: 'dollar', iconColor: 'text-green-500', connected: true, details: 'Cronk Nutrients LLC' },
    { id: '5', name: 'Walmart', type: 'ecommerce', icon: 'store', iconColor: 'text-blue-400', connected: false },
    { id: '6', name: 'ShipStation', type: 'shipping', icon: 'ship', iconColor: 'text-cyan-400', connected: false },
    { id: '7', name: 'Zapier', type: 'automation', icon: 'zap', iconColor: 'text-orange-400', connected: false },
  ]);

  // Fulfillment settings
  const [gripperEnabled, setGripperEnabled] = useState(true);
  const [grippersPerBottle, setGrippersPerBottle] = useState(1);
  const [smartBoxEnabled, setSmartBoxEnabled] = useState(true);
  const [volumeBuffer, setVolumeBuffer] = useState(10);
  const [labelDeductOnCreate, setLabelDeductOnCreate] = useState(true);
  const [lowLabelWarning, setLowLabelWarning] = useState(true);
  const [autoAddLabelCogs, setAutoAddLabelCogs] = useState(true);

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [poAlerts, setPoAlerts] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(true);

  // Label printing settings
  const [defaultLabelFormat, setDefaultLabelFormat] = useState('4x6');
  const [autoPrint, setAutoPrint] = useState(false);
  const [printCopies, setPrintCopies] = useState(1);

  // Picking settings - sync with state
  const [pickingMode, setPickingMode] = useState<'multi_tote' | 'single_tote'>(state.settings.pickingMode);
  const [maxOrdersPerBatch, setMaxOrdersPerBatch] = useState(state.settings.maxOrdersPerBatch);
  const [maxItemsPerBatch, setMaxItemsPerBatch] = useState(state.settings.maxItemsPerBatch);
  const [autoReallocateIncomplete, setAutoReallocateIncomplete] = useState(state.settings.autoReallocateIncomplete);

  const tabs = [
    { id: 'company', label: 'Company', icon: Building2 },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'labels', label: 'Labels', icon: Tag },
    { id: 'fulfillment', label: 'Fulfillment', icon: Zap },
    { id: 'picking', label: 'Picking & Packing', icon: Package },
    { id: 'boxes', label: 'Boxes', icon: Box },
    { id: 'automations', label: 'Automations', icon: Zap, href: '/settings/automations' },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Link2 },
    { id: 'api', label: 'API Keys', icon: Key },
  ];

  // Location handlers
  const handleAddLocation = () => {
    setEditingLocation(null);
    setLocationModalOpen(true);
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setLocationModalOpen(true);
  };

  const handleDeleteLocation = async (location: Location) => {
    const confirmed = await confirm({
      title: 'Delete Location',
      message: `Delete "${location.name}"? Any inventory at this location will need to be reassigned.`,
      confirmText: 'Delete',
      destructive: true,
    });

    if (confirmed) {
      dispatch({ type: 'DELETE_LOCATION', payload: location.id });
      success(`Location "${location.name}" deleted`);
    }
  };

  // Box handlers
  const handleAddBox = () => {
    setEditingBox(null);
    setBoxModalOpen(true);
  };

  const handleEditBox = (box: ShippingBox) => {
    setEditingBox(box);
    setBoxModalOpen(true);
  };

  const handleDeleteBox = async (box: ShippingBox) => {
    const confirmed = await confirm({
      title: 'Delete Shipping Box',
      message: `Delete "${box.name}"? This box will no longer be available for smart box selection.`,
      confirmText: 'Delete',
      destructive: true,
    });

    if (confirmed) {
      dispatch({ type: 'DELETE_BOX', payload: box.id });
      success(`Box "${box.name}" deleted`);
    }
  };

  // Fulfillment Rule handlers
  const handleAddFulfillmentRule = () => {
    setEditingFulfillmentRule(null);
    setFulfillmentRuleModalOpen(true);
  };

  const handleEditFulfillmentRule = (rule: FulfillmentRule) => {
    setEditingFulfillmentRule(rule);
    setFulfillmentRuleModalOpen(true);
  };

  const handleDeleteFulfillmentRule = async (rule: FulfillmentRule) => {
    const confirmed = await confirm({
      title: 'Delete Fulfillment Rule',
      message: `Delete "${rule.name}"? This rule will no longer be applied during order fulfillment.`,
      confirmText: 'Delete',
      destructive: true,
    });

    if (confirmed) {
      dispatch({ type: 'DELETE_FULFILLMENT_RULE', payload: rule.id });
      success(`Rule "${rule.name}" deleted`);
    }
  };

  const handleToggleFulfillmentRule = (rule: FulfillmentRule) => {
    dispatch({
      type: 'UPDATE_FULFILLMENT_RULE',
      payload: { ...rule, enabled: !rule.enabled, updatedAt: new Date() },
    });
    success(`Rule "${rule.name}" ${rule.enabled ? 'disabled' : 'enabled'}`);
  };

  // API Key handlers
  const handleCreateApiKey = () => {
    if (!newKeyName.trim()) {
      error('Please enter a name for the API key');
      return;
    }

    const newKey: APIKey = {
      id: crypto.randomUUID(),
      name: newKeyName.trim(),
      key: `ck_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      permissions: newKeyPermission,
      createdAt: new Date(),
    };

    setApiKeys(prev => [...prev, newKey]);
    setNewKeyName('');
    setNewKeyPermission('read');
    setShowApiKey(newKey.id);
    success('API key created');
  };

  const handleRevokeApiKey = async (key: APIKey) => {
    const confirmed = await confirm({
      title: 'Revoke API Key',
      message: `Revoke "${key.name}"? Any applications using this key will stop working.`,
      confirmText: 'Revoke',
      destructive: true,
    });

    if (confirmed) {
      setApiKeys(prev => prev.filter(k => k.id !== key.id));
      success('API key revoked');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    success('Copied to clipboard');
  };

  // Get location icon/color
  const getLocationStyles = (type: Location['type']) => {
    const styles = {
      warehouse: { icon: Warehouse, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
      fba: { icon: Package, color: 'text-amber-400', bg: 'bg-amber-500/20' },
      fbm: { icon: Truck, color: 'text-blue-400', bg: 'bg-blue-500/20' },
    };
    return styles[type];
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-slate-400">Configure your warehouse management system</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-700/50 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const tabClass = `flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`;

          // If tab has href, render as Link
          if ('href' in tab && tab.href) {
            return (
              <Link key={tab.id} href={tab.href} className={tabClass}>
                <Icon className="h-4 w-4" />
                {tab.label}
              </Link>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={tabClass}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Company Tab */}
      {activeTab === 'company' && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Company Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo */}
                <div className="md:col-span-2">
                  <label className="block text-sm text-slate-400 mb-2">Company Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-slate-700 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-600">
                      <Camera className="w-8 h-8 text-slate-500" />
                    </div>
                    <div>
                      <Button variant="secondary" size="sm">
                        <Upload className="w-4 h-4" />
                        Upload Logo
                      </Button>
                      <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Website</label>
                  <input
                    type="text"
                    value={companyWebsite}
                    onChange={e => setCompanyWebsite(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Contact Email</label>
                  <input
                    type="email"
                    value={companyEmail}
                    onChange={e => setCompanyEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={companyPhone}
                    onChange={e => setCompanyPhone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm text-slate-400 mb-1.5">Business Address</label>
                  <textarea
                    value={companyAddress}
                    onChange={e => setCompanyAddress(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50 resize-none"
                  />
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Timezone</label>
                  <select
                    value={companyTimezone}
                    onChange={e => setCompanyTimezone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                  </select>
                </div>

                {/* Currency */}
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Currency</label>
                  <select
                    value={companyCurrency}
                    onChange={e => setCompanyCurrency(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CAD">CAD ($)</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={() => success('Company settings saved')}>
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Locations Tab */}
      {activeTab === 'locations' && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Warehouse Locations</h2>
                  <p className="text-sm text-slate-400">Manage your inventory storage locations</p>
                </div>
                <Button onClick={handleAddLocation}>
                  <Plus className="w-4 h-4" />
                  Add Location
                </Button>
              </div>

              {state.locations.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">No locations configured</p>
                  <Button className="mt-4" onClick={handleAddLocation}>
                    Add Your First Location
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {state.locations.map(location => {
                    const styles = getLocationStyles(location.type);
                    const Icon = styles.icon;

                    return (
                      <div
                        key={location.id}
                        className="rounded-lg bg-slate-700/30 p-4 border border-slate-600/30"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${styles.bg}`}>
                              <Icon className={`h-5 w-5 ${styles.color}`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-white">{location.name}</p>
                                {location.isDefault && (
                                  <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-400">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400 capitalize">{location.type}</p>
                              {location.address && (
                                <p className="text-xs text-slate-500 mt-1">{location.address}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEditLocation(location)}
                              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteLocation(location)}
                              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Team Members</h2>
                  <p className="text-sm text-slate-400">Manage user access and permissions</p>
                </div>
                <Button>
                  <Plus className="w-4 h-4" />
                  Invite User
                </Button>
              </div>

              <div className="space-y-3">
                {/* Admin User */}
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <span className="text-emerald-400 font-medium">CC</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Cortland Cronk</p>
                      <p className="text-xs text-slate-400">admin@cronknutrients.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-400">
                      Admin
                    </span>
                    <span className="text-xs text-slate-500">You</span>
                  </div>
                </div>

                {/* Example User */}
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-400 font-medium">JD</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Jane Doe</p>
                      <p className="text-xs text-slate-400">warehouse@cronknutrients.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                      Warehouse
                    </span>
                    <button className="text-slate-400 hover:text-white">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Roles */}
          <Card>
            <div className="p-6">
              <h3 className="text-md font-semibold text-white mb-4">User Roles</h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Admin</p>
                      <p className="text-xs text-slate-400">Full access to all features and settings</p>
                    </div>
                    <span className="text-xs text-slate-500">1 user</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">Warehouse</p>
                      <p className="text-xs text-slate-400">Inventory, pick & pack, receiving</p>
                    </div>
                    <span className="text-xs text-slate-500">1 user</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">View Only</p>
                      <p className="text-xs text-slate-400">Read-only access to reports and dashboards</p>
                    </div>
                    <span className="text-xs text-slate-500">0 users</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Labels Tab */}
      {activeTab === 'labels' && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Label Printing</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Default Label Size</label>
                    <select
                      value={defaultLabelFormat}
                      onChange={e => setDefaultLabelFormat(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="4x6">4" x 6" (Shipping Label)</option>
                      <option value="2x1">2" x 1" (Product Barcode)</option>
                      <option value="4x3">4" x 3" (Packing Slip)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">Print Copies</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={printCopies}
                      onChange={e => setPrintCopies(parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                  <Toggle
                    checked={autoPrint}
                    onChange={setAutoPrint}
                    label="Auto-Print Labels"
                    description="Automatically print shipping labels when orders are packed"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-md font-semibold text-white mb-4">PO Label Auto-Deduction</h3>
              <div className="space-y-4">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                  <Toggle
                    checked={labelDeductOnCreate}
                    onChange={setLabelDeductOnCreate}
                    label="Deduct labels on PO creation"
                    description="Labels are reserved immediately when a Purchase Order is created"
                  />
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                  <Toggle
                    checked={lowLabelWarning}
                    onChange={setLowLabelWarning}
                    label="Show warning for low label stock"
                    description="Alert when label inventory is insufficient for PO quantity"
                  />
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                  <Toggle
                    checked={autoAddLabelCogs}
                    onChange={setAutoAddLabelCogs}
                    label="Auto-add label cost to COGS"
                    description="Automatically include label cost in product COGS calculation"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Fulfillment Tab */}
      {activeTab === 'fulfillment' && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Fulfillment Rules Engine</h2>
                  <p className="text-sm text-slate-400">
                    Configure automatic rules for order fulfillment. Rules are applied during packing and shipping.
                  </p>
                </div>
                <Button onClick={handleAddFulfillmentRule}>
                  <Plus className="w-4 h-4" />
                  Add Rule
                </Button>
              </div>

              {state.fulfillmentRules.length === 0 ? (
                <div className="text-center py-12">
                  <Zap className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">No fulfillment rules configured</p>
                  <p className="text-sm text-slate-500 mt-1">Add rules to automate your order fulfillment process</p>
                  <Button className="mt-4" onClick={handleAddFulfillmentRule}>
                    Create Your First Rule
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {state.fulfillmentRules
                    .slice()
                    .sort((a, b) => a.priority - b.priority)
                    .map((rule) => {
                      const typeLabels: Record<string, { icon: typeof Zap; color: string }> = {
                        gripper_sticker: { icon: Tag, color: 'text-amber-400' },
                        box_selection: { icon: Box, color: 'text-blue-400' },
                        label_deduction: { icon: Tag, color: 'text-purple-400' },
                        auto_allocate: { icon: Package, color: 'text-cyan-400' },
                        weight_threshold: { icon: Truck, color: 'text-orange-400' },
                        custom: { icon: Zap, color: 'text-emerald-400' },
                      };
                      const ruleStyle = typeLabels[rule.type] || typeLabels.custom;
                      const Icon = ruleStyle.icon;

                      return (
                        <div
                          key={rule.id}
                          className={`bg-slate-700/30 rounded-lg p-4 border ${
                            rule.enabled ? 'border-slate-700/50' : 'border-slate-700/30 opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                rule.enabled ? 'bg-emerald-500/20' : 'bg-slate-700/50'
                              }`}>
                                <Icon className={`h-5 w-5 ${rule.enabled ? ruleStyle.color : 'text-slate-500'}`} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium text-white">{rule.name}</p>
                                  <span className="px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-400">
                                    Priority: {rule.priority}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400">
                                  {rule.description || `${rule.type.replace(/_/g, ' ')} rule`}
                                </p>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-xs text-slate-500">
                                    {rule.conditions.length} condition{rule.conditions.length !== 1 ? 's' : ''}
                                  </span>
                                  <span className="text-xs text-slate-600">•</span>
                                  <span className="text-xs text-slate-500">
                                    {rule.actions.length} action{rule.actions.length !== 1 ? 's' : ''}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditFulfillmentRule(rule)}
                                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteFulfillmentRule(rule)}
                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <Toggle
                                checked={rule.enabled}
                                onChange={() => handleToggleFulfillmentRule(rule)}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </Card>

          {/* Quick Setup Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Tag className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Gripper Stickers</h3>
                    <p className="text-xs text-slate-400">Auto-add stickers to bottles</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                  Automatically deduct gripper stickers from inventory when orders ship. Works with bundles.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setEditingFulfillmentRule(null);
                    setFulfillmentRuleModalOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Create Gripper Rule
                </Button>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Box className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Smart Box Selection</h3>
                    <p className="text-xs text-slate-400">Auto-select optimal box size</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                  Automatically select the smallest box that fits order items with a configurable volume buffer.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setEditingFulfillmentRule(null);
                    setFulfillmentRuleModalOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Create Box Rule
                </Button>
              </div>
            </Card>
          </div>

          <div className="rounded-xl bg-blue-500/10 border border-blue-500/30 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
              <div className="text-sm text-blue-300">
                <p className="font-medium">How Rules Work</p>
                <p className="mt-1">
                  Rules are processed in priority order (lowest number first). Each rule can have multiple conditions
                  that must all be met (AND logic) and multiple actions that will be executed when conditions match.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Picking Tab */}
      {activeTab === 'picking' && (
        <div className="space-y-6">
          {/* Picking Mode */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-2">Picking Mode</h2>
              <p className="text-sm text-slate-400 mb-6">
                Choose how orders are organized in picking batches
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setPickingMode('multi_tote');
                    dispatch({ type: 'UPDATE_SETTINGS', payload: { pickingMode: 'multi_tote' } });
                  }}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    pickingMode === 'multi_tote'
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      pickingMode === 'multi_tote' ? 'bg-emerald-500/20' : 'bg-slate-700'
                    }`}>
                      <Package className={`w-5 h-5 ${pickingMode === 'multi_tote' ? 'text-emerald-400' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-white">Multi-tote</p>
                      <p className="text-xs text-slate-400">One tote per order</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">
                    Each order is collected in its own picking tote. Best for multi-line item orders.
                  </p>
                </button>

                <button
                  onClick={() => {
                    setPickingMode('single_tote');
                    dispatch({ type: 'UPDATE_SETTINGS', payload: { pickingMode: 'single_tote' } });
                  }}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    pickingMode === 'single_tote'
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      pickingMode === 'single_tote' ? 'bg-emerald-500/20' : 'bg-slate-700'
                    }`}>
                      <Box className={`w-5 h-5 ${pickingMode === 'single_tote' ? 'text-emerald-400' : 'text-slate-400'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-white">Single tote</p>
                      <p className="text-xs text-slate-400">One tote per batch</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">
                    All items are collected in one picking tote. Best for single line item orders.
                  </p>
                </button>
              </div>
            </div>
          </Card>

          {/* Batch Limits */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-2">Batch Limits</h2>
              <p className="text-sm text-slate-400 mb-6">
                Maximum orders and items per picking batch
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Maximum orders per batch</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={maxOrdersPerBatch}
                    onChange={e => {
                      const val = parseInt(e.target.value) || 20;
                      setMaxOrdersPerBatch(val);
                      dispatch({ type: 'UPDATE_SETTINGS', payload: { maxOrdersPerBatch: val } });
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Orders exceeding this limit will be split into multiple batches
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Maximum items per batch</label>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={maxItemsPerBatch}
                    onChange={e => {
                      const val = parseInt(e.target.value) || 100;
                      setMaxItemsPerBatch(val);
                      dispatch({ type: 'UPDATE_SETTINGS', payload: { maxItemsPerBatch: val } });
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    If one order has more items, it will remain in the same batch
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Incomplete Items */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Incomplete Items</h2>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                <Toggle
                  checked={autoReallocateIncomplete}
                  onChange={val => {
                    setAutoReallocateIncomplete(val);
                    dispatch({ type: 'UPDATE_SETTINGS', payload: { autoReallocateIncomplete: val } });
                  }}
                  label="Auto-deallocate incomplete items"
                  description="When items are marked as incomplete during picking, automatically deallocate them from the order and return stock to inventory so it can be reallocated elsewhere."
                />
              </div>
            </div>
          </Card>

          {/* Picking Totes */}
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Picking Totes</h2>
                  <p className="text-sm text-slate-400">
                    Manage totes for this location ({state.pickingTotes.length} configured)
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" onClick={() => {
                    // Generate and print tote barcodes
                    const printWindow = window.open('', '_blank');
                    if (printWindow) {
                      printWindow.document.write('<html><head><title>Tote Barcodes</title>');
                      printWindow.document.write('<style>body { font-family: monospace; } .tote { border: 1px solid #000; padding: 20px; margin: 10px; text-align: center; page-break-inside: avoid; } .barcode { font-size: 24px; letter-spacing: 3px; } .name { font-size: 18px; margin-top: 10px; }</style>');
                      printWindow.document.write('</head><body>');
                      state.pickingTotes.forEach(tote => {
                        printWindow.document.write(`<div class="tote"><div class="barcode">${tote.barcode}</div><div class="name">${tote.name}</div></div>`);
                      });
                      printWindow.document.write('</body></html>');
                      printWindow.document.close();
                      printWindow.print();
                    }
                    success('Printing tote barcodes...');
                  }}>
                    <i className="fas fa-print mr-2"></i>
                    Print Barcodes
                  </Button>
                  <Button onClick={() => {
                    const newTote = {
                      id: crypto.randomUUID(),
                      barcode: `TOTE-${String(state.pickingTotes.length + 1).padStart(3, '0')}`,
                      name: `Tote ${state.pickingTotes.length + 1}`,
                      locationId: state.settings.defaultLocation,
                      isActive: true,
                    };
                    dispatch({ type: 'ADD_PICKING_TOTE', payload: newTote });
                    success('Tote added');
                  }}>
                    <Plus className="w-4 h-4" />
                    Add Tote
                  </Button>
                </div>
              </div>

              {state.pickingTotes.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">No picking totes configured</p>
                  <p className="text-sm text-slate-500 mt-1">Add totes to use for batch picking</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {state.pickingTotes.map(tote => (
                    <div
                      key={tote.id}
                      className="p-4 bg-slate-700/30 rounded-lg border border-slate-700/50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{tote.name}</p>
                            <p className="text-xs text-slate-400 font-mono">{tote.barcode}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            dispatch({ type: 'DELETE_PICKING_TOTE', payload: tote.id });
                            success('Tote removed');
                          }}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 rounded-lg bg-blue-500/10 border border-blue-500/30 p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5" />
                  <div className="text-xs text-blue-300">
                    <p className="font-medium">About Picking Totes</p>
                    <p className="mt-1">
                      Picking totes are containers used to collect items while a batch is being picked.
                      Each tote has a unique barcode so the system can identify each container and its contents,
                      making it easy for your warehouse staff to scan the tote when picking and packing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Boxes Tab */}
      {activeTab === 'boxes' && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Shipping Boxes</h2>
                  <p className="text-sm text-slate-400">Configure box dimensions for smart box selection</p>
                </div>
                <Button onClick={handleAddBox}>
                  <Plus className="w-4 h-4" />
                  Add Box
                </Button>
              </div>

              {state.boxes.length === 0 ? (
                <div className="text-center py-12">
                  <Box className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">No shipping boxes configured</p>
                  <Button className="mt-4" onClick={handleAddBox}>
                    Add Your First Box
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        <th className="pb-3 text-left text-xs font-medium text-slate-400 uppercase">Box</th>
                        <th className="pb-3 text-left text-xs font-medium text-slate-400 uppercase">Dimensions</th>
                        <th className="pb-3 text-right text-xs font-medium text-slate-400 uppercase">Volume</th>
                        <th className="pb-3 text-right text-xs font-medium text-slate-400 uppercase">Max Weight</th>
                        <th className="pb-3 text-right text-xs font-medium text-slate-400 uppercase">Cost</th>
                        <th className="pb-3 text-center text-xs font-medium text-slate-400 uppercase">Smart</th>
                        <th className="pb-3 text-right text-xs font-medium text-slate-400 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/30">
                      {state.boxes.map(box => (
                        <tr key={box.id} className="hover:bg-slate-700/20">
                          <td className="py-4">
                            <div>
                              <p className="text-sm font-medium text-white">{box.name}</p>
                              {box.sku && <p className="text-xs text-slate-400 font-mono">{box.sku}</p>}
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-1 text-sm text-slate-300">
                              <Ruler className="h-4 w-4 text-slate-400" />
                              {box.innerLength}" x {box.innerWidth}" x {box.innerHeight}"
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <span className="text-sm text-slate-300">
                              {formatNumber(box.innerLength * box.innerWidth * box.innerHeight)} cu in
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-1 text-sm text-slate-300">
                              <Scale className="h-4 w-4 text-slate-400" />
                              {formatNumber(box.maxWeight / 16)} lbs
                            </div>
                          </td>
                          <td className="py-4 text-right text-sm text-slate-300">
                            {box.cost ? formatCurrency(box.cost) : '-'}
                          </td>
                          <td className="py-4 text-center">
                            {box.smartBoxEligible ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-400">
                                <Check className="h-3 w-3" />
                                Yes
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-slate-700/50 px-2.5 py-1 text-xs font-medium text-slate-400">
                                No
                              </span>
                            )}
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleEditBox(box)}
                                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBox(box)}
                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>

          <div className="rounded-xl bg-blue-500/10 border border-blue-500/30 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
              <div className="text-sm text-blue-300">
                <p className="font-medium">Smart Box Selection</p>
                <p className="mt-1">
                  When enabled, the system automatically suggests the smallest eligible box that fits the order volume
                  (with the configured buffer) and weight requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Notification Preferences</h2>

              <div className="space-y-4">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                  <Toggle
                    checked={emailNotifications}
                    onChange={setEmailNotifications}
                    label="Email Notifications"
                    description="Receive notifications via email"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-md font-semibold text-white mb-4">Alert Types</h3>
              <div className="space-y-4">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                  <Toggle
                    checked={lowStockAlerts}
                    onChange={setLowStockAlerts}
                    label="Low Stock Alerts"
                    description="Get notified when products fall below reorder point"
                  />
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                  <Toggle
                    checked={orderAlerts}
                    onChange={setOrderAlerts}
                    label="New Order Alerts"
                    description="Get notified when new orders are received"
                  />
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                  <Toggle
                    checked={poAlerts}
                    onChange={setPoAlerts}
                    label="PO Status Updates"
                    description="Get notified when purchase orders change status"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-md font-semibold text-white mb-4">Reports</h3>
              <div className="space-y-4">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                  <Toggle
                    checked={dailyDigest}
                    onChange={setDailyDigest}
                    label="Daily Digest"
                    description="Receive a daily summary of activity"
                  />
                </div>
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                  <Toggle
                    checked={weeklyReport}
                    onChange={setWeeklyReport}
                    label="Weekly Report"
                    description="Receive a weekly performance report every Monday"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          {/* Connected */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Connected</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.filter(i => i.connected).map(integration => (
                  <div
                    key={integration.id}
                    className="rounded-lg bg-slate-700/30 p-4 border border-emerald-500/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${integration.iconColor.split('-')[1]}-500/20`}>
                          {integration.icon === 'package' ? (
                            <Package className={`h-5 w-5 ${integration.iconColor}`} />
                          ) : integration.icon === 'dollar' ? (
                            <span className={`text-lg ${integration.iconColor}`}>$</span>
                          ) : integration.icon === 'zap' ? (
                            <Zap className={`h-5 w-5 ${integration.iconColor}`} />
                          ) : (
                            <span className={`text-lg ${integration.iconColor}`}>{integration.name[0]}</span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{integration.name}</p>
                          <p className="text-xs text-slate-400 capitalize">{integration.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-xs text-emerald-400">Live</span>
                      </div>
                    </div>
                    {integration.details && (
                      <div className="mt-3 pt-3 border-t border-slate-600/50 flex items-center justify-between">
                        <span className="text-xs text-slate-400">{integration.details}</span>
                        <button className="text-xs text-slate-400 hover:text-white">Configure</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Available */}
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Available Integrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations.filter(i => !i.connected).map(integration => (
                  <div key={integration.id} className="rounded-lg bg-slate-700/30 p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${integration.iconColor.split('-')[1]}-500/20`}>
                        {integration.icon === 'zap' ? (
                          <Zap className={`h-5 w-5 ${integration.iconColor}`} />
                        ) : (
                          <span className={`text-lg ${integration.iconColor}`}>{integration.name[0]}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{integration.name}</p>
                        <p className="text-xs text-slate-400 capitalize">{integration.type}</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="w-full">
                      <Link2 className="w-4 h-4" />
                      Connect
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* API Keys Tab */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-2">API Keys</h2>
              <p className="text-sm text-slate-400 mb-6">
                Manage API keys for custom integrations and third-party applications
              </p>

              {/* Create new key */}
              <div className="bg-slate-700/30 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-white mb-3">Create New API Key</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Key Name</label>
                    <input
                      type="text"
                      value={newKeyName}
                      onChange={e => setNewKeyName(e.target.value)}
                      placeholder="e.g., Production API"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Permissions</label>
                    <select
                      value={newKeyPermission}
                      onChange={e => setNewKeyPermission(e.target.value as 'read' | 'write' | 'full')}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="read">Read Only</option>
                      <option value="write">Read/Write</option>
                      <option value="full">Full Access</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleCreateApiKey} className="w-full">
                      <Key className="w-4 h-4" />
                      Generate Key
                    </Button>
                  </div>
                </div>
              </div>

              {/* Existing keys */}
              <div className="space-y-3">
                {apiKeys.map(key => (
                  <div key={key.id} className="bg-slate-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">{key.name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs font-mono text-slate-400">
                            {showApiKey === key.id ? key.key : key.key.replace(/(.{7}).*/, '$1' + '...')}
                          </span>
                          <button
                            onClick={() => setShowApiKey(showApiKey === key.id ? null : key.id)}
                            className="text-slate-400 hover:text-white"
                          >
                            {showApiKey === key.id ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => copyToClipboard(key.key)}
                            className="text-slate-400 hover:text-white"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            key.permissions === 'full'
                              ? 'bg-red-500/20 text-red-400'
                              : key.permissions === 'write'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {key.permissions === 'full' ? 'Full' : key.permissions === 'write' ? 'Read/Write' : 'Read'}
                          </span>
                          <p className="text-xs text-slate-500 mt-1">
                            Created {key.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleRevokeApiKey(key)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
              <div className="text-sm text-amber-300">
                <p className="font-medium">Security Notice</p>
                <p className="mt-1">
                  API keys provide full access to your account. Keep them secure and never share them publicly.
                  Revoke any keys that may have been compromised.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        editLocation={editingLocation}
      />
      <BoxModal
        isOpen={boxModalOpen}
        onClose={() => setBoxModalOpen(false)}
        editBox={editingBox}
      />
      <FulfillmentRuleModal
        isOpen={fulfillmentRuleModalOpen}
        onClose={() => setFulfillmentRuleModalOpen(false)}
        editRule={editingFulfillmentRule}
      />
    </div>
  );
}
