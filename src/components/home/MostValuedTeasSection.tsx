import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MOST_VALUED_TEAS,
  MVT_SECTION_HEADING,
  MVT_VIEW_ALL_LABEL,
  MVT_VIEW_ALL_HREF,
} from "@/constants/home/mostvalueteas.constants";
import type {
  MostValuedTeasProps,
  TeaProduct,
} from "@/types/home/mostvalueteas.types";

// ── Tea Card — flat, no border, no shadow, matches Figma exactly ──────────────
function TeaCard({ product }: { product: TeaProduct }) {
  return (
    <Link href={product.href} className="group block">
      {/* Image */}
      <div className="relative w-full aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover object-center rounded-xl
                     group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Info — flush with image, no extra card wrapper */}
      <div className="mt-3">
        {/* Row: Name  ·  ⭐ 5.0 */}
        <div className="flex items-center justify-between gap-1">
          <p
            className="font-sora font-medium text-gray-900
                        text-[16px] sm:text-[16px] lg:text-[18px]
                        leading-snug truncate"
          >
            {product.name}
          </p>
          <div className="flex items-center gap-1 shrink-0">
            <Star
              className="w-3.5 h-3.5 lg:w-5.5 lg:h-5.5 fill-[#f5a623] text-[#f5a623]"
              strokeWidth={0}
            />
            <span className="font-sora text-[16px] sm:text-[16px] lg:text-[18px] text-gray-700">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Price */}
        <p
          className="font-sora font-bold text-[#77923B]
                      text-[16px] sm:text-[16px] lg:text-[18px]
                      mt-1"
        >
          ${product.price}
        </p>
      </div>
    </Link>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function MostValuedTeas({
  products = MOST_VALUED_TEAS,
}: MostValuedTeasProps) {
  return (
    <section
      aria-labelledby="most-valued-heading"
      className="w-full bg-white mt-4 py-10 sm:py-14 lg:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2
          id="most-valued-heading"
          className="font-sora font-bold text-[#77923B] text-center
                     text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem]
                     leading-tight mb-8 sm:mb-10 lg:mb-12"
        >
          {MVT_SECTION_HEADING}
        </h2>

        {/* Grid: 2 cols mobile · 4 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {products.map((product) => (
            <TeaCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <Button
            asChild
            className="
              w-full sm:w-auto
              rounded-full
              bg-[#77923B] hover:bg-[#3d6835]
              text-white font-sora font-medium
              text-[14px] sm:text-[15px]
              px-10 h-11 sm:h-12
              transition-all duration-300
            "
          >
            <Link href={MVT_VIEW_ALL_HREF}>{MVT_VIEW_ALL_LABEL}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
