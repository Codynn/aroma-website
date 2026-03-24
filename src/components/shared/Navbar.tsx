"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import LoginPopup from "@/components/auth/Login";
import { useLogout } from "@/hooks/use-auth"; 
import { MobileMenuProps, NavbarProps } from "@/types/layout/navbar.types";
import {
  NAV_LINKS,
  NAVBAR_LOGO,
  SCROLL_THRESHOLD_VH,
} from "@/constants/layout/navbar.constants";

// ── Mobile Drawer ──────────────────────────────────────────────────────────────
function MobileMenu({ isOpen, onClose, links, cartCount, scrolled }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />

      <nav
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-0 z-50 w-full h-full bg-[#7C9043] transition-transform duration-500 ease-in-out px-6 py-8 flex flex-col items-center justify-between text-white",
          isOpen ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="w-full flex justify-between items-start">
          <button
            onClick={onClose}
            className="p-2 -ml-2 hover:opacity-70 transition-opacity"
          >
            <X className="w-8 h-8 text-white" strokeWidth={1.5} />
          </button>
          
          <div className="relative w-[45px] h-[46px]">
            <Image
              src={NAVBAR_LOGO.src}
              alt={NAVBAR_LOGO.alt}
              fill
              className="object-contain"
            />
          </div>
        </div>

        <ul className="flex flex-col items-center gap-6 mb-20">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="text-[28px] text-[#F0FAEF] font-semibold font-sora hover:opacity-80 transition-opacity"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="w-full flex flex-col items-center gap-4 pb-10">
          <span className="text-[18px] text-[#D4ECD1] font-bold font-sora">
            Follow us on
          </span>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:scale-110 transition-transform">
               <Image src={`/Images/facebook-nav.png`} width={29} height={28} alt="facebook" />
            </Link>
            <Link href="#" className="hover:scale-110 transition-transform">
               <Image src={`/Images/tiktok-nav.png`} width={29} height={28} alt="tiktok" />
            </Link>
            <Link href="#" className="hover:scale-110 transition-transform">
              <Image src={`/Images/insta-nav.png`} width={29} height={28} alt="instagram" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

// ── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const pathname = usePathname();
  const { logout } = useLogout();
  const isHomePage = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);

    if (!isHomePage) {
      setScrolled(true);
      return;
    }

    function handleScroll() {
      setScrolled(window.scrollY >= window.innerHeight * SCROLL_THRESHOLD_VH);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, pathname]);

  const handleUserClick = () => {
    if (isLoggedIn) {
      setIsProfileOpen(!isProfileOpen);
    } else {
      setIsLoginOpen(true);
    }
  };

  const isTransparent = isHomePage && !scrolled;
  const iconCls = isTransparent ? "text-white" : "text-gray-800";
  const iconBtn = "p-2 rounded-full transition-colors hover:bg-black/5";
  const logoSrc = isTransparent ? NAVBAR_LOGO.src : NAVBAR_LOGO.srcDark;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-30 transition-all duration-300 md:h-[90px] h-[62px] py-2 md:py-4",
          !isTransparent
            ? "bg-white border-b border-[#D6D6D6]"
            : "bg-transparent border-b border-[#297CCD]",
        )}
      >
        <div className="max-w-7xl mx-auto">
          <div className="hidden lg:flex items-center justify-between px-4 xl:px-0">
            <Link href="/" className="shrink-0 hover:opacity-80 transition-opacity">
              <Image
                src={logoSrc}
                alt={NAVBAR_LOGO.alt}
                width={100}
                height={60}
                priority
                className={cn(
                  "object-contain transition-all duration-300 w-[100px] h-[60px]",
                  isTransparent ? "drop-shadow-md" : "",
                )}
              />
            </Link>

            <nav className="flex items-center gap-12">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-sora font-bold text-[20px] transition-colors duration-200",
                    isTransparent ? "text-white/90 hover:text-white" : "text-gray-800 hover:text-black",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-9">
              <div className="relative flex items-center">
                <div className={cn(
                  "absolute right-9 overflow-hidden transition-all duration-300",
                  searchOpen ? "w-52 opacity-100" : "w-0 opacity-0",
                )}>
                  <input
                    type="search"
                    placeholder="Search teas…"
                    className={cn(
                      "w-full rounded-full px-4 py-1.5 text-sm outline-none border",
                      isTransparent
                        ? "bg-white/15 border-white/25 text-white placeholder-white/50"
                        : "bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-400",
                    )}
                  />
                </div>
                <button onClick={() => setSearchOpen((p) => !p)} className="p-2">
                  <Search className={cn("w-7 h-7", iconCls)} strokeWidth={1.75} />
                </button>
              </div>

              <Link href="/cart" className="relative p-2">
                <Image 
                  src={isTransparent ? `/Images/cartIcon-nav.png` : `/Images/cartIcon-nav2.png`} 
                  className="w-7 h-7" width={28} height={28} alt="cart" 
                />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full bg-red-500 text-white text-[10px] font-bold ring-1 ring-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {/* User Dropdown Logic */}
              <div className="relative">
                {isTransparent ? <Image 
                  src={`/Images/user.svg`} 
                  onClick={handleUserClick}
                  className={cn("w-7 h-7 cursor-pointer", iconCls)} 
                  width={28} height={28} alt="user" 
                /> : <Image 
                  src={`/Images/user.png`} 
                  onClick={handleUserClick}
                  className={cn("w-7 h-7 cursor-pointer", iconCls)} 
                  width={28} height={28} alt="user" 
                />}
                
                
                {isLoggedIn && isProfileOpen && (
                  <div className="absolute -right-40 mt-2 w-52 bg-[#77923B] border  rounded-[16px]  z-50">
                    <div className="bg-white mt-2 rounded-[16px]">
                      <Link 
                      href="/order-history"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center center gap-4 px-4 py-3 text-black text-[14px] lg:text-[16px] rounded-[16px] hover:bg-gray-50 transition-colors font-sora "
                    >
                      <Image src={'/Images/arrow-right.svg'} alt="arrow" width={16} height={16} className="w-4 h-4 " />
                      My Order
                      
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center  text-[14px] lg:text-[16px] gap-4 px-4 py-3 text-black rounded-[16px] hover:bg-gray-50 transition-colors font-sora "
                    >
                       <Image src={'/Images/arrow-right.svg'} alt="arrow" width={16} height={16} className="w-4 h-4 " />
                      Logout
                     
                    </button>
                    </div>
                    
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="flex lg:hidden items-center justify-between px-6">
            <div className="flex items-center gap-6">
              <button onClick={() => setMobileOpen(true)} className={iconBtn}>
                <Menu className={cn("w-[19px] h-[14px]", iconCls)} strokeWidth={1.75} />
              </button>
              <Link href="/">
                <Image
                  src={logoSrc}
                  alt={NAVBAR_LOGO.alt}
                  width={45}
                  height={46}
                  className="w-[45px] h-[46px] object-contain"
                />
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => setSearchOpen((p) => !p)} className={iconBtn}>
                <Search className={cn("w-5 h-5", iconCls)} strokeWidth={1.75} />
              </button>
              <Link href="/cart" className="relative">
                <Image 
                  src={isTransparent ? `/Images/cartIcon-nav.png` : `/Images/cartIcon-nav2.png`} 
                  className="w-5 h-5" width={20} height={20} alt="cart" 
                />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full bg-red-500 text-white text-[10px] font-bold ring-1 ring-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              {isTransparent ? <Image 
                src={`/Images/user.svg`} 
                onClick={handleUserClick}
                className={cn("w-5 h-5 cursor-pointer", iconCls)} 
                width={20} height={20} alt="user" 
              /> : <Image 
                src={`/Images/user.png`} 
                onClick={handleUserClick}
                className={cn("w-5 h-5 cursor-pointer", iconCls)} 
                width={20} height={20} alt="user" 
              />}
              
            </div>
          </div>
        </div>
      </header>

      <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
        cartCount={cartCount}
        scrolled={scrolled}
      />
    </>
  );
}