'use client';

interface Tab {
  id: string;
  label: string;
  icon?: string;
  count?: number;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  accentColor?: 'emerald' | 'blue' | 'amber' | 'purple' | 'red' | 'cyan' | 'pink' | 'orange';
  variant?: 'underline' | 'pills' | 'buttons';
  className?: string;
}

const accentColors: Record<string, { active: string; hover: string; indicator: string }> = {
  emerald: {
    active: 'text-emerald-400',
    hover: 'hover:text-emerald-400',
    indicator: 'bg-emerald-400',
  },
  blue: {
    active: 'text-blue-400',
    hover: 'hover:text-blue-400',
    indicator: 'bg-blue-400',
  },
  amber: {
    active: 'text-amber-400',
    hover: 'hover:text-amber-400',
    indicator: 'bg-amber-400',
  },
  purple: {
    active: 'text-purple-400',
    hover: 'hover:text-purple-400',
    indicator: 'bg-purple-400',
  },
  red: {
    active: 'text-red-400',
    hover: 'hover:text-red-400',
    indicator: 'bg-red-400',
  },
  cyan: {
    active: 'text-cyan-400',
    hover: 'hover:text-cyan-400',
    indicator: 'bg-cyan-400',
  },
  pink: {
    active: 'text-pink-400',
    hover: 'hover:text-pink-400',
    indicator: 'bg-pink-400',
  },
  orange: {
    active: 'text-orange-400',
    hover: 'hover:text-orange-400',
    indicator: 'bg-orange-400',
  },
};

export function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
  accentColor = 'emerald',
  variant = 'underline',
  className = '',
}: TabNavigationProps) {
  const colors = accentColors[accentColor];

  if (variant === 'pills') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
              ${activeTab === tab.id
                ? `bg-${accentColor}-500/20 ${colors.active}`
                : `text-slate-400 hover:text-white hover:bg-slate-800`
              }
            `}
          >
            {tab.icon && <i className={tab.icon}></i>}
            {tab.label}
            {tab.count !== undefined && (
              <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                activeTab === tab.id ? 'bg-slate-700' : 'bg-slate-700/50'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'buttons') {
    return (
      <div className={`inline-flex bg-slate-800/50 rounded-lg p-1 ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2
              ${activeTab === tab.id
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:text-white'
              }
            `}
          >
            {tab.icon && <i className={tab.icon}></i>}
            {tab.label}
            {tab.count !== undefined && (
              <span className="px-1.5 py-0.5 text-xs bg-slate-600 rounded-full">{tab.count}</span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // Default: underline variant
  return (
    <div className={`border-b border-slate-700 ${className}`}>
      <div className="flex items-center gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative pb-3 text-sm font-medium transition-colors flex items-center gap-2
              ${activeTab === tab.id ? colors.active : `text-slate-400 ${colors.hover}`}
            `}
          >
            {tab.icon && <i className={tab.icon}></i>}
            {tab.label}
            {tab.count !== undefined && (
              <span className="px-1.5 py-0.5 text-xs bg-slate-700 rounded-full">{tab.count}</span>
            )}
            {activeTab === tab.id && (
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${colors.indicator}`}></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
