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
  { id: 'commercial', label: 'Commercial Space' }
];

const primaryConsiderations = [
  { id: 'durability', label: 'Durability & Easy Maintenance' },
  { id: 'comfort', label: 'Comfort & Warmth' },
  { id: 'style', label: 'Style & Aesthetics' },
  { id: 'budget', label: 'Budget-Friendly' },
  { id: 'all', label: 'All of the Above' }
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
    currentStep: 1
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Progress bar */}
        <div className="mb-8">
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

        {/* Step 1: Room Selection */}
        {quizState.currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Which rooms need new flooring?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {roomOptions.map(room => (
                <button
                  key={room.id}
                  onClick={() => handleRoomSelect(room.id)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    quizState.rooms.includes(room.id)
                      ? 'border-[#00603A] bg-[#00603A] text-white'
                      : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-[#00603A] hover:bg-gray-100'
                  }`}
                >
                  {room.label}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNext}
                disabled={quizState.rooms.length === 0}
                className="px-6 py-2 bg-[#00603A] text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Primary Considerations */}
        {quizState.currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What's most important for your space?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {primaryConsiderations.map(consideration => (
                <button
                  key={consideration.id}
                  onClick={() => handlePrimaryConsiderationSelect(consideration.id)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    quizState.primaryConsideration === consideration.id
                      ? 'border-[#00603A] bg-[#00603A] text-white'
                      : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-[#00603A] hover:bg-gray-100'
                  }`}
                >
                  {consideration.label}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
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

        {/* Step 3: Household Factors */}
        {quizState.currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Who uses this space?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {householdFactors.map(factor => (
                <button
                  key={factor.id}
                  onClick={() => handleHouseholdFactorSelect(factor.id)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    quizState.householdFactors.includes(factor.id)
                      ? 'border-[#00603A] bg-[#00603A] text-white'
                      : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-[#00603A] hover:bg-gray-100'
                  }`}
                >
                  {factor.label}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
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

        {/* Step 4: Style Preferences */}
        {quizState.currentStep === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What's your preferred style?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stylePreferences.map(preference => (
                <button
                  key={preference.id}
                  onClick={() => handleStylePreferenceSelect(preference.id)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    quizState.stylePreference === preference.id
                      ? 'border-[#00603A] bg-[#00603A] text-white'
                      : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-[#00603A] hover:bg-gray-100'
                  }`}
                >
                  {preference.label}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
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

        {/* Step 5: Budget Range */}
        {quizState.currentStep === 5 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What's your budget per square metre?</h2>
            <div className="grid grid-cols-1 gap-4">
              {budgetRanges.map(range => (
                <button
                  key={range.id}
                  onClick={() => handleBudgetRangeSelect(range.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    quizState.budgetRange === range.id
                      ? 'border-[#00603A] bg-[#00603A] text-white'
                      : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-[#00603A] hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium">{range.label}</div>
                  <div className="text-sm opacity-80">{range.description}</div>
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
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
                Get Recommendations
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {quizState.currentStep === 6 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Recommended Flooring</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-[#00603A] mb-2">
                Primary Recommendation: {getRecommendations().primaryType}
              </h3>
              <p className="text-gray-700 mb-4">
                Based on your preferences and requirements, we recommend {getRecommendations().primaryType} flooring.
              </p>
              
              <h4 className="font-semibold text-gray-900 mt-4 mb-2">Alternative Options:</h4>
              <ul className="list-disc list-inside text-gray-700">
                {getRecommendations().alternatives.map((alt, index) => (
                  <li key={index}>{alt}</li>
                ))}
              </ul>

              {(getRecommendations().considerations.children || 
                getRecommendations().considerations.pets || 
                getRecommendations().considerations.wheelchair) && (
                <div className="mt-4 p-4 bg-[#00603A]/10 rounded-lg">
                  <h4 className="font-semibold text-[#00603A] mb-2">Special Considerations:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {getRecommendations().considerations.children && (
                      <li>Child-friendly flooring with good slip resistance</li>
                    )}
                    {getRecommendations().considerations.pets && (
                      <li>Pet-friendly flooring with scratch resistance</li>
                    )}
                    {getRecommendations().considerations.wheelchair && (
                      <li>Wheelchair-friendly flooring with smooth transitions</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {getRecommendations().products.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow p-4">
                  <div className="aspect-w-1 aspect-h-1 mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover rounded-lg"
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
                View All Products
              </button>
              <button
                onClick={() => router.push('/finder')}
                className="px-6 py-3 border-2 border-[#00603A] text-[#00603A] rounded-lg hover:bg-[#00603A] hover:text-white transition-colors"
              >
                Find More Options
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 