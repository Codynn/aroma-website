"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios"; // Ensure this matches your API client path

export interface PaymentMode {
  id: string;
  name: string;
  icon?: string | null;
  qrCode?: string | null;
}

export function usePayment() {
  return useQuery({
    queryKey: ["paymentModes"],
    queryFn: async () => {
      const response = await axiosInstance.get<{ items: PaymentMode[] }>("/paymentModes");
      return response.data;
    },
  });
}