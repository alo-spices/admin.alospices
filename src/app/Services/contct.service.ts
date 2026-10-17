import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Contact, ContactResponse, ContactListResponse } from '../Models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContctService {

 private apiUrl = environment.apiUrl;
 
   constructor(
     private http: HttpClient
   ) { }
 

  /* =====================================================
     CREATE CONTACT
     ===================================================== */

  createContact(
    data: Contact
  ): Observable<ContactResponse> {

    return this.http.post<ContactResponse>(
      `${this.apiUrl}/create-contact`,
      data
    );

  }


  /* =====================================================
     GET ALL CONTACTS
     ===================================================== */

  getAllContacts():
    Observable<ContactListResponse> {

    return this.http.get<ContactListResponse>(
      `${this.apiUrl}/getall-contacts`
    );

  }


  /* =====================================================
     GET CONTACT BY ID
     ===================================================== */

  getContactById(
    id: string
  ): Observable<ContactResponse> {

    return this.http.get<ContactResponse>(
      `${this.apiUrl}/get-contact/${id}`
    );

  }
}
