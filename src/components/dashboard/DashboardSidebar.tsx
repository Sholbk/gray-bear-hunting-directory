"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: "📊" },
  { label: "My Listings", href: "/dashboard/listings", icon: "📋" },
  { label: "Profile", href: "/dashboard/profile", icon: "👤" },
  { label: "Blog Posts", href: "/dashboard/blog", icon: "✏️" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <nav className="bg-bg-card rounded-xl border border-border p-3 sticky top-24 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-text-muted hover:text-text-primary hover:bg-bg-input"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
