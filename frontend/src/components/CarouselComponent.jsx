import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";

const CarouselComponent = ({ cards, activeIndex, setActiveIndex }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${activeIndex * 100}%)`;
    }
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <Carousel className="w-full h-full">
      <div className="relative w-full h-full overflow-hidden">
        <CarouselContent
          ref={carouselRef}
          className="h-full flex transition-transform duration-700 ease-in-out"
        >
          {cards.map((card, index) => (
            <CarouselItem key={index} className="w-full flex-shrink-0 aspect-video">
              <div className="p-1 h-full flex items-center justify-center">
                <Card className="w-full h-full relative overflow-hidden rounded-lg shadow-lg">
                  {/* Background Image */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover brightness-50"
                  />

                  {/* Content Overlay */}
                  <CardContent className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white text-center">
                    <h3 className="text-2xl font-bold">{card.title}</h3>
                    <p className="text-sm mt-2">{card.description}</p>
                  </CardContent>

                  {/* Footer Overlay - Fixed at Bottom */}
                  <CardFooter className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4 flex justify-between items-center">
                    <div className="flex gap-5">
                      <Button variant="outline">{card.category}</Button>
                      <Button variant="secondary">{card.article}</Button>
                    </div>
                    <button className="text-white">
                      <Bookmark />
                    </button>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Navigation */}
        <CarouselPrevious onClick={handlePrev} />
        <CarouselNext onClick={handleNext} />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
