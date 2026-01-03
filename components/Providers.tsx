'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { OrganizationProvider } from '@/context/OrganizationContext';
import { AppProvider } from '@/context/AppContext';
import { DateRangeProvider } from '@/context/DateRangeContext';
import { ScannerProvider } from '@/context/ScannerContext';
import { ToastProvider } from '@/components/ui/Toast';
import { ConfirmProvider } from '@/components/ui/ConfirmDialog';
import OrderNotification from '@/components/OrderNotification';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <OrganizationProvider>
        <GoogleAnalytics />
        <DateRangeProvider>
          <AppProvider>
            <ToastProvider>
              <ConfirmProvider>
                <ScannerProvider>
                  <OrderNotification position="top-right" />
                  {children}
                </ScannerProvider>
              </ConfirmProvider>
            </ToastProvider>
          </AppProvider>
        </DateRangeProvider>
      </OrganizationProvider>
    </AuthProvider>
  );
}

export default Providers;
