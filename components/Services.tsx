'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { logError } from '@/lib/LoggingService';
import { smoothScrollToElement } from '@/lib/scrollUtils';

interface Service {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  isActive: boolean;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export function Services() {
  const services: Service[] = [
     {
      id: 1,
      name: "Hardwood & Engineered Flooring",
      description: "Premium solid hardwood and engineered wood installations. From classic oak to modern laminates, we offer solutions for every space and budget. Ideal for adding lasting value to your property.",
      imageUrl: null,
      isActive: true
    },
    {
      id: 2,
      name: "Vinyl, Linoleum & Carpet Solutions",
      description: "Expert installation of durable vinyl, linoleum, and quality carpets. Perfect for high-traffic areas with countless designs available. Full removal and disposal service included.",
      imageUrl: null,
      isActive: true
    },
    {
      id: 3,
      name: "Commercial Flooring Solutions",
      description: "Fast installation of durable commercial-grade flooring for businesses of all sizes. From retail spaces to offices, we ensure minimal disruption with maximum quality and longevity.",
      imageUrl: null,
      isActive: true
    }
  ];
  const isMobile = useIsMobile();
  const [lastInteraction, setLastInteraction] = useState(0);

  useEffect(() => {
    if (!isMobile) return;

    const container = document.querySelector('#services .overflow-x-auto');
    if (!container) return;

    // Handle touch/interaction events
    const handleInteraction = () => {
      setLastInteraction(Date.now());
    };

    container.addEventListener('touchstart', handleInteraction);
    container.addEventListener('mousedown', handleInteraction);

    // Auto-scroll effect
    const interval = setInterval(() => {
      // Check if 10 seconds have passed since last interaction
      if (Date.now() - lastInteraction < 10000) return;

      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const currentScroll = container.scrollLeft;
      
      let nextScroll = currentScroll + clientWidth;
      if (nextScroll >= scrollWidth - clientWidth) {
        nextScroll = 0;
      }
      
      container.scrollTo({
        left: nextScroll,
        behavior: 'smooth'
      });
    }, 4000);

    return () => {
      clearInterval(interval);
      container.removeEventListener('touchstart', handleInteraction);
      container.removeEventListener('mousedown', handleInteraction);
    };
  }, [isMobile, lastInteraction]);

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-700">
            Choose from our range of professional flooring solutions
          </p>
        </div>

        <div className={`mt-12 -mx-4 sm:mx-0 ${
          isMobile 
            ? 'flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-0 gap-6 pb-6' 
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
        }`}>
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 ${
                isMobile 
                  ? 'w-[85vw] flex-shrink-0 snap-always snap-center' + 
                    (index === services.length - 1 ? ' mr-4' : '')
                  : ''
              }`}
            >
              <div className="relative p-8 flex flex-col h-full">
                <div className="w-14 h-14 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-gray-900" 
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
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.name}
                </h3>
                
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {service.description}
                </p>

                <div className="mt-8">
                  <a 
                    href="#inquiry" 
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollToElement('inquiry');
                    }}
                    className="inline-flex items-center px-8 py-3 rounded-xl font-medium text-white bg-[#00603A] hover:bg-[#004e2f] transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Get Quote
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );    
}