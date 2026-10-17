import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { Employee } from 'src/app/Models/Employee';
import { UserService } from 'src/app/Services/user.service';
import { EmployeeViewDetailsComponent } from '../employee-view-details/employee-view-details.component';
import { EmployeeService } from 'src/app/Services/employee.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {


  // ==================================
  // Table Columns
  // ==================================

  displayedColumns: string[] = [
    'sno',
    'employee',
    'employeeCode',
    'role',
    'mobile',
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
  private commonPopup: CommomPopupService
    

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

    this.userService
      .getAllUsers()
      .subscribe({

        next: (res: any) => {

          console.log(
            'Users Response:',
            res
          );


          // ==================================
          // Get API Data
          // ==================================

          const allUsers: Employee[] =
            res?.data || [];


          // ==================================
          // Only Employee Roles
          // ==================================

          this.users =
            allUsers.filter(
              (user: Employee) =>
                this.employeeRoles.includes(
                  user.role
                )
            );


          // ==================================
          // Bind Table
          // ==================================

          this.dataSource.data =
            this.users;


          // ==================================
          // Re-assign Paginator & Sort
          // ==================================

          this.dataSource.paginator =
            this.paginator;

          this.dataSource.sort =
            this.sort;

        },

        error: (err: any) => {

          console.log(
            'Get Users Error:',
            err
          );

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
editUser(user: any): void {

  this.router.navigate([
    '/admin/update-employee',
    user._id
  ]);

}

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



getStatusClass(status: string): string {

  switch (status) {

    case 'Active':
      return 'active';

    case 'Inactive':
      return 'inactive';

    case 'Blocked':
      return 'blocked';

    case 'Pending':
      return 'pending';

    default:
      return '';

  }

}
openStatusPopup(user: any): void {

  this.commonPopup
    .changeStatus(
      user.status,
      user.fullName || user.firstName
    )
    .then((result: any) => {

      if (!result || !result.confirmed) {
        return;
      }

      const newStatus = result.status;

      // Same status select chesthe API call avasaram ledu
      if (newStatus === user.status) {

        return;

      }

      this.userService
        .updateStatus(
          user._id,
          newStatus
        )
        .subscribe({

          next: (response) => {

            // Update table immediately
            user.status = newStatus;

            this.commonPopup.success(
              response.message ||
              'User status updated successfully'
            );

          },

          error: (error) => {

            this.commonPopup.error(
              error.error?.message ||
              'Failed to update user status'
            );

          }

        });

    });

}

}
