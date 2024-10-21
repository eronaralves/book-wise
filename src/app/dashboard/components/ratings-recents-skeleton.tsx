
// Components
import { RatingCardSkeleton } from "@/components/rating-card-skeleton";

export function RatingRecentSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4">
      <RatingCardSkeleton />
      <RatingCardSkeleton />
    </div>
  )
}