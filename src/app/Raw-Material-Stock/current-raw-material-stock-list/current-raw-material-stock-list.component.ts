import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductionService } from 'src/app/Services/production.service';
import { RawMaterialService } from 'src/app/Services/raw-material.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-current-raw-material-stock-list',
  templateUrl: './current-raw-material-stock-list.component.html',
  styleUrls: ['./current-raw-material-stock-list.component.css']
})
export class CurrentRawMaterialStockListComponent implements OnInit, AfterViewInit {


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

    'amount'

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
  // Table Data Source
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
      WarehouseService, private rawMaterialService: RawMaterialService,

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

        (data.unit || '')

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


          // ==========================================
          // Optional: Select First Warehouse
          // ==========================================

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

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }


    // ==========================================
    // If No Warehouse
    // ==========================================

    if (!warehouseId) {

      this.selectedWarehouse = null;

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


          // ==========================================
          // Bind Table
          // ==========================================

          this.dataSource.data =
            this.stockList;


          // ==========================================
          // Re-assign Paginator & Sort
          // ==========================================

          this.dataSource.paginator =
            this.paginator;

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

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // ==========================================
    // First Page
    // ==========================================
    if (this.dataSource.paginator) {
      this.dataSource
        .paginator
        .firstPage();

    }

  }


}
