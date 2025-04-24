'use client';

import { useState, useEffect } from 'react';
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

const flooringTypes = [
  { 
    name: 'Carpets', 
    href: '/carpets', 
    ariaLabel: 'Browse our carpet collection',
    description: 'Luxury carpets for every room',
    columns: {
      colors: [
        { name: 'Cream', hex: '#F5F5DC' },
        { name: 'Slate', hex: '#708090' },
        { name: 'Navy', hex: '#000080' },
        { name: 'Sage', hex: '#9CAF88' },
        { name: 'Burgundy', hex: '#800020' },
        { name: '+256 more', hex: '#F5F5F5', isMore: true }
      ],
      guides: ['Carpet Buying Guide', 'Installation Guide', 'Care Guide'],
      features: ['Stain Resistant', 'Soft Underfoot', 'Sound Absorbing'],
      designs: ['Modern', 'Traditional', 'Contemporary', 'Patterned']
    }
  },
  { 
    name: 'Vinyl', 
    href: '/vinyl', 
    ariaLabel: 'Explore vinyl flooring options',
    description: 'Durable & waterproof solutions',
    columns: {
      colors: [
        { name: 'Oak', hex: '#D2B48C' },
        { name: 'Slate', hex: '#708090' },
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Charcoal', hex: '#36454F' },
        { name: 'Beige', hex: '#F5F5DC' },
        { name: '+256 more', hex: '#F5F5F5', isMore: true }
      ],
      guides: ['Vinyl Installation', 'Maintenance Guide', 'Waterproof Guide'],
      features: ['100% Waterproof', 'Easy Clean', 'Durable'],
      designs: ['Plank', 'Tile', 'Sheet', 'Luxury Vinyl']
    }
  },
  { 
    name: 'Laminate', 
    href: '/laminate', 
    ariaLabel: 'View laminate flooring solutions',
    description: 'Affordable & stylish',
    columns: {
      colors: [
        { name: 'Golden Oak', hex: '#D2B48C' },
        { name: 'Walnut', hex: '#5C4033' },
        { name: 'Maple', hex: '#FFE4B5' },
        { name: 'Cherry', hex: '#D2042D' },
        { name: 'Mahogany', hex: '#C04000' },
        { name: '+256 more', hex: '#F5F5F5', isMore: true }
      ],
      guides: ['Laminate Guide', 'Installation Tips', 'Care Guide'],
      features: ['Scratch Resistant', 'Easy Install', 'Budget Friendly'],
      designs: ['Wood Look', 'Stone Look', 'Modern', 'Classic']
    }
  },
  { 
    name: 'Luxury Vinyl Tiles', 
    href: '/lvt', 
    ariaLabel: 'Discover luxury vinyl tile options',
    description: 'Premium waterproof flooring',
    columns: {
      colors: [
        { name: 'Natural Oak', hex: '#D2B48C' },
        { name: 'Carrara', hex: '#F5F5F5' },
        { name: 'Concrete', hex: '#808080' },
        { name: 'Marble', hex: '#F5F5F5' },
        { name: 'Slate', hex: '#708090' },
        { name: '+256 more', hex: '#F5F5F5', isMore: true }
      ],
      guides: ['LVT Guide', 'Installation Guide', 'Care Guide'],
      features: ['Waterproof', 'Wear Layer', 'Sound Absorbing'],
      designs: ['Herringbone', 'Plank', 'Tile', 'Mosaic']
    }
  },
  { 
    name: 'Engineered Wood', 
    href: '/engineered-wood', 
    ariaLabel: 'Browse engineered wood flooring',
    description: 'Timeless elegance & durability',
    columns: {
      colors: [
        { name: 'Light Oak', hex: '#D2B48C' },
        { name: 'Dark Oak', hex: '#5C4033' },
        { name: 'Walnut', hex: '#8B4513' },
        { name: 'Mahogany', hex: '#C04000' },
        { name: 'Teak', hex: '#B8860B' },
        { name: '+256 more', hex: '#F5F5F5', isMore: true }
      ],
      guides: ['Wood Guide', 'Installation Guide', 'Care Guide'],
      features: ['Stable', 'Refinishable', 'Premium Quality'],
      designs: ['Herringbone', 'Chevron', 'Plank', 'Parquet']
    }
  },
];

const saleItems = {
  name: 'Sale',
  href: '/sale',
  ariaLabel: 'View our current sales and offers',
  description: 'Special offers and discounts',
  columns: {
    categories: ['Carpets', 'Vinyl', 'Laminate', 'LVT', 'Engineered Wood'],
    offers: ['Clearance', 'End of Line', 'Seasonal Deals', 'Bulk Buy'],
    services: ['Free Installation', 'Free Underlay', 'Free Removal'],
    promotions: ['Trade Discounts', 'Student Discounts', 'Referral Rewards']
  }
};

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFlooringType, setActiveFlooringType] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = async (itemName: string, href: string) => {
    await logInfo('Navigation clicked', { item: itemName });
    smoothScrollToElement(href);
  };

  const handleMouseEnter = (type: string) => {
    setActiveFlooringType(type);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
    setActiveFlooringType(null);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Top CTA Bar - Awareness Stage */}
      <div className="bg-[#00603A] text-white py-2 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <Link 
                href="/finder"
                className="text-sm hover:text-gray-200 transition-colors flex items-center group"
                aria-label="Take our flooring quiz to find your perfect match"
              >
                <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="group-hover:underline">Take Our Flooring Quiz</span>
              </Link>
              <Link 
                href="#samples"
                className="text-sm hover:text-gray-200 transition-colors flex items-center group"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToElement('samples');
                }}
                aria-label="Request free flooring samples"
              >
                <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="group-hover:underline">Get Free Samples</span>
              </Link>
              <Link 
                href="#inquiry"
                className="text-sm hover:text-gray-200 transition-colors flex items-center group"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToElement('inquiry');
                }}
                aria-label="Get a free flooring quote"
              >
                <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="group-hover:underline">Get a Free Quote</span>
              </Link>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <a 
                href="tel:+447861172194"
                className="text-sm hover:text-gray-200 transition-colors flex items-center group"
                aria-label="Call us at +44 7861 172194"
              >
                <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="group-hover:underline">+44 7861 172194</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Consideration Stage */}
      <header 
        className={`bg-white border-b border-gray-100 fixed top-[36px] left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled ? 'shadow-md' : ''
        }`} 
        role="banner"
      >
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
                className="flex items-center group" 
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
                  className="group-hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-gray-600 hover:text-[#00603A] transition-colors group"
                  onClick={() => handleNavClick(item.name, item.href)}
                  aria-label={item.ariaLabel}
                  itemProp="url"
                >
                  <span itemProp="name" className="group-hover:underline">{item.name}</span>
                </Link>
              ))}
              <a
                href="#inquiry"
                className="inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#00603A] hover:bg-[#004e2f] transition-all duration-200 hover:shadow-lg"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToElement('inquiry');
                }}
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
        </nav>

        {/* Flooring Types Bar - Decision Stage */}
        <div 
          className="bg-gray-50 border-t border-gray-100 relative"
          role="navigation"
          aria-label="Flooring types"
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-6 gap-0 py-3">
              {flooringTypes.map((type, index) => (
                <div
                  key={type.name}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(type.name)}
                >
                  {index === 0 && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-4 bg-gray-300" />
                  )}
                  <Link
                    href={type.href}
                    className="text-sm font-medium text-gray-600 hover:text-[#00603A] transition-colors flex items-center justify-center"
                    aria-label={type.ariaLabel}
                  >
                    {type.name}
                  </Link>
                  {index < flooringTypes.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-gray-300" />
                  )}
                </div>
              ))}
              {/* Sale Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => handleMouseEnter('Sale')}
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-4 bg-gray-300" />
                <Link
                  href={saleItems.href}
                  className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors flex items-center justify-center"
                  aria-label={saleItems.ariaLabel}
                >
                  {saleItems.name}
                </Link>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-gray-300" />
              </div>
            </div>
          </div>

          {/* Dropdown Menus Container */}
          <div 
            className={`absolute left-0 right-0 top-full w-full bg-white shadow-lg transition-opacity duration-200 ${
              isDropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            role="menu"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Flooring Type Dropdowns */}
            {flooringTypes.map((type) => (
              <div
                key={type.name}
                className={`w-full ${activeFlooringType === type.name ? 'block' : 'hidden'}`}
                role="menu"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-4 gap-8">
                  <div className="px-0">
                    <h3 className="font-semibold text-gray-900 mb-4">Colours</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {type.columns.colors.map((color) => (
                        <div key={color.name} className="flex flex-col items-center">
                          <div 
                            className="w-full aspect-square rounded-lg"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-sm text-gray-600 mt-2">{color.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
                    <ul className="space-y-2">
                      {type.columns.features.map((feature) => (
                        <li key={feature} className="text-gray-600">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Designs</h3>
                    <ul className="space-y-2">
                      {type.columns.designs.map((design) => (
                        <li key={design}>
                          <a href={`${type.href}?design=${design.toLowerCase()}`} className="text-gray-600 hover:text-[#00603A]">
                            {design}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Guides</h3>
                    <ul className="space-y-2">
                      {type.columns.guides.map((guide) => (
                        <li key={guide}>
                          <a href={`${type.href}/guides/${guide.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-[#00603A]">
                            {guide}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {/* Sale Dropdown */}
            <div
              className={`w-full ${activeFlooringType === 'Sale' ? 'block' : 'hidden'}`}
              role="menu"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-4 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {saleItems.columns.categories.map((category) => (
                      <li key={category}>
                        <a href={`/sale/${category.toLowerCase()}`} className="text-gray-600 hover:text-[#00603A]">
                          {category}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Offers</h3>
                  <ul className="space-y-2">
                    {saleItems.columns.offers.map((offer) => (
                      <li key={offer}>
                        <a href={`/sale/${offer.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-[#00603A]">
                          {offer}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Services</h3>
                  <ul className="space-y-2">
                    {saleItems.columns.services.map((service) => (
                      <li key={service} className="text-gray-600">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Promotions</h3>
                  <ul className="space-y-2">
                    {saleItems.columns.promotions.map((promo) => (
                      <li key={promo}>
                        <a href={`/sale/${promo.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-[#00603A]">
                          {promo}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for main header */}
      <div className="h-[120px]" aria-hidden="true" />

      {/* Mobile menu - Optimized for conversion */}
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
            className="fixed inset-y-0 right-0 w-screen bg-white shadow-xl overflow-y-auto"
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

            {/* Quick CTAs */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="flex flex-col space-y-2">
                <a
                  href="tel:+447861172194"
                  className="flex items-center justify-center px-4 py-2 bg-[#00603A] text-white rounded-lg hover:bg-[#004e2f] transition-colors"
                  aria-label="Call us at +44 7861 172194"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
                <Link
                  href="/finder"
                  className="flex items-center justify-center px-4 py-2 bg-white border-2 border-[#00603A] text-[#00603A] rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Take our flooring quiz"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Take Quiz
                </Link>
              </div>
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
              <div className="pt-4 border-t border-gray-100">
                <h3 className="px-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Flooring Types
                </h3>
                <div className="mt-2 space-y-1">
                  {flooringTypes.map((type) => (
                    <Link
                      key={type.name}
                      href={type.href}
                      className="block rounded-lg px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                      role="menuitem"
                      aria-label={type.ariaLabel}
                    >
                      <div className="flex items-center justify-between">
                        <span>{type.name}</span>
                        <span className="text-sm text-gray-500">{type.description}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <a
                  href="#inquiry"
                  className="block w-full text-center rounded-lg px-3 py-2 text-base font-medium text-white bg-[#00603A] hover:bg-[#004e2f]"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToElement('inquiry');
                    setMobileMenuOpen(false);
                  }}
                  role="menuitem"
                  aria-label="Request a free quote"
                >
                  Get Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 