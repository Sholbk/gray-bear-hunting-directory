"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";

const navItems = [
  { label: "Home", icon: "home", href: "/" },
  { label: "Map", icon: "map", href: "/state" },
  { label: "Add", icon: "add", href: "/signup", isCenter: true },
  { label: "Search", icon: "search", href: "/search" },
  { label: "Profile", icon: "person", href: "/dashboard" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-bg-card border-t border-border lg:hidden">
      <div className="max-w-md mx-auto px-4 flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          if (item.isCenter) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-center w-14 h-14 -mt-5 rounded-full bg-accent text-white shadow-lg shadow-accent/30"
              >
                <Icon name={item.icon} className="w-[30px] h-[30px]" />
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${
                isActive ? "text-primary" : "text-text-muted"
              }`}
            >
              <Icon name={item.icon} className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
