import Navigation from '@/components/Navigation';
import MaintenanceBanner from '@/components/MaintenanceBanner';
import { configService } from '@/services/configService';
import { redirect } from 'next/navigation';
import Preloader from '@/components/Preloader';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Vérification du mode maintenance
  if (configService.isMaintenanceMode()) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-white mb-4">Site en maintenance</h1>
          <p className="text-purple-200">{configService.getMaintenanceMessage()}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Preloader />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <MaintenanceBanner />
        <Navigation />
        {children}
      </div>
    </>
  );
} 