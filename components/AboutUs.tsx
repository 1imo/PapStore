import Image from 'next/image';
import { Clock, Award, MapPin, Shield } from 'lucide-react';

const features = [
  {
    title: "Experience",
    description: "20+ years of professional flooring expertise",
    icon: Clock
  },
  {
    title: "Quality",
    description: "Premium materials and expert installation",
    icon: Award
  },
  {
    title: "Service Area",
    description: "Covering Surrey, London, and surrounding areas",
    icon: MapPin
  },
  {
    title: "Guarantee",
    description: "Satisfaction guaranteed on all work",
    icon: Shield
  }
];

export function AboutUs() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Family-Owned Excellence in Flooring
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              With over 20 years of experience in the flooring industry, our family-owned 
              business has been transforming homes and commercial spaces with quality 
              craftsmanship and exceptional service.
            </p>
            
            <div className="mt-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {features.map((feature) => (
                  <div 
                    key={feature.title}
                    className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                  >
                    <feature.icon className="h-6 w-6 text-[#00603A] mb-3" />
                    <h3 className="text-lg font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-gray-700">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 relative h-full w-full rounded-lg overflow-hidden shadow-xl hidden lg:block">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/5d727ad66b29cc0001f38cf4/1567788811067-B9G51LP1Q3VERT8L67JB/ZancorHomes.jpg"
              alt="Our team at work"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
} 