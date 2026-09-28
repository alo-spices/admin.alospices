import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { RawMaterial } from '../Models/RawMaterial';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {

  private apiUrl = environment.apiUrl;

  constructor(

    private http: HttpClient

  ) { }

  // ======================================
  // CREATE
  // ======================================

  createRawMaterial(

    data: RawMaterial

  ): Observable<any> {

    return this.http.post<any>(

      `${this.apiUrl}/create-raw-material`,

      data

    );

  }

  // ======================================
  // GET ALL
  // ======================================

  getAllRawMaterials(

    search: string = "",

    page: number = 1,

    limit: number = 10,

    status: string = ""

  ): Observable<any> {

    return this.http.get<any>(

      `${this.apiUrl}/get-all-raw-materials?search=${search}&page=${page}&limit=${limit}&status=${status}`

    );

  }

  // ======================================
  // GET BY ID
  // ======================================

  getRawMaterialById(

    id: string

  ): Observable<any> {

    return this.http.get<any>(

      `${this.apiUrl}/getbyid-raw-material/${id}`

    );

  }

  // ======================================
  // UPDATE
  // ======================================

  updateRawMaterial(

    id: string,

    data: RawMaterial

  ): Observable<any> {

    return this.http.put<any>(

      `${this.apiUrl}/update-raw-material/${id}`,

      data

    );

  }

  // ======================================
  // DELETE
  // ======================================

  deleteRawMaterial(

    id: string

  ): Observable<any> {

    return this.http.delete<any>(

      `${this.apiUrl}/delete-raw-material/${id}`

    );

  }

  // ======================================
  // DROPDOWN
  // ======================================

  getRawMaterialDropdown(): Observable<any> {

    return this.http.get<any>(

      `${this.apiUrl}/raw-material-dropdown`

    );

  }
  getRawMaterialStock(
    warehouseId: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/raw-material-stock/${warehouseId}`

    );

  }
}
