import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-16 px-4 max-w-3xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-6 tracking-tighter">
        Every Pair Tells A<br/>Story Here's Theirs
      </h2>
      <div className="flex justify-center items-center gap-2 mb-12">
        <div className="flex -space-x-3">
          <img src="https://i.pravatar.cc/100?img=33" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
          <img src="https://i.pravatar.cc/100?img=12" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
          <img src="https://i.pravatar.cc/100?img=47" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
        </div>
        <p className="font-bold text-sm text-brand-yellow">★ 4.7 <span className="text-gray-400 font-normal">Ratings</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-[#F9F9F9] p-6 rounded-3xl border border-gray-100">
            <div className="text-gray-300 text-4xl font-serif mb-2">"</div>
            <p className="text-gray-500 text-xs leading-relaxed mb-6">
              The FlexNova 25 are unbelievably light! Wore them all day on a trip and my feet felt perfect. 10/10 would buy again!
            </p>
            <div className="flex items-center gap-3">
              <img src={`https://i.pravatar.cc/100?img=${item * 10}`} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="font-bold text-xs">Customer Name</p>
                <p className="text-gray-400 text-[10px]">Verified Buyer</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
