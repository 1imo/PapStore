'use client';

import { useEffect, useState } from 'react';
import { logError, logInfo } from '@/lib/LoggingService';

interface Log {
  id: number;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
  metadata: string | null;
  source: string;
  createdAt: string;
}

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    level: '',
    source: '',
  });

  useEffect(() => {
    loadLogs();
  }, [filter]);

  async function loadLogs() {
    try {
      const params = new URLSearchParams();
      if (filter.level) params.append('level', filter.level);
      if (filter.source) params.append('source', filter.source);

      const response = await fetch(`/api/admin/logs?${params}`);
      const data = await response.json();
      setLogs(data.logs);
    } catch (error) {
      await logError('Failed to load logs', { error });
    } finally {
      setLoading(false);
    }
  }

  async function clearOldLogs() {
    if (!confirm('Are you sure you want to clear logs older than 30 days?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/logs/clear', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to clear logs');

      await logInfo('Old logs cleared');
      loadLogs();
    } catch (error) {
      await logError('Failed to clear logs', { error });
    }
  }

  const getLevelStyles = (level: Log['level']) => {
    switch (level) {
      case 'ERROR':
        return 'bg-red-100 text-red-800';
      case 'WARN':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-gray-900">System Logs</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage system logs
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

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <div className="sm:w-48">
          <label htmlFor="level" className="block text-base font-medium text-gray-900 mb-1">
            Level
          </label>
          <div className="relative">
            <select
              id="level"
              value={filter.level}
              onChange={(e) => setFilter({ ...filter, level: e.target.value })}
              className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors duration-200 appearance-none"
              style={{ WebkitAppearance: 'none' }}
            >
              <option value="">All Levels</option>
              <option value="info">Info</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
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

        <div className="flex-1">
          <label htmlFor="search" className="block text-base font-medium text-gray-900 mb-1">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              value={filter.source}
              onChange={(e) => setFilter({ ...filter, source: e.target.value })}
              placeholder="Search logs..."
              className="block w-full px-4 py-3 rounded-xl border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors duration-200"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg 
                className="h-5 w-5 text-gray-500" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="overflow-hidden shadow-sm rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Timestamp
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Level
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Source
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Message
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Metadata
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getLevelStyles(log.level)}`}>
                      {log.level}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {log.source}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {log.message}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {log.metadata && (
                      <pre className="text-xs">
                        {JSON.stringify(JSON.parse(log.metadata), null, 2)}
                      </pre>
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