import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-accept-production-instruction-popup',
  templateUrl: './accept-production-instruction-popup.component.html',
  styleUrls: ['./accept-production-instruction-popup.component.css']
})
export class AcceptProductionInstructionPopupComponent {
  constructor(

    private dialogRef:
      MatDialogRef<
        AcceptProductionInstructionPopupComponent
      >,

    @Inject(MAT_DIALOG_DATA)
    public data: any

  ) { }


  // ==========================================
  // Confirm
  // ==========================================

  confirm(): void {

    this.dialogRef.close(true);

  }


  // ==========================================
  // Cancel
  // ==========================================

  cancel(): void {

    this.dialogRef.close(false);

  }
}
