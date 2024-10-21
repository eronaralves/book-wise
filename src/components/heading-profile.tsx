import Image from 'next/image';
import Link from 'next/link';

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { RatingStars } from './rating-stars';

interface HeadingProfile {
  user: {
    id: string;
    name: string;
    image: string;
  }
  created_at: string;
  rate: number;
}

export function HeadingProfile({ user, created_at, rate }: HeadingProfile) {

  return (
    <div className="w-full">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <Link href={`/dashboard/profile/${user.id}`} className="flex gap-4 cursor-pointer">
          <div className="h-11 w-11 flex items-center justify-center bg-gradient-horizontal rounded-full">
            <Image src={user.image} alt="Imagem de perfil" width={96} height={96} className="w-[95%] h-[95%] bg-slate-200 rounded-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold">{user.name}</span>
            <span className="text-gray-400 text-sm">{formatDistanceToNow(new Date(created_at), {
              locale: ptBR,
              addSuffix: true
            })}</span>
          </div>
        </Link>

        <RatingStars 
          color_filled="#8381D9"
          size={25}
          value={rate}
        />
      </div>
    </div>
  )
}