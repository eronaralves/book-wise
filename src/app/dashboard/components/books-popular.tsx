'use client'

// Components
import { PopularBookCard } from "@/components/popular-book-card";

// Api
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getPopularBooks } from "@/http/get-popular-books";
import { useQuery } from "@tanstack/react-query";
import { PopularBookCardSkeleton } from "@/components/popular-book-card-skeleton";

export function BooksPopular() {
  const { data: popularBooks, isFetching } = useQuery({
    queryKey: ['popular-books'],
    queryFn: getPopularBooks
  }) 

  return (
    <div className="w-full max-w-[350px] hidden lg:flex flex-col justify-start">
      <div className="w-full flex items-center justify-between mb-4">
        <h3 className="text-sm">Livros populares</h3>

        {!isFetching ? (
          <Button variant="ghost" asChild className="flex items-center h-10 gap-3 text-purple-100 text-sm font-bold duration-300 hover:text-purple-50 cursor-pointer rounded-xl">
            <Link href="/dashboard/explore">
              Ver mais
              <ChevronRight size={18} />
            </Link>
          </Button>
        ): (
          <div className="h-10 flex items-center mr-5">
            <Skeleton className="w-20 h-4" />
          </div>
        )}

      </div>
        
        {!isFetching ? (
          <div className="w-full flex flex-col gap-4">
            {popularBooks?.map(popularBook => (
              <div key={popularBook.id} className="min-w-[300px] h-[150px]">
                <PopularBookCard book={popularBook} />
              </div>
            ))}
          </div>
        ) : (
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
        )}
    </div>
  )
}