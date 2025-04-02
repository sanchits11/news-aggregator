import React, { useState, useEffect } from "react";
import Cardcomponent from "@/components/CardComponent";
import CarouselComponent from "@/components/CarouselComponent";
import { WarpBackground } from "@/components/magicui/warp-background";

const cardData = [
  { 
    image: "https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    title: "Serene Waters", 
    description: "Experience the calmness of nature with this breathtaking view of the ocean.", 
    category: "Nature",
    article: "Click here"
  },
  { 
    image: "https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    title: "Majestic Mountains", 
    description: "Climb the peaks and witness the beauty of untouched landscapes.", 
    category: "Adventure",
    article: "Click here"
  },
  { 
    image: "https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    title: "City Lights", 
    description: "Your guide to the vibrant nightlife and culture of the city.", 
    category: "Urban",
    article: "Click here"
  },
  { 
    image: "https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    title: "Deep Forest", 
    description: "Take a deep breath and immerse yourself in the tranquility of nature.", 
    category: "Wildlife",
    article: "Click here"
  },
  { 
    image: "https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    title: "Golden Sands", 
    description: "A mesmerizing sunset over the vast and endless desert dunes.", 
    category: "Desert",
    article: "Click here"
  },
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
          <div className="w-[600px] h-full scale-125 transition-transform duration-500">
            <CarouselComponent 
              cards={cardData} 
              activeIndex={activeIndex} 
              setActiveIndex={setActiveIndex} 
            />
          </div>
        </div>

        {/* Smaller Cards Below */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          {cardData.map((card, index) => (
            <div
              key={index}
              className={`transition-opacity duration-500 cursor-pointer ${
                index === activeIndex ? "opacity-100" : "opacity-50"
              }`}
              onClick={() => handleCardClick(index)}
            >
              <Cardcomponent 
                image={card.image}
                title={card.title} 
                description={card.description}
                category={card.category}
                article={card.article}
              />
            </div>
          ))}
        </div>
      </div>
  );
};

export default MainPage;
