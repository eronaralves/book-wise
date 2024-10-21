type GetPopularBooksResponse = {
  author: string;
  id: string;
  name: string;
  average_rate: number;
  cover_url: string;
  has_read: boolean;
  total_pages: number;
  _count: {
    ratings: number;
  };
  categories: {
    category: {
      name: string;
    };
  }[];
};

export async function getPopularBooks() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/popular`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch popular books');
    }

    const data: GetPopularBooksResponse[] = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching popular books:', error);
  }
}
