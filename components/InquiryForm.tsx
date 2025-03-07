'use client';

import { useState } from 'react';
import { logInfo, logError } from '@/lib/LoggingService';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
  marketing: boolean;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
  service: '',
  marketing: false,
};

const contactInfo = {
  email: "enquiries@papstore.com",
  phone: "07301 503451",
  address: "44-50 The Broadway, Southall, Middlesex, UB1 1QB",
  hours: {
    weekday: "8:00 AM - 6:00 PM",
    saturday: "9:00 AM - 4:00 PM",
    sunday: "Closed"
  }
};

export function InquiryForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit inquiry');

      await logInfo('Inquiry submitted', { email: formData.email });
      setStatus('success');
      setFormData(initialFormData);
    } catch (error) {
      await logError('Failed to submit inquiry', { error });
      setStatus('error');
    }
  };

  return (
    <section id="inquiry" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-700">
            Request your free quote or reach out to us directly
          </p>
        </div>

        <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-start">
          {/* Form */}
          <div className="relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-gray-900 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-900 focus:ring-1 focus:ring-[#00603A] focus:border-[#00603A] transition-colors"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-base font-medium text-gray-900 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-900 focus:ring-1 focus:ring-[#00603A] focus:border-[#00603A] transition-colors"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-base font-medium text-gray-900 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-900 focus:ring-1 focus:ring-[#00603A] focus:border-[#00603A] transition-colors"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-base font-medium text-gray-900 mb-1">
                    Service Interested In <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-900 focus:ring-1 focus:ring-[#00603A] focus:border-[#00603A] transition-colors appearance-none"
                    >
                      <option value="">Select a service</option>
                      <option value="hardwood">Hardwood Flooring</option>
                      <option value="laminate">Laminate Flooring</option>
                      <option value="vinyl">Vinyl Flooring</option>
                      <option value="carpet">Carpet Installation</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                      <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-base font-medium text-gray-900 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={10}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-900 focus:ring-1 focus:ring-[#00603A] focus:border-[#00603A] transition-colors resize-none"
                  aria-required="true"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="marketing"
                  name="marketing"
                  checked={formData.marketing}
                  onChange={(e) => setFormData(prev => ({ ...prev, marketing: e.target.checked }))}
                  className="h-5 w-5 rounded border-gray-100 text-[#00603A] focus:ring-[#00603A]"
                />
                <label htmlFor="marketing" className="ml-3 text-base text-gray-700">
                  I agree to receive marketing communications
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full px-8 py-4 text-lg font-semibold rounded-xl text-white bg-[#00603A] hover:bg-[#004e2f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00603A] disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                </button>
              </div>

              {status === 'success' && (
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-green-800 text-center font-medium" role="alert">
                    Thank you! We'll be in touch soon.
                  </p>
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-red-800 text-center font-medium" role="alert">
                    Something went wrong. Please try again.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information Card */}
          <div className="bg-[#00603A] rounded-2xl shadow-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">
              Contact Information
            </h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="font-semibold text-lg mb-2">Opening Hours</h4>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>{contactInfo.hours.weekday}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Saturday</span>
                    <span>{contactInfo.hours.saturday}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sunday</span>
                    <span>{contactInfo.hours.sunday}</span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">Get in Touch</h4>
                <div className="space-y-4">
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center space-x-3 hover:text-white/80 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{contactInfo.phone}</span>
                  </a>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center space-x-3 hover:text-white/80 transition-colors"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{contactInfo.email}</span>
                  </a>
                  <a 
                    href="https://maps.google.com/?q=44-50+The+Broadway,+Southall,+Middlesex,+UB1+1QB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 hover:text-white/80 transition-colors"
                  >
                    <svg className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{contactInfo.address}</span>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">Service Areas</h4>
                <div className="space-y-2">
                  <p className="text-white/90">
                    <span className="font-medium">Primary Areas:</span> Guildford, Woking, Byfleet, 
                    Dorking, and Addlestone
                  </p>
                  <p className="text-white/90">
                    <span className="font-medium">Additional Coverage:</span> Central London 
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-white/90 text-sm">
                Visit our showroom in Southall or contact us for a free consultation 
                and quote. We provide professional flooring services across Surrey and London.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 