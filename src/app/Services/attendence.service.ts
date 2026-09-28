import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {


  private apiUrl =
    environment.apiUrl;


  constructor(
    private http: HttpClient
  ) { }


  // ==========================================
  // GET ALL ATTENDANCES
  // ==========================================

  getAttendances(
    employeeId?: string,
    fromDate?: string,
    toDate?: string
  ): Observable<any> {

    let params: any = {};


    if (employeeId) {

      params.employeeId =
        employeeId;

    }


    if (fromDate) {

      params.fromDate =
        fromDate;

    }


    if (toDate) {

      params.toDate =
        toDate;

    }


    return this.http.get(

      `${this.apiUrl}/get-attendances`,

      {
        params
      }

    );

  }


  // ==========================================
  // GET ATTENDANCE BY ID
  // ==========================================

  getAttendanceById(
    id: string
  ): Observable<any> {

    return this.http.get(

      ` ${this.apiUrl}/getbyid-attendances/${id}`

    );

  }


  // ==========================================
  // CREATE ATTENDANCE
  // ==========================================

  createAttendance(
    formData: FormData
  ): Observable<any> {

    return this.http.post(

      ` ${this.apiUrl}/create-attendances`,

      formData

    );

  }


  // ==========================================
  // CHECK IN
  // ==========================================

  checkIn(
    formData: FormData
  ): Observable<any> {

    return this.http.post(

      `  ${this.apiUrl}/chickin-attendance/checkin`,

      formData

    );

  }


  // ==========================================
  // CHECK OUT
  // ==========================================

  checkOut(
    id: string,
    formData: FormData
  ): Observable<any> {

    return this.http.put(

      ` ${this.apiUrl}/attendance/checkout/${id}`,

      formData

    );

  }


  // ==========================================
  // TODAY ATTENDANCE
  // ==========================================

  getTodayAttendance(
    employeeId: string
  ): Observable<any> {

    return this.http.get(

      ` ${this.apiUrl}/attendance/today/${employeeId}`

    );

  }


  // ==========================================
  // MONTHLY ATTENDANCE
  // ==========================================

  getMonthlyAttendance(
    employeeId: string
  ): Observable<any> {

    return this.http.get(

      `  ${this.apiUrl}/attendance/monthly/${employeeId}`

    );

  }


  // ==========================================
  // ATTENDANCE SUMMARY
  // ==========================================

  getAttendanceSummary(
    employeeId: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/attendance/summary/${employeeId}`

    );

  }
}
