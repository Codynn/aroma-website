export interface HeroContent {
  tagline:      string
  headingLine1: string
  headingLine2: string
  ctaLabel:     string
  ctaHref:      string
}

export interface HeroSectionProps {
  content?: HeroContent
}