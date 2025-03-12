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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "PapStore Carpets & Flooring",
  "image": "https://papstore.co.uk/Logo-01.png",
  "description": "Family-owned flooring business with over 20 years of experience in transforming homes and commercial spaces with quality craftsmanship and exceptional service.",
  "@id": "https://papstore.co.uk",
  "url": "https://papstore.co.uk",
  "telephone": "+447861172194",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "44-50 The Broadway",
    "addressLocality": "Southall",
    "addressRegion": "Middlesex",
    "postalCode": "UB1 1QB",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.5111,
    "longitude": -0.3800
  },
  "areaServed": [
    {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 51.5111,
        "longitude": -0.3800
      },
      "geoRadius": "30000"
    }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "16:00"
    }
  ],
  "sameAs": [
    "https://facebook.com/papstore",
    "https://instagram.com/papstore"
  ]
};

export function AboutUs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section 
        id="about" 
        className="py-16 bg-white"
        itemScope
        itemType="https://schema.org/AboutPage"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <h2 
                className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
                itemProp="headline"
              >
                Family-Owned Excellence in Flooring
              </h2>
              <p 
                className="mt-4 text-lg text-gray-700"
                itemProp="description"
              >
                With over 20 years of experience in the flooring industry, our family-owned 
                business has been transforming homes and commercial spaces with quality 
                craftsmanship and exceptional service.
              </p>
              
              <div className="mt-8">
                <div 
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                  itemScope
                  itemType="https://schema.org/ItemList"
                >
                  {features.map((feature) => (
                    <div 
                      key={feature.title}
                      className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                      itemScope
                      itemType="https://schema.org/BusinessFeature"
                      itemProp="itemListElement"
                    >
                      <feature.icon 
                        className="h-6 w-6 text-[#00603A] mb-3" 
                        aria-hidden="true"
                      />
                      <h3 
                        className="text-lg font-bold text-gray-900"
                        itemProp="name"
                      >
                        {feature.title}
                      </h3>
                      <p 
                        className="mt-2 text-gray-700"
                        itemProp="description"
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div 
              className="mt-12 lg:mt-0 relative h-full w-full rounded-lg overflow-hidden shadow-xl hidden lg:block"
              itemScope
              itemType="https://schema.org/ImageObject"
            >
              <Image
                src="https://images.squarespace-cdn.com/content/v1/5d727ad66b29cc0001f38cf4/1567788811067-B9G51LP1Q3VERT8L67JB/ZancorHomes.jpg"
                alt="Our expert flooring team at work installing premium flooring solutions"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                itemProp="contentUrl"
              />
              <meta itemProp="caption" content="PapStore's expert flooring installation team at work" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 