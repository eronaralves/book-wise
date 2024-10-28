'use client'

import { useState } from "react";
import { signOut } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Images
import LogoImg from "@/assets/images/logo.png"

// Icons
import { Binoculars, ChartLine, LogIn, LogOut, Menu, User, X } from "lucide-react";

// Components
import { Separator } from "./ui/separator";
import { useContextSession } from "@/hooks/useContextSession";
import { Dialog, DialogContent } from "./ui/dialog";

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const { session, setModalSignInOpen } = useContextSession()
  const user = session?.user
  const pathname = usePathname()

  const authNavItems = [
    { name: 'Perfil', icon: User, linkActive: '/profile', href: `/dashboard/profile/${user?.id}` },
  ]

  const appItems = [
    { name: 'Início', icon: ChartLine, linkActive: '/dashboard', href: '/dashboard' },
    { name: 'Explorar', icon: Binoculars, linkActive: '/explore', href: '/dashboard/explore' },
  ]

  const navItems = !user ? appItems : appItems.concat(authNavItems)

  return (
    <div className={`${
        sidebarOpen ? 'w-full max-w-[250px] fixed top-0 left-0 z-50' : 'w-0'
      } overflow-auto h-screen md:min-w-[250px] flex flex-col`}>
      <div
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-6 w-6 fixed top-5 left-5" /> : <Menu className="h-8 w-8" />}
      </div>

      <Dialog open={sidebarOpen} onOpenChange={() => setSidebarOpen(!sidebarOpen)} >
        <DialogContent className="px-10 overflow-auto right-auto fixed left-0 top-0 translate-x-[-0%] translate-y-[-0%] p-1 sm:p-6 z-50 w-full max-w-[300px] h-full bg-gray-700">
          <div className="flex-1 p-6 flex flex-col mt-14">
            <Link href="/dashboard">
              <Image src={LogoImg} priority alt="Logo da book wize" width={128} className="mx-auto" />
            </Link>
            
            <div className="mt-14 flex flex-col gap-8">
              {navItems.map((item) => {
                const IconLink = item.icon

                const modifiedString = pathname.replace('/dashboard/', '/');
                const isLinkActivity = modifiedString.includes(item.linkActive)

                return (
                  <div key={item.href} className="flex items-center gap-4" onClick={() => setSidebarOpen(false)}  >
                    <Separator orientation="vertical" className={`h-6 w-1 rounded-full ${isLinkActivity ? 'bg-gradient-vertical' : 'bg-transparent' }`}/>
                    <Link href={item.href} className={`flex items-center text-md gap-3 duration-300 hover:text-gray-100 ${isLinkActivity ? 'text-gray-100 font-bold' : 'text-gray-400' }`} >
                      <IconLink size={25} />
                      {item.name}
                    </Link>
                  </div>
                )
              })}
            </div>

            <div className="mt-auto mx-auto">
              {!user ? (
                <div className="flex items-center gap-3">
                  <button onClick={() => setModalSignInOpen(true)} className="flex items-center text-md gap-3 text-gray-100 font-bold">
                    Fazer login
                    <LogIn size={20} className="text-green-100" />
                  </button>
                </div>
              ): (
                <div className="flex items-center gap-3">
                  <div className="h-[35px] w-[35px] flex items-center justify-center bg-gradient-horizontal rounded-full">
                    {user.image && <Image src={user.image} alt="Foto de perfil" width={35} height={35} className="w-[95%] h-[95%] bg-slate-200 rounded-full" />}
                  </div>
                  <span className="text-sm">Eronar Alves</span>
                  <LogOut onClick={() => signOut({ callbackUrl: '/sign-in' })} size={20} className="text-red-400 cursor-pointer" />
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <aside className={`h-full w-full min-h-[400px] transition-transform duration-300 ease-in-out md:translate-x-0`}>
        <div className="flex h-full w-fullflex-col justify-between border-r p-5 bg-gray-700 rounded-xl">
          <div className="flex-1 p-6 flex flex-col">
            <Link href="/dashboard">
              <Image src={LogoImg} priority alt="Logo da book wize" width={128} className="mx-auto" />
            </Link>
            
            <div className="mt-14 flex flex-col gap-8">
              {navItems.map((item) => {
                const IconLink = item.icon

                const modifiedString = pathname.replace('/dashboard/', '/');
                const isLinkActivity = modifiedString.includes(item.linkActive)

                return (
                  <div key={item.href} className="flex items-center gap-4" >
                    <Separator orientation="vertical" className={`h-6 w-1 rounded-full ${isLinkActivity ? 'bg-gradient-vertical' : 'bg-transparent' }`} />
                    <Link href={item.href} className={`flex items-center text-md gap-3 duration-300 hover:text-gray-100 ${isLinkActivity ? 'text-gray-100 font-bold' : 'text-gray-400' }`} >
                      <IconLink size={25} />
                      {item.name}
                    </Link>
                  </div>
                )
              })}
            </div>

            <div className="mt-auto mx-auto">
              {!user ? (
                <div className="flex items-center gap-3">
                  <button onClick={() => setModalSignInOpen(true)} className="flex items-center text-md gap-3 text-gray-100 font-bold">
                    Fazer login
                    <LogIn size={20} className="text-green-100" />
                  </button>
                </div>
              ): (
                <div className="flex items-center gap-3">
                  <div className="h-[35px] w-[35px] flex items-center justify-center bg-gradient-horizontal rounded-full">
                    {user.image && <Image src={user.image} alt="Foto de perfil" width={35} height={35} className="w-[95%] h-[95%] bg-slate-200 rounded-full" />}
                  </div>
                  <span className="text-sm">Eronar Alves</span>
                  <LogOut onClick={() => signOut({ callbackUrl: '/sign-in' })} size={20} className="text-red-400 cursor-pointer" />
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}