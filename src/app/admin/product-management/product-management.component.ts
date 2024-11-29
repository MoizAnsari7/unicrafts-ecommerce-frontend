import { Component, OnInit } from '@angular/core';
import { ProductService } from '../adminService/product.service';
import { NotiflixService } from 'src/app/services/notiflix.service';


@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  products: any[] = []; // Array to store product data
  isLoading: boolean = true; // Loader state
  isModalOpen: boolean = false; // Modal visibility state
  modalMode: 'add' | 'edit' = 'add'; // Determines if modal is in 'add' or 'edit' mode
  currentProduct: any | null = null; // The product being edited (or null for add mode)
  categories:any = [];

  constructor(
    private productService: ProductService,
    private notiflixService : NotiflixService
   
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  // Fetch products from the server
  fetchProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe(
      (products: any) => {
        this.products = products;
        this.isLoading = false;
        this.notiflixService.success('Refreshing')
      },
      (error: any) => {
        this.notiflixService.error('Failed to fetch products');
        this.isLoading = false;
      }
    );
  }

  // Open the modal to add a new product
  openAddProductModal(): void {
    this.modalMode = 'add';
    this.currentProduct = null; // No product for add mode
    this.isModalOpen = true;
  }

  // Open the modal to edit an existing product
  openEditProductModal(product: any): void {
    this.modalMode = 'edit';
    this.currentProduct = { ...product }; // Pass a copy of the product to avoid mutating the original
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
    this.currentProduct = null;
  }

  // Handle save from the modal
  handleProductSave(updatedProduct: any): void {
    if (this.modalMode === 'add') {
      // Add new product
      this.productService.addProduct(updatedProduct).subscribe(
        (newProduct: any) => {
          this.products.push(newProduct);
          this.notiflixService.success('Product added successfully');
        },
        (error: any) => this.notiflixService.error('Failed to add product')
      );
    } else if (this.modalMode === 'edit' && this.currentProduct) {
      // Update existing product
      this.productService.updateProduct(updatedProduct).subscribe(
        (updated: any) => {
          const index = this.products.findIndex((p) => p.id === updatedProduct.id);
          if (index !== -1) {
            this.products[index] = updated;
          }
          this.notiflixService.success('Product updated successfully');
        },
        (error: any) => this.notiflixService.error('Failed to update product')
      );
    }
    this.isModalOpen = false; // Close the modal
  }

  // Delete a product
  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.products = this.products.filter((product) => product.id !== productId);
          this.notiflixService.success('Product deleted successfully');
        },
        (error : any) => this.notiflixService.error('Failed to delete product')
      );
    }
  }
}
