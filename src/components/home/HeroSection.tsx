import Image from "next/image";
import Link from "next/link";
import {
  HERO_CONTENT,
  HERO_FEATURES,
  HERO_IMAGE,
} from "@/constants/home/hero.constants";
import type { HeroSectionProps } from "@/types/home/hero.types";

export default function HeroSection({
  content  = HERO_CONTENT,
  features = HERO_FEATURES,
}: HeroSectionProps) {
  return (
    <div className="w-full">

      {/* ══════════════════════════════════════════════════════
          HERO BANNER
      ══════════════════════════════════════════════════════ */}
      <section
        aria-label="Hero"
        className="relative w-full h-screen min-h-150 overflow-hidden"
      >
        {/* Background image */}
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Top gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-44 z-10
                     bg-gradient-to-b from-black/35 to-transparent"
        />

        {/* Bottom gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[65%] z-10
                     bg-gradient-to-t from-black/55 via-black/15 to-transparent"
        />

        {/* Content — bottom-center */}
        <div className="absolute inset-x-0 bottom-0 z-20
                        flex flex-col items-center text-center
                        pb-[34vh] lg:pb-[32vh] px-4 sm:px-6">

          {/* Tagline */}
          <p className="font-sora font-semibold text-white
                        tracking-[0.06em]
                        text-[16px] sm:text-[18px] lg:text-[20px]
                        mb-2 sm:mb-3">
            {content.tagline}
          </p>

          {/* Heading line 1 */}
          <h1 className="font-sora font-extrabold text-white
                         leading-[0.95] tracking-[-0.02em]
                         text-[clamp(2rem,7.5vw,6rem)]">
            {content.headingLine1}
          </h1>

          {/* Heading line 2 — ghosted */}
          <p className="font-sora font-extrabold text-white/40
                        leading-[0.95] tracking-[-0.02em]
                        text-[clamp(2rem,7.5vw,6rem)]
                        -mt-1 sm:-mt-2">
            {content.headingLine2}
          </p>

          {/* CTA */}
          <Link
            href={content.ctaHref}
            className="mt-6 sm:mt-9
                       inline-flex items-center justify-center
                       px-7 sm:px-11 py-2.5 sm:py-4
                       rounded-2xl
                       bg-[#77923B] hover:bg-[#5c7a45]
                       text-white font-sora font-medium
                       text-[14px] sm:text-[16px] lg:text-[18px] tracking-wide
                       transition-all duration-300
                       hover:scale-[1.03] active:scale-100"
          >
            {content.ctaLabel}
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURES STRIP
          ─ Desktop (lg+):  4 cols, icon LEFT + text RIGHT, horizontal dividers
          ─ Mobile  (<lg):  2×2 grid, icon TOP + text BELOW, centered
      ══════════════════════════════════════════════════════ */}
      <div
        aria-label="Why Aroma Tea"
        className="w-full bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-2 lg:grid-cols-4
                         divide-x divide-y lg:divide-y-0 divide-gray-100">
            {features.map((feature) => (
              <li key={feature.id} className="flex flex-col lg:flex-row
                                              items-center lg:items-center
                                              gap-2 lg:gap-4
                                              px-3 sm:px-4 lg:px-6
                                              py-5 lg:py-5
                                              text-center lg:text-left">

                {/* Icon — light green circle bg on ALL screen sizes */}
                <div className="shrink-0
                                w-14 h-14
                                flex items-center justify-center
                                rounded-full bg-[#eef4e8]
                                p-3">
                  <Image
                    src={feature.icon}
                    alt=""
                    aria-hidden="true"
                    width={32}
                    height={32}
                    className="w-7 h-7 lg:w-8 lg:h-8 object-contain"
                  />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="font-sora font-semibold text-gray-900
                                text-[13px] sm:text-[14px] lg:text-[15px]
                                leading-snug">
                    {feature.title}
                  </p>
                  <p className="font-sora text-gray-500
                                text-[11px] sm:text-[12px] lg:text-[13px]
                                mt-0.5 leading-snug">
                    {feature.subtitle}
                  </p>
                </div>

              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}