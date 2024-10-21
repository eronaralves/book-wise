'use client'

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function       ButtonBack() {
  const navigate = useRouter()

  return (
    <Button onClick={() => navigate.back()} variant="ghost" className="flex items-center h-10 gap-3 px-2 text-base font-bold duration-300 text-gray-200 cursor-pointer rounded-xl" >
      <ChevronLeft className="-mt-1" />
      Voltar
    </Button>
  )
}