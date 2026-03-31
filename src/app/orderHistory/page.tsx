"use client";

import React, { useState } from "react";
import { ChevronRight, Loader2, PackageOpen, Star, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetMyOrders, OrderItem, useCreateReview } from "@/services/api/order.api";
import { toast } from "sonner";
import OrderDetailsDialog from "@/components/Order/OrderDetails";

// Shadcn UI Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function OrderHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Review States
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const { data, isLoading, isError } = useGetMyOrders(currentPage, itemsPerPage);
  const { mutate: submitReview, isPending } = useCreateReview();

  const orders = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleReviewSubmit = (orderId: string, shopProductId: string) => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    submitReview({ orderId, shopProductId, rating, review: reviewText }, {
      onSuccess: () => {
        setRating(0);
        setReviewText("");
      }
    });
  };

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
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500 font-bold">
        Error loading orders.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-[24px] md:text-[32px] font-extrabold font-sora text-[#121212]">Order History</h1>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-2 text-[16px] text-[#3b3b3b] font-sora">Product Details</th>
              <th className="text-left py-4 px-2 text-[16px] text-[#3b3b3b] font-sora">Date</th>
              <th className="text-left py-4 px-2 text-[16px] text-[#3b3b3b] font-sora">Total Amount</th>
              <th className="text-left py-4 px-2 text-[16px] text-[#3b3b3b] font-sora">Status</th>
              <th className="text-right py-4 px-2 text-[16px] text-[#3b3b3b] font-sora">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 ">
            {orders.map((order: any) => (
              <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors border-b border-gray-400">
                <td className="py-6 px-2">
                  <div className="flex flex-col gap-3">
                    {order.productRequests.map((req: any) => {
                      // Logic to find if this specific product has been reviewed in this order 
                      const review = order.shopProductReviews?.find(
                        (rev: any) => rev.shopProductId === req.shopProductId
                      );
                      const hasReviewed = !!review;

                      return (
                        <div key={req.id} className="flex items-center gap-8">
                          <span className="text-[16px] text-[#3b3b3b]">
                            {req.shopProduct.name} × {req.quantity}
                          </span>
                          
                          {/* REVIEW BUTTONS */}
                          {(order.status === "completed" || order.status === "success") && (
                            <Dialog onOpenChange={() => { setRating(0); setReviewText(""); }}>
                              <DialogTrigger asChild>
                                <button className="text-[12px] font-bold font-sora flex items-center gap-1 cursor-pointer">
                                  {hasReviewed ? (
                                    <span className="text-blue-500 flex items-center gap-1">
                                      <MessageSquare className="w-3.5 h-3.5" /> View Rate
                                    </span>
                                  ) : (
                                    <span className="text-[#77923B] flex items-center gap-1">
                                      <Star className="w-3.5 h-3.5" /> Give Rate
                                    </span>
                                  )}
                                </button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[420px] rounded-[32px] p-8">
                                <DialogHeader>
                                  <DialogTitle className="text-2xl font-extrabold text-center">
                                    {hasReviewed ? "Your Review" : "Rate Product"}
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col items-center gap-6 py-4">
                                  <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                      <Star
                                        key={s}
                                        onClick={() => !hasReviewed && setRating(s)}
                                        className={cn(
                                          "w-10 h-10 transition-all",
                                          (hasReviewed ? review.rating : rating) >= s ? "fill-[#F2C94C] text-[#F2C94C]" : "text-gray-200",
                                          !hasReviewed && "cursor-pointer hover:scale-110"
                                        )}
                                      />
                                    ))}
                                  </div>
                                  <Textarea
                                    disabled={hasReviewed}
                                    value={hasReviewed ? review.review : reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Share your feedback..."
                                    className="min-h-[120px] rounded-2xl bg-gray-50 border-none p-4"
                                  />
                                  {!hasReviewed && (
                                    <button
                                      disabled={isPending || rating === 0}
                                      onClick={() => handleReviewSubmit(order.id, req.shopProduct.id)}
                                      className="w-full bg-[#77923B] text-white font-bold py-4 rounded-2xl disabled:opacity-50"
                                    >
                                      {isPending ? "Submitting..." : "Submit Review"}
                                    </button>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </td>
                <td className="py-6 px-2 text-[15px] font-medium text-gray-600 font-sora">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-6 px-2 text-[15px] font-bold text-[#77923B] font-sora">
                  Rs {order.totalAmount}
                </td>
                <td className="py-6 px-2">
                  <span className={cn("px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide", getStatusClass(order.status))}>
                    {order.status}
                  </span>
                </td>
               <td className="flex justify-end py-6  ">
                  <OrderDetailsDialog order={order} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View (Repeat same logic for consistency) */}
      <div className="md:hidden space-y-4">
        {orders.map((order: any) => (
          <div key={order.id} className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col gap-1">
                 <span className="text-[12px] text-gray-400 font-medium">Order ID: #{order.id.slice(0,8)}</span>
                 <span className={cn("inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase w-fit", getStatusClass(order.status))}>
                  {order.status}
                </span>
              </div>
              <span className="text-[14px] font-bold text-[#77923B]">Rs {order.totalAmount}</span>
            </div>
            
            <div className="space-y-3 mb-6">
              {order.productRequests.map((req: any) => {
                const review = order.shopProductReviews?.find(
                  (rev: any) => rev.shopProductId === req.shopProductId
                );
                const hasReviewed = !!review;

                return (
                  <div key={req.id} className="flex items-center justify-between">
                    <span className="text-[14px] text-gray-700">{req.shopProduct.name} × {req.quantity}</span>
                    
                    {(order.status === "completed" || order.status === "success") && (
                      <Dialog onOpenChange={() => { setRating(0); setReviewText(""); }}>
                        <DialogTrigger asChild>
                          <button className="text-[11px] font-bold text-[#77923B] flex items-center gap-1">
                            {hasReviewed ? (
                              <span className="text-blue-500 flex items-center gap-1"><MessageSquare className="w-3 h-3" /> View Rate</span>
                            ) : (
                              <span className="text-[#77923B] flex items-center gap-1"><Star className="w-3 h-3" /> Give Rate</span>
                            )}
                          </button>
                        </DialogTrigger>
                        <DialogContent className="w-[90%] rounded-[32px] p-6">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-extrabold text-center">
                                {hasReviewed ? "Your Review" : "Rate Product"}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col items-center gap-5 py-2">
                                <div className="flex gap-1.5">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                      key={s}
                                      onClick={() => !hasReviewed && setRating(s)}
                                      className={cn(
                                        "w-8 h-8 transition-all",
                                        (hasReviewed ? review.rating : rating) >= s ? "fill-[#F2C94C] text-[#F2C94C]" : "text-gray-200"
                                      )}
                                    />
                                  ))}
                                </div>
                                <Textarea
                                  disabled={hasReviewed}
                                  value={hasReviewed ? review.review : reviewText}
                                  placeholder="Feedback..."
                                  className="min-h-[100px] rounded-xl bg-gray-50 border-none text-sm"
                                />
                                {!hasReviewed && (
                                  <button
                                    onClick={() => handleReviewSubmit(order.id, req.shopProduct.id)}
                                    className="w-full bg-[#77923B] text-white font-bold py-3 rounded-xl"
                                  >
                                    Submit
                                  </button>
                                )}
                            </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <span className="text-[12px] text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
              <button className="text-[13px] font-bold text-[#77923B] flex items-center gap-1">
                Details <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
              className={cn(
                "w-10 h-10 md:w-12 md:h-12 rounded-xl font-sora font-bold text-[14px] border-2 transition-all", 
                currentPage === page ? "bg-[#77923B] border-[#77923B] text-white shadow-md" : "bg-white border-[#77923B]/20 text-[#77923B]"
              )}
            >
              {page}
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