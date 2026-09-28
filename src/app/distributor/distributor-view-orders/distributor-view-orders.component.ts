import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-distributor-view-orders',
  templateUrl: './distributor-view-orders.component.html',
  styleUrls: ['./distributor-view-orders.component.css']
})
export class DistributorViewOrdersComponent {

  constructor(

    private dialogRef:
      MatDialogRef<DistributorViewOrdersComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) { }


  // ==================================
  // Close
  // ==================================

  close(): void {

    this.dialogRef.close();

  }
}
