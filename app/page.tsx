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
      <AboutUs />
      <Services />
      <HowItWorks />
      <Testimonials />
      <InquiryForm />
    </>
  );
}
