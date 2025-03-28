'use client';

import Link from 'next/link';
import { ClientLoggingService } from '@/lib/ClientLoggingService';
import { smoothScrollToElement } from '@/lib/scrollUtils';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WPFooter",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": "PapStore Carpets & Flooring",
    "description": "Your trusted destination for quality carpets, rugs, and flooring solutions.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "",
      "addressRegion": "",
      "postalCode": "",
      "addressCountry": ""
    },
    "areaServed": [
      "Central London",
      "Woking",
      "Byfleet",
      "Dorking",
      "Addlestone",
      "Guildford"
    ],
    "sameAs": [
      "https://facebook.com/papstore",
      "https://instagram.com/papstore",
      "https://api.whatsapp.com/send?phone=447861172194"
    ]
  }
};

export function Footer() {
  const handleSocialClick = async (platform: string) => {
    await ClientLoggingService.info('Social link clicked', {
      platform,
      source: 'footer'
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <footer 
        className="bg-white border-t border-gray-100"
        role="contentinfo"
        itemScope
        itemType="https://schema.org/WPFooter"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div 
              className="col-span-2"
              itemScope
              itemType="https://schema.org/LocalBusiness"
            >
              <h2
                className="text-gray-900 text-4xl font-bold mb-6"
                itemProp="name"
              >
                PapStore Carpets & Flooring
              </h2>
              <p 
                className="text-gray-600 text-sm leading-relaxed mb-6"
                itemProp="description"
              >
                Your trusted destination for premium carpets, rugs, and innovative flooring solutions. 
                With over two decades of expertise, we offer an extensive range of high-quality products 
                from leading manufacturers. Visit our modern showroom in Southall, London, where our 
                expert team provides personalized advice and professional guidance for both residential 
                and commercial projects.
              </p>
              <p 
                className="text-gray-600 text-sm"
                itemProp="address"
                itemScope
                itemType="https://schema.org/PostalAddress"
              >
                <span itemProp="streetAddress"></span>,{' '}
                <span itemProp="addressLocality"></span>,{' '}
                <span itemProp="addressRegion"></span>,{' '}
                <span itemProp="postalCode"></span>
              </p>
            </div>
            <div className="text-left md:text-right">
              <h3 className="text-gray-900 text-lg font-semibold mb-4">Quick Links</h3>
              <nav 
                className="space-y-3"
                aria-label="Footer navigation"
              >
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/privacy-policy" 
                      className="text-gray-600 hover:text-[#00603A] text-sm"
                      aria-label="View our privacy policy"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/terms" 
                      className="text-gray-600 hover:text-[#00603A] text-sm"
                      aria-label="View our terms and conditions"
                    >
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#inquiry" 
                      className="text-gray-600 hover:text-[#00603A] text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScrollToElement('inquiry');
                      }}
                      aria-label="Contact us for inquiries"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/sitemap.xml" 
                      className="text-gray-600 hover:text-[#00603A] text-sm"
                      aria-label="View our sitemap"
                    >
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="text-left md:text-right">
              <h3 className="text-gray-900 text-lg font-semibold mb-4">Connect</h3>
              <ul 
                className="space-y-3"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <li>
                  <a 
                    href="https://facebook.com/papstore" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#00603A] text-sm"
                    onClick={() => handleSocialClick('facebook')}
                    aria-label="Visit our Facebook page"
                    itemProp="sameAs"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a 
                    href="https://instagram.com/papstore" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#00603A] text-sm"
                    onClick={() => handleSocialClick('instagram')}
                    aria-label="Visit our Instagram page"
                    itemProp="sameAs"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a 
                    href="https://api.whatsapp.com/send?phone=447861172194" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#00603A] text-sm"
                    onClick={() => handleSocialClick('whatsapp')}
                    aria-label="Contact us on WhatsApp"
                    itemProp="sameAs"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-100 pt-8">
            <div 
              className="flex justify-between items-center text-gray-600 text-sm"
              itemProp="copyrightNotice"
            >
              <p>© {new Date().getFullYear()} PapStore</p>
              <p>All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
} 