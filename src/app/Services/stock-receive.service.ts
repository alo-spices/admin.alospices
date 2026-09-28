import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { StockReceive } from '../Models/StockReceive';

@Injectable({
  providedIn: 'root'
})
export class StockReceiveService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // ======================================
  // CREATE STOCK RECEIVE
  // ======================================

  createStockReceive(data: StockReceive): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/create-stock-receive`,
      data
    );

  }

  // ======================================
  // GET ALL STOCK RECEIVES
  // ======================================

  getAllStockReceives(): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/get-all-stock-receives`
    );

  }

  // ======================================
  // GET STOCK RECEIVE BY ID
  // ======================================

  getStockReceiveById(id: string): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/get-stock-receive/${id}`
    );

  }

  // product select chisaka stock avaliable
getAvailableStock(
  warehouseId: string,
  rawMaterialId: string
) {

  return this.http.get(

    `${environment.apiUrl}/available-stock?warehouseId=${warehouseId}&rawMaterialId=${rawMaterialId}`

  );

}
// ======================================
  // UPDATE STOCK RECEIVE
  // ======================================

  updateStockReceive(

    id: string,

    data: StockReceive

  ): Observable<any> {

    return this.http.put<any>(

      `${this.apiUrl}/update-stock-receive/${id}`,

      data

    );

  }

  // ======================================
  // DELETE STOCK RECEIVE
  // ======================================

  deleteStockReceive(

    id: string

  ): Observable<any> {

    return this.http.delete<any>(

      `${this.apiUrl}/delete-stock-receive/${id}`

    );

  }

  // warehouse / stock
getWarehouseStock(warehouseId: string) {

  return this.http.get(

    `${this.apiUrl}/warehouse-stock/${warehouseId}`

  );

}





}