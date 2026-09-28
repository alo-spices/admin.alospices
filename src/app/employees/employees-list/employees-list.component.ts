import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { Employee } from 'src/app/Models/Employee';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ChangeUserStatusComponent } from 'src/app/user/change-user-status/change-user-status.component';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit, AfterViewInit {
  // Selected Distributor ID
  distributorId: string = '';

  // Distributor details
  distributor: any = null;

  // Employees
  employees: any[] = [];

  // Search
  searchText: string = '';

  // Loading
  isLoading: boolean = false;

  // Assignment
  assigning: boolean = false;

  // Popup
  showAssignPopup: boolean = false;
  selectedEmployee: any = null;

  // ==================================
  // Table Columns
  // ==================================

  displayedColumns: string[] = [
    'sno',
    'employee',
    'employeeCode',
    'role',
    'mobile',
    'assignment',
  ];


  // ==================================
  // Data Source
  // ==================================

  dataSource = new MatTableDataSource<Employee>();


  // ==================================
  // Users
  // ==================================

  users: Employee[] = [];


  // ==================================
  // Employee Roles
  // ==================================

  employeeRoles: string[] = [
    'SalesManager',
    'Salesman',
    'Accountant',
    'DeliveryBoy'
  ];


  // ==================================
  // Paginator
  // ==================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  // ==================================
  // Sort
  // ==================================

  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(

    private userService: EmployeeService,

    private router: Router,

    private dialog: MatDialog,
    private alertService:
      CommomPopupService,
    private route: ActivatedRoute,

  ) { }


  // ==================================
  // On Init
  // ==================================

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {

      this.distributorId = params.get('id') || '';

      if (this.distributorId) {
        this.getDistributor();
        this.getAllUsers();
      }

    });

    this.getAllUsers();


    // ==================================
    // Search Filter
    // ==================================

    this.dataSource.filterPredicate = (

      data: Employee,

      filter: string

    ) => {

      const search = (

        (data.firstName || '') +

        ' ' +

        (data.lastName || '') +

        ' ' +

        (data.fullName || '') +

        ' ' +

        (data.employeeCode || '') +

        ' ' +

        (data.mobile || '') +

        ' ' +

        (data.email || '') +

        ' ' +

        (data.role || '') +

        ' ' +

        (data.status || '')

      ).toLowerCase();


      return search.includes(filter);

    };

  }

  // =====================================================
  // GET SELECTED DISTRIBUTOR
  // =====================================================

  getDistributor(): void {

    this.userService.getUserById(this.distributorId).subscribe({

      next: (response: any) => {

        if (response.success) {

          this.distributor = response.data;

        }

      },

      error: (error) => {

        console.error(
          'Failed to get distributor:',
          error
        );

      }

    });

  }


  // ==================================
  // After View Init
  // ==================================

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

    this.dataSource.sort =
      this.sort;

  }


  // ==================================
  // Get All Users
  // ==================================

  getAllUsers(): void {

    // ==========================================
    // Employee Roles
    // ==========================================

    const employeeRoles: string[] = [

      'Salesman', 'DeliveryBoy'

    ];


    // ==========================================
    // API
    // ==========================================

    this.userService.getUsersByRoles(
      employeeRoles
    )
      .subscribe({

        next: (res: any) => {

          console.log(
            'Employee Users Response:',
            res
          );


          // ====================================
          // API Data
          // ====================================

          this.users =
            res?.data || [];


          // ====================================
          // Bind Table
          // ====================================

          this.dataSource.data =
            this.users;


          // ====================================
          // Paginator
          // ====================================

          this.dataSource.paginator =
            this.paginator;


          // ====================================
          // Sort
          // ====================================

          this.dataSource.sort =
            this.sort;

        },


        error: (err: any) => {

          console.log(
            'Get Employee Users Error:',
            err
          );


          this.users = [];

          this.dataSource.data = [];

        }

      });

  }

  // ==================================
  // Search
  // ==================================

  applyFilter(event: Event): void {

    const filterValue =
      (event.target as HTMLInputElement)
        .value;


    this.dataSource.filter =
      filterValue
        .trim()
        .toLowerCase();


    // ==================================
    // Reset To First Page
    // ==================================

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }


  // ==================================
  // Create Employee
  // ==================================

  goToCreateUser(): void {

    this.router.navigate([
      '/admin/create-user'
    ]);

  }


  // ==================================
  // Edit Employee
  // ==================================

  editUser(user: Employee): void {

    if (!user._id) {
      return;
    }


    this.router.navigate([
      '/admin/update-user',
      user._id
    ]);

  }


  // ==================================
  // View Employee
  // ==================================

  // ==========================================
  // View User
  // ==========================================

  // viewUser(user: any): void {
  //   console.log(user.data, 'user view details');
  //   if (!user?._id) {
  //     return;

  //   }


  //   this.router.navigate([

  //     '/admin/view-users',

  //     user._id

  //   ]);

  // }

  // ==================================
  // View Employee
  // ==================================

  viewUser(user: Employee): void {

    if (!user?._id) {
      console.error('Employee ID not found');
      return;
    }

    this.router.navigate([
      '/admin/employee-view-details',
      user._id
    ]);

  }



  // ==================================
  // Delete Employee
  // ==================================

  deleteUser(user: Employee): void {

    if (!user._id) {
      return;
    }


    const dialogRef =
      this.dialog.open(

        DeleteConfirmationComponent,

        {

          width: '400px'

        }

      );


    dialogRef
      .afterClosed()
      .subscribe(result => {


        // ==================================
        // Cancel
        // ==================================

        if (!result) {
          return;
        }


        // ==================================
        // Delete API
        // ==================================

        this.userService
          .deleteUser(user._id!)
          .subscribe({

            next: (res: any) => {

              alert(
                res?.message ||
                'Employee deleted successfully'
              );


              // ==================================
              // Reload List
              // ==================================

              this.getAllUsers();

            },


            error: (err: any) => {

              console.log(
                'Delete User Error:',
                err
              );


              alert(
                err?.error?.message ||
                'Unable to delete employee'
              );

            }

          });

      });

  }

  // ==========================================
  // Change User Status
  // ==========================================

  changeUserStatus(
    user: any
  ): void {

    if (!user?._id) {

      this.alertService.error(
        'User ID not found'
      );

      return;

    }


    const dialogRef =
      this.dialog.open(
        ChangeUserStatusComponent,
        {

          width: '420px',

          maxWidth: '95vw',

          panelClass:
            'user-status-dialog',

          disableClose: true,

          data: {

            id:
              user._id,

            status:
              user.status

          }

        }
      );


    dialogRef
      .afterClosed()
      .subscribe((result: any) => {

        if (
          !result?.confirmed ||
          !result?.status
        ) {

          return;

        }


        this.updateUserStatus(

          user._id,

          result.status

        );

      });

  }
  // ==========================================
  // Update User Status API
  // ==========================================

  updateUserStatus(
    userId: string,
    status: string
  ): void {

    this.userService
      .changeStatus(
        userId,
        status
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Status Update Response:',
            response
          );


          this.alertService.success(

            response?.message ||

            'User status updated successfully'

          );


          // Refresh list

          this.getAllUsers();

        },


        error: (error: any) => {

          console.log(
            'Status Update Error:',
            error
          );


          this.alertService.error(

            error?.error?.message ||

            'Failed to update user status'

          );

        }

      });

  }
  // =====================================================
  // ASSIGN BUTTON CLICK
  // =====================================================

  assignEmployee(employee: any): void {

    this.selectedEmployee = employee;

    this.showAssignPopup = true;

  }


  // =====================================================
  // CLOSE POPUP
  // =====================================================

  closeAssignPopup(): void {

    if (this.assigning) {
      return;
    }

    this.showAssignPopup = false;

    this.selectedEmployee = null;

  }


  // =====================================================
  // YES - CONFIRM ASSIGNMENT
  // =====================================================

  confirmAssign(): void {

    console.log('==============================');
    console.log('1. CONFIRM BUTTON CLICKED');
    console.log('Selected Employee:', this.selectedEmployee);
    console.log('Distributor ID:', this.distributorId);

    if (!this.selectedEmployee?._id) {
      console.error('Employee ID NOT FOUND');
      return;
    }

    if (!this.distributorId) {
      console.error('Distributor ID NOT FOUND');
      return;
    }

    const employeeId = this.selectedEmployee._id;
    const distributorId = this.distributorId;

    console.log('2. Employee ID:', employeeId);
    console.log('3. Distributor ID:', distributorId);

    this.assigning = true;

    console.log('4. BEFORE SERVICE CALL');

    this.userService
      .assignEmployeeToDistributor(
        employeeId,
        distributorId
      )
      .subscribe({

        next: (response: any) => {

          console.log('5. API SUCCESS RESPONSE:', response);

          this.assigning = false;

          if (response?.success) {

            this.showAssignPopup = false;
            this.selectedEmployee = null;

            this.alertService.success(
              response?.message ||
              'Employee assigned successfully'
            );

            this.getAllUsers();

          } else {

            console.error(
              'API returned success=false:',
              response
            );

          }

        },

        error: (error: any) => {

          console.error('6. API ERROR:', error);
          console.error('Error body:', error?.error);

          this.assigning = false;

          this.alertService.error(
            error?.error?.message ||
            'Failed to assign employee'
          );

        }

      });

    console.log('7. AFTER SERVICE SUBSCRIBE');

  }

  // =====================================================
  // CHECK EMPLOYEE ASSIGNMENT
  // =====================================================

  getAssignmentStatus(employee: any): string {

    // No distributor assignment
    if (
      employee?.assignmentType !== 'DISTRIBUTOR' ||
      !employee?.distributor
    ) {
      return 'NOT_ASSIGNED';
    }

    // Already assigned to current distributor
    if (
      employee.distributor?._id === this.distributorId
    ) {
      return 'ALREADY_ASSIGNED';
    }

    // Assigned to another distributor
    return 'OTHER_DISTRIBUTOR';
  }
}
