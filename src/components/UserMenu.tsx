"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface UserMenuProps {
  email: string;
  fullName: string;
}

export default function UserMenu({ email, fullName }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const initials = fullName
    ? fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : email[0].toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-full bg-amber-brand text-gray-dark font-bold text-sm flex items-center justify-center hover:bg-amber-light transition-colors"
      >
        {initials}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-gray-dark border border-gray-light rounded-lg shadow-xl py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-light">
            <p className="text-gray-text text-sm font-medium truncate">{fullName || email}</p>
            <p className="text-gray-muted text-xs truncate">{email}</p>
          </div>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-text hover:text-amber-brand hover:bg-gray-medium transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/listings"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-text hover:text-amber-brand hover:bg-gray-medium transition-colors"
          >
            My Listings
          </Link>
          <Link
            href="/dashboard/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-text hover:text-amber-brand hover:bg-gray-medium transition-colors"
          >
            Profile Settings
          </Link>
          <div className="border-t border-gray-light mt-1 pt-1">
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-muted hover:text-red-400 hover:bg-gray-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
