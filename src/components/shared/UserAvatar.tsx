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
  height = 28,
}) => {
  const [mounted, setMounted] = useState(false);
  const token = Cookies.get("token");

  const { data: user, isLoading } = useMe();

  useEffect(() => {
    setMounted(true);
  }, []);

  const [imageUrl, setImageUrl] = useState(user?.photo);

  useEffect(() => {
    if (user?.photo) setImageUrl(user?.photo);
  }, [user?.photo]);

  if (!mounted || !token) {
    return (
      <Image
        src={isTransparent ? `/Images/user.svg` : `/Images/user.png`}
        onError={(error: any) => {
          setImageUrl(null);
        }}
        onClick={onClick}
        className={className}
        width={width}
        height={height}
        alt=""
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
  if (imageUrl) {
    return (
      <Image
        src={
          imageUrl || (isTransparent ? `/Images/user.svg` : `/Images/user.png`)
        }
        onError={(error: any) => {
          setImageUrl(null);
        }}
        onClick={onClick}
        className={cn("rounded-full", className)}
        width={width}
        height={height}
        alt=""
      />
    );
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center cursor-pointer font-bold transition-all  font-sora",
        isTransparent ? "bg-white text-black " : "bg-[#77923B] text-white ",
        className,
      )}
    >
      <span style={{ fontSize: width > 20 ? "14px" : "11px" }}>{initial}</span>
    </div>
  );
};

export default UserAvatar;
