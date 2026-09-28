import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // ===========================
  // Register Employee
  // ===========================

  registerUser(formData: FormData): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/user-register`,

      formData

    );

  }


  // ===========================
  // Get All Users
  // ===========================

  getAllUsers(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getall-users`

    );

  }

  getUsersByRoles(
    roles: string[]
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getall-users`,

      {
        params: {
          roles: roles.join(',')
        }
      }

    );

  }
  // ===========================
  // Get User By Id
  // ===========================

  getUserById(id: string): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getbyid-users/${id}`

    );

  }


  // ===========================
  // Update User
  // ===========================

  updateUser(
    id: string,
    formData: FormData
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/update-users/${id}`,

      formData

    );

  }


  // ===========================
  // Delete User
  // ===========================

  deleteUser(id: string): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/delete-users/${id}`

    );

  }


  // ===========================
  // Get Profile
  // ===========================

  getProfile(id: string): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-profile/${id}`

    );

  }


  // ===========================
  // Update Profile
  // ===========================

  updateProfile(
    id: string,
    formData: FormData
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/update-profile/${id}`,

      formData

    );

  }

  // ==========================================
  // Change User Status
  // ==========================================

  changeStatus(
    id: string,
    status: string
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/change-status/${id}`,

      {
        status: status
      }

    );

  }


  // ===========================
  // Get Employee Orders
  // ===========================

  getEmployeeOrders(
    employeeId: string
  ): Observable<any> {

    return this.http.get(

      ` ${this.apiUrl}/employee-orders/${employeeId}`

    );

  }
  getEmployeeVisits(
    employeeId: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/employee-visits/${employeeId}`
    );

  }
  assignEmployeeToDistributor(
    employeeId: string,
    distributorId: string
  ) {
    return this.http.put(
      `${this.apiUrl}/assign-user/${employeeId}`,
      {
        assignmentType: 'DISTRIBUTOR',
        distributor: distributorId
      }
    );
  }
  // =====================================================
  // GET EMPLOYEES BY DISTRIBUTOR
  // =====================================================

  getEmployeesByDistributor(distributorId: string) {

    return this.http.get(
      `${this.apiUrl}/distributor/${distributorId}/employees`
    );

  }
  approveUser(userId: string) {

    return this.http.put(
      `${this.apiUrl}/approve-user/${userId}`,
      {}
    );

  }
}
