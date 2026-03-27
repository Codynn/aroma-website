"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import HandledImage from "@/components/shared/HandleImage";
import {
  MVT_SECTION_HEADING,
  MVT_VIEW_ALL_LABEL,
  MVT_VIEW_ALL_HREF,
} from "@/constants/home/mostvalueteas.constants";
import { useGetProducts } from "@/services/api/product.api";

// ── Tea Card ──────────────────────────────────────────────────────────────────
function TeaCard({ product }: { product: any }) {
  // Use the same price logic as Top-Section.tsx
  const currentPrice = product.sellingPrice;
  

  // Use the same image fallback logic as Top-Section.tsx
  const displayImage = product.imageUrl || (product.secondaryImageUrls && product.secondaryImageUrls[0]) || "/placeholder.png";

  return (
    <Link href={`/product/${product.id}`} className="group block">
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden">
        <HandledImage
          src={displayImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Info Section */}
      <div className="mt-3">
        <div className="flex items-center justify-between gap-1">
          <p className="font-sora font-medium text-gray-900 text-[16px] lg:text-[18px] leading-snug truncate">
            {product.name}
          </p>
          <div className="flex items-center gap-1 shrink-0">
            <Star
              className="w-3.5 h-3.5 lg:w-5.5 lg:h-5.5 fill-[#f5a623] text-[#f5a623]"
              strokeWidth={0}
            />
            <span className="font-sora text-[16px] lg:text-[18px] text-gray-700">
              5.0
            </span>
          </div>
        </div>

        {/* Price Display following Top-Section pattern */}
        <div className="flex items-center gap-2 mt-1">
          <p className="font-sora font-bold text-[#77923B] text-[16px] lg:text-[18px]">
            Rs.{currentPrice}
          </p>
          
        </div>
      </div>
    </Link>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function MostValuedTeas() {
  // Fetch only 4 products for this section
  const { data, isLoading } = useGetProducts(1, 4);
  const products = data?.data || [];

  if (isLoading) {
    return (
      <div className="w-full py-20 flex justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#77923B]" />
      </div>
    );
  }

  return (
    <section aria-labelledby="most-valued-heading" className="w-full bg-white mt-4 py-10 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="most-valued-heading" className="font-sora font-bold text-[#77923B] text-center text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight mb-8 sm:mb-10 lg:mb-12">
          {MVT_SECTION_HEADING}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {products.map((product: any) => (
            <TeaCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 sm:mt-10 flex justify-center">
          <Button asChild className="w-full sm:w-auto rounded-full bg-[#77923B] hover:bg-[#3d6835] text-white font-sora font-medium text-[14px] sm:text-[15px] px-10 h-11 sm:h-12 transition-all duration-300">
            <Link href={MVT_VIEW_ALL_HREF}>{MVT_VIEW_ALL_LABEL}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}