interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export default function RatingStars({
  rating,
  size = "md",
  showValue = true,
}: RatingStarsProps) {
  const starSize = { sm: "text-sm", md: "text-lg", lg: "text-2xl" }[size];
  const textSize = { sm: "text-xs", md: "text-sm", lg: "text-base" }[size];

  return (
    <div className="flex items-center gap-1">
      <div className={`flex ${starSize}`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.floor(rating);
          const partial = !filled && star - rating < 1 && star - rating > 0;
          return (
            <span
              key={star}
              className={
                filled
                  ? "text-amber-brand"
                  : partial
                  ? "text-amber-brand opacity-50"
                  : "text-gray-light"
              }
            >
              ★
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className={`text-gray-muted ${textSize} ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
