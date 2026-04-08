"use client";

import React, { useState } from "react";
import Image from "next/image";

import Link from "next/link";
import { Star, Loader2, ChevronDown, X } from "lucide-react";

// API & Custom Components
import { useGetProducts } from "@/services/api/product.api";
import HandledImage from "@/components/shared/HandleImage";

// Shadcn UI Components
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";


const ITEMS_PER_PAGE = 20;

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);

  
  // 1. Applied Filters State (What actually triggers the API)
  const [appliedFilters, setAppliedFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 10000,
    sortBy: "updatedAt",
    sortOrder: "desc"
  });

  // 2. Draft UI State (Visual only until "Apply" is clicked)
  const [tempCategory, setTempCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  // 3. API Integration
  const { data, isLoading } = useGetProducts({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    category: appliedFilters.category,
    minPrice: appliedFilters.minPrice,
    maxPrice: appliedFilters.maxPrice,
    sortBy: appliedFilters.sortBy,
    sortOrder: appliedFilters.sortOrder
  });


 

  const products = data?.data || [];
  const totalPages = data?.totalPages || 1;

  // Logic to sync draft state to applied state
  const handleApplyFilters = () => {
    setAppliedFilters((prev) => ({
      ...prev,
      category: tempCategory,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    }));
    setCurrentPage(1); // Reset to first page on new filter
  };

  const handleSortChange = (option: string) => {
    let sortBy = "updatedAt";
    if (option === "Most Popular") sortBy = "soldQuantity";
    if (option === "Recently Sold") sortBy = "updatedAt"; // or specific logic
    
    setAppliedFilters(prev => ({ ...prev, sortBy }));
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= priceRange[1]) setPriceRange([value, priceRange[1]]);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= priceRange[0]) setPriceRange([priceRange[0], value]);
  };

  return (

    <div className="max-w-7xl flex flex-col items-center justify-center mx-auto px-4 min-h-screen">
      {/* ── 1. Mirrored Heading ── */}
      <div className="flex flex-col justify-center items-center mb-[24px] md:mb-[64px]">
        <h1 className="mt-[90px] font-bold md:text-[100px] text-[38px] text-[#9BA87D] leading-0 ">
          Discover Our Teas
        </h1>
        <h1
          className="font-bold md:text-[100px] text-[38px] scale-y-[-1] bg-gradient-to-t from-[#9BA87D]/12 to-transparent 
                   bg-clip-text text-transparent select-none  -mt-1"
        >

        </h1>
      </div>

      {/* Toolbar */}
      <div className="w-full flex justify-between items-center mb-12">

        
        {/* Desktop Filter */}
        <div className="hidden md:block">
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 px-6 py-2.5 border border-[#7D8F7B] rounded-[16px] hover:bg-gray-50 transition-all cursor-pointer">
                <Image src="/Images/MenuIcon.svg" alt="Filter" width={19} height={16} />
                <span className="font-sora text-[18px]">Open Filter</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-transparent border-none shadow-none p-0 focus:ring-0">
              <DialogTitle className="sr-only">Product Filters</DialogTitle>
              <div className="flex justify-start mb-4">
                <DialogClose className="bg-white px-5 py-2 rounded-full flex items-center gap-2 text-sm font-sora border shadow-sm hover:bg-gray-50 cursor-pointer">
                  <X className="w-4 h-4" /> Close Filter
                </DialogClose>
              </div>
              
              <div className="p-8 bg-[#F1F8EC] rounded-[24px] w-full border border-[#7D8F7B]/10 shadow-xl">
                <div className="flex flex-col gap-10">
                  <div>
                    <h4 className="font-sora font-bold text-gray-900 mb-6 text-[18px]">Category</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {["Black Tea", "White Tea", "Green Tea", "Golden Needles Tea"].map((type) => (
                        <div key={type} className="flex items-center space-x-3 group">
                          <Checkbox 
                            id={type} 
                            checked={tempCategory === type}
                            onCheckedChange={() => setTempCategory(type === tempCategory ? "" : type)}
                            className="border-[#7D8F7B] w-5 h-5 data-[state=checked]:bg-[#77923B]" 
                          />
                          <label htmlFor={type} className="text-[15px] font-sora text-gray-700 cursor-pointer group-hover:text-[#77923B] transition-colors">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="flex justify-between items-end mb-8">
                      <h4 className="font-sora font-bold text-gray-900 text-[18px]">Price Range</h4>
                      <span className="text-[14px] font-sora font-bold text-[#77923B] tabular-nums">
                        Rs. {priceRange[0]} — Rs. {priceRange[1]}
                      </span>
                    </div>
                    <div className="px-2 touch-none"> 
                      <Slider
                        value={priceRange} 
                        min={0}
                        max={10000}
                        step={10} 
                        onValueChange={setPriceRange}
                        className="cursor-grab active:cursor-grabbing py-4"
                      />
                    </div>
                    
                    <div className="flex gap-4 mt-6">
                      <div className="flex-1 bg-white/60 backdrop-blur-sm border border-[#7D8F7B]/20 rounded-xl px-4 py-3 shadow-inner">
                        <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Minimum</p>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400 text-sm font-sora">Rs.</span>
                          <input type="number" value={priceRange[0]} onChange={handleMinInputChange} className="w-full bg-transparent font-sora font-bold outline-none" />
                        </div>
                      </div>
                      <div className="flex-1 bg-white/60 backdrop-blur-sm border border-[#7D8F7B]/20 rounded-xl px-4 py-3 shadow-inner">
                        <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Maximum</p>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400 text-sm font-sora">Rs.</span>
                          <input type="number" value={priceRange[1]} onChange={handleMaxInputChange} className="w-full bg-transparent font-sora font-bold outline-none" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-12">
                  <DialogClose asChild>
                    <button className="px-8 py-3 border border-[#7D8F7B] rounded-xl font-sora font-bold text-gray-600 hover:bg-white transition-all">
                      Cancel
                    </button>
                  </DialogClose>
                  <DialogClose asChild>
                    <button onClick={handleApplyFilters} className="px-10 py-3 bg-[#77923B] text-white rounded-xl font-sora font-bold hover:shadow-lg transition-all">
                      Apply Filter
                    </button>
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Filter */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-1 px-[14px] py-2 border border-[#7D8F7B] rounded-[16px]">
                <Image src="/Images/MenuIcon.png" alt="Filter" width={19} height={16} />
                <span className="font-sora text-[12px]">Open Filter</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-[32px] p-0 border-none h-[85vh] bg-[#F1F8EC]">
              <SheetTitle className="sr-only">Filters</SheetTitle>
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-4 mb-8" />
              <div className="px-6 pb-12">
                <div className="flex flex-col gap-10">
                  <div>
                    <h4 className="font-sora font-bold text-gray-900 mb-6 text-[18px]">Category</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {["Black Tea", "White Tea", "Green Tea", "Golden Needles Tea"].map((type) => (
                        <div key={type} className="flex items-center space-x-3 bg-white/50 p-3 rounded-xl">
                          <Checkbox 
                            id={`mob-${type}`} 
                            checked={tempCategory === type}
                            onCheckedChange={() => setTempCategory(type === tempCategory ? "" : type)}
                            className="border-[#7D8F7B] w-5 h-5 data-[state=checked]:bg-[#77923B]" 
                          />
                          <label htmlFor={`mob-${type}`} className="text-[15px] font-sora text-gray-700 w-full">{type}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full">
                    <h4 className="font-sora font-bold text-gray-900 text-[18px] mb-4">Price Range</h4>
                    <Slider value={priceRange} min={0} max={10000} onValueChange={setPriceRange} className="py-4" />
                    <div className="flex gap-3 mt-4">
                        <div className="flex-1 bg-white p-3 rounded-xl border border-[#7D8F7B]/20">
                            <span className="text-[10px] text-gray-400 block uppercase">Min</span>
                            <input type="number" value={priceRange[0]} onChange={handleMinInputChange} className="w-full bg-transparent font-bold outline-none" />
                        </div>
                        <div className="flex-1 bg-white p-3 rounded-xl border border-[#7D8F7B]/20">
                            <span className="text-[10px] text-gray-400 block uppercase">Max</span>
                            <input type="number" value={priceRange[1]} onChange={handleMaxInputChange} className="w-full bg-transparent font-bold outline-none" />
                        </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 mt-4">
                    <SheetTrigger asChild>
                      <button onClick={handleApplyFilters} className="w-full py-4 bg-[#77923B] text-white rounded-xl font-sora font-bold shadow-lg">
                        Apply Filter
                      </button>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                      <button className="w-full py-4 border border-[#7D8F7B] rounded-xl font-sora font-bold text-gray-600 bg-white">
                        Cancel
                      </button>
                    </SheetTrigger>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-5 py-2 md:px-7 md:py-3 border bg-[#77923B] rounded-[16px] outline-none">
              <span className="font-sora text-white text-[12px] md:text-[18px]">
                {appliedFilters.sortBy === "soldQuantity" ? "Most Popular" : "Latest"}
              </span>
              <ChevronDown className="text-white w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] rounded-xl font-sora p-2">
            <DropdownMenuItem onClick={() => handleSortChange("Latest")} className="cursor-pointer">Latest</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSortChange("Most Popular")} className="cursor-pointer">Most Popular</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="w-12 h-12 animate-spin text-[#77923B]" />
        </div>
      ) : products.length > 0 ? ( // FIX: Removed the extra '{' here
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4 md:gap-y-8 w-full mb-12 lg:mb-16">
            {products.map((product: any) => (
              <Link 
                href={`/product/${product.slug}`} 
                key={product.id} 
                className="flex flex-col mx-auto group cursor-pointer w-full"
              >
                <div className="relative overflow-hidden rounded-[24px] bg-gray-50 aspect-[3/4] w-full mb-4 shadow-sm">
                  <HandledImage 
                    src={product.imageUrl} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                <div className="flex justify-between items-start px-1">
                  <h3 className="font-sora font-semibold text-[14px] md:text-[20px] line-clamp-1 group-hover:text-[#77923B] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#F2C94C] text-[#F2C94C]" />
                    <span className="font-sora font-medium text-[12px] md:text-[14px]">{product.averageRating?.toFixed(1)}</span>
                  </div>
                </div>
                <p className="font-sora font-bold text-[18px] md:text-[24px] text-[#77923B] px-1">
                  Rs. {product.sellingPrice}
                </p>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-4 md:gap-8 mb-20">
            <button 
              disabled={currentPage === 1} 
              onClick={() => { setCurrentPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="font-sora font-bold text-[#77923B] disabled:opacity-20 cursor-pointer"
            >
              Prev
            </button>
            <div className="flex gap-3">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button 
                  key={page} 
                  onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl font-sora font-bold transition-all
                    ${currentPage === page ? "bg-[#77923B] text-white" : "bg-white text-[#77923B] border border-[#77923B]/20"}`}
                >
                  {page < 10 ? `0${page}` : page}
                </button>
              ))}
            </div>
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="font-sora font-bold text-[#77923B] disabled:opacity-20 cursor-pointer"
            >
              Next
            </button>
          </div>
        </>
      ) : ( // FIX: This is the "else" for products.length > 0
        <div className="flex flex-col items-center justify-center text-center px-4 py-12">
  {/* Cube Icon Container */}
  <div className="relative mb-6 transition-transform duration-500 hover:scale-110">
    <div className="relative w-[80px] h-[84px] md:w-[140px] md:h-[147px]">
      <Image
        src="/Images/cube.png"
        alt="Cube Icon"
        fill
        className="object-contain"
        priority
      />
    </div>
  </div>

  <p className="text-center text-[42px] text-black leading-1">Product coming Soon</p>

  {/* Text Content */}
  <h2 className="text-[#1A1A1A] font-sora font-extrabold text-[18px] md:text-[28px]  leading-tight mb-4">
    Everything you need <br className="hidden md:block" /> to know about our tea
  </h2>
  
  <Link href={`/`}>
   <button className="text-white bg-[#77923B] p-2 md:py-3 md:px-7 font-sora text-[14px] md:text-[18px] leading-relaxed">
    Notify me When Available </button>
  </Link>
 
</div>
      )}
    </div>
  );
}
