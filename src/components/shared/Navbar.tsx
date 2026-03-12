"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileMenuProps, NavbarProps } from "@/types/layout/navbar.types";
import {
  NAV_LINKS,
  NAVBAR_LOGO,
  SCROLL_THRESHOLD_VH,
} from "@/constants/layout/navbar.constants";

// ─────────────────────────────────────────────────────────────────────────────
// Mobile Drawer
// ─────────────────────────────────────────────────────────────────────────────
function MobileMenu({ isOpen, onClose, links, cartCount }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />

      {/* Slide-in drawer from left */}
      <nav
        aria-label="Mobile navigation"
        className={cn(
          "fixed top-0 left-0 h-full w-[75vw] max-w-75 z-50",
          "flex flex-col bg-white shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header — always use dark logo inside white drawer */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Image
            src={NAVBAR_LOGO.srcDark}
            alt={NAVBAR_LOGO.alt}
            width={44}
            height={44}
            className="object-contain"
          />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Links */}
        <ul className="flex-1 py-4 overflow-y-auto">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block px-6 py-4 font-candara font-bold text-[18px]
                           text-gray-800 hover:text-black hover:bg-gray-50
                           border-b border-gray-50 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Cart CTA */}
        <div className="p-5 border-t border-gray-100">
          <Link
            href="/cart"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3
                       rounded-full bg-black text-white font-sora font-bold
                       text-sm tracking-wide hover:bg-gray-900 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Cart
            {cartCount > 0 && (
              <span className="ml-1 bg-red-500 text-white text-[10px] font-bold
                               rounded-full min-w-[18px] h-[18px] flex items-center
                               justify-center px-1">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Navbar
// ─────────────────────────────────────────────────────────────────────────────
export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY >= window.innerHeight * SCROLL_THRESHOLD_VH);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = !scrolled;
  const iconCls = isTransparent ? "text-white" : "text-gray-800";
  const iconBtn = "p-2 rounded-full transition-colors hover:bg-black/5";

  // ── Logo src swaps based on navbar state ──────────────────────────────────
  const logoSrc = isTransparent ? NAVBAR_LOGO.src : NAVBAR_LOGO.srcDark;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-30 transition-all duration-300",
          scrolled
            ? "bg-white shadow-[0_2px_16px_rgba(0,0,0,0.08)] py-2"
            : "bg-transparent py-3",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── DESKTOP ─────────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center justify-between">

            {/* Logo */}
            <Link href="/" aria-label="Aroma Speciality Tea — Home"
              className="shrink-0 hover:opacity-80 transition-opacity">
              <Image
                src={logoSrc}
                alt={NAVBAR_LOGO.alt}
                width={NAVBAR_LOGO.width}
                height={NAVBAR_LOGO.height}
                priority
                className={cn(
                  "object-contain transition-all duration-300",
                  isTransparent ? "w-14 h-14 drop-shadow-md" : "w-14 h-14",
                )}
              />
            </Link>

            {/* Nav links */}
            <nav aria-label="Main navigation" className="flex items-center gap-1 lg:gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-sora font-bold text-[16px] lg:text-[18px] px-4 py-2 transition-colors duration-200",
                    "relative after:absolute after:bottom-0 after:left-4 after:right-4",
                    "after:h-[2px] after:rounded-full after:scale-x-0 hover:after:scale-x-100",
                    "after:transition-transform after:duration-200",
                    isTransparent
                      ? "text-white/90 hover:text-white after:bg-white"
                      : "text-gray-800 hover:text-black after:bg-black",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search + Cart */}
            <div className="flex items-center gap-2">

              {/* Search button */}
              <div className="relative flex items-center">
                <div className={cn(
                  "absolute right-9 overflow-hidden transition-all duration-300",
                  searchOpen ? "w-52 opacity-100" : "w-0 opacity-0",
                )}>
                  <input
                    type="search"
                    placeholder="Search teas…"
                    autoFocus={searchOpen}
                    onBlur={() => setSearchOpen(false)}
                    className={cn(
                      "w-full rounded-full px-4 py-1.5 text-sm outline-none border transition-colors",
                      isTransparent
                        ? "bg-white/15 border-white/25 text-white placeholder-white/50"
                        : "bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-400",
                    )}
                  />
                </div>
                <button
                  onClick={() => setSearchOpen((p) => !p)}
                  aria-label="Search"
                  className={cn(
                    "p-2 rounded-full transition-all duration-300",
                  )}
                >
                  <Search className={cn("w-5 h-5", iconCls)} strokeWidth={1.75} />
                </button>
              </div>

              {/* Cart button — white bordered pill on transparent, plain on white */}
              <Link
                href="/cart"
                aria-label={`Cart — ${cartCount} items`}
                className={cn(
                  "relative flex items-center justify-center transition-all duration-300",
                )}
              >
                <ShoppingBag className={cn("w-5 h-5", iconCls)} strokeWidth={1.75} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px]
                                   flex items-center justify-center px-1 rounded-full
                                   bg-red-500 text-white text-[10px] font-bold ring-1 ring-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* ── MOBILE ──────────────────────────────────────────────────── */}
          <div className="flex md:hidden items-center justify-between">

            {/* LEFT: Hamburger + Logo */}
            <div className="flex items-center gap-2">
              <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className={iconBtn}>
                <Menu className={cn("w-5 h-5", iconCls)} strokeWidth={1.75} />
              </button>
              <Link href="/" aria-label="Aroma Speciality Tea — Home"
                className="hover:opacity-80 transition-opacity">
                <Image
                  src={logoSrc}
                  alt={NAVBAR_LOGO.alt}
                  width={40}
                  height={40}
                  priority
                  className={cn(
                    "object-contain transition-all duration-300",
                    isTransparent ? "drop-shadow-md" : "",
                  )}
                />
              </Link>
            </div>

            {/* RIGHT: Search + Cart */}
            <div className="flex items-center gap-0.5">
              <button onClick={() => setSearchOpen((p) => !p)} aria-label="Search" className={iconBtn}>
                <Search className={cn("w-5 h-5", iconCls)} strokeWidth={1.75} />
              </button>
              <Link href="/cart" aria-label={`Cart — ${cartCount} items`} className={cn("relative", iconBtn)}>
                <ShoppingBag className={cn("w-5 h-5", iconCls)} strokeWidth={1.75} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px]
                                   flex items-center justify-center px-1 rounded-full
                                   bg-red-500 text-white text-[10px] font-bold ring-1 ring-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
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