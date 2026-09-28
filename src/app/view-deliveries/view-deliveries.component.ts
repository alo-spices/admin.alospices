import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-deliveries',
  templateUrl: './view-deliveries.component.html',
  styleUrls: ['./view-deliveries.component.css']
})
export class ViewDeliveriesComponent {


  constructor(

    private dialogRef:
      MatDialogRef<ViewDeliveriesComponent>,

    @Inject(MAT_DIALOG_DATA)
    public delivery: any

  ) { }


  // ============================================
  // CLOSE
  // ============================================

  close(): void {

    this.dialogRef.close();

  }


  // ============================================
  // DATE
  // ============================================

  formatDate(date: any): string {

    if (!date) {

      return '-';

    }

    return new Date(date).toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }
    );

  }


  // ============================================
  // DATE TIME
  // ============================================

  formatDateTime(date: any): string {

    if (!date) {

      return '-';

    }

    return new Date(date).toLocaleString(
      'en-IN',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    );

  }


  // ============================================
  // DELIVERY STATUS
  // ============================================

  getDeliveryStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'Assigned':
        return 'status-assigned';

      case 'Dispatched':
        return 'status-dispatched';

      case 'Out for Delivery':
        return 'status-out';

      case 'Delivered':
        return 'status-delivered';

      case 'Cancelled':
        return 'status-cancelled';

      case 'Failed':
        return 'status-failed';

      default:
        return 'status-default';

    }

  }


  // ============================================
  // ORDER STATUS
  // ============================================

  getOrderStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'Approved':
        return 'status-approved';

      case 'Pending':
        return 'status-pending';

      case 'Rejected':
        return 'status-rejected';

      case 'Completed':
        return 'status-completed';

      case 'Cancelled':
        return 'status-cancelled';

      default:
        return 'status-default';

    }

  }


  // ============================================
  // PAYMENT STATUS
  // ============================================

  getPaymentStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'Paid':
        return 'status-paid';

      case 'Pending':
        return 'status-pending';

      case 'Partial':
        return 'status-partial';

      case 'Failed':
        return 'status-failed';

      default:
        return 'status-default';

    }

  }


  // ============================================
  // SOURCE TYPE
  // ============================================

  getSourceTypeClass(
    sourceType: string
  ): string {

    switch (sourceType) {

      case 'WAREHOUSE':
        return 'source-warehouse';

      case 'DISTRIBUTOR':
        return 'source-distributor';

      default:
        return 'source-default';

    }

  }
}
