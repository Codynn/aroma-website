"use client";

import React, { useState } from "react";
import { ChevronRight, Loader2, PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetMyOrders, OrderItem } from "@/services/api/order.api";

export default function OrderHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data, isLoading, isError } = useGetMyOrders(currentPage, itemsPerPage);

  const orders = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const getStatusClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "success":
      case "completed":
        return "bg-[#E8F5E9] text-[#4CAF50]";
      case "pending":
      case "processing":
        return "bg-[#FFFDE7] text-[#FBC02D]";
      case "failed":
      case "cancelled":
        return "bg-[#FFEBEE] text-[#EF5350]";
      default:
        return "bg-gray-100 text-gray-600";
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
      <div className="text-center py-20 font-sora">
        <p className="text-red-500 font-bold">Failed to load order history.</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 font-sora">
        <PackageOpen className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-black mb-2">No Orders Found</h2>
        <button 
           onClick={() => window.location.href = '/products'}
           className="mt-6 bg-[#77923B] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#667d32] transition-all"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sora">
      <h1 className="text-[32px] md:text-[48px] font-bold text-center mb-10 text-black">
        Order History
      </h1>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-0">
          <thead>
            <tr className="text-[#121212] font-bold text-[16px]">
              <th className="pb-4 border-b border-gray-200">Product</th>
              <th className="pb-4 border-b border-gray-200">Status</th>
              <th className="pb-4 border-b border-gray-200">Price</th>
              <th className="pb-4 border-b border-gray-200">Purchase Date</th>
              <th className="pb-4 border-b border-gray-200 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: OrderItem) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="py-6 border-b border-gray-200 text-[#333333]">
                  <div className="flex flex-col gap-1">
                    {order.productRequests.map((req) => (
                      <span key={req.id} className="font-medium">
                        {req.shopProduct.name} × {req.quantity}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-6 border-b border-gray-200">
                  <span className={cn("px-3 py-1 rounded-full text-[12px] font-medium capitalize", getStatusClass(order.status))}>
                    {order.status}
                  </span>
                </td>
                <td className="py-6 border-b border-gray-200 font-semibold text-[#121212]">
                  Rs {order.totalAmount}
                </td>
                <td className="py-6 border-b border-gray-200 text-gray-500 text-[14px]">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-6 border-b border-gray-200 text-right">
                  <button className="px-4 py-2 border border-[#77923B] text-[#77923B] rounded-lg text-[14px] hover:bg-[#77923B] hover:text-white transition-all">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-0">
        {orders.map((order: OrderItem) => (
          <div key={order.id} className="py-6 border-b border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col gap-1 flex-1">
                {order.productRequests.map((req) => (
                  <h3 key={req.id} className="font-bold text-[15px] text-[#121212] leading-tight mr-2">
                    {req.shopProduct.name} × {req.quantity}
                  </h3>
                ))}
              </div>
              <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold capitalize", getStatusClass(order.status))}>
                {order.status}
              </span>
            </div>
            <div className="flex justify-between items-center text-[13px] text-gray-500 mb-4">
              <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
              <span className="font-bold text-[#77923B]">Rs {order.totalAmount}</span>
            </div>
            <button className="w-full py-2.5 rounded-xl font-bold text-[14px] border border-[#77923B] text-[#77923B] hover:bg-[#77923B] hover:text-white transition-all">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination - Shows even for 1 page */}
      <div className="flex items-center justify-center gap-3 md:gap-6 mt-12 mb-10">
        <button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
          className="font-sora font-bold text-[#77923B] text-[15px] disabled:opacity-30 cursor-pointer"
        >
          Prev
        </button>
        <div className="flex gap-2.5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
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
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
          className="font-sora font-bold text-[#77923B] text-[15px] disabled:opacity-30 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}