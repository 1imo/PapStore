"use client"

import { Inter } from "next/font/google";
import { ErrorService } from "@/lib/ErrorService";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { usePathname } from 'next/navigation';
import { motion } from "framer-motion";

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
  const isQuizPage = pathname.startsWith('/quiz');

  return (
    <body className={inter.className}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
          opacity: { duration: 0.4 }
        }}
        style={{ 
          minHeight: "100vh", 
          display: "flex", 
          flexDirection: "column",
          willChange: "opacity",
          maxWidth: "100vw",
          overflowX: "hidden",
          boxSizing: "border-box"
        }}
      >
        {!isQuizPage && <Header />}
        <main className="min-h-screen">
          {children}
        </main>
        {showWhatsApp && !isQuizPage && <WhatsAppButton />}
        {!isQuizPage && <Footer />}
      </motion.div>
    </body>
  );
} 