import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientLayout from "./client-layout";

// Separate viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.papstore.co.uk'),
  title: "PapStore - Professional Carpet & Flooring Solutions in Surrey & London",
  description: "Expert carpet and flooring installation services across the UK. Family-owned business with 20+ years experience in hardwood, laminate, vinyl flooring and carpet fitting. Based in Southall, serving London, Surrey, and nationwide.",
  keywords: [
    // Location-based keywords - London
    "carpet fitting Southall", "flooring installation West London", "carpet shop London", 
    "flooring company Ealing", "carpet fitters UB1", "flooring specialists Hounslow",
    "carpet store Uxbridge", "flooring services Hayes", "carpet installation Greenford",
    "flooring solutions Harrow", "carpet shop Wembley", "flooring experts Acton",
    "carpet fitters Chiswick", "flooring company Richmond", "carpet store Kingston",
    
    // Location-based keywords - Surrey
    "carpet fitting Guildford", "flooring installation Woking", "carpet shop Byfleet",
    "flooring solutions Dorking", "carpet store Addlestone", "flooring experts Surrey",
    "carpet fitters Weybridge", "flooring company Esher", "carpet shop Leatherhead",
    "flooring specialists Epsom", "carpet installation Staines", "flooring services Cobham",
    "carpet store Farnham", "flooring experts Godalming", "carpet fitters Haslemere",
    
    // Location-based keywords - Home Counties
    "carpet fitting Berkshire", "flooring installation Hampshire", "carpet shop Sussex",
    "flooring solutions Kent", "carpet store Essex", "flooring experts Hertfordshire",
    "carpet fitters Buckinghamshire", "flooring company Oxfordshire", "carpet shop Middlesex",
    
    // Service-based keywords
    "commercial flooring installation", "residential carpet fitting",
    "hardwood floor installation", "engineered wood flooring installation",
    "vinyl floor fitting", "laminate flooring installation",
    "carpet underlay fitting", "floor preparation services",
    "professional floor laying", "carpet removal services",
    "floor levelling services", "subfloor preparation",
    "commercial carpet tiles installation", "safety flooring installation",
    "luxury vinyl tile fitting", "parquet flooring installation",
    
    // Product-based keywords
    "hardwood flooring", "engineered wood floors", "vinyl flooring",
    "laminate floors", "carpet tiles", "luxury vinyl tiles",
    "commercial carpets", "residential carpets", "stair carpets",
    "carpet underlay", "flooring accessories", "floor trims",
    "herringbone flooring", "parquet flooring", "safety flooring",
    "anti-slip flooring", "commercial vinyl", "designer carpets",
    "berber carpets", "wool carpets", "synthetic carpets",
    
    // Quality/Service keywords
    "premium flooring solutions", "expert floor fitters",
    "professional carpet laying", "guaranteed flooring installation",
    "experienced floor installers", "trusted flooring company",
    "family-run flooring business", "local carpet fitters",
    "nationwide flooring services", "commercial flooring contractors",
    "emergency flooring repairs", "same day carpet fitting",
    "next day flooring installation", "free flooring consultation"
  ].join(", "),
  
  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.papstore.co.uk/',
    siteName: 'PapStore Carpets & Flooring',
    title: 'PapStore - Professional Carpet & Flooring Solutions in Surrey & London',
    description: 'Transform your space with expert flooring installation services. Family-owned business serving Surrey & London from our Southall showroom for over 20 years.',
    images: [
      {
        url: '/Logo-01.jpg',
        width: 1200,
        height: 630,
        alt: 'PapStore Carpets & Flooring',
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'PapStore - Professional Carpet & Flooring Solutions in Surrey & London',
    description: 'Transform your space with expert flooring installation services. Visit our Southall showroom or book a home consultation.',
    images: ['/Logo-01.jpg'],
    creator: '@papstore',
    site: '@papstore',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://www.papstore.co.uk',
    languages: {
      'en-GB': 'https://www.papstore.co.uk',
    },
  },

  authors: [{ name: 'PapStore' }],
  
  category: 'Home Improvement',
  
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
    other: {
      rel: 'apple-touch-icon',
      url: '/favicon.png',
    },
  },
  
  
  // Enhanced geo-specific metadata
  other: {
    // Primary location
    'geo.region': 'GB-ENG',
    'geo.placename': 'Southall, London',
    'geo.position': '51.5111;-0.3764',
    'ICBM': '51.5111, -0.3764',
    
    // Business details
    'business:contact_data:street_address': '44-50 The Broadway',
    'business:contact_data:locality': 'Southall',
    'business:contact_data:region': 'London',
    'business:contact_data:postal_code': 'UB1 1QB',
    'business:contact_data:country_name': 'United Kingdom',
    
    // Primary service areas
    'business:primary_service_areas': [
      'Greater London',
      'Surrey',
      'Berkshire',
      'Hampshire',
      'Sussex',
      'Kent',
      'Essex',
      'Hertfordshire',
      'Buckinghamshire',
      'Oxfordshire',
      'Middlesex'
    ].join(', '),
    
    // London boroughs coverage
    'business:london_coverage': [
      'Ealing', 'Hounslow', 'Hillingdon', 'Harrow',
      'Brent', 'Richmond', 'Kingston', 'Merton',
      'Wandsworth', 'Hammersmith', 'Fulham', 'Westminster'
    ].join(', '),
    
    // Surrey areas coverage
    'business:surrey_coverage': [
      'Guildford', 'Woking', 'Byfleet', 'Dorking',
      'Addlestone', 'Weybridge', 'Esher', 'Leatherhead',
      'Epsom', 'Staines', 'Cobham', 'Farnham',
      'Godalming', 'Haslemere', 'Reigate', 'Redhill'
    ].join(', '),
    
    // Local business schema markers
    'place:location:latitude': '51.5111',
    'place:location:longitude': '-0.3764',
    'business:hours': [
      'Mo-Fr 08:00-18:00',
      'Sa 09:00-16:00',
      'Su Closed'
    ].join('; '),
    
    // Additional business attributes
    'business:type': 'Home Improvement',
    'business:category': 'Flooring Contractor',
    'business:subcategory': 'Carpet Installation',
    
    // Coverage information
    'business:service_radius': 'Nationwide',
    'business:service_region': 'United Kingdom',
    'business:primary_regions': 'London, South East England, Home Counties',
    
    // Local landmarks and transport
    'business:nearby': [
      'Southall Station',
      'The Broadway Shopping Centre',
      'Southall Market',
      'Norwood Green',
      'Heathrow Airport',
      'M4 Motorway',
      'A4 Great West Road'
    ].join(', '),
    
    // Additional service attributes
    'business:specialties': [
      'Commercial Flooring',
      'Residential Flooring',
      'Industrial Flooring',
      'Safety Flooring',
      'Designer Flooring Solutions',
      'Emergency Repairs',
      'Nationwide Installation'
    ].join(', '),
  },
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
