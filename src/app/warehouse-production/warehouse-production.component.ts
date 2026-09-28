import { Component, OnInit } from '@angular/core';
import { ProductionService } from '../Services/production.service';
import { WarehouseService } from '../Services/warehouse.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewProductionsComponent } from '../View-dialog-Controllers/view-productions/view-productions.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse-production',
  templateUrl: './warehouse-production.component.html',
  styleUrls: ['./warehouse-production.component.css']
})
export class WarehouseProductionComponent
  implements OnInit {
  instruction: any = null;
  // ==========================================
  // WAREHOUSES
  // ==========================================


  warehouses: any[] = [];

  selectedWarehouse: any = null;

  // ==========================================
  // PRODUCTIONS
  // ==========================================

  productions: any[] = [];

  // ==========================================
  // ALL PRODUCTIONS
  // ==========================================

  allProductions: any[] = [];

  // ==========================================
  // LOADING
  // ==========================================

  warehouseLoading = false;
  productionLoading = false;

  // ==========================================
  // ERROR
  // ==========================================

  errorMessage = '';

  constructor(
    private warehouseService: WarehouseService,
    private productionService: ProductionService,
    private dialog: MatDialog,
    private router: Router

  ) { }

  ngOnInit(): void {

    // Load warehouses
    this.getAllWarehouses();

    // Load all productions
    this.getAllProductions();

  }

  // ==========================================
  // GET ALL WAREHOUSES
  // ==========================================

  // ==========================================
  // GET ALL WAREHOUSES
  // ==========================================

  getAllWarehouses(): void {

    this.warehouseLoading = true;

    this.warehouseService.getAllWarehouses().subscribe({

      next: (response: any) => {

        console.log('All Warehouses Response:', response);

        if (response?.success) {

          this.warehouses = response.data || [];

          // ==========================================
          // AUTO SELECT FIRST WAREHOUSE
          // ==========================================

          if (this.warehouses.length > 0) {

            const firstWarehouse = this.warehouses[0];

            this.selectedWarehouse = firstWarehouse;

            console.log(
              'Auto Selected First Warehouse:',
              firstWarehouse
            );

            // Get first warehouse productions
            this.getProductionsByWarehouse(
              firstWarehouse._id
            );

          }

        } else {

          this.warehouses = [];

        }

        this.warehouseLoading = false;

      },

      error: (error) => {

        console.error(
          'Get Warehouses Error:',
          error
        );

        this.warehouses = [];

        this.selectedWarehouse = null;

        this.productions = [];

        this.warehouseLoading = false;

      }

    });

  }

  // ==========================================
  // GET ALL PRODUCTIONS
  // ==========================================

  getAllProductions(): void {

    this.productionLoading = true;

    this.productionService.getAllProductions().subscribe({

      next: (response: any) => {

        console.log(
          'All Productions Response:',
          response
        );

        if (response?.success) {

          this.allProductions =
            response.data || [];

        } else {

          this.allProductions = [];

        }

        this.productionLoading = false;

      },

      error: (error) => {

        console.error(
          'Get All Productions Error:',
          error
        );

        this.allProductions = [];

        this.productionLoading = false;

      }

    });

  }

  // ==========================================
  // WAREHOUSE CLICK
  // ==========================================

  selectWarehouse(warehouse: any): void {

    if (!warehouse) {
      return;
    }

    this.selectedWarehouse = warehouse;

    this.getProductionsByWarehouse(
      warehouse._id
    );

  }

  // ==========================================
  // GET PRODUCTIONS BY WAREHOUSE
  // ==========================================

  getProductionsByWarehouse(
    warehouseId: string
  ): void {

    this.productionLoading = true;

    this.productions = [];

    console.log(
      'Selected Warehouse ID:',
      warehouseId
    );

    this.warehouseService
      .getWarehouseDataById(warehouseId)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Selected Warehouse API Response:',
            response
          );

          if (response?.success) {

            this.productions =
              response.data || [];

          } else {

            this.productions = [];

          }

          this.productionLoading = false;

        },

        error: (error) => {

          console.error(
            'Get Warehouse Productions Error:',
            error
          );

          this.productions = [];

          this.productionLoading = false;

        }

      });

  }

  // ==========================================
  // GET PRODUCTION COUNT
  // ==========================================

  getProductionCount(
    warehouseId: string
  ): number {

    return this.allProductions.filter(
      (production: any) => {

        const productionWarehouse =
          production?.warehouse?._id ||
          production?.warehouse;

        return productionWarehouse === warehouseId;

      }
    ).length;

  }

  // ==========================================
  // TOTAL PRODUCTION WEIGHT
  // ==========================================

  getTotalProducedWeight(): number {

    return this.productions.reduce(
      (total: number, production: any) => {

        return total +
          Number(
            production.totalProducedWeightKg || 0
          );

      },
      0
    );

  }

  // ==========================================
  // TOTAL RAW MATERIAL USED
  // ==========================================

  getTotalRawWeight(): number {

    return this.productions.reduce(
      (total: number, production: any) => {

        return total +
          Number(
            production.rawWeightUsedKg || 0
          );

      },
      0
    );

  }

  // ==========================================
  // CLEAR SELECTED WAREHOUSE
  // ==========================================

  clearSelection(): void {

    this.selectedWarehouse = null;

    this.productions = [];

  }



  // ================================
  getVariantTooltip(items: any[]): string {
    if (!items || !items.length) {
      return '';
    }

    return items
      .map(item =>
        `${item.variantName || item.packSize || '-'} • ${item.packsProduced || 0} packs`
      )
      .join('\n');
  }


  // ==========================================
  // VIEW PRODUCTION
  // ==========================================

  viewProduction(production: any): void {

    if (!production) {
      return;
    }

    console.log(
      'Viewing Production:',
      production
    );

    this.dialog.open(
      ViewProductionsComponent,
      {
        width: '950px',

        data: production,
        maxWidth: '950',
        maxHeight: '95vh',
        panelClass: 'production-view-dialog',
        autoFocus: false
      }
    );

  }



}