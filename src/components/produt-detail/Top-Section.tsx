"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Minus, Plus, Box } from "lucide-react";

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
    images: ["/Images/golden_leaves.png", "/Images/white_needles.png", "/Images/golden_leaves.png", "/Images/white_needles.png", "/Images/golden_leaves.png"]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sora">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-400 mb-8 flex gap-2">
        <span>Home /</span> <span>Shop /</span> <span className="text-gray-800 font-semibold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left: Image Section */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {product.images.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all 
                  ${activeImg === idx ? "border-[#77923B]" : "border-transparent bg-gray-100"}`}
              >
                <Image src={img} alt="thumb" fill className="object-cover" />
              </div>
            ))}
          </div>

          {/* Main Display */}
          <div className="relative flex-1 bg-gray-50 rounded-3xl overflow-hidden group h-[500px]">
            <Image 
              src={product.images[activeImg]} 
              alt="main product" 
              fill 
              className="object-cover"
            />
            
            {/* Navigation Arrows */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < product.rating ? "fill-[#F2C94C] text-[#F2C94C]" : "text-gray-300"}`} 
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
          </div>

          <p className="text-gray-500 font-medium mb-4">Each Pack Contains {product.weight} of Premium Tea</p>
          <p className="text-gray-600 leading-relaxed mb-8 max-w-lg">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-5xl font-bold text-[#77923B]">${product.currentPrice}</span>
            <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
            <span className="px-3 py-1 bg-[#EB5757] text-white text-sm rounded-lg font-bold">
              {product.discount}
            </span>
          </div>

          <div className="flex items-center gap-6 mb-10">
            <span className="font-bold text-xl text-gray-900">Quantity:</span>
            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-2 gap-6">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-black transition-colors">
                <Minus className="w-5 h-5" />
              </button>
              <span className="font-bold text-lg min-w-[20px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-black transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <button className="w-full md:w-[400px] bg-[#77923B] hover:bg-[#667d32] text-white font-bold py-4 rounded-xl transition-all shadow-lg mb-4">
            Add to Cart
          </button>

          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
            <Box className="w-4 h-4" />
            Free 30-Day Return
          </div>
        </div>
      </div>
    </div>
  );
}