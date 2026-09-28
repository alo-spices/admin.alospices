import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DistributorsService } from 'src/app/Services/distributors.service';

@Component({
  selector: 'app-incoming-stock-transfer-view',
  templateUrl: './incoming-stock-transfer-view.component.html',
  styleUrls: ['./incoming-stock-transfer-view.component.css']
})
export class IncomingStockTransferViewComponent implements OnInit {

  transfer: any = null;

  loading = true;

  constructor(
    private distributorService: DistributorsService,

    private dialogRef:
      MatDialogRef<IncomingStockTransferViewComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) { }


  ngOnInit(): void {

    if (this.data?.id) {

      this.getTransferDetails(
        this.data.id
      );

    }

  }


  // ==========================================
  // GET TRANSFER DETAILS
  // ==========================================

  getTransferDetails(id: string): void {

    this.loading = true;

    this.distributorService
      .getDistributorTransferById(id)
      .subscribe({

        next: (response: any) => {

          this.loading = false;

          if (response?.success) {

            this.transfer =
              response.data;

          }

        },

        error: (error: any) => {

          this.loading = false;

          console.error(
            'Get Transfer Details Error:',
            error
          );

        }

      });

  }


  // ==========================================
  // DESTINATION NAME
  // ==========================================

  getDestinationName(): string {

    const destination =
      this.transfer?.destination;

    if (!destination) {
      return '-';
    }

    if (destination.fullName) {
      return destination.fullName;
    }

    if (
      destination.firstName ||
      destination.lastName
    ) {

      return (
        `${destination.firstName || ''} ` +
        `${destination.lastName || ''}`
      ).trim();

    }

    if (destination.shopName) {
      return destination.shopName;
    }

    if (destination.name) {
      return destination.name;
    }

    return '-';

  }


  // ==========================================
  // TOTAL QUANTITY
  // ==========================================

  getTotalQuantity(): number {

    if (
      !Array.isArray(
        this.transfer?.items
      )
    ) {

      return 0;

    }

    return this.transfer.items.reduce(
      (
        total: number,
        item: any
      ) => {

        return total +
          Number(item.quantity || 0);

      },
      0
    );

  }


  // ==========================================
  // STATUS CLASS
  // ==========================================

  getStatusClass(
    status: string
  ): string {

    switch (
    (status || '').toLowerCase()
    ) {

      case 'pending':
        return 'pending';

      case 'approved':
        return 'approved';

      case 'intransit':
        return 'intransit';

      case 'received':
        return 'received';

      case 'cancelled':
        return 'cancelled';

      default:
        return 'pending';

    }

  }


  // ==========================================
  // CLOSE
  // ==========================================

  close(): void {

    this.dialogRef.close();

  }

}
