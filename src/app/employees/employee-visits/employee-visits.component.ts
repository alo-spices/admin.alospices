import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';
import { VisitService } from 'src/app/Services/visit.service';

@Component({
  selector: 'app-employee-visits',
  templateUrl: './employee-visits.component.html',
  styleUrls: ['./employee-visits.component.css']
})
export class EmployeeVisitsComponent implements OnInit {


  employeeId: string = '';

  employee: any = null;

  visits: any[] = [];

  isLoading = false;


  constructor(

    private route: ActivatedRoute,

    private router: Router,

    private employeeService:
      EmployeeService,
    private visitservices: VisitService



  ) { }


  // ==========================================
  // INIT
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

    this.loadEmployee();
    this.loadEmployeeVisits(employeeId);

  }


  // ==========================================
  // EMPLOYEE
  // ==========================================

  loadEmployee(): void {

    this.employeeService
      .getUserById(this.employeeId)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Employee Details:',
            response
          );


          if (response?.success) {

            this.employee =
              response.data;

          }

        },

        error: (error: any) => {

          console.error(
            'Employee Error:',
            error
          );

        }

      });

  }


  // ==========================================
  // EMPLOYEE VISITS
  // ==========================================

  loadEmployeeVisits(employeeId: string): void {

    this.isLoading = true;

    this.visitservices
      .getEmployeeVisits(employeeId)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Employee Visits:',
            response
          );

          if (
            response?.success &&
            Array.isArray(response.data)
          ) {

            this.visits = response.data;

          } else {

            this.visits = [];

          }

          this.isLoading = false;

        },

        error: (error: any) => {

          console.error(
            'Employee Visits Error:',
            error
          );

          this.visits = [];

          this.isLoading = false;

        }

      });

  }


  // ==========================================
  // BACK
  // ==========================================

  goBack(): void {

    this.router.navigate([
      '/admin/employee-view-details',
      this.employeeId
    ]);

  }

}