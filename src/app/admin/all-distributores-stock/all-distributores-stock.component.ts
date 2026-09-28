import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StockTransferService } from 'src/app/Services/stock-transfer.service';
import { ViewDistributoresStockComponent } from '../view-distributores-stock/view-distributores-stock.component';

@Component({
  selector: 'app-all-distributores-stock',
  templateUrl: './all-distributores-stock.component.html',
  styleUrls: ['./all-distributores-stock.component.css']
})
export class AllDistributoresStockComponent implements OnInit, AfterViewInit {


  // ==========================================
  // TABLE COLUMNS
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'transferNo',

    'transferDate',

    'sourceWarehouse',

    'destination',

    'items',

    'status',

    'receivedAt',

    'actions'

  ];


  // ==========================================
  // TABLE DATA
  // ==========================================

  dataSource =
    new MatTableDataSource<any>();


  stockTransferList: any[] = [];


  isLoading = false;


  // ==========================================
  // PAGINATOR / SORT
  // ==========================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  @ViewChild(MatSort)
  sort!: MatSort;


  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(
    private stockTransferService:
      StockTransferService,
    private dialog: MatDialog
  ) { }


  // ==========================================
  // NG ON INIT
  // ==========================================

  ngOnInit(): void {

    this.getAllStockTransfers();


    // ======================================
    // SEARCH FILTER
    // ======================================

    this.dataSource.filterPredicate =
      (data: any, filter: string) => {

        const searchText = [

          data?.transferNo || '',

          data?.sourceWarehouse
            ?.warehouseName || '',

          data?.sourceWarehouse
            ?.warehouseCode || '',

          data?.destination
            ?.fullName || '',

          data?.destination
            ?.shopName || '',

          data?.destinationType || '',

          data?.status || '',

          ...(data?.items || [])
            .map((item: any) =>
              item?.product
                ?.productName || ''
            ),

          ...(data?.items || [])
            .map((item: any) =>
              item?.skuCode || ''
            )

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
  // GET ALL STOCK TRANSFERS
  // ==========================================

  getAllStockTransfers(): void {

    this.isLoading = true;


    this.stockTransferService
      .getAllStockTransfers()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Stock Transfers Response:',
            response
          );


          this.isLoading = false;


          if (
            response?.success &&
            Array.isArray(response?.data)
          ) {

            this.stockTransferList =
              response.data;

            this.dataSource.data =
              this.stockTransferList;

          } else {

            this.stockTransferList = [];

            this.dataSource.data = [];

          }

        },


        error: (error: any) => {

          this.isLoading = false;

          console.error(
            'Get Stock Transfers Error:',
            error
          );


          this.stockTransferList = [];

          this.dataSource.data = [];

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

      filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }


  // ==========================================
  // VIEW TRANSFER
  // ==========================================

  viewStockTransfer(transfer: any): void {

    if (!transfer?._id) {

      console.error(
        'Stock Transfer ID not found'
      );

      return;

    }


    this.isLoading = true;


    this.stockTransferService.getStockTransferById(transfer._id)
      .subscribe({

        next: (response: any) => {

          this.isLoading = false;


          console.log(
            'Stock Transfer Details:',
            response
          );


          if (response?.success) {

            this.dialog.open(
              ViewDistributoresStockComponent,
              {
                width: '850px',

                maxWidth: '95vw',

                maxHeight: '90vh',

                data: response.data,

                panelClass:
                  'stock-transfer-details-dialog'
              }
            );

          }

        },


        error: (error: any) => {

          this.isLoading = false;

          console.error(
            'Get Stock Transfer Details Error:',
            error
          );

        }

      });

  }


  // ==========================================
  // GET ITEM COUNT
  // ==========================================

  getItemCount(
    transfer: any
  ): number {

    return transfer?.items?.length || 0;

  }


  // ==========================================
  // STATUS CLASS
  // ==========================================

  getStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'Received':
        return 'status-received';

      case 'Approved':
        return 'status-approved';

      case 'InTransit':
        return 'status-transit';

      case 'Pending':
        return 'status-pending';

      case 'Cancelled':
        return 'status-cancelled';

      default:
        return 'status-default';

    }

  }

}
