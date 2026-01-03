'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { useConfirm } from '@/components/ui/ConfirmDialog';

interface PackingSupplyRule {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  deductionType: 'per_item' | 'per_order' | 'per_unit';
  quantity: number;
  isActive: boolean;
}

export function FulfillmentSettings() {
  const { state } = useApp();
  const { success, error: showError } = useToast();
  const confirm = useConfirm();

  // Load saved rules from localStorage
  const [packingSupplyRules, setPackingSupplyRules] = useState<PackingSupplyRule[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('packing_supply_rules');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [deductionType, setDeductionType] = useState<'per_item' | 'per_order' | 'per_unit'>('per_item');
  const [quantity, setQuantity] = useState(1);

  // Save rules to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('packing_supply_rules', JSON.stringify(packingSupplyRules));
  }, [packingSupplyRules]);

  // Add new rule
  const handleAddRule = () => {
    if (!selectedProductId) {
      showError('Please select a product');
      return;
    }

    const product = state.products.find(p => p.id === selectedProductId);
    if (!product) return;

    // Check if rule already exists for this product
    if (packingSupplyRules.some(r => r.productId === selectedProductId)) {
      showError('A rule already exists for this product');
      return;
    }

    const newRule: PackingSupplyRule = {
      id: `rule_${Date.now()}`,
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      deductionType,
      quantity,
      isActive: true,
    };

    setPackingSupplyRules([...packingSupplyRules, newRule]);
    setShowAddModal(false);
    setSelectedProductId('');
    setDeductionType('per_item');
    setQuantity(1);
    success(`Added packing supply rule for ${product.name}`);
  };

  // Toggle rule active status
  const handleToggleRule = (ruleId: string) => {
    setPackingSupplyRules(rules =>
      rules.map(r => r.id === ruleId ? { ...r, isActive: !r.isActive } : r)
    );
  };

  // Delete rule
  const handleDeleteRule = async (ruleId: string) => {
    const rule = packingSupplyRules.find(r => r.id === ruleId);
    const confirmed = await confirm({
      title: 'Delete Rule',
      message: `Remove the packing supply rule for "${rule?.productName}"?`,
      confirmText: 'Delete',
      destructive: true,
    });

    if (confirmed) {
      setPackingSupplyRules(rules => rules.filter(r => r.id !== ruleId));
      success('Rule deleted');
    }
  };

  // Update rule quantity
  const handleUpdateQuantity = (ruleId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setPackingSupplyRules(rules =>
      rules.map(r => r.id === ruleId ? { ...r, quantity: newQuantity } : r)
    );
  };

  const getDeductionTypeLabel = (type: string) => {
    switch (type) {
      case 'per_item': return 'per line item';
      case 'per_order': return 'per order';
      case 'per_unit': return 'per unit';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">Packing Supplies Auto-Deduction</h3>
        <p className="text-sm text-slate-400">
          Configure products that should be automatically deducted from inventory when orders are fulfilled.
          For example, gripper stickers, boxes, or labels.
        </p>
      </div>

      {/* Current Rules */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700 flex items-center justify-between">
          <div>
            <h4 className="font-medium text-white">Packing Supply Rules</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {packingSupplyRules.filter(r => r.isActive).length} active rules
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
          >
            <i className="fas fa-plus text-xs"></i>
            Add Rule
          </button>
        </div>

        {packingSupplyRules.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-box-open text-slate-500 text-xl"></i>
            </div>
            <p className="text-slate-400 mb-2">No packing supply rules configured</p>
            <p className="text-sm text-slate-500">
              Add rules to automatically deduct supplies when orders are packed
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-700/50">
            {packingSupplyRules.map(rule => (
              <div
                key={rule.id}
                className={`p-4 flex items-center justify-between ${
                  !rule.isActive ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleToggleRule(rule.id)}
                    className={`w-10 h-6 rounded-full transition-colors relative ${
                      rule.isActive ? 'bg-emerald-500' : 'bg-slate-600'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                        rule.isActive ? 'left-5' : 'left-1'
                      }`}
                    />
                  </button>
                  <div>
                    <div className="font-medium text-white">{rule.productName}</div>
                    <div className="text-xs text-slate-400">SKU: {rule.sku}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">Deduct</span>
                    <input
                      type="number"
                      value={rule.quantity}
                      onChange={(e) => handleUpdateQuantity(rule.id, parseInt(e.target.value) || 1)}
                      min="1"
                      className="w-16 bg-slate-700 border border-slate-600 rounded-lg px-2 py-1 text-white text-center text-sm focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-sm text-slate-400">{getDeductionTypeLabel(rule.deductionType)}</span>
                  </div>

                  <button
                    onClick={() => handleDeleteRule(rule.id)}
                    className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <i className="fas fa-trash text-sm"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* How It Works */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <h4 className="font-medium text-white mb-3">How It Works</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li className="flex items-start gap-2">
            <i className="fas fa-check text-emerald-400 mt-0.5"></i>
            <span><strong>Per Item:</strong> Deducts for each line item in the order (e.g., 3 products = 3 stickers)</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="fas fa-check text-emerald-400 mt-0.5"></i>
            <span><strong>Per Order:</strong> Deducts once per order (e.g., 1 box per order)</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="fas fa-check text-emerald-400 mt-0.5"></i>
            <span><strong>Per Unit:</strong> Deducts for each unit ordered (e.g., 4 bottles = 4 gripper stickers)</span>
          </li>
        </ul>
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <div className="flex items-start gap-2 text-sm">
            <i className="fas fa-info-circle text-amber-400 mt-0.5"></i>
            <span className="text-amber-300">
              Inventory will be automatically deducted when orders are marked as shipped from the pack station.
            </span>
          </div>
        </div>
      </div>

      {/* Add Rule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Add Packing Supply Rule</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Select Product</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Choose a product...</option>
                  {state.products
                    .filter(p => !packingSupplyRules.some(r => r.productId === p.id))
                    .map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.sku})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Deduction Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'per_item', label: 'Per Item', desc: 'Per line item' },
                    { value: 'per_order', label: 'Per Order', desc: 'Once per order' },
                    { value: 'per_unit', label: 'Per Unit', desc: 'Per qty ordered' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setDeductionType(opt.value as 'per_item' | 'per_order' | 'per_unit')}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        deductionType === opt.value
                          ? 'bg-emerald-500/20 border-emerald-500 text-white'
                          : 'bg-slate-900 border-slate-600 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="font-medium text-sm">{opt.label}</div>
                      <div className="text-xs text-slate-400">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Quantity to Deduct</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  min="1"
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRule}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
              >
                Add Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
