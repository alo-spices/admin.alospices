import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class StockTransferService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  // ==========================================
  // CREATE STOCK TRANSFER
  // ==========================================

  createStockTransfer(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/create-stock-transfer`,
      data
    );

  }

  // ==========================================
  // Get All Stock Transfers
  // ==========================================

  getAllStockTransfers(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/get-all-stock-transfers`
    );

  }

  getNextTransferNumber(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/stock-transfer/next-number`
    );
  }

  receiveStockTransfer(id: string): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/incoming-transfers/${id}/receive`,
      {}
    );

  }

  getMyDistributorStock(distributorId: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/my-stock/${distributorId}`
    );
  }

  getDistributorStockHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stock-history`);
  }

  getStockTransferById(id: string): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/getStockTransferById/${id}`
    );

  }
}
