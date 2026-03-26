"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import { useMe } from "@/services/api/user.api";

interface UserAvatarProps {
  isTransparent: boolean;
  onClick: () => void;
  className?: string;
  width?: number;
  height?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  isTransparent, 
  onClick, 
  className, 
  width = 28, 
  height = 28 
}) => {
  const [mounted, setMounted] = useState(false);
  const token = Cookies.get("token");

  // We only run the query if we are on the client and have a token
  const { data: user, isLoading } = useMe(); // Ensure your hook handles 'enabled' internally or wrap it

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show default icon during SSR and until mounted to prevent hydration errors
  if (!mounted || !token) {
    return (
      <Image
        src={isTransparent ? `/Images/user.svg` : `/Images/user.png`}
        onClick={onClick}
        className={className}
        width={width}
        height={height}
        alt="user"
      />
    );
  }

  if (isLoading) {
    return (
      <div 
        className={cn("rounded-full bg-gray-200 animate-pulse", className)} 
        style={{ width, height }} 
      />
    );
  }

  const initial = user?.email?.charAt(0).toUpperCase() || "?";

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center cursor-pointer font-bold transition-all  font-sora",
        isTransparent
          ? "bg-white text-black "
          : "bg-[#77923B] text-white ",
        className
      )}
     
    >
      <span style={{ fontSize: width > 20 ? "14px" : "11px" }}>{initial}</span>
    </div>
  );
};

export default UserAvatar;