// hooks/use-user.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios"; 
import Cookies from "js-cookie";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "CUSTOMER" | "ADMIN";
  photo: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  gender: string | null;
  googleId: string | null;
  shopEnabledFeatures: any[];
}

export const useMe = () => {
  const token = Cookies.get("token");
  // Use the clean base URL: https://api.trackynn.com/staging
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return useQuery<User>({
    queryKey: ["user-me"],
    queryFn: async () => {
      // Passing the full URL overrides the instance's default baseURL 
      // but keeps the Authorization header interceptor active.
      const { data } = await axiosInstance.get(`${baseUrl}/user/me`); 
      return data;
    },
    enabled: !!token,
    staleTime: 10 * 60 * 1000, 
    retry: false,
  });
};