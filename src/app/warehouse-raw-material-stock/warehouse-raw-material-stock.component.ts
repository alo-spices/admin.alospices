import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RawMaterialService } from '../Services/raw-material.service';
import { WarehouseService } from '../Services/warehouse.service';

@Component({
  selector: 'app-warehouse-raw-material-stock',
  templateUrl: './warehouse-raw-material-stock.component.html',
  styleUrls: ['./warehouse-raw-material-stock.component.css']
})
export class WarehouseRawMaterialStockComponent implements OnInit, AfterViewInit {


  // ==========================================
  // Table Columns
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'rawMaterial',

    'receiveNo',

    'receivedDate',

    'supplier',

    'batchNo',

    'noOfBags',

    'totalWeightKg',

    'availableWeightKg',

    'usedWeightKg',

    'rate',

    'amount',

    'actions'

  ];


  // ==========================================
  // Warehouse List
  // ==========================================

  warehouseList: any[] = [];


  // ==========================================
  // Stock List
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

    private rawMaterialService:
      RawMaterialService,

    private router:
      Router

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

        (data.rawMaterialName || '') +

        ' ' +

        (data.rawMaterialCode || '') +

        ' ' +

        (data.receiveNo || '') +

        ' ' +

        (data.supplier || '') +

        ' ' +

        (data.batchNo || '') +

        ' ' +

        (data.unit || '') +

        ' ' +

        (data.noOfBags || '') +

        ' ' +

        (data.totalWeightKg || '') +

        ' ' +

        (data.availableWeightKg || '') +

        ' ' +

        (data.usedWeightKg || '')

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
          // Select First Warehouse Automatically
          // ======================================

          if (
            this.warehouseList.length > 0
          ) {

            this.selectedWarehouseId =
              this.warehouseList[0]._id;


            this.selectedWarehouse =
              this.warehouseList[0];


            this.getRawMaterialStock(
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

      this.selectedWarehouseId =
        '';

      this.selectedWarehouse =
        null;

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
          warehouse._id === warehouseId

      );


    // ==========================================
    // Get Stock
    // ==========================================

    this.getRawMaterialStock(
      warehouseId
    );

  }


  // ==========================================
  // Get Raw Material Stock
  // ==========================================

  getRawMaterialStock(
    warehouseId: string
  ): void {

    this.rawMaterialService
      .getRawMaterialStock(
        warehouseId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Raw Material Stock:',
            response
          );


          this.stockList =
            response?.data || [];


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

        },


        error: (error: any) => {

          console.log(
            'Raw Material Stock Error:',
            error
          );


          this.stockList = [];

          this.dataSource.data = [];

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
  // View Raw Material Stock
  // ==========================================

  // ==========================================
  // View Raw Material
  // ==========================================

  viewRawMaterialStock(
    item: any
  ): void {

    console.log(
      'Raw Material Stock View:',
      item
    );


    if (!item?.rawMaterialId) {

      console.log(
        'Raw Material ID not found in row',
        item
      );

      return;

    }


    this.router.navigate([

      '/admin/warehouse-raw-material-stock-view-details',

      item.rawMaterialId

    ]);

  }


}
