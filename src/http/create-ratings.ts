interface CreateRatingsProps {
  bookId: string;
  userId: string;
  description: string;
  rate: number;
}

export async function createRatings(data: CreateRatingsProps) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ratings/book/${data.bookId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create rating');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.log('Error creating rating:', error);
  }
}
