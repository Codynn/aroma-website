"use client";

import React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="bg-white min-h-screen font-sora py-10">
      <div className="max-w-7xl mx-auto px-3 lg:px-0">
        {/* Main Grid: Reverse order on mobile so items appear on top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start flex-col-reverse lg:flex-row">
          
          {/* Left Column: Billing Details (Order 2 on mobile) */}
          <div className="lg:col-span-7 order-2 lg:pr-[31px] lg:order-1 lg:border-r-1 lg:border-r-[#989898]">
            {/* Warning Box */}
            <div className="border border-red-500 rounded-2xl p-6 text-center mb-8 bg-white">
              <h1 className="text-[28px] md:text-[34px] font-semibold lg:font-bold text-black mb-4 lg:mb-6 ">
                This is NOT a payment checkout
              </h1>
              <p className="text-[16px] lg:text-[18px] mb-3">  This order is a purchase inquiry. </p>
              <p className=" text-[16px] md:text-[18px] leading-relaxed">
              
                After you place the order, our team will contact you via WhatsApp or phone to confirm availability, price, and delivery details before payment.
              </p>
            </div>

            <h2 className="text-xl font-bold mb-6 text-black">Billing Details</h2>
            
            <form className="space-y-4 ">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border text-[18px] text-[#7D8F7B] lg:text-[20px] font-bold border-[#989898] rounded-[16px] px-4 py-3 outline-none focus:ring-1 focus:ring-[#77923B]"
              />
              
              <div className="relative">
                <select className="w-full border text-[18px] lg:text-[20px] font-bold border-[#989898] rounded-[16px]  px-4 py-3 appearance-none outline-none bg-white text-[#7D8F7B]">
                  <option>Country/Region</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D8F7B] w-5 h-5" />
              </div>

              <div className="flex gap-4">
                <div className="relative w-1/4">
                  <select className="w-full border text-[18px] text-[#7D8F7B] lg:text-[20px] font-bold border-[#989898] rounded-[16px]  px-4 py-3 appearance-none outline-none bg-white">
                    <option>+977</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7D8F7B] w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Whatsapp Number"
                  className="w-3/4 border text-[18px] lg:text-[20px] text-[#7D8F7B] font-bold border-[#989898] rounded-[16px]  px-4 py-3 outline-none focus:ring-1 focus:ring-[#77923B]"
                />
              </div>

              <input
                type="text"
                placeholder="City"
                className="w-full border text-[18px] lg:text-[20px] font-bold text-[#7D8F7B] border-[#989898] rounded-[16px]  px-4 py-3 outline-none focus:ring-1 focus:ring-[#77923B]"
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full border text-[18px] lg:text-[20px] font-bold text-[#7D8F7B] border-[#989898] rounded-[16px]  px-4 py-3 outline-none focus:ring-1 focus:ring-[#77923B]"
              />
              <input
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full border text-[18px] lg:text-[20px] font-bold text-[#7D8F7B] border-[#989898] rounded-[16px] l px-4 py-3 outline-none focus:ring-1 focus:ring-[#77923B]"
              />

              <div className="space-y-3 pt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 accent-[#77923B] rounded" />
                  <span className="text-sm text-gray-700">Save my information for faster checkout next time</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 accent-[#77923B] rounded mt-0.5" />
                  <span className="text-sm text-gray-700">
                    By submitting this order request, you agree to our <span className="font-bold underline">Terms & Conditions</span> and <span className="font-bold underline">Return Policy</span>.
                  </span>
                </label>
              </div>

              <button className="w-full bg-[#77923B] text-white font-bold py-4 rounded-xl mt-6 hover:bg-[#6a8335] transition-colors">
                Continue at Whatsapp
              </button>
            </form>
          </div>

          {/* Right Column: Order Summary (Order 1 on mobile) */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <div className="space-y-6">
              {[1, 2].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#77923B] " />
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src="/Images/emerald-green.png"
                      alt="Emerald Green Harmony"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Emerald Green Harmony</h3>
                    <p className="text-xs text-gray-500 mb-2">100gm</p>
                    <p className="text-sm font-bold text-gray-800">Quantity: 2</p>
                    <p className="text-xl font-bold text-[#77923B] mt-1">$ 20</p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-[#989898]" />

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Discount Code or Gift Code"
                className="flex-1 border text-[18px]  lg:text-[20px] font-bold border-[#989898] rounded-[16px] text-[#7D8F7B]  px-4 py-3 outline-none"
              />
              <button className="bg-[#77923B] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6a8335]">
                Apply
              </button>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex justify-between text-gray-700">
                <span className="font-bold">Estimated SubTotal - 3 item</span>
                <span className="font-bold">$126.55</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-bold">Estimated Shipping fee</span>
                <span className="font-bold">$0</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-extrabold text-black">Estimated Total</span>
                <span className="text-3xl font-extrabold text-[#77923B]">$143.00</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}