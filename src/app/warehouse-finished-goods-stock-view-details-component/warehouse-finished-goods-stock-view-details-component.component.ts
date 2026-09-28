import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommomPopupService } from '../Services/commom-popup.service';
import { WarehouseFinishedGoodsStockService } from '../Services/warehouse-finished-goods-stock.service';

@Component({
  selector: 'app-warehouse-finished-goods-stock-view-details-component',
  templateUrl: './warehouse-finished-goods-stock-view-details-component.component.html',
  styleUrls: ['./warehouse-finished-goods-stock-view-details-component.component.css']
})
export class WarehouseFinishedGoodsStockViewDetailsComponentComponent implements OnInit {


  // ==========================================
  // Warehouse ID
  // ==========================================

  warehouseId: string = '';


  // ==========================================
  // Stock Data
  // ==========================================

  stockData: any = null;


  // ==========================================
  // Loading
  // ==========================================

  isLoading = false;


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


    console.log(
      'Warehouse ID:',
      this.warehouseId
    );


    if (!this.warehouseId) {

      this.alertService.error(
        'Warehouse ID not found'
      );

      this.goBack();

      return;

    }


    this.getFinishedGoodsStock();

  }


  // ==========================================
  // Get Finished Goods Stock
  // ==========================================

  getFinishedGoodsStock(): void {

    this.isLoading =
      true;


    this.finishedGoodsStockService
      .getFinishedGoodsStockByWarehouse(
        this.warehouseId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Finished Goods Details:',
            response
          );


          this.stockData =
            response?.data || null;


          this.isLoading =
            false;

        },


        error: (error: any) => {

          console.log(
            'Finished Goods Details Error:',
            error
          );


          this.stockData =
            null;


          this.isLoading =
            false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to load finished goods details'

          );

        }

      });

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
