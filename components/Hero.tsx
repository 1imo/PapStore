'use client';

import Link from 'next/link';
import { smoothScrollToElement } from '@/lib/scrollUtils';

export function Hero() {
  return (
    <div className="relative bg-white h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Professional</span>{' '}
            <span className="block text-gray-900 xl:inline">Carpet & Flooring</span>{' '}
            <span className="block text-gray-900 xl:inline">Solutions</span>
          </h1>
          <p className="mt-3 text-lg text-gray-600 sm:mt-5 sm:text-m sm:max-w-xl sm:mx-auto md:mt-5 md:text-m">
            Transform your space with our expert flooring installation services. 
            Family-owned business delivering quality craftsmanship for your home.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link
              href="#inquiry"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-[#00603A] hover:bg-[#004e2f] transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollToElement('inquiry');
              }}
            >
              Get a Free Quote
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#00603A] text-lg font-semibold rounded-xl text-[#00603A] bg-white hover:bg-[#00603A]/5 transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollToElement('services');
              }}
            >
              View Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 