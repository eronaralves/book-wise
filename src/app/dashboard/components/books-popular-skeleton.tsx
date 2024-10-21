import { PopularBookCardSkeleton } from "@/components/popular-book-card-skeleton";

export function BooksPopularSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="min-w-[300px] h-[150px]">
        <PopularBookCardSkeleton />
      </div>
      <div className="min-w-[300px] h-[150px]">
        <PopularBookCardSkeleton />
      </div>
      <div className="min-w-[300px] h-[150px]">
        <PopularBookCardSkeleton />
      </div>
    </div>
  )
}