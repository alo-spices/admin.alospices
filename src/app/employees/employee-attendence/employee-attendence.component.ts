import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendenceService } from 'src/app/Services/attendence.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-employee-attendence',
  templateUrl: './employee-attendence.component.html',
  styleUrls: ['./employee-attendence.component.css']
})
export class EmployeeAttendenceComponent implements OnInit {


  // ==========================================
  // Employee ID
  // ==========================================

  employeeId: string = '';


  // ==========================================
  // Employee
  // ==========================================

  employee: any = null;


  // ==========================================
  // Attendance List
  // ==========================================

  attendanceList: any[] = [];


  // ==========================================
  // Summary
  // ==========================================

  summary: any = {

    totalWorkingDays: 0,

    present: 0,

    absent: 0,

    halfDay: 0,

    totalOrders: 0,

    totalVisits: 0,

    totalCollections: 0,

    totalWorkingMinutes: 0

  };


  // ==========================================
  // Filters
  // ==========================================

  fromDate: string = '';

  toDate: string = '';


  // ==========================================
  // Loading
  // ==========================================

  isLoading = false;


  constructor(

    private route:
      ActivatedRoute,

    private router:
      Router,

    private employeeService:
      EmployeeService,

    private attendanceService:
      AttendenceService,

    private alertService:
      CommomPopupService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.employeeId =
      this.route.snapshot
        .paramMap
        .get('id') || '';


    console.log(
      'Employee ID:',
      this.employeeId
    );


    // ========================================
    // Validate Employee ID
    // ========================================

    if (!this.employeeId) {

      this.alertService.error(
        'Employee ID not found'
      );

      this.goBack();

      return;

    }


    // ========================================
    // Load Employee
    // ========================================

    this.getEmployeeById();


    // ========================================
    // Load Attendance
    // ========================================

    this.getEmployeeAttendance();

  }


  // ==========================================
  // Get Employee Details
  // ==========================================

  getEmployeeById(): void {

    this.employeeService
      .getUserById(
        this.employeeId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Employee Response:',
            response
          );


          this.employee =
            response?.data || null;

        },


        error: (error: any) => {

          console.log(
            'Employee Details Error:',
            error
          );


          this.employee = null;


          this.alertService.error(

            error?.error?.message ||

            'Failed to load employee details'

          );

        }

      });

  }


  // ==========================================
  // Get Employee Attendance
  // ==========================================

  getEmployeeAttendance(): void {

    this.isLoading = true;


    this.attendanceService
      .getAttendances(this.employeeId, this.fromDate, this.toDate)
      .subscribe({
        next: (response: any) => {
          console.log(
            'Attendance Response:',
            response
          );
          this.attendanceList = response?.data || [];
          // ==================================
          // Calculate Summary
          // ==================================
          this.calculateSummary();
          this.isLoading = false;
        },
        error: (error: any) => {
          console.log(
            'Attendance Error:',
            error
          );


          this.attendanceList = [];


          this.summary = {

            totalWorkingDays: 0,

            present: 0,

            absent: 0,

            halfDay: 0,

            totalOrders: 0,

            totalVisits: 0,

            totalCollections: 0,

            totalWorkingMinutes: 0

          };


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to load attendance'

          );

        }

      });

  }


  // ==========================================
  // Apply Filters
  // ==========================================

  applyFilters(): void {

    // ========================================
    // Date Validation
    // ========================================

    if (
      this.fromDate &&
      this.toDate
    ) {

      const from =
        new Date(
          this.fromDate
        );

      const to =
        new Date(
          this.toDate
        );


      if (from > to) {

        this.alertService.validation(

          'From Date cannot be greater than To Date'

        );

        return;

      }

    }


    // ========================================
    // Get Filtered Attendance
    // ========================================

    this.getEmployeeAttendance();

  }


  // ==========================================
  // Clear Filters
  // ==========================================

  clearFilters(): void {

    this.fromDate = '';

    this.toDate = '';


    // ========================================
    // Reload All Employee Attendance
    // ========================================

    this.getEmployeeAttendance();

  }


  // ==========================================
  // Calculate Summary
  // ==========================================

  calculateSummary(): void {

    const list =
      this.attendanceList || [];


    this.summary = {

      // ======================================
      // Working Days
      // ======================================

      totalWorkingDays:
        list.length,


      // ======================================
      // Present
      // ======================================

      present:
        list.filter(
          attendance =>
            attendance.attendanceStatus ===
            'Present'
        ).length,


      // ======================================
      // Absent
      // ======================================

      absent:
        list.filter(
          attendance =>
            attendance.attendanceStatus ===
            'Absent'
        ).length,


      // ======================================
      // Half Day
      // ======================================

      halfDay:
        list.filter(
          attendance =>
            attendance.attendanceStatus ===
            'Half Day'
        ).length,


      // ======================================
      // Orders
      // ======================================

      totalOrders:
        list.reduce(

          (
            total,
            attendance
          ) =>

            total +
            Number(
              attendance.totalOrders || 0
            ),

          0

        ),


      // ======================================
      // Visits
      // ======================================

      totalVisits:
        list.reduce(

          (
            total,
            attendance
          ) =>

            total +
            Number(
              attendance.totalVisits || 0
            ),

          0

        ),


      // ======================================
      // Collections
      // ======================================

      totalCollections:
        list.reduce(

          (
            total,
            attendance
          ) =>

            total +
            Number(
              attendance.totalCollections || 0
            ),

          0

        ),


      // ======================================
      // Working Minutes
      // ======================================

      totalWorkingMinutes:
        list.reduce(

          (
            total,
            attendance
          ) =>

            total +
            Number(
              attendance.totalWorkingMinutes || 0
            ),

          0

        )

    };

  }


  // ==========================================
  // Go Back
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

}
