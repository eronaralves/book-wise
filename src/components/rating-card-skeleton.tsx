
// Components
import { HeadingProfileSkeleton } from "./heading-profile-skeleton";
import { Skeleton } from "./ui/skeleton";

interface IRatingCardSkeleton {
  hasInfoBook?: boolean
}

export function RatingCardSkeleton({ hasInfoBook = true }: IRatingCardSkeleton) {
  return (
    <div className="w-full p-6 rounded-xl flex flex-col gap-10 bg-gray-700 ">
      <HeadingProfileSkeleton />
      <div className='flex flex-col sm:flex-row gap-5'>
        {hasInfoBook && <Skeleton className="h-[150px] w-[130px] sm:h-[168px] sm:w-full sm:max-w-[130px]" />}
        <div className='flex-1 flex flex-col'>
          {hasInfoBook && (
            <>
              <Skeleton className="w-36 h-5" />
              <Skeleton className="w-24 h-4 mt-2" />
            </>
          )}

          <div className="mt-5 flex flex-col gap-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-[50%] h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}