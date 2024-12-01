import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Fetch all products with optional filters
  getProducts(filters?: any): Observable<any> {
    return this.http.get(this.apiUrl, { params: filters });
  }

  // Get a single product by ID
  getProductById(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${productId}`);
  }

  // Add a new product
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addProduct`, product);
  }

  // Update an existing product
  updateProduct(productId: any, productData:any): Observable<any> {
    console.log("product from service", productId,productData);
    
    return this.http.put<any>(`${this.apiUrl}/${productId}`, productData);
  }

  // Delete a product
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }
}
