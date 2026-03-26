"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

const SHOP_ID = "a1d59900-0805-4c26-9757-7014432ab588";
const my_Order_URL = process.env.NEXT_PUBLIC_BASE_URL ;

// --- Interfaces ---

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

export interface OrderItem {
  id: string;
  orderNumber: string;
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
  customerName: string;
  customerPhone: string;
  orderType: string;
}

export interface OrdersResponse {
  items: OrderItem[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

// --- Hooks ---

/**
 * Hook to create a new order
 */
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: OrderBody) => {
      const { data } = await axiosInstance.post("/order", orderData);
      return data;
    },
    onSuccess: () => {
      // Refresh the orders list after a successful purchase
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
    onError: (error: any) => {
      console.error("Order Placement Error:", error?.response?.data || error.message);
    },
  });
};

/**
 * Hook to fetch the logged-in user's orders for a specific shop
 */
export const useGetMyOrders = (page: number = 1, limit: number = 5) => {
  return useQuery<OrdersResponse>({
    // Include page and limit in the queryKey so React Query caches pages separately
    queryKey: ["my-orders", SHOP_ID, page, limit],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`${my_Order_URL}/website/my-orders`, {
        params: {
          shopId: SHOP_ID,
          page,
          limit,
        },
      });
      return data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};