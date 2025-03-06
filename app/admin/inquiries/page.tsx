'use client';

import { useEffect, useState } from 'react';
import { logError, logInfo } from '@/lib/LoggingService';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string | null;
  marketing: boolean;
  createdAt: string;
  responded: boolean;
  respondedAt: string | null;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    loadInquiries().then(() => {
      // Expand first row by default
      if (inquiries.length > 0) {
        setExpandedId(inquiries[0].id);
      }
    });
  }, [inquiries.length]);

  async function loadInquiries() {
    try {
      const response = await fetch('/api/admin/inquiries');
      const data = await response.json();
      setInquiries(data.inquiries);
    } catch (error) {
      await logError('Failed to load inquiries', { error });
    } finally {
      setLoading(false);
    }
  }

  async function markAsResponded(id: number) {
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responded: true }),
      });

      if (!response.ok) throw new Error('Failed to update inquiry');

      await logInfo('Inquiry marked as responded', { inquiryId: id });
      loadInquiries();
      setExpandedId(null);
    } catch (error) {
      await logError('Failed to mark inquiry as responded', { error });
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all inquiries from potential customers.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-xl border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-200"
          >
            Refresh
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="overflow-hidden shadow-sm rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Date
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Contact
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Service
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Message
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {inquiries.map((inquiry) => (
                <tr 
                  key={inquiry.id}
                  onClick={() => setExpandedId(expandedId === inquiry.id ? null : inquiry.id)}
                  className={`cursor-pointer transition-colors ${
                    expandedId === inquiry.id ? 'bg-gray-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </td>
                  <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                    {inquiry.name}
                  </td>
                  <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div>{inquiry.email}</div>
                    <div>{inquiry.phone}</div>
                  </td>
                  <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {inquiry.service || 'Not specified'}
                  </td>
                  <td className={`align-top px-3 py-4 text-sm text-gray-500 ${
                    expandedId === inquiry.id ? 'whitespace-pre-wrap' : 'truncate max-w-xs'
                  }`}>
                    {inquiry.message}
                  </td>
                  <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      inquiry.responded 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {inquiry.responded ? 'Responded' : 'Pending'}
                    </span>
                  </td>
                  <td className="align-top whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    {!inquiry.responded && (
                      <div className="pt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsResponded(inquiry.id);
                          }}
                          className="text-gray-900 hover:text-gray-700 transition-colors duration-200"
                        >
                          Mark as Responded
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 