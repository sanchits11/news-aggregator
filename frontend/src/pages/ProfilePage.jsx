import React from 'react'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Cardcomponent from '@/components/cardcomponent'
import Image from "@/assets/image.png"

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

const ProfilePage = () => {
  return (
    <React.Fragment>
      <header className="bg-gray-900 text-white py-6 px-4 md:px-6">
        <div className="container mx-auto flex items-center">
          <div className="flex items-center">
            <Avatar className="mr-4 w-20 h-20">
              <AvatarImage src={Image} alt="Sarthak Pawar"/>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Sarthak Pawar</h1>
              <p className="text-gray-400">Deadass mf</p>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4 md:px-6">
        <section className="mb-8">
          
          <h2 className="text-xl font-bold mb-4">Your Favourite Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
          <div
            key={index}
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
        </section>
      </main>
    </React.Fragment>
  )
}

export default ProfilePage
