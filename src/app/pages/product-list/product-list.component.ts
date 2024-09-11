import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserPost } from '../../models/user';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$!: Observable<UserPost[]>;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products$ = this.productService.fetchProducts().pipe(
      map((products) =>
        products.map((product) => ({
          ...product,
          inCart: false,
          quantity: 0,
          userId: 1,
          createdAt: new Date().toISOString(),
        }))
      ),
      catchError((error) => {
        console.error('Error fetching products:', error);
        return []; 
      })
    );
  }

  addToCart(product: UserPost): void {
    product.inCart = true;
    product.quantity = 1;
    this.cartService.addToCart(product);
  }

  increment(product: UserPost): void {
    product.quantity = (product.quantity || 0) + 1;
    this.cartService.increment(product);
  }

  decrement(product: UserPost): void {
    if ((product.quantity || 0) > 1) {
      product.quantity = (product.quantity || 0) - 1;
      this.cartService.decrement(product);
    } else {
      product.inCart = false;
      product.quantity = 0;
      this.cartService.decrement(product);
    }
  }
}
