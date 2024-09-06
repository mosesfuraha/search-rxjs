import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { UserPost } from '../../../models/user';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css'],
})
export class UserPostsComponent implements OnInit {
  userPosts: UserPost[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.fetchProducts().subscribe(
      (products) => {
        this.userPosts = products.map((product) => ({
          ...product,
          inCart: false,
          quantity: 0,
          userId: 1, 
          createdAt: new Date().toISOString(), 
        
        }));
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addToCart(post: UserPost): void {
    post.inCart = true;
    post.quantity = 1;
    this.cartService.addToCart(post);
  }

  increment(post: UserPost): void {
    post.quantity = (post.quantity || 0) + 1;
    this.cartService.increment(post);
  }

  decrement(post: UserPost): void {
    if ((post.quantity || 0) > 1) {
      post.quantity = (post.quantity || 0) - 1;
      this.cartService.decrement(post);
    } else {
      post.inCart = false;
      post.quantity = 0;
      this.cartService.decrement(post);
    }
  }

  private truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }
}
