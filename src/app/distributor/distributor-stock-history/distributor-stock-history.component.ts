import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StockTransferService } from 'src/app/Services/stock-transfer.service';

@Component({
  selector: 'app-distributor-stock-history',
  templateUrl: './distributor-stock-history.component.html',
  styleUrls: ['./distributor-stock-history.component.css']
})
export class DistributorStockHistoryComponent implements OnInit, AfterViewInit {

  // ==========================================
  // TABLE COLUMNS
  // ==========================================

  displayedColumns: string[] = [
    'sno',
    'transferNo',
    'product',
    'skuCode',
    'batchNo',
    'packSize',
    'weight',
    'quantity',
    'receivedAt'
  ];


  // ==========================================
  // DATA
  // ==========================================

  dataSource = new MatTableDataSource<any>();

  stockHistoryList: any[] = [];

  isLoading: boolean = false;


  // ==========================================
  // PAGINATOR & SORT
  // ==========================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;


  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(
    private stockTransferService: StockTransferService
  ) { }


  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    this.getDistributorStockHistory();


    // ========================================
    // CUSTOM SEARCH
    // ========================================

    this.dataSource.filterPredicate = (
      data: any,
      filter: string
    ) => {

      const searchText = [

        // Transfer
        data?.transferNo || '',

        // Product
        data?.product?.productName || '',
        data?.productName || '',

        // Product Code
        data?.product?.productCode || '',
        data?.productCode || '',

        // SKU
        data?.skuCode || '',
        data?.variant?.skuCode || '',

        // Batch
        data?.batchNo || '',

        // Pack Size
        data?.packSize || '',
        data?.variant?.packSize || ''

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
  // GET STOCK HISTORY
  // ==========================================

  getDistributorStockHistory(): void {

    this.isLoading = true;

    this.stockTransferService
      .getDistributorStockHistory()
      .subscribe({

        next: (response: any) => {

          this.isLoading = false;

          if (response?.success) {

            this.stockHistoryList =
              response.data || [];

            this.dataSource.data =
              this.stockHistoryList;

          }
          else {

            this.stockHistoryList = [];

            this.dataSource.data = [];

          }

        },

        error: (error: any) => {

          this.isLoading = false;

          this.stockHistoryList = [];

          this.dataSource.data = [];

          console.error(
            'Get Distributor Stock History Error:',
            error
          );

        }

      });

  }


  // ==========================================
  // SEARCH
  // ==========================================

  applyFilter(event: Event): void {

    const filterValue =
      (event.target as HTMLInputElement).value;

    this.dataSource.filter =
      filterValue
        .trim()
        .toLowerCase();


    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }


  // ==========================================
  // TRANSFER NUMBER
  // ==========================================

  getTransferNo(history: any): string {

    return history?.transferNo || '-';

  }


  // ==========================================
  // PRODUCT NAME
  // ==========================================

  getProductName(history: any): string {

    if (history?.product?.productName) {

      return history.product.productName;

    }

    if (history?.productName) {

      return history.productName;

    }

    return '-';

  }


  // ==========================================
  // PRODUCT CODE
  // ==========================================

  getProductCode(history: any): string {

    if (history?.product?.productCode) {

      return history.product.productCode;

    }

    if (history?.productCode) {

      return history.productCode;

    }

    return '';

  }


  // ==========================================
  // SKU CODE
  // ==========================================

  getSkuCode(history: any): string {

    return (
      history?.skuCode ||
      history?.variant?.skuCode ||
      '-'
    );

  }


  // ==========================================
  // BATCH NUMBER
  // ==========================================

  getBatchNumber(history: any): string {

    return history?.batchNo || '-';

  }


  // ==========================================
  // PACK SIZE
  // ==========================================

  getPackSize(history: any): string {

    return (
      history?.packSize ||
      history?.variant?.packSize ||
      '-'
    );

  }


  // ==========================================
  // WEIGHT
  // ==========================================

  getWeight(history: any): number {

    return Number(
      history?.weightInGrams ||
      history?.variant?.weightInGrams ||
      0
    );

  }


  // ==========================================
  // QUANTITY
  // ==========================================

  getQuantity(history: any): number {

    return Number(
      history?.quantity ||
      0
    );

  }


  // ==========================================
  // RECEIVED DATE
  // ==========================================

  getReceivedDate(history: any): string {

    if (!history?.receivedAt) {

      return '-';

    }

    const date =
      new Date(history.receivedAt);

    if (isNaN(date.getTime())) {

      return '-';

    }

    return date.toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    );

  }

}
