import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/Services/user.service';
import { DistributorEmployeesDetailsViewComponent } from '../distributor-employees-details-view/distributor-employees-details-view.component';
import { Employee } from 'src/app/Models/Employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-distributor-employees',
  templateUrl: './distributor-employees.component.html',
  styleUrls: ['./distributor-employees.component.css']
})
export class DistributorEmployeesComponent implements OnInit, AfterViewInit {

  // ==========================================
  // TABLE COLUMNS
  // ==========================================

  displayedColumns: string[] = [
    'sno',
    'employee',
    'mobile',
    'email',
    'role',
    'area',
    'route',
    'status',
    'actions'
  ];


  // ==========================================
  // DATA SOURCE
  // ==========================================

  dataSource = new MatTableDataSource<any>();

  employeesList: any[] = [];

  isLoading: boolean = false;


  // ==========================================
  // PAGINATOR & SORT
  // ==========================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;


  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) { }


  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    this.getMyEmployees();


    // ========================================
    // SEARCH FILTER
    // ========================================

    this.dataSource.filterPredicate = (
      data: any,
      filter: string
    ) => {

      const employeeName =
        data?.fullName ||
        `${data?.firstName || ''} ${data?.lastName || ''}`;

      const searchText = [

        employeeName,

        data?.employeeCode || '',

        data?.mobile || '',

        data?.email || '',

        data?.role || '',

        data?.area?.areaName || '',

        data?.route?.routeName || ''

      ]
        .join(' ')
        .toLowerCase();

      return searchText.includes(filter);

    };

  }


  // ==========================================
  // AFTER VIEW INIT
  // ==========================================

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

    this.dataSource.sort =
      this.sort;

  }


  // ==========================================
  // GET MY EMPLOYEES
  // ==========================================

  getMyEmployees() {

    const userData = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    const distributorId = userData?.id;

    console.log("🔥 DISTRIBUTOR ID:", distributorId);

    if (!distributorId) {

      console.error("Distributor ID not found");

      return;

    }

    this.isLoading = true;

    this.userService
      .getMyEmployees(distributorId)
      .subscribe({

        next: (response: any) => {

          this.isLoading = false;

          console.log(
            "🔥 MY EMPLOYEES RESPONSE:",
            response
          );

          this.employeesList =
            response?.data || [];

          this.dataSource.data =
            this.employeesList;

        },

        error: (error: any) => {

          this.isLoading = false;

          console.error(
            "❌ MY EMPLOYEES ERROR:",
            error
          );

        }

      });

  }


  // ==========================================
  // SEARCH
  // ==========================================

  applyFilter(event: Event): void {

    const filterValue =
      (event.target as HTMLInputElement).value;

    this.dataSource.filter =
      filterValue
        .trim()
        .toLowerCase();


    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }
  viewEmployee(user: Employee): void {

    if (!user?._id) {
      console.error('Employee ID not found');
      return;
    }

    this.router.navigate([
      '/admin/employee-view-details',
      user._id
    ]);

  }
  // viewEmployee(employee: any): void {

  //   if (!employee?._id) {

  //     console.error(
  //       'Employee ID not found:',
  //       employee
  //     );

  //     return;

  //   }

  //   this.userService
  //     .getMyEmployeeById(employee._id)
  //     .subscribe({

  //       next: (response: any) => {

  //         console.log(
  //           'Employee Details:',
  //           response
  //         );

  //         if (response?.success) {

  //           this.dialog.open(
  //             DistributorEmployeesDetailsViewComponent,
  //             {
  //               width: '650px',
  //               maxWidth: '95vw',
  //               data: response.data,
  //               panelClass: 'employee-details-dialog'
  //             }
  //           );

  //         }

  //       },

  //       error: (error: any) => {

  //         console.error(
  //           'Get Employee Details Error:',
  //           error
  //         );

  //       }

  //     });

  // }
}
