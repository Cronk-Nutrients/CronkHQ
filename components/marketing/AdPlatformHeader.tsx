'use client';

import Link from 'next/link';

interface AdPlatformHeaderProps {
  platformName: string;
  platformIcon: string;
  platformColor: string;
  accountName: string;
  accountId: string;
  lastSync?: string;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  onSync?: () => void;
  externalLinkLabel?: string;
  onExternalLink?: () => void;
}

export function AdPlatformHeader({
  platformName,
  platformIcon,
  platformColor,
  accountName,
  accountId,
  lastSync,
  dateRange,
  onDateRangeChange,
  onSync,
  externalLinkLabel,
  onExternalLink,
}: AdPlatformHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
        <Link href="/marketing" className="hover:text-white">Marketing</Link>
        <i className="fas fa-chevron-right text-xs"></i>
        <span className="text-white">{platformName}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: platformColor }}>
            <i className={`${platformIcon} text-white text-2xl`}></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{platformName}</h1>
            <p className="text-sm text-slate-400">{accountName} • {accountId}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-lg">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 text-sm">Connected</span>
            {lastSync && <span className="text-slate-500 text-xs">• Synced {lastSync}</span>}
          </div>
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white text-sm"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          {onSync && (
            <button onClick={onSync} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm">
              <i className="fas fa-sync-alt mr-2"></i>
              Sync Now
            </button>
          )}
          {externalLinkLabel && onExternalLink && (
            <button onClick={onExternalLink} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg text-sm">
              <i className="fas fa-external-link-alt mr-2"></i>
              {externalLinkLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
