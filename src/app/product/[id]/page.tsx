"use client";

import React, { use } from "react";
import ReviewsSection from "@/components/produt-detail/CustomerReviews";
import Description from "@/components/produt-detail/Description";
import HowToBrew from "@/components/produt-detail/how-to-brew";
import ProductDetail from "@/components/produt-detail/Top-Section";
import RelatedProducts from "@/components/produt-detail/you-might-also-like";

// Define the type for the page props
interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  // Unwrap the params promise to get the id
  const { id } = use(params);

  return (
    <div className="flex flex-col gap-6">
      {/* Pass the id to ProductDetail to satisfy the 'TopSectionProps' requirement */}
      <ProductDetail id={id} />
      <Description />
      <HowToBrew />
      <ReviewsSection />
      <RelatedProducts />
    </div>
  );
}