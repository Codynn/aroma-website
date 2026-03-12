export interface Review {
  id:       number
  rating:   number
  quote:    string
  author:   string
  location: string
  avatar:   string
}

export interface CustomerReviewsContent {
  overallRating:  number
  maxRating:      number
  totalReviews:   string
  subtitle:       string
  heading:        string
  viewAllLabel:   string
  viewAllHref:    string
}

export interface CustomerReviewsSectionProps {
  content?: CustomerReviewsContent
  reviews?: Review[]
}