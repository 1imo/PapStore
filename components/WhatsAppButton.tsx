'use client';

import { logInfo } from '@/lib/LoggingService';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const handleClick = async () => {
    await logInfo('WhatsApp button clicked');
  };

  const phoneNumber = '447561231794';
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 flex items-center rounded-full bg-green-500 px-4 py-2 text-white shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      <MessageCircle size={24} className="mr-2" />
      <span className="font-medium">WhatsApp us</span>
      <span className="sr-only">Contact via WhatsApp</span>
    </a>
  );
} 