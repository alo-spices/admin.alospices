import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommomPopupService } from '../Services/commom-popup.service';
import { OrdersService } from '../Services/orders.service';
import { OrderViewListComponent } from '../order-view-list/order-view-list.component';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit, AfterViewInit {


  // ==========================================
  // COLUMNS
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'order',

    'party',

    'salesman',

    'amount',

    'orderStatus',

    'paymentStatus',

    'orderDate',

    'actions'

  ];


  // ==========================================
  // DATA SOURCE
  // ==========================================

  dataSource =
    new MatTableDataSource<any>([]);


  orders: any[] = [];


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

    private orderService: OrdersService,

    private router: Router,

    private dialog: MatDialog,

    private alertService: CommomPopupService

  ) { }


  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    this.getAllOrders();


    // ========================================
    // FILTER
    // ========================================

    this.dataSource.filterPredicate = (

      data: any,

      filter: string

    ) => {


      const search = (

        (data.orderNumber || '') +

        ' ' +

        (data.party?.shopName || '') +

        ' ' +

        (data.party?.mobile || '') +

        ' ' +

        (data.partyType || '') +

        ' ' +

        (data.employee?.fullName || '') +

        ' ' +

        (data.employee?.employeeCode || '') +

        ' ' +

        (data.orderStatus || '') +

        ' ' +

        (data.paymentStatus || '')

      ).toLowerCase();


      return search.includes(filter);

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
  // GET ALL ORDERS
  // ==========================================

  getAllOrders(): void {

    this.orderService
      .getAllOrders()
      .subscribe({

        next: (res: any) => {

          console.log(
            'Orders Response:',
            res
          );


          this.orders =
            res?.data || [];


          this.dataSource.data =
            this.orders;

        },


        error: (err: any) => {

          console.log(
            'Get Orders Error:',
            err
          );


          this.orders = [];

          this.dataSource.data = [];


          this.alertService.error(

            err?.error?.message ||

            'Failed to load Orders'

          );

        }

      });

  }


  // ==========================================
  // SEARCH
  // ==========================================

  applyFilter(event: Event): void {

    const filterValue = (

      event.target as HTMLInputElement

    ).value;


    this.dataSource.filter =

      filterValue
        .trim()
        .toLowerCase();


    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }


  // ==========================================
  // VIEW ORDER
  // ==========================================

  // ==========================================
  // View Order
  // ==========================================

  viewOrder(order: any): void {

    if (!order?._id) {

      this.alertService.error(
        'Order ID not found'
      );

      return;

    }


    this.orderService
      .getOrderById(order._id)
      .subscribe({

        next: (response: any) => {

          if (response?.success && response?.data) {

            this.dialog.open(
              OrderViewListComponent,
              {

                width: '900px',

                maxWidth: '95vw',

                maxHeight: '90vh',

                data: response.data,

                panelClass: 'view-order-dialog'

              }
            );

          } else {

            this.alertService.error(

              response?.message ||

              'Failed to get Order details'

            );

          }

        },


        error: (error: any) => {

          console.log(
            'Get Order By ID Error:',
            error
          );


          this.alertService.error(

            error?.error?.message ||

            'Failed to load Order details'

          );

        }

      });

  }


  // ==========================================
  // ORDER STATUS CLASS
  // ==========================================

  getOrderStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'Pending':

        return 'pending';

      case 'Confirmed':

        return 'active';

      case 'Processing':

        return 'processing';

      case 'Completed':

        return 'active';

      case 'Cancelled':

        return 'inactive';

      default:

        return '';

    }

  }


  // ==========================================
  // PAYMENT STATUS CLASS
  // ==========================================

  getPaymentStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'Paid':

        return 'active';

      case 'Pending':

        return 'pending';

      case 'Partial':

        return 'processing';

      case 'Failed':

        return 'inactive';

      default:

        return '';

    }

  }

}
