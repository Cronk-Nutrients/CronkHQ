// Define all action barcodes - prefix with ACTION: to distinguish from product barcodes
// These barcodes can be printed and scanned to trigger actions in the app

export interface BarcodeAction {
  label: string
  icon: string
  category: string
  description: string
}

export const BARCODE_ACTIONS = {
  // Order Navigation
  'ACTION:NEXT_ORDER': {
    label: 'Next Order',
    icon: 'fa-arrow-right',
    category: 'navigation',
    description: 'Move to next order in queue',
  },
  'ACTION:PREV_ORDER': {
    label: 'Previous Order',
    icon: 'fa-arrow-left',
    category: 'navigation',
    description: 'Move to previous order',
  },
  'ACTION:FIRST_ORDER': {
    label: 'First Order',
    icon: 'fa-step-backward',
    category: 'navigation',
    description: 'Jump to first order in queue',
  },

  // Order Actions
  'ACTION:VERIFY_ORDER': {
    label: 'Verify Order',
    icon: 'fa-check-circle',
    category: 'order',
    description: 'Mark current order as verified',
  },
  'ACTION:COMPLETE_ORDER': {
    label: 'Complete Order',
    icon: 'fa-check-double',
    category: 'order',
    description: 'Mark order as complete/packed',
  },
  'ACTION:SKIP_ORDER': {
    label: 'Skip Order',
    icon: 'fa-forward',
    category: 'order',
    description: 'Skip current order (problem/hold)',
  },
  'ACTION:HOLD_ORDER': {
    label: 'Hold Order',
    icon: 'fa-pause',
    category: 'order',
    description: 'Put order on hold',
  },
  'ACTION:CANCEL_PICK': {
    label: 'Cancel Pick',
    icon: 'fa-undo',
    category: 'order',
    description: 'Cancel current pick session',
  },

  // Item Actions
  'ACTION:ITEM_PICKED': {
    label: 'Item Picked',
    icon: 'fa-check',
    category: 'item',
    description: 'Confirm current item picked',
  },
  'ACTION:ITEM_MISSING': {
    label: 'Item Missing',
    icon: 'fa-exclamation-triangle',
    category: 'item',
    description: 'Mark item as out of stock',
  },
  'ACTION:ITEM_DAMAGED': {
    label: 'Item Damaged',
    icon: 'fa-times-circle',
    category: 'item',
    description: 'Mark item as damaged',
  },
  'ACTION:ADD_QTY': {
    label: 'Add Quantity (+1)',
    icon: 'fa-plus',
    category: 'item',
    description: 'Increase quantity by 1',
  },
  'ACTION:REMOVE_QTY': {
    label: 'Remove Quantity (-1)',
    icon: 'fa-minus',
    category: 'item',
    description: 'Decrease quantity by 1',
  },

  // Printing
  'ACTION:PRINT_LABEL': {
    label: 'Print Shipping Label',
    icon: 'fa-print',
    category: 'print',
    description: 'Print shipping label for current order',
  },
  'ACTION:PRINT_PACKING_SLIP': {
    label: 'Print Packing Slip',
    icon: 'fa-file-alt',
    category: 'print',
    description: 'Print packing slip',
  },
  'ACTION:REPRINT_LABEL': {
    label: 'Reprint Label',
    icon: 'fa-redo',
    category: 'print',
    description: 'Reprint last shipping label',
  },

  // Box Selection
  'ACTION:BOX_SMALL': {
    label: 'Small Box',
    icon: 'fa-box',
    category: 'box',
    description: 'Select small box size',
  },
  'ACTION:BOX_MEDIUM': {
    label: 'Medium Box',
    icon: 'fa-box',
    category: 'box',
    description: 'Select medium box size',
  },
  'ACTION:BOX_LARGE': {
    label: 'Large Box',
    icon: 'fa-box',
    category: 'box',
    description: 'Select large box size',
  },
  'ACTION:BOX_ENVELOPE': {
    label: 'Envelope/Mailer',
    icon: 'fa-envelope',
    category: 'box',
    description: 'Select envelope/poly mailer',
  },

  // Quantity Shortcuts
  'ACTION:QTY_1': { label: 'Qty: 1', icon: 'fa-hashtag', category: 'quantity', description: 'Set quantity to 1' },
  'ACTION:QTY_2': { label: 'Qty: 2', icon: 'fa-hashtag', category: 'quantity', description: 'Set quantity to 2' },
  'ACTION:QTY_3': { label: 'Qty: 3', icon: 'fa-hashtag', category: 'quantity', description: 'Set quantity to 3' },
  'ACTION:QTY_4': { label: 'Qty: 4', icon: 'fa-hashtag', category: 'quantity', description: 'Set quantity to 4' },
  'ACTION:QTY_5': { label: 'Qty: 5', icon: 'fa-hashtag', category: 'quantity', description: 'Set quantity to 5' },
  'ACTION:QTY_6': { label: 'Qty: 6', icon: 'fa-hashtag', category: 'quantity', description: 'Set quantity to 6' },
  'ACTION:QTY_10': { label: 'Qty: 10', icon: 'fa-hashtag', category: 'quantity', description: 'Set quantity to 10' },
  'ACTION:QTY_12': { label: 'Qty: 12', icon: 'fa-hashtag', category: 'quantity', description: 'Set quantity to 12' },
  'ACTION:QTY_24': { label: 'Qty: 24', icon: 'fa-hashtag', category: 'quantity', description: 'Set quantity to 24' },

  // Mode Switching
  'ACTION:MODE_PICK': {
    label: 'Pick Mode',
    icon: 'fa-hand-pointer',
    category: 'mode',
    description: 'Switch to pick mode',
  },
  'ACTION:MODE_PACK': {
    label: 'Pack Mode',
    icon: 'fa-box-open',
    category: 'mode',
    description: 'Switch to pack mode',
  },
  'ACTION:MODE_VERIFY': {
    label: 'Verify Mode',
    icon: 'fa-clipboard-check',
    category: 'mode',
    description: 'Switch to verification mode',
  },

  // Utility
  'ACTION:REFRESH': {
    label: 'Refresh',
    icon: 'fa-sync',
    category: 'utility',
    description: 'Refresh current view',
  },
  'ACTION:HELP': {
    label: 'Help',
    icon: 'fa-question-circle',
    category: 'utility',
    description: 'Show help/shortcuts',
  },
} as const

export type BarcodeActionCode = keyof typeof BARCODE_ACTIONS

export const ACTION_CATEGORIES = {
  navigation: { label: 'Navigation', color: 'blue' },
  order: { label: 'Order Actions', color: 'emerald' },
  item: { label: 'Item Actions', color: 'amber' },
  print: { label: 'Printing', color: 'purple' },
  box: { label: 'Box Selection', color: 'cyan' },
  quantity: { label: 'Quantity', color: 'pink' },
  mode: { label: 'Mode', color: 'indigo' },
  utility: { label: 'Utility', color: 'slate' },
} as const

export function isActionBarcode(barcode: string): boolean {
  return barcode.startsWith('ACTION:')
}

export function getActionFromBarcode(barcode: string): BarcodeAction | null {
  if (isActionBarcode(barcode) && barcode in BARCODE_ACTIONS) {
    return BARCODE_ACTIONS[barcode as BarcodeActionCode]
  }
  return null
}

export function getActionsByCategory(category: string): [BarcodeActionCode, BarcodeAction][] {
  return Object.entries(BARCODE_ACTIONS).filter(
    ([_, action]) => action.category === category
  ) as [BarcodeActionCode, BarcodeAction][]
}
