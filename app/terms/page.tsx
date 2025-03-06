export default function Terms() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
      
      <div className="prose max-w-none">
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using our services, you agree to be bound by these Terms and Conditions.
        </p>

        <h2>2. Services</h2>
        <p>
          We provide flooring installation and related services. All services are subject to:
        </p>
        <ul>
          <li>Availability</li>
          <li>Accurate measurement and assessment</li>
          <li>Suitable installation conditions</li>
          <li>Agreement on final quote</li>
        </ul>

        <h2>3. Quotes and Pricing</h2>
        <p>
          All quotes are:
        </p>
        <ul>
          <li>Valid for 30 days</li>
          <li>Subject to site inspection</li>
          <li>Exclusive of unforeseen additional work</li>
        </ul>

        <h2>4. Warranties</h2>
        <p>
          Our workmanship is guaranteed for [X] years, subject to:
        </p>
        <ul>
          <li>Proper maintenance</li>
          <li>Normal wear and tear</li>
          <li>Manufacturer's specifications</li>
        </ul>

        <h2>5. Cancellation Policy</h2>
        <p>
          Cancellations must be made at least 48 hours before scheduled work.
          Deposits may be non-refundable.
        </p>

        <h2>6. Liability</h2>
        <p>
          Our liability is limited to the value of the services provided.
          We maintain appropriate insurance coverage.
        </p>

        <h2>7. Contact Information</h2>
        <p>
          For any questions regarding these terms, please contact us at:
        </p>
        <p>
          Email: info@papstore.com<br />
          Phone: [Your Phone Number]<br />
          Address: [Your Address]
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
} 