import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CommomPopupService } from '../Services/commom-popup.service';
import { WarehouseFinishedGoodsStockService } from '../Services/warehouse-finished-goods-stock.service';

@Component({
  selector: 'app-admin-finished-goods-stock-view-details',
  templateUrl: './admin-finished-goods-stock-view-details.component.html',
  styleUrls: ['./admin-finished-goods-stock-view-details.component.css']
})
export class AdminFinishedGoodsStockViewDetailsComponent implements OnInit, AfterViewInit {


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

    'totalWeight',

    'productionCount',

    'history'

  ];


  // ==========================================
  // Warehouse ID
  // ==========================================

  warehouseId: string = '';


  // ==========================================
  // Stock Details
  // ==========================================

  stockDetails: any = null;


  // ==========================================
  // Finished Goods
  // ==========================================

  finishedGoods: any[] = [];


  // ==========================================
  // Data Source
  // ==========================================

  dataSource =
    new MatTableDataSource<any>();


  // ==========================================
  // Loading
  // ==========================================

  isLoading = false;


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

    private route:
      ActivatedRoute,

    private router:
      Router,

    private finishedGoodsStockService:
      WarehouseFinishedGoodsStockService,

    private alertService:
      CommomPopupService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.warehouseId =
      this.route.snapshot
        .paramMap
        .get('warehouseId') || '';


    if (!this.warehouseId) {

      this.alertService.error(
        'Warehouse ID not found'
      );

      this.goBack();

      return;

    }


    // ========================================
    // Search Filter
    // ========================================

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

        (data.productionCount || '') +

        ' ' +

        this.getProductionHistorySearch(
          data
        )

      ).toLowerCase();


      return search.includes(filter);

    };


    this.getFinishedGoodsStockDetails();

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
  // Get Finished Goods Stock Details
  // ==========================================

  getFinishedGoodsStockDetails(): void {

    this.isLoading = true;


    this.finishedGoodsStockService
      .getFinishedGoodsStockByWarehouse(
        this.warehouseId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Finished Goods Stock Details:',
            response
          );


          // ======================================
          // Main Data
          // ======================================

          this.stockDetails =
            response?.data || null;


          // ======================================
          // Finished Goods
          // ======================================

          this.finishedGoods =
            this.stockDetails
              ?.finishedGoods || [];


          // ======================================
          // Bind Table
          // ======================================

          this.dataSource.data =
            this.finishedGoods;


          // ======================================
          // Paginator
          // ======================================

          this.dataSource.paginator =
            this.paginator;


          // ======================================
          // Sort
          // ======================================

          this.dataSource.sort =
            this.sort;


          this.isLoading = false;

        },


        error: (error: any) => {

          console.log(
            'Finished Goods Stock Details Error:',
            error
          );


          this.stockDetails = null;

          this.finishedGoods = [];

          this.dataSource.data = [];


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to load finished goods stock details'

          );

        }

      });

  }


  // ==========================================
  // Production History Search
  // ==========================================

  getProductionHistorySearch(
    item: any
  ): string {

    if (
      !Array.isArray(
        item?.productionHistory
      )
    ) {

      return '';

    }


    return item.productionHistory
      .map(
        (history: any) => {

          return (

            (history.productionNo || '') +

            ' ' +

            (history.remarks || '') +

            ' ' +

            (history.packsProduced || '') +

            ' ' +

            (history.totalWeightKg || '')

          );

        }
      )
      .join(' ');

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
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([
      '/admin/finished-goods-stock'
    ]);

  }

}
