import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark pt-20 px-4 md:px-12 rounded-t-[50px] mt-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-[8rem] md:text-[14rem] font-black text-brand-yellow/20 uppercase tracking-tighter leading-none mb-10 select-none">
          HEEPZY
        </h2>
        
        <div className="w-full bg-brand-yellow rounded-[40px] p-10 md:p-16 text-black relative z-10 -mt-24 mb-10 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-2">Step Into Your<br/>Best Style</h3>
            </div>
            <div className="mt-8 md:mt-0 text-right">
              <p className="font-semibold text-sm max-w-xs mb-4">Join our newsletter to get the latest releases and exclusive drops before anyone else.</p>
              <div className="flex bg-white rounded-full p-1 border border-black/10">
                <input type="email" placeholder="Your Email" className="bg-transparent outline-none px-4 flex-1 text-sm font-medium" />
                <button className="bg-black text-white px-6 py-2 rounded-full text-xs font-bold">Subscribe</button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-end mt-20 border-t border-black/10 pt-6">
             <p className="font-bold text-xs">© 2026 Heepzy. All Rights Reserved.</p>
             <div className="flex gap-6 font-bold text-xs">
                <a href="#" className="hover:underline">Terms</a>
                <a href="#" className="hover:underline">Privacy</a>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
