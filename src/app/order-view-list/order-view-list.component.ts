import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-view-list',
  templateUrl: './order-view-list.component.html',
  styleUrls: ['./order-view-list.component.css']
})
export class OrderViewListComponent {


  constructor(

    private dialogRef:
      MatDialogRef<OrderViewListComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) { }


  // ==========================================
  // CLOSE
  // ==========================================

  close(): void {

    this.dialogRef.close();

  }


  // ==========================================
  // PARTY NAME
  // ==========================================

  getPartyName(): string {

    return (

      this.data?.party?.shopName ||

      '-'

    );

  }


  // ==========================================
  // SALESMAN NAME
  // ==========================================

  getSalesmanName(): string {

    return (

      this.data?.employee?.fullName ||

      '-'

    );

  }


  // ==========================================
  // DISTRIBUTOR NAME
  // ==========================================

  getDistributorName(): string {

    return (

      this.data?.employee?.distributor?.fullName ||

      this.data?.employee?.distributor?.distributorName ||

      '-'

    );

  }


  // ==========================================
  // FORMAT DATE
  // ==========================================

  formatDate(date: any): string {

    if (!date) {

      return '-';

    }


    return new Date(date)
      .toLocaleDateString(
        'en-IN',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }
      );

  }


  // ==========================================
  // FORMAT DATE TIME
  // ==========================================

  formatDateTime(date: any): string {

    if (!date) {

      return '-';

    }


    return new Date(date)
      .toLocaleString(
        'en-IN',
        {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }
      );

  }


  // ==========================================
  // ORDER STATUS CLASS
  // ==========================================

  getOrderStatusClass(): string {

    switch (this.data?.orderStatus) {

      case 'Pending':

        return 'status-pending';

      case 'Confirmed':

        return 'status-confirmed';

      case 'Processing':

        return 'status-processing';

      case 'Completed':

        return 'status-completed';

      case 'Cancelled':

        return 'status-cancelled';

      default:

        return 'status-default';

    }

  }


  // ==========================================
  // PAYMENT STATUS CLASS
  // ==========================================

  getPaymentStatusClass(): string {

    switch (this.data?.paymentStatus) {

      case 'Paid':

        return 'payment-paid';

      case 'Pending':

        return 'payment-pending';

      case 'Partial':

        return 'payment-partial';

      case 'Failed':

        return 'payment-failed';

      default:

        return 'payment-default';

    }

  }
}
