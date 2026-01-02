'use client';

import { useState, useEffect, useMemo } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';
import { useApp, AutomationRule, RuleTrigger, RuleCondition, RuleAction, conditionFields } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import {
  ruleTemplates,
  triggerOptions,
  actionOptions,
  operatorOptions,
  priorityOptions,
  carrierOptions,
  serviceOptions,
  RuleTemplate
} from '@/lib/ruleTemplates';
import { getTriggerLabel, getActionLabel } from '@/lib/automationEngine';
import {
  Zap,
  ChevronRight,
  ChevronLeft,
  Plus,
  X,
  ShoppingCart,
  ArrowLeftRight,
  AlertTriangle,
  PackageCheck,
  Clock,
  Hand,
  Tag,
  Flag,
  Truck,
  Package,
  Box,
  Bell,
  FileText,
  Mail,
  MapPin,
  Sparkles,
  Filter,
  Play,
  Check
} from 'lucide-react';

interface AutomationRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  editRule?: AutomationRule | null;
}

type Step = 'template' | 'basic' | 'trigger' | 'conditions' | 'actions' | 'review';

const stepOrder: Step[] = ['template', 'basic', 'trigger', 'conditions', 'actions', 'review'];

// Icon mapping for triggers
const triggerIcons: Record<string, React.ComponentType<any>> = {
  order_created: ShoppingCart,
  order_status_changed: ArrowLeftRight,
  low_stock: AlertTriangle,
  item_received: PackageCheck,
  daily: Clock,
  manual: Hand
};

// Icon mapping for actions
const actionIcons: Record<string, React.ComponentType<any>> = {
  set_order_tag: Tag,
  set_priority: Flag,
  assign_carrier: Truck,
  assign_service: Package,
  select_box: Box,
  send_notification: Bell,
  add_fulfillment_item: Plus,
  create_po_draft: FileText,
  send_email: Mail,
  set_location: MapPin
};

export function AutomationRuleModal({ isOpen, onClose, editRule }: AutomationRuleModalProps) {
  const { state, dispatch } = useApp();
  const { success, error } = useToast();

  const isEditing = !!editRule;

  // Step navigation
  const [currentStep, setCurrentStep] = useState<Step>('template');

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [priority, setPriority] = useState(10);
  const [trigger, setTrigger] = useState<RuleTrigger>({ type: 'order_created' });
  const [conditions, setConditions] = useState<RuleCondition[]>([]);
  const [actions, setActions] = useState<RuleAction[]>([]);

  // Additional trigger config
  const [triggerFromStatus, setTriggerFromStatus] = useState('');
  const [triggerToStatus, setTriggerToStatus] = useState('');
  const [triggerThreshold, setTriggerThreshold] = useState(50);
  const [triggerTime, setTriggerTime] = useState('09:00');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (editRule) {
        setName(editRule.name);
        setDescription(editRule.description || '');
        setEnabled(editRule.enabled);
        setPriority(editRule.priority);
        setTrigger(editRule.trigger);
        setConditions(editRule.conditions);
        setActions(editRule.actions);
        setCurrentStep('basic'); // Skip template selection when editing

        // Set trigger-specific values
        if (editRule.trigger.type === 'order_status_changed') {
          const t = editRule.trigger as { type: 'order_status_changed'; fromStatus?: string; toStatus?: string };
          setTriggerFromStatus(t.fromStatus || '');
          setTriggerToStatus(t.toStatus || '');
        } else if (editRule.trigger.type === 'low_stock') {
          const t = editRule.trigger as { type: 'low_stock'; threshold?: number };
          setTriggerThreshold(t.threshold || 50);
        } else if (editRule.trigger.type === 'daily') {
          const t = editRule.trigger as { type: 'daily'; time: string };
          setTriggerTime(t.time || '09:00');
        }
      } else {
        // Reset to defaults for new rule
        setName('');
        setDescription('');
        setEnabled(true);
        setPriority(10);
        setTrigger({ type: 'order_created' });
        setConditions([]);
        setActions([]);
        setTriggerFromStatus('');
        setTriggerToStatus('');
        setTriggerThreshold(50);
        setTriggerTime('09:00');
        setCurrentStep('template');
      }
    }
  }, [isOpen, editRule]);

  // Get current step index
  const currentStepIndex = stepOrder.indexOf(currentStep);

  // Navigation helpers
  const canGoBack = currentStepIndex > (isEditing ? 1 : 0);
  const canGoNext = currentStepIndex < stepOrder.length - 1;

  const goBack = () => {
    if (canGoBack) {
      setCurrentStep(stepOrder[currentStepIndex - 1]);
    }
  };

  const goNext = () => {
    if (canGoNext) {
      setCurrentStep(stepOrder[currentStepIndex + 1]);
    }
  };

  // Validation for each step
  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 'template':
        return true; // Can always skip templates
      case 'basic':
        return name.trim().length > 0;
      case 'trigger':
        return true; // Always valid, defaults provided
      case 'conditions':
        return true; // Optional, always valid
      case 'actions':
        return actions.length > 0;
      case 'review':
        return name.trim().length > 0 && actions.length > 0;
      default:
        return false;
    }
  }, [currentStep, name, actions]);

  // Apply template
  const applyTemplate = (template: RuleTemplate) => {
    setName(template.name);
    setDescription(template.description);
    setTrigger(template.trigger);
    setConditions(template.conditions.map(c => ({ ...c, id: crypto.randomUUID() })));
    setActions(template.actions.map(a => ({ ...a, id: crypto.randomUUID() })));

    // Set trigger-specific values
    if (template.trigger.type === 'low_stock') {
      const t = template.trigger as { type: 'low_stock'; threshold?: number };
      setTriggerThreshold(t.threshold || 50);
    }

    setCurrentStep('basic');
  };

  // Add condition
  const addCondition = () => {
    const newCondition: RuleCondition = {
      id: crypto.randomUUID(),
      field: '',
      operator: 'equals',
      value: ''
    };
    setConditions([...conditions, newCondition]);
  };

  // Update condition
  const updateCondition = (index: number, field: keyof RuleCondition, value: any) => {
    const updated = [...conditions];
    updated[index] = { ...updated[index], [field]: value };
    setConditions(updated);
  };

  // Remove condition
  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  // Add action
  const addAction = () => {
    const newAction: RuleAction = {
      id: crypto.randomUUID(),
      type: 'set_order_tag',
      config: {}
    };
    setActions([...actions, newAction]);
  };

  // Update action
  const updateAction = (index: number, field: string, value: any) => {
    const updated = [...actions];
    if (field === 'type') {
      updated[index] = { ...updated[index], type: value, config: {} };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setActions(updated);
  };

  // Update action config
  const updateActionConfig = (index: number, configKey: string, value: any) => {
    const updated = [...actions];
    updated[index] = {
      ...updated[index],
      config: { ...updated[index].config, [configKey]: value }
    };
    setActions(updated);
  };

  // Remove action
  const removeAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  // Build final trigger object
  const buildTrigger = (): RuleTrigger => {
    switch (trigger.type) {
      case 'order_status_changed':
        return {
          type: 'order_status_changed',
          ...(triggerFromStatus && { fromStatus: triggerFromStatus }),
          ...(triggerToStatus && { toStatus: triggerToStatus })
        };
      case 'low_stock':
        return { type: 'low_stock', threshold: triggerThreshold };
      case 'daily':
        return { type: 'daily', time: triggerTime };
      default:
        return trigger;
    }
  };

  // Save rule
  const handleSave = () => {
    if (!isStepValid) return;

    setIsSubmitting(true);

    try {
      const ruleData: AutomationRule = {
        id: editRule?.id || crypto.randomUUID(),
        name: name.trim(),
        description: description.trim() || undefined,
        enabled,
        trigger: buildTrigger(),
        conditions,
        actions,
        priority,
        createdAt: editRule?.createdAt || new Date(),
        updatedAt: new Date()
      };

      if (isEditing) {
        dispatch({ type: 'UPDATE_AUTOMATION_RULE', payload: ruleData });
        success(`Rule "${name}" updated`);
      } else {
        dispatch({ type: 'ADD_AUTOMATION_RULE', payload: ruleData });
        success(`Rule "${name}" created`);
      }

      onClose();
    } catch (err) {
      error('Failed to save rule');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get fields for current trigger type
  const getFieldsForTrigger = () => {
    if (['order_created', 'order_status_changed'].includes(trigger.type)) {
      return conditionFields.order;
    }
    if (['low_stock', 'item_received'].includes(trigger.type)) {
      return conditionFields.inventory;
    }
    return conditionFields.order;
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'template':
        return (
          <div className="space-y-6">
            <div className="text-center pb-4">
              <Sparkles className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-white">Start with a Template</h3>
              <p className="text-sm text-slate-400 mt-1">Choose a pre-built rule or start from scratch</p>
            </div>

            <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-2">
              {ruleTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => applyTemplate(template)}
                  className="text-left p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{template.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{template.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 rounded bg-slate-700 text-xs text-slate-300">
                          {getTriggerLabel(template.trigger)}
                        </span>
                        <span className="text-xs text-slate-500">
                          {template.actions.length} action{template.actions.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-700/50">
              <Button variant="secondary" className="w-full" onClick={() => setCurrentStep('basic')}>
                <Plus className="w-4 h-4" />
                Start from Scratch
              </Button>
            </div>
          </div>
        );

      case 'basic':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Rule Name *</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g., Auto-assign USPS for orders under $50"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Description (Optional)</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="What does this rule do?"
                rows={3}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Priority</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={priority}
                  onChange={e => setPriority(parseInt(e.target.value) || 10)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                />
                <p className="text-xs text-slate-500 mt-1">Lower numbers run first</p>
              </div>
              <div className="flex items-end pb-6">
                <div className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                  <Toggle
                    checked={enabled}
                    onChange={setEnabled}
                    label="Enabled"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'trigger':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-slate-400 mb-3">When should this rule run?</label>
              <div className="grid grid-cols-2 gap-3">
                {triggerOptions.map(option => {
                  const Icon = triggerIcons[option.type] || Zap;
                  const isSelected = trigger.type === option.type;
                  return (
                    <button
                      key={option.type}
                      onClick={() => setTrigger({ type: option.type } as RuleTrigger)}
                      className={`p-4 border rounded-lg text-left transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <div className={`font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {option.label}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{option.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trigger-specific config */}
            {trigger.type === 'order_status_changed' && (
              <div className="bg-slate-800/50 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">From Status (Optional)</label>
                    <select
                      value={triggerFromStatus}
                      onChange={e => setTriggerFromStatus(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="">Any status</option>
                      <option value="to_pick">To Pick</option>
                      <option value="picking">Picking</option>
                      <option value="to_pack">To Pack</option>
                      <option value="packing">Packing</option>
                      <option value="ready">Ready</option>
                      <option value="shipped">Shipped</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1.5">To Status (Optional)</label>
                    <select
                      value={triggerToStatus}
                      onChange={e => setTriggerToStatus(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="">Any status</option>
                      <option value="to_pick">To Pick</option>
                      <option value="picking">Picking</option>
                      <option value="to_pack">To Pack</option>
                      <option value="packing">Packing</option>
                      <option value="ready">Ready</option>
                      <option value="shipped">Shipped</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {trigger.type === 'low_stock' && (
              <div className="bg-slate-800/50 rounded-lg p-4">
                <label className="block text-sm text-slate-400 mb-1.5">Stock Threshold</label>
                <input
                  type="number"
                  min={0}
                  value={triggerThreshold}
                  onChange={e => setTriggerThreshold(parseInt(e.target.value) || 50)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                />
                <p className="text-xs text-slate-500 mt-1">Rule triggers when stock falls to or below this level</p>
              </div>
            )}

            {trigger.type === 'daily' && (
              <div className="bg-slate-800/50 rounded-lg p-4">
                <label className="block text-sm text-slate-400 mb-1.5">Run Time</label>
                <input
                  type="time"
                  value={triggerTime}
                  onChange={e => setTriggerTime(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            )}
          </div>
        );

      case 'conditions':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm text-slate-400">Conditions (Optional)</label>
                <p className="text-xs text-slate-500 mt-0.5">Only run this rule when these conditions are met</p>
              </div>
              <Button variant="secondary" size="sm" onClick={addCondition}>
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>

            {conditions.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Filter className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No conditions - rule will run for all matching triggers</p>
              </div>
            ) : (
              <div className="space-y-3">
                {conditions.map((condition, index) => (
                  <div key={condition.id} className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg">
                    {index > 0 && (
                      <span className="text-xs text-slate-500 px-2">AND</span>
                    )}
                    <select
                      value={condition.field}
                      onChange={e => updateCondition(index, 'field', e.target.value)}
                      className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="">Select field...</option>
                      {getFieldsForTrigger().map(field => (
                        <option key={field.value} value={field.value}>{field.label}</option>
                      ))}
                    </select>
                    <select
                      value={condition.operator}
                      onChange={e => updateCondition(index, 'operator', e.target.value)}
                      className="w-36 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                    >
                      {operatorOptions.map(op => (
                        <option key={op.value} value={op.value}>{op.label}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={condition.value as string}
                      onChange={e => updateCondition(index, 'value', e.target.value)}
                      placeholder="Value..."
                      className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                    />
                    <button
                      onClick={() => removeCondition(index)}
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'actions':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm text-slate-400">Actions *</label>
                <p className="text-xs text-slate-500 mt-0.5">What should happen when this rule triggers?</p>
              </div>
              <Button variant="secondary" size="sm" onClick={addAction}>
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>

            {actions.length === 0 ? (
              <div className="text-center py-8 text-slate-400 border-2 border-dashed border-slate-700 rounded-lg">
                <Play className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Add at least one action</p>
                <Button variant="secondary" size="sm" className="mt-3" onClick={addAction}>
                  <Plus className="w-4 h-4" />
                  Add Action
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {actions.map((action, index) => {
                  const ActionIcon = actionIcons[action.type] || Zap;
                  return (
                    <div key={action.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                          <ActionIcon className="w-4 h-4 text-emerald-400" />
                        </div>
                        <select
                          value={action.type}
                          onChange={e => updateAction(index, 'type', e.target.value)}
                          className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                        >
                          <option value="">Select action...</option>
                          {actionOptions.map(opt => (
                            <option key={opt.type} value={opt.type}>{opt.label}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeAction(index)}
                          className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Action-specific config */}
                      {action.type === 'set_order_tag' && (
                        <input
                          type="text"
                          value={action.config.tag || ''}
                          onChange={e => updateActionConfig(index, 'tag', e.target.value)}
                          placeholder="Tag name (e.g., PRIORITY, FRAGILE)"
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                        />
                      )}

                      {action.type === 'set_priority' && (
                        <select
                          value={action.config.priority || ''}
                          onChange={e => updateActionConfig(index, 'priority', e.target.value)}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                        >
                          <option value="">Select priority...</option>
                          {priorityOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      )}

                      {action.type === 'assign_carrier' && (
                        <select
                          value={action.config.carrier || ''}
                          onChange={e => updateActionConfig(index, 'carrier', e.target.value)}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                        >
                          <option value="">Select carrier...</option>
                          {carrierOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      )}

                      {action.type === 'assign_service' && (
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            value={action.config.carrier || ''}
                            onChange={e => updateActionConfig(index, 'carrier', e.target.value)}
                            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                          >
                            <option value="">Carrier...</option>
                            {carrierOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                          <select
                            value={action.config.service || ''}
                            onChange={e => updateActionConfig(index, 'service', e.target.value)}
                            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                          >
                            <option value="">Service...</option>
                            {(serviceOptions[action.config.carrier] || []).map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {action.type === 'select_box' && (
                        <select
                          value={action.config.boxId || ''}
                          onChange={e => updateActionConfig(index, 'boxId', e.target.value)}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                        >
                          <option value="">Select box...</option>
                          {state.boxes.map(box => (
                            <option key={box.id} value={box.id}>{box.name}</option>
                          ))}
                        </select>
                      )}

                      {action.type === 'add_fulfillment_item' && (
                        <div className="flex gap-2">
                          <select
                            value={action.config.productId || ''}
                            onChange={e => updateActionConfig(index, 'productId', e.target.value)}
                            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                          >
                            <option value="">Select product...</option>
                            {state.products.map(p => (
                              <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                            ))}
                          </select>
                          <input
                            type="number"
                            min={1}
                            value={action.config.quantity || 1}
                            onChange={e => updateActionConfig(index, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-20 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>
                      )}

                      {action.type === 'send_notification' && (
                        <input
                          type="text"
                          value={action.config.message || ''}
                          onChange={e => updateActionConfig(index, 'message', e.target.value)}
                          placeholder="Notification message..."
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                        />
                      )}

                      {action.type === 'create_po_draft' && (
                        <input
                          type="number"
                          min={1}
                          value={action.config.quantity || 100}
                          onChange={e => updateActionConfig(index, 'quantity', parseInt(e.target.value) || 100)}
                          placeholder="Quantity to order..."
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                        />
                      )}

                      {action.type === 'send_email' && (
                        <div className="space-y-2">
                          <input
                            type="email"
                            value={action.config.recipient || ''}
                            onChange={e => updateActionConfig(index, 'recipient', e.target.value)}
                            placeholder="Recipient email..."
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                          />
                          <input
                            type="text"
                            value={action.config.subject || ''}
                            onChange={e => updateActionConfig(index, 'subject', e.target.value)}
                            placeholder="Email subject..."
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
                          />
                        </div>
                      )}

                      {action.type === 'set_location' && (
                        <select
                          value={action.config.locationId || ''}
                          onChange={e => updateActionConfig(index, 'locationId', e.target.value)}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                        >
                          <option value="">Select location...</option>
                          {state.locations.map(loc => (
                            <option key={loc.id} value={loc.id}>{loc.name}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="text-center pb-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                <Check className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-medium text-white">Review Your Rule</h3>
              <p className="text-sm text-slate-400 mt-1">Make sure everything looks correct</p>
            </div>

            <div className="space-y-4">
              {/* Name & Description */}
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-medium text-white">{name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-600/50 text-slate-400'
                  }`}>
                    {enabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
                {description && <p className="text-sm text-slate-400">{description}</p>}
              </div>

              {/* Trigger */}
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-xs text-slate-500 uppercase mb-2">Trigger</div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="text-white">{getTriggerLabel(buildTrigger())}</span>
                </div>
              </div>

              {/* Conditions */}
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-xs text-slate-500 uppercase mb-2">Conditions</div>
                {conditions.length === 0 ? (
                  <span className="text-slate-400 text-sm">No conditions (runs for all matching triggers)</span>
                ) : (
                  <div className="space-y-1">
                    {conditions.map((cond, i) => {
                      const field = getFieldsForTrigger().find(f => f.value === cond.field);
                      return (
                        <div key={cond.id} className="flex items-center gap-2 text-sm">
                          {i > 0 && <span className="text-slate-500">AND</span>}
                          <span className="text-white">{field?.label || cond.field}</span>
                          <span className="text-slate-400">{cond.operator.replace('_', ' ')}</span>
                          <span className="text-emerald-400">{String(cond.value)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-xs text-slate-500 uppercase mb-2">Actions ({actions.length})</div>
                <div className="space-y-2">
                  {actions.map(action => (
                    <div key={action.id} className="flex items-center gap-2 text-sm">
                      <Play className="w-3 h-3 text-emerald-400" />
                      <span className="text-white">{getActionLabel(action)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Step indicator
  const renderStepIndicator = () => {
    const visibleSteps = isEditing ? stepOrder.slice(1) : stepOrder;
    const adjustedIndex = isEditing ? currentStepIndex - 1 : currentStepIndex;

    return (
      <div className="flex items-center justify-center gap-2 mb-6">
        {visibleSteps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                index === adjustedIndex
                  ? 'bg-emerald-500 text-white'
                  : index < adjustedIndex
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              {index < adjustedIndex ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            {index < visibleSteps.length - 1 && (
              <div className={`w-8 h-0.5 mx-1 ${
                index < adjustedIndex ? 'bg-emerald-500/50' : 'bg-slate-700'
              }`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Automation Rule' : 'Create Automation Rule'}
      subtitle={currentStep === 'template' ? 'Choose a template or start from scratch' : undefined}
      size="lg"
      footer={
        currentStep !== 'template' ? (
          <>
            <Button variant="secondary" onClick={canGoBack ? goBack : onClose}>
              {canGoBack ? (
                <>
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </>
              ) : (
                'Cancel'
              )}
            </Button>
            {currentStep === 'review' ? (
              <Button onClick={handleSave} disabled={isSubmitting || !isStepValid}>
                {isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Rule'}
              </Button>
            ) : (
              <Button onClick={goNext} disabled={!isStepValid}>
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </>
        ) : undefined
      }
    >
      {currentStep !== 'template' && renderStepIndicator()}
      {renderStepContent()}
    </Modal>
  );
}

export default AutomationRuleModal;
