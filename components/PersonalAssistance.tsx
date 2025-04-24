'use client';

import { logInfo } from '@/lib/LoggingService';
import { ChevronRightIcon, HomeIcon, ChatBubbleLeftRightIcon, PhoneIcon } from '@heroicons/react/24/outline';

export function PersonalAssistance() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Personal Assistance
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-700">
            Get expert guidance for your flooring project
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="/book-a-home-visit"
              className="block bg-[#00603A] rounded-xl p-6 hover:bg-[#004e2f] transition-colors duration-200"
              onClick={() => logInfo('Home visit link clicked')}
            >
              <div className="flex flex-col h-full">
                <div className="flex-shrink-0 mb-4">
                  <HomeIcon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">Book a home visit</h3>
                  <p className="text-white/90">Our experts will help you find your dream floor</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <ChevronRightIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </a>

            <a
              href="tel:+447861172194"
              className="block bg-[#00603A] rounded-xl p-6 hover:bg-[#004e2f] transition-colors duration-200"
              onClick={() => logInfo('Phone call link clicked')}
            >
              <div className="flex flex-col h-full">
                <div className="flex-shrink-0 mb-4">
                  <PhoneIcon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">Call us directly</h3>
                  <p className="text-white/90">Speak with our flooring experts</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <ChevronRightIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </a>

            <a
              href="#"
              className="block bg-[#00603A] rounded-xl p-6 hover:bg-[#004e2f] transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                logInfo('Chat link clicked');
              }}
            >
              <div className="flex flex-col h-full">
                <div className="flex-shrink-0 mb-4">
                  <ChatBubbleLeftRightIcon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">Chat with our experts</h3>
                  <p className="text-white/90">Get instant advice from our flooring specialists</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <ChevronRightIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 