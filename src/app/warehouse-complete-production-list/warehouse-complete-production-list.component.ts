import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WarehouseProductionService } from '../Services/warehouse-production.service';
import { MatDialog } from '@angular/material/dialog';
import { WarehouseCompleteProductionViewDataComponent } from '../warehouse-complete-production-view-data/warehouse-complete-production-view-data.component';

@Component({
  selector: 'app-warehouse-complete-production-list',
  templateUrl: './warehouse-complete-production-list.component.html',
  styleUrls: ['./warehouse-complete-production-list.component.css']
})
export class WarehouseCompleteProductionListComponent implements OnInit, AfterViewInit {

  loading = false;
  errorMessage = '';

  warehouse: any = null;
  summary: any = {};

  productionList: any[] = [];
  selectedProduction: any = null;
  displayedColumns: string[] = [
    'sno',
    'production',
    'rawMaterials',
    'productionItems',
    'producedWeight',
    'waste',
    'status',
    'remarks',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private warehouseProductionService: WarehouseProductionService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setupFilter();
    this.loadCompletedProductions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (
      item: any,
      property: string
    ): string | number => {
      switch (property) {
        case 'production':
          return item.productionNo || '';

        case 'producedWeight':
          return Number(item.totalProducedWeightKg || 0);

        case 'waste':
          return Number(item.wasteKg || 0);

        default:
          return item[property] ?? '';
      }
    };
  }

  // ==========================================
  // Load Completed Productions
  // ==========================================

  loadCompletedProductions(): void {
    this.loading = true;
    this.errorMessage = '';

    this.warehouseProductionService
      .getWarehouseCompletedProductions()
      .subscribe({
        next: (response: any) => {
          this.loading = false;

          if (!response?.success) {
            this.productionList = [];
            this.dataSource.data = [];
            this.errorMessage =
              response?.message || 'Unable to load productions.';
            return;
          }

          this.warehouse = response.warehouse || null;
          this.summary = response.summary || {};

          this.productionList = response.productions || [];

          this.dataSource.data = this.productionList;

          // Preserve pagination and sorting
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }

          if (this.sort) {
            this.dataSource.sort = this.sort;
          }
        },

        error: (error: any) => {
          this.loading = false;
          this.productionList = [];
          this.dataSource.data = [];

          this.errorMessage =
            error?.error?.message ||
            'Failed to load completed productions.';

          console.error(
            'Completed Productions Error:',
            error
          );
        }
      });
  }

  // ==========================================
  // Search Filter
  // ==========================================

  setupFilter(): void {
    this.dataSource.filterPredicate = (
      production: any,
      filter: string
    ): boolean => {

      const rawMaterials = (production.rawMaterials || [])
        .map((item: any) => [
          item.rawMaterial?.rawMaterialName,
          item.rawMaterial?.rawMaterialCode,
          item.stockReceive?.receiveNo,
          item.batchNo,
          item.weightUsedKg
        ].join(' '))
        .join(' ');

      const productionItems = (production.productionItems || [])
        .map((item: any) => [
          item.variantName,
          item.skuCode,
          item.batchNo,
          item.packSize,
          item.packsProduced,
          item.rejectedPacks
        ].join(' '))
        .join(' ');

      const searchText = [
        production.productionNo,
        production.status,
        production.remarks,
        production.warehouse?.warehouseName,
        production.warehouse?.warehouseCode,
        production.productionDate,
        rawMaterials,
        productionItems
      ].join(' ').toLowerCase();

      return searchText.includes(filter);
    };
  }

  applyFilter(event: Event): void {
    const value = (
      event.target as HTMLInputElement
    ).value;

    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // ==========================================
  // Display Helpers
  // ==========================================

  getRawMaterialName(item: any): string {
    return item?.rawMaterial?.rawMaterialName ||
      item?.rawMaterial?.name ||
      'N/A';
  }

  getStockReceiveNo(item: any): string {
    return item?.stockReceive?.receiveNo || 'N/A';
  }

  formatNumber(value: any): string {
    return Number(value || 0).toLocaleString('en-IN', {
      maximumFractionDigits: 3
    });
  }

  trackByProduction(index: number, item: any): string {
    return item._id || index.toString();
  }

  getProductionStatusClass(status: string): string {
    switch ((status || '').toLowerCase()) {
      case 'completed':
        return 'status-completed';

      case 'cancelled':
        return 'status-cancelled';

      case 'pending':
        return 'status-pending';

      default:
        return 'status-default';
    }
  }

  viewProduction(production: any): void {
    if (!production?._id) {
      return;
    }

    this.dialog.open(WarehouseCompleteProductionViewDataComponent, {
      width: '1200px',
      maxWidth: '96vw',
      maxHeight: '92vh',
      autoFocus: false,
      restoreFocus: true,
      panelClass: 'production-details-dialog',
      data: {
        productionId: production._id
      }
    });
  }

  closeProductionView(): void {
    this.selectedProduction = null;
  }

}
