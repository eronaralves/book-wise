
// Components
import { RatingsRecent } from "./components/ratings-recent";
import { BooksPopular } from "./components/books-popular";
import { LastReatingBook } from "./components/most-recent-book-rating-card";
import { TitleSection } from "./components/title-section";

export const metadata = {
  title: 'Dashboard | BookWise',
}

export default async function Dashboard() {

  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  return (
    <div className="w-full h-full overflow-auto mt-10 lg:mt-0 px-3 sm:px-6">
      <div className="h-full w-full flex flex-col max-w-[1060px] mx-auto mt-14">
        <TitleSection />
        
        <div className="h-full flex gap-20 mt-10">
          <div className="h-full flex flex-col gap-14 w-full max-w-[630px]">
            <LastReatingBook />

            <RatingsRecent />
          </div>
          <BooksPopular />
        </div>
      </div>
    </div>
  );
}