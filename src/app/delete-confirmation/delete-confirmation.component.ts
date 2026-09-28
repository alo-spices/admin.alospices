import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {
data: any;
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationComponent>) { }

  onCancel(): void {
    this.dialogRef.close(false); // Just close the dialog
  }

  onDelete(): void {
    this.dialogRef.close(true); // Send true to confirm deletion
  }

}
