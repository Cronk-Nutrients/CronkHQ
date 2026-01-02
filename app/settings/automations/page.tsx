'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp, AutomationRule } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';
import { AutomationRuleModal } from '@/components/modals';
import { getTriggerLabel, getActionLabel } from '@/lib/automationEngine';
import {
  Zap,
  Plus,
  Pencil,
  Trash2,
  Filter,
  Play,
  ArrowLeft,
  Search,
  ShoppingCart,
  ArrowLeftRight,
  AlertTriangle,
  PackageCheck,
  Clock,
  Hand,
  ChevronDown,
  ChevronUp,
  Copy,
  MoreVertical
} from 'lucide-react';

// Icon mapping for triggers
const triggerIcons: Record<string, React.ComponentType<any>> = {
  order_created: ShoppingCart,
  order_status_changed: ArrowLeftRight,
  low_stock: AlertTriangle,
  item_received: PackageCheck,
  daily: Clock,
  manual: Hand
};

export default function AutomationsPage() {
  const { state, dispatch } = useApp();
  const { success, error } = useToast();
  const confirm = useConfirm();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<AutomationRule | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEnabled, setFilterEnabled] = useState<'all' | 'active' | 'disabled'>('all');
  const [filterTrigger, setFilterTrigger] = useState<string>('all');
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  // Filter rules
  const filteredRules = useMemo(() => {
    return state.automationRules
      .filter(rule => {
        // Search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchesName = rule.name.toLowerCase().includes(query);
          const matchesDesc = rule.description?.toLowerCase().includes(query);
          if (!matchesName && !matchesDesc) return false;
        }

        // Enabled filter
        if (filterEnabled === 'active' && !rule.enabled) return false;
        if (filterEnabled === 'disabled' && rule.enabled) return false;

        // Trigger filter
        if (filterTrigger !== 'all' && rule.trigger.type !== filterTrigger) return false;

        return true;
      })
      .sort((a, b) => a.priority - b.priority);
  }, [state.automationRules, searchQuery, filterEnabled, filterTrigger]);

  // Stats
  const stats = useMemo(() => {
    const total = state.automationRules.length;
    const active = state.automationRules.filter(r => r.enabled).length;
    const disabled = total - active;
    return { total, active, disabled };
  }, [state.automationRules]);

  // Handlers
  const handleAddRule = () => {
    setEditingRule(null);
    setModalOpen(true);
  };

  const handleEditRule = (rule: AutomationRule) => {
    setEditingRule(rule);
    setModalOpen(true);
  };

  const handleDeleteRule = async (rule: AutomationRule) => {
    const confirmed = await confirm({
      title: 'Delete Rule',
      message: `Delete "${rule.name}"? This action cannot be undone.`,
      confirmText: 'Delete',
      destructive: true,
    });

    if (confirmed) {
      dispatch({ type: 'DELETE_AUTOMATION_RULE', payload: rule.id });
      success(`Rule "${rule.name}" deleted`);
    }
  };

  const handleToggleRule = (rule: AutomationRule) => {
    dispatch({ type: 'TOGGLE_RULE', payload: rule.id });
    success(`Rule "${rule.name}" ${rule.enabled ? 'disabled' : 'enabled'}`);
  };

  const handleDuplicateRule = (rule: AutomationRule) => {
    const newRule: AutomationRule = {
      ...rule,
      id: crypto.randomUUID(),
      name: `${rule.name} (Copy)`,
      enabled: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    dispatch({ type: 'ADD_AUTOMATION_RULE', payload: newRule });
    success(`Rule duplicated as "${newRule.name}"`);
  };

  const handleRunRule = (rule: AutomationRule) => {
    // In a real app, this would trigger the rule manually
    success(`Rule "${rule.name}" triggered manually`);
  };

  const toggleExpanded = (ruleId: string) => {
    setExpandedRule(expandedRule === ruleId ? null : ruleId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/settings"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Automation Rules</h1>
            <p className="text-slate-400">Automate repetitive warehouse tasks</p>
          </div>
        </div>
        <Button onClick={handleAddRule}>
          <Plus className="w-4 h-4" />
          Create Rule
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-xs text-slate-400">Total Rules</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Play className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-400">{stats.active}</p>
              <p className="text-xs text-slate-400">Active</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center">
              <Filter className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-400">{stats.disabled}</p>
              <p className="text-xs text-slate-400">Disabled</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search rules..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Status filter */}
          <select
            value={filterEnabled}
            onChange={e => setFilterEnabled(e.target.value as 'all' | 'active' | 'disabled')}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="disabled">Disabled Only</option>
          </select>

          {/* Trigger filter */}
          <select
            value={filterTrigger}
            onChange={e => setFilterTrigger(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500/50"
          >
            <option value="all">All Triggers</option>
            <option value="order_created">New Order</option>
            <option value="order_status_changed">Status Change</option>
            <option value="low_stock">Low Stock</option>
            <option value="item_received">Item Received</option>
            <option value="daily">Daily Schedule</option>
            <option value="manual">Manual</option>
          </select>
        </div>
      </Card>

      {/* Rules List */}
      {filteredRules.length === 0 ? (
        <Card className="p-12 text-center">
          <Zap className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            {state.automationRules.length === 0 ? 'No automation rules yet' : 'No rules match your filters'}
          </h3>
          <p className="text-slate-400 mb-6">
            {state.automationRules.length === 0
              ? 'Create your first automation rule to streamline your warehouse operations'
              : 'Try adjusting your search or filters'}
          </p>
          {state.automationRules.length === 0 && (
            <Button onClick={handleAddRule}>
              <Plus className="w-4 h-4" />
              Create Your First Rule
            </Button>
          )}
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredRules.map(rule => {
            const TriggerIcon = triggerIcons[rule.trigger.type] || Zap;
            const isExpanded = expandedRule === rule.id;

            return (
              <Card
                key={rule.id}
                className={`overflow-hidden transition-all ${
                  rule.enabled ? 'border-emerald-500/30' : 'border-slate-700/50'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Trigger Icon */}
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                        rule.enabled ? 'bg-emerald-500/20' : 'bg-slate-700/50'
                      }`}>
                        <TriggerIcon className={`w-5 h-5 ${rule.enabled ? 'text-emerald-400' : 'text-slate-400'}`} />
                      </div>

                      {/* Rule Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-white">{rule.name}</span>
                          {rule.enabled ? (
                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-slate-600/50 text-slate-400 text-xs rounded-full">
                              Disabled
                            </span>
                          )}
                          <span className="px-2 py-0.5 bg-slate-700/50 text-slate-400 text-xs rounded">
                            Priority: {rule.priority}
                          </span>
                        </div>
                        {rule.description && (
                          <p className="text-sm text-slate-400 mt-1 line-clamp-1">{rule.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            {getTriggerLabel(rule.trigger)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Filter className="w-3 h-3" />
                            {rule.conditions.length} condition{rule.conditions.length !== 1 ? 's' : ''}
                          </span>
                          <span className="flex items-center gap-1">
                            <Play className="w-3 h-3" />
                            {rule.actions.length} action{rule.actions.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Toggle
                        checked={rule.enabled}
                        onChange={() => handleToggleRule(rule)}
                      />
                      <button
                        onClick={() => toggleExpanded(rule.id)}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEditRule(rule)}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteRule(rule)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-700/50">
                      <div className="grid grid-cols-2 gap-6">
                        {/* Conditions */}
                        <div>
                          <h4 className="text-xs font-medium text-slate-400 uppercase mb-2">Conditions</h4>
                          {rule.conditions.length === 0 ? (
                            <p className="text-sm text-slate-500 italic">No conditions - runs for all triggers</p>
                          ) : (
                            <div className="space-y-1">
                              {rule.conditions.map((cond, i) => (
                                <div key={cond.id} className="text-sm text-slate-300">
                                  {i > 0 && <span className="text-slate-500 mr-1">AND</span>}
                                  <span className="text-white">{cond.field}</span>
                                  <span className="text-slate-400 mx-1">{cond.operator.replace('_', ' ')}</span>
                                  <span className="text-emerald-400">{String(cond.value)}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div>
                          <h4 className="text-xs font-medium text-slate-400 uppercase mb-2">Actions</h4>
                          <div className="space-y-1">
                            {rule.actions.map(action => (
                              <div key={action.id} className="flex items-center gap-2 text-sm">
                                <Play className="w-3 h-3 text-emerald-400" />
                                <span className="text-slate-300">{getActionLabel(action)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700/50">
                        <Button variant="secondary" size="sm" onClick={() => handleRunRule(rule)}>
                          <Play className="w-4 h-4" />
                          Run Now
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => handleDuplicateRule(rule)}>
                          <Copy className="w-4 h-4" />
                          Duplicate
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => handleEditRule(rule)}>
                          <Pencil className="w-4 h-4" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Info Card */}
      <Card className="p-4 bg-blue-500/10 border-blue-500/30">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium text-white">How Automation Rules Work</h3>
            <p className="text-sm text-slate-400 mt-1">
              Rules are evaluated in priority order (lowest first). When a trigger event occurs (like a new order),
              the system checks each rule's conditions. If conditions are met, all actions are executed automatically.
              Use rules to automate carrier assignment, order tagging, notifications, and more.
            </p>
          </div>
        </div>
      </Card>

      {/* Modal */}
      <AutomationRuleModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editRule={editingRule}
      />
    </div>
  );
}
