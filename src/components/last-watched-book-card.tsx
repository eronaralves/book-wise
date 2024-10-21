'use client'

import Image from "next/image";

// Components
import { RatingStars } from "./rating-stars";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface IMostRecentBookRatingCard {
  created_at: string;
  book: {
    id: string,
    name: string,
    author: string,
    summary: string,
    average_rate: number,
    cover_url: string,
    created_at: string
  }
}

export function MostRecentBookRatingCard({ book, created_at }: IMostRecentBookRatingCard) {
  return (
    <div className="w-full p-6 bg-gray-600 rounded-xl flex gap-8 cursor-pointer border-2 hover:border-gray-500">
      <Image src={`/${book.cover_url}`} alt='' width={130} height={168} className='max-h-[168px]' />
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-full flex justify-between flex-wrap gap-2">
          <span className="text-gray-300 text-sm">
            {formatDistanceToNow(new Date(created_at), {
              addSuffix: true,
              locale: ptBR,
            })}
          </span>

          <div className="mt-2">
            <RatingStars
              count={5}
              value={book.average_rate}
              size={25}
              color_filled="#8381D9"
              edit={false}
            />
          </div>
        </div>

        <h2 className='font-bold text-base mt-2'>{book.name}</h2>
        <span className='text-gray-400 text-sm mt-1'>{book.author}</span>

        <p className="line-clamp-2 mt-auto text-gray-300 text-sm">
          {book.summary}
        </p>
      </div>
    </div>
  )
}