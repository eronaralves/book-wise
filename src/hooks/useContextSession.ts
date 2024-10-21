import { useContext } from "react";
import { ContextSession } from "@/context/session";

export function useContextSession() {
  const { setModalSignInOpen, session } = useContext(ContextSession)

  return {
    setModalSignInOpen,
    session,
  }
}