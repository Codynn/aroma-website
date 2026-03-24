"use client";

import { usePathname } from "next/navigation";
import { cn } from '@/lib/utils';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main className={cn("flex-1", !isHome && "pt-[42px] lg:pt-16")}>
      {children}
    </main>
  );
}