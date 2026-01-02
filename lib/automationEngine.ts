import type {
  AutomationRule,
  RuleCondition,
  RuleAction,
  Order
} from '@/context/AppContext';

// Evaluate a single condition against a context
export function evaluateCondition(
  condition: RuleCondition,
  context: Record<string, any>
): boolean {
  const fieldValue = context[condition.field];

  // Handle special case for contains_sku which is a function
  if (condition.field === 'contains_sku' && typeof context.contains_sku === 'function') {
    return context.contains_sku(condition.value);
  }

  switch (condition.operator) {
    case 'equals':
      return fieldValue === condition.value;
    case 'not_equals':
      return fieldValue !== condition.value;
    case 'contains':
      return String(fieldValue).toLowerCase().includes(String(condition.value).toLowerCase());
    case 'greater_than':
      return Number(fieldValue) > Number(condition.value);
    case 'less_than':
      return Number(fieldValue) < Number(condition.value);
    case 'in_list':
      if (Array.isArray(condition.value)) {
        return condition.value.includes(fieldValue);
      }
      return false;
    default:
      return false;
  }
}

// Evaluate all conditions (AND logic by default)
export function evaluateConditions(
  conditions: RuleCondition[],
  context: Record<string, any>
): boolean {
  if (conditions.length === 0) return true;

  return conditions.every(condition => evaluateCondition(condition, context));
}

// Execute a single action
export function executeAction(
  action: RuleAction,
  context: Record<string, any>,
  dispatch: React.Dispatch<any>
): void {
  const order = context.order as Order;

  switch (action.type) {
    case 'set_order_tag':
      if (order) {
        dispatch({
          type: 'UPDATE_ORDER',
          payload: {
            ...order,
            tags: [...(order.tags || []), action.config.tag],
            updatedAt: new Date()
          }
        });
      }
      break;

    case 'set_priority':
      if (order) {
        dispatch({
          type: 'UPDATE_ORDER',
          payload: {
            ...order,
            priority: action.config.priority,
            updatedAt: new Date()
          }
        });
      }
      break;

    case 'assign_carrier':
      if (order) {
        dispatch({
          type: 'UPDATE_ORDER',
          payload: {
            ...order,
            suggestedCarrier: action.config.carrier,
            carrier: action.config.carrier,
            updatedAt: new Date()
          }
        });
      }
      break;

    case 'assign_service':
      if (order) {
        dispatch({
          type: 'UPDATE_ORDER',
          payload: {
            ...order,
            suggestedService: action.config.service,
            service: action.config.service,
            updatedAt: new Date()
          }
        });
      }
      break;

    case 'select_box':
      if (order) {
        dispatch({
          type: 'UPDATE_ORDER',
          payload: {
            ...order,
            suggestedBoxId: action.config.boxId,
            updatedAt: new Date()
          }
        });
      }
      break;

    case 'add_fulfillment_item':
      if (order) {
        dispatch({
          type: 'UPDATE_ORDER',
          payload: {
            ...order,
            fulfillmentItems: [
              ...(order.fulfillmentItems || []),
              {
                productId: action.config.productId,
                quantity: action.config.quantity || 1,
                reason: 'automation_rule'
              }
            ],
            updatedAt: new Date()
          }
        });
      }
      break;

    case 'send_notification':
      // In a real app, this would trigger a notification system
      console.log(`[Automation] Notification: ${action.config.message}`);
      break;

    case 'create_po_draft':
      // In a real app, this would create a PO draft
      console.log(`[Automation] Create PO draft with quantity: ${action.config.quantity}`);
      break;

    case 'send_email':
      // In a real app, this would send an email
      console.log(`[Automation] Send email to: ${action.config.recipient}`);
      break;

    case 'set_location':
      // Set preferred fulfillment location
      console.log(`[Automation] Set location: ${action.config.locationId}`);
      break;

    default:
      console.warn(`[Automation] Unknown action type: ${action.type}`);
  }
}

// Execute all actions for a rule
export function executeActions(
  actions: RuleAction[],
  context: Record<string, any>,
  dispatch: React.Dispatch<any>
): void {
  actions.forEach(action => {
    executeAction(action, context, dispatch);
  });
}

// Build context object from an order
export function buildOrderContext(order: Order): Record<string, any> {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    order,
    channel: order.channel,
    total: order.total,
    subtotal: order.subtotal,
    item_count: itemCount,
    shipping_country: order.customer?.address?.country || '',
    shipping_state: order.customer?.address?.state || '',
    shipping_city: order.customer?.address?.city || '',
    customer_email: order.customer?.email || '',
    customer_name: order.customer?.name || '',
    contains_sku: (sku: string) => order.items.some(item =>
      item.sku?.toLowerCase().includes(sku.toLowerCase())
    ),
    weight: order.totalWeight || 0,
    is_prime: order.isPrime || false,
    requires_signature: order.requiresSignature || false,
    order_number: order.orderNumber,
    status: order.status
  };
}

// Run all matching rules for a specific trigger
export function runRulesForTrigger(
  triggerType: string,
  context: Record<string, any>,
  rules: AutomationRule[],
  dispatch: React.Dispatch<any>
): { rulesRun: number; actionsExecuted: number } {
  let rulesRun = 0;
  let actionsExecuted = 0;

  // Filter enabled rules with matching trigger, sorted by priority
  const matchingRules = rules
    .filter(rule => rule.enabled && rule.trigger.type === triggerType)
    .sort((a, b) => a.priority - b.priority);

  matchingRules.forEach(rule => {
    if (evaluateConditions(rule.conditions, context)) {
      executeActions(rule.actions, context, dispatch);
      rulesRun++;
      actionsExecuted += rule.actions.length;
    }
  });

  return { rulesRun, actionsExecuted };
}

// Helper to run rules when an order is created
export function runOrderCreatedRules(
  order: Order,
  rules: AutomationRule[],
  dispatch: React.Dispatch<any>
): { rulesRun: number; actionsExecuted: number } {
  const context = buildOrderContext(order);
  return runRulesForTrigger('order_created', context, rules, dispatch);
}

// Helper to run rules when order status changes
export function runOrderStatusChangedRules(
  order: Order,
  fromStatus: string,
  toStatus: string,
  rules: AutomationRule[],
  dispatch: React.Dispatch<any>
): { rulesRun: number; actionsExecuted: number } {
  const context = {
    ...buildOrderContext(order),
    from_status: fromStatus,
    to_status: toStatus
  };

  // Filter rules that match the status change
  const statusRules = rules.filter(rule => {
    if (rule.trigger.type !== 'order_status_changed') return false;
    const trigger = rule.trigger as { type: 'order_status_changed'; fromStatus?: string; toStatus?: string };

    // Check if fromStatus matches (if specified)
    if (trigger.fromStatus && trigger.fromStatus !== fromStatus) return false;
    // Check if toStatus matches (if specified)
    if (trigger.toStatus && trigger.toStatus !== toStatus) return false;

    return true;
  });

  let rulesRun = 0;
  let actionsExecuted = 0;

  statusRules
    .filter(rule => rule.enabled)
    .sort((a, b) => a.priority - b.priority)
    .forEach(rule => {
      if (evaluateConditions(rule.conditions, context)) {
        executeActions(rule.actions, context, dispatch);
        rulesRun++;
        actionsExecuted += rule.actions.length;
      }
    });

  return { rulesRun, actionsExecuted };
}

// Helper to run low stock rules
export function runLowStockRules(
  productId: string,
  productSku: string,
  currentQuantity: number,
  rules: AutomationRule[],
  dispatch: React.Dispatch<any>
): { rulesRun: number; actionsExecuted: number } {
  let rulesRun = 0;
  let actionsExecuted = 0;

  const lowStockRules = rules.filter(rule => {
    if (rule.trigger.type !== 'low_stock') return false;
    const trigger = rule.trigger as { type: 'low_stock'; threshold?: number };
    const threshold = trigger.threshold || 50;
    return currentQuantity <= threshold;
  });

  const context = {
    product_id: productId,
    sku: productSku,
    quantity: currentQuantity
  };

  lowStockRules
    .filter(rule => rule.enabled)
    .sort((a, b) => a.priority - b.priority)
    .forEach(rule => {
      if (evaluateConditions(rule.conditions, context)) {
        executeActions(rule.actions, context, dispatch);
        rulesRun++;
        actionsExecuted += rule.actions.length;
      }
    });

  return { rulesRun, actionsExecuted };
}

// Get human-readable trigger label
export function getTriggerLabel(trigger: AutomationRule['trigger']): string {
  switch (trigger.type) {
    case 'order_created':
      return 'New Order';
    case 'order_status_changed':
      const statusTrigger = trigger as { type: 'order_status_changed'; fromStatus?: string; toStatus?: string };
      if (statusTrigger.toStatus) {
        return `Status → ${statusTrigger.toStatus}`;
      }
      return 'Status Change';
    case 'low_stock':
      const lowStockTrigger = trigger as { type: 'low_stock'; threshold?: number };
      return `Low Stock (≤${lowStockTrigger.threshold || 50})`;
    case 'item_received':
      return 'Item Received';
    case 'daily':
      const dailyTrigger = trigger as { type: 'daily'; time: string };
      return `Daily at ${dailyTrigger.time}`;
    case 'manual':
      return 'Manual';
    default:
      return 'Unknown';
  }
}

// Get human-readable action label
export function getActionLabel(action: RuleAction): string {
  switch (action.type) {
    case 'set_order_tag':
      return `Add tag "${action.config.tag}"`;
    case 'set_priority':
      return `Set priority to ${action.config.priority}`;
    case 'assign_carrier':
      return `Assign ${action.config.carrier?.toUpperCase()}`;
    case 'assign_service':
      return `Use ${action.config.service}`;
    case 'select_box':
      return `Select box ${action.config.boxId}`;
    case 'send_notification':
      return 'Send notification';
    case 'add_fulfillment_item':
      return `Add item (qty: ${action.config.quantity || 1})`;
    case 'set_location':
      return `Set location`;
    case 'create_po_draft':
      return `Create PO draft`;
    case 'send_email':
      return `Send email`;
    default:
      return 'Unknown action';
  }
}

// Get operator label
export function getOperatorLabel(operator: RuleCondition['operator']): string {
  const labels: Record<RuleCondition['operator'], string> = {
    equals: 'equals',
    not_equals: 'does not equal',
    contains: 'contains',
    greater_than: 'is greater than',
    less_than: 'is less than',
    in_list: 'is one of'
  };
  return labels[operator] || operator;
}
