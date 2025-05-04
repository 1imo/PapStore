import Link from 'next/link';

const categories = [
  {
    name: 'Carpets',
    description: 'Carpets are our specialty. From plush to practical, we offer a wide range of styles and colors to transform your space.',
    href: '/carpets'
  },
  {
    name: 'Engineered Wood',
    description: 'Experience the perfect blend of natural beauty and modern durability with our premium engineered wood flooring.',
    href: '/engineered-wood'
  },
  {
    name: 'LVT',
    description: 'Discover our luxury vinyl tiles - waterproof, stylish, and perfect for any room in your home.',
    href: '/lvt'
  },
  {
    name: 'Laminate',
    description: 'Affordable elegance that doesn\'t compromise on style. Our laminate flooring offers the perfect balance of beauty and practicality.',
    href: '/laminate'
  },
  {
    name: 'Vinyl',
    description: 'Durable, versatile, and stylish - our vinyl flooring solutions are designed to withstand the demands of modern living.',
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

        <div className="mt-12 -mx-4 sm:mx-0">
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-0 sm:px-0 gap-4 pb-4 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={category.href}
                className={`flex-none w-[85%] snap-center sm:w-auto bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-2 hover:shadow-lg transition-shadow duration-200 ${
                  index === 0 ? 'ml-4' : ''
                } ${
                  index === categories.length - 1 ? 'mr-4' : ''
                }`}
                style={index === categories.length - 1 ? { marginRight: '1rem' } : undefined}
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{category.name}</h3>
                  <p className="text-gray-700">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 