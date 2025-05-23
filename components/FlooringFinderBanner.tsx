'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { logInfo } from '@/lib/LoggingService';

export function FlooringFinderBanner() {
  const handleClick = async () => {
    await logInfo('Flooring Finder clicked', { source: 'banner' });
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Need Help Choosing?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-700">
            Let us guide you to your perfect flooring solution
          </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto space-y-4 relative z-10">
          <Link
            href="/quiz"
            onClick={handleClick}
            className="block bg-[#00603A] rounded-xl p-8 hover:bg-[#004e2f] transition-colors duration-200 relative overflow-hidden"
          >
            <div className="absolute -right-32 -top-24 w-[32rem] h-[32rem] opacity-10 pointer-events-none select-none">
              <Image
                src="/favicon.png"
                alt=""
                fill
                className="object-contain object-right"
                style={{ filter: 'grayscale(100%)' }}
                priority
              />
            </div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Flooring Finder
                </h3>
                <p className="text-white/90 text-lg">
                  Answer a few questions and we'll recommend the best products for you.
                </p>
              </div>
              <div className="ml-8">
                <ChevronRightIcon className="h-8 w-8 text-white" />
              </div>
            </div>
          </Link>

          <Link
            href="/floorplan"
            onClick={handleClick}
            className="block bg-[#00603A] rounded-xl p-8 hover:bg-[#004e2f] transition-colors duration-200 relative overflow-hidden"
          >
            <div className="absolute -right-32 -top-[calc(100%+7rem)] w-[32rem] h-[32rem] opacity-10 pointer-events-none select-none">
              <Image
                src="/favicon.png"
                alt=""
                fill
                className="object-contain object-right"
                style={{ filter: 'grayscale(100%)' }}
                priority
              />
            </div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Blueprint Designer
                </h3>
                <p className="text-white/90 text-lg">
                  Create and visualize your perfect flooring layout with our intuitive software.
                </p>
              </div>
              <div className="ml-8">
                <ChevronRightIcon className="h-8 w-8 text-white" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
} 