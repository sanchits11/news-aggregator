import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Cardcomponent from '@/components/cardcomponent';


const ExplorePage = () => {
  const [cards, setCards] = useState([]);

  const addCard = () =>{
    setCards([...cards, {title: `Card ${cards.length+1}`, description: `Description of card ${cards.length+1}`}])
    console.log(cards)
  }

  return (
    <div className='flex justify-center items-center h-screen overflow-hidden'>
      <motion.div
        className='grid grid-cols-4 gap-10'
        animate={{ y: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <Button variant='outline' onClick={addCard} >Business</Button>
        <div>
          {cards.map((card, index)=> (
            <Cardcomponent key={index} title={card.title} description={card.description}/>
          ))}
        </div>
        {/* <Button variant='outline'>Entertainment</Button>
        <Button variant='outline'>General</Button>
        <Button variant='outline'>Health</Button>
        <Button variant='outline'>Science</Button>
        <Button variant='outline'>Sports</Button>
        <Button variant='outline'>Technology</Button>
        <Button variant='outline'>Others</Button> */}
      </motion.div>
    </div>
  );
};

export default ExplorePage;