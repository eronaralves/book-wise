'use client'

import { getMostRecentBookRating } from "@/http/get-most-recent-book-rating";
import { MostRecentBookRatingCard } from "@/components/last-watched-book-card";
import { Button } from "@/components/ui/button";
import { useContextSession } from "@/hooks/useContextSession";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Link from "next/link";


export function LastReatingBook() {
  const { session } = useContextSession()

  const { data: lastReatingBook } = useQuery({
    queryKey: ['get-most-recent-book'],
    queryFn: async () => await getMostRecentBookRating(session?.user.id ?? ''),
    enabled: !!session?.user
  })

  if(!lastReatingBook) {
    return null
  }

  return (
    <div className="w-full flex flex-col justify-start">
      <div className="w-full flex items-center justify-between mb-4">
     
        <h3 className="text-sm">Seu último livro lido</h3>

        <Button asChild variant="ghost" className="flex items-center h-10 gap-3 text-purple-100 text-sm font-bold duration-300 hover:text-purple-50 cursor-pointer rounded-xl">
          <Link href={`/dashboard/profile/${session?.user.id}`}>
            Ver mais
            <ChevronRight size={18} />
          </Link>
        </Button>
      </div>

      <div className="w-full flex flex-col gap-4">
        <MostRecentBookRatingCard created_at={lastReatingBook.created_at} book={lastReatingBook.book} />
      </div>
    </div>
  )
}