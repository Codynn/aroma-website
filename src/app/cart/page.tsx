'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Minus, Plus, MoveRight } from 'lucide-react'; 
import RelatedProducts from '@/components/produt-detail/you-might-also-like';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import LoginPopup from '@/components/auth/Login'; 
import { useCart } from '@/hooks/user-cart'; // Import the hook
import HandledImage from '@/components/shared/HandleImage'; // Use your image handler

const CartPage: React.FC = () => {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  
  // Use the cart hook logic
  const { cart, updateQuantity, removeFromCart } = useCart();

  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isEmpty: boolean = cart.length === 0;
  const subtotal: number = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckoutClick = () => {
    const token = Cookies.get('token'); 
    if (token) {
      router.push('/checkout');
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sora">
      <h1 className="text-[25px] md:text-[50px] font-semibold md:font-bold text-center mb-8">Cart</h1>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative w-[169px] h-[193px] md:w-[230px] md:h-[263px] mb-8">
            <Image 
              src="/Images/cartIcon.png" 
              alt="Empty Cart" 
              fill 
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-[#222222] text-[15px] md:text-[17px] mb-10 max-w-md">
            Discover our premium Himalayan organic teas, hand-harvested from Ilam, Nepal.
          </p>
          <Link href={`/product`}> 
            <button className="bg-[#7A933E] hover:bg-[#6b8235] text-white text-[18px] md:text-[20px] py-2 px-10 rounded-[16px] transition-all flex items-center gap-2 cursor-pointer">
              Browse Our Teas
              <MoveRight size={20} />
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Item List */}
          <div className="lg:col-span-7 space-y-[26px] border-b border-[#989898] md:border-0">
            {cart.map((item, index) => (
              <div key={`${item.productId}-${index}`} className="flex gap-[14px] md:gap-6 pb-6 ">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    defaultChecked
                    className="w-5 h-5 border-gray-300 rounded cursor-pointer accent-[#7A933E]" 
                  />
                </div>
                
                <div className="w-[118px] h-[129px] md:w-[162px] md:h-[176px] rounded-[16px] overflow-hidden bg-gray-50 flex-shrink-0 relative">
                  <HandledImage src={item.image} alt={item.title} fill className="object-cover" />
                </div>

                <div className="flex-grow">
                  <h3 className="text-[18px] md:text-[20px] text-[#121212]">{item.title}</h3>
                  <p className="text-[15px] md:text-[17px] text-[#222222] mb-4 md:mb-5">
                    {item.options?.size || "100gm"}
                  </p>
                  <p className="text-[24px] md:text-[28px] font-semibold text-[#0B6B00] mb-2 md:mb-3">Rs.{item.price}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded-[16px] w-fit px-2 py-2">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1, item.options?.color, item.options?.size)}
                        className="p-1 hover:text-[#7A933E] cursor-pointer"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.options?.color, item.options?.size)}
                        className="p-1 hover:text-[#7A933E] cursor-pointer"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.productId, item.options?.color, item.options?.size)}
                      className="text-[#7D8F7B] hover:text-red-500 text-[16px] font-bold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Summary */}
          <div className="lg:col-span-5">
            <div className="lg:border-l lg:pl-12 border-[#989898] h-full">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-gray-900">SubTotal</span>
                <span className="text-2xl font-bold text-[#008000]">Rs.{subtotal}</span>
              </div>
              
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Note: Taxes, shipping fees, and discount codes will be applied at checkout.
              </p>

              <button 
                onClick={handleCheckoutClick}
                className="w-full bg-[#7A933E] hover:bg-[#6b8235] text-white cursor-pointer font-bold py-4 rounded-xl transition-all mb-4 shadow-sm active:scale-[0.98]"
              >
                Checkout
              </button>

              <Link href="/product" className="w-full flex items-center justify-center gap-2 text-gray-700 font-medium hover:gap-3 transition-all">
                Continue Shopping <MoveRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      )}

      <RelatedProducts />

      <LoginPopup 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </div>
  );
};

export default CartPage;