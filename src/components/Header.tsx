"use client";

import Link from "next/link";
import { useState } from "react";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";

const findItems = [
  { label: "Browse All Listings", href: "/search" },
  { label: "Hunting Guides", href: "/search?type=guide" },
  { label: "Outfitters", href: "/search?type=outfitter" },
  { label: "Fishing Charters", href: "/search?type=charter" },
  { label: "Browse by State", href: "/state" },
  { label: "Hunting Species", href: "/hunt" },
  { label: "Fishing Species", href: "/fish" },
];

const categoryItems = [
  { label: "All Categories", href: "/directory" },
  { label: "Boats & Vehicles", href: "/search?type=boat" },
  { label: "Taxidermy", href: "/search?type=taxidermy" },
  { label: "Retailers & Pro Shops", href: "/search?type=retailer" },
  { label: "Gun Dogs", href: "/search?type=dog-trainer" },
  { label: "Shooting Ranges", href: "/search?type=shooting-range" },
  { label: "Education & Safety", href: "/search?type=education" },
  { label: "Game Processing", href: "/search?type=processor" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-gray-dark border-b border-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-amber-brand text-2xl font-bold tracking-tight">
              Gray Bear
            </span>
            <span className="text-gray-text text-sm hidden sm:inline">
              Hunting Directory
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavDropdown label="Find" items={findItems} />
            <NavDropdown label="Categories" items={categoryItems} />
            <Link href="/blog" className="text-gray-text hover:text-amber-brand transition-colors text-sm font-medium">
              Blog
            </Link>
            <Link href="/calendar" className="text-gray-text hover:text-amber-brand transition-colors text-sm font-medium">
              Calendar
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/login" className="text-gray-text hover:text-amber-brand transition-colors text-sm font-medium">
                Log In
              </Link>
              <Link href="/signup" className="bg-amber-brand text-gray-dark px-4 py-2 rounded-lg text-sm font-semibold hover:bg-amber-light transition-colors">
                Sign Up
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-gray-muted hover:text-white"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
