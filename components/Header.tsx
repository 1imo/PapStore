'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { logInfo } from '@/lib/LoggingService';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#inquiry' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = async (itemName: string, href: string) => {
    await logInfo('Navigation item clicked', {
      item: itemName,
      source: 'header'
    });

    // Add smooth scrolling for anchor links
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="bg-white border-b border-gray-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                Pap<span className="text-blue-600">Store</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => handleNavClick(item.name, item.href)}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="#inquiry"
              className="inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors"
              onClick={() => handleNavClick('Get Quote', '#inquiry')}
            >
              Get Quote
            </a>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
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
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Dark overlay */}
            <div 
              className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Menu panel */}
            <div className="fixed inset-y-0 right-0 w-screen bg-white shadow-xl">
              <div className="flex w-full items-center justify-between py-4 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
                <div className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900 tracking-tight">
                      Pap<span className="text-blue-600">Store</span>
                    </span>
                  </Link>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
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
                  >
                    {item.name}
                  </Link>
                ))}
                <a
                  href="#inquiry"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-white bg-gray-900 hover:bg-gray-800 mt-4"
                  onClick={() => {
                    handleNavClick('Get Quote', '#inquiry');
                    setMobileMenuOpen(false);
                  }}
                >
                  Get Quote
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 