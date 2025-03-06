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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Get Your Free Quote
          </h2>
          <p className="mt-4 text-xl text-gray-700">
            Fill out the form below and we'll get back to you within 24 hours
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-base font-medium text-gray-900 mb-1">
                Name <span className="text-gray-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors duration-200"
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-900 mb-1">
                Email <span className="text-gray-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors duration-200"
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-base font-medium text-gray-900 mb-1">
                Phone <span className="text-gray-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors duration-200"
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-base font-medium text-gray-900 mb-1">
                Service Interested In
              </label>
              <div className="relative">
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                  className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors duration-200 appearance-none"
                  style={{ WebkitAppearance: 'none' }}
                >
                  <option value="" disabled>Select a service</option>
                  <option value="hardwood">Hardwood Flooring</option>
                  <option value="laminate">Laminate Flooring</option>
                  <option value="vinyl">Vinyl Flooring</option>
                  <option value="carpet">Carpet Installation</option>
                  <option value="other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                  <svg 
                    className="h-5 w-5 text-gray-500" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-base font-medium text-gray-900 mb-1">
                Message <span className="text-gray-600">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors duration-200 resize-y"
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
                className="h-5 w-5 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-200"
              />
              <label htmlFor="marketing" className="ml-3 block text-base text-gray-700">
                I agree to receive marketing communications
              </label>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-live="polite"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
            </button>
          </div>

          {status === 'success' && (
            <p className="mt-4 text-green-600 text-center font-medium" role="alert">
              Thank you! We'll be in touch soon.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-red-600 text-center font-medium" role="alert">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
} 