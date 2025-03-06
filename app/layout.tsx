import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ErrorService } from "@/lib/ErrorService";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Initialize error handling
if (typeof window !== "undefined") {
  ErrorService.getInstance();
}

export const metadata: Metadata = {
  title: "PapStore - Professional Carpet & Flooring Solutions",
  description: "Expert carpet and flooring installation services in [Your Area]. Family-owned business delivering quality craftsmanship for your home.",
  keywords: "carpet installation, flooring services, laminate flooring, vinyl flooring, professional flooring",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
