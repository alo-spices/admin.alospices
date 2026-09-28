import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-approval-popup',
  templateUrl: './approval-popup.component.html',
  styleUrls: ['./approval-popup.component.css']
})
export class ApprovalPopupComponent {

  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(

    private dialogRef:
      MatDialogRef<ApprovalPopupComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) { }


  // ==========================================
  // APPROVE
  // ==========================================

  approve(): void {

    this.dialogRef.close({

      confirmed: true

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
