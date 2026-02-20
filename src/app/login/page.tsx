import { Suspense } from "react";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Log In | Gray Bear Hunting Directory",
};

function LoginFormSkeleton() {
  return (
    <div className="space-y-4">
      <div>
        <div className="block text-sm font-medium text-text-primary mb-1">Email</div>
        <div className="w-full h-[38px] bg-bg-input border border-border rounded-xl" />
      </div>
      <div>
        <div className="block text-sm font-medium text-text-primary mb-1">Password</div>
        <div className="w-full h-[38px] bg-bg-input border border-border rounded-xl" />
      </div>
      <div className="w-full h-[48px] bg-accent/50 rounded-xl" />
      <p className="text-center text-text-muted text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-accent hover:text-accent-light">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="bg-bg-light min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent mb-2">Welcome Back</h1>
          <p className="text-text-muted">Log in to your Gray Bear account</p>
        </div>
        <div className="bg-bg-card rounded-xl border border-border p-6">
          <Suspense fallback={<LoginFormSkeleton />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
