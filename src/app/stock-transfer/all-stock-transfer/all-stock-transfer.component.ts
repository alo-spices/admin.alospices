import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StockTransferService } from 'src/app/Services/stock-transfer.service';

@Component({
  selector: 'app-all-stock-transfer',
  templateUrl: './all-stock-transfer.component.html',
  styleUrls: ['./all-stock-transfer.component.css']
})
export class AllStockTransferComponent implements OnInit, AfterViewInit {


  // =========================================================
  // TABLE COLUMNS
  // =========================================================

  displayedColumns: string[] = [

    'sno',
    'transferNo',
    'sourceWarehouse',
    'destination',
    'items',
    'quantity',
    'status',
    'actions'

  ];


  // =========================================================
  // DATA SOURCE
  // =========================================================

  dataSource =
    new MatTableDataSource<any>();


  stockTransfers: any[] = [];


  // =========================================================
  // PAGINATOR
  // =========================================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  // =========================================================
  // SORT
  // =========================================================

  @ViewChild(MatSort)
  sort!: MatSort;


  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(

    private stockTransferService:
      StockTransferService,

    private router:
      Router

  ) { }


  // =========================================================
  // NG ON INIT
  // =========================================================

  ngOnInit(): void {

    this.getAllStockTransfers();


    // ==========================================
    // SEARCH FILTER
    // ==========================================

    this.dataSource.filterPredicate = (

      data: any,
      filter: string

    ) => {

      const search = (

        (data.transferNo || '') +

        ' ' +

        (data.sourceWarehouse?.warehouseName || '') +

        ' ' +

        (data.sourceWarehouse?.warehouseCode || '') +

        ' ' +

        (data.destinationType || '') +

        ' ' +

        (data.destination?.fullName || '') +

        ' ' +

        (data.destination?.firstName || '') +

        ' ' +

        (data.destination?.lastName || '') +

        ' ' +

        (data.destination?.shopName || '') +

        ' ' +

        (data.destination?.mobile || '') +

        ' ' +

        (data.status || '')

      ).toLowerCase();


      return search.includes(filter);

    };

  }


  // =========================================================
  // AFTER VIEW INIT
  // =========================================================

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

    this.dataSource.sort =
      this.sort;

  }


  // =========================================================
  // GET ALL STOCK TRANSFERS
  // =========================================================

  getAllStockTransfers(): void {

    this.stockTransferService
      .getAllStockTransfers()
      .subscribe({

        next: (res: any) => {

          console.log(
            'Stock Transfer Response:',
            res
          );


          if (res?.success) {

            this.stockTransfers =
              res.data || [];


            this.dataSource.data =
              this.stockTransfers;

          }
          else {

            this.stockTransfers = [];

            this.dataSource.data = [];

          }

        },


        error: (err: any) => {

          console.error(
            'Stock Transfer List Error:',
            err
          );


          this.stockTransfers = [];

          this.dataSource.data = [];

        }

      });

  }


  // =========================================================
  // SEARCH
  // =========================================================

  applyFilter(event: Event): void {

    const filterValue = (

      event.target as HTMLInputElement

    ).value;


    this.dataSource.filter =
      filterValue
        .trim()
        .toLowerCase();


    if (this.dataSource.paginator) {

      this.dataSource.paginator
        .firstPage();

    }

  }


  // =========================================================
  // GET DESTINATION NAME
  // =========================================================

  getDestinationName(
    destination: any
  ): string {

    if (!destination) {

      return '-';

    }


    // Distributor / User

    if (destination.fullName) {

      return destination.fullName;

    }


    if (
      destination.firstName ||
      destination.lastName
    ) {

      return (

        `${destination.firstName || ''} ` +
        `${destination.lastName || ''}`

      ).trim();

    }


    // Retailer / Wholesaler

    if (destination.shopName) {

      return destination.shopName;

    }


    if (destination.partyName) {

      return destination.partyName;

    }


    if (destination.companyName) {

      return destination.companyName;

    }


    if (destination.name) {

      return destination.name;

    }


    return '-';

  }


  // =========================================================
  // GET TOTAL QUANTITY
  // =========================================================

  getTotalQuantity(
    transfer: any
  ): number {

    if (
      !transfer ||
      !Array.isArray(transfer.items)
    ) {

      return 0;

    }


    return transfer.items.reduce(

      (
        total: number,
        item: any
      ) => {

        return (
          total +
          Number(item.quantity || 0)
        );

      },

      0

    );

  }


  // =========================================================
  // GET STATUS CLASS
  // =========================================================

  getStatusClass(
    status: string
  ): string {

    switch (
    (status || '').toLowerCase()
    ) {

      case 'pending':

        return 'pending';


      case 'approved':

        return 'approved';


      case 'completed':

        return 'completed';


      case 'received':

        return 'received';


      case 'rejected':

        return 'rejected';


      case 'cancelled':

        return 'cancelled';


      default:

        return 'pending';

    }

  }


  // =========================================================
  // VIEW STOCK TRANSFER
  // =========================================================

  viewStockTransfer(
    transfer: any
  ): void {

    console.log(
      'View Stock Transfer:',
      transfer
    );


    /*
     * Later we can create
     * ViewStockTransferComponent
     * and open it using MatDialog.
     */

  }


  // =========================================================
  // DELETE STOCK TRANSFER
  // =========================================================

  deleteStockTransfer(
    transfer: any
  ): void {

    console.log(
      'Delete Stock Transfer:',
      transfer
    );


    /*
     * Backend delete API not provided yet.
     *
     * So don't call any delete API
     * until backend endpoint is available.
     */

  }

}
