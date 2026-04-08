"use client";

import React, { use } from "react";
import ReviewsSection from "@/components/produt-detail/CustomerReviews";
import Description from "@/components/produt-detail/Description";
import HowToBrew from "@/components/produt-detail/how-to-brew";
import ProductDetail from "@/components/produt-detail/Top-Section";
import RelatedProducts from "@/components/produt-detail/you-might-also-like";
import { useGetProductById } from "@/services/api/product.api";
import { Loader2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function Page({ params }: PageProps) {
  const { slug } = use(params);

  // Fetch using the slug from the URL
  const { data: product, isLoading, isError } = useGetProductById(slug);

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
      {/* FIX: Passing 'product' instead of 'id'. 
          This resolves the TS error and ensures the UUID (product.id) is used for the cart.
      */}
      <ProductDetail product={product} />
      
      <Description product={product} />
      
      <HowToBrew product={product} />
      <ReviewsSection productId={product.id} />
      <RelatedProducts />
    </div>
  );
}