import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import CachedImage from './CachedImage';

const HoverImage = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 1000);
    } else {
      setCurrentIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images]);

  return (
    <div 
      className="relative w-full pb-[100%] rounded-[30px] overflow-hidden bg-[#F9F9F9] mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 p-4">
        <CachedImage 
          src={images[currentIndex]} 
          alt="Product" 
          className="w-full h-full"
        />
      </div>
      <div className="absolute top-4 right-4 text-red-500 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent navigating to product details
    addToCart(product, 'US 9', 'Default');
    navigate('/checkout'); // Direct them to checkout or just show a toast (I'll just add it)
  };

  return (
    <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto bg-white text-black">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-200 pb-8">
        <h2 className="text-4xl md:text-[2.5rem] font-black leading-tight">
          Your Everyday<br/>Style Upgrade
        </h2>
        <div className="flex flex-col items-end">
          <p className="text-gray-400 text-xs text-right max-w-[200px] mb-4">
            Level Up Your Daily Look With Shoes That Blend Comfort, Attitude, And Effortless Style.
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 w-full max-w-lg hide-scrollbar">
            {['All', 'Fresh Fits', 'Heavy Heat', 'Go Flow', 'Slide Zone', 'Core Edit'].map((cat, i) => (
              <button key={i} className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border ${i === 0 ? 'bg-brand-yellow border-brand-yellow text-black' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer border border-gray-100 rounded-[35px] p-4 hover:shadow-lg transition-shadow block">
            <HoverImage images={product.images} />
            <div className="px-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-500 text-sm">{product.name}</h3>
                <p className="font-bold text-xl text-black">${product.price}</p>
              </div>
              <button onClick={(e) => handleAddToCart(e, product)} className="w-full py-3 bg-white border border-gray-200 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors rounded-full font-bold text-sm text-black">
                Add To Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
