// Components
import { PopularBookCardSkeleton } from "@/components/popular-book-card-skeleton";

export function BooksSkeleton() {
  return (
    <div className="flex-1 flex flex-col mt-14">
      <div className="w-full grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
        <div className="h-[200px]">
          <PopularBookCardSkeleton />
        </div>

        <div className="h-[200px]">
          <PopularBookCardSkeleton />
        </div>

        <div className="h-[200px]">
          <PopularBookCardSkeleton />
        </div>

        <div className="h-[200px]">
          <PopularBookCardSkeleton />
        </div>

        <div className="h-[200px]">
          <PopularBookCardSkeleton />
        </div>

        <div className="h-[200px]">
          <PopularBookCardSkeleton />
        </div>
      </div>
    </div>
  )
}