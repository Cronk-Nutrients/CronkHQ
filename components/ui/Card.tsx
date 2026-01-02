import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  header?: ReactNode;
  headerAction?: ReactNode;
  headerClassName?: string;
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
};

export function Card({
  children,
  className = '',
  padding = 'md',
  header,
  headerAction,
  headerClassName = '',
}: CardProps) {
  return (
    <div className={`bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden ${className}`}>
      {(header || headerAction) && (
        <div className={`px-5 py-4 border-b border-slate-700/50 flex items-center justify-between ${headerClassName}`}>
          {typeof header === 'string' ? (
            <h2 className="font-semibold text-white">{header}</h2>
          ) : (
            header
          )}
          {headerAction}
        </div>
      )}
      <div className={paddingClasses[padding]}>
        {children}
      </div>
    </div>
  );
}

export default Card;
