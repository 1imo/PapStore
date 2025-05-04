'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logInfo } from '@/lib/LoggingService';

interface QuizState {
  rooms: string[];
  primaryConsideration: string;
  householdFactors: string[];
  stylePreference: string;
  budgetRange: string;
  currentStep: number;
}

const roomOptions = [
  { id: 'living', label: 'Living Room' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'bathroom', label: 'Bathroom' },
  { id: 'hallway', label: 'Hallway' },
  { id: 'dining', label: 'Dining Room' },
  { id: 'office', label: 'Home Office' },
  { id: 'commercial', label: 'Commercial' }
];

const primaryConsiderations = [
  { id: 'durability', label: 'Durability & Easy Maintenance' },
  { id: 'comfort', label: 'Comfort & Warmth' },
  { id: 'style', label: 'Style & Aesthetics' },
  { id: 'budget', label: 'Budget-Friendly' }
];

const householdFactors = [
  { id: 'adults', label: 'Just Adults' },
  { id: 'children', label: 'Children Present' },
  { id: 'pets', label: 'Pets Present' },
  { id: 'children_pets', label: 'Children & Pets' },
  { id: 'wheelchair', label: 'Wheelchair Access Required' },
  { id: 'all', label: 'All of the Above' }
];

const stylePreferences = [
  { id: 'modern', label: 'Modern & Minimal' },
  { id: 'classic', label: 'Classic & Traditional' },
  { id: 'natural', label: 'Natural & Organic' },
  { id: 'contemporary', label: 'Contemporary' },
  { id: 'no_preference', label: 'No Preference' }
];

const budgetRanges = [
  { id: 'budget', label: '£0-£20', description: 'Budget-friendly options' },
  { id: 'mid', label: '£20-£50', description: 'Mid-range options' },
  { id: 'premium', label: '£50+', description: 'Premium options' }
];

const flooringRecommendations = {
  living: {
    type: 'Engineered Wood',
    description: 'Engineered wood flooring offers the perfect balance of durability and elegance for living rooms. Its multi-layer construction provides stability and resistance to temperature changes, while the real wood top layer delivers timeless beauty.',
    products: [
      { id: 1, name: 'Oak Natural', color: 'Light Natural', image: '/oak-natural.jpg' },
      { id: 2, name: 'Walnut Classic', color: 'Rich Brown', image: '/walnut-classic.jpg' },
      { id: 3, name: 'Ash Grey', color: 'Modern Grey', image: '/ash-grey.jpg' }
    ]
  },
  bedroom: {
    type: 'Carpet',
    description: 'Carpet is ideal for bedrooms, providing warmth, comfort, and noise reduction. Our premium carpets offer luxurious underfoot comfort while maintaining durability and easy maintenance.',
    products: [
      { id: 1, name: 'Plush Velvet', color: 'Soft Grey', image: '/plush-velvet.jpg' },
      { id: 2, name: 'Berber Loop', color: 'Cream', image: '/berber-loop.jpg' },
      { id: 3, name: 'Saxony Twist', color: 'Navy Blue', image: '/saxony-twist.jpg' }
    ]
  },
  kitchen: {
    type: 'Luxury Vinyl',
    description: 'Luxury vinyl flooring is perfect for kitchens, offering water resistance, durability, and easy maintenance. Its realistic wood or stone appearance adds style while providing practical benefits.',
    products: [
      { id: 1, name: 'Stone Effect', color: 'Grey Marble', image: '/stone-effect.jpg' },
      { id: 2, name: 'Wood Look', color: 'Oak', image: '/wood-look.jpg' },
      { id: 3, name: 'Tile Effect', color: 'White', image: '/tile-effect.jpg' }
    ]
  },
  bathroom: {
    type: 'Waterproof Vinyl',
    description: 'Waterproof vinyl flooring is specifically designed for bathrooms, offering complete water resistance and slip resistance. Its durable construction ensures long-lasting performance in wet environments.',
    products: [
      { id: 1, name: 'Marble Effect', color: 'White', image: '/marble-effect.jpg' },
      { id: 2, name: 'Stone Look', color: 'Grey', image: '/stone-look.jpg' },
      { id: 3, name: 'Wood Effect', color: 'Light Oak', image: '/wood-effect.jpg' }
    ]
  },
  hallway: {
    type: 'Laminate',
    description: 'Laminate flooring is perfect for hallways, offering exceptional durability and scratch resistance. Its easy maintenance and wide range of styles make it ideal for high-traffic areas.',
    products: [
      { id: 1, name: 'Oak Classic', color: 'Natural', image: '/oak-classic.jpg' },
      { id: 2, name: 'Walnut', color: 'Dark Brown', image: '/walnut.jpg' },
      { id: 3, name: 'Grey Oak', color: 'Modern Grey', image: '/grey-oak.jpg' }
    ]
  },
  dining: {
    type: 'Engineered Wood',
    description: 'Engineered wood flooring adds elegance to dining rooms while providing durability. Its real wood top layer offers timeless beauty, perfect for formal dining spaces.',
    products: [
      { id: 1, name: 'Mahogany', color: 'Rich Brown', image: '/mahogany.jpg' },
      { id: 2, name: 'Oak Natural', color: 'Light', image: '/oak-natural.jpg' },
      { id: 3, name: 'Walnut', color: 'Dark', image: '/walnut.jpg' }
    ]
  },
  office: {
    type: 'Commercial Carpet',
    description: 'Commercial carpet tiles are ideal for home offices, offering durability, noise reduction, and easy maintenance. Their modular design allows for easy replacement if needed.',
    products: [
      { id: 1, name: 'Loop Pile', color: 'Grey', image: '/loop-pile.jpg' },
      { id: 2, name: 'Cut Pile', color: 'Blue', image: '/cut-pile.jpg' },
      { id: 3, name: 'Pattern', color: 'Multi', image: '/pattern.jpg' }
    ]
  },
  commercial: {
    type: 'Commercial Vinyl',
    description: 'Commercial vinyl flooring is designed for high-traffic areas, offering exceptional durability, easy maintenance, and professional appearance. Perfect for retail and office spaces.',
    products: [
      { id: 1, name: 'Safety Floor', color: 'Grey', image: '/safety-floor.jpg' },
      { id: 2, name: 'Luxury Tile', color: 'White', image: '/luxury-tile.jpg' },
      { id: 3, name: 'Wood Look', color: 'Oak', image: '/wood-look.jpg' }
    ]
  }
};

export function FlooringQuiz() {
  const router = useRouter();
  const [quizState, setQuizState] = useState<QuizState>({
    rooms: [],
    primaryConsideration: '',
    householdFactors: [],
    stylePreference: '',
    budgetRange: '',
    currentStep: 0
  });

  const handleRoomSelect = (roomId: string) => {
    setQuizState(prev => ({
      ...prev,
      rooms: prev.rooms.includes(roomId)
        ? prev.rooms.filter(id => id !== roomId)
        : [...prev.rooms, roomId]
    }));
  };

  const handlePrimaryConsiderationSelect = (considerationId: string) => {
    setQuizState(prev => ({ ...prev, primaryConsideration: considerationId }));
  };

  const handleHouseholdFactorSelect = (factorId: string) => {
    setQuizState(prev => ({
      ...prev,
      householdFactors: prev.householdFactors.includes(factorId)
        ? prev.householdFactors.filter(id => id !== factorId)
        : [...prev.householdFactors, factorId]
    }));
  };

  const handleStylePreferenceSelect = (preferenceId: string) => {
    setQuizState(prev => ({ ...prev, stylePreference: preferenceId }));
  };

  const handleBudgetRangeSelect = (rangeId: string) => {
    setQuizState(prev => ({ ...prev, budgetRange: rangeId }));
  };

  const handleNext = () => {
    setQuizState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const handleBack = () => {
    setQuizState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
  };

  const handleSubmit = async () => {
    await logInfo('Quiz completed', { ...quizState });
    setQuizState(prev => ({ ...prev, currentStep: 6 }));
  };

  const getRecommendations = () => {
    // This would be replaced with actual recommendation logic
    const room = quizState.rooms[0];
    const isBudget = quizState.budgetRange === 'budget';
    const isMid = quizState.budgetRange === 'mid';
    const isPremium = quizState.budgetRange === 'premium';

    const hasChildren = quizState.householdFactors.includes('children');
    const hasPets = quizState.householdFactors.includes('pets');
    const hasWheelchair = quizState.householdFactors.includes('wheelchair');

    // Example recommendation logic
    let primaryType = '';
    let alternatives: string[] = [];
    let products: { id: number; name: string; color: string; image: string; }[] = [];

    switch (room) {
      case 'living':
        if (isBudget) {
          primaryType = 'Laminate';
          alternatives = ['Vinyl', 'Carpet'];
          products = [
            { id: 1, name: 'Oak Classic', color: 'Natural', image: '/oak-classic.jpg' },
            { id: 2, name: 'Walnut', color: 'Dark Brown', image: '/walnut.jpg' },
            { id: 3, name: 'Grey Oak', color: 'Modern Grey', image: '/grey-oak.jpg' }
          ];
        } else if (isMid) {
          primaryType = 'Engineered Wood';
          alternatives = ['Luxury Vinyl', 'Premium Carpet'];
          products = [
            { id: 1, name: 'Premium Oak', color: 'Light Natural', image: '/premium-oak.jpg' },
            { id: 2, name: 'Walnut Classic', color: 'Rich Brown', image: '/walnut-classic.jpg' },
            { id: 3, name: 'Ash Grey', color: 'Modern Grey', image: '/ash-grey.jpg' }
          ];
        } else {
          primaryType = 'Solid Hardwood';
          alternatives = ['Premium Engineered Wood', 'Designer Vinyl'];
          products = [
            { id: 1, name: 'Mahogany', color: 'Rich Brown', image: '/mahogany.jpg' },
            { id: 2, name: 'Oak Natural', color: 'Light', image: '/oak-natural.jpg' },
            { id: 3, name: 'Walnut', color: 'Dark', image: '/walnut.jpg' }
          ];
        }
        break;
      case 'bedroom':
        if (isBudget) {
          primaryType = 'Carpet';
          alternatives = ['Vinyl', 'Laminate'];
          products = [
            { id: 1, name: 'Plush Velvet', color: 'Soft Grey', image: '/plush-velvet.jpg' },
            { id: 2, name: 'Berber Loop', color: 'Cream', image: '/berber-loop.jpg' },
            { id: 3, name: 'Saxony Twist', color: 'Navy Blue', image: '/saxony-twist.jpg' }
          ];
        } else if (isMid) {
          primaryType = 'Premium Carpet';
          alternatives = ['Luxury Vinyl', 'Engineered Wood'];
          products = [
            { id: 1, name: 'Luxury Plush', color: 'Soft Grey', image: '/luxury-plush.jpg' },
            { id: 2, name: 'Premium Berber', color: 'Cream', image: '/premium-berber.jpg' },
            { id: 3, name: 'Designer Saxony', color: 'Navy Blue', image: '/designer-saxony.jpg' }
          ];
        } else {
          primaryType = 'Luxury Carpet';
          alternatives = ['Premium Engineered Wood', 'Designer Vinyl'];
          products = [
            { id: 1, name: 'Designer Plush', color: 'Soft Grey', image: '/designer-plush.jpg' },
            { id: 2, name: 'Luxury Berber', color: 'Cream', image: '/luxury-berber.jpg' },
            { id: 3, name: 'Premium Saxony', color: 'Navy Blue', image: '/premium-saxony.jpg' }
          ];
        }
        break;
      case 'kitchen':
        if (isBudget) {
          primaryType = 'Vinyl';
          alternatives = ['Laminate', 'Sheet Vinyl'];
          products = [
            { id: 1, name: 'Stone Effect', color: 'Grey Marble', image: '/stone-effect.jpg' },
            { id: 2, name: 'Wood Look', color: 'Oak', image: '/wood-look.jpg' },
            { id: 3, name: 'Tile Effect', color: 'White', image: '/tile-effect.jpg' }
          ];
        } else if (isMid) {
          primaryType = 'Luxury Vinyl';
          alternatives = ['Engineered Wood', 'Premium Laminate'];
          products = [
            { id: 1, name: 'Luxury Vinyl', color: 'Oak', image: '/luxury-vinyl.jpg' },
            { id: 2, name: 'Engineered Wood', color: 'Natural', image: '/engineered-wood.jpg' },
            { id: 3, name: 'Premium Laminate', color: 'White', image: '/premium-laminate.jpg' }
          ];
        } else {
          primaryType = 'Designer Vinyl';
          alternatives = ['Premium Engineered Wood', 'Luxury Laminate'];
          products = [
            { id: 1, name: 'Designer Vinyl', color: 'Grey', image: '/designer-vinyl.jpg' },
            { id: 2, name: 'Luxury Laminate', color: 'White', image: '/luxury-laminate.jpg' },
            { id: 3, name: 'Premium Engineered Wood', color: 'Natural', image: '/premium-engineered-wood.jpg' }
          ];
        }
        break;
      case 'bathroom':
        if (isBudget) {
          primaryType = 'Waterproof Vinyl';
          alternatives = ['Sheet Vinyl', 'Vinyl Tiles'];
          products = [
            { id: 1, name: 'Marble Effect', color: 'White', image: '/marble-effect.jpg' },
            { id: 2, name: 'Stone Look', color: 'Grey', image: '/stone-look.jpg' },
            { id: 3, name: 'Wood Effect', color: 'Light Oak', image: '/wood-effect.jpg' }
          ];
        } else if (isMid) {
          primaryType = 'Luxury Waterproof Vinyl';
          alternatives = ['Premium Vinyl Tiles', 'Waterproof Laminate'];
          products = [
            { id: 1, name: 'Luxury Waterproof Vinyl', color: 'White', image: '/luxury-waterproof-vinyl.jpg' },
            { id: 2, name: 'Premium Vinyl Tiles', color: 'White', image: '/premium-vinyl-tiles.jpg' },
            { id: 3, name: 'Waterproof Laminate', color: 'White', image: '/waterproof-laminate.jpg' }
          ];
        } else {
          primaryType = 'Designer Waterproof Vinyl';
          alternatives = ['Premium Vinyl Tiles', 'Luxury Waterproof Laminate'];
          products = [
            { id: 1, name: 'Designer Waterproof Vinyl', color: 'Grey', image: '/designer-waterproof-vinyl.jpg' },
            { id: 2, name: 'Luxury Waterproof Laminate', color: 'White', image: '/luxury-waterproof-laminate.jpg' },
            { id: 3, name: 'Premium Vinyl Tiles', color: 'White', image: '/premium-vinyl-tiles.jpg' }
          ];
        }
        break;
      case 'hallway':
        if (isBudget) {
          primaryType = 'Laminate';
          alternatives = ['Vinyl', 'Carpet'];
          products = [
            { id: 1, name: 'Oak Classic', color: 'Natural', image: '/oak-classic.jpg' },
            { id: 2, name: 'Walnut', color: 'Dark Brown', image: '/walnut.jpg' },
            { id: 3, name: 'Grey Oak', color: 'Modern Grey', image: '/grey-oak.jpg' }
          ];
        } else if (isMid) {
          primaryType = 'Engineered Wood';
          alternatives = ['Luxury Vinyl', 'Premium Carpet'];
          products = [
            { id: 1, name: 'Luxury Vinyl', color: 'Oak', image: '/luxury-vinyl.jpg' },
            { id: 2, name: 'Premium Carpet', color: 'Natural', image: '/premium-carpet.jpg' },
            { id: 3, name: 'Engineered Wood', color: 'Natural', image: '/engineered-wood.jpg' }
          ];
        } else {
          primaryType = 'Solid Hardwood';
          alternatives = ['Premium Engineered Wood', 'Designer Vinyl'];
          products = [
            { id: 1, name: 'Mahogany', color: 'Rich Brown', image: '/mahogany.jpg' },
            { id: 2, name: 'Oak Natural', color: 'Light', image: '/oak-natural.jpg' },
            { id: 3, name: 'Walnut', color: 'Dark', image: '/walnut.jpg' }
          ];
        }
        break;
      case 'dining':
        if (isBudget) {
          primaryType = 'Laminate';
          alternatives = ['Vinyl', 'Carpet'];
          products = [
            { id: 1, name: 'Mahogany', color: 'Rich Brown', image: '/mahogany.jpg' },
            { id: 2, name: 'Oak Natural', color: 'Light', image: '/oak-natural.jpg' },
            { id: 3, name: 'Walnut', color: 'Dark', image: '/walnut.jpg' }
          ];
        } else if (isMid) {
          primaryType = 'Engineered Wood';
          alternatives = ['Luxury Vinyl', 'Premium Carpet'];
          products = [
            { id: 1, name: 'Mahogany', color: 'Rich Brown', image: '/mahogany.jpg' },
            { id: 2, name: 'Oak Natural', color: 'Light', image: '/oak-natural.jpg' },
            { id: 3, name: 'Walnut', color: 'Dark', image: '/walnut.jpg' }
          ];
        } else {
          primaryType = 'Solid Hardwood';
          alternatives = ['Premium Engineered Wood', 'Designer Vinyl'];
          products = [
            { id: 1, name: 'Mahogany', color: 'Rich Brown', image: '/mahogany.jpg' },
            { id: 2, name: 'Oak Natural', color: 'Light', image: '/oak-natural.jpg' },
            { id: 3, name: 'Walnut', color: 'Dark', image: '/walnut.jpg' }
          ];
        }
        break;
      case 'office':
        if (isBudget) {
          primaryType = 'Commercial Carpet';
          alternatives = ['Vinyl', 'Laminate'];
          products = [
            { id: 1, name: 'Loop Pile', color: 'Grey', image: '/loop-pile.jpg' },
            { id: 2, name: 'Cut Pile', color: 'Blue', image: '/cut-pile.jpg' },
            { id: 3, name: 'Pattern', color: 'Multi', image: '/pattern.jpg' }
          ];
        } else if (isMid) {
          primaryType = 'Premium Commercial Carpet';
          alternatives = ['Luxury Vinyl', 'Engineered Wood'];
          products = [
            { id: 1, name: 'Loop Pile', color: 'Grey', image: '/loop-pile.jpg' },
            { id: 2, name: 'Cut Pile', color: 'Blue', image: '/cut-pile.jpg' },
            { id: 3, name: 'Pattern', color: 'Multi', image: '/pattern.jpg' }
          ];
        } else {
          primaryType = 'Luxury Commercial Carpet';
          alternatives = ['Premium Engineered Wood', 'Designer Vinyl'];
          products = [
            { id: 1, name: 'Loop Pile', color: 'Grey', image: '/loop-pile.jpg' },
            { id: 2, name: 'Cut Pile', color: 'Blue', image: '/cut-pile.jpg' },
            { id: 3, name: 'Pattern', color: 'Multi', image: '/pattern.jpg' }
          ];
        }
        break;
      case 'commercial':
        if (isBudget) {
          primaryType = 'Commercial Vinyl';
          alternatives = ['Commercial Carpet', 'Commercial Laminate'];
          products = [
            { id: 1, name: 'Safety Floor', color: 'Grey', image: '/safety-floor.jpg' },
            { id: 2, name: 'Luxury Tile', color: 'White', image: '/luxury-tile.jpg' },
            { id: 3, name: 'Wood Look', color: 'Oak', image: '/wood-look.jpg' }
          ];
        } else if (isMid) {
          primaryType = 'Premium Commercial Vinyl';
          alternatives = ['Premium Commercial Carpet', 'Commercial Engineered Wood'];
          products = [
            { id: 1, name: 'Safety Floor', color: 'Grey', image: '/safety-floor.jpg' },
            { id: 2, name: 'Luxury Tile', color: 'White', image: '/luxury-tile.jpg' },
            { id: 3, name: 'Wood Look', color: 'Oak', image: '/wood-look.jpg' }
          ];
        } else {
          primaryType = 'Luxury Commercial Vinyl';
          alternatives = ['Premium Commercial Engineered Wood', 'Designer Commercial Vinyl'];
          products = [
            { id: 1, name: 'Safety Floor', color: 'Grey', image: '/safety-floor.jpg' },
            { id: 2, name: 'Luxury Tile', color: 'White', image: '/luxury-tile.jpg' },
            { id: 3, name: 'Wood Look', color: 'Oak', image: '/wood-look.jpg' }
          ];
        }
        break;
      default:
        primaryType = 'Laminate';
        alternatives = ['Vinyl', 'Carpet'];
    }

    return {
      primaryType,
      alternatives,
      products,
      considerations: {
        children: hasChildren,
        pets: hasPets,
        wheelchair: hasWheelchair
      }
    };
  };

  return (
    <div className="fixed inset-0 bg-white">
      {/* Start Screen */}
      {quizState.currentStep === 0 && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/quiz.avif)' }}
        >
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="relative z-10 text-center flex flex-col items-center">
            {/* Logo */}
            <img
              src="/Logo-02.png"
              alt="PapStore Logo"
              className="w-28 h-auto mb-6 drop-shadow-lg"
              style={{ maxWidth: '120px' }}
            />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
              Find Your Perfect Floor
            </h1>
            <p className="text-base sm:text-lg text-white/80 mb-8 drop-shadow max-w-md mx-4 font-normal">
              Quick quiz. Personal picks. Shop with confidence.
            </p>
            <button
              onClick={() => setQuizState(prev => ({ ...prev, currentStep: 1 }))}
              className="px-8 py-4 bg-[#00603A] text-white rounded-lg text-lg font-bold focus:outline-none focus:ring-4 focus:ring-[#00603A]/40 hover:bg-[#004e2f] transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Start Now
            </button>
          </div>
        </div>
      )}

      {/* Quiz Steps */}
      {quizState.currentStep > 0 && (
        <div className="fixed inset-0 bg-white overflow-y-auto">
          <div className="w-full max-w-3xl mx-auto px-4 pt-2 pb-8">
            {/* Progress bar */}
            <div className="bg-white pb-6 sm:pt-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {quizState.currentStep === 6 ? 'Results' : `Step ${quizState.currentStep} of 5`}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {quizState.currentStep === 6 ? '100%' : `${Math.round((quizState.currentStep / 5) * 100)}%`}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#00603A] h-2 rounded-full transition-all duration-300"
                  style={{ width: quizState.currentStep === 6 ? '100%' : `${(quizState.currentStep / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Content area */}
            <div className="w-full bg-white">
              {/* Only render the current step */}
              <div className="w-full overflow-hidden" key={quizState.currentStep}>
                {quizState.currentStep === 1 && (
                  <div className="flex flex-col items-center" key="step-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center sm:mt-8">Where do you need new flooring?</h2>
                    <p className="text-gray-600 text-base mb-6 font-normal text-center w-full">Pick all that apply.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 w-full sm:mt-4">
                      {roomOptions.map(room => {
                        const selected = quizState.rooms.includes(room.id);
                        return (
                          <button
                            key={room.id}
                            onClick={() => handleRoomSelect(room.id)}
                            className={`w-full p-6 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2
                              ${selected
                                ? 'border-[#00603A] bg-[#00603A] text-white'
                                : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-[#00603A] hover:bg-gray-100'
                              }`}
                          >
                            {getRoomIcon(room.id, selected)}
                            <span className="font-medium">{room.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={handleNext}
                      disabled={quizState.rooms.length === 0}
                      className="px-8 py-3 bg-[#00603A] text-white rounded-lg disabled:opacity-50 hover:bg-[#004e2f] transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}

                {quizState.currentStep === 2 && (
                  <div className="flex flex-col items-center" key="step-2">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center sm:mt-8">What matters most for your floor?</h2>
                    <p className="text-gray-600 text-base mb-4 font-normal text-center w-full">Choose one.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 w-full sm:mt-4">
                      {primaryConsiderations.map(consideration => {
                        const selected = quizState.primaryConsideration === consideration.id;
                        return (
                          <button
                            key={consideration.id}
                            onClick={() => handlePrimaryConsiderationSelect(consideration.id)}
                            className={`w-full p-6 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2
                              ${selected
                                ? 'border-[#00603A] bg-[#00603A] text-white'
                                : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-[#00603A] hover:bg-gray-100'
                              }`}
                          >
                            <span className="font-medium">{consideration.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex w-full max-w-lg justify-between">
                      <button
                        onClick={handleBack}
                        className="px-6 py-2 border-2 border-gray-300 bg-gray-50 text-gray-700 rounded-lg hover:border-[#00603A] hover:bg-gray-100"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={!quizState.primaryConsideration}
                        className="px-6 py-2 bg-[#00603A] text-white rounded-lg disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {quizState.currentStep === 3 && (
                  <div className="flex flex-col items-center" key="step-3">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center sm:mt-8">Who uses this space?</h2>
                    <p className="text-gray-600 text-base mb-4 font-normal text-center w-full">Select all that apply.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 w-full sm:mt-4">
                      {householdFactors.map(factor => {
                        const selected = quizState.householdFactors.includes(factor.id);
                        return (
                          <button
                            key={factor.id}
                            onClick={() => handleHouseholdFactorSelect(factor.id)}
                            className={`w-full p-6 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2
                              ${selected
                                ? 'border-[#00603A] bg-[#00603A] text-white'
                                : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-[#00603A] hover:bg-gray-100'
                              }`}
                          >
                            <span className="font-medium">{factor.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex w-full max-w-lg justify-between">
                      <button
                        onClick={handleBack}
                        className="px-6 py-2 border-2 border-gray-300 bg-gray-50 text-gray-700 rounded-lg hover:border-[#00603A] hover:bg-gray-100"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-[#00603A] text-white rounded-lg"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {quizState.currentStep === 4 && (
                  <div className="flex flex-col items-center" key="step-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center sm:mt-8">What's your style?</h2>
                    <p className="text-gray-600 text-base mb-4 font-normal text-center w-full">Pick your favorite look.</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 w-full sm:mt-4">
                      {stylePreferences.map(preference => {
                        const selected = quizState.stylePreference === preference.id;
                        return (
                          <button
                            key={preference.id}
                            onClick={() => handleStylePreferenceSelect(preference.id)}
                            className={`w-full p-6 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2
                              ${selected
                                ? 'border-[#00603A] bg-[#00603A] text-white'
                                : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-[#00603A] hover:bg-gray-100'
                              }`}
                          >
                            <span className="font-medium">{preference.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex w-full max-w-lg justify-between">
                      <button
                        onClick={handleBack}
                        className="px-6 py-2 border-2 border-gray-300 bg-gray-50 text-gray-700 rounded-lg hover:border-[#00603A] hover:bg-gray-100"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={!quizState.stylePreference}
                        className="px-6 py-2 bg-[#00603A] text-white rounded-lg disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {quizState.currentStep === 5 && (
                  <div className="flex flex-col items-center" key="step-5">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center sm:mt-8">What's your budget?</h2>
                    <p className="text-gray-600 text-base mb-4 font-normal text-center w-full">Per square metre.</p>
                    <div className="grid grid-cols-1 gap-4 mb-8 w-full sm:mt-4">
                      {budgetRanges.map(range => {
                        const selected = quizState.budgetRange === range.id;
                        return (
                          <button
                            key={range.id}
                            onClick={() => handleBudgetRangeSelect(range.id)}
                            className={`w-full p-6 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2
                              ${selected
                                ? 'border-[#00603A] bg-[#00603A] text-white'
                                : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-[#00603A] hover:bg-gray-100'
                              }`}
                          >
                            <span className="font-medium">{range.label}</span>
                            <span className="text-sm opacity-80">{range.description}</span>
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex w-full max-w-lg justify-between">
                      <button
                        onClick={handleBack}
                        className="px-6 py-2 border-2 border-gray-300 bg-gray-50 text-gray-700 rounded-lg hover:border-[#00603A] hover:bg-gray-100"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={!quizState.budgetRange}
                        className="px-6 py-2 bg-[#00603A] text-white rounded-lg disabled:opacity-50"
                      >
                        See My Matches
                      </button>
                    </div>
                  </div>
                )}

                {quizState.currentStep === 6 && (
                  <div className="flex flex-col items-center" key="step-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Your Flooring Matches</h2>
                    <div className="bg-gray-50 rounded-lg p-6 mb-6 w-full max-w-lg text-center">
                      <h3 className="text-xl font-semibold text-[#00603A] mb-2">
                        Top Pick: {getRecommendations().primaryType}
                      </h3>
                      <p className="text-gray-900 mb-4 font-medium w-full">
                        Here's our top recommendation for your space.
                      </p>
                      
                      <h4 className="font-semibold text-gray-900 mt-4 mb-2">Other great options:</h4>
                      <ul className="list-disc list-inside text-gray-700 text-left inline-block w-full">
                        {getRecommendations().alternatives.map((alt, index) => (
                          <li key={index}>{alt}</li>
                        ))}
                      </ul>

                      {(getRecommendations().considerations.children || 
                        getRecommendations().considerations.pets || 
                        getRecommendations().considerations.wheelchair) && (
                        <div className="mt-4 p-4 bg-[#00603A]/10 rounded-lg text-left inline-block w-full">
                          <h4 className="font-semibold text-[#00603A] mb-2">Special Considerations:</h4>
                          <ul className="list-disc list-inside text-gray-700">
                            {getRecommendations().considerations.children && (
                              <li>Child-friendly: slip-resistant</li>
                            )}
                            {getRecommendations().considerations.pets && (
                              <li>Pet-friendly: scratch-resistant</li>
                            )}
                            {getRecommendations().considerations.wheelchair && (
                              <li>Wheelchair-friendly: smooth transitions</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Products</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 w-full max-w-3xl">
                      {getRecommendations().products.map(product => (
                        <div key={product.id} className="bg-white rounded-lg p-4 flex flex-col items-center">
                          <div className="aspect-w-1 aspect-h-1 mb-4 w-full">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="object-cover rounded-lg w-full"
                            />
                          </div>
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <p className="text-gray-600">{product.color}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => router.push('/products')}
                        className="px-6 py-3 bg-[#00603A] text-white rounded-lg hover:bg-[#004e2f] transition-colors"
                      >
                        Shop All Flooring
                      </button>
                      <button
                        onClick={() => router.push('/finder')}
                        className="px-6 py-3 border-2 border-[#00603A] text-[#00603A] rounded-lg hover:bg-[#00603A] hover:text-white transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getRoomIcon(roomId: string, selected: boolean) {
  const iconColor = selected ? 'text-white' : 'text-[#00603A]';
  switch (roomId) {
    case 'living':
      return <svg className={`w-8 h-8 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    case 'bedroom':
      return <svg className={`w-8 h-8 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>;
    case 'kitchen':
      return <svg className={`w-8 h-8 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="13" rx="2" /><path d="M6 7V4a2 2 0 012-2h8a2 2 0 012 2v3" /></svg>;
    case 'bathroom':
      return <svg className={`w-8 h-8 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M7 10V7a5 5 0 0110 0v3" /><rect x="3" y="10" width="18" height="7" rx="2" /><path d="M8 21h8" /></svg>;
    case 'hallway':
      return <svg className={`w-8 h-8 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="7" y="3" width="10" height="18" rx="2" /></svg>;
    case 'dining':
      return <svg className={`w-8 h-8 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M2 20h20M6 16v-2a6 6 0 0112 0v2" /></svg>;
    case 'office':
      return <svg className={`w-8 h-8 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4a2 2 0 012-2h4a2 2 0 012 2v3" /></svg>;
    case 'commercial':
      return <svg className={`w-8 h-8 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>;
    default:
      return null;
  }
} 