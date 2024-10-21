'use client'

import Image from "next/image";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { RatingStars } from "@/components/rating-stars";
import { useRouter } from "next/navigation";

interface RatingUser {
  created_at: string,
  description: string,
  rate: number,
  id: string;
  book: {
    id: string;
    author: string,
    name: string,
    cover_url: string
  }
}

interface IRatingUserCard {
  rating: RatingUser
}

export function RatingUserCard({ rating }: IRatingUserCard) {
  const navigate = useRouter()

  function openDetailsBook() {
    const url = new URL(window.location.href);
    url.searchParams.set('bookId', rating.book.id);

    navigate.push(String(url))
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-gray-300 text-sm">
        {formatDistanceToNow(new Date(rating.created_at), {
          addSuffix: true,
          locale: ptBR,
        })}
      </span>

      <div className="w-full p-6 bg-gray-700 rounded-xl flex flex-col gap-6">
        <div className="flex flex-wrap gap-6">
          <Image onClick={() => openDetailsBook()} src={`/${rating.book.cover_url}`} alt='' width={130} height={168} className='max-h-[168px] cursor-pointer' />
          <div className="flex-1 flex flex-col gap-2">
            <h2 className='font-bold text-base'>{rating.book.name}</h2>
            <span className='text-gray-400 text-sm'>{rating.book.author}</span>

            <div className="mt-auto">
              <RatingStars
                color_filled="#8381D9"
                size={25}
                value={rating.rate}
              />
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm">
          {rating.description}
        </p>
      </div>
    </div>
  )
}