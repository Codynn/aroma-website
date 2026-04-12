"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReviewsSection from "@/components/produt-detail/CustomerReviews";
import Description from "@/components/produt-detail/Description";
import HowToBrew from "@/components/produt-detail/how-to-brew";
import ProductDetail from "@/components/produt-detail/Top-Section";
import RelatedProducts from "@/components/produt-detail/you-might-also-like";
import { useGetProductById } from "@/services/api/product.api";
import { Loader2 } from "lucide-react";

/**
 * 🎯 Guideline Implementation:
 * This component fetches data client-side based on a query parameter.
 * This allows for a static export without needing generateStaticParams.
 */
function ProductContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  // Fetching dynamic data using your existing TanStack Query hook
  const { data: product, isLoading, isError } = useGetProductById(slug || "");

  if (!slug) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500 font-medium">Please select a product from our shop.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#77923B]" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 font-bold">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <ProductDetail product={product} />
      <Description product={product} />
      <HowToBrew product={product} />
      <ReviewsSection productId={product.id} />
      <RelatedProducts />
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    /**
     * ✅ Why Suspense?
     * Next.js static export requires useSearchParams to be wrapped in Suspense
     * to prevent build-time de-optimization errors.
     */
    <Suspense 
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-[#77923B]" />
        </div>
      }
    >
      <ProductContent />
    </Suspense>
  );
}