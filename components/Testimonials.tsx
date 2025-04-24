import { StarIcon } from '@heroicons/react/20/solid';

const testimonials = [
  {
    id: 1,
    quote: "Excellent service. The team was professional, clean, and completed the job ahead of schedule.",
    author: "Sarah Johnson",
    role: "Homeowner",
    rating: 5,
    datePublished: "2024-01-15",
  },
  {
    id: 2,
    quote: "Very impressed with the quality of work. They helped me choose the perfect flooring for my style.",
    author: "Mike Thompson",
    role: "Property Developer",
    rating: 5,
    datePublished: "2024-02-01",
  },
  {
    id: 3,
    quote: "Outstanding attention to detail. The finished result exceeded our expectations.",
    author: "Emma Davis",
    role: "Interior Designer",
    rating: 5,
    datePublished: "2024-02-15",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "PapStore Carpets & Flooring",
  "review": testimonials.map(testimonial => ({
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": testimonial.rating,
      "bestRating": 5
    },
    "author": {
      "@type": "Person",
      "name": testimonial.author
    },
    "reviewBody": testimonial.quote,
    "datePublished": testimonial.datePublished
  })),
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": testimonials.length.toString(),
    "bestRating": "5",
    "worstRating": "1"
  }
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

export function Testimonials() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section 
        id="testimonials" 
        className="py-12 bg-white"
        aria-labelledby="testimonials-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center">
            <h2 
              id="testimonials-heading"
              className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
              itemProp="name"
            >
              What Our Customers Say
            </h2>
            <p 
              className="mt-4 max-w-2xl mx-auto text-xl text-gray-700"
              itemProp="description"
            >
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </header>

          <div 
            className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            itemScope 
            itemType="https://schema.org/Review"
          >
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                className="bg-white rounded-xl p-8 shadow-md border border-gray-200"
                itemProp="review"
              >
                <div 
                  className="flex items-center space-x-1"
                  itemProp="reviewRating" 
                  itemScope 
                  itemType="https://schema.org/Rating"
                >
                  <meta itemProp="ratingValue" content={testimonial.rating.toString()} />
                  <meta itemProp="bestRating" content="5" />
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon
                      key={`star-${testimonial.id}-${i}`}
                      className="h-5 w-5 text-amber-500"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote 
                  className="mt-4 text-lg text-gray-900 font-medium"
                  itemProp="reviewBody"
                >
                  "{testimonial.quote}"
                </blockquote>
                <footer className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-[#00603A] flex items-center justify-center">
                      <span className="text-white font-semibold text-sm" aria-hidden="true">
                        {getInitials(testimonial.author)}
                      </span>
                    </div>
                  </div>
                  <div 
                    className="ml-4"
                    itemProp="author" 
                    itemScope 
                    itemType="https://schema.org/Person"
                  >
                    <p 
                      className="text-base font-semibold text-gray-900"
                      itemProp="name"
                    >
                      {testimonial.author}
                    </p>
                    <p 
                      className="text-sm text-gray-700"
                      itemProp="jobTitle"
                    >
                      {testimonial.role}
                    </p>
                  </div>
                  <meta itemProp="datePublished" content={testimonial.datePublished} />
                </footer>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <a
            href="https://g.page/r/CULuyGeLREo_EBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-white bg-[#00603A] hover:bg-[#004e2f] transition-colors duration-200 shadow-md hover:shadow-lg"
            role="button"
            aria-label="Leave a Google Review"
          >
            Leave a Google Review
          </a>
        </div>
      </section>
    </>
  );
} 