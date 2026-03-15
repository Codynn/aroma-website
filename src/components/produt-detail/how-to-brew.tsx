import React from 'react';

export default function HowToBrew() {
  return (
    <div className="max-w-7xl mx-auto font-sora w-full py-10 px-4 lg:px-0 flex flex-col items-center">
      {/* Heading - Responsive text sizes to match your other sections */}
      <h1 className="text-[42px] lg:text-[54px] font-bold text-[#111] mb-6 lg:mb-[32px] text-center">
        How to Brew Perfectly
      </h1>

      {/* Video/Image Container */}
      <div className="relative w-full max-w-7xl group cursor-pointer">
        {/* Single Image Source */}
        <img 
          src="/Images/how-to-brew.png" 
          alt="How to brew perfectly video thumbnail"
          className="w-full h-[392px] lg:h-auto rounded-[12px] lg:rounded-[16px] shadow-md object-cover"
        />

        {/* Play Button Overlay - Centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-black/50">
            {/* Play Triangle SVG */}
            <svg 
              width="24" 
              height="28" 
              viewBox="0 0 24 28" 
              fill="none" 
              className="ml-1 lg:w-8 lg:h-10"
            >
              <path 
                d="M22.5 12.268C23.8333 13.0378 23.8333 14.9622 22.5 15.732L3.75 26.5574C2.41667 27.3272 0.75 26.365 0.75 24.8253L0.75 3.17468C0.75 1.63508 2.41667 0.672831 3.75 1.44263L22.5 12.268Z" 
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}