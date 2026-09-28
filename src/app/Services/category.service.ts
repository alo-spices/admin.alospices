import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../Models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // ===========================
  // Create Category
  // ===========================

  createCategory(formData: FormData): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/create-categories`,

      formData

    );

  }

  // ===========================
  // Get All Categories
  // ===========================

  getAllCategories(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getall-categories`

    );

  }

  // ===========================
  // Get Category By Id
  // ===========================

  getCategoryById(id: string): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getCategory-ById/${id}`

    );

  }

  // ===========================
  // Update Category
  // ===========================

  updateCategory(
    id: string,
    formData: FormData
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/update-categories/${id}`,

      formData

    );

  }

  // ===========================
  // Delete Category
  // ===========================

  deleteCategory(id: string): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/categories/${id}`

    );

  }
}

