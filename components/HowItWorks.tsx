'use client';

import { 
  PhoneIcon, 
  UserIcon as RulerIcon, 
  WrenchScrewdriverIcon 
} from '@heroicons/react/24/outline';
import { smoothScrollToElement } from '@/lib/scrollUtils';

const steps = [
  {
    name: 'Free Consultation',
    description: 'Schedule a free consultation to discuss your flooring needs and get expert advice.',
    icon: PhoneIcon,
  },
  {
    name: 'Measurement & Quote',
    description: "We'll visit your property to take accurate measurements and provide a detailed quote.",
    icon: RulerIcon,
  },
  {
    name: 'Professional Installation',
    description: 'Our experienced team will install your new flooring with ultimate precision and care.',
    icon: WrenchScrewdriverIcon,
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get New Flooring Installed",
  "description": "Professional flooring installation process in three simple steps",
  "step": steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.description
  })),
  "totalTime": "PT2H",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "GBP",
    "value": "Free consultation"
  }
};

export function HowItWorks() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section 
        className="py-16 bg-white" 
        id="how-it-works"
        itemScope
        itemType="https://schema.org/HowTo"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center">
            <h2 
              className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
              itemProp="name"
            >
              How It Works
            </h2>
            <p 
              className="mt-4 max-w-2xl mx-auto text-xl text-gray-700"
              itemProp="description"
            >
              Our simple three-step process to transform your space
            </p>
          </header>

          <div className="mt-16">
            <div 
              className="grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-3"
              role="list"
              aria-label="Installation process steps"
            >
              {steps.map((step, index) => (
                <div
                  key={step.name}
                  className="relative pt-4 px-4 md:pt-0 md:px-0"
                  itemProp="step"
                  itemScope
                  itemType="https://schema.org/HowToStep"
                  role="listitem"
                >
                  <meta itemProp="position" content={`${index + 1}`} />
                  
                  {/* Step number badge */}
                  <div 
                    className="absolute top-0 left-0 md:-top-4 md:-left-4 w-8 h-8 bg-[#00603A] text-white rounded-full flex items-center justify-center font-bold z-3"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </div>

                  {/* Icon and content container */}
                  <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 relative z-2">
                    <div className="flex items-center justify-center mb-6">
                      <div className="p-4 bg-gray-100 rounded-full">
                        <step.icon 
                          className="h-8 w-8 text-gray-900" 
                          aria-hidden="true" 
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 
                        className="text-xl font-bold text-gray-900 mb-3"
                        itemProp="name"
                      >
                        {step.name}
                      </h3>
                      <p 
                        className="text-gray-700 leading-relaxed"
                        itemProp="text"
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div 
                      className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gray-300 -translate-y-1/2 transform"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="#inquiry"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-[#00603A] hover:bg-[#004e2f] transition-colors duration-200 shadow-md hover:shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollToElement('inquiry');
              }}
              role="button"
              aria-label="Start your flooring project with a free consultation"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </section>
    </>
  );
} 