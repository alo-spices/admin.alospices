import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environment';
import { Address } from '../Models/Address';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

   private apiUrl =
    environment.apiUrl;

  constructor(
    private http:
      HttpClient
  ) {}

  /*
  GET ALL ADDRESSES
  */
  getAllAddresses():
  Observable<Address[]> {
    return this.http.get<Address[]>(
      `${this.apiUrl}/getAllAddress`
    );
  }

}
