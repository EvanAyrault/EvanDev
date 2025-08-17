'use client';

import { useEffect, useState } from 'react';
import { configService } from '@/services/configService';

export default function MaintenanceBanner() {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsMaintenance(configService.isMaintenanceMode());
    setMessage(configService.getMaintenanceMessage());
  }, []);

  if (!isMaintenance) return null;

  return (
    <div className="bg-yellow-500 text-black py-2 px-4 text-center">
      {message}
    </div>
  );
} 