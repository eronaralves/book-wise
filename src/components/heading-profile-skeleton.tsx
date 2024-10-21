import { Skeleton } from "./ui/skeleton";

export function HeadingProfileSkeleton() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex gap-4">
          <Skeleton className="w-11 h-11 rounded-full" />

          <div className="flex flex-col gap-2">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-14 h-3" />
          </div>
        </div> 

        <Skeleton className="h-5 w-40" />
      </div>
    </div>
  )
}