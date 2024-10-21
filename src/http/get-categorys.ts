interface GetCategorysResponse {
  name: string;
  id: string;
  slug: string;
}

export async function getCategorys() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categorys`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data: GetCategorysResponse[] = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching categories:', error);
  }
}
