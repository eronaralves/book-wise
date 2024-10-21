'use client'

import { Binoculars } from "@phosphor-icons/react";

export function TitleSection() {
  return (
    <div className="flex items-center gap-3">
      <Binoculars size={32} className="text-green-100" />
      <h1 className="text-lg font-bold hidden sm:block">Explorar</h1>
    </div>
  )
}