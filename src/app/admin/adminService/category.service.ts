import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/category'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Fetch all category with optional filters
  getCategory(filters?: any): Observable<any> {
    return this.http.get(this.apiUrl, { params: filters });
  }

  // Get a single category by ID
  getCategoryById(categoryId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${categoryId}`);
  }

  // Add a new category
  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addCategory`, category);
  }

  // Update an existing category
  updateCategory(category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${category._id}`, category);
  }

  // Delete category
  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${categoryId}`);
  }

}
