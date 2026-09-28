import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';

  private userKey = 'user';

  constructor(
    private router: Router
  ) { }


  // ==========================================
  // Store Login Data
  // ==========================================

  setLoginData(
    token: string,
    user: any
  ): void {

    localStorage.setItem(
      this.tokenKey,
      token
    );

    localStorage.setItem(
      this.userKey,
      JSON.stringify(user)
    );

  }


  // ==========================================
  // Get Token
  // ==========================================

  getToken(): string | null {

    return localStorage.getItem(
      this.tokenKey
    );

  }


  // ==========================================
  // Get User
  // ==========================================

  getUser(): any {

    const user =
      localStorage.getItem(
        this.userKey
      );


    if (!user) {

      return null;

    }


    try {

      return JSON.parse(user);

    } catch {

      return null;

    }

  }


  // ==========================================
  // Get Role
  // ==========================================

  getRole(): string | null {

    return this.getUser()?.role || null;

  }


  // ==========================================
  // Get Warehouse ID
  // ==========================================

  getWarehouseId(): string | null {

    return (
      this.getUser()
        ?.warehouse
        ?._id || null
    );

  }


  // ==========================================
  // Get Area ID
  // ==========================================

  getAreaId(): string | null {

    return (
      this.getUser()
        ?.area
        ?._id || null
    );

  }


  // ==========================================
  // Is Logged In
  // ==========================================

  isLoggedIn(): boolean {

    return !!this.getToken();

  }


  // ==========================================
  // Logout
  // ==========================================

  logout(): void {

    localStorage.removeItem(
      this.tokenKey
    );

    localStorage.removeItem(
      this.userKey
    );

    this.router.navigate([
      '/login'
    ]);

  }
}
