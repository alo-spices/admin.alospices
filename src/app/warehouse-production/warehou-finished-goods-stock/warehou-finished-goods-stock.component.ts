import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommomPopupComponent } from 'src/app/commom-popup/commom-popup.component';
import { CommomPopupService } from 'src/app/Services/commom-popup.service';
import { WarehouseFinishedGoodsStockService } from 'src/app/Services/warehouse-finished-goods-stock.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-warehou-finished-goods-stock',
  templateUrl: './warehou-finished-goods-stock.component.html',
  styleUrls: ['./warehou-finished-goods-stock.component.css']
})
export class WarehouFinishedGoodsStockComponent implements OnInit, AfterViewInit {

  stockSummary: any = {

    totalProducts: 0,

    totalPacks: 0,

    totalRejectedPacks: 0,

    totalWeightKg: 0

  };
  // ==========================================
  // Table Columns
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'product',

    'packSize',

    'weightInGrams',

    'packsProduced',

    'rejectedPacks',

    'totalWeightKg',

    'productionCount',

    'lastProduction',
    'actions'

  ];


  // ==========================================
  // Warehouse List
  // ==========================================

  warehouseList: any[] = [];


  // ==========================================
  // Finished Goods Stock List
  // ==========================================

  stockList: any[] = [];


  // ==========================================
  // Data Source
  // ==========================================

  dataSource =
    new MatTableDataSource<any>();


  // ==========================================
  // Selected Warehouse
  // ==========================================

  selectedWarehouseId: string = '';

  selectedWarehouse: any = null;


  // ==========================================
  // Paginator
  // ==========================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  // ==========================================
  // Sort
  // ==========================================

  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(

    private warehouseService:
      WarehouseService,

    private finishedGoodsStockService:
      WarehouseFinishedGoodsStockService,
    private router: Router,
    private alertService: CommomPopupService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.getAllWarehouses();


    // ==========================================
    // Search Filter
    // ==========================================

    this.dataSource.filterPredicate = (

      data: any,

      filter: string

    ) => {

      const search = (

        (data.skuCode || '') +

        ' ' +

        (data.variantName || '') +

        ' ' +

        (data.packSize || '') +

        ' ' +

        (data.lastProductionNo || '') +

        ' ' +

        (data.weightInGrams || '') +

        ' ' +

        (data.packsProduced || '') +

        ' ' +

        (data.rejectedPacks || '')

      ).toLowerCase();


      return search.includes(filter);

    };

  }


  // ==========================================
  // After View Init
  // ==========================================

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

    this.dataSource.sort =
      this.sort;

  }


  // ==========================================
  // Get All Warehouses
  // ==========================================

  getAllWarehouses(): void {

    this.warehouseService
      .getAllWarehouses()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Warehouse Response:',
            response
          );


          this.warehouseList =
            response?.data || [];


          // ========================================
          // Select First Warehouse Automatically
          // ========================================

          if (
            this.warehouseList.length > 0
          ) {

            this.selectedWarehouseId =
              this.warehouseList[0]._id;


            this.selectedWarehouse =
              this.warehouseList[0];


            this.getFinishedGoodsStock(
              this.selectedWarehouseId
            );

          }

        },


        error: (error: any) => {

          console.log(
            'Warehouse Error:',
            error
          );


          this.warehouseList = [];

        }

      });

  }


  // ==========================================
  // Warehouse Change
  // ==========================================

  onWarehouseChange(
    warehouseId: string
  ): void {


    // ==========================================
    // Clear Previous Stock
    // ==========================================

    this.stockList = [];

    this.dataSource.data = [];


    // ==========================================
    // Reset Pagination
    // ==========================================

    if (
      this.dataSource.paginator
    ) {

      this.dataSource
        .paginator
        .firstPage();

    }


    // ==========================================
    // No Warehouse
    // ==========================================

    if (!warehouseId) {

      this.selectedWarehouse =
        null;

      this.selectedWarehouseId =
        '';

      return;

    }


    // ==========================================
    // Selected Warehouse
    // ==========================================

    this.selectedWarehouseId =
      warehouseId;


    this.selectedWarehouse =
      this.warehouseList.find(

        warehouse =>
          warehouse._id ===
          warehouseId

      );


    // ==========================================
    // Get Finished Goods Stock
    // ==========================================

    this.getFinishedGoodsStock(
      warehouseId
    );

  }


  // ==========================================
  // Get Finished Goods Stock
  // ==========================================

  // ==========================================
  // Get Finished Goods Stock
  // ==========================================

  getFinishedGoodsStock(
    warehouseId: string
  ): void {

    this.finishedGoodsStockService
      .getFinishedGoodsStockByWarehouse(
        warehouseId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Finished Goods Stock:',
            response
          );


          // ======================================
          // Response Data
          // ======================================

          const data =
            response?.data;


          // ======================================
          // Warehouse Details
          // ======================================

          this.selectedWarehouse =
            data?.warehouse || this.selectedWarehouse;


          // ======================================
          // Summary
          // ======================================

          this.stockSummary =
            data?.summary || {

              totalProducts: 0,

              totalPacks: 0,

              totalRejectedPacks: 0,

              totalWeightKg: 0

            };


          // ======================================
          // Finished Goods
          // ======================================

          this.stockList =
            data?.finishedGoods || [];


          // ======================================
          // Bind Table
          // ======================================

          this.dataSource.data =
            this.stockList;


          // ======================================
          // Re-assign Paginator
          // ======================================

          this.dataSource.paginator =
            this.paginator;


          // ======================================
          // Re-assign Sort
          // ======================================

          this.dataSource.sort =
            this.sort;


          // ======================================
          // Reset Page
          // ======================================

          if (
            this.dataSource.paginator
          ) {

            this.dataSource
              .paginator
              .firstPage();

          }

        },


        error: (error: any) => {

          console.log(
            'Finished Goods Stock Error:',
            error
          );


          this.stockList = [];


          this.dataSource.data = [];


          this.stockSummary = {

            totalProducts: 0,

            totalPacks: 0,

            totalRejectedPacks: 0,

            totalWeightKg: 0

          };

        }

      });

  }


  // ==========================================
  // Search
  // ==========================================

  applyFilter(
    event: Event
  ): void {

    const filterValue = (

      event.target as
      HTMLInputElement

    ).value;


    this.dataSource.filter =
      filterValue
        .trim()
        .toLowerCase();


    // ==========================================
    // First Page
    // ==========================================

    if (
      this.dataSource.paginator
    ) {

      this.dataSource
        .paginator
        .firstPage();

    }

  }

  // ==========================================
  // View Finished Stock Details
  // ==========================================

  // ==========================================
  // View Finished Stock Details
  // ==========================================

  viewFinishedStockDetails(
    item: any
  ): void {

    console.log(
      'Finished Stock View Item:',
      item
    );


    // ========================================
    // Get Warehouse ID
    // ========================================

    const warehouseId =
      this.selectedWarehouseId;


    console.log(
      'Selected Warehouse ID:',
      warehouseId
    );


    // ========================================
    // Validate
    // ========================================

    if (!warehouseId) {

      this.alertService.error(
        'Warehouse ID not found'
      );

      return;

    }


    // ========================================
    // Navigate
    // ========================================

    this.router.navigate([

      '/admin/finished-goods-stock-view-details',

      warehouseId

    ]);

  }
}
