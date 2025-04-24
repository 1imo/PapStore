import { FlooringQuiz } from '@/components/FlooringQuiz';

export default function FinderPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Find Your Perfect Flooring
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Answer a few quick questions to get personalized flooring recommendations
          </p>
        </div>
        <FlooringQuiz />
      </div>
    </main>
  );
}
