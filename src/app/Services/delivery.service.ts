import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  // ==========================================
  // GET ALL DELIVERIES
  // ==========================================

  getAllDeliveries(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/getall-deliveries`
    );

  }

  // ==========================================
  // CREATE DELIVERY
  // ==========================================

  createDelivery(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/create-deliveries`,
      data
    );

  }

  getDeliveryById(deliveryId: string): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/getbyid-deliveries/${deliveryId}`
    );

  }
}
