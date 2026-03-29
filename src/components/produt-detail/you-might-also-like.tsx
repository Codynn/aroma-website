"use client";

import Link from "next/link";
import { Star, Loader2 } from "lucide-react";
import HandledImage from "@/components/shared/HandleImage";
import { useGetProducts } from "@/services/api/product.api";

// ── Related Tea Card ─────────────────────────────────────────────────────────
function RelatedTeaCard({ product }: { product: any }) {
  // Image handling from MostValuedTeas reference
  const displayImage = 
    product.imageUrl || 
    (product.secondaryImageUrls && product.secondaryImageUrls[0]) || 
    "/placeholder.png";

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative w-full aspect-square md:w-[293px] md:h-[352px] bg-gray-50 rounded-[16px] overflow-hidden">
        <HandledImage
          src={displayImage}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="mt-4 px-1">
        <div className="flex items-center justify-between gap-1">
          <p className="font-sora text-black text-[18px] md:text-[19px] leading-1.6 truncate">
            {product.name}
          </p>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-5 h-5 fill-[#F5C519] text-[#F5C519]" strokeWidth={0} />
            <span className="font-sora text-[14px] md:text-[16px] text-gray-700">
              5.0
            </span>
          </div>
        </div>
        <p className="font-sora font-semibold text-[#77923B] text-[20px] md:text-[24px] mt-1">
          Rs. {product.sellingPrice}
        </p>
      </div>
    </Link>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function RelatedProducts() {
  // Fetch 4 products (mimicking 'Most Valued' logic)
  const { data, isLoading } = useGetProducts({ page: 1, limit: 4 });
  const products = data?.data || [];

  if (isLoading) {
    return (
      <div className="w-full py-10 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#77923B]" />
      </div>
    );
  }

  // If no products found, don't render the section
  if (products.length === 0) return null;

  return (
    <section className="w-full bg-white my-25 md:my-[180px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-sora font-bold text-black text-center text-[42px] md:text-[50px] mb-6 md:mb-8">
          You Might Also Like
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product: any) => (
            <RelatedTeaCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}