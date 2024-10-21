import Image from "next/image"

// Images
import LogoImg from "@/assets/images/logo.png"
import BackgroundImg from "@/assets/images/background-sign-in.png"

// Components
import { SignIn as ContentSignIn } from "./components/sign-in"

export default function SignIn() {

  return (
    <div className="w-full h-full p-4 flex overflow-auto">
      <div className="hidden w-[40%] relative lg:flex items-center justify-center">
        <Image src={BackgroundImg} alt="" width={598} className="w-full h-full absolute object-cover rounded-lg" />
        <Image src={LogoImg} alt="" className="z-10" />
      </div>

      <ContentSignIn />
    </div>
  )
}