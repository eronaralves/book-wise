'use client'

import { useQuery } from "@tanstack/react-query";

// Components
import { BooksSkeleton } from "./books-skeleton";
import { PopularBookCard } from "@/components/popular-book-card";

// Api
import { getBooks } from "@/http/get-books";

interface IBooks {
  category: string;
  search: string;
}

export function Books({ category, search }: IBooks) {
  const { data: books, isLoading, isFetching } = useQuery({
    queryKey: ['books', category ? category : undefined, search === "undefined" ? '' : search],
    queryFn: async () => await getBooks(category, search)
  })

  if(!books && !isFetching) {
    return null
  }

  return (
    <div className="h-full flex flex-col">
      {!isLoading ? (
        <div className="flex flex-col mt-14">
          <div className="w-full grid md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
            {books?.map(book => (
              <div key={book.id} className="min-h-[180px]">
                <PopularBookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      ): (
        <BooksSkeleton />
      )}

      {books?.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-base text-gray-200">Nenhum livro encontrado :/</span>
        </div>
      )}
    </div>
  )
}