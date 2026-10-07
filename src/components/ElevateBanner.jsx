import React from 'react';

const ElevateBanner = () => {
  return (
    <section className="my-20 relative w-full h-[500px] overflow-hidden group">
      <img 
        src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=2000&q=80" 
        alt="Elevate Collection" 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="absolute inset-0 flex flex-col justify-center items-end px-4 md:px-20 max-w-7xl mx-auto">
        <h2 className="text-[6rem] md:text-[10rem] font-black text-white/90 uppercase tracking-tighter leading-none mix-blend-overlay">
          Elevate
        </h2>
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl max-w-sm mt-4 border border-white/30 mr-4">
          <p className="text-white text-sm font-medium leading-relaxed">
            The Latest Omni 9 Collection Is Here. Bold Looks, Wild Comfort, And Limited Time Offers That Hit Different. Step Up Your Style Game Before It's Gone.
          </p>
        </div>
        <p className="text-white text-3xl italic font-serif mt-4 mr-4 opacity-80">Omni 9</p>
      </div>
    </section>
  );
};

export default ElevateBanner;
