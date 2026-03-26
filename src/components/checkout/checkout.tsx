"use client";

import React, { useEffect } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import HandledImage from "@/components/shared/HandleImage";
import { useCart } from "@/hooks/user-cart";
import { useMe } from "@/services/api/user.api";
import { usePayment } from "@/services/api/payment.api";
import { useCreateOrder } from "@/services/api/order.api";

const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  country: z.string(),
  phoneCode: z.string(),
  whatsappNumber: z.string().min(10, "Valid number required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  paymentModeId: z.string().min(1, "Please select a payment method"),
  saveInfo: z.boolean().optional(),
  agreeTerms: z.boolean().refine((v) => v === true, {
    message: "You must agree to the terms",
  }),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { data: user } = useMe();
  const { data: paymentData, isLoading: isPaymentLoading } = usePayment();
  const createOrder = useCreateOrder();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phoneCode: "+977",
      country: "Nepal",
      agreeTerms: false,
      email: "",
    },
  });

  // Filter for selected items only
  const selectedItems = cart.filter((item) => item.selected);
  const subtotal = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Auto-fill user data
  useEffect(() => {
    if (user) {
      setValue("email", user.email || "");
      setValue("fullName", user.name || "");
    }
  }, [user, setValue]);

  // Handle default payment selection
  const currentPaymentId = watch("paymentModeId");
  useEffect(() => {
    if (paymentData?.items?.length && !currentPaymentId) {
      setValue("paymentModeId", paymentData.items[0].id);
    }
  }, [paymentData, currentPaymentId, setValue]);

  const onSubmit = (data: FormData) => {
    if (selectedItems.length === 0) return;

    const orderPayload = {
      customerName: data.fullName,
      customerPhone: `${data.phoneCode}${data.whatsappNumber}`,
      customerEmail: data.email,
      orderType: "delivery" as const, // Fixed literal type
      quickDeliveryAddress: `${data.address}${
        data.apartment ? `, ${data.apartment}` : ""
      }, ${data.city}`,
      productRequests: selectedItems.map((item) => ({
        shopProductId: item.productId,
        quantity: item.quantity,
      })),
      paymentDistributions: [
        {
          paymentModeId: data.paymentModeId,
          amount: Number(subtotal), // Ensure numeric type
          status: "pending" as const,
        },
      ],
      totalAmount: Number(subtotal),
    };

    createOrder.mutate(orderPayload, {
      onSuccess: () => {
        clearCart();
        router.push("/order-confirmation");
      },
    });
  };

  return (
    <div className="bg-white min-h-screen font-sora py-10">
      <div className="max-w-7xl mx-auto px-3 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start flex-col-reverse lg:flex-row">
          <div className="lg:col-span-7 order-2 lg:pr-[31px] lg:order-1 lg:border-r-1 lg:border-r-[#989898]">
            <div className="border border-red-500 rounded-2xl p-6 text-center mb-8 bg-white">
              <h1 className="text-[28px] md:text-[34px] font-semibold lg:font-bold text-black mb-4 lg:mb-6 ">
                This is NOT a payment checkout
              </h1>
              <p className="text-[16px] lg:text-[18px] mb-3">
                This order is a purchase inquiry.
              </p>
              <p className=" text-[16px] md:text-[18px] leading-relaxed">
                After you place the order, our team will contact you via WhatsApp
                or phone to confirm availability, price, and delivery details
                before payment.
              </p>
            </div>

            <h2 className="text-xl font-bold mb-6 text-black">Billing Details</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("email")}
                readOnly
                type="text"
                placeholder="Email"
                className="w-full border text-[18px] text-[#7D8F7B] lg:text-[20px] font-bold border-[#989898] rounded-[16px] px-4 py-3 outline-none bg-gray-100"
              />
              <div className="w-full">
                <input
                  {...register("fullName")}
                  type="text"
                  placeholder="Full Name"
                  className="w-full border text-[18px] text-[#7D8F7B] lg:text-[20px] font-bold border-[#989898] rounded-[16px] px-4 py-3 outline-none focus:ring-1 focus:ring-[#77923B]"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <select
                  {...register("country")}
                  className="w-full border text-[18px] lg:text-[20px] font-bold border-[#989898] rounded-[16px] px-4 py-3 appearance-none outline-none bg-white text-[#7D8F7B]"
                >
                  <option value="Nepal">Nepal</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D8F7B] w-5 h-5" />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex gap-4">
                  <div className="relative w-1/4">
                    <select
                      {...register("phoneCode")}
                      className="w-full border text-[18px] text-[#7D8F7B] lg:text-[20px] font-bold border-[#989898] rounded-[16px] px-4 py-3 appearance-none outline-none bg-white"
                    >
                      <option value="+977">+977</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7D8F7B] w-4 h-4" />
                  </div>
                  <input
                    {...register("whatsappNumber")}
                    type="text"
                    placeholder="Whatsapp Number"
                    className="w-3/4 border text-[18px] lg:text-[20px] text-[#7D8F7B] font-bold border-[#989898] rounded-[16px] px-4 py-3 outline-none focus:ring-1 focus:ring-[#77923B]"
                  />
                </div>
                {errors.whatsappNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.whatsappNumber.message}
                  </p>
                )}
              </div>

              <input
                {...register("city")}
                type="text"
                placeholder="City"
                className="w-full border text-[18px] lg:text-[20px] font-bold text-[#7D8F7B] border-[#989898] rounded-[16px] px-4 py-3 outline-none focus:ring-1 focus:ring-[#77923B]"
              />
              <input
                {...register("address")}
                type="text"
                placeholder="Address"
                className="w-full border text-[18px] lg:text-[20px] font-bold text-[#7D8F7B] border-[#989898] rounded-[16px] px-4 py-3 outline-none focus:ring-1 focus:ring-[#77923B]"
              />
              <input
                {...register("apartment")}
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full border text-[18px] lg:text-[20px] font-bold text-[#7D8F7B] border-[#989898] rounded-[16px] px-4 py-3 outline-none focus:ring-1 focus:ring-[#77923B]"
              />

              {/* Dynamic Payment Modes */}
              <div className="pt-4">
                <h3 className="font-bold mb-3 text-black">Select Payment Mode</h3>
                {isPaymentLoading ? (
                  <div className="flex justify-center">
                    <Loader2 className="animate-spin" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {paymentData?.items?.map((mode) => (
                      <label
                        key={mode.id}
                        className="flex items-center gap-3 p-3 border border-[#989898] rounded-[16px] cursor-pointer hover:bg-gray-50 transition-all has-[:checked]:border-[#77923B] has-[:checked]:bg-[#f0f4e8]"
                      >
                        <input
                          type="radio"
                          value={mode.id}
                          {...register("paymentModeId")}
                          className="w-4 h-4 accent-[#77923B]"
                        />
                        <span className="text-[16px] font-bold text-[#7D8F7B]">
                          {mode.name}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
                {errors.paymentModeId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.paymentModeId.message}
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    {...register("saveInfo")}
                    type="checkbox"
                    className="w-5 h-5 accent-[#77923B] rounded"
                  />
                  <span className="text-sm text-gray-700">
                    Save my information for faster checkout next time
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    {...register("agreeTerms")}
                    type="checkbox"
                    className="w-5 h-5 accent-[#77923B] rounded mt-0.5"
                  />
                  <span className="text-sm text-gray-700">
                    By submitting this order request, you agree to our{" "}
                    <span className="font-bold underline">Terms & Conditions</span>{" "}
                    and <span className="font-bold underline">Return Policy</span>.
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.agreeTerms.message}
                  </p>
                )}
              </div>

              <button
                disabled={createOrder.isPending || selectedItems.length === 0}
                className="w-full bg-[#77923B] text-white font-bold py-4 rounded-xl mt-6 hover:bg-[#6a8335] transition-colors flex items-center justify-center disabled:opacity-50"
              >
                {createOrder.isPending ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  "Place Order"
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <div className="space-y-6">
              {selectedItems.map((item) => (
                <div key={item.productId} className="flex items-center gap-4">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <HandledImage
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-xs text-gray-500 mb-2">
                      {item.options?.size || "100gm"}
                    </p>
                    <p className="text-sm font-bold text-gray-800">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-xl font-bold text-[#77923B] mt-1">
                      Rs. {item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
              {selectedItems.length === 0 && (
                <p className="text-gray-500 italic">
                  No items selected for checkout.
                </p>
              )}
            </div>

            <hr className="border-[#989898]" />

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Discount Code or Gift Code"
                className="flex-1 border text-[18px] lg:text-[20px] font-bold border-[#989898] rounded-[16px] text-[#7D8F7B] px-4 py-3 outline-none"
              />
              <button className="bg-[#77923B] text-white px-4 lg:px-8 py-3 rounded-xl font-bold hover:bg-[#6a8335]">
                Apply
              </button>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex justify-between text-gray-700">
                <span className="font-bold">
                  Estimated SubTotal - {selectedItems.length} item
                  {selectedItems.length !== 1 ? "s" : ""}
                </span>
                <span className="font-bold">Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-bold">Estimated Shipping fee</span>
                <span className="font-bold">Rs. 0</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-extrabold text-black">
                  Estimated Total
                </span>
                <span className="text-3xl font-extrabold text-[#77923B]">
                  Rs. {subtotal}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}