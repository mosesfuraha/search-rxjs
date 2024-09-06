import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserPost } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<UserPost[]>([]);
  cartItems$ = this.cartItems.asObservable();
  private apiUrl = 'https://fakestoreapi.com/carts';

  constructor(private http: HttpClient) {}

  addToCart(post: UserPost): void {
    const items = this.cartItems.getValue();
    const itemIndex = items.findIndex((item) => item.id === post.id);

    if (itemIndex === -1) {
      post = { ...post, quantity: 1, inCart: true };
      this.cartItems.next([...items, post]);
    }
  }

  increment(post: UserPost): void {
    const items = this.cartItems.getValue();
    const updatedItems = items.map((item) => {
      if (item.id === post.id) {
        return { ...item, quantity: (item.quantity || 0) + 1 };
      }
      return item;
    });
    this.cartItems.next(updatedItems);
  }

  decrement(post: UserPost): void {
    const items = this.cartItems.getValue();
    const updatedItems = items
      .map((item) => {
        if (item.id === post.id && (item.quantity || 0) > 1) {
          return { ...item, quantity: (item.quantity || 0) - 1 };
        } else if (item.id === post.id && (item.quantity || 0) === 1) {
          return null;
        }
        return item;
      })
      .filter((item): item is UserPost => item !== null);

    this.cartItems.next(updatedItems);
  }

  getCartItems(): Observable<UserPost[]> {
    return this.cartItems$;
  }

  confirmCart(userId: number): Observable<any> {
    const products = this.cartItems.getValue().map((item) => ({
      productId: item.id,
      quantity: item.quantity || 0,
    }));

    const body = {
      userId: userId,
      date: new Date().toISOString().split('T')[0],
      products: products,
    };

    return this.http.post(this.apiUrl, body).pipe(catchError(this.handleError));
  }

  updateCart(cartId: number, userId: number): Observable<any> {
    const products = this.cartItems.getValue().map((item) => ({
      productId: item.id,
      quantity: item.quantity || 0,
    }));

    const body = {
      userId: userId,
      date: new Date().toISOString().split('T')[0],
      products: products,
    };

    return this.http
      .put(`${this.apiUrl}/${cartId}`, body)
      .pipe(catchError(this.handleError));
  }

  deleteCart(cartId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/${cartId}`)
      .pipe(catchError(this.handleError));
  }
  removeFromCart(post: UserPost): void {
    const items = this.cartItems
      .getValue()
      .filter((item) => item.id !== post.id);
    this.cartItems.next(items);
  }
  clearAll(): void {
    this.cartItems.next([]);
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);

    let errorMessage = 'Something went wrong. Please try again later.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
