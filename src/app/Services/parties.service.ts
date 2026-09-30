import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class PartiesService {


  private apiUrl =
    environment.apiUrl;


  constructor(
    private http: HttpClient
  ) { }


  // ==========================================
  // Get All Parties
  // ==========================================

  getAllParties(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/getall-parties`
    );

  }

  getShopsByRoute(routeId: string) {

    return this.http.get(
      `${this.apiUrl}/get-shops-by-route/${routeId}`
    );

  }

  getPartyById(partyId: string) {
    return this.http.get<any>(
      `${this.apiUrl}/getbyid-parties/${partyId}`
    );
  }
}
