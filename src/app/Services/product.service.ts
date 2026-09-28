import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // getProductVariants(productId: string) {
  //   throw new Error('Method not implemented.');
  // }

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // ==================================
  // Create Product
  // ==================================

  createProduct(formData: FormData): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/create-products`,

      formData

    );

  }

  // ==================================
  // Get All Products
  // ==================================

  getAllProducts(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getall-products`

    );

  }

  // ==================================
  // Get Product By Id
  // ==================================

  getProductById(id: string): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getbyid-products/${id}`

    );

  }

  // ==================================
  // Update Product
  // ==================================

  updateProduct(
    id: string,
    formData: FormData
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/update-products/${id}`,

      formData

    );

  }

  // ==================================
  // Delete Product
  // ==================================

  deleteProduct(id: string): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/delete-products/${id}`

    );

  }

   getProductVariants(productId: string) {

  return this.http.get(
    `${this.apiUrl}/variants/${productId}`
  );

}
getProductsByRawMaterial(rawMaterialId: string) {

  return this.http.get(

    this.apiUrl +

    "/products-by-raw-material/" +

    rawMaterialId

  );

}

}
