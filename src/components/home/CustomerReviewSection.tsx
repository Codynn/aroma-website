import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  CUSTOMER_REVIEWS_CONTENT,
  CUSTOMER_REVIEWS,
} from '@/constants/home/customerReview.constants'
import type {
  CustomerReviewsSectionProps,
  Review,
} from '@/types/home/customerReview.types'

// ── Reusable star row ─────────────────────────────────────────────────────────
function Stars({
  rating,
  max = 5,
  size = 'md',
}: {
  rating: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
}) {
  const sz = size === 'lg' ? 'w-7 h-7' : size === 'md' ? 'w-5 h-5' : 'w-4 h-4'
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={sz}
          fill={i < Math.round(rating) ? '#f5a623' : '#e5e7eb'}
          stroke="none"
        />
      ))}
    </div>
  )
}

// ── Single review card ────────────────────────────────────────────────────────
function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="bg-[#E8F9E5] border-0 shadow-none rounded-2xl p-0">
      <CardContent className="flex flex-col gap-4 p-5 sm:p-6">

        {/* Stars */}
        <Stars rating={review.rating} size="lg" />

        {/* Quote */}
        <p className="font-sora text-gray-700
                      text-[16px] sm:text-[16px] lg:text-[18px]
                      leading-relaxed flex-1">
          {review.quote}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 mt-1">
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src={review.avatar}
              alt={review.author}
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div>
            <p className="font-sora font-semibold text-gray-900  text-[16px] sm:text-[16px] lg:text-[18px] leading-snug">
              {review.author}
            </p>
            <p className="font-sora text-gray-500  text-[16px] sm:text-[16px] lg:text-[18px]">
              {review.location}
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function CustomerReviewsSection({
  content = CUSTOMER_REVIEWS_CONTENT,
  reviews = CUSTOMER_REVIEWS,
}: CustomerReviewsSectionProps) {
  return (
    <section
      aria-labelledby="reviews-heading"
      className="w-full bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Subtitle */}
        <p className="font-sora text-gray-500 text-center
                      text-[16px] sm:text-[16px] lg:text-[18px]
                      mb-2">
          {content.subtitle}
        </p>

        {/* Heading */}
        <h2
          id="reviews-heading"
          className="font-sora font-bold text-[#77923B] text-center
                     text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem]
                     leading-tight mb-8 sm:mb-10 lg:mb-12"
        >
          {content.heading}
        </h2>

        {/* ── Body: rating left + cards right ── */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

          {/* ── LEFT — Overall Rating ── */}
          <div className="w-full lg:w-56 shrink-0
                          flex flex-col lg:flex-col
                          items-center lg:items-start
                          gap-4 lg:gap-3">

            {/* Big score */}
            <div className="flex items-baseline gap-1 shrink-0">
              <span className="font-sora font-bold text-gray-900
                               text-[3rem] sm:text-[3.5rem] lg:text-[4rem]
                               leading-none">
                {content.overallRating.toFixed(1)}
              </span>
              <span className="font-sora font-semibold text-gray-400
                               text-[16px] sm:text-[16px] lg:text-[18px]">
                /{content.maxRating}
              </span>
            </div>

            {/* Stars + review count */}
            <div className="flex flex-col gap-1.5">
              <Stars rating={content.overallRating} size="md" />
              <p className="font-sora text-gray-500 text-[16px] sm:text-[16px] lg:text-[18px]">
                Based on {content.totalReviews} reviews
              </p>

              {/* View all button — visible on desktop here */}
              <Button
                asChild
                variant="outline"
                className="hidden lg:inline-flex mt-3
                           rounded-full border border-gray-900
                           bg-transparent hover:bg-gray-50
                           text-gray-900 font-sora font-medium
                           text-[16px] sm:text-[14px] lg:text-[18px] px-5 h-10
                           transition-all duration-200"
              >
                <Link href={content.viewAllHref}>
                  {content.viewAllLabel}
                </Link>
              </Button>
            </div>

          </div>

          {/* ── RIGHT — Review cards ── */}
          <div className="flex-1 w-full flex flex-col gap-4">

            {/* Cards grid — 1 col mobile / 2 cols sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {/* View all button — full width, bottom, MOBILE ONLY */}
            <Button
              asChild
              variant="outline"
              className="lg:hidden w-full mt-2
                         rounded-full border border-gray-900
                         bg-transparent hover:bg-gray-50
                         text-gray-900 font-sora font-medium
                         text-[14px] h-11
                         transition-all duration-200"
            >
              <Link href={content.viewAllHref}>
                {content.viewAllLabel}
              </Link>
            </Button>

          </div>
        </div>

      </div>
    </section>
  )
}