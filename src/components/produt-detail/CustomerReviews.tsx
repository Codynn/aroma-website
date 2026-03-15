"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ThumbsUp, ThumbsDown, ChevronDown } from "lucide-react";

// ── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_REVIEWS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  author: "Ronald Richards",
  location: "UK",
  rating: 4,
  date: "2024-03-14",
  content: "I've been drinking this tea in the evenings before bed, and it's the perfect way to relax. It calms my mind and prepares me for a restful sleep.",
  avatar: "/Images/profile.png", // Replace with your actual avatar path
  images: [
    "/Images/review-tea-1.png",
    "/Images/review-tea-2.png",
    "/Images/review-tea-3.png"
  ],
  helpfulCount: 4,
  unhelpfulCount: 1,
}));

const REVIEWS_PER_PAGE = 3;

export default function ReviewsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(MOCK_REVIEWS.length / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const currentReviews = MOCK_REVIEWS.slice(startIndex, startIndex + REVIEWS_PER_PAGE);

  return (
    <div className="bg-[#F0FAEF] w-full ">
                <section className="max-w-5xl mx-auto px-4  font-sora bg-[#F0FAEF]">
      <h2 className="text-[42px] md:text-[54px] font-bold text-center mb-8 text-black">
        Customer Reviews
      </h2>

      <div className="flex flex-col md:flex-row gap-12 mb-12 items-start">
        {/* ── Left: Summary Card ── */}
        <div className="w-full md:w-1/3 p-8 border border-[#989898] rounded-[24px] flex flex-col items-center justify-center text-center">
          <div className=" text-[42px] md:text-[54px] font-bold leading-none mb-2.5">4.2<span className="text-[24px] md:text-[34px] text-black">/5</span></div>
          <div className="flex gap-1  mb-3 lg:mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-6 h-6 ${i < 4 ? "fill-[#F7D147] text-[#F7D147]" : "text-[#C3C3C3] fill-[#C3C3C3]"}`} />
            ))}
          </div>
          <p className="lg:text-[18px] text-[12px]">Based on 10,243 reviews</p>
        </div>

        {/* ── Right: Rating Bars ── */}
        <div className="w-full md:w-2/3 space-y-4">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-4">
              <span className="flex items-center gap-1 min-w-[30px] font-bold text-[24px]">
                {star} <Star className="w-4 h-4 fill-[#F2C94C] text-[#F2C94C]" />
              </span>
              <div className="flex-1 h-3 bg-[#D9D9D9] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#F2C94C] rounded-full" 
                  style={{ width: `${star === 5 ? 70 : star === 4 ? 85 : star === 3 ? 60 : 20}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filter Dropdown ── */}
      <div className="mb-8">
        <button className="flex items-center gap-3 px-6 py-2.5 bg-[#77923B] text-white rounded-[16px] hover:bg-[#8A976C] cursor-pointer transition-colors">
          <ChevronDown className="w-5 h-5" />
          <span className=" text-[12px] md:text-[18px]">Most Helpful</span>
        </button>
      </div>

      {/* ── Reviews List ── */}
      <div className="space-y-4 mb-12">
        {currentReviews.map((review) => (
          <div key={review.id} className="p-[18px] md:p-6  bg-[#E8F9E5] rounded-[16px] shadow-md">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-6 h-6 ${i < review.rating ? "fill-[#F2C94C] text-[#F2C94C]" : "text-[#C3C3C3] fill-[#C3C3C3]"}`} />
              ))}
            </div>
            
            <p className="text-[16px] md:text-[18px] leading-relaxed text-gray-700 mb-6 italic">
              &ldquo;{review.content}&rdquo;
            </p>

            <div className="flex gap-4 mb-8 md:mb-[42px]">
              {review.images.map((img, idx) => (
                <div key={idx} className="relative w-[62px] h-[62px] md:w-[96px] md:h-[96px] rounded-[16px] overflow-hidden ">
                  <Image src={img} alt="User review" fill className="object-cover" />
                </div>
              ))}
            </div>

            <div className="flex  items-center justify-between gap-4 ">
              <div className="flex  gap-3">
                <div className="w-[42px] h-[42px] md:w-[54px] md:h-[54px] rounded-full bg-gray-200 overflow-hidden">
                   {/* Avatar Image placeholder */}
                   <Image src={"/Images/profile.png"} alt="User review" width={42} height={42}  className="object-cover w-[42px] h-[42px] md:w-[54px] md:h-[54px] " />
                </div>
                <div>
                  <h4 className="font-bold text-[16px] md:text-[18px] ">{review.author}</h4>
                  <p className="text-[14px] md:text-[16px] ">{review.location}</p>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
                <span className="text-[14px] md:text-[16px] ">Was this helpful?</span>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg bg-[#F0FAEF] cursor-pointer transition-colors">
                    <Image src={`/Images/like.png`} width={22} height={20} className="w-[18px] h-4 md:w-[22px] md:h-5" alt="like"/>
                    <span className="text-sm font-bold text-gray-600">{review.helpfulCount}</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg bg-[#F0FAEF] cursor-pointer transition-colors">
                    <Image src={`/Images/dislike.png`} width={22} height={20} className="w-[18px] h-4 md:w-[22px] md:h-5" alt="like"/>
                    <span className="text-sm font-bold text-gray-600">{review.unhelpfulCount}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Pagination (Mirrored Style) ── */}
      <div className="flex items-center justify-center gap-3 md:gap-6  mt-[42px] md:mt-16 mb-1">
        <button 
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
          className="font-sora font-bold text-[#77923B] text-[15px] hover:underline"
        >
          Prev
        </button>
        <div className="flex gap-2.5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-xl font-sora font-bold text-[14px] border-2 transition-all
                ${currentPage === page 
                  ? "bg-[#77923B] border-[#77923B] text-white" 
                  : "bg-white border-[#77923B]/20 text-[#77923B] hover:border-[#77923B]"}`}
            >
              {page < 10 ? `0${page}` : page}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
          className="font-sora font-bold text-[#77923B] text-[15px] hover:underline"
        >
          Next
        </button>
      </div>
    </section>
    </div>
    
  );
}