import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DistributorsService } from 'src/app/Services/distributors.service';
import { StockTransferService } from 'src/app/Services/stock-transfer.service';
import { StockTransferStatusPopupComponent } from 'src/app/stock-transfer-status-popup/stock-transfer-status-popup.component';
import { IncomingStockTransferViewComponent } from '../incoming-stock-transfer-view/incoming-stock-transfer-view.component';

@Component({
  selector: 'app-distributor-incoming-stock',
  templateUrl: './distributor-incoming-stock.component.html',
  styleUrls: ['./distributor-incoming-stock.component.css']
})
export class DistributorIncomingStockComponent implements OnInit, AfterViewInit {


  // =========================================================
  // TABLE COLUMNS
  // =========================================================

  displayedColumns: string[] = [

    'sno',
    'transferNo',
    'sourceWarehouse',
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


  incomingTransfers: any[] = [];


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

    private distriButorService:
      DistributorsService,
    private stockTransferService:
      StockTransferService,

    private router:
      Router,

    private dialog:
      MatDialog

  ) { }


  // =========================================================
  // NG ON INIT
  // =========================================================

  ngOnInit(): void {

    this.getIncomingTransfers();


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

        (data.status || '')

      ).toLowerCase();


      // Search inside items also

      const itemSearch =
        (data.items || [])
          .map((item: any) => (

            (item.skuCode || '') +

            ' ' +

            (item.batchNo || '') +

            ' ' +

            (item.packSize || '') +

            ' ' +

            (item.product?.productName || '') +

            ' ' +

            (item.product?.productCode || '')

          ))
          .join(' ')
          .toLowerCase();


      return (

        search.includes(filter) ||

        itemSearch.includes(filter)

      );

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
  // GET INCOMING TRANSFERS
  // =========================================================

  getIncomingTransfers(): void {

    this.distriButorService
      .getDistributorIncomingTransfers()
      .subscribe({

        next: (res: any) => {

          console.log(
            'Distributor Incoming Transfers:',
            res
          );


          if (res?.success) {

            this.incomingTransfers =
              res.data || [];


            this.dataSource.data =
              this.incomingTransfers;

          }
          else {

            this.incomingTransfers = [];

            this.dataSource.data = [];

          }

        },


        error: (err: any) => {

          console.error(
            'Incoming Transfers Error:',
            err
          );


          this.incomingTransfers = [];

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
  // TOTAL QUANTITY
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
  // STATUS CLASS
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


      case 'intransit':

        return 'intransit';


      case 'received':

        return 'received';


      case 'cancelled':

        return 'cancelled';


      case 'draft':

        return 'draft';


      default:

        return 'pending';

    }

  }




  // =========================================================
  // OPEN STATUS POPUP
  // =========================================================
  openStatusPopup(
    transfer: any
  ): void {

    const dialogRef =
      this.dialog.open(
        StockTransferStatusPopupComponent,
        {
          width: '550px',
          maxWidth: '95vw',
          data: transfer,
          panelClass:
            'stock-transfer-status-dialog'
        }
      );


    dialogRef
      .afterClosed()
      .subscribe((result: any) => {

        if (!result?.confirmed) {

          return;

        }


        if (
          result.action === 'receive'
        ) {

          this.receiveStockTransfer(
            transfer._id
          );

          return;

        }


        if (
          result.action === 'status'
        ) {

          this.updateStockTransferStatus(

            transfer._id,

            result.status

          );

        }

      });

  }
  receiveStockTransfer(
    id: string
  ): void {

    this.stockTransferService
      .receiveStockTransfer(id)
      .subscribe({

        next: (response: any) => {

          if (response?.success) {

            this.getIncomingTransfers();

          }

        },

        error: (error: any) => {

          console.error(
            'Receive Stock Transfer Error:',
            error
          );

        }

      });

  }
  // =========================================================
  // UPDATE STATUS
  // =========================================================

  updateStockTransferStatus(
    id: string,
    status: string
  ): void {

    this.distriButorService.updateStockTransferStatus(
      id,
      status
    )
      .subscribe({

        next: (res: any) => {

          console.log(
            'Status Updated:',
            res
          );


          if (res?.success) {

            // Refresh list
            this.getIncomingTransfers();

          }

        },


        error: (err: any) => {

          console.error(
            'Status Update Error:',
            err
          );

        }

      });

  }

  viewStockTransfer(
    transfer: any
  ): void {

    if (!transfer?._id) {

      console.error(
        'Stock Transfer ID not found'
      );

      return;

    }


    this.dialog.open(IncomingStockTransferViewComponent,
      {
        width: '900px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        panelClass: 'stock-transfer-dialog',
        data: {
          id: transfer._id
        }
      }
    );

  }
}
