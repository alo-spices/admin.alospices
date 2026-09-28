import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Attendance, AttendanceSummary } from 'src/app/Models/Attendance ';
import { Order } from 'src/app/Models/Order';
import { AttendenceService } from 'src/app/Services/attendence.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-employee-view-details',
  templateUrl: './employee-view-details.component.html',
  styleUrls: ['./employee-view-details.component.css']
})
export class EmployeeViewDetailsComponent implements OnInit {


  orderList: Order[] = [];

  showOrders = false;

  isOrdersLoading = false;
  // ==========================================
  // EMPLOYEE
  // ==========================================

  employee: any = null;


  // ==========================================
  // ATTENDANCE
  // ==========================================

  attendanceList: Attendance[] = [];

  summary: AttendanceSummary | null = null;


  // ==========================================
  // LOADING
  // ==========================================

  isLoading = false;


  constructor(

    private route: ActivatedRoute,

    private router: Router,

    private employeeService: EmployeeService,

    private attendanceService:
      AttendenceService,
    private alertService: CommomPopupService

  ) { }


  // ==========================================
  // ON INIT
  // ==========================================

  ngOnInit(): void {

    const employeeId =
      this.route.snapshot.paramMap.get('id');


    if (!employeeId) {

      console.error(
        'Employee ID not found'
      );

      this.goBack();

      return;

    }


    this.loadEmployee(employeeId);

  }


  // ==========================================
  // LOAD EMPLOYEE
  // ==========================================

  loadEmployee(employeeId: string): void {

    this.isLoading = true;


    this.employeeService
      .getUserById(employeeId)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Employee Details:',
            response
          );


          if (response?.success) {

            this.employee =
              response.data;

            this.loadEmployeeAttendance(
              employeeId
            );

          }
          else {

            this.employee = null;

            this.isLoading = false;

          }

        },


        error: (error: any) => {

          console.error(
            'Employee Error:',
            error
          );

          this.employee = null;

          this.isLoading = false;

        }

      });

  }


  // ==========================================
  // LOAD ATTENDANCE
  // ==========================================

  loadEmployeeAttendance(
    employeeId: string
  ): void {


    // ========================================
    // MONTHLY ATTENDANCE
    // ========================================

    this.attendanceService
      .getMonthlyAttendance(employeeId)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Monthly Attendance:',
            response
          );


          if (
            response?.success &&
            Array.isArray(response.data)
          ) {

            this.attendanceList =
              response.data;

          }
          else {

            this.attendanceList = [];

          }


          this.isLoading = false;

        },


        error: (error: any) => {

          console.error(
            'Attendance Error:',
            error
          );

          this.attendanceList = [];

          this.isLoading = false;

        }

      });


    // ========================================
    // ATTENDANCE SUMMARY
    // ========================================

    this.attendanceService
      .getAttendanceSummary(employeeId)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Attendance Summary:',
            response
          );


          if (response?.success) {

            this.summary =
              response.data;

          }
          else {

            this.summary = null;

          }

        },


        error: (error: any) => {

          console.error(
            'Summary Error:',
            error
          );

          this.summary = null;

        }

      });

  }
  // ==========================================
  // LOAD EMPLOYEE ORDERS
  // ==========================================

  openOrders(): void {

    const employeeId =
      this.employee?._id;

    if (!employeeId) {

      console.error(
        'Employee ID not found'
      );

      return;

    }

    this.showOrders = true;

    this.isOrdersLoading = true;

    this.employeeService.getEmployeeOrders(employeeId)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Employee Orders:',
            response
          );

          if (
            response?.success &&
            Array.isArray(response.data)
          ) {

            this.orderList =
              response.data;

          }
          else {

            this.orderList = [];

          }

          this.isOrdersLoading = false;

        },

        error: (error: any) => {

          console.error(
            'Orders Error:',
            error
          );

          this.orderList = [];

          this.isOrdersLoading = false;

        }

      });

  }
  // ==========================================
  // VIEW EMPLOYEE ORDERS
  // ==========================================

  viewEmployeeOrders(): void {

    const employeeId = this.employee?._id;

    if (!employeeId) {

      console.error(
        'Employee ID not found'
      );

      return;
    }

    this.router.navigate([
      '/admin/employee-orders',
      employeeId
    ]);

  }
  // ==========================================
  // VIEW EMPLOYEE VISITS
  // ==========================================

  viewEmployeeVisits(): void {

    const employeeId =
      this.employee?._id;

    if (!employeeId) {

      console.error(
        'Employee ID not found'
      );

      return;
    }

    this.router.navigate([
      '/admin/employee-visits',
      employeeId
    ]);

  }


  // ==========================================
  // BACK
  // ==========================================

  goBack(): void {

    const userData = localStorage.getItem('user');

    if (userData) {

      const user = JSON.parse(userData);

      if (user?.role === 'Distributor') {

        this.router.navigate([
          '/admin/distributor-my-employees'
        ]);

      } else {

        this.router.navigate([
          '/admin/users-list'
        ]);

      }

    } else {

      this.router.navigate([
        '/admin/users-list'
      ]);

    }

  }

  // ==========================================
  // View Employee Attendance
  // ==========================================

  viewEmployeeAttendance(): void {

    if (!this.employee?._id) {

      this.alertService.error(
        'Employee ID not found'
      );

      return;

    }


    this.router.navigate([

      '/admin/employee-attendance',

      this.employee._id

    ]);

  }

}