import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  // ==================================
  // Get All Collections
  // ==================================

  getAllCollections(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/get-collections`
    );

  }



  // ==================================
  // Get Collection By ID
  // ==================================

  getCollectionById(
    collectionId: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/get-collection/${collectionId}`
    );

  }

  // ==========================================
  // GET OUTSTANDING LIST
  // ==========================================
  getOutstanding() {
    return this.http.get<any>(`${this.apiUrl}/get-outstanding`);
  }

  getOutstandingById(
    partyId: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/get-party-outstanding/${partyId}`
    );

  }
}
