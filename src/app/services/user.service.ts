import { User, UserPost } from './../models/user';
import { Injectable } from '@angular/core';
import { combineLatest, delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userPostData: UserPost[] = [
    {
      id: 1,
      title: 'The Beauty of Red Apples',
      description:
        'Discover the nutritional benefits and delicious recipes you can create with red apples.',
      userId: 'user123',
      createdAt: new Date('2024-09-01T10:30:00Z'),
      image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce',
    },
    {
      id: 2,
      title: "Bananas: Nature's Energy Snack",
      description:
        'Learn why bananas are the perfect snack for boosting energy and supporting health.',
      userId: 'user456',
      createdAt: new Date('2024-09-02T11:00:00Z'),
      image:
        'https://img.freepik.com/premium-photo/showcase-vibrant-array-fresh-fruits_880492-2887.jpg',
    },
    {
      id: 3,
      title: 'A Rainbow of Fruits',
      description:
        'Explore the variety and health benefits of mixed fruits, from berries to citrus.',
      userId: 'user789',
      createdAt: new Date('2024-09-03T12:15:00Z'),
      image:
        'https://www.fruitsmith.com/pub/media/mageplaza/blog/post/g/r/green_fruits.jpg',
    },
    {
      id: 4,
      title: 'The Sweetness of Oranges',
      description:
        'Oranges are not only delicious but also packed with Vitamin C. Learn more about their benefits.',
      userId: 'user123',
      createdAt: new Date('2024-09-04T09:45:00Z'),
      image: 'https://specialtyproduce.com/sppics/12312.png',
    },
    {
      id: 5,
      title: 'Kiwis: A Green Powerhouse',
      description:
        'Kiwis are small but mighty when it comes to nutrition. Discover their health benefits.',
      userId: 'user456',
      createdAt: new Date('2024-09-05T14:20:00Z'),
      image:
        'https://static.photodexia.com/largeweb/repository/u-enblog/c7a5416bb2711706f790224795ec201dphoto1523049673857eb18f1d7b578',
    },
    {
      id: 6,
      title: 'Mangoes: The King of Fruits',
      description:
        'Known as the king of fruits, mangoes are loved for their sweet taste and numerous health benefits.',
      userId: 'user789',
      createdAt: new Date('2024-09-06T15:00:00Z'),
      image:
        'https://media.istockphoto.com/id/183422512/photo/fresh-red-apples-on-white-background.jpg?b=1&s=612x612&w=0&k=20&c=FoY6AxhBR75u3d-oUujsZ9zOyG1gisLA6pKDKJk3O5s=',
    },
    {
      id: 7,
      title: 'Berries: Tiny Fruits, Big Benefits',
      description:
        'Berries are packed with antioxidants and are a versatile addition to any diet.',
      userId: 'user123',
      createdAt: new Date('2024-09-07T16:30:00Z'),
      image:
        'https://5.imimg.com/data5/SL/ME/ST/SELLER-52971039/pineapple-anaras-10-piece-500x500.jpg',
    },
    {
      id: 8,
      title: 'Grapes: A Bite-Sized Snack',
      description:
        'Grapes are a convenient and healthy snack, perfect for any time of day.',
      userId: 'user456',
      createdAt: new Date('2024-09-08T17:00:00Z'),
      image:
        'https://www.freshplaza.com/remote/https/agfstorage.blob.core.windows.net/misc/StockPhotos/Mango/Mango_FP_img_0060.jpg?preset=ArticleFullSmall', // Grapes
    },
    {
      id: 9,
      title: 'Strawberries: A Sweet Delight',
      description:
        'Strawberries are not only sweet and delicious but also full of vitamins and antioxidants.',
      userId: 'user789',
      createdAt: new Date('2024-09-09T18:15:00Z'),
      image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919', // Strawberries close-up
    },
  ];

  user: User = {
    id: 1,
    name: 'Furaha',
    email: 'furaha@gmail.com',
  };
  getUserPosts(): Observable<UserPost[]> {
    return of(this.userPostData);
  }
  getUserDetails(): Observable<User> {
    return of(this.user);
  }
  searchCombined(
    term: string = ''
  ): Observable<{ user: User | null; posts: UserPost[] }> {
    return combineLatest([this.getUserDetails(), this.getUserPosts()]).pipe(
      delay(500),
      map(([user, posts]) => {
        const filteredPosts = posts.filter(
          (post) =>
            post.title.toLowerCase().includes(term.toLowerCase()) ||
            post.description.toLowerCase().includes(term.toLowerCase())
        );
        const userMatches =
          user.name.toLowerCase().includes(term.toLowerCase()) ||
          user.email.toLowerCase().includes(term.toLowerCase());

        return {
          user: userMatches ? user : null,
          posts: filteredPosts,
        };
      })
    );
  }
}
