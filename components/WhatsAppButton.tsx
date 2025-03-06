'use client';

import { logInfo } from '@/lib/LoggingService';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const handleClick = async () => {
    await logInfo('WhatsApp button clicked');
    window.open('https://wa.me/+447561231794', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-50 rounded-full bg-green-500 p-3 text-white shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      <MessageCircle size={24} />
      <span className="sr-only">Contact via WhatsApp</span>
    </button>
  );
} 