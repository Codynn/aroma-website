'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import {toast} from 'sonner'

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Get the token from the URL query string
    const token = searchParams.get('token');

    if (token) {
      // 2. Save to cookies so your CartPage handleCheckoutClick can find it
      Cookies.set('token', token, { expires: 7, path: '/' });
    }

    // 3. Wait 3 seconds then go home
    const timer = setTimeout(() => {
     toast.success('Login Successfull')
      router.push('/'); 
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  return (
    <div className="text-center animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-gray-200 text-[#77923b] rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl font-black text-gray-900 font-sora">Login Successful!</h1>
      <p className="text-gray-500 mt-2 font-sora">Setting up your session and redirecting...</p>
      <div className="mt-8 flex justify-center gap-1">
        <div className="w-2 h-2 bg-[#77923b] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-[#77923b] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-[#77923b] rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}

export default function LoginSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}