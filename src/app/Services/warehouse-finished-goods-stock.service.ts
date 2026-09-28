import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseFinishedGoodsStockService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  // ==========================================
  // Get Finished Goods Stock By Warehouse
  // ==========================================

  getFinishedGoodsStockByWarehouse(
    warehouseId: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/finished-goods-stock/warehouse/${warehouseId}`

    );

  }

  // ==========================================
  // Get All Finished Goods Stock
  // ==========================================

  getAllFinishedGoodsStock(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/finished-goods-stock`

    );

  }
}
