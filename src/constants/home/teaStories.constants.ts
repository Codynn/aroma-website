import { SocialLink, StoryVideo, TeaStoriesContent } from "@/types/home/teaStories.types"

export const TEA_STORIES_CONTENT: TeaStoriesContent = {
  heading:     'Stories from the Tea Gardens',
  subtitle:    'Exclusive behind-the-scenes, tea tips, and more - straight from our gardens.',
  followLabel: 'Follow Us Today!',
}

export const TEA_STORIES_VIDEOS: StoryVideo[] = [
  {
    id:       1,
    image:    'home/Vedio1.svg',
    videoUrl: '',
    alt:      'Tea story - woman drinking tea',
  },
  {
    id:       2,
    image:    'home/Vedio2.svg',
    videoUrl: '',
    alt:      'Tea story - man enjoying tea',
  },
  {
    id:       3,
    image:    'home/Vedio3.svg',
    videoUrl: '',
    alt:      'Tea story - woman in tea garden',
  },
]

// icon value must match the filename in /public/icons/
// e.g. 'facebook' → /icons/facebook.svg
export const TEA_STORIES_SOCIALS: SocialLink[] = [
  { id: 1, label: 'Facebook',  href: 'https://facebook.com',  icon: 'facebook'  },
  { id: 2, label: 'TikTok',    href: 'https://tiktok.com',    icon: 'tiktok'    },
  { id: 3, label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
]