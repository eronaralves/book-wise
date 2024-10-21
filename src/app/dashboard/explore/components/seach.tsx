'use client'

import { Input } from "@/components/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";


export function SearchInput() {
  const [search, setSearchParams] = useState<string | null>(null) 

  const navigate = useRouter()

  function onChangeSearch(search: string) {
    setSearchParams(search)
  }

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const url = new URL(window.location.href);

    if(search !== null && search !== '') {
      url.searchParams.set('search', search);
    } else {
      url.searchParams.delete('search');
    }
    
    navigate.push(String(url))
  }

  return (
    <form onSubmit={(e) => handleSearch(e)} className="w-full max-w-[435px]">
      <Input>
        <Input.Field placeholder="Buscar livro ou autor" onChange={(e) => onChangeSearch(e.target.value)} />
        <Input.IconRight>
          <Search size={20} className="text-gray-500" />
        </Input.IconRight>
      </Input>
    </form>
  )
}