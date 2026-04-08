import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
export interface Review {
  id: string;
  rating: number;
  review: string;
  createdAt: string;
  shopCustomer: {
    customerName: string;
    customerEmail: string;
    customer: {
      user: {
        photo: string;
      };
    };
  };
}

export interface ReviewsResponse {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  data: Review[];
}

export interface RatingDistribution {
  [key: string]: number; // Represents {"1": 0, "2": 0, ...}
}

export const useGetProductReviews = (productId: string, params: { page?: number; limit?: number } = {}) => {
  return useQuery<ReviewsResponse>({
    queryKey: ["product-reviews", productId, params],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/products/${productId}/reviews`, {
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
        },
      });
      return data;
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Fetches the star rating distribution for a specific product
 */
export const useGetProductRatingDistribution = (productId: string) => {
  return useQuery<RatingDistribution>({
    queryKey: ["product-rating-distribution", productId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/products/${productId}/ratingDistribution`);
      return data;
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });
};