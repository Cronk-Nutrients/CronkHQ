// Returns configuration constants
import { Return, ReturnReason, ItemCondition } from '@/context/AppContext';

// Status configuration with colors, icons, and labels
export const returnStatusConfig: Record<Return['status'], { color: string; icon: string; label: string }> = {
  requested: { color: 'amber', icon: 'fa-clock', label: 'Requested' },
  approved: { color: 'blue', icon: 'fa-check', label: 'Approved' },
  in_transit: { color: 'purple', icon: 'fa-truck', label: 'In Transit' },
  received: { color: 'cyan', icon: 'fa-box', label: 'Received' },
  inspected: { color: 'indigo', icon: 'fa-search', label: 'Inspected' },
  refunded: { color: 'emerald', icon: 'fa-check-circle', label: 'Refunded' },
  rejected: { color: 'red', icon: 'fa-times-circle', label: 'Rejected' },
};

// Status flow for timeline rendering
export const returnStatusFlow: Return['status'][] = [
  'requested',
  'approved',
  'in_transit',
  'received',
  'inspected',
  'refunded',
];

// Reason labels
export const returnReasonLabels: Record<ReturnReason, string> = {
  damaged_in_transit: 'Damaged in Transit',
  defective: 'Defective Product',
  wrong_item_sent: 'Wrong Item Sent',
  not_as_described: 'Not as Described',
  changed_mind: 'Changed Mind',
  ordered_wrong: 'Ordered Wrong',
  arrived_late: 'Arrived Late',
  better_price_found: 'Better Price Found',
  other: 'Other',
};

// Condition labels with colors
export const conditionLabels: Record<ItemCondition, { label: string; color: string }> = {
  new_sealed: { label: 'New (Sealed)', color: 'emerald' },
  new_opened: { label: 'New (Opened)', color: 'green' },
  like_new: { label: 'Like New', color: 'cyan' },
  good: { label: 'Good', color: 'blue' },
  damaged: { label: 'Damaged', color: 'amber' },
  unsellable: { label: 'Unsellable', color: 'red' },
};

// Date formatting helpers
export function formatReturnDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatReturnDateTime(date: Date): string {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
