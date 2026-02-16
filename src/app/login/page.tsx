import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Log In | Gray Bear Hunting Directory",
};

export default function LoginPage() {
  return (
    <div className="bg-bg-light min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent mb-2">Welcome Back</h1>
          <p className="text-text-muted">Log in to your Gray Bear account</p>
        </div>
        <div className="bg-bg-card rounded-xl border border-border p-6">
          <Suspense fallback={<div className="text-text-muted text-center py-4">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
