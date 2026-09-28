import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductionService } from 'src/app/Services/production.service';
import { WarehouseService } from 'src/app/Services/warehouse.service';

@Component({
  selector: 'app-production-monitoring-list',
  templateUrl: './production-monitoring-list.component.html',
  styleUrls: ['./production-monitoring-list.component.css']
})
export class ProductionMonitoringListComponent implements OnInit, AfterViewInit {

  // ==========================================
  // Table Columns
  // ==========================================

  displayedColumns: string[] = [

    'sno',
    'production',
    'warehouse',
    'rawMaterial',
    'rawWeight',
    'productionItems',
    'producedWeight',
    'waste',
    'status',
    'remarks',
    'actions'

  ];


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
  // All Productions
  // ==========================================

  productions: any[] = [];


  // ==========================================
  // Filtered Productions
  // ==========================================

  productionList: any[] = [];


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

    private productionService:
      ProductionService,

    private warehouseService:
      WarehouseService,

    private router:
      Router,

    private dialog:
      MatDialog

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.getAllWarehouses();

    this.getAllProductions();


    // ==========================================
    // Search Filter
    // ==========================================

    this.dataSource.filterPredicate = (

      data: any,

      filter: string

    ) => {

      const productionNo =
        data.productionNo || '';


      const warehouseName =
        data.warehouse?.warehouseName || '';


      const warehouseCode =
        data.warehouse?.warehouseCode || '';


      const status =
        data.status || '';


      const remarks =
        data.remarks || '';


      // Raw Materials Search

      let rawMaterialSearch = '';


      if (
        Array.isArray(
          data.rawMaterials
        )
      ) {

        rawMaterialSearch =
          data.rawMaterials
            .map(
              (item: any) => {

                return (

                  (item.rawMaterial
                    ?.rawMaterialName || '') +

                  ' ' +

                  (item.rawMaterial
                    ?.rawMaterialCode || '') +

                  ' ' +

                  (item.batchNo || '') +

                  ' ' +

                  (item.stockReceive
                    ?.receiveNo || '')

                );

              }
            )
            .join(' ');

      }


      // Production Items Search

      let productionItemSearch = '';


      if (
        Array.isArray(
          data.productionItems
        )
      ) {

        productionItemSearch =
          data.productionItems
            .map(
              (item: any) => {

                return (

                  (item.variantName || '') +

                  ' ' +

                  (item.skuCode || '') +

                  ' ' +

                  (item.packSize || '')

                );

              }
            )
            .join(' ');

      }


      const search = (

        productionNo +

        ' ' +

        warehouseName +

        ' ' +

        warehouseCode +

        ' ' +

        rawMaterialSearch +

        ' ' +

        productionItemSearch +

        ' ' +

        status +

        ' ' +

        remarks

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


            this.filterProductionsByWarehouse(
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
  // Get All Productions
  // ==========================================

  getAllProductions(): void {

    this.productionService
      .getAllProductions()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Production Response:',
            response
          );


          this.productions =
            response?.data || [];


          // If warehouse already selected

          if (
            this.selectedWarehouseId
          ) {

            this.filterProductionsByWarehouse(
              this.selectedWarehouseId
            );

          } else {

            this.productionList =
              this.productions;


            this.dataSource.data =
              this.productionList;

          }


          this.dataSource.paginator =
            this.paginator;

          this.dataSource.sort =
            this.sort;

        },

        error: (error: any) => {

          console.log(
            'Production Error:',
            error
          );


          this.productions = [];

          this.productionList = [];

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

    this.productionList = [];

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

      this.selectedWarehouse = null;

      this.productionList =
        this.productions;

      this.dataSource.data =
        this.productionList;

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
    // Filter Productions
    // ==========================================

    this.filterProductionsByWarehouse(
      warehouseId
    );

  }


  // ==========================================
  // Filter Productions By Warehouse
  // ==========================================

  filterProductionsByWarehouse(
    warehouseId: string
  ): void {

    this.productionList =
      this.productions.filter(

        (production: any) =>

          production.warehouse?._id ===
          warehouseId

      );


    this.dataSource.data =
      this.productionList;


    this.dataSource.paginator =
      this.paginator;

    this.dataSource.sort =
      this.sort;


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


    if (
      this.dataSource.paginator
    ) {

      this.dataSource
        .paginator
        .firstPage();

    }

  }


  // ==========================================
  // Status Class
  // ==========================================

  getStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'Completed':
        return 'active';

      case 'In Progress':
        return 'warning';

      case 'Pending':
        return 'pending';

      case 'Rejected':
        return 'inactive';

      case 'Cancelled':
        return 'inactive';

      default:
        return 'pending';

    }

  }




  // ==========================================
  // Edit Production
  // ==========================================

  editProduction(
    production: any
  ): void {

    if (!production?._id) {

      return;

    }


    this.router.navigate([

      '/admin/update-production',

      production._id

    ]);

  }

  viewProduction(element: any): void {

    if (!element?._id) {
      console.log('Production ID not found');
      return;
    }

    this.router.navigate([
      '/admin/production-monitoring-view',
      element._id
    ]);

  }
}
