import SignupForm from "./SignupForm";

export const metadata = {
  title: "Sign Up | Gray Bear Hunting Directory",
};

export default function SignupPage() {
  return (
    <div className="bg-bg-light min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-accent mb-2">Create Account</h1>
          <p className="text-text-muted">Join the Gray Bear Hunting Directory</p>
        </div>
        <div className="bg-bg-card rounded-xl border border-border p-6">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
