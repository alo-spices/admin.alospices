import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseProductionService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  // ==========================================
  // Get All Warehouses
  // ==========================================

  getAllWarehouses(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getallwarehouse`

    );

  }


  // ==========================================
  // Get Production Instructions
  // By Warehouse
  // ==========================================

  getProductionInstructionsByWarehouse(
    warehouseId: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/production-instruction/warehouse/${warehouseId}`

    );

  }


  // ==========================================
  // Get All Production Instructions
  // ==========================================

  getAllProductionInstructions(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-all-production-instructions`

    );

  }


  // ==========================================
  // Get Production Instruction By ID
  // ==========================================

  getProductionInstructionById(
    id: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/production-instruction/${id}`

    );

  }


  // ==========================================
  // Delete Production Instruction
  // ==========================================

  deleteProductionInstruction(
    id: string
  ): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/production-instruction/${id}`

    );

  }
}
