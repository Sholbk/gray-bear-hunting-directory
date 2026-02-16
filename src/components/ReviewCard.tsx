import { Review } from "@/types";
import RatingStars from "./RatingStars";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-gray-medium rounded-lg p-5 border border-gray-light">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-brand/20 flex items-center justify-center">
            <span className="text-amber-brand font-semibold text-sm">
              {review.author.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-gray-text font-medium text-sm">
              {review.author}
            </p>
            <p className="text-gray-muted text-xs">
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
      <p className="text-gray-text text-sm leading-relaxed">{review.text}</p>
    </div>
  );
}
