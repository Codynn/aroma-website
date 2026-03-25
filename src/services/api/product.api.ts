// hooks/use-products.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios"; // Use the axiosInstance we created
import { ProductResponse } from "@/types/product/product.types";

export const useGetProducts = (page = 1, limit = 100) => {
  return useQuery<ProductResponse>({
    queryKey: ["products", page, limit],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/products", {
        params: {
          page,
          limit,
        },
      });
      return data;
    },
    // Useful for products: keeps the data fresh but prevents constant refetching
    staleTime: 5 * 60 * 1000, 
  });
};

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/products/${id}`);
      return data; // This should return the single product object
    },
    enabled: !!id, // Only run if ID exists
    staleTime: 5 * 60 * 1000,
  });
};