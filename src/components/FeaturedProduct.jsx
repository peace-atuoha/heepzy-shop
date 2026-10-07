import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';
import CachedImage from './CachedImage';

const FeaturedProduct = () => {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  // Using a specific product from our realistic data
  const product = products.find(p => p.name === 'Alo X') || products[1];
  
  const [size, setSize] = useState('US 9');
  const [color, setColor] = useState('White');

  const handleAddToCart = () => {
    if (!currentUser) {
      alert("Please login first to add items to your cart.");
      return;
    }
    addToCart(product, size, color);
    navigate('/checkout');
  };

  return (
    <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="bg-[#F6F6F6] rounded-[40px] flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side - Image */}
        <div className="lg:w-1/2 p-4">
          <div className="relative w-full h-[500px] rounded-[30px] overflow-hidden">
            <CachedImage 
              src={product.images[0]} 
              alt={product.name} 
              className="absolute inset-0 w-full h-full" 
            />
          </div>
          <div className="flex gap-2 mt-4">
             <div className="w-1/4 aspect-square rounded-2xl bg-white p-2 border-2 border-brand-yellow">
                <CachedImage src={product.images[0]} className="w-full h-full" />
             </div>
             <div className="w-1/4 aspect-square rounded-2xl bg-white p-2">
                <CachedImage src={product.images[1]} className="w-full h-full" />
             </div>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
          <h2 className="text-6xl font-black mb-6 uppercase tracking-tighter">{product.name}</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl font-bold">${product.price}.00</span>
            <div className="flex text-brand-yellow">
              {'★★★★★'.split('').map((star, i) => (
                <span key={i} className="text-lg">{star}</span>
              ))}
            </div>
            <span className="font-bold text-lg">4.5</span>
          </div>

          <div className="mb-8">
            <h4 className="font-bold mb-4 text-sm">Available Options:</h4>
            <div className="flex gap-4">
              <div className="flex-1 bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-100">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🎁</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400">To Order</p>
                  <p className="font-bold text-lg">$2,580</p>
                </div>
              </div>
              <div className="flex-1 bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-100">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">📈</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400">In Stock</p>
                  <p className="font-bold text-lg">$5,980</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-bold mb-3 text-sm">size Chart</h4>
            <div className="flex gap-3">
              <select value={size} onChange={(e) => setSize(e.target.value)} className="flex-1 border border-gray-200 rounded-full px-4 py-2 bg-white text-sm font-semibold">
                <option>US 8</option>
                <option>US 9</option>
                <option>US 10</option>
              </select>
              <select value={color} onChange={(e) => setColor(e.target.value)} className="flex-1 border border-gray-200 rounded-full px-4 py-2 bg-white text-sm font-semibold">
                <option>White</option>
                <option>Black</option>
              </select>
              <button className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          <button onClick={handleAddToCart} className="w-full py-4 bg-white text-black border border-gray-200 rounded-full font-bold shadow-sm hover:bg-gray-50 transition-colors text-sm">
            My Drip Bag
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
