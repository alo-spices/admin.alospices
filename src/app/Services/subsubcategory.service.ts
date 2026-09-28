import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubsubcategoryService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  /*
  CREATE SUB SUB CATEGORY
  */
  createSubSubCategory(
    formData: FormData
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/Create-sub-subcategory`,
      formData
    );
  }

  /*
  GET ALL SUB SUB CATEGORIES
  */
  getAllSubSubCategories(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/get-subsubcategory`
    );
  }

  /*
  GET BY ID
  */
  getSubSubCategoryById(
    id: string
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getById-subsubcategory/${id}`
    );
  }

  /*
  UPDATE
  */
  updateSubSubCategory(
    id: string,
    formData: FormData
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/Update_subsubcategory/${id}`,
      formData
    );
  }

  /*
  DELETE
  */
  deleteSubSubCategory(
    id: string
  ): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/subsubcategory/${id}`
    );
  }
}
