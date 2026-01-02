'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { OrganizationProvider } from '@/context/OrganizationContext';
import { AppProvider } from '@/context/AppContext';
import { DateRangeProvider } from '@/context/DateRangeContext';
import { ToastProvider } from '@/components/ui/Toast';
import { ConfirmProvider } from '@/components/ui/ConfirmDialog';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <OrganizationProvider>
        <DateRangeProvider>
          <AppProvider>
            <ToastProvider>
              <ConfirmProvider>
                {children}
              </ConfirmProvider>
            </ToastProvider>
          </AppProvider>
        </DateRangeProvider>
      </OrganizationProvider>
    </AuthProvider>
  );
}

export default Providers;
