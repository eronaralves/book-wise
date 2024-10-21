'use client'

import type { ReactNode } from "react";
import { Button, ButtonProps } from "./ui/button";

interface IButtonSignIn extends ButtonProps {
  title: string;
  children: ReactNode
}

export function ButtonSignIn({ title, children, ...rest }: IButtonSignIn) {
  return (
    <Button className="w-full h-auto flex items-center justify-start gap-4 bg-gray-600 px-5 py-4 rounded-md cursor-pointer transition-all duration-300 hover:bg-gray-500" {...rest}>
      {children}
      <span className="text-gray-200 font-bold text-base">{title}</span>
    </Button>
  )
}