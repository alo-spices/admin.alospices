import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-view-user-details',
  templateUrl: './view-user-details.component.html',
  styleUrls: ['./view-user-details.component.css']
})
export class ViewUserDetailsComponent implements OnInit {


  // ==========================================
  // User Details
  // ==========================================

  user: any = null;


  // ==========================================
  // User ID
  // ==========================================

  userId: string = '';


  // ==========================================
  // Loading
  // ==========================================

  isLoading = false;


  constructor(

    private route:
      ActivatedRoute,

    private router:
      Router,

    private userService:
      EmployeeService,

    private alertService:
      CommomPopupService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    // ========================================
    // Get ID From URL
    // ========================================

    this.userId = this.route.snapshot.paramMap.get('id') || '';


    // ========================================
    // Validate ID
    // ========================================

    if (!this.userId) {

      this.alertService.error(
        'User ID not found'
      );

      this.goBack();

      return;

    }


    // ========================================
    // Load User
    // ========================================

    this.getUserById();

  }


  // ==========================================
  // Get User By ID
  // ==========================================

  getUserById(): void {

    this.isLoading = true;


    this.userService
      .getUserById(
        this.userId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'User Details Response:',
            response
          );


          // ====================================
          // Bind User
          // ====================================

          this.user =
            response?.data || null;


          // ====================================
          // Loading
          // ====================================

          this.isLoading = false;


          // ====================================
          // No Data
          // ====================================

          if (!this.user) {

            this.alertService.error(
              'User details not found'
            );

          }

        },


        error: (error: any) => {

          console.log(
            'Get User Details Error:',
            error
          );


          this.user = null;

          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to load user details'

          );

        }

      });

  }


  // ==========================================
  // Role Label
  // ==========================================

  getRoleLabel(
    role: string
  ): string {

    const roleLabels: {
      [key: string]: string
    } = {

      Admin:
        'Admin',

      SubAdmin:
        'Sub Admin',

      WarehouseManager:
        'Warehouse Manager',

      SalesManager:
        'Sales Manager',

      Salesman:
        'Salesman',

      Accountant:
        'Accountant',

      DeliveryBoy:
        'Delivery Boy',

      Distributor:
        'Distributor'

    };


    return (
      roleLabels[role] ||
      role ||
      '-'
    );

  }


  // ==========================================
  // Status Label
  // ==========================================

  getStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'Active':

        return 'active';


      case 'Pending':

        return 'pending';


      case 'Blocked':

        return 'blocked';


      case 'Inactive':

        return 'inactive';


      default:

        return 'inactive';

    }

  }


  // ==========================================
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/users-list'

    ]);

  }


}
