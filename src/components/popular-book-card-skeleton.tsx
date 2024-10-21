import { Skeleton } from "./ui/skeleton";

export function PopularBookCardSkeleton() {
  return (
    <div className="relative w-full h-full px-6 py-5 bg-gray-700 rounded-xl flex gap-6 border-2 border-transparent">
      <div className="min-w-[95px] h-full">
        <Skeleton className="w-full h-full"  />
      </div>

      <div className="h-full flex flex-col gap-2 justify-between">
        <Skeleton className="w-28 h-5"  />
        <Skeleton className="w-20 h-4"  />
        
        <Skeleton className="w-36 h-5 mt-auto"  />
      </div>
    </div>
  )
}