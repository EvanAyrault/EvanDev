'use client';

import Navigation from './Navigation';
import MaintenanceBanner from './MaintenanceBanner';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MaintenanceBanner />
      <Navigation />
      {children}
    </>
  );
} 