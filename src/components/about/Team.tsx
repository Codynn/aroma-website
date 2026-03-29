"use client";

import React from "react";
import Image from "next/image";

const teamMembers = [
  { name: "Rekha Nepal", role: "Founder", src: "/people/4.jpeg" },
  { name: "Rajesh Gupta", role: "Co-Founder/Manager", src: "/people/3.jpeg" },
  { name: "Nikita Nepal", role: "MD", src: "/people/1.jpeg" },
  { name: "Jiwan Kumar Nepal", role: "CEO/MD", src: "/people/2.jpeg" },
];

export default function TeamSection() {
  return (
    <section className="py-16 md:py-24  bg-white overflow-hidden">
      <div className="max-w-7xl md:mx-auto ml-4  ">
        {/* Section Heading */}
        <h2 className="text-[#77923B] text-2xl md:text-[42px] font-bold mb-12 md:mb-16 max-w-2xl leading-tight">
          "Quality is not added later. <br className="hidden md:block" />
          It begins at the garden."
        </h2>

        {/* Desktop Grid (lg: 4 columns) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col">
              <div className="relative w-[300px] h-[352px] rounded-[16px] overflow-hidden mb-4 shadow-sm">
                <Image
                  src={member.src}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[24px] font-bold text-black">
                {member.name}
              </h3>
              <p className="text-[18px] text-[#222222]">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Draggable Slider */}
        {/* ml-4 matches the left padding, but no pr-4 allows it to bleed off the right */}
        <div className="lg:hidden -mr-4 md:-mr-6">
          <div className="flex overflow-x-auto gap-4 pb-8 scrollbar-hide cursor-grab active:cursor-grabbing snap-x snap-mandatory">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex-none snap-start first:pl-0">
                <div className="relative w-[300px] h-[352px] rounded-3xl overflow-hidden mb-3 ">
                  <Image
                    src={member.src}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-[24px] font-bold ">{member.name}</h3>
                <p className="text-[18px] text-[#222222]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
