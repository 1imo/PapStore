'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { logInfo } from '@/lib/LoggingService';

export function EmailBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    }
  }, [isVisible]);

  useEffect(() => {
    const hasBeenDismissed = localStorage.getItem('emailBannerDismissed');
    if (!hasBeenDismissed) {
      // Show after delay for both mobile and desktop
      const timer = setTimeout(() => {
        setShouldRender(true);
        setTimeout(() => setIsVisible(true), 100); // Small delay to ensure render happens first
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('emailBannerDismissed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Subscription failed');

      await logInfo('Email subscription', { email });
      setStatus('success');
      
      // Automatically dismiss after 3 seconds
      setTimeout(() => {
        handleDismiss();
      }, 3000);
    } catch (error) {
      setStatus('error');
    }
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
              {status !== 'success' ? (
                <>
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
                          <span>Enter your email for £100 off your first job!</span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="flex-shrink-0 p-2 rounded-md text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white sm:hidden"
                        onClick={handleDismiss}
                      >
                        <span className="sr-only">Dismiss</span>
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </div>
                    <form onSubmit={handleSubmit} className="flex-shrink-0 w-full sm:w-auto flex items-center">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="min-w-0 flex-1 sm:w-auto px-4 py-2 text-base rounded-lg border-2 border-transparent focus:border-white bg-[#004e2f] text-white placeholder-white/70 focus:outline-none"
                        required
                      />
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="ml-2 flex-shrink-0 px-4 py-2 text-base font-medium rounded-lg text-[#00603A] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        {status === 'submitting' ? 'Sending...' : 'Subscribe'}
                      </button>
                      <button
                        type="button"
                        className="ml-2 hidden sm:flex flex-shrink-0 p-2 rounded-md text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={handleDismiss}
                      >
                        <span className="sr-only">Dismiss</span>
                        <XMarkIcon className="h-6 w-6" />
                      </button>
                    </form>
                    {status === 'error' && (
                      <p className="mt-2 text-sm text-red-400 w-full sm:w-auto">Something went wrong. Please try again.</p>
                    )}
                  </div>
                </>
              ) : (
                <div className="w-full flex items-center justify-between p-2">
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
                    <p className="ml-3 font-medium text-white text-sm sm:text-base">
                      Thanks for subscribing! Your discount code will be emailed shortly.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="ml-2 flex-shrink-0 p-2 rounded-md text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={handleDismiss}
                  >
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 