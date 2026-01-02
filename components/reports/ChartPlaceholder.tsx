'use client';

interface ChartPlaceholderProps {
  title: string;
  type?: 'line' | 'bar' | 'pie' | 'area' | 'donut';
  height?: string;
  className?: string;
}

export default function ChartPlaceholder({
  title,
  type = 'line',
  height = 'h-48',
  className = '',
}: ChartPlaceholderProps) {
  const icons: Record<string, string> = {
    line: 'fa-chart-line',
    bar: 'fa-chart-bar',
    pie: 'fa-chart-pie',
    area: 'fa-chart-area',
    donut: 'fa-chart-pie',
  };

  return (
    <div className={`bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5 ${className}`}>
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <div className={`${height} flex items-center justify-center border border-slate-700 border-dashed rounded-lg`}>
        <div className="text-center text-slate-400">
          <i className={`fas ${icons[type]} text-3xl mb-2`}></i>
          <p className="text-sm">{title} visualization</p>
        </div>
      </div>
    </div>
  );
}

// Summary card with optional chart placeholder
interface SummaryCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function SummaryCard({ title, children, className = '' }: SummaryCardProps) {
  return (
    <div className={`bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5 ${className}`}>
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}
