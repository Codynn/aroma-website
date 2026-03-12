export interface StoryVideo {
  id:       number
  image:    string
  videoUrl: string
  alt:      string
}

export interface SocialLink {
  id:    number
  label: string
  href:  string
  icon:  'facebook' | 'tiktok' | 'instagram'
}

export interface TeaStoriesContent {
  heading:     string
  subtitle:    string
  followLabel: string
}

export interface TeaStoriesSectionProps {
  content?: TeaStoriesContent
  videos?:  StoryVideo[]
  socials?: SocialLink[]
}