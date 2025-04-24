'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logInfo } from '@/lib/LoggingService';
import { ChevronRightIcon, HomeIcon, ChatBubbleLeftRightIcon, PhoneIcon } from '@heroicons/react/24/outline';

const missions = [
  { value: '/help/fitting', label: 'Do you do fitting?' },
  { value: '/help/quotes', label: 'I would like a quote' },
  { value: '/help/question', label: 'I need further information on a product' },
  { value: '/help/interest-free-credit', label: 'I\'ve got a question about 0% finance' },
  { value: '/help/orders', label: 'I have a query about an existing order' },
  { value: '/help/complaint', label: 'I have a complaint' },
  { value: '/help', label: 'Just take me to the help centre!' }
];

export function HelpCenter() {
  const router = useRouter();
  const [selectedMission, setSelectedMission] = useState('');

  const handleMissionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedMission(value);
    await logInfo('Help mission selected', { mission: value });
    router.push(value);
  };

  return (
    <section className="py-16 bg-[#00603A] relative overflow-hidden">
      <div className="w-full relative">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            What did you come here to do today?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-white/90">
            Let us help you find what you're looking for
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-[#00603A] rounded-xl p-8 relative">
            <div className="relative">
              <select
                value={selectedMission}
                onChange={handleMissionChange}
                className="block w-full px-4 py-3 text-lg border-2 border-white/20 rounded-lg bg-white/10 text-white placeholder-white/70 focus:ring-1 focus:ring-white focus:border-white transition-colors appearance-none"
              >
                <option value="" disabled hidden>I want to...</option>
                {missions.map((mission) => (
                  <option key={mission.value} value={mission.value}>
                    {mission.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <ChevronRightIcon className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="mt-6 text-center">
              <a
                href="/help"
                className="text-white hover:text-white/90 font-medium inline-flex items-center"
                onClick={() => logInfo('Help centre link clicked')}
              >
                Browse our Help Centre
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href="/book-a-home-visit"
              className="flex items-center justify-center px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              onClick={() => logInfo('Home visit clicked')}
            >
              <HomeIcon className="h-5 w-5 text-white mr-2" />
              <span className="text-white">Book a home visit</span>
            </a>
            <a
              href="tel:+447861172194"
              className="flex items-center justify-center px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              onClick={() => logInfo('Phone call clicked')}
            >
              <PhoneIcon className="h-5 w-5 text-white mr-2" />
              <span className="text-white">Call us directly</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-center px-4 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                logInfo('Chat clicked');
              }}
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-white mr-2" />
              <span className="text-white">Chat with our experts</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 