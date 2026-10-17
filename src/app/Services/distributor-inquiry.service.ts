import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { DistributorInquiryListResponse, DistributorInquiryResponse } from '../Models/DistributorInquiry';

@Injectable({
  providedIn: 'root'
})
export class DistributorInquiryService {

  private apiUrl = environment.apiUrl;
 
   constructor(
     private http: HttpClient
   ) { }
    // CREATE
  createInquiry(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/create-inquiry`,
      data
    );

  }


  // GET ALL
  getAllInquiries(): Observable<DistributorInquiryListResponse> {

    return this.http.get<DistributorInquiryListResponse>(
      `${this.apiUrl}/getall-inquiries`
    );

  }

  // =====================================================
  // GET BY ID
  // =====================================================

 getInquiryById(id: string): Observable<DistributorInquiryResponse> {

  return this.http.get<DistributorInquiryResponse>(
    `${this.apiUrl}/getbyinquiry/${id}`
  );

}
}
