import React, { useState, useEffect } from 'react';
import Cardcomponent from '@/components/cardcomponent';

const cardData = [
  { title: "Card 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { title: "Card 2", description: "Short text." },
  { title: "Card 3", description: "This is a slightly longer description to test wrapping behavior." },
  { title: "Card 4", description: "Another short text." },
  { title: "Card 5", description: "Testing overflow handling with a very long description to see how it looks." },
  { title: "Card 6", description: "Final test case." },
];

const MainPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cardData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-16">
      {/* Main Enlarged Card */}
      <div className="w-[90vw] h-[50vh] flex items-center justify-center">
        <div className="w-[600px] scale-125 transition-transform duration-500">
          <Cardcomponent title={cardData[activeIndex].title} description={cardData[activeIndex].description} />
        </div>
      </div>

      {/* Smaller Cards Below */}
      <div className="mt-12 grid grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`transition-opacity duration-500 cursor-pointer ${index === activeIndex ? 'opacity-100' : 'opacity-50'}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="scale-75">
              <Cardcomponent title={card.title} description={card.description} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
