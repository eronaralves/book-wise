'use client'

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { status } = useSession()

  if(status === "authenticated") {
    return redirect('/dashboard')
  }

  if(status === "unauthenticated") {
    return redirect('/sign-in')
  }
}
