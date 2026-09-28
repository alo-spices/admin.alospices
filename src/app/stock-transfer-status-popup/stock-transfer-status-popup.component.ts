import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stock-transfer-status-popup',
  templateUrl: './stock-transfer-status-popup.component.html',
  styleUrls: ['./stock-transfer-status-popup.component.css']
})
export class StockTransferStatusPopupComponent {

  selectedStatus: string = '';


  // ==========================================
  // ALLOWED STATUSES
  // ==========================================

  statusList: string[] = [

    'Draft',
    'Pending',
    'Approved',
    'InTransit',
    'Received',
    'Cancelled'

  ];


  constructor(

    private dialogRef:
      MatDialogRef<
        StockTransferStatusPopupComponent
      >,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) {

    this.selectedStatus =
      data?.status || 'Pending';

  }


  // ==========================================
  // CHECK LOCKED STATUS
  // ==========================================

  isLocked(): boolean {

    return (

      this.data?.status === 'Received' ||

      this.data?.status === 'Cancelled'

    );

  }


  // ==========================================
  // CHECK IN TRANSIT
  // ==========================================

  isInTransit(): boolean {

    return this.data?.status === 'InTransit';

  }


  // ==========================================
  // DESTINATION NAME
  // ==========================================

  getDestinationName(): string {

    const destination =
      this.data?.destination;

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


    if (destination.partyName) {

      return destination.partyName;

    }


    if (destination.companyName) {

      return destination.companyName;

    }


    if (destination.name) {

      return destination.name;

    }


    return '-';

  }


  // ==========================================
  // UPDATE / RECEIVE
  // ==========================================

  updateStatus(): void {

    // ==========================================
    // LOCKED
    // ==========================================

    if (this.isLocked()) {

      return;

    }


    // ==========================================
    // IN TRANSIT
    // RECEIVE STOCK
    // ==========================================

    if (this.isInTransit()) {

      this.dialogRef.close({

        confirmed: true,

        action: 'receive'

      });

      return;

    }


    // ==========================================
    // NORMAL STATUS UPDATE
    // ==========================================

    if (!this.selectedStatus) {

      return;

    }


    this.dialogRef.close({

      confirmed: true,

      action: 'status',

      status:
        this.selectedStatus

    });

  }


  // ==========================================
  // CANCEL
  // ==========================================

  cancel(): void {

    this.dialogRef.close({

      confirmed: false

    });

  }
}
