"use client";
import React, { useState } from "react";

const TopDescription = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="max-w-7xl mx-auto py-12 w-full mb-[0px] lg:mb-[180px] px-4 md:px-0">
      {/* 1. Mirrored Heading Section */}
      <div className="flex flex-col items-center mt-10 mb-6 lg:mb-9">
        <h1 className="font-bold lg:text-[100px] text-[38px] text-[#9BA87D] leading-0">
          About Aroma Tea
        </h1>
        <h1
          className="font-bold lg:text-[100px] text-[38px] scale-y-[-1] bg-gradient-to-t from-[#9BA87D]/20 to-transparent 
                       bg-clip-text text-transparent select-none -mt-1 lg:-mt-1 opacity-50"
        >
          About Aroma Tea
        </h1>
      </div>

      {/* 2. Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Mobile Title */}
        <h2 className="lg:hidden text-3xl font-bold text-black text-center">
          Himalayan Origin & Our Craft
        </h2>

        {/* Right Side (Images) */}
        <div className="order-1 lg:order-2 flex items-center justify-center lg:justify-end gap-[10px]">
          <div className="mt-5">
            <img
              src="/Images/tea-garden.jpeg"
              alt="Tea Garden"
              className="rounded-[16px] shadow-md w-full h-full object-fill"
            />
          </div>
        </div>

        {/* Left Side: Text Content */}
        <div className="order-2 lg:order-1 text-center lg:text-left max-w-[536px] mx-auto lg:mx-0">
          {/* Desktop Title */}
          <h2 className="hidden lg:block text-[40px] font-bold text-black mb-8 leading-tight">
            Himalayan Origin & Our Craft
          </h2>

          <div className="space-y-6 text-gray-700 leading-relaxed text-sm lg:text-base text-justify">
            {/* Always visible: first paragraph */}
            <p>
              Nestled in the Himalayan landscape, Nepal has over 16,000 hectares
              dedicated to tea cultivation across its mist-covered hills. Six
              प्रमुख regions—Ilam, Panchthar, Dhankuta, Terhathum,
              Sindhulpalchok, and Kaski—are renowned for producing premium
              orthodox teas. Around 15% of the country's total tea production
              consists of orthodox varieties, known for their refined aroma,
              complexity, and artisanal craftsmanship, alongside smaller
              quantities of green, white, and oolong teas.
            </p>

            {/* Expandable content */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="space-y-6">
                <p>
                  Established in 2012 A.D., Aroma Speciality Tea Industry (ASTI)
                  was founded with the vision of crafting high-quality organic
                  teas that capture the essence of the Himalayas. Located in
                  Suryodaya, Fikkal, at elevations ranging from 3,000 to 6,000
                  feet, the company operates in one of Nepal's most
                  distinguished tea-growing regions. The unique altitude and
                  climate contribute to the distinctive flavor, aroma, and
                  character that define its teas.
                </p>

                <p>
                  With a strong commitment to hand-plucked leaves and
                  sustainable practices, ASTI works closely with local
                  smallholder farmers, preserving tradition while supporting
                  rural communities. The facility has an annual production
                  capacity of approximately 50,000 to 70,000 tons, specializing
                  in a diverse range of orthodox teas, including black, green,
                  oolong, and white varieties—each carefully crafted to deliver
                  an authentic and refined Himalayan tea experience.
                </p>
              </div>
            </div>
          </div>

          {/* Read More / Read Less button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#9BA87D] hover:text-[#7a8a60] transition-colors duration-200 group"
          >
            <span>{expanded ? "Read Less" : "Read More"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : "rotate-0"
              } group-hover:translate-y-[2px]`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopDescription;
