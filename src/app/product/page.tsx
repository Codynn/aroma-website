"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, RefreshCcw } from "lucide-react";

// ── Mock Data Logic ──────────────────────────────────────────────────────────
const ALL_PRODUCTS = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: i % 2 === 0 ? "Golden Needles" : "White Needle Tip",
  price: 50,
  rating: 5.0,
  image: i % 2 === 0 ? "/Images/golden_leaves.png" : "/Images/white_needles.png",
}));

const ITEMS_PER_PAGE = 25;

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(ALL_PRODUCTS);

  // Pagination Logic
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="max-w-7xl flex flex-col items-center justify-center mx-auto px-4 min-h-screen">
      
      {/* ── 1. Mirrored Heading ── */}
      <div className="flex flex-col justify-center items-center  mb:[24px] md:mb-[64px] ">
        <h1 className="font-sora font-extrabold md:text-[100px] text-[38px] mt-[64px] text-[#9BA87D] leading-none text-center">
          Discover Our Teas
        </h1>
        <h1 className="font-sora font-extrabold md:text-[100px] text-[38px] scale-y-[-1] bg-gradient-to-t from-[#9BA87D]/12 to-transparent 
               bg-clip-text text-transparent select-none leading-none -mt-1 text-center">
          Discover Our Teas
        </h1>
      </div>

      {/* ── 2. Filter & Sort Buttons ── */}
      <div className="w-full flex justify-between items-center mb-12">
        <button className="flex items-center gap-1 px-[14px] py-2 md:px-6 cursor-pointer md:py-2.5  border border-[#7D8F7B] rounded-[16px] hover:bg-gray-100 transition-all">
          <Image src="/Images/MenuIcon.png" alt="Filter Icon" width={19} height={16} />
          <span className="font-sora text-[12px] md:text-[18px]">Open Filter</span>
        </button>

        <button className="flex items-center gap-2 px-5 py-2 md:px-7 md:py-3  border bg-[#77923B] rounded-[16px] cursor-pointer transition-all">
          <span className="font-sora text-white  text-[12px] md:text-[18px]">
             <span className="text-white">Most Popoular</span>
          </span>
          <Image src="/Images/DropdownIcon.png" alt="dropdown" width={18} height={9} />
        </button>
      </div>

      {/* ── 3. Conditional Content ── */}
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4 md:gap-y-8 w-full mb-6 lg:mb-16">
            {currentItems.map((product) => (
              <div key={product.id} className="flex flex-col w-full max-w-[422px] mx-auto group cursor-pointer">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-[16px] bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-start mb-1 px-1">
                  <h3 className="font-sora font-semibold text-[14px] md:text-[20px] text-gray-800">{product.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#F2C94C] text-[#F2C94C]" />
                    <span className="font-sora font-medium text-[12px] md:text-[14px] text-gray-500">5.0</span>
                  </div>
                </div>
                <p className="font-sora font-bold text-[18px] md:text-[24px] text-[#77923B] px-1">${product.price}</p>
              </div>
            ))}
          </div>

          {/* ── 4. Pagination (Updated) ── */}
          <div className="flex items-center gap-3 md:gap-6 mb-10">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
              className="font-sora font-bold text-[#77923B] text-[15px]"
            >
              Prev
            </button>
            <div className="flex gap-2.5">
              {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl font-sora font-bold text-[14px] border-2 transition-all hover:cursor-pointer
                    ${currentPage === page 
                      ? "bg-[#77923B] border-[#77923B] text-white" 
                      : "bg-white border-[#77923B]/20 text-[#77923B]"}`}
                >
                  {page < 10 ? `0${page}` : page}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
              className="font-sora font-bold text-[#77923B] text-[15px]"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        /* ── Empty State ── */
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
          <div className="relative mb-6" style={{ width: '140px', height: '157px' }}>
            <Image src="/images/cube.png" alt="No data found" width={140} height={157} className="object-contain" />
          </div>
          <h2 className="font-sora font-bold text-[24px] md:text-[32px] text-gray-900 mb-2">No Data Found</h2>
          <p className="font-sora text-gray-500 mb-8 max-w-md">We couldn't find any teas matching your current filters.</p>
          <button onClick={() => setProducts(ALL_PRODUCTS)} className="flex items-center gap-2 px-8 py-3 bg-[#77923B] text-white rounded-full font-sora font-bold hover:bg-[#667d32] transition-colors">
            <RefreshCcw className="w-4 h-4" /> Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}