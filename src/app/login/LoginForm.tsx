"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Check that Supabase is configured correctly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-3">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 bg-bg-input border border-border rounded-xl text-text-primary text-sm focus:outline-none focus:border-primary"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent-light transition-colors disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Log In"}
      </button>
      <p className="text-center text-text-muted text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-accent hover:text-accent-light">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
