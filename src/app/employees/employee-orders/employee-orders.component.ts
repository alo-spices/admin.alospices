import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/Services/employee.service';
import { OrdersService } from 'src/app/Services/orders.service';
import { ViewEmployeeOrderComponent } from 'src/app/view-employee-order/view-employee-order.component';

@Component({
  selector: 'app-employee-orders',
  templateUrl: './employee-orders.component.html',
  styleUrls: ['./employee-orders.component.css']
})
export class EmployeeOrdersComponent implements OnInit {

  employeeId: string = '';

  employee: any = null;

  orders: any[] = [];

  isLoading = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private orderService: OrdersService,
    private dialog: MatDialog,
  ) { }


  ngOnInit(): void {

    this.employeeId =
      this.route.snapshot.paramMap.get('employeeId') || '';

    if (!this.employeeId) {

      console.error(
        'Employee ID not found'
      );

      return;
    }

    this.loadEmployee();

    this.loadEmployeeOrders();

  }


  // ==========================================
  // EMPLOYEE DETAILS
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
  // EMPLOYEE ORDERS
  // ==========================================

  loadEmployeeOrders(): void {

    this.isLoading = true;

    this.employeeService
      .getEmployeeOrders(this.employeeId)
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

            this.orders =
              response.data;

          }
          else {

            this.orders = [];

          }

          this.isLoading = false;

        },

        error: (error: any) => {

          console.error(
            'Employee Orders Error:',
            error
          );

          this.orders = [];

          this.isLoading = false;

        }

      });

  }
  goBack(): void {
    this.router.navigate([
      '/admin/employee-view-details',
      this.employeeId
    ]);
  }
  // ==========================================
  // VIEW EMPLOYEE ORDER
  // ==========================================

  viewOrder(order: any): void {

    if (!order?._id) {
      console.error('Order ID not found');
      return;
    }

    this.orderService.getOrderById(order._id)
      .subscribe({

        next: (response: any) => {

          console.log('Order Details:', response);

          if (response?.success && response?.data) {

            this.dialog.open(ViewEmployeeOrderComponent, {

              width: '950px',

              maxWidth: '95vw',

              maxHeight: '90vh',

              data: response.data,

              panelClass: 'view-employee-order-dialog'

            });

          }

        },

        error: (error: any) => {

          console.error(
            'Get Order Details Error:',
            error
          );

        }

      });

  }
}