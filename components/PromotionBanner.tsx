'use client';

import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { logInfo } from '@/lib/LoggingService';
import Image from 'next/image';

const promotions = [
  {
    id: 1,
    title: 'Free Home Visit',
    description: 'Expert advice, precise measurements, and forever free digital floorplans for your home. Book your free consultation today.',
    subtext: 'No obligation, just expert guidance',
    gradient: 'from-[#00603A] to-[#004e2f]',
    link: '/book-visit',
  },
  {
    id: 2,
    title: '0% Finance Available',
    description: 'Transform your space now, pay later. Spread the cost of your new flooring over 12, 24, or 36 months with our interest-free finance options.',
    subtext: 'Subject to status. Terms and conditions apply',
    gradient: 'from-[#A37E2C] to-[#8B6B24]',
    link: '/finance',
  },
  {
    id: 3,
    title: 'Trade Discount',
    description: 'Special rates for trade customers. Access exclusive prices on premium flooring products and professional installation services.',
    subtext: 'Register now to unlock trade benefits',
    gradient: 'from-[#2C5AA3] to-[#1E3D6B]',
    link: '/trade',
  },
  {
    id: 4,
    title: 'Sample Service',
    description: 'Try before you buy. Order free samples of our premium flooring options and experience the quality in your own home.',
    subtext: 'Free delivery on all sample orders',
    gradient: 'from-[#6B2CA3] to-[#4B1E6B]',
    link: '/samples',
  }
];

export function PromotionBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setDirection('right');
        setCurrentSlide((prev) => (prev + 1) % promotions.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevSlide = () => {
    setDirection('left');
    setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length);
    setIsAutoPlaying(false);
  };

  const handleNextSlide = () => {
    setDirection('right');
    setCurrentSlide((prev) => (prev + 1) % promotions.length);
    setIsAutoPlaying(false);
  };

  const handleSlideClick = (index: number) => {
    setDirection(index > currentSlide ? 'right' : 'left');
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const getSlideStyle = (index: number) => {
    const totalSlides = promotions.length;
    
    // Calculate the next and previous indices with wrapping
    const nextIndex = (currentSlide + 1) % totalSlides;
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    
    // Only show current, next, and previous slides
    if (index !== currentSlide && index !== nextIndex && index !== prevIndex) {
      return 'translate-x-[200%]';
    }
    
    if (index === currentSlide) return 'translate-x-0';
    
    if (direction === 'right') {
      if (index === nextIndex) return 'translate-x-full';
      if (index === prevIndex) return '-translate-x-full';
    } else {
      if (index === prevIndex) return '-translate-x-full';
      if (index === nextIndex) return 'translate-x-full';
    }
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <section 
      className="w-full bg-white relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full relative group">
        <div className="relative z-10">
          {/* Main Carousel */}
          <div className="relative h-[400px] overflow-hidden">
            {promotions.map((promo, index) => (
              <div
                key={promo.id}
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${getSlideStyle(index)}`}
                style={{ zIndex: index === currentSlide ? 20 : 10 }}
              >
                <div className={`h-full w-full bg-gradient-to-r ${promo.gradient} relative overflow-hidden`}>
                  {/* Large, desaturated, overflowing favicon background */}
                  <div
                    className="absolute pointer-events-none select-none bg-none"
                    style={{
                      zIndex: 0,
                      width: '300%',
                      height: '300%',
                      right: '-25%',
                      top: '-50%',
                    }}
                  >
                    <Image
                      src="/favicon.png"
                      alt=""
                      fill
                      className="object-contain object-right"
                      style={{ filter: 'grayscale(100%) opacity(0.1)' }}
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent z-10" />
                  <div className="relative h-full flex items-center z-20">
                    <div className="w-full p-8 text-white">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                          <div className="max-w-2xl">
                            <h3 className="text-3xl font-bold mb-4">{promo.title}</h3>
                            <p className="text-lg mb-2">{promo.description}</p>
                            <p className="text-sm text-white/80 mb-6">{promo.subtext}</p>
                            <a
                              href={promo.link}
                              className="inline-block bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                              onClick={() => logInfo('Promotion clicked', { promotion: promo.title })}
                            >
                              Learn More
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-gray-800 transition-colors z-30 opacity-0 group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full text-gray-800 transition-colors z-30 opacity-0 group-hover:opacity-100"
              aria-label="Next slide"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {promotions.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideClick(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 