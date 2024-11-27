import { Component } from '@angular/core';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
})
export class ProductManagementComponent {
  products: any[] = []; // List of products
  isModalOpen: boolean = false; // Modal visibility
  currentProduct: any = null; // Currently selected product for edit
  modalMode: 'add' | 'edit' = 'add'; // Modal mode: add or edit
  isLoading: boolean = false; // Loading spinner state

  // Open modal for adding a product
  openAddProductModal(): void {
    this.modalMode = 'add';
    this.currentProduct = null; // New product
    this.isModalOpen = true;
  }

  // Open modal for editing a product
  openEditProductModal(product: any): void {
    this.modalMode = 'edit';
    this.currentProduct = { ...product }; // Clone product to avoid mutating the original
    this.isModalOpen = true;
  }

  // Handle product save
  handleProductSave(updatedProduct: any): void {
    if (this.modalMode === 'add') {
      this.products.push({ ...updatedProduct, id: this.generateId() });
    } else if (this.modalMode === 'edit' && this.currentProduct) {
      const index = this.products.findIndex((p) => p.id === this.currentProduct.id);
      if (index !== -1) {
        this.products[index] = { ...updatedProduct, id: this.currentProduct.id };
      }
    }
    this.isModalOpen = false;
  }

  // Generate a mock ID for new products
  generateId(): number {
    return Math.floor(Math.random() * 100000);
  }

  // Close modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  // Delete a product
  deleteProduct(id: number): void {
    this.products = this.products.filter((p) => p.id !== id);
  }
}
