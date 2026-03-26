"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data based on your image
const MOCK_ORDERS = [
  { id: "1", product: "Netflix Subscription Nepal - Private Profile", quantity: 1, status: "Success", price: 240, date: "2082/08/12 - 03:42 PM" },
  { id: "2", product: "Netflix Subscription Nepal - Private Profile", quantity: 1, status: "Pending", price: 240, date: "2082/08/12 - 03:42 PM" },
  { id: "3", product: "Netflix Subscription Nepal - Private Profile", quantity: 1, status: "Failed", price: 240, date: "2082/08/12 - 03:42 PM" },
  { id: "4", product: "Netflix Subscription Nepal - Private Profile", quantity: 1, status: "Failed", price: 240, date: "2082/08/12 - 03:42 PM" },
];

export default function OrderHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Example total pages

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "success": return "bg-[#E8F5E9] text-[#4CAF50]";
      case "pending": return "bg-[#FFFDE7] text-[#FBC02D]";
      case "failed": return "bg-[#FFEBEE] text-[#EF5350]";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sora">
      <h1 className="text-[32px] md:text-[48px] font-bold text-center mb-10 text-black">
        Order History
      </h1>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-4">
          <thead>
            <tr className="text-[#121212] font-bold text-[16px]">
              <th className="pb-4">Product</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Price</th>
              <th className="pb-4">Purchase Date</th>
              <th className="pb-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id} className="bg-white border-b border-gray-100">
                <td className="py-4 text-[#333333] max-w-xs">
                  {order.product} × {order.quantity}
                </td>
                <td className="py-4">
                  <span className={cn("px-3 py-1 rounded-full text-[12px] font-medium", getStatusClass(order.status))}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 font-semibold text-[#121212]">Rs {order.price}</td>
                <td className="py-4 text-gray-500 text-[14px]">{order.date}</td>
                <td className="py-4 text-right">
                  {order.status === "Success" ? (
                    <button className="px-4 py-2 border border-[#77923B] text-[#77923B] rounded-lg text-[14px] hover:bg-[#77923B] hover:text-white transition-all">
                      Give Review
                    </button>
                  ) : order.status === "Pending" ? (
                    <button className="px-4 py-2 bg-[#77923B] text-white rounded-lg text-[14px] hover:bg-[#667d32] transition-all">
                      View Review
                    </button>
                  ) : (
                    <button className="px-4 py-2 bg-[#EF5350] text-white rounded-lg text-[14px] hover:bg-red-600 transition-all">
                      Cancel Order
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-[15px] text-[#121212] leading-tight flex-1 mr-2">
                {order.product}
              </h3>
              <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", getStatusClass(order.status))}>
                {order.status}
              </span>
            </div>
            <div className="flex justify-between items-center text-[13px] text-gray-500 mb-4">
              <span>Qty: {order.quantity}</span>
              <span className="font-bold text-[#77923B]">Rs {order.price}</span>
            </div>
            <p className="text-[12px] text-gray-400 mb-4">{order.date}</p>
            <button className={cn(
              "w-full py-2.5 rounded-xl font-bold text-[14px] transition-all",
              order.status === "Success" ? "border border-[#77923B] text-[#77923B]" : 
              order.status === "Pending" ? "bg-[#77923B] text-white" : "bg-[#EF5350] text-white"
            )}>
              {order.status === "Success" ? "Give Review" : order.status === "Pending" ? "View Details" : "Cancel Order"}
            </button>
          </div>
        ))}
      </div>

      {/* Pagination - Mirrored from your ProductPage */}
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
              className={`w-10 h-10 md:w-12 md:h-12 rounded-xl font-sora font-bold text-[14px] border-2 transition-all hover:cursor-pointer
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