import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token =
      localStorage.getItem('token');

    console.log('AUTH TOKEN:', token);


    if (token) {

      const authReq =
        req.clone({

          setHeaders: {

            Authorization:
              `Bearer ${token}`

          }

        });


      console.log(
        'Authorization header added'
      );


      return next.handle(authReq);

    }


    console.log(
      'No JWT token found in localStorage'
    );


    return next.handle(req);

  }
}
