'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { logInfo } from '@/lib/LoggingService';

export function EmailBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Check if banner has been dismissed before
    const hasBeenDismissed = localStorage.getItem('emailBannerDismissed');
    if (!hasBeenDismissed) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
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

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="p-2 rounded-lg bg-gray-900 shadow-lg sm:p-3">
          <div className="flex items-center justify-between flex-wrap">
            {status !== 'success' ? (
              <>
                <div className="w-0 flex-1 flex items-center min-w-0">
                  <span className="flex p-2 rounded-lg bg-gray-800">
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
                    <span className="md:hidden">10% off your first job!</span>
                    <span className="hidden md:inline">Get 10% off your first job when you subscribe to our newsletter.</span>
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0 sm:ml-3">
                  <div className="flex items-center justify-between">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="min-w-0 w-full sm:w-64 px-4 py-2 text-base rounded-lg border-2 border-transparent focus:border-white bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
                      required
                    />
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="ml-2 flex-shrink-0 px-4 py-2 text-base font-medium rounded-lg text-gray-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {status === 'submitting' ? 'Sending...' : 'Subscribe'}
                    </button>
                    <button
                      type="button"
                      className="ml-2 flex-shrink-0 p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={handleDismiss}
                    >
                      <span className="sr-only">Dismiss</span>
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  {status === 'error' && (
                    <p className="mt-2 text-sm text-red-400">Something went wrong. Please try again.</p>
                  )}
                </form>
              </>
            ) : (
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center">
                  <span className="flex p-2 rounded-lg bg-green-800">
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
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  </span>
                  <p className="ml-3 font-medium text-white">
                    Thanks for subscribing! Your discount code will be emailed shortly.
                  </p>
                </div>
                <button
                  type="button"
                  className="ml-2 flex-shrink-0 p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
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
  );
} 