import { HeroContent, HeroFeature } from "@/types/home/hero.types"

export const HERO_CONTENT: HeroContent = {
  tagline:      'Pure. Organic. Himalayan.',
  headingLine1: 'From the Peaks of Nepal',
  headingLine2: 'to your cup.',
  ctaLabel:     'Explore Our Teas',
  ctaHref:      '/shop',
}

export const HERO_IMAGE = {
  src: '/home/HeroBanner.png', 
  alt: 'Tea farmer hand-picking fresh leaves on lush Himalayan hillside terraces in Nepal',
} as const

// Icons live in /public/icons/ — swap filenames to match what you drop in
export const HERO_FEATURES: HeroFeature[] = [
  {
    id:       1,
    icon:     '/icons/MountainIcon.svg',
    title:    'Himalayan Origin',
    subtitle: 'Grown at high altitude.',
  },
  {
    id:       2,
    icon:     '/icons/PlantIcon.svg',
    title:    'Uncompromised Purity',
    subtitle: '100% organic. No chemicals.',
  },
  {
    id:       3,
    icon:     '/icons/PlantIcon.svg',
    title:    'Crafted by Hand',
    subtitle: 'Carefully handpicked by farmers.',
  },
  {
    id:       4,
    icon:     '/icons/MountainIcon.svg',
    title:    'Ethical Global Supply',
    subtitle: 'Sourced responsibly worldwide.',
  },
]