import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

// ── Mock Data (Modify these image URLs as needed) ────────────────────────────
const RELATED_PRODUCTS = [
  { id: 1, name: "Golden Needles", price: 50, rating: 5.0, image: "/Images/goldern_needle_normal.png", href: "/product/golden-needles" },
  { id: 2, name: "Golden Tips Normal", price: 50, rating: 5.0, image: "/Images/golden_leaves.png", href: "/product/golden-tips" },
  { id: 3, name: "White Needle Tip", price: 50, rating: 5.0, image: "/Images/white_needles.png", href: "/product/white-needle-tip" },
  { id: 4, name: "White Needle Normal", price: 50, rating: 5.0, image: "/Images/golden_leaves.png", href: "/product/white-needle-normal" },
];

function RelatedTeaCard({ product }: { product: typeof RELATED_PRODUCTS[0] }) {
  return (
    <Link href={product.href} className="group block">
      <div className="relative w-full aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          
          width={293}
          height={352}
          className="object-cover object-center rounded-[16px] md:w-[293px] md:h-[352px] group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="mt-4 px-1">
        <div className="flex items-center justify-between gap-1">
          <p className="font-sora  text-black text-[18px] md:text-[19px] leading-1.6 truncate">
            {product.name}
          </p>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-6 h-6 fill-[#F5C519] text-[#F5C519]" strokeWidth={0} />
            <span className="font-sora text-[14px] md:text-[16px] text-gray-700">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>
        <p className="font-sora font-semibold text-[#77923B] text-[20px] md:text-[24px] mt-1">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}

export default function RelatedProducts() {
  return (
    <section className="w-full bg-white my-25 md:my-[180px]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-sora font-bold text-black text-center text-[42px] md:text-[50px] mb-6 md:mb-8">
          You Might Also Like
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {RELATED_PRODUCTS.map((product) => (
            <RelatedTeaCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}