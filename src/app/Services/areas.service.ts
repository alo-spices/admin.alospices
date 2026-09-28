import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AreasService {


  private apiUrl =
    environment.apiUrl;

  constructor(
    private http:
      HttpClient
  ) { }

  getAllAreas(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getall-areas`
    );
  }

  // ==========================================
  // Create Area
  // ==========================================

  createArea(
    areaData: any
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/caret-areas`,
      areaData
    );

  }
  // ==========================================
  // Get Area By ID
  // ==========================================

  getAreaById(
    id: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getbyid-areas/${id}`

    );

  }


  // ==========================================
  // Update Area
  // ==========================================

  updateArea(
    id: string,
    areaData: any
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/update-areas/${id}`,

      areaData

    );

  }
}
