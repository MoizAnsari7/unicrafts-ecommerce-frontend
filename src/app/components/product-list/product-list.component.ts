import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { take } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { NotiflixService } from 'src/app/services/notiflix.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],  
})

export class ProductListComponent  implements OnInit{
  products: any[] = [];
  loading: boolean = true;
  selectedProduct: any = null;
  quantities: { [key: string]: number } = {};
  addedToCart: { [key: string]: boolean } = {};
  cartItems : any;

  searchTerm: string = ''; // Search term entered by the user
filteredProducts: any[] = []; // Filtered product list
categories: string[] = []; // Available categories
selectedCategory: string = ''; // Selected category for filtering

  constructor(private productService: ProductService, private notiflixService: NotiflixService, private cartService : CartService,  private cdr: ChangeDetectorRef, private userService: UserService ) {
   
  }

  ngOnInit(): void {
    
    setTimeout(()=>{
     this.fetchProducts();
   },1000)
  
  }


  ngAfterViewInit(): void {
    if (this.products.length === 0) {
      this.cdr.detectChanges(); // Ensure the view is updated after initialization
    }
  }

  fetchProducts() {
    console.log('Products before fetch:', this.products);
this.productService.getAllProducts().subscribe(
  (res: any) => {
    console.log('API response:', res);
    this.products = Array.isArray(res.products) ? res.products : [res.products];

    this.filteredProducts = [...this.products]; // Initialize filteredProducts
    
    // Extract unique categories
    this.categories = [
      ...new Set(this.products.map((product: any) => product.category.name || 'Uncategorized'))
    ];
    console.log("category", this.categories);

    console.log('Products after fetch:', this.products);
    this.loading = false;
    this.cdr.detectChanges();
  },
  (error: any) => {
    this.loading = false;
    console.error('Error fetching products:', error);
  }

    );
  }
  

  onSearch(): void {
    this.filterProducts();
  }
  
  onFilter(): void {
    this.filterProducts();
  }
  
  filterProducts(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
  
    // Apply search and filter
    this.filteredProducts = this.products.filter((product: any) => {
      console.log("product", product.category.name);

      const matchesSearch =
      (product.name && product.name.toLowerCase().includes(searchTermLower)) ||
      (product.description &&
        product.description.toLowerCase().includes(searchTermLower)) ||
      (product.category.name &&
        product.category.name.toLowerCase().includes(searchTermLower)) ||
      (product.price && product.price.toString().includes(searchTermLower)); // Convert price to string for search

      const matchesCategory =
        !this.selectedCategory || product.category.name === this.selectedCategory;
  
      return matchesSearch && matchesCategory;
    });
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
              this.cartItems = items.cart.items;
              console.log("cartItems Length",items.cart.items.length);
              
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
