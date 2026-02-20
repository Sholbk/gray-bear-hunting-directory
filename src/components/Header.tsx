"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import Icon from "@/components/Icon";

const findItems = [
  { label: "Browse All Listings", href: "/search" },
  { label: "Guides & Outfitters", href: "/search?type=guide&type=outfitter" },
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
    <header className="sticky top-0 z-50">
      {/* Top bar with logo */}
      <div className="bg-bg-light border-b border-border">
        {/* Mobile Header */}
        <div className="lg:hidden">
          <div className="max-w-md mx-auto px-4 flex items-center justify-between h-14">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Gray Bear Hunting Directory"
                width={180}
                height={28}
                className="h-7 w-auto"
                priority
              />
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                className="p-2 text-text-primary"
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
              >
                <Icon name="menu" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Gray Bear Hunting Directory"
                  width={240}
                  height={37}
                  className="h-9 w-auto"
                  priority
                />
              </Link>
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <span>+1 623 469 6636</span>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                <Link href="/login" className="hover:text-primary transition-colors">Login</Link>
                <Link href="/signup" className="bg-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent-light transition-colors">
                  Join Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nav bar - teal-gray */}
      <div className="hidden lg:block bg-primary">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-12">
            <nav className="flex items-center gap-6">
              <NavDropdown label="Member Directory" items={findItems} />
              <NavDropdown label="Categories" items={categoryItems} />
              <Link href="/calendar" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                Upcoming Events
              </Link>
              <Link href="/blog" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                Blog
              </Link>
              <Link href="/contact" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                Contact Us
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
