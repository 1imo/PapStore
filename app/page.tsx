import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { HowItWorks } from '@/components/HowItWorks';
import { AboutUs } from '@/components/AboutUs';
import { Testimonials } from '@/components/Testimonials';
import { InquiryForm } from '@/components/InquiryForm';
import { EmailBanner } from '@/components/EmailBanner';
import { FlooringGuide } from '@/components/FlooringGuide';
import { PopularCategories } from '@/components/PopularCategories';
import { FlooringFinderBanner } from '@/components/FlooringFinderBanner';
import { HelpCenter } from '@/components/HelpCenter';

export default function Home() {
  return (
    <>
      <EmailBanner />
      <Hero />
      <PopularCategories />
      {/* <Services />
      <div className="h-8 md:h-32 bg-white" /> */}
      <div className="h-8 md:h-32 bg-white" />
      <FlooringGuide />
      <div className="h-8 md:h-32 bg-white" />
      <HowItWorks />
      <div className="h-8 md:h-32 bg-white" />
      <FlooringFinderBanner />
      <div className="h-8 md:h-32 bg-white" />
      <HelpCenter />
      <div className="h-8 md:h-32 bg-white" />
      <Testimonials />
      <div className="h-8 md:h-32 bg-white" />
      {/* <AboutUs />
      <div className="h-8 md:h-32 bg-white" /> */}
      <InquiryForm />
    </>
  );
}
