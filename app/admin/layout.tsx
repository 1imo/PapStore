import Link from 'next/link';

const navigation = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Inquiries', href: '/admin/inquiries' },
  { name: 'Services', href: '/admin/services' },
  { name: 'Subscribers', href: '/admin/subscribers' },
  { name: 'Logs', href: '/admin/logs' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex gap-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="inline-flex items-center py-2 text-sm font-medium text-gray-900 hover:text-primary-600"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <Link
                href="/api/admin/logout"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
} 