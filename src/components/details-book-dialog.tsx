'use client'

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

// Icons
import { Bookmark, BookOpen, X } from "lucide-react";

// Components
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { RatingStars } from "./rating-stars";
import { RatingsCard } from "./ratings-card";
import { getBook } from "@/http/get-book";
import { FormNewRating } from "./form-new-rating";
import { RatingCardSkeleton } from "./rating-card-skeleton";

// Hooks
import { useContextSession } from "@/hooks/useContextSession";
import { DetailsBookSkeleton } from "./detail-book-skeleton";

interface DetailsBookDialog {
  searchParamsBookId: string
}

export function DetailsBookDialog({ searchParamsBookId }: DetailsBookDialog) {  
  const [isNewRating, setIsNewRating] = useState(false)
  const { session, setModalSignInOpen } = useContextSession()
  const navigate = useRouter()

  const { data: bookDetails, isLoading, isFetching } = useQuery({
    queryKey: ['get-book', searchParamsBookId],
    queryFn: async () => await getBook(searchParamsBookId),
    enabled: !!searchParamsBookId
  })

  function handleNewRating() {
    if(!session) {
      return setModalSignInOpen(true)
    }

    setIsNewRating(true)
  }

  if(!bookDetails && !isFetching) {
    const url = new URL(window.location.href);
    url.searchParams.delete('bookId');

    navigate.push(url.toString())
    return null
  }

  return (
    <div className="flex flex-col px-6 sm:px-10 mt-14 z-50 w-full max-w-[660px] h-full bg-gray-800">
      
      {!isLoading ? (
        <div className="w-full px-6 pt-5 pb-8 bg-gray-700 rounded-xl">
          <div className="flex flex-wrap gap-6">
            <Image src={`/${bookDetails?.cover_url}`} alt="" width={172} height={242} className="h-auto object-cover" />

            <div className="flex-1 flex flex-col">
              <h2 className='font-bold text-lg line-clamp-2'>{bookDetails?.name}</h2>
              <span className='text-gray-300 text-base mt-2'>{bookDetails?.author}</span>

              <div className="mt-auto">
                <RatingStars 
                  color_filled="#8381D9"
                  size={25}
                  value={bookDetails?.average_rate ?? 0}
                />
              </div>

              <span className="text-gray-400 text-sm">{bookDetails?._count?.ratings} avaliações</span>
            </div>
          </div>

          <Separator className="w-full bg-gray-600 mt-10 mb-8" />

          <div className="flex flex-wrap items-center gap-14">
            <div className="flex items-center gap-4">
              <Bookmark size={24} className="text-green-100" />
              <div className="flex flex-col">
                <span className="text-gray-300 text-sm">Categoria</span>
                <span className="font-bold text-base">
                  {bookDetails?.categories?.map(category => category.category.name).join(', ')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <BookOpen size={24} className="text-green-100" />
              <div className="flex flex-col">
                <span className="text-gray-300 text-sm">Páginas</span>
                <span className="font-bold text-base">{bookDetails?.total_pages}</span>
              </div>
            </div>
          </div>
        </div>
      ): (
        <DetailsBookSkeleton />
      )}
      
      <div className="w-full h-full mt-10 flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
          <span>Avaliações</span>

          {!isLoading ? (
            <Button variant="ghost" onClick={() => handleNewRating()} className="text-purple-100 text-base duration-300 hover:text-gray-100 rounded-xl" >
              Avaliar
            </Button>
          ): (
            <Skeleton className="w-20 h-6" />
          )}
        </div>

        <div className="flex flex-col gap-8 flex-1">
          {isNewRating && (
            <FormNewRating bookId={bookDetails?.id ?? ''} onClose={() => setIsNewRating(false)} />
          )}

          {!isLoading ? 
            bookDetails?.ratings?.map(rating => (
              <RatingsCard key={rating.id} rating={rating} />
            )
          ) : (
            <RatingCardSkeleton hasInfoBook={false} />
          )}

          {!isLoading && bookDetails?.ratings.length === 0 && (
            <div className="h-full flex-1 flex items-center justify-center">
              <span className="text-base text-gray-200">Nenhuma avaliação feita!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}