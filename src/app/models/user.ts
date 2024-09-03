export interface UserPost {
  id: number;
  title: string;
  description: string;
  userId: string;
  createdAt: Date;
  image:string
}
 
 export interface User {
  id: number;
  name: string;
  email: string;
}