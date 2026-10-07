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
        {/* Artistic Lifestyle Section */}
        <section id="about" className="px-4 md:px-12 max-w-7xl mx-auto my-32 flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="lg:w-1/2 relative z-10">
            <div className="inline-block px-5 py-1.5 rounded-full bg-yellow-100 text-yellow-700 font-bold text-xs uppercase tracking-widest mb-6">
              The Lookbook
            </div>
            <h2 className="text-[4rem] md:text-[5.5rem] font-black leading-[0.85] text-black mb-8 uppercase tracking-tighter">
              Not Just<br/>Shoes. <span className="text-gray-300">A</span><br/>Lifestyle.
            </h2>
            <p className="text-gray-500 mb-10 max-w-md text-lg leading-relaxed font-medium">
              Elevate your everyday rotation. We curate footwear that blends uncompromised comfort with high-end street aesthetic. 
              Find your next grail and walk your own path.
            </p>
            <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-black rounded-full overflow-hidden transition-all hover:scale-105 shadow-xl">
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-brand-yellow rounded-full group-hover:w-64 group-hover:h-56"></span>
              <span className="relative group-hover:text-black transition-colors uppercase tracking-widest text-sm">Explore The Culture</span>
            </button>
          </div>

          {/* Artistic Image Composition */}
          <div className="lg:w-1/2 relative h-[500px] md:h-[650px] w-full mt-12 lg:mt-0">
            {/* Background glowing blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200/50 rounded-full blur-3xl -z-10"></div>
            
            {/* Image 1 - Main Center/Right */}
            <div className="absolute top-0 right-0 w-3/4 h-[350px] md:h-[450px] rounded-[40px] overflow-hidden shadow-2xl z-20 transition-transform duration-700 hover:scale-[1.02]">
              <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80" alt="Pastel Sneakers" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="font-bold uppercase tracking-widest text-xs mb-1 text-yellow-300">Editor's Pick</p>
                <p className="text-2xl font-black tracking-tight">Air Force 1 Pastel</p>
              </div>
            </div>

            {/* Image 2 - Bottom Left Overlapping */}
            <div className="absolute bottom-0 md:bottom-10 left-0 w-[55%] h-[250px] md:h-[350px] rounded-[35px] overflow-hidden shadow-2xl z-30 border-[10px] border-white transition-transform duration-700 hover:-translate-y-4">
              <img src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80" alt="Bright Yellow Sneakers" className="w-full h-full object-cover" />
            </div>

            {/* Image 3 - Floating Top Left */}
            <div className="absolute -top-5 md:-top-10 left-5 md:left-10 w-1/3 h-[180px] md:h-[220px] rounded-[24px] overflow-hidden shadow-xl z-10 transition-transform duration-700 hover:rotate-6">
              <img src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80" alt="Action Shot" className="w-full h-full object-cover" />
            </div>
            
            {/* Floating Glass Element */}
            <div className="absolute bottom-10 -right-5 md:right-10 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl z-40 border border-white flex items-center gap-4 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-brand-yellow font-black">
                +4k
              </div>
              <div className="pr-2">
                <p className="font-black text-sm text-black uppercase tracking-tight">New Styles</p>
                <p className="text-xs text-gray-500 font-bold">Added Weekly</p>
              </div>
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
