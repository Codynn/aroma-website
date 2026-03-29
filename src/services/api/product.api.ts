// hooks/use-products.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios"; 
import { ProductResponse } from "@/types/product/product.types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Single hook to fetch products with support for:
 * - Pagination (page, limit)
 * - Searching (q)
 * - Filtering (category, price range)
 * - Sorting (sortBy, sortOrder)
 */
export const useGetProducts = (filters: {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string; // e.g., "soldQuantity" or "updatedAt"
  sortOrder?: string; // e.g., "desc" or "asc"
  q?: string;
} = {}) => {
  // Destructure with default values for safety
  const { page = 1, limit = 100, q = "", ...rest } = filters;

  return useQuery<ProductResponse>({
    // queryKey includes the filters object so React Query 
    // refetches automatically when any value changes
    queryKey: ["products", filters],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/products`, {
        params: {
          forAdminPanel: true,
          forPOS: true,
          page,
          limit,
          q,
          ...rest,
        },
      });
      return data;
    },
    // Keeps data fresh for 5 minutes but avoids unnecessary background refetches
    staleTime: 5 * 60 * 1000, 
  });
};

/**
 * Fetches a single product by its ID
 */
export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/products/${id}`);
      return data;
    },
    enabled: !!id, // Only runs if the ID is provided
    staleTime: 5 * 60 * 1000,
  });
};