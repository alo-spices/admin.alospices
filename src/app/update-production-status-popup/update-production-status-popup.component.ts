import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-production-status-popup',
  templateUrl: './update-production-status-popup.component.html',
  styleUrls: ['./update-production-status-popup.component.css']
})
export class UpdateProductionStatusPopupComponent {
  selectedStatus = '';
  isSubmitting = false;

  statusOptions: string[] = [];

  constructor(
    public dialogRef:
      MatDialogRef<UpdateProductionStatusPopupComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
    this.selectedStatus = data.currentStatus;

    // Only allow valid next statuses.
    switch (data.currentStatus) {

      case 'Pending':
        this.statusOptions = [
          'Accepted',

          'Rejected',
          'Cancelled'
        ];
        break;

      case 'Accepted':
        this.statusOptions = [
          'Completed',
          'In Progress',

          'Rejected',
          'Cancelled'
        ];
        break;

      case 'In Progress':
        this.statusOptions = [
          'Completed',
          'Cancelled'
        ];
        break;

      default:
        this.statusOptions = [];
        break;
    }

    // Keep the current value available in the dropdown.
    if (
      data.currentStatus &&
      !this.statusOptions.includes(data.currentStatus)
    ) {
      this.statusOptions.unshift(data.currentStatus);
    }
  }

  confirm(): void {
    if (
      !this.selectedStatus ||
      this.selectedStatus === this.data.currentStatus ||
      this.isSubmitting
    ) {
      return;
    }

    this.dialogRef.close(this.selectedStatus);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
