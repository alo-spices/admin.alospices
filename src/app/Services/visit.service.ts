import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  private apiUrl =
    'http://localhost:3002/api';

  constructor(
    private http: HttpClient
  ) { }


  // =========================================
  // GET ALL VISITS
  // =========================================

  getVisits(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/get-visits`
    );

  }


  // =========================================
  // GET VISIT BY ID
  // =========================================

  getVisitById(id: string): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/getbyid-visits/${id}`
    );

  }


  // =========================================
  // GET EMPLOYEE VISITS
  // =========================================

  getEmployeeVisits(
    employeeId: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/employee-visits/${employeeId}`
    );

  }


  // =========================================
  // TODAY VISITS
  // =========================================

  getTodayVisits(
    employeeId: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/today-visits/${employeeId}`
    );

  }


  // =========================================
  // VISIT SUMMARY
  // =========================================

  getVisitSummary(
    employeeId: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/visit-summary/${employeeId}`
    );

  }

}
