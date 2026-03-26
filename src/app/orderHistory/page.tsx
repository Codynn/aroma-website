"use client";

import React, { useState } from "react";
import { ChevronRight, Loader2, PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetMyOrders } from "@/services/api/order.api";

export default function OrderHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch real data from your hook
  const { data, isLoading, isError } = useGetMyOrders(currentPage, itemsPerPage);

  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "success":
        return "bg-[#ECFDF3] text-[#027A48]";
      case "pending":
      case "processing":
        return "bg-[#FFF4ED] text-[#C4320A]";
      case "failed":
      case "cancelled":
        return "bg-[#FEF3F2] text-[#B42318]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#77923B]" />
        <p className="mt-4 font-sora text-gray-500">Loading your orders...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 font-bold">Failed to load order history.</p>
      </div>
    );
  }

  const orders = data?.items || [];
  const totalPages = data?.meta?.totalPages || 1;

  // ✅ Empty State
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-gray-50 p-6 rounded-full mb-4">
          <PackageOpen className="w-16 h-16 text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-black font-sora mb-2">No Orders Found</h2>
        <p className="text-gray-500 text-center max-w-xs font-sora">
          It looks like you haven't placed any orders yet. Start shopping to see your history here!
        </p>
        <button 
           onClick={() => window.location.href = '/products'}
           className="mt-6 bg-[#77923B] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6a8335] transition-colors"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sora">
      <h1 className="text-3xl font-bold text-black mb-8">Order History</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="flex flex-col md:flex-row md:items-center justify-between p-5 border-2 border-gray-100 rounded-3xl bg-white hover:border-[#77923B]/30 transition-all shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#77923B]/10 rounded-2xl flex items-center justify-center">
                <PackageOpen className="text-[#77923B] w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[16px] md:text-[18px] text-black">
                  Order #{order.orderNumber}
                </h3>
                <p className="text-sm text-gray-400">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0">
              <div className="text-right">
                <p className="text-[18px] font-extrabold text-[#77923B]">
                  Rs. {order.totalAmount}
                </p>
              </div>
              
              <div className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
                getStatusClass(order.status)
              )}>
                {order.status}
              </div>

              <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <ChevronRight className="w-6 h-6 text-gray-300" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 md:gap-6 mt-12 mb-10">
          <button 
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage(p => Math.max(1, p - 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="font-sora font-bold text-[#77923B] text-[15px] disabled:opacity-30 cursor-pointer"
          >
            Prev
          </button>
          
          <div className="flex gap-2.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl font-sora font-bold text-[14px] border-2 transition-all 
                  ${currentPage === page 
                    ? "bg-[#77923B] border-[#77923B] text-white shadow-md" 
                    : "bg-white border-[#77923B]/20 text-[#77923B] hover:border-[#77923B]"}`}
              >
                {page < 10 ? `0${page}` : page}
              </button>
            ))}
          </div>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage(p => Math.min(totalPages, p + 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="font-sora font-bold text-[#77923B] text-[15px] disabled:opacity-30 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}