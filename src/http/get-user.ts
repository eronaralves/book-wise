
interface GetUserResponse {
  email: string;
  name: string;
  created_at: string;
  image: string;
  _count: {
    ratings: number
  },
  booksEvaluated: number;
  authorsRead: number,
  mostReadCategory: string | null
}

export async function getUser(userId?: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data: GetUserResponse = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching user data:', error);
  }
}
