import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { HowItWorks } from '@/components/HowItWorks';
import { AboutUs } from '@/components/AboutUs';
import { Testimonials } from '@/components/Testimonials';
import { InquiryForm } from '@/components/InquiryForm';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <div className="h-8 md:h-32 bg-white" />
      <AboutUs />
      <div className="h-8 md:h-32 bg-white" />
      <HowItWorks />
      <div className="h-8 md:h-32 bg-white" />
      <Testimonials />
      <div className="h-8 md:h-32 bg-white" />
      <InquiryForm />
    </>
  );
}
