import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Heart, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CachedImage from '../components/CachedImage';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id)) || products[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Full screen states
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [added, setAdded] = useState(false);
  
  const [size, setSize] = useState('US 9');
  const [color, setColor] = useState('Default');

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
    if (!currentUser) {
      alert("Please login first to add items to your cart.");
      navigate('/auth');
      return;
    }
    addToCart(product, size, color);
    setAdded(true);
    setTimeout(() => {
      navigate('/checkout');
    }, 1000);
  };

  return (
    <div className="bg-brand-dark text-white min-h-screen pt-32 pb-20 selection:bg-brand-yellow selection:text-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Link to="/" className="text-gray-400 font-bold mb-8 inline-flex items-center gap-2 hover:text-white transition-colors uppercase text-sm tracking-widest">
          <ArrowLeft size={16} /> Back to Collection
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Details - Left Side */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            <div className="mb-2">
              <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm">{product.brand}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter leading-[0.9]">{product.name}</h1>
            
            <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">
              {product.description} Built for those who demand the best in both style and performance.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 mb-12">
              <span className="text-4xl md:text-5xl font-black">${product.price}</span>
              <div className="h-10 w-px bg-white/20 hidden md:block"></div>
              <div className="flex items-center gap-2 text-brand-yellow bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <span className="text-xl">★</span>
                <span className="font-bold text-white">4.8</span>
                <span className="text-gray-400 text-sm">(124 Reviews)</span>
              </div>
            </div>

            <div className="space-y-6 mb-12 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Select Size</span>
                  <span className="text-sm font-bold text-brand-yellow cursor-pointer hover:underline">Size Guide</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {['US 8', 'US 9', 'US 10', 'US 11'].map(s => (
                    <button 
                      key={s}
                      onClick={() => setSize(s)}
                      className={`py-3 rounded-xl font-bold text-sm transition-colors border ${size === s ? 'bg-white text-black border-white' : 'bg-transparent text-gray-300 border-white/20 hover:border-white/60'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart} 
                disabled={added}
                className={`flex-1 py-5 rounded-full font-black text-lg uppercase tracking-wider transition-all flex items-center justify-center gap-3 ${added ? 'bg-green-500 text-black hover:scale-100' : 'bg-brand-yellow text-black hover:scale-[1.02]'}`}
              >
                {added ? <><CheckCircle size={24} /> Added to Cart</> : 'Add to Cart'}
              </button>
              <button className="w-[68px] h-[68px] rounded-full border-2 border-white/20 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-colors">
                <Heart size={24} />
              </button>
            </div>
          </div>

          {/* Image Gallery - Right Side */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div 
              className="relative w-full aspect-[4/3] rounded-[40px] overflow-hidden bg-white cursor-zoom-in group p-4 md:p-10 border border-white/10 shadow-2xl"
              onClick={() => setIsFullscreen(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-white z-0"></div>
              <CachedImage 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover rounded-3xl z-10 relative drop-shadow-2xl"
              />
              <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20 text-white">
                <ZoomIn size={24} />
              </div>
            </div>
            
            <div className="flex gap-4 mt-6 overflow-x-auto pb-4 hide-scrollbar">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 bg-white transition-all ${selectedImage === idx ? 'border-brand-yellow scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <CachedImage src={img} alt={`thumbnail-${idx}`} className="w-full h-full object-cover p-1 rounded-xl" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Fullscreen Viewer */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-brand-dark/95 backdrop-blur-xl z-[100] flex items-center justify-center" onClick={() => setIsFullscreen(false)}>
          {/* Controls */}
          <div className="absolute top-8 right-8 flex gap-4 z-50">
            <button onClick={handleZoomOut} className="w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/30 backdrop-blur-md transition-colors">
              <ZoomOut size={24} />
            </button>
            <button onClick={handleZoomIn} className="w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/30 backdrop-blur-md transition-colors">
              <ZoomIn size={24} />
            </button>
            <button onClick={() => setIsFullscreen(false)} className="w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/30 backdrop-blur-md transition-colors">
              <X size={24} />
            </button>
          </div>

          <button onClick={prevImage} className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/30 backdrop-blur-md z-50 transition-colors hidden md:flex">
            <ChevronLeft size={36} />
          </button>
          <button onClick={nextImage} className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/30 backdrop-blur-md z-50 transition-colors hidden md:flex">
            <ChevronRight size={36} />
          </button>

          <div className="w-full max-w-5xl h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={product.images[selectedImage]} 
              alt="Fullscreen" 
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl transition-transform duration-300 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
