import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environment';
import { Banner } from '../Models/banner';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

 private apiUrl =
    environment.apiUrl;

  constructor(
    private http:
      HttpClient
  ) {}

  /*
  CREATE BANNER
  */
  createBanner(
    formData: FormData
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/createBanner`,
      formData
    );
  }

  /*
  GET ALL BANNERS
  */
  getAllBanners():
  Observable<Banner[]> {
    return this.http.get<Banner[]>(
      `${this.apiUrl}/get-brands`
    );
  }

  /*
  UPDATE BANNER
  */
  updateBanner(
    id: string,
    formData: FormData
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/updateBanner/${id}`,
      formData
    );
  }

  /*
  DELETE BANNER
  */
  deleteBanner(
    id: string
  ): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/deleteBanner/${id}`
    );
  }
}
