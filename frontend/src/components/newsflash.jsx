import React from 'react';
import Ndtv from '@/assets/ndtv.png';

const NewsFlash = () => {
  const openArticle = () => {
    window.open("https://www.google.com/", "_blank");
  };

  return (
    <div className="max-w-full p-4 cursor-pointer" onClick={openArticle}>
      <div className="flex items-center mb-2">
        <img src={Ndtv} alt="Logo" className="w-6 h-6 rounded-full mr-3" />
        <h2 className="text-lg font-bold">News Aggregator Website</h2>
      </div>
      <p className="text-gray-600 hover:underline hover:opacity-80 transition">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium neque quibusdam autem quas consequuntur dolorum veniam quis recusandae voluptates rem.
      </p>
    </div>
  );
};

export default NewsFlash;
