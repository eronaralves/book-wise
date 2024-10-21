import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string; 
    email: string;
    name: string;
    image: string
    created_at: string;
  }

  interface Session {
    user: User;
  }
}