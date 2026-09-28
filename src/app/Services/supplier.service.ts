import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Supplier } from '../Models/Supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

 private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // ======================================
  // CREATE SUPPLIER
  // ======================================

  createSupplier(data: Supplier): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/create-supplier`,
      data
    );

  }

  // ======================================
  // GET ALL SUPPLIERS
  // ======================================

  getAllSuppliers(): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/get-all-suppliers`
    );

  }

  // ======================================
  // GET SUPPLIER BY ID
  // ======================================

  getSupplierById(id: string): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/get-supplier/${id}`
    );

  }

  // ======================================
  // UPDATE SUPPLIER
  // ======================================

  updateSupplier(id: string, data: Supplier): Observable<any> {

    return this.http.put<any>(
      `${this.apiUrl}/update-supplier/${id}`,
      data
    );

  }

  // ======================================
  // DELETE SUPPLIER
  // ======================================

  deleteSupplier(id: string): Observable<any> {

    return this.http.delete<any>(
      `${this.apiUrl}/delete-supplier/${id}`
    );

  }

}
