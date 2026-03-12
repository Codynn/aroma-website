import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'
import {
  TEA_STORIES_CONTENT,
  TEA_STORIES_VIDEOS,
  TEA_STORIES_SOCIALS,
} from '@/constants/home/teaStories.constants'
import type {
  TeaStoriesSectionProps,
  StoryVideo,
  SocialLink,
} from '@/types/home/teaStories.types'


// ── Video thumbnail card ──────────────────────────────────────────────────────
function VideoCard({ video, className = '' }: { video: StoryVideo; className?: string }) {
  return (
    <Link
      href={video.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden rounded-2xl bg-gray-200 ${className}`}
    >
      <Image
        src={video.image}
        alt={video.alt}
        fill
        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 30vw"
        className="object-cover object-center
                   group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 z-[5]" />
      {/* <PlayOverlay /> */}
    </Link>
  )
}

// ── Follow Us block — uses SVG files from /icons/ ────────────────────────────
function FollowUs({ label, socials }: { label: string; socials: SocialLink[] }) {
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="font-sora font-bold text-gray-900
                    text-[16px] sm:text-[16px] lg:text-[18px]">
        {label}
      </p>
      <div className="flex items-center gap-5">
        {socials.map((s) => (
          <Link
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="hover:opacity-75 transition-opacity duration-200"
          >
            <Image
              src={`/icons/${s.icon}.svg`}
              alt={s.label}
              width={28}
              height={28}
              className="w-8 h-8 object-contain"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function TeaStoriesSection({
  content = TEA_STORIES_CONTENT,
  videos  = TEA_STORIES_VIDEOS,
  socials = TEA_STORIES_SOCIALS,
}: TeaStoriesSectionProps) {
  const [v1, v2, v3] = videos

  return (
    <section
      aria-labelledby="tea-stories-heading"
      className="w-full py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <h2
          id="tea-stories-heading"
          className="font-sora font-bold text-[#77923B] text-center
                     text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem]
                     leading-tight mb-2"
        >
          {content.heading}
        </h2>

        {/* Subtitle */}
        <p className="font-sora text-gray-500 text-center
                      text-[16px] sm:text-[16px] lg:text-[18px]
                      mb-8 sm:mb-10 lg:mb-12">
          {content.subtitle}
        </p>

        {/* ── DESKTOP (lg+) ── */}
        <div
          className="hidden lg:grid grid-cols-3 gap-4 items-stretch"
          style={{ height: '580px' }}
        >
          <VideoCard video={v1} className="h-full" />
          <div className="flex flex-col gap-4 h-full">
            <FollowUs label={content.followLabel} socials={socials} />
            <VideoCard video={v2} className="flex-1 min-h-0" />
          </div>
          <VideoCard video={v3} className="h-full" />
        </div>

        {/* ── MOBILE (<lg) ── same 3-col layout as desktop ── */}
        <div
          className="lg:hidden grid grid-cols-3 gap-2 sm:gap-3 items-stretch"
          style={{ height: '340px' }}
        >
          {/* Col 1 — tall image */}
          <VideoCard video={v1} className="h-full" />

          {/* Col 2 — Follow Us on top + image below */}
          <div className="flex flex-col gap-2 h-full">
            <div className="flex flex-col items-center justify-center gap-2
                            rounded-2xl bg-white px-2 py-3 shrink-0">
              <p className="font-sora font-bold text-gray-900 text-center
                            text-[13px] sm:text-[15px] leading-tight">
                {content.followLabel}
              </p>
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <Link
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="hover:opacity-75 transition-opacity duration-200"
                  >
                    <Image
                      src={`/icons/${s.icon}.svg`}
                      alt={s.label}
                      width={22}
                      height={22}
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    />
                  </Link>
                ))}
              </div>
            </div>
            <VideoCard video={v2} className="flex-1 min-h-0" />
          </div>

          {/* Col 3 — tall image */}
          <VideoCard video={v3} className="h-full" />
        </div>

      </div>
    </section>
  )
}