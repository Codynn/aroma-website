"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// --- Types ---
interface StoryVideo {
  id: number;
  image: string;
  videoId?: string;
  alt: string;
}

interface SocialLink {
  id: number;
  label: string;
  href: string;
  icon: string;
}

// --- Data ---
const TEA_STORIES_CONTENT = {
  heading: "Stories from the Tea Gardens",
  subtitle:
    "Exclusive behind-the-scenes, tea tips, and more - straight from our gardens.",
  followLabel: "Follow Us Today!",
};

const TEA_STORIES_VIDEOS: StoryVideo[] = [
  {
    id: 1,
    image: "/home/Vedio1.svg",
    videoId: "QkyiEoadGiU",
    alt: "Tea story - woman drinking tea",
  },
  {
    id: 2,
    image: "/home/Vedio2.svg",
    videoId: "B_SffJ1gBKg",
    alt: "Tea story - man enjoying tea",
  },
  {
    id: 3,
    image: "/home/Vedio3.svg",
    alt: "Tea story - woman in tea garden",
  },
];

const TEA_STORIES_SOCIALS: SocialLink[] = [
  {
    id: 1,
    label: "Facebook",
    href: "https://www.facebook.com/aromateanepal",
    icon: "facebook",
  },
  {
    id: 2,
    label: "TikTok",
    href: "https://www.tiktok.com/@aroatea",
    icon: "tiktok",
  },
];

// ── Video thumbnail card ──────────────────────────────────────────────────────
function VideoCard({
  video,
  className = "",
  onOpen,
}: {
  video: StoryVideo;
  className?: string;
  onOpen: (id: string) => void;
}) {
  const imgSrc = video.videoId
    ? `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`
    : video.image;

  return (
    <div
      onClick={() => video.videoId && onOpen(video.videoId)}
      className={`group relative block overflow-hidden rounded-2xl bg-gray-200 w-full cursor-pointer ${className}`}
    >
      <Image
        src={imgSrc}
        alt={video.alt}
        fill
        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 30vw"
        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
      />

      {/* Overlay shade */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 z-[5]" />

      {/* Play Button - Always visible if videoId exists */}
      {video.videoId && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-black/60 p-3 rounded-full backdrop-blur-sm group-hover:bg-black/80 transition-all">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Follow Us block ────────────────────────────
function FollowUs({
  label,
  socials,
}: {
  label: string;
  socials: SocialLink[];
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="font-sora font-bold text-gray-900 text-[16px] sm:text-[16px] lg:text-[18px]">
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
  );
}

export default function TeaStoriesSection() {
  const [v1, v2, v3] = TEA_STORIES_VIDEOS;
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section
      aria-labelledby="tea-stories-heading"
      className="relative w-full py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="tea-stories-heading"
          className="font-sora font-bold text-[#77923B] text-center text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-tight mb-2"
        >
          {TEA_STORIES_CONTENT.heading}
        </h2>
        <p className="font-sora text-gray-500 text-center text-[16px] sm:text-[16px] lg:text-[18px] mb-8 sm:mb-10 lg:mb-12">
          {TEA_STORIES_CONTENT.subtitle}
        </p>

        {/* ── DESKTOP (lg+) ── */}
        <div
          className="hidden lg:grid grid-cols-3 gap-4 items-stretch"
          style={{ height: "580px" }}
        >
          <VideoCard video={v1} onOpen={setActiveVideo} className="h-full" />
          <div className="flex flex-col gap-4 h-full">
            <FollowUs
              label={TEA_STORIES_CONTENT.followLabel}
              socials={TEA_STORIES_SOCIALS}
            />
            <VideoCard
              video={v2}
              onOpen={setActiveVideo}
              className="flex-1 min-h-0"
            />
          </div>
          <VideoCard video={v3} onOpen={setActiveVideo} className="h-full" />
        </div>

        {/* ── MOBILE (<lg) ── */}
        <div
          className="lg:hidden grid grid-cols-3 gap-2 sm:gap-3 items-stretch"
          style={{ height: "340px" }}
        >
          <VideoCard video={v1} onOpen={setActiveVideo} className="h-full" />
          <div className="flex flex-col gap-2 h-full">
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white px-2 py-3 shrink-0">
              <p className="font-sora font-bold text-gray-900 text-center text-[13px] sm:text-[15px] leading-tight">
                {TEA_STORIES_CONTENT.followLabel}
              </p>
              <div className="flex items-center gap-3">
                {TEA_STORIES_SOCIALS.map((s) => (
                  <Link
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
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
            <VideoCard
              video={v2}
              onOpen={setActiveVideo}
              className="flex-1 min-h-0"
            />
          </div>
          <VideoCard video={v3} onOpen={setActiveVideo} className="h-full" />
        </div>
      </div>

      {/* ── VIDEO DIALOG (MODAL) ── */}
      {activeVideo && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-32 cursor-pointer right-93 text-white hover:text-gray-400 z-[1001] bg-black/50 rounded-full w-10 h-10 flex items-center justify-center text-2xl "
          >
            &times;
          </button>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          {/* Click background to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setActiveVideo(null)}
          />
        </div>
      )}
    </section>
  );
}
