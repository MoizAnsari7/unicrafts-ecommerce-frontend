import { Component, OnInit } from '@angular/core';
import { ProductService } from '../adminService/product.service';
import { NotiflixService } from 'src/app/services/notiflix.service';
import { CategoryService } from '../adminService/category.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  isLoading: boolean = true;
  isModalOpen: boolean = false;
  modalMode: 'add' | 'edit' = 'add';
  currentProduct: any = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private notiflixService: NotiflixService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe(
      (products : any) => {
        this.products = products;
        this.isLoading = false;
      },
      () => {
        this.notiflixService.error('Failed to fetch products');
        this.isLoading = false;
      }
    );
  }

  fetchCategories(): void {
    this.categoryService.getCategory().subscribe(
      (response: any) => {
        this.categories = response.categories || [];
      },
      () => this.notiflixService.error('Failed to fetch categories')
    );
  }

  openAddProductModal(): void {
    this.modalMode = 'add';
    this.currentProduct = '';
    this.isModalOpen = true;
  }

  openEditProductModal(product: any): void {
    this.modalMode = 'edit';
    this.currentProduct = { ...product };
    this.isModalOpen = true;

    
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.currentProduct = '';
    this.modalMode = 'add';
   
  }

  handleProductSave(productData: any): void {
    if (this.modalMode === 'add') {
      this.productService.addProduct(productData).subscribe(
        (response: any) => {
          this.notiflixService.success(response.message);
          this.fetchProducts();
          this.closeModal();
        },
        () => this.notiflixService.error('Failed to add product')
      );
    } else if (this.modalMode === 'edit') {
      this.productService.updateProduct(this.currentProduct._id, productData).subscribe(
        (response: any) => {
          this.notiflixService.success(response.message);
          this.fetchProducts();
          this.closeModal();
        },
        () => this.notiflixService.error('Failed to update product')
      );
    }
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.notiflixService.success('Product deleted successfully');
          this.fetchProducts();
        },
        () => this.notiflixService.error('Failed to delete product')
      );
    }
  }
}
