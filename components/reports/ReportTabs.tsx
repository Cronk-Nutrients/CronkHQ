'use client';

interface TabConfig {
  id: string;
  label: string;
  icon: string;
}

interface ReportTabsProps {
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  accentColor?: 'emerald' | 'blue' | 'purple' | 'amber' | 'pink' | 'cyan';
}

export default function ReportTabs({
  tabs,
  activeTab,
  onTabChange,
  accentColor = 'emerald',
}: ReportTabsProps) {
  const activeClasses: Record<string, string> = {
    emerald: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50',
    blue: 'bg-blue-500/20 text-blue-400 border border-blue-500/50',
    purple: 'bg-purple-500/20 text-purple-400 border border-purple-500/50',
    amber: 'bg-amber-500/20 text-amber-400 border border-amber-500/50',
    pink: 'bg-pink-500/20 text-pink-400 border border-pink-500/50',
    cyan: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50',
  };

  return (
    <div className="flex items-center gap-2 border-b border-slate-700 pb-4">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
            activeTab === tab.id
              ? activeClasses[accentColor]
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <i className={`fas ${tab.icon}`}></i>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
