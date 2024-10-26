
type GetRecentsRatingsResponse = {
  book: {
    id: string;
    author: string;
    name: string;
    cover_url: string;
    summary: string;
  };
  created_at: string;
  description: string;
  rate: number;
  id: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
};

export async function getRecentsRatings() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ratings/recents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch ratings');
    }

    const data: GetRecentsRatingsResponse[] = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching recent ratings:', error);
    return [];
  }
}