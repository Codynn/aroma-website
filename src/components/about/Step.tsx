'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Leaf } from 'lucide-react'; // Using Lucide as a placeholder for dummy icons

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  Icon: string; // Added for dummy icon mapping
}

const timelineSteps: TimelineStep[] = [
  {
    id: 1,
    title: "Born in the Himalayan Heights",
    description: "Nestled in the misty hills of Ilam, Dhankuta, and Panchthar, every leaf of Nepal Orthodox Tea grows slowly in the pure Himalayan air. The high-altitude soil and cool climate nurture a naturally rich aroma and complex flavor found nowhere else in the world.",
    imageUrl: "/Images/step1.png",
    Icon: '/Images/highaltitude.png',
  },
  {
    id: 2,
    title: "Cultivated with Generations of Wisdom",
    description: "Nepali farmers, guided by centuries of tea-growing tradition, hand-tend each garden with care and dedication. Their expertise ensures that every leaf reaches its full potential while supporting local communities and preserving Nepal’s agricultural heritage.",
    imageUrl: "/Images/step2.png",
    Icon: '/Images/careful.png',
  },
  {
    id: 3,
    title: "Handcrafted for Perfection",
    description: "From plucking to rolling, every step follows the meticulous orthodox process. Each leaf is carefully hand-rolled, preserving its delicate character and allowing for multiple infusions that reveal the tea’s layered flavors.",
    imageUrl: "/Images/step3.png",
    Icon: '/Images/crafting.png',
  },
  {
    id: 4,
    title: "Pure, Organic, and Sustainable",
    description: "Grown without pesticides or harmful chemicals, Nepal Orthodox Tea reflects a commitment to organic and eco-friendly practices. Every cup offers a naturally pure, antioxidant-rich experience that celebrates health and wellness.",
    imageUrl: "/Images/step4.png",
    Icon: '/Images/quality.png',
  },
  {
    id: 5,
    title: "Symphony of Himalayan Flavors",
    description: "The unique terroir of Nepal imparts subtle floral, fruity, and honeyed notes. Each sip carries the essence of the misty mountains, creating a taste that is simultaneously delicate, complex, and unforgettable.",
    imageUrl: "/Images/step5.png",
    Icon: '/Images/packaging.png',
  },
  {
    id: 6,
    title: "Legacy in Every Sip",
    description: "Beyond flavor, every cup tells the story of Nepal — its mountains, its people, and its traditions. Drinking Nepal Orthodox Tea is more than a ritual; it’s an experience of heritage, craftsmanship, and Himalayan luxury.",
    imageUrl: "/Images/step6.png",
    Icon: '/Images/cup.png',
  },
  
];

export default function TeaStoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 bg-white overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <div className="text-center mb-[34px]">
          <h2 className=" text-[25px] lg:text-[50px] lg:text-5xl  font-semibold lg:font-bold mb-6 lg:mb-8">The Story Behind Every Cup</h2>
          <p className="text-black max-w-3xl mx-auto  text-[16px] font-bold lg:font-regularlg:text-[18px] leading-relaxed">
            Our tea travels a careful path from the Himalayan hills of Nepal to your cup, crafted through the traditional methods and handled with care at every stage.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[20px] lg:left-1/2 top-0 bottom-0 w-[3px] bg-gray-100 lg:-translate-x-1/2" />
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-[20px] lg:left-1/2 top-0 bottom-0 w-[3px] bg-[#77923B] lg:-translate-x-1/2 z-10"
          />
          <motion.div 
            style={{ top: dotY }}
            className="absolute left-[20px] lg:left-1/2 w-6 h-6 rounded-full bg-[#77923B]   -translate-x-1/2 z-20"
          />

          {/* DESKTOP VERSION */}
          <div className="hidden lg:block space-y-48">
            {timelineSteps.map((step, index) => (
              <DesktopItem key={step.id} step={step} isEven={(index + 1) % 2 === 0} />
            ))}
          </div>

          {/* MOBILE VERSION */}
          <div className="block lg:hidden space-y-24 pl-12">
            {timelineSteps.map((step) => (
              <MobileItem key={step.id} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileItem({ step }: { step: TimelineStep }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.5"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <motion.div ref={ref} style={{ opacity }} className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="text-5xl font-bold text-[#77923B]">{String(step.id).padStart(2, '0')}</span>
        <div className="relative w-[242px] h-[229px] rounded-2xl overflow-hidden shadow-lg">
          <Image src={step.imageUrl} alt={step.title} fill className="object-cover" />
        </div>
      </div>
      <div className="relative p-6 rounded-2xl bg-[#77923B] text-white ">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4">
         <Image src={step.Icon} alt={step.title} width={42} height={42} className=' ' />
        </div>
        <h3 className="text-[16px] mb-3">{step.title}</h3>
        <p className="text-[16px] leading-relaxed ">{step.description}</p>
      </div>
    </motion.div>
  );
}

function DesktopItem({ step, isEven }: { step: TimelineStep; isEven: boolean }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "start 0.5"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <motion.div 
      ref={ref} 
      style={{ opacity }}
      className={`relative flex items-center w-full ${isEven ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Number and Image (Same Side) */}
      <div className={`w-1/2 flex items-center gap-8 px-12 ${isEven ? 'justify-start' : 'justify-end'}`}>
        <span className={`text-8xl font-bold text-[#77923B] ${isEven ? 'order-1' : 'order-2'}`}>
          {String(step.id).padStart(2, '0')}
        </span>
        <div className={`relative w-[385px] h-[229px] rounded-[16px] overflow-hidden shadow-lg ${isEven ? 'order-2' : 'order-1'}`}>
          <Image src={step.imageUrl} alt={step.title} fill className="object-cover" />
        </div>
      </div>

      <div className="w-1" />

      {/* Content Card (Opposite Side) */}
      <div className={`w-1/2 flex px-12 ${isEven ? 'justify-end' : 'justify-start'}`}>
        <div className="relative p-8 rounded-2xl bg-[#77923B] text-white  flex flex-col justify-center">
          <div className=" flex items-center mb-4 ">
              <Image src={step.Icon} alt={step.title} width={60} height={60} className='w-15 h-15 ' />
          </div>
          <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
          <p className="text-sm leading-relaxed opacity-90">{step.description}</p>
          <div className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-y-[12px] border-y-transparent 
            ${isEven ? 'right-[-15px] border-l-[16px] border-l-[#77923B]' : 'left-[-15px] border-r-[16px] border-r-[#77923B]'}`} 
          />
        </div>
      </div>
    </motion.div>
  );
}