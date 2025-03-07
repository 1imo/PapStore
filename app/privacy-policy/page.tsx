export default function PrivacyPolicy() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Privacy Policy
          </h2>
          <p className="mt-4 text-xl text-gray-700">
            How we protect and handle your data
          </p>
        </div>
        
        <div className="mt-12 space-y-8">
          <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>

          <p className="text-gray-700 leading-relaxed">
            At PapStore, we believe in being transparent about how we collect and use your data. 
            This privacy policy explains our practices regarding your personal information and how 
            we protect your privacy when you use our flooring services and website.
          </p>

          <p className="text-gray-700 leading-relaxed">
            When you engage with PapStore, we collect only the information necessary to provide 
            you with our flooring services. This typically includes your contact details, property 
            specifications, and any specific requirements for your flooring project. We use this 
            information solely for delivering our services, improving your experience, and maintaining 
            our high standards of customer service.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Your trust is fundamental to our business. We implement robust security measures to 
            protect your information and never share your personal data with third parties unless 
            it's essential for providing our services or required by law. We retain your information 
            only for as long as necessary to fulfill our services and meet our legal obligations.
          </p>

          <p className="text-gray-700 leading-relaxed">
            We respect your right to control your data. You can request access to your personal 
            information at any time, ask for corrections, or have it deleted from our records. 
            We're committed to responding to any such requests promptly and transparently.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Our marketing communications are always optional. While we'd love to keep you updated 
            about our latest services and offers, you can opt out at any time. We use cookies 
            and similar technologies on our website to enhance your browsing experience and analyze 
            site usage, always with your privacy in mind.
          </p>

          <p className="text-gray-700 leading-relaxed">
            If you have any questions about our privacy practices or would like to exercise your 
            data protection rights, please don't hesitate to contact our privacy team at 
            privacy@papstore.com. We're here to help and committed to protecting your privacy 
            while delivering exceptional flooring services.
          </p>
        </div>
      </div>
    </div>
  );
} 