"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const findLinks = [
  { label: "Browse All Listings", href: "/search" },
  { label: "Hunting Guides", href: "/search?type=guide" },
  { label: "Outfitters", href: "/search?type=outfitter" },
  { label: "Fishing Charters", href: "/search?type=charter" },
  { label: "Browse by State", href: "/state" },
  { label: "Hunting Species", href: "/hunt" },
  { label: "Fishing Species", href: "/fish" },
];

const categoryLinks = [
  { label: "All Categories", href: "/directory" },
  { label: "Boats & Vehicles", href: "/search?type=boat" },
  { label: "Taxidermy", href: "/search?type=taxidermy" },
  { label: "Retailers & Pro Shops", href: "/search?type=retailer" },
  { label: "Gun Dogs", href: "/search?type=dog-trainer" },
  { label: "Shooting Ranges", href: "/search?type=shooting-range" },
  { label: "Education & Safety", href: "/search?type=education" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-bg-card border-l border-border overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="text-primary font-bold text-lg">Menu</span>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-text-primary">
            <Icon name="close" className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {/* Find Section */}
          <button
            onClick={() => toggleSection("find")}
            className="w-full flex items-center justify-between py-3 text-text-primary font-medium"
          >
            Find
            <Icon name="expand_more" className={`w-[18px] h-[18px] transition-transform ${expandedSection === "find" ? "rotate-180" : ""}`} />
          </button>
          {expandedSection === "find" && (
            <div className="pl-4 space-y-1">
              {findLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={onClose} className="block py-2 text-sm text-text-secondary hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Categories Section */}
          <button
            onClick={() => toggleSection("categories")}
            className="w-full flex items-center justify-between py-3 text-text-primary font-medium"
          >
            Categories
            <Icon name="expand_more" className={`w-[18px] h-[18px] transition-transform ${expandedSection === "categories" ? "rotate-180" : ""}`} />
          </button>
          {expandedSection === "categories" && (
            <div className="pl-4 space-y-1">
              {categoryLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={onClose} className="block py-2 text-sm text-text-secondary hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Direct Links */}
          <Link href="/blog" onClick={onClose} className="block py-3 text-text-primary font-medium hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="/calendar" onClick={onClose} className="block py-3 text-text-primary font-medium hover:text-primary transition-colors">
            Calendar
          </Link>
          <Link href="/about" onClick={onClose} className="block py-3 text-text-primary font-medium hover:text-primary transition-colors">
            About
          </Link>

          <div className="pt-4 border-t border-border space-y-2">
            <Link href="/login" onClick={onClose} className="block w-full text-center py-2 text-sm text-text-primary border border-border rounded-xl hover:border-primary hover:text-primary transition-colors">
              Log In
            </Link>
            <Link href="/signup" onClick={onClose} className="block w-full text-center py-2 text-sm bg-accent text-white font-semibold rounded-xl hover:bg-accent-light transition-colors">
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
