import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./client-layout";

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
      <ClientLayout>
        {children}
      </ClientLayout>
    </html>
  );
}
