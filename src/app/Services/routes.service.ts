import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  private apiUrl =
    environment.apiUrl;


  constructor(
    private http: HttpClient
  ) { }


  // ==========================================
  // Get All Routes
  // ==========================================

  getAllRoutes(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getall-routes`

    );

  }

  // ==========================================
  // Create Route
  // ==========================================

  createRoute(
    routeData: any
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/create-routes`,

      routeData

    );

  }


  // ==========================================
  // Get Route By ID
  // ==========================================

  getRouteById(
    id: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getbyid-routes/${id}`

    );

  }


  // ==========================================
  // Update Route
  // ==========================================

  updateRoute(id: string, routeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-routes/${id}`, routeData);
  }

  getShopsByRoute(routeId: string) {
    return this.http.get(
      `${this.apiUrl}/get-shops-by-route/${routeId}`
    );
  }
}
