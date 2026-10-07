import React from 'react';

const ElevateBanner = () => {
  return (
    <section className="mt-20">
      <div className="relative w-full h-[600px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1548344158-b610c3707c2a?auto=format&fit=crop&w=1600&q=80" 
          alt="Elevate" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 p-12 md:p-24 flex flex-col items-end justify-start text-right">
          <h2 className="text-8xl md:text-[9rem] font-black uppercase text-white tracking-tighter leading-none mb-4 opacity-90">
            Elevate
          </h2>
          <p className="text-white max-w-md text-sm md:text-base mb-6 leading-relaxed bg-black/30 p-4 rounded-xl backdrop-blur-sm">
            The Latest Omni 9 Collection Is Here. Bold Looks, Wild Comfort, And Limited Time Offers That Hit Different. Step Up Your Style Game Before It's Gone.
          </p>
          <p className="text-white/80 font-serif italic text-3xl">Omni 9</p>
        </div>
      </div>
    </section>
  );
};

export default ElevateBanner;
