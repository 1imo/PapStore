'use client';

import { useEffect, useState } from 'react';
import { logError, logInfo } from '@/lib/LoggingService';

interface Subscriber {
  id: number;
  email: string;
  name: string | null;
  createdAt: string;
  active: boolean;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadSubscribers();
  }, [currentPage]);

  async function loadSubscribers() {
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', itemsPerPage.toString());

      const response = await fetch(`/api/admin/subscribers?${params}`);
      const data = await response.json();
      setSubscribers(data.subscribers);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
    } catch (error) {
      await logError('Failed to load subscribers', { error });
    } finally {
      setLoading(false);
    }
  }

  async function toggleSubscriberStatus(subscriber: Subscriber) {
    try {
      const response = await fetch(`/api/admin/subscribers/${subscriber.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          active: !subscriber.active,
        }),
      });

      if (!response.ok) throw new Error('Failed to update subscriber status');

      await logInfo('Subscriber status updated', {
        subscriberId: subscriber.id,
        status: !subscriber.active,
      });

      loadSubscribers();
    } catch (error) {
      await logError('Failed to update subscriber status', { error });
    }
  }

  async function exportToCSV() {
    try {
      await logInfo('Subscribers CSV export initiated');
      window.location.href = '/api/admin/subscribers/export';
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        await logError('Failed to initiate CSV export', { error });
      }
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-gray-900">Subscribers</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your email subscribers
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-4">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-200"
          >
            Export to CSV
          </button>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center rounded-xl border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-200"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="overflow-x-auto scrollbar-hide max-w-[100vw]" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow-sm rounded-xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Joined Date
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
                  {subscribers.map((subscriber) => (
                    <tr 
                      key={subscriber.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {subscriber.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {subscriber.name || '-'}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(subscriber.createdAt).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          subscriber.active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {subscriber.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => toggleSubscriberStatus(subscriber)}
                          className="text-gray-900 hover:text-gray-700 transition-colors duration-200"
                        >
                          {subscriber.active ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-4 text-sm text-gray-900">
            {currentPage > 2 && (
              <button
                onClick={() => setCurrentPage(currentPage - 2)}
              >
                {currentPage - 2}
              </button>
            )}

            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                {currentPage - 1}
              </button>
            )}

            <button
              onClick={() => setCurrentPage(currentPage)}
              className="disabled:opacity-50"
            >
              {currentPage}
            </button>

            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                {currentPage + 1}
              </button>
            )}

            {currentPage + 1 < totalPages && (
              <>
                <span>...</span>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 