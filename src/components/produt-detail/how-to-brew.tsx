'use client'

import React, { useState } from 'react';

// Interfaces based on your existing product usage
interface HowToBrewProps {
  product: {
    additionalFields?: {
      brewVideoUrl?: string;
    };
  };
}

export default function HowToBrew({ product }: HowToBrewProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  
  const videoUrl = product?.additionalFields?.brewVideoUrl;

  // 1. Hide component if URL doesn't exist
  if (!videoUrl) return null;

  // 2. Extract YouTube Video ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(videoUrl);
  if (!videoId) return null;

  // Generate dynamic thumbnail from YouTube
  const thumbnailSrc = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="max-w-7xl mx-auto font-sora w-full py-10 px-4 lg:px-0 flex flex-col items-center">
      <h1 className="text-[42px] lg:text-[54px] font-bold text-[#111] mb-6 lg:mb-[32px] text-center">
        How to Brew Perfectly
      </h1>

      {/* Video/Image Container */}
      <div 
        onClick={() => setActiveVideo(videoId)}
        className="relative w-full max-w-7xl group cursor-pointer"
      >
        {/* MAINTAINED: Your original dimensions and classes */}
        <img 
          src={thumbnailSrc} 
          alt="How to brew perfectly video thumbnail"
          className="w-full h-[392px] lg:h-[500px] rounded-[12px] lg:rounded-[16px] shadow-md object-cover"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-black/50">
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

      {/* Video Modal - Logic integrated from TeaStoriesSection */}
      {activeVideo && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
           <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveVideo(null);
              }}
              className="absolute top-10 right-10 text-white hover:text-gray-400 z-[1001] bg-black/50 rounded-full w-10 h-10 flex items-center justify-center text-2xl"
            >
              &times;
            </button>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setActiveVideo(null)} />
        </div>
      )}
    </div>
  );
}