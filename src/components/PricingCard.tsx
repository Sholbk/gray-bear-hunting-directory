import Link from "next/link";
import { MembershipPlan } from "@/types";

interface PricingCardProps {
  plan: MembershipPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={`bg-gray-dark rounded-xl border p-6 flex flex-col ${
        plan.highlighted
          ? "border-amber-brand shadow-lg shadow-amber-brand/10 relative"
          : "border-gray-light"
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-brand text-gray-dark text-xs font-bold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-text mb-1">{plan.name}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold text-amber-brand">
          ${plan.price_monthly}
        </span>
        <span className="text-gray-muted text-sm">/month</span>
        {plan.price_yearly > 0 && (
          <p className="text-gray-muted text-xs mt-1">
            or ${plan.price_yearly}/year (save {Math.round((1 - plan.price_yearly / (plan.price_monthly * 12)) * 100)}%)
          </p>
        )}
      </div>
      <ul className="space-y-2 mb-6 flex-1">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-muted">
            <span className="text-amber-brand mt-0.5">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/signup"
        className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
          plan.highlighted
            ? "bg-amber-brand text-gray-dark hover:bg-amber-light"
            : "border border-gray-light text-gray-text hover:border-amber-brand hover:text-amber-brand"
        }`}
      >
        {plan.price_monthly === 0 ? "Get Started Free" : "Choose Plan"}
      </Link>
    </div>
  );
}
