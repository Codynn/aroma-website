"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Star, ChevronDown, Loader2 } from "lucide-react";
import { useGetProductReviews, useGetProductRatingDistribution } from "@/services/api/review.api";

interface ReviewsSectionProps {
  productId: string;
}

export default function ReviewsSection({ productId }: ReviewsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const REVIEWS_PER_PAGE = 6;

  // 1. Fetch Reviews
  const { data: reviewsData, isLoading: reviewsLoading } = useGetProductReviews(productId, {
    page: currentPage,
    limit: REVIEWS_PER_PAGE,
  });

  // 2. Fetch Rating Distribution
  const { data: distribution } = useGetProductRatingDistribution(productId);

  // 3. Calculate Average Rating & Total Count
  const { averageRating, totalReviews } = useMemo(() => {
    if (!distribution) return { averageRating: 0, totalReviews: 0 };
    
    let totalScore = 0;
    let totalCount = 0;
    
    Object.entries(distribution).forEach(([star, count]) => {
      totalScore += Number(star) * count;
      totalCount += count;
    });

    return {
      averageRating: totalCount > 0 ? (totalScore / totalCount).toFixed(1) : "0.0",
      totalReviews: totalCount,
    };
  }, [distribution]);

  if (reviewsLoading) {
    return (
      <div className="flex justify-center py-20 bg-[#F0FAEF]">
        <Loader2 className="w-8 h-8 animate-spin text-[#77923B]" />
      </div>
    );
  }

  const reviews = reviewsData?.data || [];
  const totalPages = reviewsData?.totalPages || 1;

  return (
    <div className="bg-[#F0FAEF] w-full ">
      <section className="max-w-5xl mx-auto px-4 font-sora bg-[#F0FAEF]">
        <h2 className="text-[42px] md:text-[54px] font-bold text-center mb-8 text-black">
          Customer Reviews
        </h2>

        <div className="flex flex-col md:flex-row gap-12 mb-12 items-start">
          {/* ── Left: Summary Card ── */}
          <div className="w-full md:w-1/3 p-8 border border-[#989898] rounded-[24px] flex flex-col items-center justify-center text-center">
            <div className="text-[42px] md:text-[54px] font-bold leading-none mb-2.5">
              {averageRating}<span className="text-[24px] md:text-[34px] text-black">/5</span>
            </div>
            <div className="flex gap-1 mb-3 lg:mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-6 h-6 ${i < Math.round(Number(averageRating)) ? "fill-[#F7D147] text-[#F7D147]" : "text-[#C3C3C3] fill-[#C3C3C3]"}`} 
                />
              ))}
            </div>
            <p className="lg:text-[18px] text-[12px]">Based on {totalReviews.toLocaleString()} reviews</p>
          </div>

          {/* ── Right: Rating Bars ── */}
          <div className="w-full md:w-2/3 space-y-4">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = distribution ? distribution[star.toString()] || 0 : 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={star} className="flex items-center gap-4">
                  <span className="flex items-center gap-1 min-w-[30px] font-bold text-[24px]">
                    {star} <Star className="w-4 h-4 fill-[#F2C94C] text-[#F2C94C]" />
                  </span>
                  <div className="flex-1 h-3 bg-[#D9D9D9] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#F2C94C] rounded-full transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Filter Dropdown ── */}
        

        {/* ── Reviews List ── */}
        <div className="space-y-4 mb-12">
          {reviews.length > 0 ? reviews.map((review) => (
            <div key={review.id} className="p-[18px] md:p-6 bg-[#E8F9E5] rounded-[16px] shadow-md">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-6 h-6 ${i < review.rating ? "fill-[#F2C94C] text-[#F2C94C]" : "text-[#C3C3C3] fill-[#C3C3C3]"}`} />
                ))}
              </div>
              
              <p className="text-[16px] md:text-[18px] leading-relaxed text-gray-700 mb-6 italic">
                &ldquo;{review.review}&rdquo;
              </p>

              <div className="flex items-center justify-between gap-4 ">
                <div className="flex gap-3">
                  <div className="w-[42px] h-[42px] md:w-[54px] md:h-[54px] rounded-full bg-gray-200 overflow-hidden relative">
                     <Image 
                        src={review.shopCustomer.customer.user.photo || "/Images/profile.png"} 
                        alt={review.shopCustomer.customerName} 
                        fill 
                        className="object-cover" 
                      />
                  </div>
                  <div>
                    <h4 className="font-bold text-[16px] md:text-[18px] ">{review.shopCustomer.customerName}</h4>
                    <p className="text-[14px] md:text-[16px] ">{review.shopCustomer.customerEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <p className="text-center text-gray-500 py-10">No reviews yet for this product.</p>
          )}
        </div>

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 md:gap-6 mt-[42px] md:mt-16 mb-1 pb-10">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
              className="font-sora font-bold text-[#77923B] text-[15px] hover:underline disabled:opacity-30"
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
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
              className="font-sora font-bold text-[#77923B] text-[15px] hover:underline disabled:opacity-30"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}