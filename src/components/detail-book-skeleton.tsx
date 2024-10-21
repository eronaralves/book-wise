import { Bookmark, BookOpen } from "lucide-react";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";


export function DetailsBookSkeleton() {
  return (
    <div className="w-full mt-14 px-6 pt-5 pb-8 bg-gray-700 rounded-xl">
      <div className="flex flex-wrap gap-6">
        <Skeleton className="w-full max-w-[172px] h-[242px]" />
       
        <div className="flex-1 flex flex-col">
          <Skeleton className="w-52 h-6" />
          <Skeleton className="w-24 h-4 mt-3" />

          <Skeleton className="w-40 h-7 mt-auto" />
        </div>
      </div>

      <Separator className="w-full bg-gray-600 mt-10 mb-8" />

      <div className="flex flex-wrap items-center gap-14">
        <div className="flex items-center gap-4">
          <Bookmark size={24} className="text-green-100" />
          <div className="flex flex-col">
            <span className="text-gray-300 text-sm">Categoria</span>
            <Skeleton className="w-24 h-4 mt-3" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <BookOpen size={24} className="text-green-100" />
          <div className="flex flex-col">
            <span className="text-gray-300 text-sm">Páginas</span>
            <Skeleton className="w-24 h-4 mt-3" />
          </div>
        </div>
      </div>
    </div>
  )
}