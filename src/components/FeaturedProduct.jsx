import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';
import CachedImage from './CachedImage';

const FeaturedProduct = () => {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  // Using a specific product from our realistic data
  const product = products.find(p => p.name === 'Alo X') || products[1];
  
  const [size, setSize] = useState('US 9');
  const [color, setColor] = useState('White');

  const handleAddToCart = () => {
    if (!currentUser) {
      addToast("Please login first to cop items.", "error");
      navigate('/auth');
      return;
    }
    addToCart(product, size, color);
    addToast(`${product.name} added to drip bag!`, "success");
    navigate('/checkout');
  };

  return (
    <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="relative rounded-[40px] flex flex-col lg:flex-row overflow-hidden border border-white/10 bg-black/40 backdrop-blur-3xl shadow-2xl">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Left Side - Image Gallery */}
        <div className="lg:w-1/2 p-4 md:p-8 relative z-10">
          <div className="relative w-full aspect-square md:h-[600px] rounded-[30px] overflow-hidden bg-white/5 border border-white/10 group shadow-2xl">
            <CachedImage 
              src={product.images[0]} 
              alt={product.name} 
              className="absolute inset-0 w-full h-full object-cover mix-blend-normal transition-transform duration-700 group-hover:scale-105" 
            />
            {/* Premium Badge */}
            <div className="absolute top-6 left-6 bg-brand-yellow text-black font-black uppercase tracking-widest text-xs px-4 py-2 rounded-full">
              Exclusive
            </div>
          </div>
          
          <div className="flex gap-4 mt-4 overflow-x-auto hide-scrollbar pb-2">
             <div className="w-24 h-24 rounded-2xl bg-white/5 p-1 border-2 border-brand-yellow shrink-0 overflow-hidden">
                <CachedImage src={product.images[0]} className="w-full h-full object-cover rounded-xl" />
             </div>
             <div className="w-24 h-24 rounded-2xl bg-white/5 p-1 border border-white/20 shrink-0 overflow-hidden hover:border-white/50 transition-colors cursor-pointer">
                <CachedImage src={product.images[1]} className="w-full h-full object-cover rounded-xl" />
             </div>
             {product.images[2] && (
               <div className="w-24 h-24 rounded-2xl bg-white/5 p-1 border border-white/20 shrink-0 overflow-hidden hover:border-white/50 transition-colors cursor-pointer">
                  <CachedImage src={product.images[2]} className="w-full h-full object-cover rounded-xl" />
               </div>
             )}
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center relative z-10">
          <p className="text-brand-yellow font-bold uppercase tracking-widest text-sm mb-3">Featured Drop</p>
          <h2 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tighter leading-[0.9] text-white">
            {product.name}
          </h2>
          
          <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-md font-medium">
            {product.description} Built for the streets, designed for the culture. Secure your pair before they vanish.
          </p>

          <div className="flex items-center gap-6 mb-10 pb-10 border-b border-white/10">
            <span className="text-5xl font-black text-white">${product.price}</span>
            <div className="w-px h-12 bg-white/10"></div>
            <div className="flex flex-col">
              <div className="flex text-brand-yellow text-sm mb-1">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <span className="font-bold text-sm text-gray-300">4.9 (12.4k Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-10">
            <div>
              <h4 className="font-bold mb-3 text-xs uppercase tracking-widest text-gray-400">Select Size</h4>
              <select value={size} onChange={(e) => setSize(e.target.value)} className="w-full border border-white/20 rounded-xl px-4 py-4 bg-white/5 text-white text-sm font-bold focus:outline-none focus:border-brand-yellow appearance-none cursor-pointer">
                <option value="US 8" className="bg-brand-dark">US 8</option>
                <option value="US 9" className="bg-brand-dark">US 9</option>
                <option value="US 10" className="bg-brand-dark">US 10</option>
              </select>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-xs uppercase tracking-widest text-gray-400">Colorway</h4>
              <select value={color} onChange={(e) => setColor(e.target.value)} className="w-full border border-white/20 rounded-xl px-4 py-4 bg-white/5 text-white text-sm font-bold focus:outline-none focus:border-brand-yellow appearance-none cursor-pointer">
                <option value="Default" className="bg-brand-dark">Default</option>
                <option value="Alternate" className="bg-brand-dark">Alternate</option>
              </select>
            </div>
          </div>

          <button onClick={handleAddToCart} className="w-full py-5 bg-brand-yellow text-black rounded-full font-black uppercase tracking-widest shadow-[0_0_40px_rgba(215,255,0,0.3)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-3">
            Add to Drip Bag
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
