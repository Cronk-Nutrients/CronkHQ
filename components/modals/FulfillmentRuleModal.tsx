'use client';

import { useState, useEffect } from 'react';
import { useApp, FulfillmentRule, FulfillmentRuleType, FulfillmentRuleCondition, FulfillmentRuleAction } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import {
  X,
  Plus,
  Trash2,
  Zap,
  Tag,
  Box,
  Package,
  Truck,
  AlertCircle,
} from 'lucide-react';

interface FulfillmentRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  editRule?: FulfillmentRule | null;
}

const ruleTypeOptions: { value: FulfillmentRuleType; label: string; description: string; icon: typeof Zap }[] = [
  { value: 'gripper_sticker', label: 'Gripper Sticker', description: 'Add gripper stickers to orders', icon: Tag },
  { value: 'box_selection', label: 'Box Selection', description: 'Auto-select shipping box', icon: Box },
  { value: 'label_deduction', label: 'Label Deduction', description: 'Deduct labels from inventory', icon: Tag },
  { value: 'auto_allocate', label: 'Auto Allocate', description: 'Allocate inventory automatically', icon: Package },
  { value: 'weight_threshold', label: 'Weight Threshold', description: 'Apply rules based on weight', icon: Truck },
  { value: 'custom', label: 'Custom Rule', description: 'Create a custom rule', icon: Zap },
];

const conditionFieldOptions = [
  { value: 'channel', label: 'Sales Channel' },
  { value: 'sku', label: 'SKU' },
  { value: 'category', label: 'Category' },
  { value: 'weight', label: 'Total Weight' },
  { value: 'quantity', label: 'Item Quantity' },
  { value: 'total_value', label: 'Order Value' },
  { value: 'destination_state', label: 'Destination State' },
  { value: 'destination_country', label: 'Destination Country' },
];

const operatorOptions = [
  { value: 'equals', label: 'Equals' },
  { value: 'not_equals', label: 'Not Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'greater_than', label: 'Greater Than' },
  { value: 'less_than', label: 'Less Than' },
  { value: 'in_list', label: 'In List' },
];

const actionTypeOptions = [
  { value: 'add_item', label: 'Add Item to Order' },
  { value: 'deduct_inventory', label: 'Deduct Inventory' },
  { value: 'set_box', label: 'Set Shipping Box' },
  { value: 'add_note', label: 'Add Note' },
  { value: 'set_carrier', label: 'Set Carrier' },
];

export function FulfillmentRuleModal({
  isOpen,
  onClose,
  editRule,
}: FulfillmentRuleModalProps) {
  const { state, dispatch } = useApp();
  const { success, error } = useToast();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<FulfillmentRuleType>('custom');
  const [enabled, setEnabled] = useState(true);
  const [priority, setPriority] = useState(10);
  const [conditions, setConditions] = useState<FulfillmentRuleCondition[]>([]);
  const [actions, setActions] = useState<FulfillmentRuleAction[]>([]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (editRule) {
        setName(editRule.name);
        setDescription(editRule.description || '');
        setType(editRule.type);
        setEnabled(editRule.enabled);
        setPriority(editRule.priority);
        setConditions(editRule.conditions);
        setActions(editRule.actions);
      } else {
        setName('');
        setDescription('');
        setType('custom');
        setEnabled(true);
        setPriority(10);
        setConditions([]);
        setActions([]);
      }
    }
  }, [isOpen, editRule]);

  const addCondition = () => {
    setConditions([
      ...conditions,
      {
        id: crypto.randomUUID(),
        field: 'channel',
        operator: 'equals',
        value: '',
      },
    ]);
  };

  const updateCondition = (id: string, updates: Partial<FulfillmentRuleCondition>) => {
    setConditions(conditions.map(c => (c.id === id ? { ...c, ...updates } : c)));
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const addAction = () => {
    setActions([
      ...actions,
      {
        id: crypto.randomUUID(),
        type: 'add_note',
        config: {},
      },
    ]);
  };

  const updateAction = (id: string, updates: Partial<FulfillmentRuleAction>) => {
    setActions(actions.map(a => (a.id === id ? { ...a, ...updates } : a)));
  };

  const removeAction = (id: string) => {
    setActions(actions.filter(a => a.id !== id));
  };

  const handleSave = () => {
    if (!name.trim()) {
      error('Please enter a rule name');
      return;
    }

    const rule: FulfillmentRule = {
      id: editRule?.id || crypto.randomUUID(),
      name: name.trim(),
      description: description.trim() || undefined,
      type,
      enabled,
      priority,
      conditions,
      actions,
      createdAt: editRule?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (editRule) {
      dispatch({ type: 'UPDATE_FULFILLMENT_RULE', payload: rule });
      success('Fulfillment rule updated');
    } else {
      dispatch({ type: 'ADD_FULFILLMENT_RULE', payload: rule });
      success('Fulfillment rule created');
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {editRule ? 'Edit Fulfillment Rule' : 'Create Fulfillment Rule'}
              </h2>
              <p className="text-sm text-slate-400">
                Define conditions and actions for order fulfillment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-slate-400 mb-1.5">Rule Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Add gripper sticker to all bottles"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-slate-400 mb-1.5">Description (optional)</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of what this rule does"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>

          {/* Rule Type */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">Rule Type</label>
            <div className="grid grid-cols-3 gap-2">
              {ruleTypeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setType(option.value)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      type === option.value
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1 ${type === option.value ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <p className="text-sm font-medium text-white">{option.label}</p>
                    <p className="text-xs text-slate-500">{option.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority and Enabled */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Priority</label>
              <input
                type="number"
                min={1}
                max={100}
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value) || 10)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
              />
              <p className="text-xs text-slate-500 mt-1">Lower numbers run first</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-white">Enabled</p>
                <p className="text-xs text-slate-400">Rule is active</p>
              </div>
              <button
                onClick={() => setEnabled(!enabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  enabled ? 'bg-emerald-500' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    enabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Conditions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-medium text-white">Conditions</h3>
                <p className="text-xs text-slate-400">When should this rule apply?</p>
              </div>
              <Button variant="secondary" size="sm" onClick={addCondition}>
                <Plus className="w-4 h-4" />
                Add Condition
              </Button>
            </div>

            {conditions.length === 0 ? (
              <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                <p className="text-sm text-slate-400">No conditions - rule applies to all orders</p>
              </div>
            ) : (
              <div className="space-y-2">
                {conditions.map((condition, index) => (
                  <div key={condition.id} className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg">
                    {index > 0 && <span className="text-xs text-slate-500">AND</span>}
                    <select
                      value={condition.field}
                      onChange={(e) => updateCondition(condition.id, { field: e.target.value as any })}
                      className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm text-white"
                    >
                      {conditionFieldOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <select
                      value={condition.operator}
                      onChange={(e) => updateCondition(condition.id, { operator: e.target.value as any })}
                      className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm text-white"
                    >
                      {operatorOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={String(condition.value)}
                      onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
                      placeholder="Value"
                      className="flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm text-white"
                    />
                    <button
                      onClick={() => removeCondition(condition.id)}
                      className="p-1 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-medium text-white">Actions</h3>
                <p className="text-xs text-slate-400">What should happen when conditions are met?</p>
              </div>
              <Button variant="secondary" size="sm" onClick={addAction}>
                <Plus className="w-4 h-4" />
                Add Action
              </Button>
            </div>

            {actions.length === 0 ? (
              <div className="p-4 bg-slate-800/50 rounded-lg text-center">
                <p className="text-sm text-slate-400">No actions defined</p>
              </div>
            ) : (
              <div className="space-y-2">
                {actions.map((action) => (
                  <div key={action.id} className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg">
                    <select
                      value={action.type}
                      onChange={(e) => updateAction(action.id, { type: e.target.value as any })}
                      className="bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm text-white"
                    >
                      {actionTypeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>

                    {action.type === 'add_item' && (
                      <select
                        value={action.config.productId || ''}
                        onChange={(e) => updateAction(action.id, { config: { ...action.config, productId: e.target.value } })}
                        className="flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm text-white"
                      >
                        <option value="">Select Product</option>
                        {state.products.map((p) => (
                          <option key={p.id} value={p.id}>{p.sku} - {p.name}</option>
                        ))}
                      </select>
                    )}

                    {action.type === 'add_note' && (
                      <input
                        type="text"
                        value={action.config.note || ''}
                        onChange={(e) => updateAction(action.id, { config: { ...action.config, note: e.target.value } })}
                        placeholder="Note text"
                        className="flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm text-white"
                      />
                    )}

                    {action.type === 'set_carrier' && (
                      <select
                        value={action.config.carrier || ''}
                        onChange={(e) => updateAction(action.id, { config: { ...action.config, carrier: e.target.value } })}
                        className="flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm text-white"
                      >
                        <option value="">Select Carrier</option>
                        <option value="ups">UPS</option>
                        <option value="fedex">FedEx</option>
                        <option value="usps">USPS</option>
                      </select>
                    )}

                    {action.type === 'set_box' && (
                      <select
                        value={action.config.boxId || ''}
                        onChange={(e) => updateAction(action.id, { config: { ...action.config, boxId: e.target.value } })}
                        className="flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm text-white"
                      >
                        <option value="">Select Box</option>
                        {state.boxes.map((b) => (
                          <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                      </select>
                    )}

                    <button
                      onClick={() => removeAction(action.id)}
                      className="p-1 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-700 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <Button onClick={handleSave}>
            <Zap className="w-4 h-4" />
            {editRule ? 'Update Rule' : 'Create Rule'}
          </Button>
        </div>
      </div>
    </div>
  );
}
