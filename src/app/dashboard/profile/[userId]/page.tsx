// Components
import { ContentProfile } from "./components/content-profile";

export const metadata = {
  title: 'Perfil | BookWise',
}

interface IProfile {
  params: {
    userId: string
  },
  searchParams: {
    bookSearch: string;
  }
}

export default async function Profile({ searchParams: { bookSearch }, params: { userId } }: IProfile) {

  return (
    <div className="w-full h-full flex flex-col overflow-auto lg:mt-0 px-3 sm:px-6">
      <ContentProfile bookSearch={bookSearch} userId={userId} />
    </div>
  )
}