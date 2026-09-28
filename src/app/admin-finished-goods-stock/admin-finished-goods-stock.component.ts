import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WarehouseFinishedGoodsStockService } from '../Services/warehouse-finished-goods-stock.service';
import { WarehouseService } from '../Services/warehouse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-finished-goods-stock',
  templateUrl: './admin-finished-goods-stock.component.html',
  styleUrls: ['./admin-finished-goods-stock.component.css']
})
export class AdminFinishedGoodsStockComponent implements OnInit, AfterViewInit {


  // ==========================================
  // Table Columns
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'product',

    'packSize',

    'weight',

    'packsProduced',

    'rejectedPacks',

    'totalWeightKg',

    'productionCount',

    'warehouse',
    'actions'

  ];


  // ==========================================
  // All Warehouse Stock Response
  // ==========================================

  warehouseStockList: any[] = [];


  // ==========================================
  // Flattened Finished Goods List
  // ==========================================

  finishedGoodsList: any[] = [];


  // ==========================================
  // Warehouse List
  // ==========================================

  warehouseList: any[] = [];


  // ==========================================
  // Selected Warehouse
  // ==========================================

  selectedWarehouseId: string = '';

  selectedWarehouse: any = null;


  // ==========================================
  // Data Source
  // ==========================================

  dataSource =
    new MatTableDataSource<any>();


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
    private router:
      Router

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.getAllWarehouses();

    this.getAllFinishedGoodsStock();


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

        (data.weightInGrams || '') +

        ' ' +

        (data.packsProduced || '') +

        ' ' +

        (data.rejectedPacks || '') +

        ' ' +

        (data.totalWeightKg || '') +

        ' ' +

        (data.productionCount || '') +

        ' ' +

        (data.warehouseName || '') +

        ' ' +

        (data.warehouseCode || '')

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


          // ======================================
          // Select First Warehouse
          // ======================================

          if (
            this.warehouseList.length > 0
          ) {

            this.selectedWarehouseId =
              this.warehouseList[0]._id;


            this.selectedWarehouse =
              this.warehouseList[0];


            // If stock already loaded
            // filter it

            if (
              this.warehouseStockList.length > 0
            ) {

              this.filterByWarehouse(
                this.selectedWarehouseId
              );

            }

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
  // Get All Finished Goods Stock
  // ==========================================

  getAllFinishedGoodsStock(): void {

    this.finishedGoodsStockService
      .getAllFinishedGoodsStock()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Finished Goods Stock Response:',
            response
          );


          this.warehouseStockList =
            response?.data || [];


          // ======================================
          // Filter Selected Warehouse
          // ======================================

          if (
            this.selectedWarehouseId
          ) {

            this.filterByWarehouse(
              this.selectedWarehouseId
            );

          }

        },


        error: (error: any) => {

          console.log(
            'Finished Goods Stock Error:',
            error
          );


          this.warehouseStockList = [];

          this.finishedGoodsList = [];

          this.dataSource.data = [];

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
    // Clear Previous Data
    // ==========================================

    this.finishedGoodsList = [];

    this.dataSource.data = [];


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

      this.selectedWarehouseId =
        '';

      this.selectedWarehouse =
        null;

      return;

    }


    // ==========================================
    // Set Selected Warehouse
    // ==========================================

    this.selectedWarehouseId =
      warehouseId;


    this.selectedWarehouse =
      this.warehouseList.find(

        warehouse =>
          warehouse._id === warehouseId

      );


    // ==========================================
    // Filter
    // ==========================================

    this.filterByWarehouse(
      warehouseId
    );

  }


  // ==========================================
  // Filter By Warehouse
  // ==========================================

  filterByWarehouse(
    warehouseId: string
  ): void {

    const warehouseData =
      this.warehouseStockList.find(

        (warehouse: any) =>

          warehouse.warehouseId ===
          warehouseId

      );


    // ==========================================
    // No Stock For Warehouse
    // ==========================================

    if (!warehouseData) {

      this.finishedGoodsList = [];

      this.dataSource.data = [];

      return;

    }


    // ==========================================
    // Flatten Finished Goods
    // ==========================================

    this.finishedGoodsList =

      (
        warehouseData.finishedGoods
        || []
      ).map(

        (item: any) => ({

          skuCode:
            item.skuCode || '',

          variantName:
            item.variantName || '',

          packSize:
            item.packSize || '',

          weightInGrams:
            item.weightInGrams || 0,

          packsProduced:
            item.packsProduced || 0,

          rejectedPacks:
            item.rejectedPacks || 0,

          totalWeightKg:
            item.totalWeightKg || 0,

          productionCount:
            item.productionCount || 0,

          warehouseId:
            warehouseData.warehouseId,

          warehouseCode:
            warehouseData.warehouseCode,

          warehouseName:
            warehouseData.warehouseName

        })

      );


    // ==========================================
    // Bind Table
    // ==========================================

    this.dataSource.data =
      this.finishedGoodsList;


    // ==========================================
    // Re-assign Paginator
    // ==========================================

    this.dataSource.paginator =
      this.paginator;


    // ==========================================
    // Re-assign Sort
    // ==========================================

    this.dataSource.sort =
      this.sort;


    // ==========================================
    // Reset Page
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
    // Reset Pagination
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

  viewFinishedStockDetails(
    item: any

  ): void {
    console.log(item, 'view click')
    if (!item) {

      return;

    }

    this.router.navigate([

      '/admin/finished-goods-stock-view-details',

      item.warehouseId

    ]);

  }
}
