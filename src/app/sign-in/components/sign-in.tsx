'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Icon } from '@iconify/react';
import { signIn, useSession } from 'next-auth/react';

// Images
import IconRocket from "@/assets/images/icon-rocket.png" 

// Components
import { ButtonSignIn } from "@/components/button-sign-in";
import Link from 'next/link';

export function SignIn() {
  const session = useSession()
  const navigate = useRouter()


  if(session.data) {
    navigate.push('/dashboard')
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-full max-w-[372px] px-2">
        <h2 className="text-3xl font-bold">Boas vindas!</h2>
        <p className="text-gray-200 text-base mt-1">Faça seu login ou acesse como visitante.</p>
      
        <div className="mt-10 flex flex-col gap-4">
          <ButtonSignIn title="Entrar com Google" onClick={() => signIn('google')} >
            <Icon icon="flat-color-icons:google" fontSize={32}  />
          </ButtonSignIn>

          <ButtonSignIn title="Entrar com GitHub" onClick={() => signIn('github')} >
            <Icon icon="akar-icons:github-fill" fontSize={32}  />
          </ButtonSignIn>

          <Link href="/dashboard">
            <ButtonSignIn title="Acessar como visitante">
              <Image src={IconRocket} alt="Icone de um foquete" width={32} height={32} />
            </ButtonSignIn>
          </Link>
        </div>
      </div>
    </div> 
  )
}