import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockReceiveService } from 'src/app/Services/stock-receive.service';

@Component({
  selector: 'app-warehouse-stock-view',
  templateUrl: './warehouse-stock-view.component.html',
  styleUrls: ['./warehouse-stock-view.component.css']
})
export class WarehouseStockViewComponent {
 warehouse: any;

  stockList: any[] = [];

  // Summary
  totalBatches = 0;
  totalWeightKg = 0;
  usedWeightKg = 0;
  availableWeightKg = 0;

  loading = false;

  constructor(

    private stockReceiveService: StockReceiveService,

    private dialogRef:
      MatDialogRef<WarehouseStockViewComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) {}

  ngOnInit(): void {

    this.warehouse = this.data;

    this.getWarehouseStock();

  }


  // ======================================
  // GET WAREHOUSE STOCK
  // ======================================

  getWarehouseStock(): void {

    if (!this.warehouse?._id) {

      return;

    }

    this.loading = true;

    this.stockReceiveService
      .getWarehouseStock(this.warehouse._id)
      .subscribe({

        next: (res: any) => {

          this.loading = false;

          if (res.success) {

            // ==========================
            // SUMMARY
            // ==========================

            this.totalBatches =
              res.summary?.totalBatches || 0;

            this.totalWeightKg =
              res.summary?.totalWeightKg || 0;

            this.usedWeightKg =
              res.summary?.usedWeightKg || 0;

            this.availableWeightKg =
              res.summary?.availableWeightKg || 0;


            // ==========================
            // STOCK LIST
            // ==========================

            this.stockList =
              res.data || [];

          }

        },

        error: (err) => {

          this.loading = false;

          console.log(
            "Warehouse Stock Error:",
            err
          );

        }

      });

  }


  // ======================================
  // CLOSE
  // ======================================

  close(): void {

    this.dialogRef.close();

  }
}
