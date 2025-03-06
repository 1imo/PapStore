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

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <section id="services" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Choose from our range of professional flooring solutions
          </p>
        </div>

        <div className={`mt-12 grid gap-6 sm:gap-8 ${
          services.length === 1 ? 'max-w-lg mx-auto' : 
          services.length === 2 ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto' :
          services.length === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' :
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              {service.imageUrl && (
                <div className="relative h-64 sm:h-72">
                  <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6 sm:p-8 bg-white">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                  {service.name}
                </h3>
                <p className="text-base text-gray-600 mb-6">
                  {service.description}
                </p>
                <a
                  href="#inquiry"
                  className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium rounded-xl text-white bg-gray-900 hover:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
                  onClick={() => {
                    logError('Service inquiry click', {
                      serviceId: service.id,
                      serviceName: service.name,
                    });
                  }}
                >
                  Get Quote
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 