import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark, BookOpen, LibraryBig, UsersRound } from "lucide-react";


export function DetailsProfileSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center mb-10">
        <Skeleton className="h-[72px] w-[72px] rounded-full" />
        <Skeleton className="h-5 w-36 mt-6" />
        <Skeleton className="h-3 w-32 mt-2" />
      </div>
      <Separator className="w-8 h-1 rounded-full bg-gradient-horizontal" />
      <div className="mt-12 w-full flex flex-col gap-10">
        <div className="w-full max-w-[200px] mx-auto flex items-end gap-4">
          <BookOpen size={32} className="text-green-100" />
          <div className="flex flex-col">
            <Skeleton className="h-4 w-11" />
            <Skeleton className="h-3 w-20 mt-2" />
          </div>
        </div>

        <div className="w-full max-w-[200px] mx-auto flex items-end gap-4">
          <LibraryBig size={32} className="text-green-100" />
          <div className="flex flex-col">
            <Skeleton className="h-4 w-11" />
            <Skeleton className="h-3 w-20 mt-2" />
          </div>
        </div>

        <div className="w-full max-w-[200px] mx-auto flex items-end gap-4">
          <UsersRound size={32} className="text-green-100" />
          <div className="flex flex-col">
            <Skeleton className="h-4 w-11" />
            <Skeleton className="h-3 w-20 mt-2" />
          </div>
        </div>

        <div className="w-full max-w-[200px] mx-auto flex items-end gap-4">
          <Bookmark size={32} className="text-green-100" />
          <div className="flex flex-col">
            <Skeleton className="h-4 w-11" />
            <Skeleton className="h-3 w-20 mt-2" />
          </div>
        </div>
      </div>
    </div>
  )
}