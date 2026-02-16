"use client";

import Link from "next/link";
import { useState } from "react";

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
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-gray-dark border-l border-gray-light overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-light">
          <span className="text-amber-brand font-bold text-lg">Menu</span>
          <button onClick={onClose} className="p-2 text-gray-muted hover:text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {/* Find Section */}
          <button
            onClick={() => toggleSection("find")}
            className="w-full flex items-center justify-between py-3 text-gray-text font-medium"
          >
            Find
            <svg className={`w-4 h-4 transition-transform ${expandedSection === "find" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSection === "find" && (
            <div className="pl-4 space-y-1">
              {findLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={onClose} className="block py-2 text-sm text-gray-muted hover:text-amber-brand transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Categories Section */}
          <button
            onClick={() => toggleSection("categories")}
            className="w-full flex items-center justify-between py-3 text-gray-text font-medium"
          >
            Categories
            <svg className={`w-4 h-4 transition-transform ${expandedSection === "categories" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSection === "categories" && (
            <div className="pl-4 space-y-1">
              {categoryLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={onClose} className="block py-2 text-sm text-gray-muted hover:text-amber-brand transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Direct Links */}
          <Link href="/blog" onClick={onClose} className="block py-3 text-gray-text font-medium hover:text-amber-brand transition-colors">
            Blog
          </Link>
          <Link href="/calendar" onClick={onClose} className="block py-3 text-gray-text font-medium hover:text-amber-brand transition-colors">
            Calendar
          </Link>
          <Link href="/about" onClick={onClose} className="block py-3 text-gray-text font-medium hover:text-amber-brand transition-colors">
            About
          </Link>

          <div className="pt-4 border-t border-gray-light space-y-2">
            <Link href="/login" onClick={onClose} className="block w-full text-center py-2 text-sm text-gray-text border border-gray-light rounded-lg hover:border-amber-brand hover:text-amber-brand transition-colors">
              Log In
            </Link>
            <Link href="/signup" onClick={onClose} className="block w-full text-center py-2 text-sm bg-amber-brand text-gray-dark font-semibold rounded-lg hover:bg-amber-light transition-colors">
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
