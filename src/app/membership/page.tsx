import PricingCard from "@/components/PricingCard";
import { MembershipPlan } from "@/types";

export const metadata = {
  title: "Membership Plans | Gray Bear Hunting Directory",
  description: "Choose a membership plan and list your hunting or fishing business on the Gray Bear Hunting Directory.",
};

const plans: MembershipPlan[] = [
  {
    id: "1",
    tier: "free",
    name: "Free",
    price_monthly: 0,
    price_yearly: 0,
    features: ["1 basic listing", "Community access", "Search visibility"],
    max_listings: 1,
    highlighted: false,
  },
  {
    id: "2",
    tier: "basic",
    name: "Basic",
    price_monthly: 29,
    price_yearly: 290,
    features: ["3 enhanced listings", "Priority placement", "Review responses", "Badge display", "Email support"],
    max_listings: 3,
    highlighted: false,
  },
  {
    id: "3",
    tier: "premium",
    name: "Premium",
    price_monthly: 79,
    price_yearly: 790,
    features: ["10 featured listings", "Top search placement", "Analytics dashboard", "Photo gallery", "Phone support", "Social media links"],
    max_listings: 10,
    highlighted: true,
  },
  {
    id: "4",
    tier: "elite",
    name: "Elite",
    price_monthly: 199,
    price_yearly: 1990,
    features: ["Unlimited listings", "Homepage featured", "Blog posting", "Event creation", "Dedicated account manager", "Custom branding", "API access"],
    max_listings: 999,
    highlighted: false,
  },
];

export default function MembershipPage() {
  return (
    <div className="bg-bg-light min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Membership Plans
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            List your business on the most trusted hunting and fishing directory. Choose the plan that fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}
