import { 
  PhoneIcon, 
  UserIcon as RulerIcon, 
  WrenchScrewdriverIcon 
} from '@heroicons/react/24/outline';

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

export function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-700">
            Our simple three-step process to transform your space
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.name}
                className="relative pt-4 px-4 md:pt-0 md:px-0"
              >
                {/* Step number badge */}
                <div className="absolute top-0 left-0 md:-top-4 md:-left-4 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold z-3">
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
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gray-300 -translate-y-1/2 transform" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#inquiry"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
} 