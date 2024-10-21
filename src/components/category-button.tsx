'use client'

import { useRouter, useSearchParams } from "next/navigation";

interface ICategoryButton {
  category: {
    name: string;
    slug: string;
  },
}

export function CategoryButton({ category }: ICategoryButton) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const categorySearch = searchParams.get('category') ?? 'all'

  function setSearchParams () {
    const searchParams = new URLSearchParams(window.location.search);
    
    searchParams.set('category', category.slug);

    router.push(`${window.location.pathname}?${searchParams.toString()}`);
  };

  return (
    <button tabIndex={0} onClick={setSearchParams} className={`cursor-pointer inline px-4 p-1 border rounded-full  ${categorySearch === category.slug ? 'bg-purple-200 text-gray-100 border-purple-200' : 'border-purple-100 text-purple-100'}`}>
      {category.name}
    </button>
  )
}