'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { logInfo } from '@/lib/LoggingService';
import Image from 'next/image';
import { smoothScrollToElement } from '@/lib/scrollUtils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '#services' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Reviews', href: '#testimonials' },
  { name: 'Guide', href: '#flooring-guide' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#inquiry' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = async (itemName: string, href: string) => {
    smoothScrollToElement(href);
  };

  return (
    <>
      <div className="h-[72px]" /> {/* Placeholder to maintain spacing */}
      <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-40">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex w-full items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center" onClick={() => handleNavClick('', '/')}>
                <Image
                  src="/Logo-01.png"
                  alt="PapStore Logo"
                  width={150}
                  height={40}
                  priority
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
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="#inquiry"
                className="inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#00603A] hover:bg-[#004e2f] transition-colors"
                onClick={() => handleNavClick('Get Quote', '#inquiry')}
              >
                Get Quote
              </a>
            </div>
            <div className="flex md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-[#00603A] hover:bg-gray-100"
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
                      <Image
                        src="/Logo-01.png"
                        alt="PapStore Logo"
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
                    className="block rounded-lg px-3 py-2 text-base font-medium text-white bg-[#00603A] hover:bg-[#004e2f] mt-4"
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
    </>
  );
} 