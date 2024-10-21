
// Components
import { TitleSection } from "./components/title-section";
import { Categorys } from "./components/categorys";
import { Books } from "./components/books";
import { SearchInput } from "./components/seach";

export const metadata = {
  title: 'Explorar | BookWise',
}

interface IExplore {
  searchParams: {
    category: string;
    search: string
  }
}

export default async function Explore({ searchParams: { category, search } }: IExplore) {

  return (
    <div className="w-full h-full flex flex-col overflow-auto mt-0 sm:mt-10 lg:mt-0 px-3 sm:px-6">
      <div className="w-full max-w-[1124px] flex flex-col h-full mx-auto mt-14">
        <div className="flex gap-6 items-center justify-between">
          <TitleSection />

          <SearchInput />
        </div>

        <div className="flex-1 flex flex-col">
          <Categorys />

          <Books category={category} search={search} />
        </div>
      </div>
    </div>
  )
}