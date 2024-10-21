import { Skeleton } from "@/components/ui/skeleton";

export function CategorysSkeleton() {

  return (
    <div className="w-full flex items-center gap-4 mt-14 overflow-auto scrollbar-thin pb-3">
      <Skeleton className="w-32 md:w-16 h-8 px-4 p-1 rounded-full" />
      <Skeleton className="w-32 md:w-16 h-8 px-4 p-1 rounded-full" />
      <Skeleton className="w-32 md:w-16 h-8 px-4 p-1 rounded-full" />
      <Skeleton className="w-32 md:w-16 h-8 px-4 p-1 rounded-full" />
      <Skeleton className="w-32 md:w-16 h-8 px-4 p-1 rounded-full" />
      <Skeleton className="w-32 md:w-16 h-8 px-4 p-1 rounded-full" />
      <Skeleton className="w-32 md:w-16 h-8 px-4 p-1 rounded-full" />
      <Skeleton className="w-32 md:w-16 h-8 px-4 p-1 rounded-full" />
      <Skeleton className="w-32 md:w-16 h-8 px-4 p-1 rounded-full" />
      <Skeleton className="w-32 md:w-16 h-8 px-4 p-1 rounded-full" />
    </div>
  )
}