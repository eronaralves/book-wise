'use client'

import { useRouter, useSearchParams } from "next/navigation";

// Components
import { DetailsBookDialog } from "@/components/details-book-dialog";
import { Sidebar } from "@/components/sidebar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ContextProvider } from "@/context/session";

export default function LayoutDasboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const searchParams = useSearchParams()
  const searchParamsBookId = searchParams.get('bookId')
  const navigate = useRouter()
  
  function onCloseModal() {
    const url = new URL(window.location.href);
    if(searchParamsBookId) {
      url.searchParams.delete('bookId');
      
    }
    navigate.push(String(url))
  }

  return (
    <div className="h-full w-full flex p-4">
      <ContextProvider>
        <Sidebar />
        {children}

        <Dialog open={Boolean(searchParamsBookId)} onOpenChange={() => onCloseModal()} >
          <DialogContent className="px-10 overflow-auto left-auto fixed right-0 top-0 translate-x-[-0%] translate-y-[-0%] p-1 sm:p-6 z-50 w-full max-w-[660px] h-full bg-gray-800">
            <DetailsBookDialog searchParamsBookId={String(searchParamsBookId)} />
          </DialogContent>
        </Dialog>
      </ContextProvider>
    </div>
  )
} 