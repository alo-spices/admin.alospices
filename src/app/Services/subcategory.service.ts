import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

   private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /*
  GET ALL SUBCATEGORIES
  */
  getAllSubCategories(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/Getsubcategory`
    );
  }

  /*
  CREATE SUBCATEGORY
  */
  createSubCategory(formData: FormData): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/Cretesubcategory`,
      formData
    );
  }

  /*
  GET BY ID
  */
  getSubCategoryById(id: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getbyIdsubcategory/${id}`
    );
  }

  /*
  UPDATE SUBCATEGORY
  */
  updateSubCategory(
    id: string,
    formData: FormData
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/Updatesubcategory/${id}`,
      formData
    );
  }

  /*
  DELETE SUBCATEGORY
  */
  deleteSubCategory(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/Deletesubcategory/${id}`
    );
  }

  /*
  IMAGE UPLOAD (optional reuse)
  */
  uploadImage(formData: FormData): Observable<{ imageUrl: string }> {
    return this.http.post<{ imageUrl: string }>(
      `${this.apiUrl}/upload`,
      formData
    );
  }
}
