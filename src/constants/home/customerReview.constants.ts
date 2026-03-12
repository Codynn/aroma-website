import { CustomerReviewsContent, Review } from "@/types/home/customerReview.types"

export const CUSTOMER_REVIEWS_CONTENT: CustomerReviewsContent = {
  overallRating: 4.2,
  maxRating:     5,
  totalReviews:  '10,243',
  subtitle:      'Loved by Over 3,000+ Tea Drinkers',
  heading:       'What Our Customer Says',
  viewAllLabel:  'View all review',
  viewAllHref:   '/reviews',
}

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id:       1,
    rating:   5,
    quote:    '"I\'ve been drinking this tea in the evenings before bed, and it\'s the perfect way to relax. It calms my mind and prepares me for a restful sleep."',
    author:   'Ronald Richards',
    location: 'UK',
    avatar:   '/avatars/avatar1.svg',
  },
  {
    id:       2,
    rating:   4,
    quote:    '"I\'ve been drinking this tea in the evenings before bed, and it\'s the perfect way to relax. It calms my mind and prepares me for a restful sleep."',
    author:   'Ronald Richards',
    location: 'UK',
    avatar:   '/avatars/avatar1.svg',
  },
]