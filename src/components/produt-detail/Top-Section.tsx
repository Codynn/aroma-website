"use client";

import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Minus, Plus, Box, Loader2 } from "lucide-react";
import Link from "next/link";
import { useGetProductById } from "@/services/api/product.api";
import HandledImage from "@/components/shared/HandleImage";
import { useCart } from "@/hooks/user-cart";

interface TopSectionProps {
  id: string;
}

export default function ProductDetail({ id }: TopSectionProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  // Get real data from your API
  const { data: product, isLoading, isError } = useGetProductById(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-[#77923B]" />
      </div>
    );
  }

  if (isError || !product) return null;

  const currentPrice = product.sellingPrice;
  const originalPrice = Math.round(currentPrice * 1.16);
  
  // FIX: Combines main imageUrl with the secondaryImageUrls array from your API response
  const displayImages = [
    product.imageUrl,
    ...(product.secondaryImageUrls || [])
  ].filter(Boolean);

  const handleAddToCart = () => {
    addToCart({
      productId: id,
      title: product.name,
      price: currentPrice,
      quantity: quantity,
      image: displayImages[0],
      options: {
        color: "black", // Example option
        size: "M"      // Example option
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-0 py-12 font-sora">
      <nav className="text-sm text-gray-400 mb-8 flex gap-2">
        <Link href={`/`} className="cursor-pointer"><span>Home /</span></Link>
        <Link href={`/product`} className="cursor-pointer"><span>Shop /</span></Link>
        <span className="text-gray-800 font-semibold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[51px]">
        {/* Left: Image Section */}
        <div className="flex gap-2 lg:gap-4">
          <div className="flex flex-col gap-3">
            {displayImages.map((img: string, idx: number) => (
              <div 
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`relative w-[54px] h-[54px] lg:w-[93.4px] lg:h-[96px] rounded-[8px] overflow-hidden cursor-pointer border-2 transition-all 
                  ${activeImg === idx ? "border-[#77923B]" : "border-transparent bg-gray-100"}`}
              >
                <HandledImage src={img} alt="thumb" fill className="object-cover" />
              </div>
            ))}
          </div>

          <div className="relative flex-1 bg-gray-50 rounded-[16px] max-w-[484px] overflow-hidden group h-[342px] md:h-[522px]">
            <HandledImage 
              src={displayImages[activeImg]} 
              alt={product.name} 
              fill 
              className="object-cover mx-auto"
              priority
            />
            {displayImages.length > 1 && (
              <>
                <button onClick={() => setActiveImg(prev => prev === 0 ? displayImages.length - 1 : prev - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-[68px] bg-white cursor-pointer rounded-[16px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <ChevronLeft className="w-9 h-[18px] text-[#332C2C]" />
                </button>
                <button onClick={() => setActiveImg(prev => prev === displayImages.length - 1 ? 0 : prev + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-[68px] bg-white rounded-[16px] cursor-pointer flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <ChevronRight className="w-9 h-[18px] text-[#332C2C]" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="flex flex-col">
          <h1 className="text-[28px] lg:text-[34px] font-bold text-[#121212] leading-1.6 mb-2 lg:mb-4">{product.name}</h1>
          <div className="flex items-center lg:mb-6 mb-[18px]">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < 4 ? "fill-[#F2C94C] text-[#F2C94C]" : "fill-[#7D8F7B] text-[#7D8F7B]"}`} />
              ))}
            </div>
            <span className="text-[#7D8F7B] text-sm ml-2">(56 reviews)</span>
          </div>

          <p className="text-[#333333] text-[16px] lg:text-[18px] lg:mb-2.5 mb-[6px]">Each Pack Contains {product.weight || "100g"} of Premium Tea</p>
          <p className="text-[#333333] text-[16px] lg:text-[18px] mb-8 lg:mb-[52px]">{product.description}</p>

          <div className="flex items-center gap-3 mb-3 lg:mb-4">
            <span className="text-[34px] lg:text-[42px] font-bold text-[#77923B]">Rs.{currentPrice}</span>
            <span className="text-[34px] lg:text-[42px] font-bold text-gray-400  ml-2">{originalPrice}</span>
            <span className="px-3 py-1 bg-[#DB3F34] text-white text-[13px] lg:text-[18px] rounded-[8px] ml-4">16% Discount</span>
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

          <button 
            onClick={handleAddToCart}
            className="w-full md:w-[400px] bg-[#77923B] hover:bg-[#667d32] text-white font-bold py-4 rounded-xl transition-all mb-3 active:scale-[0.98]"
          >
            Add to Cart
          </button>

          <div className="flex items-center gap-2 text-[#333333] text-[16px]">
            <Box className="w-4 h-4" />
            Free 30-Day Return
          </div>
        </div>
      </div>
    </div>
  );
}