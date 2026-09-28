import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

   private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // ==========================
  // Create Brand
  // ==========================

  createBrand(formData: FormData): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/create-brands`,

      formData

    );

  }

  // ==========================
  // Get All Brands
  // ==========================

  getAllBrands(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-brands`

    );

  }

  // ==========================
  // Get Brand By Id
  // ==========================

  getBrandById(id: string): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getbyid-brands/${id}`

    );

  }

  // ==========================
  // Update Brand
  // ==========================

  updateBrand(
    id: string,
    formData: FormData
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/update-brands/${id}`,

      formData

    );

  }

  // ==========================
  // Delete Brand
  // ==========================

  deleteBrand(id: string): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/delete-brands/${id}`

    );

  }

}
