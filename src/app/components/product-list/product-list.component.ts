import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { NotiflixService } from 'src/app/services/notiflix.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],  
})

export class ProductListComponent  implements OnInit{
  products: any;
  selectedProduct: any = null;
  quantities: { [key: string]: number } = {};
  addedToCart: { [key: string]: boolean } = {};
  cartItems : any;

  constructor(private productService: ProductService, private notiflixService: NotiflixService, private cartService : CartService,  private cdr: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe(
      (res: any) => {
        console.log('Fetched Products:', res.product); // Check the product data
        this.products = res.product;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  openModal(product: any): void {
    this.selectedProduct = product;

    const modalElement = document.getElementById('productModals');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }


  addToCart(product: any): void {
    const quantity = this.quantities[product._id] || 1;

    this.cartService.addProductToCart(product._id, quantity, product.price).subscribe(
      (res: any) => {
        this.addedToCart[product._id] = true;
        this.quantities[product._id] = quantity;

        this.cartService.getMyCartItems().subscribe((items:any) => {
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
  }

  incrementQuantity(): void {
    if (this.selectedProduct) {
      this.quantities[this.selectedProduct._id] =
        (this.quantities[this.selectedProduct._id] || 1) + 1;
    }
  }

  decrementQuantity(): void {
    if (
      this.selectedProduct &&
      this.quantities[this.selectedProduct._id] > 1
    ) {
      this.quantities[this.selectedProduct._id] -= 1;
    }
  }
}
