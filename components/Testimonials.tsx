import { StarIcon } from '@heroicons/react/20/solid';

const testimonials = [
  {
    id: 1,
    quote: "Excellent service. The team was professional, clean, and completed the job ahead of schedule.",
    author: "Sarah Johnson",
    role: "Homeowner",
    rating: 5,
  },
  {
    id: 2,
    quote: "Very impressed with the quality of work. They helped me choose the perfect flooring for my style.",
    author: "Mike Thompson",
    role: "Property Developer",
    rating: 5,
  },
  {
    id: 3,
    quote: "Outstanding attention to detail. The finished result exceeded our expectations.",
    author: "Emma Davis",
    role: "Interior Designer",
    rating: 5,
  },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-700">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-8 shadow-md border border-gray-200"
            >
              <div className="flex items-center space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon
                    key={`star-${testimonial.id}-${i}`}
                    className="h-5 w-5 text-amber-500"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-4 text-lg text-gray-900 font-medium">
                "{testimonial.quote}"
              </p>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-[#00603A] flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {getInitials(testimonial.author)}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-base font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-700">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 