'use client';

interface FilterOption {
  value: string;
  label: string;
}

interface StatusFilterTabsProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  accentColor?: 'blue' | 'purple' | 'emerald';
}

export function StatusFilterTabs({
  options,
  value,
  onChange,
  accentColor = 'blue',
}: StatusFilterTabsProps) {
  const accentClasses = {
    blue: 'bg-blue-500/20 text-blue-300',
    purple: 'bg-purple-500/20 text-purple-300',
    emerald: 'bg-emerald-500/20 text-emerald-300',
  };

  return (
    <div className="flex items-center bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 text-sm rounded-lg transition-all ${
            value === option.value
              ? accentClasses[accentColor]
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// Date range tabs for shipping page
export type DateRangeType = 'today' | 'wtd' | 'mtd' | 'ytd' | 'custom';

interface DateRangeTabsProps {
  value: DateRangeType;
  onChange: (value: DateRangeType) => void;
}

export function DateRangeTabs({ value, onChange }: DateRangeTabsProps) {
  const options: { value: DateRangeType; label: string; icon?: string }[] = [
    { value: 'today', label: 'TODAY' },
    { value: 'wtd', label: 'WTD' },
    { value: 'mtd', label: 'MTD' },
    { value: 'ytd', label: 'YTD' },
    { value: 'custom', label: 'Custom', icon: 'fa-calendar' },
  ];

  return (
    <div className="flex items-center bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 text-sm rounded-lg transition-all ${
            value === option.value
              ? 'bg-purple-500/20 text-purple-300'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {option.icon ? (
            <span className="flex items-center gap-2">
              <i className={`fas ${option.icon}`}></i>
              {option.label}
            </span>
          ) : (
            option.label
          )}
        </button>
      ))}
    </div>
  );
}

// Custom date range inputs
interface CustomDateRangeProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export function CustomDateRange({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}: CustomDateRangeProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg">
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-400">From:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-400">To:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
        />
      </div>
    </div>
  );
}
