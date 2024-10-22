'use client';

import { Suspense } from 'react';

// Components
import { Sidebar } from '@/components/sidebar';

import { ContextProvider } from '@/context/session';
import { DialogContentDetailsBook } from './components/dialog-content-details-book';

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full flex p-4">
      <ContextProvider>
        <Sidebar />
        {children}

        <Suspense fallback={null}>
          <DialogContentDetailsBook />
        </Suspense>
      </ContextProvider>
    </div>
  );
}
