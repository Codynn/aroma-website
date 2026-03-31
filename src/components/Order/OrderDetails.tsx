"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, MapPin, Package, CreditCard, Calendar } from "lucide-react";
import HandledImage from "@/components/shared/HandleImage";
import { cn } from "@/lib/utils";

interface OrderDetailsDialogProps {
  order: any;
}

export default function OrderDetailsDialog({ order }: OrderDetailsDialogProps) {
  return (
    <Dialog>
      {/* THE BUTTON: Styled to be a prominent action in your table */}
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-2 py-2 hover:bg-[#77923B] hover:text-white border-[#77923B] border-2 bg-white text-[#77923B] text-[16px]  rounded-[8px] transition-all  active:scale-95 cursor-pointer">
          
          View Details
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[95vw] md:max-w-[650px] max-h-[90vh] overflow-y-auto rounded-[24px] md:rounded-[32px] p-4 md:p-8 font-sora border-none shadow-2xl">
        <DialogHeader className="mb-6 border-b border-gray-100 pb-4">
          <DialogTitle className="text-[20px] md:text-[24px] font-extrabold text-[#121212]">
            Order #{order.tokenNumber || order.id.slice(0, 8)}
          </DialogTitle>
          <div className="flex items-center gap-3 mt-2">
            <span className="px-3 py-1 bg-[#E8F5E9] text-[#4CAF50] rounded-full text-[11px] font-bold uppercase tracking-wider">
              {order.status}
            </span>
            <span className="text-gray-400 text-[13px] flex items-center gap-1 font-medium">
              <Calendar className="w-4 h-4" />
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* Product Items List */}
          <div className="space-y-4">
            <h3 className="font-bold text-[16px] text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#77923B]" /> 
              Items Ordered
            </h3>
            <div className="grid gap-3">
              {order.productRequests?.map((item: any) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-gray-50/30 items-center transition-hover hover:bg-gray-50">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200 bg-white">
                    <HandledImage
                      src={item.shopProduct?.imageUrl}
                      alt={item.shopProduct?.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[14px] md:text-[15px] text-gray-900 truncate">
                      {item.shopProduct?.name}
                    </h4>
                    <p className="text-[12px] text-gray-500 font-medium">
                      Quantity: <span className="text-gray-900">{item.quantity}</span>
                    </p>
                    <p className="text-[#77923B] font-extrabold text-[15px] mt-1">
                      Rs. {item.soldAtPrice?.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Payment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
            <div className="space-y-3">
              <h4 className="font-bold text-[14px] flex items-center gap-2 text-gray-400 uppercase tracking-widest">
                <MapPin className="w-4 h-4" /> Shipping To
              </h4>
              <div className="text-[14px] text-gray-700 space-y-1">
                <p className="font-bold text-[#121212]">{order.customerName}</p>
                <p className="leading-relaxed">{order.quickDeliveryAddress || "N/A"}</p>
                <p className="font-medium">{order.customerPhone}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-[14px] flex items-center gap-2 text-gray-400 uppercase tracking-widest">
                <CreditCard className="w-4 h-4" /> Payment Summary
              </h4>
              <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
                <div className="flex justify-between text-[13px] text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">Rs. {(order.totalAmount - (order.deliveryCharge || 0)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[13px] text-gray-500">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-gray-900">Rs. {order.deliveryCharge || 0}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200 font-extrabold text-[18px] text-[#77923B]">
                  <span>Total</span>
                  <span>Rs. {order.totalAmount?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}