import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { NotiflixService } from 'src/app/services/notiflix.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;
  quantities: { [key: string]: number } = {};
  addedToCart: { [key: string]: boolean } = {};
  cartItems :any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private userService: UserService,
    private notiflixService: NotiflixService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((res: any) => {
        this.product = res.product;
        console.log('Product details', res);
      });
    }
  }

  incrementQuantity(): void {
    if (this.product) {
      this.quantities[this.product._id] =
        (this.quantities[this.product._id] || 1) + 1;
    }
  }

  decrementQuantity(): void {
    if (
      this.product &&
      this.quantities[this.product._id] > 1
    ) {
      this.quantities[this.product._id] -= 1;
    }
  }

  calculateTotalAmount(): number {
    if (this.product) {
      return (
        (this.quantities[this.product._id] || 1) * this.product.price
      );
    }
    return 0;
  }



  addToCart(product: any): void {
    if (!product || !product._id) {
      console.error('Invalid product:', product);
      return;
    }
    const quantity = this.quantities[product._id] || 1;
  
    // Check if user is logged in using take(1) to get a single value
    this.userService.isAuthenticated$.pipe(take(1)).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        // User is logged in, add to the database
        this.cartService.addProductToCart(product._id, quantity, product.price).subscribe(
          (res: any) => {
            this.addedToCart[product._id] = true;
            this.quantities[product._id] = quantity;
  
            this.cartService.getMyCartItems().subscribe((items: any) => {
              this.cartItems = items.items;
              this.cartService.cartItems.next(this.cartItems.length);
            });
  
            this.notiflixService.success(`Added ${product.name} to the cart!`);
          },
          (error: any) => {
            console.error('Error adding to cart:', error);
            this.notiflixService.error(`Failed to add ${product.name} to the cart.`);
          }
        );
      } else {
        // User is not logged in, save to localStorage
        const localCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        const existingItemIndex = localCart.findIndex((item: any) => item.productId === product._id);
  
        if (existingItemIndex !== -1) {
          // Update quantity if product already exists
          localCart[existingItemIndex].quantity += quantity;
        } else {
          // Add new product
          localCart.push({
            productId: product._id,
            quantity,
            price: product.price,
            name: product.name,
          });
        }
  
        localStorage.setItem('guestCart', JSON.stringify(localCart));
        this.notiflixService.success(`Added ${product.name} to the cart (Guest)!`);
      }
    });
  }

}
