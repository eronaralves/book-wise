export type GetBookResponse = {
  author: string;
  id: string;
  name: string;
  average_rate: number;
  cover_url: string;
  total_pages: number;
  has_read: boolean;
  _count: {
    ratings: number;
  },
  categories: {
    category: {
      name: string;
    };
  }[];
  ratings: {
    id: string;
    description: string,
    created_at: string,
    rate: number,
    user: {
      id: string,
      name: string,
      image: string
    }
  }[]
};

export async function getBook(bookId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data: GetBookResponse = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching books:', error);
  }
}
