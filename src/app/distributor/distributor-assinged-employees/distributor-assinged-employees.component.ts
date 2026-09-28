import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-distributor-assinged-employees',
  templateUrl: './distributor-assinged-employees.component.html',
  styleUrls: ['./distributor-assinged-employees.component.css']
})
export class DistributorAssingedEmployeesComponent implements OnInit, AfterViewInit {


  // =====================================================
  // DISTRIBUTORS
  // =====================================================

  users: any[] = [];


  // =====================================================
  // SELECTED DISTRIBUTOR
  // =====================================================

  selectedDistributorId: string = '';

  selectedDistributor: any = null;


  // =====================================================
  // EMPLOYEES
  // =====================================================

  employees: any[] = [];


  // =====================================================
  // EMPLOYEE TABLE
  // =====================================================

  employeeDisplayedColumns: string[] = [
    'sno',
    'employee',
    'employeeCode',
    'role',
    'mobile'
  ];


  employeeDataSource =
    new MatTableDataSource<any>();


  // =====================================================
  // LOADING
  // =====================================================

  isLoading: boolean = false;


  // =====================================================
  // PAGINATOR
  // =====================================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  // =====================================================
  // SORT
  // =====================================================

  @ViewChild(MatSort)
  sort!: MatSort;


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private userService: EmployeeService
  ) { }


  // =====================================================
  // ON INIT
  // =====================================================

  ngOnInit(): void {


    // ==========================================
    // Get All Distributors
    // ==========================================

    this.getAllUsers();


    // ==========================================
    // Employee Search Filter
    // ==========================================

    this.employeeDataSource.filterPredicate = (

      data: any,

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
        (data.role || '')

      ).toLowerCase();

      return search.includes(filter);

    };

  }


  // =====================================================
  // AFTER VIEW INIT
  // =====================================================

  ngAfterViewInit(): void {

    this.employeeDataSource.paginator =
      this.paginator;

    this.employeeDataSource.sort =
      this.sort;

  }


  // =====================================================
  // GET ALL DISTRIBUTORS
  // =====================================================

  getAllUsers(): void {


    // ==========================================
    // Distributor Role
    // ==========================================

    const distributorRoles: string[] = [
      'Distributor'
    ];


    // ==========================================
    // API
    // ==========================================

    this.userService
      .getUsersByRoles(distributorRoles)

      .subscribe({

        next: (res: any) => {

          console.log(
            'Distributor Users Response:',
            res
          );


          // ====================================
          // API Data
          // ====================================

          this.users =
            res?.data || [];


        },


        error: (err: any) => {

          console.error(
            'Get Distributor Users Error:',
            err
          );


          this.users = [];

        }

      });

  }


  // =====================================================
  // DISTRIBUTOR DROPDOWN CHANGE
  // =====================================================

  onDistributorChange(
    distributorId: string
  ): void {


    console.log(
      'Selected Distributor ID:',
      distributorId
    );


    // ==========================================
    // Set Selected Distributor ID
    // ==========================================

    this.selectedDistributorId =
      distributorId;


    // ==========================================
    // Clear Existing Employees
    // ==========================================

    this.employees = [];

    this.employeeDataSource.data = [];


    // ==========================================
    // No Distributor Selected
    // ==========================================

    if (!distributorId) {

      this.selectedDistributor = null;

      return;

    }


    // ==========================================
    // Find Selected Distributor
    // ==========================================

    this.selectedDistributor =
      this.users.find(
        distributor =>
          distributor._id === distributorId
      );


    console.log(
      'Selected Distributor:',
      this.selectedDistributor
    );


    // ==========================================
    // Get Employees
    // ==========================================

    this.getEmployeesByDistributor(
      distributorId
    );

  }


  // =====================================================
  // GET EMPLOYEES BY DISTRIBUTOR
  // =====================================================

  getEmployeesByDistributor(
    distributorId: string
  ): void {


    // ==========================================
    // Validation
    // ==========================================

    if (!distributorId) {

      return;

    }


    // ==========================================
    // Loading
    // ==========================================

    this.isLoading = true;


    console.log(
      'Getting Employees For Distributor:',
      distributorId
    );


    // ==========================================
    // API
    // ==========================================

    this.userService
      .getEmployeesByDistributor(
        distributorId
      )

      .subscribe({

        next: (res: any) => {

          console.log(
            'Distributor Employees Response:',
            res
          );


          this.isLoading = false;


          // ====================================
          // API DATA
          // ====================================

          this.employees =
            res?.data || [];


          // ====================================
          // BIND TABLE
          // ====================================

          this.employeeDataSource.data =
            this.employees;


          // ====================================
          // PAGINATOR
          // ====================================

          this.employeeDataSource.paginator =
            this.paginator;


          // ====================================
          // SORT
          // ====================================

          this.employeeDataSource.sort =
            this.sort;


        },


        error: (err: any) => {

          console.error(
            'Get Distributor Employees Error:',
            err
          );


          this.isLoading = false;


          this.employees = [];

          this.employeeDataSource.data = [];

        }

      });

  }


  // =====================================================
  // SEARCH EMPLOYEES
  // =====================================================

  applyEmployeeFilter(
    event: Event
  ): void {


    const filterValue =
      (event.target as HTMLInputElement)
        .value;


    this.employeeDataSource.filter =
      filterValue
        .trim()
        .toLowerCase();


    // ==========================================
    // Reset Pagination
    // ==========================================

    if (
      this.employeeDataSource.paginator
    ) {

      this.employeeDataSource
        .paginator
        .firstPage();

    }

  }

}
