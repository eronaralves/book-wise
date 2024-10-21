export type GetRatingPerBookResponse = {
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

export async function getRatingPerBook(bookId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ratings/book/${bookId}`, {
      next: {
        tags: [`ratings-per-book:${bookId}`]
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch ratings for the book');
    }

    const data: GetRatingPerBookResponse[] = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching ratings:', error);
  }
}
