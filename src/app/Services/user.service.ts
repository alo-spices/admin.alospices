import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environment';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl =
    environment.apiUrl;

  constructor(
    private http:
      HttpClient
  ) { }

  /*
  GET ALL USERS
  */
  getAllUsers(role?: string): Observable<any> {

    let params: any = {};

    if (role) {
      params.role = role;
    }

    return this.http.get(
      `${this.apiUrl}/getall-users`,
      {
        params
      }
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
  /*
  GET USERS COUNT
  */
  getUsersCount():
    Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getUsersCount`
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

  getMyEmployees(distributorId: string): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/my-employees/${distributorId}`
    );

  }

  getMyEmployeeById(employeeId: string): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/my-employee-details/${employeeId}`
    );

  }
}
