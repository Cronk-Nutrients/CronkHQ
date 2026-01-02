type ColorVariant = 'emerald' | 'blue' | 'amber' | 'purple' | 'red' | 'slate';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: ColorVariant;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  labelPosition?: 'inside' | 'outside';
  className?: string;
}

const colorClasses: Record<ColorVariant, string> = {
  emerald: 'bg-emerald-500',
  blue: 'bg-blue-500',
  amber: 'bg-amber-500',
  purple: 'bg-purple-500',
  red: 'bg-red-500',
  slate: 'bg-slate-500',
};

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

export function ProgressBar({
  value,
  max = 100,
  color = 'emerald',
  size = 'md',
  showLabel = false,
  labelPosition = 'outside',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex-1 bg-slate-700 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        >
          {showLabel && labelPosition === 'inside' && size === 'lg' && (
            <span className="text-[10px] text-white font-medium pl-2">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      </div>
      {showLabel && labelPosition === 'outside' && (
        <span className="text-xs text-slate-400 w-12 text-right">
          {percentage.toFixed(0)}%
        </span>
      )}
    </div>
  );
}

export default ProgressBar;
