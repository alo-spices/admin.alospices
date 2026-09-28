import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupData } from '../Models/common-popup';



@Component({
  selector: 'app-commom-popup',
  templateUrl: './commom-popup.component.html',
  styleUrls: ['./commom-popup.component.css']
})
export class CommomPopupComponent {
constructor(

    private dialogRef:
      MatDialogRef<CommomPopupComponent>,

    @Inject(MAT_DIALOG_DATA)
    public popupData: PopupData

  ) { }


  // ==========================================
  // Close
  // ==========================================

  close(): void {

    this.dialogRef.close(true);

  }


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
