
interface GetMostRecentBookRatingResponse {
  created_at: string,
  book: {
    id: string,
    name: string,
    author: string,
    summary: string,
    average_rate: number,
    cover_url: string,
    created_at: string
  }
}

export async function getMostRecentBookRating(userId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ratings/user/${userId}/most-recent/`)
    const data: GetMostRecentBookRatingResponse = await response.json()

    return data
  } catch(error) {
    console.log(error)
  }
}