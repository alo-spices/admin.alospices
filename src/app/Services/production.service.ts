import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Production } from '../Models/Production';



@Injectable({
  providedIn: 'root'
})
export class ProductionService {


  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // ===========================
  // Create Production
  // ===========================

  createProduction(data: any) {

    return this.http.post(

      `${this.apiUrl}/create-production`,

      data

    );

  }

  // ===========================
  // Get All Productions
  // ===========================

  getAllProductions(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-all-productions`

    );

  }

  // ===========================
  // Get Production By Id
  // ===========================

  getProductionById(id: string): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/getProductionById/${id}`
    );

  }

  // ===========================
  // Update Production
  // ===========================

  updateProduction(
    id: string,
    data: Production
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/updateProduction/${id}`,

      data

    );

  }

  // ===========================
  // Delete Production
  // ===========================


  deleteProduction(id: string): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/delete-production/${id}`

    );

  }
  // ======================================
  // AVAILABLE STOCK
  // ======================================

  getAvailableStock(
    warehouseId: string,
    rawMaterialId: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/available-stock?warehouseId=${warehouseId}&rawMaterialId=${rawMaterialId}`

    );

  }

  // ======================================
  // PRODUCT VARIANTS
  // ======================================

  getProductVariants(

    productId: string

  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/production/product-variants/${productId}`

    );

  }

  // ======================================
  // NEXT PRODUCTION NUMBER
  // ======================================


  getWarehouseRawMaterials(warehouseId: string) {

    return this.http.get(

      `${environment.apiUrl}/warehouse-raw-materials/${warehouseId}`

    );

  }

  getNextProductionNo(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/production/next-number`
    );

  }

}




// Get available stock by product

// getAvailableStockByProduct(productId: string): Observable<any> {

//   return this.http.get<any>(
//     `${environment.apiUrl}/stock-receive/available-stock/${productId}`
//   );

// }

// // Get stock receives by product

// getStockReceiveByProduct(productId: string): Observable<any> {

//   return this.http.get<any>(
//     `${environment.apiUrl}/stock-receive/product/${productId}`
//   );

// }

