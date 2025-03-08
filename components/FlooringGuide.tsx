'use client';

import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { smoothScrollToElement } from '@/lib/scrollUtils';

const flooringTypes = [
  {
    id: 'carpet',
    name: 'Carpet',
    types: [
      {
        name: 'Twist Pile',
        description: 'Durable and practical, perfect for high-traffic areas',
        bestFor: ['Family homes', 'Rental properties', 'Hallways', 'Stairs'],
        features: ['Hides footprints', 'Resilient surface', 'Long-lasting'],
        suitability: 'High traffic areas'
      },
      {
        name: 'Loop Pile',
        description: 'Hardwearing and contemporary, ideal for modern spaces',
        bestFor: ['Offices', 'Commercial spaces', 'High-traffic areas'],
        features: ['Robust', 'Contemporary look', 'Practical'],
        suitability: 'Commercial use'
      },
      {
        name: 'Saxony',
        description: 'Luxurious and elegant with a plush finish',
        bestFor: ['Bedrooms', 'Lounges', 'Formal living rooms'],
        features: ['Velvety finish', 'Supreme comfort', 'Luxury feel'],
        suitability: 'Low traffic areas'
      },
      {
        name: 'Wool',
        description: 'Natural and insulating premium choice',
        bestFor: ['Living rooms', 'Bedrooms', 'Executive spaces'],
        features: ['Naturally stain-resistant', 'Eco-friendly', 'Insulating'],
        suitability: 'Premium spaces'
      }
    ]
  },
  {
    id: 'engineered',
    name: 'Engineered Wood',
    types: [
      {
        name: 'Premium Oak',
        description: 'Classic oak with superior durability and timeless appeal',
        bestFor: ['Living rooms', 'Master bedrooms', 'Dining rooms'],
        features: ['Premium grade wood', 'Deep wood grain', 'Refinishing potential'],
        suitability: 'Luxury homes'
      },
      {
        name: 'Rustic Grade',
        description: 'Characterful wood with natural variations and knots',
        bestFor: ['Country homes', 'Holiday cottages', 'Feature rooms'],
        features: ['Natural character', 'Unique patterns', 'Warm appearance'],
        suitability: 'Character properties'
      },
      {
        name: 'Commercial Grade',
        description: 'Heavy-duty engineered wood for high-traffic areas',
        bestFor: ['Offices', 'Retail spaces', 'Restaurants'],
        features: ['Extra durable finish', 'Scratch resistant', 'Easy maintenance'],
        suitability: 'Commercial spaces'
      },
      {
        name: 'Contemporary',
        description: 'Modern finishes with enhanced stability',
        bestFor: ['Modern homes', 'Apartments', 'Open-plan spaces'],
        features: ['Modern colors', 'Wide planks', 'UV protected'],
        suitability: 'Modern interiors'
      }
    ]
  },
  {
    id: 'laminate',
    name: 'Laminate',
    types: [
      {
        name: 'Premium Laminate',
        description: 'High-end finish with enhanced wear layer',
        bestFor: ['Family homes', 'Busy households', 'Rental properties'],
        features: ['Extra thick wear layer', 'Realistic textures', 'Water resistant'],
        suitability: 'High traffic areas'
      },
      {
        name: 'Stone Effect',
        description: 'Realistic stone appearance with practical benefits',
        bestFor: ['Kitchens', 'Hallways', 'Conservatories'],
        features: ['Stone look', 'Easy clean', 'Warm underfoot'],
        suitability: 'Modern living'
      },
      {
        name: 'Wood Effect',
        description: 'Authentic wood appearance at an affordable price',
        bestFor: ['Living rooms', 'Bedrooms', 'Home offices'],
        features: ['Wood grain texture', 'Click-lock fitting', 'Scratch resistant'],
        suitability: 'Residential use'
      },
      {
        name: 'Commercial',
        description: 'Heavy-duty laminate for business environments',
        bestFor: ['Offices', 'Shops', 'Public spaces'],
        features: ['AC5 rating', 'Impact resistant', 'Long warranty'],
        suitability: 'Commercial spaces'
      }
    ]
  },
  {
    id: 'vinyl',
    name: 'Vinyl',
    types: [
      {
        name: 'Luxury Vinyl Tiles',
        description: 'Premium vinyl in tile format for ultimate flexibility',
        bestFor: ['Bathrooms', 'Kitchens', 'Utility rooms'],
        features: ['100% waterproof', 'Realistic designs', 'Easy replacement'],
        suitability: 'Wet areas'
      },
      {
        name: 'Sheet Vinyl',
        description: 'Continuous waterproof surface ideal for larger areas',
        bestFor: ['Commercial spaces', 'Healthcare', 'Education'],
        features: ['Seamless finish', 'Hygienic', 'Cost-effective'],
        suitability: 'Large spaces'
      },
      {
        name: 'Click Vinyl',
        description: 'Easy-install vinyl planks with built-in underlay',
        bestFor: ['DIY projects', 'Quick renovations', 'Rental properties'],
        features: ['Quick installation', 'Built-in underlay', 'Floating floor'],
        suitability: 'Easy installation'
      },
      {
        name: 'Acoustic Vinyl',
        description: 'Sound-reducing vinyl for multi-level properties',
        bestFor: ['Apartments', 'Upper floors', 'Music rooms'],
        features: ['Sound dampening', 'Comfort underfoot', 'Impact resistance'],
        suitability: 'Noise reduction'
      }
    ]
  }
];

export function FlooringGuide() {
  const [selectedType, setSelectedType] = useState(flooringTypes[0].id);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Flooring Guide
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-700">
            Find the perfect flooring solution for your space
          </p>
        </div>

        {/* Flooring Type Selector */}
        <div className="mt-12 -mx-4 sm:mx-0">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:flex sm:flex-wrap sm:justify-center sm:items-center sm:max-w-4xl sm:mx-auto">
            {flooringTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex-none snap-center px-6 py-3 rounded-xl font-medium text-lg transition-all duration-200 mr-3 sm:mr-2 sm:mb-2 ${
                  selectedType === type.id
                    ? 'bg-[#00603A] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Display */}
        <div className="mt-12 -mx-4 sm:mx-0">
          {flooringTypes.map((type) => (
            <div
              key={type.id}
              className={`${selectedType === type.id ? 'block' : 'hidden'}`}
            >
              <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-0 gap-4 pb-4 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4">
                {type.types.map((subType) => (
                  <div
                    key={subType.name}
                    className="flex-none w-[85%] snap-center sm:w-auto bg-white rounded-xl p-6 shadow-md border border-gray-200"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {subType.name}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {subType.description}
                    </p>
                    <div className="space-y-3">
                      <p className="font-semibold text-gray-900">Best For:</p>
                      <ul className="space-y-2">
                        {subType.bestFor.map((use) => (
                          <li key={use} className="flex items-center text-gray-700">
                            <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <a
            href="#inquiry"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-[#00603A] hover:bg-[#004e2f] transition-colors duration-200 shadow-md hover:shadow-lg"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollToElement('inquiry');
            }}
          >
            Get Expert Advice
          </a>
        </div>
      </div>
    </section>
  );
} 