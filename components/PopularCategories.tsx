import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    name: 'Carpets',
    description: 'Carpets are our specialty. From plush to practical, we offer a wide range of styles and colors to transform your space.',
    image: '/carpet.avif',
    href: '/carpets'
  },
  {
    name: 'Engineered Wood',
    description: 'Experience the perfect blend of natural beauty and modern durability with our premium engineered wood flooring.',
    image: '/engineered-wood.avif',
    href: '/engineered-wood'
  },
  {
    name: 'LVT',
    description: 'Discover our luxury vinyl tiles - waterproof, stylish, and perfect for any room in your home.',
    image: '/lvt.avif',
    href: '/lvt'
  },
  {
    name: 'Laminate',
    description: 'Affordable elegance that doesn\'t compromise on style. Our laminate flooring offers the perfect balance of beauty and practicality.',
    image: '/laminate.avif',
    href: '/laminate'
  },
  {
    name: 'Vinyl',
    description: 'Durable, versatile, and stylish - our vinyl flooring solutions are designed to withstand the demands of modern living.',
    image: '/vinyl.avif',
    href: '/vinyl'
  }
];

export function PopularCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Popular Categories
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-700">
            Explore our most popular flooring options
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="bg-white"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 