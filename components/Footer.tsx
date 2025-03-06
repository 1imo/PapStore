'use client';

import Link from 'next/link';
import { ClientLoggingService } from '@/lib/ClientLoggingService';

export function Footer() {
  const handleSocialClick = async (platform: string) => {
    await ClientLoggingService.info('Social link clicked', {
      platform,
      source: 'footer'
    });
  };

  return (
    <footer className="bg-gray-950">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-white text-lg font-semibold">PapStore Flooring</h3>
            <p className="mt-4 text-gray-300 text-sm">
              Professional carpet and flooring solutions for your home or business. 
              Serving Greater Manchester and surrounding areas.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#inquiry" className="text-gray-300 hover:text-white text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a 
                  href="https://facebook.com/papstore" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white text-sm"
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
                  className="text-gray-300 hover:text-white text-sm"
                  onClick={() => handleSocialClick('instagram')}
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} PapStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 