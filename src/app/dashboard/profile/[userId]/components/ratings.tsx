'use client'

import { useQuery } from "@tanstack/react-query";

// Icons
import { Loader2, Search } from "lucide-react";

// Components
import { Input } from "@/components/input";
import { RatingUserCard } from "./rating-user-card";

// Api
import { getRatingPerUser } from "@/http/get-ratings-per-user";
import { useState, type FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IRatings {
  bookSearch: string;
  userId: string;
}

export function Ratings({ bookSearch, userId }: IRatings) {
  const [searchBook, setSearchBook] = useState('')

  const navigate = useRouter()
  const searchparams = useSearchParams()
  const pathname = usePathname()

  const { data: ratings, isLoading } = useQuery({
    queryKey: ['ratings-per-user', userId, bookSearch],
    queryFn: async () => await getRatingPerUser(userId, bookSearch)
  })

  function handleFilter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const searchParams = new URLSearchParams(searchparams.toString());

    if (searchBook !== '') {
      searchParams.set('bookSearch', searchBook);
    } else {
      searchParams.delete('bookSearch');
    }

    const newUrl = `${pathname}?${searchParams.toString()}`;
    navigate.push(newUrl);
  }

  return (
    <div className="w-full h-full flex flex-col max-w-[624px]">
      <form onSubmit={(e) => handleFilter(e)} className="w-full h-full flex flex-col flex-1">
        <Input>
          <Input.Field placeholder="Buscar livro avaliado" value={searchBook} onChange={(e) => setSearchBook(e.target.value)} />
          <Input.IconRight >
            <button type="submit">
              <Search size={20} className="text-gray-500" />
            </button>
          </Input.IconRight>
        </Input>

        <div className="w-full h-full flex flex-col gap-6 mt-8">
          {ratings?.map(rating => (
            <RatingUserCard key={rating.id} rating={rating} />
          ))}

          {isLoading && (
            <div className="h-full flex-1 flex justify-center items-center">
              <Loader2 className="animate-spin" />
            </div>
          )}

          {ratings?.length === 0 && (
            <div className="h-full flex-1 flex justify-center items-center">
              <span className="text-base">Nenhuma avaição encontrada :/</span>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}