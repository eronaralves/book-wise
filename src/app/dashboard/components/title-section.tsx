'use client'

import { ChartLine } from "lucide-react";

export function TitleSection() {
  return (
    <div className="flex items-center gap-3">
      <ChartLine size={32} className="text-green-100" />
      <h1 className="text-lg font-bold">Início</h1>
    </div>
  )
}