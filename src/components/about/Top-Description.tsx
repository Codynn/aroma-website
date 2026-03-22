import React from 'react';

const TopDescription = () => {
  return (
    <section className="max-w-7xl mx-auto  py-12 w-full mb-[42px] lg:mb-[180px] px-4 md:px-0">
      {/* 1. Mirrored Heading Section */}
      <div className="flex flex-col items-center mt-10 mb-10 lg:mb-16">
        <h1 className="font-bold lg:text-[100px] text-[38px] text-[#9BA87D] leading-0">
          About Aroma Tea
        </h1>
        <h1 className="font-bold lg:text-[100px] text-[38px] scale-y-[-1] bg-gradient-to-t from-[#9BA87D]/20 to-transparent 
                       bg-clip-text text-transparent select-none -mt-1 lg:-mt-1 opacity-50">
          About Aroma Tea
        </h1>
      </div>

      {/* 2. Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Mobile Title: Only visible on small screens to appear above images */}
        <h2 className="lg:hidden text-3xl font-bold text-black text-center mb-4">
          Crafted In Himalayans
        </h2>

        {/* Right Side (Images): Becomes top on mobile via order-1 */}
        <div className="order-1 lg:order-2 flex items-center justify-center lg:justify-end gap-[20px]">
          {/* Garden Image: 305x339 */}
          <div className="w-[45%] lg:w-[305px] lg:h-[339px] -translate-y-6">
            <img 
              src="/Images/tea-garden.png" 
              alt="Tea Garden" 
              className="rounded-[16px] shadow-md w-full h-full object-cover"
            />
          </div>
          
          {/* Mountain Image: 350x389 */}
          <div className="w-[50%] lg:w-[350px] lg:h-[389px] translate-y-6">
            <img 
              src="/Images/tea-mountain.png" 
              alt="Himalayan Mountain" 
              className="rounded-[16px] shadow-lg w-full h-full object-cover "
            />
          </div>
        </div>

        {/* Left Side: Text Content */}
        <div className="order-2 lg:order-1 text-center lg:text-left max-w-[536px] mx-auto lg:mx-0">
          {/* Desktop Title: Only visible on lg screens */}
          <h2 className="hidden lg:block text-[40px] font-bold text-black mb-8 leading-tight">
            Crafted In Himalayans
          </h2>
          
          <div className="space-y-6 text-gray-700 leading-relaxed text-sm lg:text-base">
            <p>
              Aroma Speciality Tea Industry (ASTI) was founded in 2012 in Suryodaya, 
              Fikkal, Ilam - a region known for its misty hills, fertile soil, and ideal 
              altitude for orthodox tea. Here, tea is not rushed. It is grown, 
              harvested, and crafted with patience.
            </p>
            <p>
              At Aroma Tea, we focus on purity, origin, and consistency. Our teas are 
              organic, pesticide-free, and carefully produced using traditional 
              methods that respect both the leaf and the land it comes from.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TopDescription;