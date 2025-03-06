'use client';

import { logInfo } from '@/lib/LoggingService';

export function WhatsAppButton() {
  const handleClick = async () => {
    await logInfo('WhatsApp button clicked');
    window.open('https://wa.me/your-number', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-50 rounded-full bg-green-500 p-3 text-white shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      {/* Add WhatsApp icon here */}
      <span className="sr-only">Contact via WhatsApp</span>
    </button>
  );
} 