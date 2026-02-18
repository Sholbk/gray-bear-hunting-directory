"use client";

import Link from "next/link";
import Icon from "@/components/Icon";

const scrollCategories = [
  { label: "All", icon: "grid_view", href: "/search", active: true },
  { label: "Big Game", icon: "terrain", href: "/hunt" },
  { label: "Waterfowl", icon: "water", href: "/search?species=Duck" },
  { label: "Archery", icon: "sports_martial_arts", href: "/search?query=archery" },
  { label: "Upland", icon: "forest", href: "/search?species=Pheasant" },
  { label: "Turkey", icon: "park", href: "/search?species=Turkey" },
  { label: "Fishing", icon: "phishing", href: "/fish" },
];

export default function CategoryScroller() {
  return (
    <section className="max-w-md mx-auto lg:max-w-3xl px-4 py-2">
      <div className="flex gap-4 overflow-x-auto scroll-hidden pb-2">
        {scrollCategories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            className={`flex flex-col items-center gap-1.5 min-w-[64px] ${
              cat.active ? "text-primary" : "text-text-muted"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                cat.active
                  ? "bg-primary text-white"
                  : "bg-bg-input text-text-muted hover:bg-border"
              }`}
            >
              <Icon name={cat.icon} className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium whitespace-nowrap">{cat.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
