"use client";

import React from "react";
import Image from "next/image";

export default function OriginPeople() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1444px] mx-auto">
        {/* DESKTOP VIEW */}
        <div className="hidden lg:block px-4 lg:px-0">
          {/* Section 1: Our Origin - Stays Above */}
          <div className="flex flex-col items-center text-center mb-4">
            <h2 className="text-5xl font-bold mb-10">
              Our Journey Through Time{" "}
            </h2>
            <div className="grid grid-cols-2 gap-16 text-left max-w-5xl">
              {/*  */}
              <p className="flex flex-col items-start gap-1 justify-start text-justify">
                <span className="font-bold">Early 2040 B.S.</span>
                In the serene highlands of Fikkal, our journey quietly began
                with the careful planting of select tea bushes—laying the
                foundation for a legacy rooted in patience and craftsmanship.
              </p>

              <p className="flex flex-col items-start gap-1 justify-start text-justify">
                <span className="font-bold">2040s – 2060s B.S.</span>
                Over the decades, our gardens flourished across the mist-covered
                slopes of Ilam. With deep respect for nature and tradition, we
                refined the art of cultivating leaves that embody the region’s
                distinctive character and elegance.
              </p>

              <p className="flex flex-col items-start gap-1 justify-start text-justify">
                <span className="font-bold">2068 B.S.</span>A defining
                milestone—our own tea processing facility was स्थापित in the
                name of Aroma Speciality Tea Industry, allowing us to transform
                freshly plucked leaves into finely crafted orthodox teas, with
                complete control over quality, aroma, and expression.
              </p>

              <p className="flex flex-col items-start gap-1 justify-start text-justify">
                <span className="font-bold">Post-2068 B.S.</span>
                Guided by precision and passion, we elevated our processing
                standards—blending traditional techniques with modern refinement
                to produce teas of exceptional clarity and depth.
              </p>

              <p className="flex flex-col items-start gap-1 justify-start text-justify">
                <span className="font-bold">Present Day</span>
                Today, AROMA teas travel beyond borders, carrying with them the
                essence of Ilam—its mist, its soil, and its soul—presented to
                the world as a symbol of quiet luxury and timeless origin.
              </p>
              {/*  */}
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
              <h2 className="text-[42px] font-bold mb-8">Key Highlights</h2>
            </div>
          </div>

          <div className="flex justify-end   ">
            <p className="text-[18px] leading-relaxed lg:max-w-[508px] ">
              <li>Organic Tea Producer</li>
              <li>Advocate CSR</li>
              <li>95 percent of Employee are Women supported by Farmer</li>
              <li>Total Area 15 Hectare</li>
              <li>Tea Bushes 50000 Approx.</li>
              <li>
                Total Production Capacity: 50,000 kg to 70,000 kg annually.
              </li>
              <li>
                Product: Orthodox Black Tea, Oolong Tea, Green Tea, White Tea
              </li>
              <li>Cultivar: T78, Goomtee, Phoobsering312</li>
              <li>
                Service: Tea Gardening, Tea Blending, Tea Packaging, Tea
                Consultancy, Tea Making Training
              </li>
            </p>
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="block lg:hidden space-y-4">
          <div className="text-center px-4">
            <h2 className="text-[34px] font-bold mb-6">
              Himalayan Origin & Our Craft
            </h2>
            <p>
              Nestled in the Himalayan landscape, Nepal has over 16,000 hectares
              dedicated to tea cultivation across its mist-covered hills. Six
              प्रमुख regions—Ilam, Panchthar, Dhankuta, Terhathum,
              Sindhulpalchok, and Kaski—are renowned for producing premium
              orthodox teas. Around 15% of the country’s total tea production
              consists of orthodox varieties, known for their refined aroma,
              complexity, and artisanal craftsmanship, alongside smaller
              quantities of green, white, and oolong teas.
            </p>

            <p>
              Established in 2012 A.D., Aroma Speciality Tea Industry (ASTI) was
              founded with the vision of crafting high-quality organic teas that
              capture the essence of the Himalayas. Located in Suryodaya,
              Fikkal, at elevations ranging from 3,000 to 6,000 feet, the
              company operates in one of Nepal’s most distinguished tea-growing
              regions. The unique altitude and climate contribute to the
              distinctive flavor, aroma, and character that define its teas.
            </p>

            <p>
              With a strong commitment to hand-plucked leaves and sustainable
              practices, ASTI works closely with local smallholder farmers,
              preserving tradition while supporting rural communities. The
              facility has an annual production capacity of approximately 50,000
              to 70,000 tons, specializing in a diverse range of orthodox teas,
              including black, green, oolong, and white varieties—each carefully
              crafted to deliver an authentic and refined Himalayan tea
              experience.
            </p>
          </div>

          <div className="relative w-screen ml-[50%] -translate-x-1/2 h-[174px] ">
            <Image
              src="/Images/origin.png"
              alt="Mobile"
              fill
              className="object-cover"
            />
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
