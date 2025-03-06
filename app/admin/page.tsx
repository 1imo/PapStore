import { prisma } from '@/lib/prisma';
import { logError } from '@/lib/LoggingService';

async function getStats() {
  try {
    const [
      totalInquiries,
      unrespondedInquiries,
      totalSubscribers,
      recentLogs
    ] = await Promise.all([
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { responded: false } }),
      prisma.subscriber.count({ where: { active: true } }),
      prisma.log.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      totalInquiries,
      unrespondedInquiries,
      totalSubscribers,
      recentLogs,
    };
  } catch (error) {
    await logError('Failed to fetch admin stats', { error });
    throw error;
  }
}

function getLogLevelStyle(level: string) {
  switch (level) {
    case 'ERROR':
      return 'text-red-600';
    case 'WARN':
      return 'text-yellow-600';
    default:
      return 'text-green-600';
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Overview of your system
          </p>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-primary-100 rounded-md p-3">
                  {/* Add icon here */}
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Inquiries
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {stats.totalInquiries}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-yellow-100 rounded-md p-3">
                  {/* Add icon here */}
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Responses
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {stats.unrespondedInquiries}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200">
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-green-100 rounded-md p-3">
                  {/* Add icon here */}
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Subscribers
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {stats.totalSubscribers}
                  </dd>
                </dl>
              </div>
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
                  Recent Activity
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {stats.recentLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-4">
                    <p className={`text-sm font-medium ${getLogLevelStyle(log.level)}`}>
                      {log.message}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-right">
                    {new Date(log.createdAt).toLocaleString()}
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