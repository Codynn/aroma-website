"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

const SHOP_ID =
  process.env.NEXT_PUBLIC_SHOP_ID || "559f3544-10a6-467a-aa77-edee39528d6a";
const my_Order_URL = process.env.NEXT_PUBLIC_BASE_URL;

// --- Interfaces ---

export interface ProductRequest {
  shopProductId: string;
  quantity: number;
}

export interface ReviewPayload {
  orderId: string;
  shopProductId: string;
  rating: number;
  review: string;
}

export interface PaymentDistribution {
  paymentModeId: string;
  amount: number;
  status: "pending" | "partial" | "cancelled" | "completed" | "reverted";
}

export interface OrderBody {
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  orderType: "dine_in" | "takeaway" | "delivery";
  quickDeliveryAddress?: string;
  productRequests: ProductRequest[];
  paymentDistributions: PaymentDistribution[];
  totalAmount: number;
}

export interface OrderItem {
  id: string;
  token: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  orderType: string;
  // Added to capture product names and quantities from API
  productRequests: {
    id: string;
    quantity: number;
    shopProduct: {
      name: string;
    };
  }[];
}

export interface OrdersResponse {
  success: boolean;
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
  data: OrderItem[];
}

// --- Hooks ---

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (orderData: OrderBody) => {
      const { data } = await axiosInstance.post("/order", orderData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
    onError: (error: any) => {
      console.error(
        "Order Placement Error:",
        error?.response?.data || error.message,
      );
    },
  });
};

export const useGetMyOrders = (page: number = 1, limit: number = 5) => {
  return useQuery<OrdersResponse>({
    queryKey: ["my-orders", SHOP_ID, page, limit],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `${my_Order_URL}/website/my-orders`,
        {
          params: { shopId: SHOP_ID, page, limit },
        },
      );
      return data;
    },
    staleTime: 2 * 60 * 1000,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ReviewPayload) => {
      const response = await axiosInstance.post(
        `${my_Order_URL}/shop-product-review`,
        payload,
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      // Refetch orders to update the "hasReviewed" status if applicable
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to submit review";
      toast.error(message);
    },
  });
};
