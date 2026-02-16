import { Review } from "@/types";
import RatingStars from "./RatingStars";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-bg-input rounded-xl p-5 border border-border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-accent font-semibold text-sm">
              {review.author.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-text-primary font-medium text-sm">
              {review.author}
            </p>
            <p className="text-text-muted text-xs">
              {new Date(review.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <RatingStars rating={review.rating} size="sm" showValue={false} />
      </div>
      <p className="text-text-primary text-sm leading-relaxed">{review.text}</p>
    </div>
  );
}
