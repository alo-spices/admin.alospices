import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // ==========================================
  // CREATE WAREHOUSE
  // ==========================================
  createWarehouse(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-warehouse`, data);
  }

  // ==========================================
  // GET ALL WAREHOUSES
  // ==========================================
  getAllWarehouses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getallwarehouse`);
  }

  // ==========================================
  // GET WAREHOUSE BY ID
  // ==========================================
  getWarehouseById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getbyid-warehouse/${id}`);
  }

  // ==========================================
  // UPDATE WAREHOUSE
  // ==========================================
  updateWarehouse(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-warehouse/${id}`, data);
  }

  // ==========================================
  // DELETE WAREHOUSE
  // ==========================================
  deleteWarehouse(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletewarehouse/${id}`);
  }
// warehouse lo yanni productions unnai
  getWarehouseDataById(warehouseId: string) {

  return this.http.get(
    `${environment.apiUrl}/warehouse/${warehouseId}`
  );

}

}