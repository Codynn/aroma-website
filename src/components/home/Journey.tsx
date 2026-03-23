"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const JOURNEY_IMAGES = [
  { src: "/Images/journey-1.png", className: "top-[0px] left-[76px] w-[266px] h-[170px]" }, 
  { src: "/Images/journey-2.png", className: "top-[100px] left-[360px] w-[169px] h-[92px]" },
  { src: "/Images/journey-3.png", className: "top-[200px] left-[456px] w-[176px] h-[280px]" },
  { src: "/Images/journey-4.png", className: "top-[493px] left-[181px] w-[323px] h-[163px]" }, // Fixed order for clarity
  { src: "/Images/journey-5.png", className: "top-[375px] left-[15px] w-[141px] h-[232px]" },
  { src: "/Images/journey-6.png", className: "top-[192px] left-[0px] w-[115px] h-[135px]" },
];

export default function JourneySection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* ── Left: Text Content ── */}
          <div className="w-full lg:w-[45%] text-left order-2 lg:order-1">
            <h2 className="text-[#77923B] hidden md:block  font-sora font-bold  md:text-[54px] mb-6 leading-tight">
              The Journey of Aroma
            </h2>
            <p className="text-[#555555] font-sora text-[14px] md:text-[16px] leading-[1.8] mb-10 max-w-[550px]">
              Every cup of Aroma Tea begins high in the misty hills of Ilam, where our tea
              gardens thrive at premium altitudes. Skilled farmers carefully handpick each
              leaf, selecting only the finest buds to ensure exceptional quality. The leaves
              are then traditionally crafted, rolled, and processed to preserve their unique
              aroma and delicate flavor. Finally, our teas are responsibly packaged and
              delivered, connecting the Himalayan hills to your cup anywhere in the world.
            </p>
            <Link 
              href="/about"
              className="inline-block px-10 py-3.5 bg-[#77923B] text-white font-sora font-bold rounded-[12px] hover:bg-[#667d32] transition-colors"
            >
              Learn More
            </Link>
          </div>

          {/* ── Right: Image Collage ── */}
          <div className="w-full lg:w-[55%] order-1 lg:order-2">
            <h2 className="text-[#77923B] md:hidden  font-sora font-bold text-[25px] text-center mb-6 leading-tight">
              The Journey of Aroma
            </h2>
            {/* Desktop Layout: Removed aspect-[4/3] and set h-[660px] to contain all images */}
            <div className="hidden md:block relative w-full h-[660px] max-w-[640px] mx-auto">
              {/* Central Cup */}
              <div className="absolute top-[206px] left-[150px] w-[303px] h-[236px] z-20">
                <Image 
                  src="/Images/journey-cup.png" 
                  width={303} 
                  height={236} 
                  alt="Aroma Tea Cup" 
                  className="object-contain drop-shadow-2xl"
                />
              </div>

              {/* Floating Images */}
              {JOURNEY_IMAGES.map((img, idx) => (
                <div key={idx} className={`absolute rounded-[16px] overflow-hidden shadow-md ${img.className}`}>
                  <Image 
                    src={img.src} 
                    alt={`Journey step ${idx + 1}`} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
              ))}
            </div>

            {/* Mobile Layout: Simplified to a centered stack or smaller relative box */}
            <div className="md:hidden flex flex-col items-center">
              <div className="relative w-full h-[400px] max-w-[350px]">
                {/* Mobile specific central cup */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[167px] h-[130px] z-10">
                  <Image src="/Images/journey-cup.png" width={167} height={130} alt="Cup" className="object-contain" />
                </div>

                {/* Simplified Mobile Collage */}
                <div className="absolute  left-[42px] top-[0px] w-[146px] h-[93px] rounded-[16px] overflow-hidden">
                    <Image src="/Images/journey-1.png" fill className="object-cover" alt="j1" />
                </div>
                <div className="absolute top-[55px] left-[198px] w-[93px] h-[51px]  rounded-[16px] overflow-hidden">
                    <Image src="/Images/journey-2.png" fill className="object-cover" alt="j2" />
                </div>
                <div className="absolute top-[109px] left-[256px] w-[97px] h-[154px] rounded-[16px] overflow-hidden">
                    <Image src="/Images/journey-3.png" fill className="object-cover" alt="j2" />
                </div>
                <div className="absolute top-[272px] left-[100px] w-[178px] h-[90px] rounded-[16px] overflow-hidden">
                    <Image src="/Images/journey-4.png" fill className="object-cover" alt="j2" />
                </div>
                
                <div className="absolute top-[202px] left-[8px] w-[77px] h-[128px] rounded-[16px] overflow-hidden">
                    <Image src="/Images/journey-5.png" fill className="object-cover" alt="j5" />
                </div>
                <div className="absolute top-[106px] left-[0px] w-[63px] h-[74px] rounded-[16px] overflow-hidden">
                    <Image src="/Images/journey-6.png" fill className="object-cover" alt="j6" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}