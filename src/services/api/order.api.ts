"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

// 1. Define the interfaces based on your provided body
export interface ProductRequest {
  shopProductId: string;
  quantity: number;
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

// 2. The Hook
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: OrderBody) => {
      const { data } = await axiosInstance.post("/order", orderData);
      return data;
    },
    onSuccess: () => {
      // Invalidate relevant queries to refresh data if necessary
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: any) => {
      console.error("Order Placement Error:", error?.response?.data || error.message);
    },
  });
};