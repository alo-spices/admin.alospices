import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommomPopupService } from '../Services/commom-popup.service';
import { RawMaterialService } from '../Services/raw-material.service';

@Component({
  selector: 'app-warehouse-raw-material-stock-view-details',
  templateUrl: './warehouse-raw-material-stock-view-details.component.html',
  styleUrls: ['./warehouse-raw-material-stock-view-details.component.css']
})
export class WarehouseRawMaterialStockViewDetailsComponent implements OnInit {


  // ==========================================
  // Raw Material
  // ==========================================

  rawMaterial: any = null;


  // ==========================================
  // Raw Material ID
  // ==========================================

  rawMaterialId: string = '';


  // ==========================================
  // Loading
  // ==========================================

  isLoading = false;


  constructor(

    private route:
      ActivatedRoute,

    private router:
      Router,

    private rawMaterialService:
      RawMaterialService,

    private alertService:
      CommomPopupService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    // ========================================
    // Get ID From Route
    // ========================================

    this.rawMaterialId =
      this.route.snapshot
        .paramMap
        .get('id') || '';


    // ========================================
    // Validate ID
    // ========================================

    if (!this.rawMaterialId) {

      this.alertService.error(
        'Raw Material ID not found'
      );

      this.goBack();

      return;

    }


    // ========================================
    // Get Raw Material
    // ========================================

    this.getRawMaterialById();

  }


  // ==========================================
  // Get Raw Material By ID
  // ==========================================

  getRawMaterialById(): void {

    this.isLoading = true;


    this.rawMaterialService
      .getRawMaterialById(
        this.rawMaterialId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Raw Material Response:',
            response
          );


          this.rawMaterial =
            response?.data || null;


          this.isLoading = false;


          // ==================================
          // No Data
          // ==================================

          if (!this.rawMaterial) {

            this.alertService.error(
              'Raw Material details not found'
            );

          }

        },


        error: (error: any) => {

          console.log(
            'Get Raw Material Error:',
            error
          );


          this.rawMaterial = null;

          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to load raw material details'

          );

        }

      });

  }


  // ==========================================
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/warehouse-raw-material-stock'

    ]);

  }

}
