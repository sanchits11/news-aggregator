import React from 'react';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card";
import NewsFlash from '@/components/newsflash';

const openNews = () => {
  window.open("https://www.google.com","_blank");
}

const StoryPage = () => {
  return (
    <div>
        <div className="p-6 flex flex-col lg:flex-row gap-6 items-center lg:items-start">
        {/* Text Section */}
        <div className="lg:w-2/3 w-full space-y-4">
            <h2 className="text-3xl font-bold">Bruh</h2>
            <p className="text-gray-700 text-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptas, ipsam harum doloremque, cumque ab voluptatum, consequuntur facere sequi incidunt culpa quasi laudantium!</p>
            <p className="text-gray-700 text-lg">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptas, ipsam harum doloremque, cumque ab voluptatum, consequuntur facere sequi incidunt culpa quasi laudantium!</p>
            
          {/* Stats Section */}
          
        </div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:w-1/3 w-full"
        >
          <img src="https://images.unsplash.com/photo-1736606355698-5efdb410fe93?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-auto object-cover rounded-lg shadow-lg" />
        </motion.div>
      </div>
      <Sheet>
      <SheetTrigger>
        <Button>Familiar Articles</Button>
      </SheetTrigger>
      <SheetContent className="max-h-screen overflow-y-auto">
        <div className='flex items-start font-bold'>Familiar Articles</div>
        <NewsFlash/>
        <NewsFlash/>  
        <NewsFlash/>
        <NewsFlash/>
        <NewsFlash/>
        <NewsFlash/>
        <NewsFlash/>
        <NewsFlash/>
        <NewsFlash/>
        <NewsFlash/>
        <NewsFlash/>
        <NewsFlash/>
        <NewsFlash/>
      </SheetContent>
    </Sheet>
    </div>
  );
};

export default StoryPage;
