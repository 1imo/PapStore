'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  
  // Simplified check for login page
  const isLoginPage = pathname?.includes('/admin/login') ?? false;
  console.log('Current pathname:', pathname);
  console.log('isLoginPage:', isLoginPage);

  return (
    <div className="min-h-screen bg-gray-100 max-w-[100vw] overflow-x-hidden">
      {!isLoginPage && (
        <nav className="bg-white shadow-sm w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex justify-between h-16 w-full">
              <div className="flex w-full">
                <div className="flex gap-6 overflow-x-auto scrollbar-hide w-full" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="inline-flex items-center py-2 text-sm font-medium text-gray-900 hover:text-primary-600 whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    href="/api/admin/logout"
                    className="md:hidden inline-flex items-center py-2 text-sm font-medium text-gray-500 hover:text-gray-900 whitespace-nowrap"
                  >
                    Logout
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex items-center">
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
      )}
      <main className={`${isLoginPage ? '' : 'py-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
} 