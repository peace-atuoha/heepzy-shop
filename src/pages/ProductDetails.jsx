import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CachedImage from '../components/CachedImage';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id)) || products[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  // Full screen states
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const [size, setSize] = useState('US 9');
  const [color, setColor] = useState('White');

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev + 1) % product.images.length);
    setZoomLevel(1);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    setZoomLevel(1);
  };

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };
  
  const handleAddToCart = () => {
    addToCart(product, size, color);
    navigate('/checkout');
  };

  return (
    <div className="bg-gray-100 text-black min-h-screen pt-10 rounded-t-[40px] mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <Link to="/" className="text-gray-500 font-semibold mb-8 inline-block hover:text-black">
          ← Back to Shop
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div 
              className="relative w-full aspect-square rounded-3xl overflow-hidden bg-white cursor-zoom-in group p-4 border border-gray-200"
              onClick={() => setIsFullscreen(true)}
            >
              <CachedImage 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full"
              />
              <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-10">
                <ZoomIn size={20} />
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 bg-white ${selectedImage === idx ? 'border-brand-yellow' : 'border-transparent'}`}
                >
                  <CachedImage src={img} alt="thumbnail" className="w-full h-full p-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-5xl font-black mb-2 uppercase">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed max-w-md">
              {product.description}
            </p>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold">${product.price}.00</span>
              <div className="flex text-brand-yellow">
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <span className="text-sm font-semibold">4.5</span>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-3 text-lg">Size Chart</h3>
              <div className="flex gap-4 mb-4">
                <select value={size} onChange={(e)=>setSize(e.target.value)} className="border-b border-black pb-2 bg-transparent font-semibold focus:outline-none flex-1">
                  <option>US 8</option>
                  <option>US 9</option>
                  <option>US 10</option>
                  <option>US 11</option>
                </select>
                <select value={color} onChange={(e)=>setColor(e.target.value)} className="border-b border-black pb-2 bg-transparent font-semibold focus:outline-none flex-1">
                  <option>White</option>
                  <option>Black</option>
                </select>
                <button className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center text-black shadow-md">
                  <Heart size={18} />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={handleAddToCart} className="flex-1 py-4 bg-black text-white text-center rounded-xl font-bold hover:bg-gray-800 transition-colors">
                My Drip Bag
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Viewer */}
      {isFullscreen && (
        <div className="fullscreen-overlay" onClick={() => setIsFullscreen(false)}>
          {/* Controls */}
          <div className="absolute top-6 right-6 flex gap-4 z-50">
            <button onClick={handleZoomOut} className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/30 backdrop-blur-md">
              <ZoomOut size={24} />
            </button>
            <button onClick={handleZoomIn} className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/30 backdrop-blur-md">
              <ZoomIn size={24} />
            </button>
            <button onClick={() => setIsFullscreen(false)} className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/30 backdrop-blur-md">
              <X size={24} />
            </button>
          </div>

          <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/30 backdrop-blur-md z-50">
            <ChevronLeft size={32} />
          </button>
          <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/30 backdrop-blur-md z-50">
            <ChevronRight size={32} />
          </button>

          <div className="fullscreen-img-container" onClick={(e) => e.stopPropagation()}>
            <img 
              src={product.images[selectedImage]} 
              alt="Fullscreen" 
              className="fullscreen-img"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
