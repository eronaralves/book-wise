'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

// Components
import { HeadingProfile } from './heading-profile';
import { useRouter } from 'next/navigation';

export interface Rating {
  book?: {
    id: string
    author: string;
    name: string;
    cover_url: string;
  }
  created_at: string;
  description: string;
  rate: number;
  id: string;
  user: {
    id: string;
    name: string;
    image: string;
  }
}

interface IEvaluationCard {
  rating: Rating
}

export function RatingsCard({ rating }: IEvaluationCard) {
  const [isExpandText, setIsExpandText] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  const navigate = useRouter()
  
  const textRef = useRef<HTMLParagraphElement | null>(null);

  function checkTextOverflow() {
    setIsExpandText(false)
    if (textRef.current) {
      setShowToggle(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }

  function openDetailsBook() {

    if(rating.book) {
      const url = new URL(window.location.href);
      url.searchParams.set('bookId', rating.book.id);
  
      navigate.push(String(url))
    }
  }

  useEffect(() => {
    checkTextOverflow();

    window.addEventListener('resize', checkTextOverflow);
    
    return () => {
      window.removeEventListener('resize', checkTextOverflow);
    };
  }, [textRef]);

  return (
    <div className={`w-full p-6 bg-gray-700 rounded-xl flex flex-col ${rating.book ? 'gap-10' : 'gap-6'}`}>
      <HeadingProfile
        user={rating.user}
        rate={rating.rate}
        created_at={rating.created_at}
      />
      
      <div className='w-full flex flex-col sm:flex-row gap-5 overflow-hidden'>
        {rating.book && <Image src={`/${rating.book.cover_url}`} alt={rating.book.name} width={130} height={168} onClick={() => openDetailsBook()} className="h-auto w-[150px] sm:h-[168px] sm:w-full sm:max-w-[130px] object-cover cursor-pointer" />}
        <div className='flex-1'>
          {rating.book && (
            <>
              <h2 className='font-bold text-base'>{rating.book.name}</h2>
              <span className='text-gray-400 text-sm'>{rating.book.author}</span>
            </>
          )}

          <p ref={textRef} className={`whitespace-pre-line break-all transition-all mt-5 ${isExpandText ? 'line-clamp-none' : 'line-clamp-4'}`}>
            {rating.description}
          </p>

          {showToggle && (
            <button 
              onClick={() => setIsExpandText(!isExpandText)} 
              className='text-purple-100 font-bold'
            >
              {isExpandText ? 'ver menos' : 'ver mais'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
