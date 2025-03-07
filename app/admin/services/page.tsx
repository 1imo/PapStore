'use client';

import { useEffect, useState } from 'react';
import { logError, logInfo } from '@/lib/LoggingService';

interface Service {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  isActive: boolean;
  order: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const emptyService: Service = {
    id: -1,
    name: '',
    description: '',
    imageUrl: null,
    isActive: true,
    order: 0,
  };

  useEffect(() => {
    loadServices();
  }, [currentPage]);

  async function loadServices() {
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', itemsPerPage.toString());

      const response = await fetch(`/api/admin/services?${params}`);
      const data = await response.json();
      setServices(data.services);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
      
      if (data.services.length > 0) {
        setExpandedId(data.services[0].id);
      }
    } catch (error) {
      await logError('Failed to load services', { error });
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingService) return;

    try {
      const method = 'id' in editingService ? 'PUT' : 'POST';
      const url = 'id' in editingService 
        ? `/api/admin/services/${editingService.id}` 
        : '/api/admin/services';

      const serviceData = 'id' in editingService 
        ? editingService 
        : { ...emptyService, order: services.length };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) throw new Error('Failed to save service');

      await logInfo('Service saved successfully', {
        serviceId: 'id' in editingService ? editingService.id : undefined,
      });

      setEditingService(null);
      loadServices();
    } catch (error) {
      await logError('Failed to save service', { error });
    }
  }

  async function toggleServiceStatus(service: Service) {
    try {
      const response = await fetch(`/api/admin/services/${service.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...service,
          isActive: !service.isActive,
        }),
      });

      if (!response.ok) throw new Error('Failed to update service status');

      await logInfo('Service status updated', {
        serviceId: service.id,
        status: !service.isActive,
      });

      loadServices();
    } catch (error) {
      await logError('Failed to update service status', { error });
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your service offerings
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setEditingService(emptyService)}
            className="inline-flex items-center justify-center rounded-xl border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-200"
          >
            Add service
          </button>
        </div>
      </div>

      {editingService && (
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-base font-medium text-gray-900 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={editingService.name}
                onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-base font-medium text-gray-900 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={editingService.description}
                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                rows={3}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors duration-200 resize-y"
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-base font-medium text-gray-900 mb-1">
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                value={editingService.imageUrl ?? ''}
                onChange={(e) => setEditingService({ ...editingService, imageUrl: e.target.value })}
                className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors duration-200"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-xl shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="mt-8">
        <div className="overflow-x-auto scrollbar-hide max-w-[100vw]" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow-sm rounded-xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Order
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Description
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
                  {services.map((service) => (
                    <tr 
                      key={service.id}
                      onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
                      className={`cursor-pointer transition-colors ${
                        expandedId === service.id ? 'bg-gray-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {service.order}
                      </td>
                      <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {service.name}
                      </td>
                      <td className={`align-top px-3 py-4 text-sm text-gray-500 ${
                        expandedId === service.id ? 'whitespace-pre-wrap' : 'truncate max-w-xs'
                      }`}>
                        {service.description}
                      </td>
                      <td className="align-top whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          service.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="align-top whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="pt-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingService(service);
                            }}
                            className="text-gray-900 hover:text-gray-700 mr-4 transition-colors duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleServiceStatus(service);
                            }}
                            className="text-gray-900 hover:text-gray-700 transition-colors duration-200"
                          >
                            {service.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
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