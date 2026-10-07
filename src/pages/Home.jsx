import React from 'react';
import ProductGrid from '../components/ProductGrid';
import FeaturedProduct from '../components/FeaturedProduct';
import Testimonials from '../components/Testimonials';
import ElevateBanner from '../components/ElevateBanner';
import NextLevel from '../components/NextLevel';
import Footer from '../components/Footer';
import { ArrowDown } from 'lucide-react';

const Home = () => {
  const handleScroll = () => {
    document.getElementById('explore').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="bg-brand-dark min-h-screen pb-20">
      <section className="px-4 md:px-8 max-w-7xl mx-auto pt-32 pb-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 z-10 relative">
          <div>
            <h1 className="text-[5rem] md:text-[7rem] font-black uppercase tracking-tighter leading-[0.85] mb-2 text-white">
              REIMAGINED<br/>
              <span className="text-brand-yellow">COMFORT</span>
            </h1>
            <p className="mt-8 text-gray-300 max-w-[200px] font-medium leading-tight">Comfort Evolved.<br/>Style Perfected.</p>
          </div>
          <div className="mt-10 md:mt-0 text-right flex flex-col items-end">
            <p className="text-gray-300 max-w-[250px] mb-6 text-sm">
              Built For Every Mood, Every Outfit, And Every Move Lace Up And Show Vibe.
            </p>
            <div className="flex gap-2 justify-end bg-white/10 p-1 rounded-full backdrop-blur-sm">
              <button className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm">Comfort</button>
              <button className="px-6 py-2 bg-brand-yellow text-black rounded-full font-bold text-sm">Style</button>
              <button className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm">Trendy</button>
            </div>
            
            <div className="mt-40 text-right hidden md:block">
              <h3 className="text-3xl font-bold mb-1 text-white">Flash Drop 25%</h3>
              <p className="text-gray-400 text-sm">Our All New Arrival</p>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[65vh] rounded-[40px] overflow-hidden -mt-32 z-0 border-[8px] border-transparent">
          <img src="https://images.unsplash.com/photo-1552346154-21d32810baa3?auto=format&fit=crop&w=2000&q=80" alt="Hero Shoe" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 flex items-center gap-3">
            <div className="flex -space-x-3">
              <img src="https://i.pravatar.cc/100?img=11" className="w-10 h-10 rounded-full border-2 border-brand-dark z-30 object-cover" />
              <img src="https://i.pravatar.cc/100?img=12" className="w-10 h-10 rounded-full border-2 border-brand-dark z-20 object-cover" />
              <img src="https://i.pravatar.cc/100?img=13" className="w-10 h-10 rounded-full border-2 border-brand-dark z-10 object-cover" />
            </div>
            <div>
              <p className="font-bold text-sm text-white">4.8/5 From 12,000+</p>
              <p className="text-gray-400 text-xs">Customers</p>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 flex flex-col items-center">
            <button onClick={handleScroll} className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-md hover:bg-white/20 transition-colors mb-2 text-white">
              <ArrowDown size={18} />
            </button>
            <span className="text-[10px] text-gray-300">Scroll To Explore</span>
          </div>
        </div>
      </section>
      
      <div id="explore" className="bg-white rounded-t-[40px] pt-16">
        {/* Lifestyle Collage Section */}
        <section id="about" className="px-4 md:px-12 max-w-7xl mx-auto mb-20 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-5xl font-black leading-tight text-black mb-4">
              Not Just Shoes<br/>A Lifestyle
            </h2>
            <p className="text-gray-500 mb-8 max-w-xs text-sm">
              Every Pair Is Designed To Match Your Grind, Your Goals, And Your Style Comfort.
            </p>
            <button className="px-6 py-2.5 bg-brand-yellow text-black rounded-full font-bold text-sm">
              Live The Style
            </button>
          </div>
          <div className="lg:w-2/3 grid grid-cols-3 gap-4 h-[400px]">
            <div className="flex flex-col gap-4 h-full">
              <img src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=80" className="w-full h-1/2 object-cover rounded-3xl" />
              <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80" className="w-full h-1/2 object-cover rounded-3xl" />
            </div>
            <div className="h-full">
               <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover rounded-3xl" />
            </div>
            <div className="flex flex-col gap-4 h-full">
              <img src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=400&q=80" className="w-full h-1/2 object-cover rounded-3xl" />
              <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80" className="w-full h-1/2 object-cover rounded-3xl" />
            </div>
          </div>
        </section>

        <div id="drops">
          <ProductGrid />
        </div>
        <FeaturedProduct />
        <Testimonials />
        <ElevateBanner />
        <NextLevel />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
