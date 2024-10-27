'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getYear } from "date-fns";

// Icons
import { Bookmark, BookOpen, LibraryBig, UsersRound } from "lucide-react";

// Components
import { Separator } from "@/components/ui/separator";

// Api
import { getUser } from "@/http/get-user";
import { DetailsProfileSkeleton } from "./details-profile-skeleton";

interface DetailsProfile {
  userId: string
}

export function DetailsProfile({ userId }: DetailsProfile) {
  const { data: user, isFetched, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: async () => await getUser(userId ?? undefined),
    enabled: !!userId
  })

  const navigate = useRouter()

  if(!user && isFetched && !isFetching) {
    navigate.push('/dashboard')
    return null
  }

  return (
    <div className="w-full max-w-[350px] mx-auto lg:border-l-2 border-gray-700 py-2 px-10">
      {!isFetching ? (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-10">
            <div className="h-[72px] w-[72px] flex items-center justify-center bg-gradient-horizontal rounded-full">
              {user?.image && <Image src={user.image} alt="Foto de perfil" width={72} height={72} className="w-[95%] h-[95%] bg-slate-200 rounded-full" />}
            </div>
            <h2 className="text-xl font-bold mt-6">{user?.name}</h2>
            <span className="text-gray-400 text-sm">
              membro desde {getYear(String(user?.created_at))}
            </span>
          </div>
          <Separator className="w-8 h-1 rounded-full bg-gradient-horizontal" />
          <div className="mt-12 w-full flex flex-col gap-10">
            <div className="w-full max-w-[200px] mx-auto flex items-end gap-4">
              <BookOpen size={32} className="text-green-100" />
              <div className="flex flex-col">
                <span className="font-bold text-base">{user?._count?.ratings}</span>
                <span className="text-gray-300 text-sm">Totais de avaliações</span>
              </div>
            </div>

            <div className="w-full max-w-[200px] mx-auto flex items-end gap-4">
              <LibraryBig size={32} className="text-green-100" />
              <div className="flex flex-col">
                <span className="font-bold text-base">{user?.booksEvaluated}</span>
                <span className="text-gray-300 text-sm">Livros avaliados</span>
              </div>
            </div>

            <div className="w-full max-w-[200px] mx-auto flex items-end gap-4">
              <UsersRound size={32} className="text-green-100" />
              <div className="flex flex-col">
                <span className="font-bold text-base">{user?.authorsRead}</span>
                <span className="text-gray-300 text-sm">Autores lidos</span>
              </div>
            </div>

            {user?.mostReadCategory && (
              <div className="w-full max-w-[200px] mx-auto flex items-end gap-4">
                <Bookmark size={32} className="text-green-100" />
                <div className="flex flex-col">
                  <span className="font-bold text-base">{user?.mostReadCategory}</span>
                  <span className="text-gray-300 text-sm">Categoria mais lida</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <DetailsProfileSkeleton />
      )}
    </div>
  )
}