interface PriceRangeProps {
  min: number;
  max: number;
  size?: "sm" | "md" | "lg";
}

function formatPrice(price: number): string {
  if (price >= 1000) {
    const k = price / 1000;
    return k % 1 === 0 ? `$${k}k` : `$${k.toFixed(1)}k`;
  }
  return `$${price}`;
}

export default function PriceRange({ min, max, size = "md" }: PriceRangeProps) {
  const textSize = { sm: "text-xs", md: "text-sm", lg: "text-lg" }[size];

  return (
    <span className={`font-semibold text-text-primary ${textSize}`}>
      {formatPrice(min)} – {formatPrice(max)}
    </span>
  );
}
