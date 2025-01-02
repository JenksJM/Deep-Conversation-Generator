'use client';

import React, { useState } from 'react';

const CardDeck = ({ cardsByCategory }) => {
  const [currentCategory, setCurrentCategory] = useState(Object.keys(cardsByCategory)[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % cardsByCategory[currentCategory].length
      );
      setIsAnimating(false);
    }, 500); // Match animation duration
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setCurrentIndex(0); // Reset to the first card in the new category
  };

  return (
    <div className="flex flex-col items-center">
      {/* Category Selector */}
      <div className="flex gap-4 mb-4">
        {Object.keys(cardsByCategory).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded ${
              currentCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-black hover:bg-gray-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Card Display */}
      <div className="relative w-64 h-64">
        {cardsByCategory[currentCategory].map((card, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-red-500 text-white rounded-lg p-4 flex items-center justify-center text-center transition-transform duration-500 ease-out
              ${
                index === currentIndex
                  ? isAnimating
                    ? 'z-10 animate-draw-card'
                    : 'z-10'
                  : 'z-0 scale-95'
              }`}
            style={{
              transform: index < currentIndex ? 'translateY(-200%)' : undefined,
              opacity: index < currentIndex ? 0 : 1,
            }}
          >
            {card}
          </div>
        ))}
      </div>

      {/* Next Card Button */}
      <button
        onClick={handleNext}
        className="mt-4 bg-gray-300 text-black rounded px-3 py-1 hover:bg-gray-400"
        disabled={isAnimating}
      >
        Draw Next Card
      </button>
    </div>
  );
};

export default CardDeck;
