'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { logError } from '@/lib/LoggingService';

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
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    try {
      const response = await fetch('/api/services');
      if (!response.ok) throw new Error('Failed to fetch services');
      
      const data = await response.json();
      const activeServices = data.services.filter((s: Service) => s.isActive);
      
      if (activeServices.length === 0) {
        setError('No services available at the moment');
      } else {
        setServices(activeServices);
      }
    } catch (error) {
      await logError('Failed to load services', { error });
      setError('Unable to load services. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section id="services" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading services...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">{error}</div>
        </div>
      </section>
    );
  }

  // Fixed bento layout matching the provided design
  const getBentoGridClass = (index) => {
    // Based on the screenshot with 4 services
    if (index === 0) return 'col-span-12 md:col-span-6 row-span-2'; // Left big card
    if (index === 1) return 'col-span-12 md:col-span-6 row-span-1'; // Top right card
    if (index === 2) return 'col-span-12 md:col-span-3 row-span-1'; // Bottom right small card
    if (index === 3) return 'col-span-12 md:col-span-3 row-span-1'; // Bottom right small card
    
    // For any additional services beyond the first 4
    return 'col-span-12 md:col-span-3 row-span-1';
  };

  return (
    <section id="services" className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-500">
            Choose from our range of professional flooring solutions
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-12 gap-4 md:gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const gridClass = getBentoGridClass(index);
            const isLarge = gridClass.includes('row-span-2');
            
            // Determine the card style based on index for variety
            const getCardStyle = (index) => {
              const styles = [
                // Featured card with full background image (left tall card)
                {
                  imagePosition: 'full',
                  titlePosition: 'overlay',
                  imageHeight: 'h-full',
                  textAlignment: 'text-left',
                  bgColor: 'bg-transparent',
                },
                // Top right card
                {
                  imagePosition: 'none',
                  titlePosition: 'top',
                  imageHeight: 'h-0',
                  textAlignment: 'text-left',
                  bgColor: 'bg-white',
                },
                // Bottom right first small card
                {
                  imagePosition: 'none',
                  titlePosition: 'top',
                  imageHeight: 'h-0',
                  textAlignment: 'text-left',
                  bgColor: 'bg-white',
                },
                // Bottom right second small card (with image)
                {
                  imagePosition: 'full',
                  titlePosition: 'overlay',
                  imageHeight: 'h-full',
                  textAlignment: 'text-left',
                  bgColor: 'bg-transparent',
                }
              ];
              return styles[index % styles.length];
            };
            
            const cardStyle = getCardStyle(index);
            // Always show images on mobile, otherwise follow desktop logic
            const showImage = isMobile || (cardStyle.imagePosition !== 'none' && service.imageUrl);
            const isFullImageCard = cardStyle.imagePosition === 'full';
            // Always use overlay style on mobile
            const isImageOverlay = isMobile || cardStyle.titlePosition === 'overlay';
            
            return (
              <div
                key={service.id}
                className={`group overflow-hidden rounded-2xl sm:rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col ${gridClass} ${isMobile ? 'h-[300px]' : 'min-h-[250px] sm:min-h-0'} ${cardStyle.bgColor}`}
              >
                {showImage && (
                  <div className={`relative ${isFullImageCard ? 'h-full' : 'h-full'} w-full overflow-hidden`}>
                    <Image
                      src={service.imageUrl || "/placeholder.jpg"}
                      alt={service.name}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    
                    {isImageOverlay && (
                      <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 w-full flex flex-col justify-end h-full">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                          {service.name}
                        </h3>
                        {/* Only show description on desktop and if it's a large card */}
                        {!isMobile && isLarge && (
                          <p className="text-white/90 text-sm sm:text-base max-w-md">
                            {service.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
                
                {(!showImage || !isImageOverlay) && (
                  <div className="p-4 sm:p-6 md:p-8 h-full flex flex-col justify-between">
                    <div>
                      <h3 className={`${isLarge ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg sm:text-xl md:text-2xl'} font-bold text-gray-900 mb-3 sm:mb-4`}>
                        {service.name}
                      </h3>
                      {/* Only show description on desktop */}
                      {!isMobile && (
                        <p className={`${isLarge ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} text-gray-600`}>
                          {service.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}