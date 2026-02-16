"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    businessName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            business_name: formData.businessName,
          },
        },
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred. Check that Supabase is configured correctly.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-4">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-gray-text mb-2">Check Your Email</h3>
        <p className="text-gray-muted text-sm mb-4">
          We&apos;ve sent a confirmation link to <strong className="text-gray-text">{formData.email}</strong>.
          Click the link to activate your account.
        </p>
        <Link href="/login" className="text-amber-brand hover:text-amber-light text-sm font-medium">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg p-3">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-text mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          required
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
        />
      </div>
      <div>
        <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-text mb-1">
          Email
        </label>
        <input
          type="email"
          id="signupEmail"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
        />
      </div>
      <div>
        <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-text mb-1">
          Password
        </label>
        <input
          type="password"
          id="signupPassword"
          required
          minLength={6}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
        />
      </div>
      <div>
        <label htmlFor="businessName" className="block text-sm font-medium text-gray-text mb-1">
          Business Name <span className="text-gray-muted">(optional)</span>
        </label>
        <input
          type="text"
          id="businessName"
          value={formData.businessName}
          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          className="w-full px-3 py-2 bg-gray-medium border border-gray-light rounded-lg text-gray-text text-sm focus:outline-none focus:border-amber-brand"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-amber-brand text-gray-dark py-3 rounded-lg font-semibold hover:bg-amber-light transition-colors disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
      <p className="text-center text-gray-muted text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-amber-brand hover:text-amber-light">
          Log In
        </Link>
      </p>
    </form>
  );
}
