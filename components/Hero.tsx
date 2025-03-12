'use client';

import Link from 'next/link';
import { smoothScrollToElement } from '@/lib/scrollUtils';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const LOCATIONS = [
  'Surrey',
  'London',
  'Guildford',
  'Woking',
  'Byfleet',
  'Dorking',
  'Addlestone'
];

const TYPING_SPEED = 50;
const DELETING_SPEED = 30;
const PAUSE_DURATION = 3000;

export function Hero() {
  const [locationText, setLocationText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [locationIndex, setLocationIndex] = useState(0);
  const [delta, setDelta] = useState(TYPING_SPEED);

  useEffect(() => {
    let timeout = setTimeout(() => {
      const currentLocation = LOCATIONS[locationIndex];
      
      if (isDeleting) {
        setLocationText(prev => prev.slice(0, -1));
        setDelta(DELETING_SPEED);
      } else {
        setLocationText(currentLocation.slice(0, locationText.length + 1));
        setDelta(TYPING_SPEED);
      }

      if (!isDeleting && locationText === currentLocation) {
        setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
      } else if (isDeleting && locationText === '') {
        setIsDeleting(false);
        setLocationIndex((prev) => (prev + 1) % LOCATIONS.length);
        setDelta(TYPING_SPEED);
      }
    }, delta);

    return () => clearTimeout(timeout);
  }, [locationText, isDeleting, locationIndex]);

  // Structured data for local business
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "PapStore Carpets & Flooring",
    "image": "https://papstore.co.uk/logo.png",
    "description": "Professional carpet and flooring solutions in Surrey and London. Family-owned business with over 20 years of experience.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "44-50 The Broadway",
      "addressLocality": "Southall",
      "addressRegion": "Middlesex",
      "postalCode": "UB1 1QB",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 51.5111,
      "longitude": -0.3800
    },
    "url": "https://papstore.co.uk",
    "telephone": "+447861172194",
    "areaServed": LOCATIONS.join(", "),
    "priceRange": "££"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section 
        className="relative bg-white h-[calc(100vh-64px)] flex items-center justify-center"
        aria-label="Hero section"
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full text-center">
            <h1 
              className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl leading-tight md:leading-tight"
              itemScope 
              itemType="https://schema.org/Service"
            >
              <span itemProp="name">
                Professional Carpet & Flooring Solutions in{' '}
                <span className="text-[#00603A] font-semibold inline-flex">
                  {locationText}
                  <span className="animate-blink ml-[1px]" aria-hidden="true">|</span>
                </span>
              </span>
            </h1>
            <p 
              className="mt-3 text-lg text-gray-600 sm:mt-5 sm:text-m sm:max-w-xl sm:mx-auto md:mt-5 md:text-m" 
              role="contentinfo"
              itemProp="description"
            >
              Family-owned business delivering quality craftsmanship for your home since 2021.
            </p>
            <div 
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4"
              role="group"
              aria-label="Call to action"
            >
              <Link
                href="#inquiry"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-[#00603A] hover:bg-[#004e2f] transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToElement('inquiry');
                }}
                role="button"
                aria-label="Request a free flooring quote"
                itemProp="potentialAction"
                itemScope
                itemType="https://schema.org/QuoteAction"
              >
                <span itemProp="name">Get a Free Quote</span>
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#00603A] text-lg font-semibold rounded-xl text-[#00603A] bg-white hover:bg-[#00603A]/5 transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToElement('services');
                }}
                role="button"
                aria-label="View our flooring services"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 