import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Log In | Gray Bear Hunting Directory",
};

export default function LoginPage() {
  return (
    <div className="bg-gray-darker min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-brand mb-2">Welcome Back</h1>
          <p className="text-gray-muted">Log in to your Gray Bear account</p>
        </div>
        <div className="bg-gray-dark rounded-xl border border-gray-light p-6">
          <Suspense fallback={<div className="text-gray-muted text-center py-4">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
