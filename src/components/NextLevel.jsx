import React from 'react';
import { products } from '../data/products';
import CachedImage from './CachedImage';

const NextLevel = () => {
  return (
    <section className="py-20 px-4 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-white">
      <div className="md:w-1/2 mb-10 md:mb-0">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-6 text-black">
          Your Next Level Kicks<br/>Just Dropped
        </h2>
        <button className="px-8 py-3 bg-brand-yellow text-black rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
          The Bag
        </button>
      </div>
      <div className="md:w-1/2 flex justify-end">
        <div className="flex flex-col gap-4">
          <div className="w-32 h-20 rounded-2xl shadow-md border-2 border-white rotate-3 hover:rotate-0 transition-transform cursor-pointer overflow-hidden bg-white">
            <CachedImage src={products[0].images[0]} className="w-full h-full" />
          </div>
          <div className="w-32 h-20 rounded-2xl shadow-md border-2 border-white -rotate-3 hover:rotate-0 transition-transform cursor-pointer overflow-hidden bg-white">
            <CachedImage src={products[1].images[0]} className="w-full h-full" />
          </div>
          <div className="w-32 h-20 rounded-2xl shadow-md border-2 border-white rotate-2 hover:rotate-0 transition-transform cursor-pointer overflow-hidden bg-white">
            <CachedImage src={products[2].images[0]} className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextLevel;
