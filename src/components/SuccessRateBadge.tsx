interface SuccessRateBadgeProps {
  rate: number;
  size?: "sm" | "md" | "lg";
}

export default function SuccessRateBadge({
  rate,
  size = "md",
}: SuccessRateBadgeProps) {
  const color =
    rate >= 85
      ? "text-green-400 bg-green-400/10 border-green-400/30"
      : rate >= 70
      ? "text-amber-brand bg-amber-brand/10 border-amber-brand/30"
      : "text-gray-text bg-gray-light/30 border-gray-light";

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  }[size];

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border ${color} ${sizeClasses}`}
    >
      {rate}% Success
    </span>
  );
}
