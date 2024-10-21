'use client'

import Image from "next/image";
import { useRouter } from 'next/navigation';

// Components
import { RatingStars } from "./rating-stars";


interface PopularBookCard {
  book: {
    author: string;
    id: string;
    name: string;
    average_rate: number;
    cover_url: string;
    total_pages: number;
    has_read: boolean;
    _count: {
      ratings: number;
    },
    categories: {
      category: {
        name: string
      }
    }[]
  }
}

export function PopularBookCard({ book }: PopularBookCard) {
  const navigate = useRouter()

  function openDetailsBook() {
    const url = new URL(window.location.href);
    url.searchParams.set('bookId', book.id);

    navigate.push(String(url))
  }

  return (
    <button onClick={() => openDetailsBook()} className="relative w-full h-full px-6 py-5 bg-gray-700 rounded-xl flex flex-wrap gap-6 cursor-pointer border-2 border-transparent hover:border-gray-600">
      <Image src={`/${book.cover_url}`} priority alt={`capa do livro ${book.name}`} width={98} height={142} className="sm:h-full w-auto object-cover" />

      <div className={`sm:flex-1 w-full h-full flex sm:flex-nowrap flex-col gap-2 sm:gap-0 items-start text-left`}>
        <h2 className='font-bold text-sm sm:text-base line-clamp-2'>{book.name}</h2>
        <span className='text-gray-400 text-xs sm:text-sm'>{book.author}</span>

        <div className="sm:mt-auto">
          <RatingStars 
            color_filled="#8381D9"
            size={25}
            value={book.average_rate}
          />
        </div>
      </div>

      {book.has_read && <span className="absolute right-0 top-0 bg-green-300 text-green-100 text-xs font-bold px-3 p-1">LIDO</span>}
    </button>
  )
}