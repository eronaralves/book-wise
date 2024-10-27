'use client'

import { useQuery } from "@tanstack/react-query";

// Components
import { RatingsCard } from "@/components/ratings-card";
import { RatingCardSkeleton } from "@/components/rating-card-skeleton";

// Api
import { getRecentsRatings } from "@/http/get-recents-ratings";

export function RatingsRecent() {
  const { data: ratings, isFetching } = useQuery({
    queryKey: ['recent-ratings'],
    queryFn: getRecentsRatings,
    staleTime: 5000
  }) 

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col flex-1 w-full">
        <h3 className="text-sm mb-4">Avaliações mais recentes</h3>
       
        {!isFetching ? (
          <div className="w-full flex flex-col gap-4">
            {ratings?.map(rating => (
              <RatingsCard key={rating.id} rating={rating} />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4">
            <RatingCardSkeleton />
            <RatingCardSkeleton />
          </div>
        )}  

        {!isFetching && ratings?.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <span>Nenhuma avaliação criada!</span>
          </div>
        )}
      </div>
    </div>
  );
}
