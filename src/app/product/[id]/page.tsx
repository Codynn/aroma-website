"use client";

import React, { use } from "react";
import ReviewsSection from "@/components/produt-detail/CustomerReviews";
import Description from "@/components/produt-detail/Description";
import HowToBrew from "@/components/produt-detail/how-to-brew";
import ProductDetail from "@/components/produt-detail/Top-Section";
import RelatedProducts from "@/components/produt-detail/you-might-also-like";
import { useGetProductById } from "@/services/api/product.api";
import { Loader2 } from "lucide-react";

// Define the type for the page props
interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  // Unwrap the params promise to get the id
  const { id } = use(params);

  // Fetch the product data here so we can pass it to children
  const { data: product, isLoading, isError } = useGetProductById(id);

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
        <p className="text-red-500 font-bold font-sora">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Pass the id to ProductDetail */}
      <ProductDetail id={id} />
      
      {/* FIX: Pass the fetched product data to the Description component */}
      <Description product={product} />
      
      <HowToBrew />
      <ReviewsSection />
      <RelatedProducts />
    </div>
  );
}