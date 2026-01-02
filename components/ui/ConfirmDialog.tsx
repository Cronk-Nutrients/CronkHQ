'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  icon?: string;
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts);
    setIsOpen(true);
    return new Promise(resolve => {
      setResolvePromise(() => resolve);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    resolvePromise?.(true);
    setIsOpen(false);
    setOptions(null);
  }, [resolvePromise]);

  const handleCancel = useCallback(() => {
    resolvePromise?.(false);
    setIsOpen(false);
    setOptions(null);
  }, [resolvePromise]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleCancel();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleCancel]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {isOpen && options && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleCancel}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Icon */}
            {options.icon && (
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                options.destructive ? 'bg-red-500/20' : 'bg-blue-500/20'
              }`}>
                <i className={`fas ${options.icon} text-xl ${
                  options.destructive ? 'text-red-400' : 'text-blue-400'
                }`}></i>
              </div>
            )}

            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-2">{options.title}</h3>

            {/* Message */}
            <p className="text-slate-400 mb-6">{options.message}</p>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-lg transition-colors"
              >
                {options.cancelText || 'Cancel'}
              </button>
              <button
                onClick={handleConfirm}
                className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                  options.destructive
                    ? 'bg-red-600 hover:bg-red-500 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {options.confirmText || 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within ConfirmProvider');
  }
  return context.confirm;
}

export default ConfirmProvider;
