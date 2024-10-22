'use client'

import { signIn, useSession } from "next-auth/react";
import { createContext, useState, type ReactNode } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";

// Components
import { ButtonSignIn } from "@/components/button-sign-in";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Session } from "next-auth";

interface ContextSessionProps {
  setModalSignInOpen: (isOpen: boolean) => void;
  session: Session | null;
}

export const ContextSession = createContext({} as ContextSessionProps)

interface ContextProviderProps {
  children: ReactNode
}

export function ContextProvider({ children }: ContextProviderProps) {
  const [modalSignInOpen, setModalSignInOpen] = useState(false)
  const { data } = useSession()
  
  return (
    <ContextSession.Provider value={{ setModalSignInOpen, session: data }}>
      {children}

      <Dialog open={modalSignInOpen} onOpenChange={setModalSignInOpen}>
        <DialogContent className="text-center bg-gray-700">
          <h2 className="font-bold text-sm mb-4">Faça login com:</h2>
          <ButtonSignIn title="Entrar com Google" onClick={() => signIn('google', {
            callbackUrl: '/dashboard'
          })} >
            <Icon icon="flat-color-icons:google" fontSize={32}  />
          </ButtonSignIn>

          <ButtonSignIn title="Entrar com GitHub" onClick={() => signIn('github', {
            callbackUrl: '/dashboard'
          })}>
            <Icon icon="akar-icons:github-fill" fontSize={32}  />
          </ButtonSignIn>
        </DialogContent>
      </Dialog>
    </ContextSession.Provider>
  )
}