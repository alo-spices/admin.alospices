import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance, UserReference } from 'src/app/Models/Attendance';
import { AttendanceServiceService } from 'src/app/Services/attendance-service.service';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit, AfterViewInit {


  // ==========================================
  // TABLE COLUMNS
  // ==========================================

  displayedColumns: string[] = [

    'employee',

    'attendanceDate',

    'checkInTime',

    'checkOutTime',

    'workingHours',

    'visits',

    'orders',

    'collections',

    'attendanceStatus',

    'status'

  ];


  // ==========================================
  // DATA SOURCE
  // ==========================================

  dataSource =
    new MatTableDataSource<Attendance>([]);


  // ==========================================
  // LOADING
  // ==========================================

  isLoading = false;


  // ==========================================
  // PAGINATOR
  // ==========================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  // ==========================================
  // SORT
  // ==========================================

  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(

    private attendanceService:
      AttendanceServiceService,

    private alertService:
      CommomPopupService

  ) { }


  // ==========================================
  // ON INIT
  // ==========================================

  ngOnInit(): void {

    this.getAttendances();

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
  // GET ALL ATTENDANCES
  // ==========================================

  getAttendances(): void {

    this.isLoading = true;


    this.attendanceService
      .getAttendances()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Attendance Response:',
            response
          );


          if (
            response?.success
          ) {

            this.dataSource.data =
              response.data || [];

          }
          else {

            this.dataSource.data = [];

            this.alertService.error(

              response?.message ||
              'Failed to load attendance.'

            );

          }


          this.isLoading = false;


          // Re-assign paginator and sort

          setTimeout(() => {

            this.dataSource.paginator =
              this.paginator;

            this.dataSource.sort =
              this.sort;

          });

        },


        error: (error: any) => {

          console.error(
            'Attendance Error:',
            error
          );

          this.isLoading = false;

          this.dataSource.data = [];

          this.alertService.error(

            error?.error?.message ||
            'Failed to load attendance.'

          );

        }

      });

  }


  // ==========================================
  // SEARCH
  // ==========================================

  applyFilter(
    event: Event
  ): void {

    const value =
      (
        event.target as HTMLInputElement
      ).value;

    this.dataSource.filter =
      value.trim().toLowerCase();


    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }


  // ==========================================
  // EMPLOYEE NAME
  // ==========================================

  getEmployeeName(
    employee: string | UserReference
  ): string {

    if (!employee) {

      return '-';

    }


    if (typeof employee === 'string') {

      return employee;

    }


    if (employee.fullName) {

      return employee.fullName;

    }


    return `${employee.firstName || ''} ${employee.lastName || ''}`
      .trim() || '-';

  }


  // ==========================================
  // EMPLOYEE CODE
  // ==========================================

  getEmployeeCode(
    employee: string | UserReference
  ): string {

    if (
      typeof employee === 'object' &&
      employee?.employeeCode
    ) {

      return employee.employeeCode;

    }

    return '-';

  }


  // ==========================================
  // DATE FORMAT
  // ==========================================

  formatDate(
    date: Date | string | null | undefined
  ): string {

    if (!date) {

      return '-';

    }


    return new Date(date)
      .toLocaleDateString(
        'en-IN',
        {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }
      );

  }


  // ==========================================
  // TIME FORMAT
  // ==========================================

  formatTime(
    date: Date | string | null | undefined
  ): string {

    if (!date) {

      return '-';

    }


    return new Date(date)
      .toLocaleTimeString(
        'en-IN',
        {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }
      );

  }


  // ==========================================
  // WORKING HOURS
  // ==========================================

  getWorkingHours(
    minutes: number | undefined
  ): string {

    if (!minutes || minutes <= 0) {

      return '0h 0m';

    }


    const hours =
      Math.floor(minutes / 60);

    const remainingMinutes =
      minutes % 60;


    return `${hours}h ${remainingMinutes}m`;

  }


  // ==========================================
  // STATUS CLASS
  // ==========================================

  getAttendanceStatusClass(
    status: string | undefined
  ): string {

    switch (status) {

      case 'Present':
        return 'present';

      case 'Absent':
        return 'absent';

      case 'Half Day':
        return 'half-day';

      default:
        return '';

    }

  }


  // ==========================================
  // CHECK STATUS CLASS
  // ==========================================

  getStatusClass(
    status: string | undefined
  ): string {

    switch (status) {

      case 'CheckedIn':
        return 'checked-in';

      case 'CheckedOut':
        return 'checked-out';

      default:
        return '';

    }

  }
  viewAttendance(element: Attendance) {
  // TODO: implement view
}

editAttendance(element: Attendance) {
  // TODO: implement edit
}

deleteAttendance(element: Attendance) {
  // TODO: implement delete
}
}