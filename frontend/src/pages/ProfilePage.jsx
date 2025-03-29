import React from 'react'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Cardcomponent from '@/components/cardcomponent'
import Image from "@/assets/image.png"

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
            <Cardcomponent/>
            <Cardcomponent/>
            <Cardcomponent/>
            <Cardcomponent/>
            <Cardcomponent/>
            <Cardcomponent/>
          </div>
        </section>
      </main>
    </React.Fragment>
  )
}

export default ProfilePage
