import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DistributorsService } from 'src/app/Services/distributors.service';
import { DistributorViewOrdersComponent } from '../distributor-view-orders/distributor-view-orders.component';

@Component({
  selector: 'app-distributor-orders',
  templateUrl: './distributor-orders.component.html',
  styleUrls: ['./distributor-orders.component.css']
})
export class DistributorOrdersComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = [

    'sno',

    'orderNumber',

    "party",

    'grandTotal',

    'orderStatus',

    'paymentStatus',

    'orderDate',

    'actions'

  ];


  dataSource =
    new MatTableDataSource<any>();


  orders: any[] = [];


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(

    private distributorService:
      DistributorsService,

    private router: Router,

    private dialog:
      MatDialog

  ) { }


  // ==================================
  // INIT
  // ==================================

  ngOnInit(): void {

    this.getDistributorOrders();


    this.dataSource.filterPredicate = (

      data: any,

      filter: string

    ) => {

      const search = (

        (data.orderNumber || '') +

        ' ' +

        (data.partyType || '') +

        ' ' +

        (data.orderStatus || '') +

        ' ' +

        (data.paymentStatus || '') +

        ' ' +

        (data.remarks || '')

      ).toLowerCase();


      return search.includes(filter);

    };

  }


  // ==================================
  // AFTER VIEW INIT
  // ==================================

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

    this.dataSource.sort =
      this.sort;

  }


  // ==================================
  // Get Distributor Orders
  // ==================================

  getDistributorOrders(): void {

    this.distributorService
      .getDistributorOrders()
      .subscribe({

        next: (res: any) => {

          console.log(
            'Distributor Orders:',
            res
          );


          this.orders =
            res?.data || [];


          this.dataSource.data =
            this.orders;

        },


        error: (err: any) => {

          console.log(
            'Distributor Orders Error:',
            err
          );


          this.orders = [];

          this.dataSource.data = [];

        }

      });

  }


  // ==================================
  // Search
  // ==================================

  applyFilter(event: Event): void {

    const filterValue = (

      event.target as HTMLInputElement

    ).value;


    this.dataSource.filter =

      filterValue
        .trim()
        .toLowerCase();


    if (this.dataSource.paginator) {

      this.dataSource
        .paginator
        .firstPage();

    }

  }


  // ==================================
  // View Order
  // ==================================

  // ==================================
  // View Order
  // ==================================

  viewOrder(order: any): void {

    if (!order?._id) {

      console.error(
        'Order ID not found'
      );

      return;

    }


    this.distributorService
      .getOrderById(order._id)
      .subscribe({

        next: (res: any) => {

          console.log(
            'Order Details:',
            res
          );


          if (res?.success) {

            this.dialog.open(
              DistributorViewOrdersComponent,
              {

                width: '900px',
                height: '800px',

                data: res.data,

                panelClass:
                  'view-order-dialog'

              }
            );

          }

        },


        error: (err: any) => {

          console.error(
            'Get Order Details Error:',
            err
          );

        }

      });

  }


}
