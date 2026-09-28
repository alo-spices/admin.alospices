import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommomPopupService } from '../Services/commom-popup.service';
import { LoginService } from '../Services/login.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  // ==========================================
  // Login Data
  // ==========================================

  loginData = {

    mobile: '',

    password: '',

    role: ''

  };


  // ==========================================
  // Remember Me
  // ==========================================

  rememberMe = false;




  // ==========================================
  // Loading
  // ==========================================

  isLoading = false;


  constructor(

    private loginService:
      LoginService,

    private authService:
      AuthService,

    private router:
      Router,

    private alertService:
      CommomPopupService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    const rememberedMobile =
      localStorage.getItem(
        'rememberedMobile'
      );


    if (rememberedMobile) {

      this.loginData.mobile =
        rememberedMobile;

      this.rememberMe = true;

    }

  }





  // ==========================================
  // Mobile Validation
  // ==========================================

  validateMobileInput(
    event: Event
  ): void {

    const input =
      event.target as
      HTMLInputElement;


    input.value =
      input.value
        .replace(/\D/g, '')
        .slice(0, 10);


    this.loginData.mobile =
      input.value;

  }


  // ==========================================
  // Submit
  // ==========================================

  onSubmit(): void {


    // ========================================
    // Validate Role
    // ========================================

    if (
      !this.loginData.role
    ) {

      this.alertService.validation(
        'Please select your role'
      );

      return;

    }


    // ========================================
    // Validate Mobile
    // ========================================

    if (
      !this.loginData.mobile
    ) {

      this.alertService.validation(
        'Please enter your mobile number'
      );

      return;

    }


    if (
      this.loginData.mobile.length !== 10
    ) {

      this.alertService.validation(
        'Please enter a valid 10 digit mobile number'
      );

      return;

    }


    // ========================================
    // Validate Password
    // ========================================

    if (
      !this.loginData.password
    ) {

      this.alertService.validation(
        'Please enter your password'
      );

      return;

    }


    // ========================================
    // Loading
    // ========================================

    this.isLoading = true;


    // ========================================
    // ADMIN LOGIN
    // ========================================

    if (
      this.loginData.role === 'Admin'
    ) {

      this.loginAdmin();

      return;

    }


    // ========================================
    // USER LOGIN
    // ========================================

    this.loginUser();

  }


  // ==========================================
  // Admin Login
  // ==========================================

  loginAdmin(): void {

    const payload = {

      mobile:
        this.loginData.mobile,

      password:
        this.loginData.password

    };


    this.loginService
      .adminLogin(payload)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Admin Login Response:',
            response
          );


          this.isLoading = false;


          // ==================================
          // Store Token + User
          // ==================================

          this.authService.setLoginData(

            response.token,

            response.user

          );


          // ==================================
          // Remember Me
          // ==================================

          this.handleRememberMe();


          // ==================================
          // Admin Dashboard
          // ==================================

          this.alertService
            .success(
              response.message ||
              'Admin Login Successful'
            )
            .then(() => {

              this.router.navigate([
                '/admin/dashboard'
              ]);

            });

        },


        error: (error: any) => {

          this.isLoading = false;


          console.log(
            'Admin Login Error:',
            error
          );


          this.alertService.error(

            error?.error?.message ||
            'Admin Login Failed'

          );

        }

      });

  }


  // ==========================================
  // User Login
  // ==========================================

  loginUser(): void {

    const payload = {

      mobile:
        this.loginData.mobile,

      password:
        this.loginData.password,

      role:
        this.loginData.role

    };


    this.loginService
      .userLogin(payload)
      .subscribe({

        next: (response: any) => {

          console.log(
            'User Login Response:',
            response
          );


          this.isLoading = false;


          // ==================================
          // Store Token + User
          // ==================================

          this.authService.setLoginData(

            response.token,

            response.user

          );


          // ==================================
          // Remember Me
          // ==================================

          this.handleRememberMe();


          // ==================================
          // Navigate Based On Backend Role
          // ==================================

          this.navigateByRole(
            response?.user?.role
          );

        },


        error: (error: any) => {

          this.isLoading = false;


          console.log(
            'User Login Error:',
            error
          );


          this.alertService.error(

            error?.error?.message ||
            'Login Failed'

          );

        }

      });

  }


  // ==========================================
  // Role Based Navigation
  // ==========================================

  navigateByRole(
    role: string
  ): void {


    console.log(
      'Logged-in User Role:',
      role
    );


    switch (role) {


      // ======================================
      // ADMIN
      // ======================================

      case 'Admin':

        this.alertService
          .success(
            'Admin Login Successful'
          )
          .then(() => {

            this.router.navigate([
              '/admin/dashboard'
            ]);

          });

        break;


      // ======================================
      // SUB ADMIN
      // ======================================

      case 'SubAdmin':

        this.alertService
          .success(
            'SubAdmin Login Successful'
          )
          .then(() => {

            this.router.navigate([
              '/admin/subadmin-dashboard'
            ]);

          });

        break;


      // ======================================
      // WAREHOUSE MANAGER
      // ======================================

      case 'WarehouseManager':

        this.alertService
          .success(
            'Warehouse Manager Login Successful'
          )
          .then(() => {

            this.router.navigate([
              '/admin/warehouse-dashboard'
            ]);

          });

        break;


      // ======================================
      // DISTRIBUTOR
      // ======================================

      case 'Distributor':

        this.alertService
          .success(
            'Distributor Login Successful'
          )
          .then(() => {

            this.router.navigate([
              '/admin/distributor-dashboard'
            ]);

          });

        break;


      // ======================================
      // INVALID ROLE
      // ======================================

      default:

        console.error(
          'Invalid user role:',
          role
        );


        this.alertService.error(
          'Invalid user role'
        );

        break;

    }

  }


  // ==========================================
  // Remember Me
  // ==========================================

  handleRememberMe(): void {

    if (this.rememberMe) {

      localStorage.setItem(
        'rememberedMobile',
        this.loginData.mobile
      );

    }
    else {

      localStorage.removeItem(
        'rememberedMobile'
      );

    }

  }
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
