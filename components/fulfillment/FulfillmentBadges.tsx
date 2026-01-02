'use client';

import { Order } from '@/context/AppContext';

// Channel configuration for fulfillment context
export const channelConfig: Record<Order['channel'], { bg: string; text: string; label: string }> = {
  shopify: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Shopify' },
  amazon_fbm: { bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'Amazon FBM' },
  amazon_fba: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Amazon FBA' },
  manual: { bg: 'bg-slate-500/20', text: 'text-slate-400', label: 'Manual' },
};

interface ChannelBadgeProps {
  channel: Order['channel'];
}

export function ChannelBadge({ channel }: ChannelBadgeProps) {
  const config = channelConfig[channel] || channelConfig.manual;
  return (
    <span className={`px-2 py-0.5 rounded text-xs ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

// Pick status badges
export type PickStatus = 'to_pick' | 'picking';

const pickStatusConfig: Record<PickStatus, { bg: string; text: string; label: string }> = {
  to_pick: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'To Pick' },
  picking: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Picking' },
};

interface PickStatusBadgeProps {
  status: PickStatus;
}

export function PickStatusBadge({ status }: PickStatusBadgeProps) {
  const config = pickStatusConfig[status];
  return (
    <span className={`px-2 py-0.5 text-xs rounded-full ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

// Pack status badges
export type PackStatus = 'to_pack' | 'packing' | 'ready';

const packStatusConfig: Record<PackStatus, { bg: string; text: string; label: string }> = {
  to_pack: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'To Pack' },
  packing: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', label: 'Packing' },
  ready: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Ready' },
};

interface PackStatusBadgeProps {
  status: PackStatus;
}

export function PackStatusBadge({ status }: PackStatusBadgeProps) {
  const config = packStatusConfig[status];
  return (
    <span className={`px-2 py-0.5 text-xs rounded-full ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

// Carrier badge for shipping page
export const carrierConfig: Record<string, { badge: string; color: string; textColor: string }> = {
  usps: { badge: 'USPS', color: 'bg-blue-600', textColor: 'bg-blue-500/20 text-blue-400' },
  ups: { badge: 'UPS', color: 'bg-amber-700', textColor: 'bg-amber-500/20 text-amber-400' },
  fedex: { badge: 'FDX', color: 'bg-purple-600', textColor: 'bg-purple-500/20 text-purple-400' },
  dhl: { badge: 'DHL', color: 'bg-orange-500', textColor: 'bg-orange-500/20 text-orange-400' },
};

interface CarrierBadgeProps {
  carrier: string;
  variant?: 'icon' | 'text';
}

export function CarrierBadge({ carrier, variant = 'text' }: CarrierBadgeProps) {
  const config = carrierConfig[carrier] || {
    badge: carrier.toUpperCase(),
    color: 'bg-slate-600',
    textColor: 'bg-slate-500/20 text-slate-400'
  };

  if (variant === 'icon') {
    return (
      <div className={`w-8 h-8 ${config.color} rounded-lg flex items-center justify-center`}>
        <span className="text-white font-bold text-xs">{config.badge}</span>
      </div>
    );
  }

  return (
    <span className={`px-2 py-1 ${config.textColor} rounded text-xs font-medium`}>
      {carrier.toUpperCase()}
    </span>
  );
}

// Shipping status badge
export type ShippingStatus = 'label_created' | 'in_transit' | 'delivered' | 'exception';

interface ShippingStatusBadgeProps {
  status: ShippingStatus;
}

export function ShippingStatusBadge({ status }: ShippingStatusBadgeProps) {
  switch (status) {
    case 'in_transit':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/15 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
          In Transit
        </span>
      );
    case 'delivered':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/15 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/30">
          <i className="fas fa-check text-[10px]"></i>
          Delivered
        </span>
      );
    case 'exception':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/15 text-amber-400 text-xs font-medium rounded-full border border-amber-500/30">
          <i className="fas fa-exclamation-triangle text-[10px]"></i>
          Exception
        </span>
      );
    case 'label_created':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-500/15 text-slate-400 text-xs font-medium rounded-full border border-slate-500/30">
          <i className="fas fa-tag text-[10px]"></i>
          Label Created
        </span>
      );
    default:
      return null;
  }
}

// Margin badge for shipping analytics
interface MarginBadgeProps {
  margin: number;
}

export function MarginBadge({ margin }: MarginBadgeProps) {
  const colorClass = margin >= 40
    ? 'bg-emerald-500/20 text-emerald-400'
    : margin >= 25
    ? 'bg-amber-500/20 text-amber-400'
    : 'bg-red-500/20 text-red-400';

  return (
    <span className={`px-2 py-1 ${colorClass} rounded-full text-xs font-medium`}>
      {margin.toFixed(1)}%
    </span>
  );
}

// Queue status badge (for overview page)
interface QueueStatusBadgeProps {
  status: Order['status'];
}

export function QueueStatusBadge({ status }: QueueStatusBadgeProps) {
  if (status === 'to_pick') {
    return <PickStatusBadge status="to_pick" />;
  }
  if (status === 'picking') {
    return <PickStatusBadge status="picking" />;
  }
  if (status === 'to_pack') {
    return <PackStatusBadge status="to_pack" />;
  }
  if (status === 'packing') {
    return <PackStatusBadge status="packing" />;
  }
  if (status === 'ready') {
    return <PackStatusBadge status="ready" />;
  }
  return null;
}

// FBA Shipment status badge
export type FBAStatus = 'prep' | 'ready' | 'shipped';

const fbaStatusConfig: Record<FBAStatus, { bg: string; text: string; border: string; label: string }> = {
  prep: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', label: 'Prepping' },
  ready: { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30', label: 'Ready to Ship' },
  shipped: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', label: 'Shipped' },
};

interface FBAStatusBadgeProps {
  status: FBAStatus;
}

export function FBAStatusBadge({ status }: FBAStatusBadgeProps) {
  const config = fbaStatusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${config.bg} ${config.text} text-xs font-medium rounded-full border ${config.border}`}>
      {status === 'prep' && <i className="fas fa-cog animate-spin text-[10px]"></i>}
      {status === 'ready' && <i className="fas fa-check text-[10px]"></i>}
      {status === 'shipped' && <i className="fas fa-truck text-[10px]"></i>}
      {config.label}
    </span>
  );
}

// Amazon destination badge
interface AmazonDestinationBadgeProps {
  destination: 'amazon_usa' | 'amazon_canada';
  code?: string;
}

export function AmazonDestinationBadge({ destination, code }: AmazonDestinationBadgeProps) {
  const isUSA = destination === 'amazon_usa';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 ${isUSA ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'} text-xs font-medium rounded`}>
      <i className="fab fa-amazon"></i>
      {isUSA ? 'USA' : 'CA'}
      {code && <span className="font-mono ml-1">{code}</span>}
    </span>
  );
}
