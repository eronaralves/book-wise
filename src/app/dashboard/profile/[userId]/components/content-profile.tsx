'use client'

import { useState } from "react";

// Components
import { DetailsProfile } from "./details-profile";
import { Ratings } from "./ratings";
import { ButtonBack } from "./button-back";
import { Bookmark, User } from "lucide-react";


interface IContentProfile {
  userId: string;
  bookSearch: string;
}

export function ContentProfile({ bookSearch, userId }: IContentProfile) {
  const [openDetailsUser, setOpenDetailsUser] = useState(false)
  
  return (
    <div className="w-full h-full flex flex-col max-w-[1060px] mx-auto mt-14">
      <div className="flex justify-between items-center mb-6 sm:mb-14">
        <ButtonBack />
        <div onClick={() => setOpenDetailsUser(!openDetailsUser)} className="flex items-center justify-center p-2 rounded-full lg:hidden bg-gray-700">
          {openDetailsUser ? (
            <Bookmark/>
          ) : (
            <User size={25} className="text-gray-100" />
          )}
        </div>
      </div>
      <div className="w-full flex gap-20 pb-10">
        <div className={`w-full lg:block ${openDetailsUser ? 'hidden' : 'block'}`}>
          <Ratings userId={userId} bookSearch={bookSearch} />
        </div>

        <div className={`w-full lg:block ${openDetailsUser ? 'block' : 'hidden'}`}>
          <DetailsProfile userId={userId} />
        </div>
      </div>
    </div>
  )
}