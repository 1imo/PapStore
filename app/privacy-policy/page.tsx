export default function PrivacyPolicy() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-black mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none space-y-8 text-black [&_h2]:text-black [&_p]:text-black [&_li]:text-black">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul>
            <li>Name and contact information</li>
            <li>Inquiry details and preferences</li>
            <li>Marketing preferences</li>
            <li>Communication history</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Respond to your inquiries</li>
            <li>Send marketing communications (with consent)</li>
            <li>Analyze and improve our website</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your information with:
          </p>
          <ul>
            <li>Service providers who assist in our operations</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h2>4. Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: privacy@papstore.com<br />
            Phone: [Your Phone Number]<br />
            Address: [Your Address]
          </p>

          <h2>6. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last revised" date.
          </p>

          <p className="text-sm text-gray-500 mt-12 pt-4 border-t">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
} 