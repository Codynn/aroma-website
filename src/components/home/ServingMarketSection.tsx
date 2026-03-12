import Image from 'next/image'
import {
  SERVING_MARKETS_CONTENT,
} from '@/constants/home/servingMarket.constants'
import type { ServingMarketsSectionProps } from '@/types/home/servingMarket.types'

export default function ServingMarketsSection({
  content = SERVING_MARKETS_CONTENT,
}: ServingMarketsSectionProps) {
  return (
    <section
      aria-labelledby="serving-markets-heading"
      className="w-full  py-12 sm:py-16 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">

          {/* ── LEFT — Map + curve + plane ─────────────────────────────── */}
          <div className="relative w-[80vw] lg:w-[45%] shrink-0">

            {/* World map */}
            <Image
              src={content.mapImage}
              alt="World map showing shipping regions"
              width={700}
              height={460}
              className="w-full h-auto object-contain"
              priority
            />

            {/* Dashed curve line — overlaid on top of map */}
            <Image
              src={content.curveImage}
              alt=""
              aria-hidden="true"
              width={700}
              height={460}
              className="absolute inset-0 w-full h-full object-contain"
            />

            {/* Plane icon — positioned at the end of the curve (top-right area) */}
            <Image
              src={content.planeImage}
              alt=""
              aria-hidden="true"
              width={52}
              height={52}
              className="
                absolute
                top-[14%] right-[-8%]
                sm:top-[14%] sm:right-[8%]
                lg:top-[14%] lg:right-[-8%]
                w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14
                object-contain
              "
            />

          </div>

          {/* ── RIGHT — Text content ────────────────────────────────────── */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center
                          text-center lg:text-left">

            <h2
              id="serving-markets-heading"
              className="font-sora font-bold text-[#77923B]
                         text-[1.75rem] sm:text-[2.25rem] lg:text-[2.6rem]
                         leading-[1.15] tracking-tight
                         mb-5 sm:mb-6"
            >
              {content.heading}
            </h2>

            <p
              className="font-sora font-medium text-gray-600
                         text-[16px] sm:text-[16px] lg:text-[18px]
                         leading-relaxed max-w-prose mx-auto lg:mx-0"
            >
              {content.description}
            </p>

          </div>

        </div>
      </div>
    </section>
  )
}