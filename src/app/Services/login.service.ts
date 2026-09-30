import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }
  // ==========================================
  // Admin Login
  // ==========================================

  adminLogin(
    loginData: any
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/admin-login`,

      loginData

    );

  }


  // ==========================================
  // User Login
  // ==========================================

  userLogin(
    loginData: any
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/user-login`,

      loginData

    );

  }

  logout() {

    return this.http.post(
      `${this.apiUrl}/admin/logout`,
      {}
    );

  }

  getDashboard() {
    return this.http.get<any>(
      `${this.apiUrl}/get-dashboard`
    );
  }
}
