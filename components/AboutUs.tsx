import Image from 'next/image';

const features = [
  {
    title: "Experience",
    description: "20+ years of professional flooring expertise"
  },
  {
    title: "Quality",
    description: "Premium materials and expert installation"
  },
  {
    title: "Service Area",
    description: "Covering all of Greater Manchester"
  },
  {
    title: "Guarantee",
    description: "Satisfaction guaranteed on all work"
  }
];

export function AboutUs() {
  return (
    <section id="about" className="py-16 bg-gray-50">
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

          <div className="mt-12 lg:mt-0">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://www.floorstyles.co.uk/wp-content/uploads/2023/06/Likewise-Rugs-Matting-Liszt-Eleanor-Blue-Tile-Effect-Vinyl-Flooring85R840FRSP.webp"
                alt="Our team at work"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 