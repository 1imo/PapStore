"use client"

import { Inter } from "next/font/google";
import { ErrorService } from "@/lib/ErrorService";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

// Initialize error handling
if (typeof window !== "undefined") {
  ErrorService.getInstance();
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const showWhatsApp = !pathname.startsWith('/admin');

  return (
    <body className={inter.className}>
      <Header />
      <main className="min-h-screen">
        {children}
      </main>
      {showWhatsApp && <WhatsAppButton />}
      <Footer />
    </body>
  );
} 