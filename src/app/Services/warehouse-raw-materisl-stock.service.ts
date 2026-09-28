import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseRawMaterislStockService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // ==========================================
  // Get Raw Material Stock By Warehouse
  // ==========================================

  getRawMaterialStock(
    warehouseId: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}raw-material-stock/${warehouseId}`

    );

  }

  // ==========================================
  // Get Raw Material By ID
  // ==========================================

  getRawMaterialById(
    id: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getbyid-raw-material/${id}`

    );

  }
}
