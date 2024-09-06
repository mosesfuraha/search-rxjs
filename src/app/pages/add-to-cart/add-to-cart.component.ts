import { Component, OnInit } from '@angular/core';
import { UserPost } from '../../models/user';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css'],
})
export class AddToCartComponent implements OnInit {
  cartItems: UserPost[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  increment(post: UserPost): void {
    this.cartService.increment(post);
  }

  decrement(post: UserPost): void {
    if ((post.quantity || 0) > 1) {
      this.cartService.decrement(post);
    } else {
      post.inCart = false;
      this.cartService.decrement(post);
    }
  }

  removeFromCart(post: UserPost): void {
    this.cartService.removeFromCart(post);
  }

  clearAll(): void {
    this.cartService.clearAll();
  }
}
