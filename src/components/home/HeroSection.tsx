import { HERO_CONTENT, HERO_FEATURES, HERO_IMAGE } from '@/constants/home/hero.constants'
import { HeroSectionProps } from '@/types/home/hero.types'
import Image from 'next/image'
import Link from 'next/link'


export default function HeroSection({
  content  = HERO_CONTENT,
  features = HERO_FEATURES,
}: HeroSectionProps) {
  return (
    // Wrapper — hero + features strip stacked
    <div className="w-full">

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <section
        aria-label="Hero"
        className="relative w-full h-screen min-h-[600px] overflow-hidden"
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

        {/* Top gradient — navbar breathing room */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-44 z-10
                     bg-gradient-to-b from-black/30 to-transparent"
        />

        {/* Bottom gradient — text legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[70%] z-10
                     bg-gradient-to-t from-black/50 via-black/15 to-transparent"
        />

        {/* Content — pinned bottom-center */}
        <div
          className="
            absolute inset-x-0 bottom-0 z-20
            flex flex-col items-center text-center
            pb-[10vh] sm:pb-[12vh]
            px-4 sm:px-6
          "
        >
          {/* Tagline */}
          <p className="font-sora font-normal text-white tracking-[0.08em]
                        text-base sm:text-lg lg:text-xl mb-2 sm:mb-3">
            {content.tagline}
          </p>

          {/* Heading line 1 — solid white */}
          <h1 className="font-sora font-extrabold text-white
                         leading-none tracking-[-0.01em]
                         text-[clamp(2.8rem,8vw,6.5rem)]
                         whitespace-nowrap">
            {content.headingLine1}
          </h1>

          {/* Heading line 2 — ghosted white */}
          <p className="font-sora font-extrabold text-white/40
                        leading-none tracking-[-0.01em]
                        text-[clamp(2.8rem,8vw,6.5rem)]
                        whitespace-nowrap -mt-1 sm:-mt-2">
            {content.headingLine2}
          </p>

          {/* CTA */}
          <Link
            href={content.ctaHref}
            className="
              mt-8 sm:mt-10
              inline-flex items-center justify-center
              px-9 sm:px-12 py-3.5 sm:py-4 rounded-full
              bg-[#5a7a45]/80 hover:bg-[#5a7a45]
              text-white font-sora font-medium
              text-sm sm:text-[15px] tracking-wide
              border border-white/10 shadow-md
              transition-all duration-300
              hover:shadow-lg hover:scale-[1.03] active:scale-100
            "
          >
            {content.ctaLabel}
          </Link>
        </div>
      </section>

      {/* ── Features Strip ──────────────────────────────────────────────── */}
      {/*
        Desktop : 4 columns in a single row  (gap dividers between)
        Mobile  : 2 × 2 grid
      */}
      <div
        aria-label="Why Aroma Tea"
        className="w-full bg-white border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="
            grid grid-cols-2 md:grid-cols-4
            divide-y-2 divide-x-0
            md:divide-y-0 md:divide-x-2
            divide-gray-100
          ">
            {features.map((feature) => (
              <li
                key={feature.id}
                className="
                  flex items-start gap-3
                  px-4 sm:px-6 py-5 sm:py-6
                  group
                "
              >
                {/* Icon */}
                <div className="shrink-0 mt-0.5">
                  <Image
                    src={feature.icon}
                    alt=""
                    aria-hidden="true"
                    width={32}
                    height={32}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain opacity-70
                               group-hover:opacity-100 transition-opacity duration-200"
                  />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="font-sora font-semibold text-gray-900
                                text-sm sm:text-[15px] leading-snug">
                    {feature.title}
                  </p>
                  <p className="font-sora text-gray-500 text-xs sm:text-sm
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
  )
}