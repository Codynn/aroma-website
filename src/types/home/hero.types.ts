export interface HeroContent {
  tagline:      string
  headingLine1: string
  headingLine2: string
  ctaLabel:     string
  ctaHref:      string
}

export interface HeroFeature {
  id:       number
  icon:     string
  title:    string
  subtitle: string
}

export interface HeroSectionProps {
  content?:  HeroContent
  features?: HeroFeature[]
}