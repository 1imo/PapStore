'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { logInfo } from '@/lib/LoggingService';

// Add gtag type declaration
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        analytics_storage?: 'granted' | 'denied';
      }
    ) => void;
  }
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    }
  }, [isVisible]);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    // Enable Google Analytics
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    // Disable Google Analytics
    window.gtag('consent', 'update', {
      'analytics_storage': 'denied'
    });
    setIsVisible(false);
  };

  const handleTransitionEnd = () => {
    if (!isVisible) {
      setShouldRender(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 h-[100px] sm:h-[80px] z-60">
      <div 
        className="absolute bottom-0 inset-x-0 pb-2 sm:pb-5 w-full"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.5s ease-in-out'
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="p-2 rounded-lg bg-[#00603A] shadow-lg sm:p-3">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-full flex items-center justify-between flex-wrap">
                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start mb-2 sm:mb-0">
                  <div className="flex items-center flex-1">
                    <span className="flex p-2 rounded-lg bg-[#004e2f]">
                      <svg 
                        className="h-6 w-6 text-white" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                      </svg>
                    </span>
                    <p className="ml-3 font-medium text-white truncate">
                      <span>We use cookies to improve your experience. By continuing to use this site, you agree to our use of cookies.</span>
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handleAccept}
                    className="flex-shrink-0 px-4 py-2 text-base font-medium rounded-lg text-[#00603A] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={handleDecline}
                    className="flex-shrink-0 px-4 py-2 text-base font-medium rounded-lg text-white border border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 