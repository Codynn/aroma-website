'use client';

import React from 'react';
import Image from 'next/image';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleGoogleLogin = (): void => {
    // 1. Detect environment to set the correct redirect base
    const baseUrI = process.env.NEXT_PUBLIC_BASE_URL;
    const isDev = window.location.hostname === 'localhost';
    const baseUrl = isDev ? 'http://localhost:3000' : 'https://aromateanepal.com.np';
    
    // 2. Define the path for your Success Component
    const successPath = `${baseUrl}/login-success`;
    
    // 3. CRITICAL: Encode the entire path so the API doesn't lose parameters
    const encodedRedirect = encodeURIComponent(successPath);

    // 4. Construct the final API URL
    const authUrl = `${baseUrI}/user/initiate-google-auth?role=CUSTOMER&redirectTo=${encodedRedirect}`;
    
    window.location.href = authUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-sm p-8 bg-white rounded-[16px] shadow-2xl mx-4 border border-gray-100">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-black transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-sora">Welcome to</h2>
          <div className="relative w-[220px] h-[194px] mb-8">
            <Image src="/Images/blacklogo.svg" alt="Logo" fill className="object-contain" />
          </div>
          <button 
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-3 px-4 border-2 border-black rounded-[12px] font-medium text-[18px] hover:bg-gray-50 transition-transform active:scale-95 cursor-pointer font-sora"
          >
            <Image src="/Images/google.png" alt="" width={28} height={28} className="mr-3" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;