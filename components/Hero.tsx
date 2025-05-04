'use client';

import Link from 'next/link';
import { smoothScrollToElement } from '@/lib/scrollUtils';
import Image from 'next/image';

export function Hero() {
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
    "areaServed": "Surrey, London, Guildford, Woking, Byfleet, Dorking, Addlestone",
    "priceRange": "££"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section 
        className="relative bg-white h-[calc(100vh-120px)] md:h-[calc(100vh-100px)] flex items-center justify-center overflow-hidden"
        aria-label="Hero section"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1714646793527-ffe48cf181a6?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Luxury flooring installation"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="w-full text-center">
            <h1 
              className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl leading-tight md:leading-tight"
              itemScope 
              itemType="https://schema.org/Service"
            >
              Time for new flooring?
            </h1>
            <p 
              className="mt-3 text-lg text-gray-200 sm:mt-5 sm:text-xl sm:max-w-2xl sm:mx-auto md:mt-5" 
              role="contentinfo"
              itemProp="description"
            >
              We've got you covered.
            </p>

            {/* Value Propositions */}
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white font-semibold">Expert Installation</h3>
                <p className="text-gray-200 text-sm">Professional fitting by experienced craftsmen</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white font-semibold">Quality Materials</h3>
                <p className="text-gray-200 text-sm">Premium flooring from leading manufacturers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white font-semibold">Satisfaction Guaranteed</h3>
                <p className="text-gray-200 text-sm">100% satisfaction guarantee on all work</p>
              </div>
            </div>

            {/* CTAs */}
            <div 
              className="mt-12 sm:mt-16 flex flex-row justify-center space-x-4 max-w-3xl mx-auto"
              role="group"
              aria-label="Call to action"
            >
              <Link
                href="/quiz"
                className="inline-flex flex-col items-center justify-center px-4 sm:px-8 py-4 border border-transparent text-base sm:text-lg font-semibold rounded-xl text-white bg-[#00603A] hover:bg-[#004e2f] transition-all duration-200 shadow-md hover:shadow-lg flex-1 sm:flex-none"
                role="button"
                aria-label="Take our flooring quiz"
              >
                <svg className="w-6 h-6 mb-2 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Find Your Perfect Floor
              </Link>
              <Link
                href="#samples"
                className="inline-flex flex-col items-center justify-center px-4 sm:px-8 py-4 border-2 border-white text-base sm:text-lg font-semibold rounded-xl text-white bg-transparent hover:bg-white/10 transition-all duration-200 shadow-md hover:shadow-lg flex-1 sm:flex-none"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToElement('samples');
                }}
                role="button"
                aria-label="Request flooring samples"
              >
                <svg className="w-6 h-6 mb-2 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Get Free Samples<span className="sm:hidden"> Shipped</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80 text-sm">
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>5+ Years Experience</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>1000+ Happy Customers</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>5-Star Rated Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 