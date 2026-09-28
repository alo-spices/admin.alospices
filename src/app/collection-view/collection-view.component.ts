import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-collection-view',
  templateUrl: './collection-view.component.html',
  styleUrls: ['./collection-view.component.css']
})
export class CollectionViewComponent {

  constructor(

    private dialogRef:
      MatDialogRef<CollectionViewComponent>,

    @Inject(MAT_DIALOG_DATA)
    public collection: any

  ) { }


  // =========================================
  // Close
  // =========================================

  close(): void {

    this.dialogRef.close();

  }


  // =========================================
  // Format Date
  // =========================================

  formatDate(
    date: any
  ): string {

    if (!date) {

      return '-';

    }


    return new Date(date)
      .toLocaleDateString(
        'en-IN',
        {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }
      );

  }


  // =========================================
  // Format Date Time
  // =========================================

  formatDateTime(
    date: any
  ): string {

    if (!date) {

      return '-';

    }


    return new Date(date)
      .toLocaleString(
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


  // =========================================
  // Collection Status
  // =========================================

  getStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'Verified':

        return 'status-verified';


      case 'Pending':

        return 'status-pending';


      case 'Rejected':

        return 'status-rejected';


      case 'Cancelled':

        return 'status-cancelled';


      default:

        return 'status-default';

    }

  }


  // =========================================
  // Payment Mode
  // =========================================

  getPaymentModeClass(
    mode: string
  ): string {

    switch (mode) {

      case 'Cash':

        return 'payment-cash';


      case 'UPI':

        return 'payment-upi';


      case 'Card':

        return 'payment-card';


      case 'Bank Transfer':

        return 'payment-bank';


      case 'Cheque':

        return 'payment-cheque';


      default:

        return 'payment-default';

    }

  }
}
