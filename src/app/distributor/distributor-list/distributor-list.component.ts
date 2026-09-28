import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { Employee } from 'src/app/Models/Employee';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ChangeUserStatusComponent } from 'src/app/user/change-user-status/change-user-status.component';

@Component({
  selector: 'app-distributor-list',
  templateUrl: './distributor-list.component.html',
  styleUrls: ['./distributor-list.component.css']
})
export class DistributorListComponent implements OnInit, AfterViewInit {


  // ==================================
  // Table Columns
  // ==================================

  displayedColumns: string[] = [
    'sno',
    'employee',
    'employeeCode',
    'role',
    'mobile',
    'assignEmployee',
    'status',
    'actions'
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
    'Distributor'
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
      CommomPopupService

  ) { }


  // ==================================
  // On Init
  // ==================================

  ngOnInit(): void {

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

      'Distributor',



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
      '/admin/update-distributors',
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
      '/admin/view-distributor-details',
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

  assignEmployees(distributor: any): void {

    this.router.navigate(
      ['/admin/employees-list', distributor._id]
    );

  }

}
