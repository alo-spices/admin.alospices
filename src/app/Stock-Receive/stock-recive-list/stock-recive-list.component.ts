import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { StockReceiveService } from 'src/app/Services/stock-receive.service';
import { StockReceiveViewDialogComponent } from 'src/app/view-pages/stock-receive-view-dialog/stock-receive-view-dialog.component';

@Component({
  selector: 'app-stock-recive-list',
  templateUrl: './stock-recive-list.component.html',
  styleUrls: ['./stock-recive-list.component.css']
})
export class StockReciveListComponent implements OnInit {

  displayedColumns: string[] = [

    'sno',

    // 'receiveNo',

    'supplier',

    'warehouse',

    'items',

    'weight',

    'status',

    'receivedDate',

    'actions'

  ];

  dataSource = new MatTableDataSource<any>();

  loading = false;

  @ViewChild(MatPaginator)

  paginator!: MatPaginator;

  @ViewChild(MatSort)

  sort!: MatSort;
  constructor(

  private stockReceiveService: StockReceiveService,

  private popup: CommomPopupService,

  private router: Router,
      private dialog: MatDialog


) { }
// ngOnInit(): void {

//   this.getAllStockReceives();

// }
// ==========================================
// GET ALL STOCK RECEIVES
// ==========================================

getAllStockReceives() {

  this.loading = true;

  this.stockReceiveService

    .getAllStockReceives()

    .subscribe({

      next: (res: any) => {

        this.loading = false;

        if (res.success) {

          this.dataSource.data = res.data;

          this.dataSource.paginator = this.paginator;

          this.dataSource.sort = this.sort;

        }

      },

      error: (err: any) => {

        this.loading = false;

        console.log(err);

        this.popup.error(

          err.error?.message ||

          'Failed to load Stock Receives.'

        );

      }

    });

}
// ==========================================
// SEARCH FILTER
// ==========================================

applyFilter(event: Event) {

  const filterValue = (event.target as HTMLInputElement)

    .value;

  this.dataSource.filter = filterValue

    .trim()

    .toLowerCase();

}
// ==========================================
// TOTAL WEIGHT
// ==========================================

getTotalWeight(element: any): number {

  if (!element.items) {

    return 0;

  }

  return element.items.reduce(

    (total: number, item: any) =>

      total + Number(item.totalWeightKg || 0),

    0

  );

}
// ==========================================
// VIEW STOCK RECEIVE
// ==========================================

viewStockReceive(stock: any) {

  this.dialog.open(StockReceiveViewDialogComponent, {

    width: '1100px',

    disableClose: true,

    data: stock

  });

}

// ==========================================
// EDIT STOCK RECEIVE
// ==========================================

editStockReceive(element: any) {

  this.router.navigate(

    ['/update-stock-receive', element._id]

  );

}
// ==========================================
// DELETE STOCK RECEIVE
// ==========================================


 // ==========================================
 // DELETE STOCK RECEIVE
 // ==========================================

deleteStockReceive(element: any): void {

  this.popup
    .confirmDelete()
    .then((result: any) => {

      const isConfirmed =
        result === true || result?.isConfirmed === true;

      if (!isConfirmed) {
        return;
      }

      this.stockReceiveService
        .deleteStockReceive(element._id)
        .subscribe({

          next: (res: any) => {

            if (res.success) {

              this.popup.success(
                res.message
              ).then(() => {

                this.getAllStockReceives();

              });

            } else {

              this.popup.error(
                res.message || 'Failed to delete Stock Receive.'
              );

            }

          },

          error: (err: any) => {

            console.log(err);

            this.popup.error(
              err.error?.message ||
              'Failed to delete Stock Receive.'
            );

          }

        });

    })
    .catch((err: any) => {

      console.log('Delete confirmation error:', err);

    });

}

ngOnInit(): void {

  this.dataSource.filterPredicate = (

    data: any,

    filter: string

  ) => {

    const search = (

      data.receiveNo +

      ' ' +

      data.invoiceNo +

      ' ' +

      (data.supplier?.supplierName || '') +

      ' ' +

      (data.warehouse?.warehouseName || '') +

      ' ' +

      data.status

    ).toLowerCase();

    return search.includes(filter);

  };

  this.getAllStockReceives();

}
}