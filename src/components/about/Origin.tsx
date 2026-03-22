'use client';

import React from 'react';
import Image from 'next/image';

export default function OriginPeople() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1444px] mx-auto">
        
        {/* DESKTOP VIEW */}
        <div className="hidden lg:block px-4 lg:px-0">
          {/* Section 1: Our Origin - Stays Above */}
          <div className="flex flex-col items-center text-center mb-4">
            <h2 className="text-5xl font-bold mb-10">Our Origin</h2>
            <div className="grid grid-cols-2 gap-16 text-left max-w-5xl">
              <p className="text-[18px] leading-relaxed">
                Located at an altitude of 3000–6000 ft, our gardens sit in one of 
                Nepal’s most respected tea-growing regions. The climate, elevation, 
                and soil create teas known for their delicate aroma.
              </p>
              <p className="text-[18px] leading-relaxed">
                Every leaf is hand-harvested, following the One Bud, Two Leaves 
                standard - a practice that preserves quality and character in every 
                batch. This is not mass production.
              </p>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative w-[1444px] h-[448px] mx-auto">
            <div className="relative w-full h-full">
              <Image 
                src="/Images/origin.png" 
                alt="Origin" 
                fill 
                className="object-cover"
                priority
              />
              {/* Linear fade at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            </div>

            {/* Section 2: Our People - FIXED POSITIONING */}
            <div className="absolute bottom-0 right-12 max-w-lg text-right z-10">
              {/* Heading is now inside the overlay, above the image area */}
              <h2 className="text-[42px] font-bold mb-8">Our People</h2>
            
            </div>
          </div>

          <div className='flex justify-end   '>
              <p className="text-[18px] leading-relaxed lg:max-w-[508px] ">
                Behind Aroma Tea is a team deeply connected to the land and the 
                craft. Every person plays a role in maintaining the standards we 
                believe in.
              </p>
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="block lg:hidden space-y-4">
          <div className="text-center px-4">
            <h2 className="text-[34px] font-bold mb-6">Our Origin</h2>
            <p className="text text-[16px] text-center mb-3">
               Located at an altitude of 3000–6000 ft, our gardens sit in one of 
                Nepal’s most respected tea-growing regions. The climate, elevation, 
                and soil create teas known for their delicate aroma.
            </p>
             <p className="text-[16px] leading-relaxed">
                Every leaf is hand-harvested, following the One Bud, Two Leaves 
                standard - a practice that preserves quality and character in every 
                batch. This is not mass production.
              </p>
          </div>

          <div className="relative w-screen ml-[50%] -translate-x-1/2 h-[174px] ">
            <Image src="/Images/origin.png" alt="Mobile" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>

          <div className="text-center px-4">
            <h2 className="text-[34px] font-bold mb-6">Our People</h2>
            <p className="text text-[16px] text-center">
               Behind Aroma Tea is a team deeply connected to the land and the 
                craft. Every person plays a role in maintaining the standards we 
                believe in.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}