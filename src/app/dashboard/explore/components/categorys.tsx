'use client'
import { useQuery } from "@tanstack/react-query";

// Components
import { CategoryButton } from "@/components/category-button";
import { CategorysSkeleton } from "./category-skeleton";

// Api
import { getCategorys } from "@/http/get-categorys";


export function Categorys() {
  const { data: categorys } = useQuery({
    queryKey: ['categorys'],
    queryFn: getCategorys
  })

  return (
    <div>
      {categorys ? (
        <div className="flex gap-4 mt-14 overflow-auto scrollbar-thin pb-3">
          <CategoryButton 
            category={{
              name: 'Tudo',
              slug: 'all'
            }}
          />
          {categorys.map(category => (
            <CategoryButton key={category.id} category={category} />
          ))}
        </div>
      ): (
        <CategorysSkeleton />
      )}
    </div>
  )
}