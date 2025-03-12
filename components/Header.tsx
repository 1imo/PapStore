'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { logInfo } from '@/lib/LoggingService';
import Image from 'next/image';
import { smoothScrollToElement } from '@/lib/scrollUtils';

const navigation = [
  { name: 'Home', href: '/', ariaLabel: 'Return to homepage' },
  { name: 'Services', href: '#services', ariaLabel: 'View our flooring services' },
  { name: 'How It Works', href: '#how-it-works', ariaLabel: 'Learn how our service works' },
  { name: 'Reviews', href: '#testimonials', ariaLabel: 'Read customer testimonials' },
  { name: 'Guide', href: '#flooring-guide', ariaLabel: 'Read our flooring guide' },
  { name: 'About', href: '#about', ariaLabel: 'Learn about our company' },
  { name: 'Contact', href: '#inquiry', ariaLabel: 'Contact us for a quote' },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "name": "Main Navigation",
  "hasPart": navigation.map(item => ({
    "@type": "SiteNavigationElement",
    "name": item.name,
    "url": `https://papstore.co.uk${item.href}`
  }))
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = async (itemName: string, href: string) => {
    await logInfo('Navigation clicked', { item: itemName });
    smoothScrollToElement(href);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="h-[72px]" aria-hidden="true" /> {/* Placeholder to maintain spacing */}
      <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-40" role="banner">
        <nav 
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" 
          aria-label="Main navigation"
          itemScope
          itemType="https://schema.org/SiteNavigationElement"
        >
          <div className="flex w-full items-center justify-between py-4">
            <div className="flex items-center">
              <Link 
                href="/" 
                className="flex items-center" 
                onClick={() => handleNavClick('Home', '/')}
                aria-label="PapStore - Return to homepage"
                itemProp="url"
              >
                <Image
                  src="/Logo-01.png"
                  alt="PapStore Carpets & Flooring"
                  width={150}
                  height={40}
                  priority
                  itemProp="image"
                />
              </Link>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => handleNavClick(item.name, item.href)}
                  aria-label={item.ariaLabel}
                  itemProp="url"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              ))}
              <a
                href="#inquiry"
                className="inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#00603A] hover:bg-[#004e2f] transition-colors"
                onClick={() => handleNavClick('Get Quote', '#inquiry')}
                aria-label="Request a free quote"
                role="button"
                itemProp="potentialAction"
                itemScope
                itemType="https://schema.org/QuoteAction"
              >
                <span itemProp="name">Get Quote</span>
              </a>
            </div>
            <div className="flex md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-[#00603A] hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div 
              className="fixed inset-0 z-50 md:hidden"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              {/* Dark overlay */}
              <div 
                className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
                aria-hidden="true"
                onClick={() => setMobileMenuOpen(false)}
              />
              {/* Menu panel */}
              <div 
                className="fixed inset-y-0 right-0 w-screen bg-white shadow-xl"
                role="menu"
              >
                <div className="flex w-full items-center justify-between py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
                  <div className="flex items-center">
                    <Link 
                      href="/" 
                      className="flex items-center"
                      onClick={() => {
                        handleNavClick('Home', '/');
                        setMobileMenuOpen(false);
                      }}
                      aria-label="PapStore - Return to homepage"
                    >
                      <Image
                        src="/Logo-01.png"
                        alt="PapStore Carpets & Flooring"
                        width={150}
                        height={40}
                        priority
                      />
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-[#00603A] hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      onClick={() => {
                        handleNavClick(item.name, item.href);
                        setMobileMenuOpen(false);
                      }}
                      aria-label={item.ariaLabel}
                      role="menuitem"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <a
                    href="#inquiry"
                    className="block rounded-lg px-3 py-2 text-base font-medium text-white bg-[#00603A] hover:bg-[#004e2f] mt-4"
                    onClick={() => {
                      handleNavClick('Get Quote', '#inquiry');
                      setMobileMenuOpen(false);
                    }}
                    aria-label="Request a free quote"
                    role="menuitem"
                  >
                    Get Quote
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
} 