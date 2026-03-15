"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Minus, Plus, Box } from "lucide-react";
import Link from "next/link";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  // Mock data based on your image
  const product = {
    name: "Golden Needle Tea",
    rating: 4,
    reviews: 56,
    weight: "100g",
    description: "Handpicked high in the misty hills of Ilam, Golden Needle tea delivers a delicate aroma, smooth flavor, and the true taste of Himalayan craftsmanship. 100% organic, traditionally crafted, and perfect for a refined tea experience.",
    currentPrice: 20,
    originalPrice: 28,
    discount: "16% Discount",
    images: ["/Images/golden_needles_tea.png", "/Images/golden_needles_tea.png", "/Images/golden_needles_tea.png", "/Images/golden_needles_tea.png", "/Images/golden_needles_tea.png"]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 py-12 font-sora ">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-400 mb-8 flex gap-2">
        <Link href={`/`} className="cursor-pointer"><span>Home /</span> </Link>
         <Link href={`/product`} className="cursor-pointer"><span>Shop /</span> </Link>
         <span className="text-gray-800 font-semibold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[51px]">
        
        {/* Left: Image Section */}
        <div className="flex  gap-2 lg:gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {product.images.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`relative w-[54px] h-[54px]  lg:w-[93.4px] lg:h-[96px] rounded-[8px] overflow-hidden cursor-pointer border-2 transition-all 
                  ${activeImg === idx ? "border-[#77923B]" : "border-transparent bg-gray-100"}`}
              >
                <Image src={img} alt="thumb" fill className="object-cover" />
              </div>
            ))}
          </div>

          {/* Main Display */}
          <div className="relative flex-1 bg-gray-50 rounded-[16px] overflow-hidden group h-auto md:h-[522px] ">
            <Image 
              src={product.images[activeImg]} 
              alt="main product" 
              fill 
              className="object-cover max-w-[484px]"
            />
            
            {/* Navigation Arrows */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-[68px] bg-white cursor-pointer rounded-[16px] flex items-center justify-center opacity-0  group-hover:opacity-100 transition-opacity">
              <ChevronLeft className="w-9 h-[18px] text-[#332C2C]" />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-[68px] bg-white rounded-[16px] cursor-pointer flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-9 h-[18px] text-[#332C2C]" />
            </button>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <h1 className="text-[28px] lg:text-[34px] font-bold text-[#121212] leading-1.6 mb-2 lg:mb-4">{product.name}</h1>
          
          <div className="flex items-center lg:mb-6 mb-[18px] ">
            <div className="flex items-center gap-1 ">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < product.rating ? "fill-[#F2C94C] text-[#F2C94C]" : "fill-[#7D8F7B] text-[#7D8F7B]"}`} 
                />
              ))}
            </div>
            <span className="text-[#7D8F7B] text-sm">({product.reviews} reviews)</span>
          </div>

          <p className="text-[#333333] text-[16px] lg:text-[18px]    lg:mb-2.5 mb-[6px]">Each Pack Contains {product.weight} of Premium Tea</p>
          <p className="text-[#333333] text-[16px] lg:text-[18px]  mb-8 lg:mb-[52px]  ">
            {product.description}
          </p>

          <div className="flex items-center gap-3 mb-3 lg:mb-4">
            <span className="text-[34px] lg:text-[42px] font-bold text-[#77923B]">${product.currentPrice}</span>
            <span className="text-[34px] lg:text-[42px] font-bold text-gray-400 ">${product.originalPrice}</span>
            <span className="px-3 py-1 bg-[#DB3F34] text-white text-[13px] lg:text-[18px] rounded-[8px] ">
              {product.discount}
            </span>
          </div>

          <div className="flex items-center gap-6 mb-3">
            <span className="font-bold text-[18px] lg:text-[24px] text-gray-900">Quantity:</span>
            <div className="flex items-center border-2 border-gray-200 rounded-[16px] px-4 py-2 gap-6">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-black transition-colors">
                <Minus className="w-5 h-5" />
              </button>
              <span className="font-bold text-lg min-w-[20px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-black transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button className="w-full md:w-[400px] bg-[#77923B] hover:bg-[#667d32] text-white font-bold py-4 rounded-xl transition-all  mb-3">
            Add to Cart
          </button>

          <div className="flex items-center gap-2 text-[#333333] text-[16px] ">
            <Box className="w-4 h-4" />
            Free 30-Day Return
          </div>
        </div>
      </div>
    </div>
  );
}