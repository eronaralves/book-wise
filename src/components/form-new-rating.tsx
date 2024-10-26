'use client'

import Image from "next/image";
import { toast } from "sonner";
import { useMutation, useQueryClient, type InvalidateQueryFilters } from "@tanstack/react-query";

import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Components
import { RatingStars } from "./rating-stars";
import { Textarea } from "./ui/textarea";

// Icons
import { X, Check } from "lucide-react"

// Hooks
import { useContextSession } from "@/hooks/useContextSession";

// Api
import { createRatings } from "@/http/create-ratings";

export const formSchema = z.object({
  description: z.string().min(1, {
    message: 'Preencha a descrição da avaliação'
  }),
  rate: z.number({
    message: 'Dê uma nota'
  })
}) 

type FormNewRating = z.infer<typeof formSchema>

interface IFormNewRating {
  onClose: () => void;
  bookId: string;
}

export function FormNewRating({ onClose, bookId }: IFormNewRating) {
  
  const queryClient = useQueryClient()
  const { session } = useContextSession()
  const user = session?.user
  
  const { control, register, handleSubmit, formState: { errors } } = useForm<FormNewRating>({
    resolver: zodResolver(formSchema),
  })

  const { mutateAsync } = useMutation({
    mutationFn: createRatings,
    onSuccess: async () => {
      queryClient.invalidateQueries(["get-book", bookId] as InvalidateQueryFilters);
      queryClient.invalidateQueries(["recent-ratings"] as InvalidateQueryFilters);
    }
  })

  function onSubmit(data: FormNewRating) {
    const { description, rate } = data

    if(user) {
      try {
        mutateAsync({
          description,
          rate,
          bookId,
          userId: user?.id
        });

        onClose(); 
        toast.success('Avaliação feita com sucesso!')
      } catch (error) {
        console.error("Erro ao criar avaliação:", error);
        toast.error('Erro ao criar avaliação com sucesso!')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full px-6 py-5 bg-gray-700">
      <div className="w-full flex flex-wrap gap-3 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 flex items-center justify-center bg-gradient-horizontal rounded-full">
            {user?.image && <Image src={user.image} alt="Imagem de perfil" width={96} height={96} className="w-[95%] h-[95%] bg-slate-200 rounded-full object-cover" />}
          </div>
          <span className=" text-gray-100 text-base font-bold">{user?.name}</span>
        </div>

        <Controller 
          control={control}
          name="rate"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <RatingStars 
                color_filled="#8381D9"
                size={30}
                value={field.value}
                edit={true}
                onChange={field.onChange}
              />
              {errors.rate && <span className="text-red-500 text-sm">{errors.rate.message}</span>}
            </div>
          )}
        />
        
      </div>

      <div className="relative flex flex-col gap-2">
        <Textarea maxLength={450} placeholder="Escreva sua avaliação" className="focus-visible:ring-green-200 mt-6 pb-6 overflow-hidden md:min-h-[195px]" {...register('description')} />
        {/* <span className="absolute hidden md:flex right-4 bottom-2 text-sm text-[#7C7C8A]">{description.length}/450</span> */}
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
      </div>

      <div className="w-full flex justify-end gap-3 mt-2">
        <button onClick={onClose} className="flex items-center justify-center rounded p-2 bg-gray-600">
          <X size={25} className="text-purple-100" />
        </button>
        <button type="submit" className="flex items-center justify-center rounded p-2 bg-gray-600">
          <Check size={25} className="text-green-100" />
        </button>
      </div>
    </form>
  )
}