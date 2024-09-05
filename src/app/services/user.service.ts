import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, combineLatest } from 'rxjs';
import { catchError, delay, map, retry, tap } from 'rxjs/operators';
import { User, UserPost } from './../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'assests/userDetail.json';
  private postsUrl = 'assests/userPosts.json';

  constructor(private http: HttpClient) {}

  getUserPosts(): Observable<UserPost[]> {
    return this.http.get<UserPost[]>(this.postsUrl).pipe(
      delay(500),
      retry(3),
      tap((posts) => console.log('Fetched posts:', posts)),
      catchError(this.handleError<UserPost[]>('getUserPosts', []))
    );
  }

  getUserDetails(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl).pipe(
      delay(500),
      retry(3),
      tap((users) => console.log('Fetched users:', users)),
      catchError(this.handleError<User[]>('getUserDetails', []))
    );
  }

  searchCombined(
    term: string = ''
  ): Observable<{ user: User | null; posts: UserPost[] }> {
    return combineLatest([this.getUserDetails(), this.getUserPosts()]).pipe(
      map(([users, posts]) => {
        const filteredPosts = posts.filter((post) => {
          const title = post.title || '';
          const description = post.description || '';
          return (
            title.toLowerCase().includes(term.toLowerCase()) ||
            description.toLowerCase().includes(term.toLowerCase())
          );
        });

        const userMatches = users.find((user) => {
          const name = user.name || '';
          const email = user.email || '';
          return (
            name.toLowerCase().includes(term.toLowerCase()) ||
            email.toLowerCase().includes(term.toLowerCase())
          );
        });

        return {
          user: userMatches || null,
          posts: filteredPosts,
        };
      }),
      tap((results) => console.log('Search results:', results)),
      catchError(
        this.handleError<{ user: User | null; posts: UserPost[] }>(
          'searchCombined',
          { user: null, posts: [] }
        )
      )
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
