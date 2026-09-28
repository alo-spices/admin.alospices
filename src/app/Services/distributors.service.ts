import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class DistributorsService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // ==========================================
  // Get Distributor Incoming Transfers
  // ==========================================

  getDistributorIncomingTransfers(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/incoming-transfers`
    );

  }

  // ==========================================
  // Update Stock Transfer Status
  // ==========================================

  updateStockTransferStatus(
    id: string,
    status: string
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/update-status/${id}`,
      {
        status: status
      }
    );

  }

  getDistributorTransferById(id: string): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/incoming-transfers/${id}`
    );

  }

  getDistributorOrders(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/get-orders`
    );

  }

  getOrderById(orderId: string): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/getbyid-orders/${orderId}`
    );

  }

  // ==========================================
  // GET ALL DISTRIBUTORS
  // ==========================================

  getAllDistributors(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/getall-users`,
      {
        params: {
          role: 'Distributor'
        }
      }
    );

  }
}
