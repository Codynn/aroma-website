"use client";

import Image from "next/image";

const highlights = [
  { label: "Certification", value: "Organic Tea Producer" },
  { label: "Responsibility", value: "Advocate CSR" },
  { label: "Workforce", value: "95% Women Employees & Farmers" },
  { label: "Total Area", value: "15 Hectares" },
  { label: "Tea Bushes", value: "~50,000 Bushes" },
  { label: "Annual Capacity", value: "50,000 – 70,000 kg" },
  { label: "Products", value: "Orthodox Black, Oolong, Green & White Tea" },
  { label: "Cultivar", value: "T78, Goomtee, Phoobsering312" },
  {
    label: "Services",
    value: "Gardening · Blending · Packaging · Consultancy · Training",
  },
];

const journey = [
  {
    era: "Early 2040 B.S.",
    text: "In the serene highlands of Fikkal, our journey quietly began with the careful planting of select tea bushes—laying the foundation for a legacy rooted in patience and craftsmanship.",
  },
  {
    era: "2040s – 2060s B.S.",
    text: "Over the decades, our gardens flourished across the mist-covered slopes of Ilam. With deep respect for nature and tradition, we refined the art of cultivating leaves that embody the region's distinctive character and elegance.",
  },
  {
    era: "2068 B.S.",
    text: "A defining milestone—our own tea processing facility was स्थापित in the name of Aroma Speciality Tea Industry, allowing us to transform freshly plucked leaves into finely crafted orthodox teas, with complete control over quality, aroma, and expression.",
  },
  {
    era: "Post-2068 B.S.",
    text: "Guided by precision and passion, we elevated our processing standards—blending traditional techniques with modern refinement to produce teas of exceptional clarity and depth.",
  },
  {
    era: "Present Day",
    text: "Today, AROMA teas travel beyond borders, carrying with them the essence of Ilam—its mist, its soil, and its soul—presented to the world as a symbol of quiet luxury and timeless origin.",
  },
];

export default function OriginPeople() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1444px] mx-auto">
        {/* DESKTOP VIEW */}
        <div className="hidden lg:block px-16">
          {/* Section 1: Our Journey */}
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-5xl font-bold mb-16">
              Our Journey Through Time
            </h2>

            {/* Timeline */}
            <div className="w-full max-w-5xl">
              {/* Dots + connecting line */}
              <div className="relative flex items-center justify-between mb-3">
                {journey.map((_, i) => (
                  <div key={i} className="flex-1 flex items-center">
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-[#9BA87D] ring-4 ring-[#9BA87D]/20" />
                    </div>
                    {i < journey.length - 1 && (
                      <div className="flex-1 h-px bg-[#9BA87D]/40 mx-1" />
                    )}
                  </div>
                ))}
              </div>

              {/* Era labels */}
              <div className="flex justify-between mb-6">
                {journey.map((item, i) => (
                  <div key={i} className="flex-1 text-left pr-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#9BA87D]">
                      {item.era}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cards */}
              <div className="flex gap-4 items-stretch">
                {journey.map((item, i) => (
                  <div
                    key={i}
                    className="flex-1 border-t-2 border-[#9BA87D] bg-[#f9faf6] rounded-b-2xl rounded-tr-2xl px-4 py-4 text-left text-sm text-gray-700 leading-relaxed"
                  >
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative w-full h-[448px]">
            <div className="relative w-full h-full">
              <Image
                src="/Images/origin.png"
                alt="Origin"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-4 z-10">
              <h2 className="text-[42px] font-bold mb-0">Key Highlights</h2>
            </div>
          </div>

          {/* Key Highlights Cards */}
          <div className="mt-6">
            <div className="grid grid-cols-3 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="border border-[#9BA87D]/40 rounded-2xl px-5 py-4 bg-[#f9faf6] hover:bg-[#f1f4eb] transition-colors duration-200"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#9BA87D] mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-800 font-medium leading-snug">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="block lg:hidden space-y-6">
          {/* Image */}
          <div className="relative w-screen ml-[50%] -translate-x-1/2 h-[174px]">
            <Image
              src="/Images/origin.png"
              alt="Mobile"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>

          {/* Journey — vertical timeline on mobile */}
          <div className="px-4">
            <h2 className="text-[28px] font-bold mb-6 text-center">
              Our Journey Through Time
            </h2>
            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#9BA87D]/40" />
              <div className="space-y-6">
                {journey.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#9BA87D] ring-4 ring-[#9BA87D]/20" />
                    <p className="text-xs font-bold uppercase tracking-widest text-[#9BA87D] mb-1">
                      {item.era}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed text-justify">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Our People */}
          <div className="text-center px-4">
            <h2 className="text-[34px] font-bold mb-4">Our People</h2>
            <p className="text-[16px] text-center text-gray-700">
              Behind Aroma Tea is a team deeply connected to the land and the
              craft. Every person plays a role in maintaining the standards we
              believe in.
            </p>
          </div>

          {/* Mobile Key Highlights */}
          <div className="px-4">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Key Highlights
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="border border-[#9BA87D]/40 rounded-xl px-4 py-3 bg-[#f9faf6]"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9BA87D] mb-1">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-800 font-medium leading-snug">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
