import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { NotiflixService } from 'src/app/services/notiflix.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent  implements OnInit{

  products = [
    {
      id: 1,
      name: 'Stylish Watch',
      description: 'A premium stylish watch for all occasions.',
      price: 4999,
      image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/watch/a/8/e/stylish-trendy-premium-casual-party-wear-v2a-men-original-imagtjkw3xxmkwfz.jpeg?q=90&crop=false',
    },
    {
      id: 2,
      name: 'Sports Shoes',
      description: 'Comfortable and durable running shoes.',
      price: 2999,
      image: 'https://assets.ajio.com/medias/sys_master/root/20240124/hodJ/65b03eb916fd2c6e6aba8520/-473Wx593H-467001706-white-MODEL.jpg',
    },
    {
      id: 3,
      name: 'Leather Wallet',
      description: 'A compact wallet made of genuine leather.',
      price: 999,
      image: 'https://godbolegear.com/cdn/shop/files/Single_Cash_Pocket_Mahogany_Leather_Wallet_in_Full_Grain_Leather.jpg?v=1717769262&width=1946',
    },
    {
      id: 4,
      name: 'Wireless Earbuds',
      description: 'High-quality sound and long battery life.',
      price: 1999,
      image: 'https://img.tatacliq.com/images/i20//437Wx649H/MP000000023964619_437Wx649H_202410051138051.jpeg',
    },
  ];
     
constructor(private cartService : CartService, private notiflixService: NotiflixService){}

showToast = false;
toastMessage = '';
selectedProduct: any = null;
quantities: { [key: number]: number } = {}; // Store quantity for each product by ID
addedToCart: { [key: number]: boolean } = {}; // Store if a product is added to cart

  ngOnInit(): void {
    this.selectedProduct = this.products;
    
  }


  // Handle adding to cart
  addToCart(product: any) {
    const quantity = this.quantities[product.id] || 1;
    this.cartService.addToCart(product, quantity);
    this.notiflixService.success(`${product.name} added to cart with quantity: ${quantity}`);
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
    this.addedToCart[product.id] = true;
  }

  // Open modal with product details
  openModal(product: any) {
    this.selectedProduct = product;
    // Initialize the quantity for the selected product if not already set
    if (!this.quantities[product.id]) {
      this.quantities[product.id] = 1;
    }
    const modalElement = document.getElementById('productModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Close toast message
  closeToast() {
    this.showToast = false;
  }

  // Increment quantity for the selected product
  incrementQuantity() {
    this.quantities[this.selectedProduct.id] = (this.quantities[this.selectedProduct.id] || 0) + 1;
  }

  // Decrement quantity for the selected product
  decrementQuantity() {
    if (this.quantities[this.selectedProduct.id] > 1) {
      this.quantities[this.selectedProduct.id]--;
    }
  }
}
