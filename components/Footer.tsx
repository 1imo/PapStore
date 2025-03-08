'use client';

import Link from 'next/link';
import { ClientLoggingService } from '@/lib/ClientLoggingService';
import { smoothScrollToElement } from '@/lib/scrollUtils';

export function Footer() {
  const handleSocialClick = async (platform: string) => {
    await ClientLoggingService.info('Social link clicked', {
      platform,
      source: 'footer'
    });
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-gray-900 text-lg font-semibold">PapStore Carpets & Flooring</h3>
            <p className="mt-4 text-gray-600 text-sm">
              Your trusted destination for quality carpets, rugs, and flooring solutions. 
              Visit our showroom in Southall, London for expert advice and a wide selection of products.
            </p>
            <p className="mt-2 text-gray-600 text-sm">
              44-50 The Broadway, Southall, Middlesex, UB1 1QB
            </p>
          </div>
          <div>
            <h3 className="text-gray-900 text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-[#00603A] text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-[#00603A] text-sm">
                  Terms & Conditions
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
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-gray-600 hover:text-[#00603A] text-sm">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 text-lg font-semibold">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a 
                  href="https://facebook.com/papstore" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#00603A] text-sm"
                  onClick={() => handleSocialClick('facebook')}
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
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-8">
          <p className="text-gray-600 text-sm text-center">
            © {new Date().getFullYear()} PapStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 