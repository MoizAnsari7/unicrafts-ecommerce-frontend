import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/api/products'; // Adjust the base URL if needed

  constructor(private http: HttpClient) {}

  /**
   * Fetch products with optional filters and sorting
   * @param filters Object containing category, price range, and sort options
   * @returns Observable of product list
   */
  getProducts(filters: {
    category?: string;
    priceMin?: number;
    priceMax?: number;
    sort?: 'popularity' | 'price' | 'date';
  }): Observable<any> {
    let params = new HttpParams();

    // Append query parameters if provided
    if (filters.category) params = params.set('category', filters.category);
    if (filters.priceMin !== undefined) params = params.set('priceMin', filters.priceMin.toString());
    if (filters.priceMax !== undefined) params = params.set('priceMax', filters.priceMax.toString());
    if (filters.sort) params = params.set('sort', filters.sort);

    // Make the GET request
    return this.http.get(this.baseUrl, { params });
  }


  getAllProducts(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/allProducts`);
  }


  getProductById(productId:any){
return  this.http.get(`${this.baseUrl}/${productId}`)
  }
}
