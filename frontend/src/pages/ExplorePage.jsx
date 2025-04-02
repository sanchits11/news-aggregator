import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Cardcomponent from '@/components/cardcomponent';

const ExplorePage = () => {
  const [cards, setCards] = useState([]);

  // Different sets of cards for each button
  const cardSets = [
    [
      { title: "Card A1", description: "First set - Card 1" },
      { title: "Card A2", description: "First set - Card 2" },
      { title: "Card A3", description: "First set - Card 3" }
    ],
    [
      { title: "Card B1", description: "Second set - Card 1" },
      { title: "Card B2", description: "Second set - Card 2" },
      { title: "Card B3", description: "Second set - Card 3" }
    ],
    [
      { title: "Card C1", description: "Third set - Card 1" },
      { title: "Card C2", description: "Third set - Card 2" },
      { title: "Card C3", description: "Third set - Card 3" }
    ],
    [
      { title: "Card D1", description: "Fourth set - Card 1" },
      { title: "Card D2", description: "Fourth set - Card 2" },
      { title: "Card D3", description: "Fourth set - Card 3" }
    ],
    [
      { title: "Card E1", description: "Fifth set - Card 1" },
      { title: "Card E2", description: "Fifth set - Card 2" },
      { title: "Card E3", description: "Fifth set - Card 3" }
    ],
    [
      { title: "Card F1", description: "Sixth set - Card 1" },
      { title: "Card F2", description: "Sixth set - Card 2" },
      { title: "Card F3", description: "Sixth set - Card 3" }
    ],
    [
      { title: "Card G1", description: "Seventh set - Card 1" },
      { title: "Card G2", description: "Seventh set - Card 2" },
      { title: "Card G3", description: "Seventh set - Card 3" }
    ],
    [
      { title: "Card H1", description: "Eighth set - Card 1" },
      { title: "Card H2", description: "Eighth set - Card 2" },
      { title: "Card H3", description: "Eighth set - Card 3" }
    ]
  ];

  const changeCards = (index) => {
    setCards(cardSets[index]); // Replace current cards with a new set
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">

      {/* Buttons */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-6">
        {cardSets.map((_, index) => (
          <Button key={index} variant="outline" onClick={() => changeCards(index)}>
            Close {index + 1}
          </Button>
        ))}
      </div>

      {/* Cards Display */}
      <div className="mt-6 inline-grid grid-cols-3 gap-6 max-w-fit">
        {cards.map((card, index) => (
          <Cardcomponent key={index} title={card.title} description={card.description} />
        ))}
      </div>

    </div>
  );
};

export default ExplorePage;
