import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { WarehouseProductionService } from '../Services/warehouse-production.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-warehouse-complete-production-view-data',
  templateUrl: './warehouse-complete-production-view-data.component.html',
  styleUrls: ['./warehouse-complete-production-view-data.component.css']
})
export class WarehouseCompleteProductionViewDataComponent implements OnInit {

  production: any = null;
  loading = false;
  errorMessage = '';

  constructor(
    private warehouseProductionService: WarehouseProductionService,
    private dialogRef: MatDialogRef<WarehouseCompleteProductionViewDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productionId: string }
  ) { }

  ngOnInit(): void {
    this.loadProductionDetails(this.data.productionId);
  }

  loadProductionDetails(id: string): void {
    this.loading = true;
    this.errorMessage = '';
    this.production = null;

    this.warehouseProductionService.getProductionById(id).subscribe({
      next: (response: any) => {
        if (response?.success && response?.data) {
          this.production = response.data;
        } else {
          this.errorMessage =
            response?.message || 'Production details not found.';
        }

        this.loading = false;
      },
      error: (error: any) => {
        this.errorMessage =
          error?.error?.message || 'Failed to load production details.';
        this.loading = false;
      }
    });
  }

  closePopup(): void {
    this.dialogRef.close();
  }

  getStatusClass(status: string): string {
    switch ((status || '').toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  }

  getTotalPacks(items: any[]): number {
    if (!Array.isArray(items)) return 0;

    return items.reduce(
      (total, item) => total + Number(item.packsProduced || 0),
      0
    );
  }

  formatDate(date: string | Date | null | undefined): string {
    if (!date) return '-';

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) return '-';

    return parsedDate.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatNumber(value: number | null | undefined): string {
    return Number(value ?? 0).toLocaleString('en-IN', {
      maximumFractionDigits: 3
    });
  }

  trackByIndex(index: number): number {
    return index;
  }
}
