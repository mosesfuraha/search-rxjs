export interface UserPost {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  inCart?: boolean;
  quantity?: number;
  userId?: number;
  createdAt?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
