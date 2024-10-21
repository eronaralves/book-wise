export type GetRatingPerBookResponse = {
  created_at: string;
  description: string;
  rate: number;
  id: string;
  book: {
    id: string;
    author: string;
    name: string;
    cover_url: string;
  };
};

export async function getRatingPerUser(userId: string, searchBook?: string) {
  try {
    const query = searchBook ? `?search=${encodeURIComponent(searchBook)}` : '';
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ratings/user/${userId}${query}`);

    if (!response.ok) {
      throw new Error('Failed to fetch ratings for the user');
    }

    const data: GetRatingPerBookResponse[] = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching ratings:', error);
  }
}
