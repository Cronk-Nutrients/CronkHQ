'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, message: string, duration = 4000) => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { id, type, message, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Convenience methods
  const success = useCallback((message: string, duration?: number) => {
    addToast('success', message, duration);
  }, [addToast]);

  const error = useCallback((message: string, duration?: number) => {
    addToast('error', message, duration);
  }, [addToast]);

  const info = useCallback((message: string, duration?: number) => {
    addToast('info', message, duration);
  }, [addToast]);

  const warning = useCallback((message: string, duration?: number) => {
    addToast('warning', message, duration);
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, success, error, info, warning }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

// Toast icons mapping
const toastIcons: Record<ToastType, string> = {
  success: 'fa-check-circle',
  error: 'fa-exclamation-circle',
  info: 'fa-info-circle',
  warning: 'fa-exclamation-triangle',
};

// Toast colors mapping
const toastColors: Record<ToastType, { bg: string; border: string; text: string }> = {
  success: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
  },
  error: {
    bg: 'bg-red-500/20',
    border: 'border-red-500/30',
    text: 'text-red-400',
  },
  info: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
  },
  warning: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
  },
};

// Toast Container Component
function ToastContainer({
  toasts,
  removeToast,
}: {
  toasts: Toast[];
  removeToast: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map(toast => {
        const colors = toastColors[toast.type];
        const icon = toastIcons[toast.type];

        return (
          <div
            key={toast.id}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm
              animate-in slide-in-from-right-full duration-300
              ${colors.bg} ${colors.border} ${colors.text}
            `}
            role="alert"
          >
            <i className={`fas ${icon} flex-shrink-0`}></i>
            <span className="text-sm flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-slate-400 hover:text-white transition-colors flex-shrink-0"
              aria-label="Dismiss"
            >
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ToastProvider;
