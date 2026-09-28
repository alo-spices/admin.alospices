import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StockTransferService } from 'src/app/Services/stock-transfer.service';

@Component({
  selector: 'app-distributor-my-stock',
  templateUrl: './distributor-my-stock.component.html',
  styleUrls: ['./distributor-my-stock.component.css']
})
export class DistributorMyStockComponent implements OnInit, AfterViewInit {


  // ==========================================
  // TABLE COLUMNS
  // ==========================================

  displayedColumns: string[] = [

    'sno',
    'product',
    'skuCode',
    'batchNo',
    'packSize',
    'weight',
    'quantity'

  ];


  // ==========================================
  // DATASOURCE
  // ==========================================

  dataSource =
    new MatTableDataSource<any>();


  // ==========================================
  // STOCK LIST
  // ==========================================

  stockList: any[] = [];


  // ==========================================
  // LOADING
  // ==========================================

  isLoading: boolean = false;


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


  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(
    private stockTransferService:
      StockTransferService
  ) { }


  // ==========================================
  // NG ON INIT
  // ==========================================

  ngOnInit(): void {

    this.getMyDistributorStock();


    // ========================================
    // FILTER
    // ========================================

    this.dataSource.filterPredicate =
      (
        data: any,
        filter: string
      ): boolean => {

        const searchText = (

          // Product name
          data.product?.productName ||

          data.productName ||

          ''

        ) + ' ' + (

            // Product code
            data.product?.productCode ||

            data.productCode ||

            ''

          ) + ' ' + (

            // SKU
            data.skuCode ||

            data.variant?.skuCode ||

            ''

          ) + ' ' + (

            // Batch
            data.batchNo ||

            ''

          ) + ' ' + (

            // Pack size
            data.packSize ||

            data.variant?.packSize ||

            ''

          );


        return searchText
          .toLowerCase()
          .includes(
            filter
          );

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
  // GET MY DISTRIBUTOR STOCK
  // ==========================================

  getMyDistributorStock() {

    const userData = localStorage.getItem('user');

    if (!userData) {
      console.error('Distributor login data not found');
      return;
    }

    const user = JSON.parse(userData);

    const distributorId = user.id;

    if (!distributorId) {
      console.error('Distributor ID not found in localStorage');
      return;
    }

    this.isLoading = true;

    this.stockTransferService
      .getMyDistributorStock(distributorId)
      .subscribe({

        next: (response: any) => {

          this.isLoading = false;

          if (response?.success) {

            this.stockList = response.data || [];

            this.dataSource.data = this.stockList;

          } else {

            this.stockList = [];

            this.dataSource.data = [];

          }

        },

        error: (error: any) => {

          this.isLoading = false;

          this.stockList = [];

          this.dataSource.data = [];

          console.error(
            'Get Distributor Stock Error:',
            error
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

    const filterValue =
      (
        event.target as
        HTMLInputElement
      ).value;


    this.dataSource.filter =
      filterValue
        .trim()
        .toLowerCase();


    if (
      this.dataSource.paginator
    ) {

      this.dataSource.paginator
        .firstPage();

    }

  }


  // ==========================================
  // PRODUCT NAME
  // ==========================================

  getProductName(
    stock: any
  ): string {

    if (
      stock?.product?.productName
    ) {

      return stock.product.productName;

    }


    if (
      stock?.productName
    ) {

      return stock.productName;

    }


    return '-';

  }


  // ==========================================
  // PRODUCT CODE
  // ==========================================

  getProductCode(
    stock: any
  ): string {

    if (
      stock?.product?.productCode
    ) {

      return stock.product.productCode;

    }


    if (
      stock?.productCode
    ) {

      return stock.productCode;

    }


    return '';

  }


  // ==========================================
  // SKU
  // ==========================================

  getSkuCode(
    stock: any
  ): string {

    return (

      stock?.skuCode ||

      stock?.variant?.skuCode ||

      '-'

    );

  }


  // ==========================================
  // BATCH NUMBER
  // ==========================================

  getBatchNumber(
    stock: any
  ): string {

    return (
      stock?.batchNo ||
      '-'
    );

  }


  // ==========================================
  // PACK SIZE
  // ==========================================

  getPackSize(
    stock: any
  ): string {

    return (

      stock?.packSize ||

      stock?.variant?.packSize ||

      '-'

    );

  }


  // ==========================================
  // WEIGHT
  // ==========================================

  getWeight(
    stock: any
  ): number {

    return Number(

      stock?.weightInGrams ||

      stock?.variant?.weightInGrams ||

      0

    );

  }


  // ==========================================
  // QUANTITY
  // ==========================================

  getQuantity(
    stock: any
  ): number {

    return Number(

      stock?.quantity ||

      stock?.stock ||

      0

    );

  }

}
