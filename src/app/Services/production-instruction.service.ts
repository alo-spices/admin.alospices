import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductionInstructionService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  // ==========================================
  // Get All Production Instructions
  // ==========================================

  getAllProductionInstructions(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-all-production-instructions`

    );

  }


  // ==========================================
  // UPDATE
  // ==========================================

  updateProductionInstruction(
    id: string,
    payload: any
  ) {

    return this.http.put(
      `${environment.apiUrl}/updateProductionInstruction/${id}`,
      payload
    );

  }

  // ==========================================
  // Create Production Instruction
  // ==========================================

  createProductionInstruction(
    data: any
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/create-production-instruction`,

      data

    );

  }



  // ==========================================
  // Delete Production Instruction
  // ==========================================

  deleteProductionInstruction(
    id: string
  ): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/delete-production-instruction/${id}`

    );

  }

  // ==========================================
  // Accept Production Instruction
  // ==========================================

  acceptProductionInstruction(
    id: string
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/acceptProductionInstruction/${id}`,

      {}

    );

  }



  // ==========================================
  // Get Production Instruction By ID
  // ==========================================

  getProductionInstructionById(
    id: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/getProductionInstructionById/${id}`
    );

  }
}
