export default function Terms() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Terms and Conditions
          </h2>
          <p className="mt-4 text-xl text-gray-700">
            Our commitment to quality and service
          </p>
        </div>
        
        <div className="mt-12 space-y-8">
          <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>

          <p className="text-gray-700 leading-relaxed">
            Welcome to PapStore, Manchester's trusted flooring specialists. These terms and conditions 
            outline the rules and regulations for using our services. By engaging with PapStore, 
            you accept these terms in full. Please read them carefully before proceeding with any 
            flooring project.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Our commitment to quality begins with our service agreement. When you choose PapStore, 
            you're selecting a professional team dedicated to excellence in flooring installation. 
            We provide detailed quotes valid for 30 days, and while we strive to maintain absolute 
            accuracy, final pricing may adjust based on site conditions discovered during inspection. 
            We require a 25% deposit to secure your installation date, with the balance due upon 
            satisfactory completion.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Every installation comes with our comprehensive 12-month workmanship warranty. This 
            warranty covers our installation work, ensuring your peace of mind. However, it's 
            important to note that this warranty requires proper maintenance and adherence to 
            manufacturer guidelines. Normal wear and tear is expected, and any unauthorized 
            modifications may void the warranty.
          </p>

          <p className="text-gray-700 leading-relaxed">
            We understand that plans can change. Our cancellation policy requires 48 hours' notice 
            for appointment changes. Deposits become non-refundable within 7 days of scheduled 
            installation, reflecting our commitment to resource allocation and scheduling. We're 
            happy to reschedule when possible, though fees may apply for late changes.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Your satisfaction is our priority. We maintain high standards of professionalism, 
            from our initial consultation through to project completion. Our team follows strict 
            safety protocols and maintains necessary insurance coverage. We respect your property 
            and ensure thorough cleanup after installation.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Communication is key to our success. We pledge to keep you informed throughout your 
            project, addressing any concerns promptly. Our team is available during business hours 
            to answer questions and provide support. We believe in building lasting relationships 
            with our clients through transparency and exceptional service.
          </p>
        </div>
      </div>
    </div>
  );
} 