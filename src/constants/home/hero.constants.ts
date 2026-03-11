import { HeroContent } from "@/types/home/hero.types";

export const HERO_CONTENT: HeroContent = {
  tagline: "Pure. Organic. Himalayan.",
  headingLine1: "From the Peaks of Nepal",
  headingLine2: "to your cup.",
  ctaLabel: "Explore Our Teas",
  ctaHref: "/shop",
};

export const HERO_IMAGE = {
  src: "/home/Herobanner.png",
  alt: "Tea farmer hand-picking fresh leaves on lush Himalayan hillside terraces in Nepal",
} as const;
