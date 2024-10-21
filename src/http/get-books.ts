type GetBooksResponse = {
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
};

export async function getBooks(category?: string, search?: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books?category=${category}&search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        tags: ['get-books']
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data: GetBooksResponse[] = await response.json();

    console.log(data, 'DATAAAAAAAAAAAs')
    return data;
  } catch (error) {
    console.log('Error fetching books:', error);
  }
}
